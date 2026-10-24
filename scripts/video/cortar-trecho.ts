/**
 * Cria um trecho a partir de um intervalo da narracao completa.
 * Uso: bun run video:cortar <id> <XX> <inicio_s> <fim_s> [--titulo "..."] [--bloco "BLOCO 3"]
 *
 * videos/<id>/output/trecho-XX/
 *   midia/narracao.wav     audio cortado (tempo 0 = inicio do trecho)
 *   midia/narracao.json    palavras com tempo relativo ao trecho
 *   midia/narracao.vtt     uma palavra por cue
 *   plano.md               checkpoint editorial em prosa (preencher e aprovar)
 *   beats.json             folha de batidas (preencher depois da aprovacao)
 * Nao sobrescreve plano.md nem beats.json existentes.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fmt, loadWords, readManifest, toVtt, trechoDir, trechoId, videoDir, writeManifest } from './lib';

const args = process.argv.slice(2);
const [id, n, a, b] = args;
const opt = (k: string) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : undefined;
};
if (!id || !n || a === undefined || b === undefined) {
  console.error('Uso: bun run video:cortar <id> <XX> <inicio_s> <fim_s> [--titulo "..."] [--bloco "..."]');
  process.exit(1);
}
const inicio = Number(a);
const fim = Number(b);
const m = readManifest(id);
const dir = trechoDir(id, n);
mkdirSync(join(dir, 'midia'), { recursive: true });

const audio = join(videoDir(id), m.narracao ?? 'midia/narracao.wav');
if (existsSync(audio)) {
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(inicio), '-to', String(fim), '-i', audio, '-ac', '2', '-ar', '48000', join(dir, 'midia', 'narracao.wav')], { stdio: 'inherit' });
} else console.warn(`aviso: sem narracao em ${audio}; o trecho fica sem audio`);

let falas = '';
if (m.transcricao) {
  const words = loadWords(join(videoDir(id), m.transcricao))
    .filter((w) => (w.start + w.end) / 2 >= inicio && (w.start + w.end) / 2 < fim)
    .map((w, i) => ({ id: `w${i}`, text: w.text, start: Math.max(0, +(w.start - inicio).toFixed(3)), end: +(Math.min(fim, w.end) - inicio).toFixed(3) }));
  writeFileSync(join(dir, 'midia', 'narracao.json'), JSON.stringify(words, null, 1) + '\n');
  writeFileSync(join(dir, 'midia', 'narracao.vtt'), toVtt(words));
  // fala agrupada em frases de ~2 s para o plano
  let line: string[] = [];
  let t0 = 0;
  for (const w of words) {
    if (!line.length) t0 = w.start;
    line.push(w.text);
    if (w.end - t0 > 2.2 || /[.!?]$/.test(w.text)) {
      falas += `| ${fmt(t0)} | ${line.join(' ')} | | |\n`;
      line = [];
    }
  }
  if (line.length) falas += `| ${fmt(t0)} | ${line.join(' ')} | | |\n`;
}

const dur = +(fim - inicio).toFixed(3);
const titulo = opt('--titulo') ?? trechoId(n);
if (!existsSync(join(dir, 'plano.md'))) {
  writeFileSync(
    join(dir, 'plano.md'),
    `# ${trechoId(n)}: ${titulo}

- Video: ${m.titulo}
- Bloco do roteiro: ${opt('--bloco') ?? '(preencher)'}
- Narracao: ${fmt(inicio)} a ${fmt(fim)} da gravacao completa (${dur} s)
- Estado: RASCUNHO (mude para APROVADO depois do ok do usuario)

## Ideia do trecho
(1 frase: o que o espectador precisa entender ao fim destes ${Math.round(dur)} s)

## Batidas
Uma linha por fala. Receita = H1..H10 da skill ofurry-house-motion. Elemento = o que aparece na tela.

| Tempo | Fala | Receita | Elemento |
|---|---|---|---|
${falas}
## Fundos
(ex.: 0 s grade, 6 s estrelas, 14 s preto)

## Acervo necessario
- [ ] Poses do mascote: public/mascote/...
- [ ] Prints: acervo/prints/...
- [ ] B-roll: acervo/broll/...

## Continuidade
(como o fim deste trecho entrega para o proximo)
`
  );
}
if (!existsSync(join(dir, 'beats.json'))) {
  writeFileSync(
    join(dir, 'beats.json'),
    JSON.stringify(
      {
        id: `${id}-${trechoId(n)}`,
        duration: dur,
        fps: 30,
        audio: 'midia/narracao.wav',
        subtitlePath: 'midia/narracao.json',
        cardOptions: { maxWords: 2, maxChars: 16 },
        backdrops: [{ at: 0, backdrop: 'black' }],
        beats: [],
      },
      null,
      2
    ) + '\n'
  );
}
const tid = trechoId(n);
m.trechos = m.trechos.filter((t) => t.id !== tid);
m.trechos.push({ id: tid, titulo, inicio, fim, bloco: opt('--bloco') });
writeManifest(m);
console.log(`${tid} criado em ${dir} (${dur} s)`);
console.log(`Proximo: preencha plano.md, aprove com o usuario e escreva beats.json (skill ofurry-fazer-cenas).`);
