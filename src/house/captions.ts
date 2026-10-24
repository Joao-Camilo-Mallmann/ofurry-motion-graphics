/**
 * Legenda cinetica do canal: converte a legenda da narracao (SRT ou VTT) em "cartoes"
 * de 1 a 3 palavras com tempo, prontos para o <KineticCaptions>.
 *
 * Aceita:
 *  - VTT automatico do YouTube (tempo por palavra: <00:00:01.160><c> palavra</c>)
 *  - SRT/VTT comum (tempo por frase; o tempo de cada palavra e distribuido pelo tamanho)
 */

export interface TimedWord {
  text: string;
  start: number; // segundos
  end: number;
}

export interface CaptionCard {
  text: string;
  words: TimedWord[];
  start: number;
  end: number;
  /** Palavra que merece destaque (numero, porcentagem, moeda ou palavra marcada com *asteriscos*). */
  emphasis?: string;
}

export interface CardOptions {
  maxWords?: number;
  maxChars?: number;
  /** Duracao minima na tela (s). Cartoes curtos demais se juntam ao proximo. */
  minDuration?: number;
  /** Folga entre a fala e a troca do cartao (s). Negativo = antecipa. */
  leadIn?: number;
}

const toSec = (h: string, m: string, s: string) => Number(h) * 3600 + Number(m) * 60 + Number(s.replace(',', '.'));
const TIME = /(\d+):(\d+):([\d.,]+)\s*-->\s*(\d+):(\d+):([\d.,]+)/;

export function parseWords(subtitle: string): TimedWord[] {
  // Transcricao JSON por palavra (npx hyperframes transcribe / scripts/video/transcrever.ts)
  const trimmed = subtitle.trim();
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    const data = JSON.parse(trimmed);
    const list: { text?: string; word?: string; start: number; end: number }[] = Array.isArray(data) ? data : data.words ?? [];
    return list
      .map((w) => ({ text: String(w.text ?? w.word ?? '').trim(), start: Number(w.start), end: Number(w.end) }))
      .filter((w) => w.text && /[\p{L}\p{N}]/u.test(w.text));
  }
  const blocks = subtitle.replace(/\r/g, '').split(/\n\n+/);
  const words: TimedWord[] = [];
  const hasWordTiming = /<\d+:\d+:[\d.]+><c>/.test(subtitle);

  for (const block of blocks) {
    const lines = block.split('\n');
    const i = lines.findIndex((l) => TIME.test(l));
    if (i < 0) continue;
    const m = lines[i].match(TIME)!;
    const t0 = toSec(m[1], m[2], m[3]);
    const t1 = toSec(m[4], m[5], m[6]);
    const body = lines.slice(i + 1);

    if (hasWordTiming) {
      const tagged = body.find((l) => l.includes('<c>'));
      if (!tagged) {
        // YouTube: linha nova de uma palavra so vem sem marcacao interna; cues de 10 ms sao repeticao
        const last = body.map((l) => l.trim()).filter(Boolean).pop();
        const prevText = words.length ? words[words.length - 1].text : '';
        if (last && t1 - t0 > 0.05 && !last.includes(' ') && last !== prevText) {
          const seen = body.map((l) => l.trim()).filter(Boolean);
          if (seen.length >= 2 || !words.length) words.push({ text: last, start: t0, end: t1 });
        }
        continue;
      }
      // primeira palavra comeca em t0; as seguintes trazem o proprio tempo
      const parts = tagged.split(/<(\d+:\d+:[\d.]+)>/);
      let cursor = t0;
      for (let k = 0; k < parts.length; k += 2) {
        const text = parts[k].replace(/<[^>]+>/g, '').trim();
        const next = parts[k + 1] ? toSec(...(parts[k + 1].split(':') as [string, string, string])) : t1;
        if (text) for (const w of text.split(/\s+/)) words.push({ text: w, start: cursor, end: next });
        cursor = next;
      }
    } else {
      const text = body.join(' ').replace(/<[^>]+>/g, '').trim();
      if (!text) continue;
      const list = text.split(/\s+/);
      const total = list.reduce((a, w) => a + w.length + 1, 0);
      let cursor = t0;
      for (const w of list) {
        const d = ((w.length + 1) / total) * (t1 - t0);
        words.push({ text: w, start: cursor, end: cursor + d });
        cursor += d;
      }
    }
  }
  // fecha buracos: cada palavra vai ate o inicio da proxima (limitado a 0.6 s de silencio)
  for (let k = 0; k < words.length - 1; k++) {
    const gap = words[k + 1].start - words[k].end;
    if (gap > 0 && gap < 0.6) words[k].end = words[k + 1].start;
  }
  return words;
}

const STOP_AFTER = /[.,!?;:…]$/;
const EMPHASIS = /^(\*.+\*|R?\$?\d[\d.,]*%?|\d+x)$/i;

export function groupCards(words: TimedWord[], opts: CardOptions = {}): CaptionCard[] {
  const { maxWords = 2, maxChars = 16, minDuration = 0.3, leadIn = -0.05 } = opts;
  const cards: CaptionCard[] = [];
  let cur: TimedWord[] = [];

  const flush = () => {
    if (!cur.length) return;
    const text = cur.map((w) => w.text.replace(/\*/g, '')).join(' ');
    const emph = cur.find((w) => EMPHASIS.test(w.text.replace(/[.,!?;:]$/, '')));
    cards.push({
      text: text.replace(/[.,;:]$/, ''),
      words: cur,
      start: Math.max(0, cur[0].start + leadIn),
      end: cur[cur.length - 1].end + leadIn,
      emphasis: emph ? emph.text.replace(/[*.,!?;:]/g, '') : undefined,
    });
    cur = [];
  };

  for (const w of words) {
    const nextText = [...cur, w].map((x) => x.text).join(' ');
    if (cur.length && (cur.length >= maxWords || nextText.length > maxChars)) flush();
    cur.push(w);
    if (STOP_AFTER.test(w.text)) flush();
  }
  flush();

  // junta cartoes curtos demais com o proximo
  const merged: CaptionCard[] = [];
  for (const c of cards) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.end - prev.start < minDuration &&
      (prev.words.length + c.words.length <= maxWords + 1 || `${prev.text} ${c.text}`.length <= maxChars + 6)
    ) {
      prev.words.push(...c.words);
      prev.text = `${prev.text} ${c.text}`;
      prev.end = c.end;
      prev.emphasis = prev.emphasis ?? c.emphasis;
    } else merged.push({ ...c, words: [...c.words] });
  }
  // cada cartao fica ate o proximo comecar (sem tela vazia em pausas curtas)
  for (let k = 0; k < merged.length - 1; k++) {
    const gap = merged[k + 1].start - merged[k].end;
    if (gap < 0.8) merged[k].end = merged[k + 1].start;
  }
  return merged;
}

export function cardsFromSubtitle(subtitle: string, opts?: CardOptions): CaptionCard[] {
  return groupCards(parseWords(subtitle), opts);
}
