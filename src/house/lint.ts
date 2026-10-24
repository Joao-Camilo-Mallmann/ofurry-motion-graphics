import type { BeatSheet } from './beats';
import { CaptionCard } from './captions';
import { House } from './theme';

export interface LintIssue {
  at: number;
  until: number;
  rule: 'parado' | 'preto-com-voz' | 'cartao-curto' | 'cartao-longo' | 'gancho-lento' | 'fora-do-tempo';
  message: string;
}

/**
 * Checa a folha de batidas contra as regras do canal (os problemas que mais se repetiram
 * nos 7 videos analisados): planos sem novidade, tela preta com narracao, cartoes ilegiveis.
 */
export function lintBeatSheet(sheet: BeatSheet, cards: CaptionCard[] = []): LintIssue[] {
  const issues: LintIssue[] = [];
  const windows = sheet.captions ?? [{ from: 0, until: sheet.duration }];
  const inCaption = (t: number) => windows.some((w) => t >= w.from && t <= w.until);

  // Eventos visuais: inicio de batida, troca interna (icones, poses), troca de fundo e troca de cartao visivel
  const events: number[] = [];
  for (const b of sheet.beats) {
    events.push(b.at);
    if (b.kind === 'icons') b.items.forEach((it) => events.push(it.at));
    if (b.kind === 'mascot') {
      b.poses?.forEach((p) => events.push(p.at));
      if (b.shrinkAt !== undefined) events.push(b.shrinkAt);
    }
    if (b.kind === 'proof' && b.highlightAt !== undefined) events.push(b.highlightAt);
    if (b.kind === 'icon' && b.strikeAt !== undefined) events.push(b.strikeAt);
    if (b.kind === 'icons') b.items.forEach((it) => it.strikeAt !== undefined && events.push(it.strikeAt));
    if (b.kind === 'chapter') events.push(b.at + House.timing.chapterSilence);
    if (b.kind === 'type-on' && b.eraseAt !== undefined) events.push(b.eraseAt);
    if (b.at < 0 || b.until > sheet.duration + 0.01) {
      issues.push({ at: b.at, until: b.until, rule: 'fora-do-tempo', message: `${b.kind} passa da duracao do video` });
    }
  }
  sheet.backdrops.forEach((b) => events.push(b.at));
  cards.filter((c) => inCaption(c.start)).forEach((c) => events.push(c.start));
  events.push(sheet.duration);
  const sorted = [...new Set(events.map((e) => Math.round(e * 100) / 100))].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length - 1; i++) {
    const gap = sorted[i + 1] - sorted[i];
    if (gap > House.timing.maxStaticHold) {
      issues.push({ at: sorted[i], until: sorted[i + 1], rule: 'parado', message: `${gap.toFixed(1)} s sem nada novo na tela (max ${House.timing.maxStaticHold} s)` });
    }
  }

  // Tela preta com voz: cartao falado sem batida e fora das janelas de legenda
  for (const c of cards) {
    const covered = inCaption(c.start) || sheet.beats.some((b) => c.start >= b.at - 0.15 && c.start < b.until);
    if (!covered && c.end - c.start > House.timing.maxBlackWithVoice) {
      issues.push({ at: c.start, until: c.end, rule: 'preto-com-voz', message: `fala "${c.text}" sem nada na tela` });
    }
  }

  for (const c of cards.filter((c) => inCaption(c.start))) {
    const d = c.end - c.start;
    if (d < House.timing.cardMin - 0.05) issues.push({ at: c.start, until: c.end, rule: 'cartao-curto', message: `"${c.text}" fica so ${d.toFixed(2)} s` });
    if (d > 2.5) issues.push({ at: c.start, until: c.end, rule: 'cartao-longo', message: `"${c.text}" fica ${d.toFixed(1)} s parado` });
  }

  // Gancho: pelo menos 9 mudancas nos primeiros 30 s (o video de maior retencao tem ~40)
  const hookEvents = sorted.filter((t) => t < Math.min(30, sheet.duration)).length;
  if (sheet.duration >= 30 && hookEvents < 9) {
    issues.push({ at: 0, until: 30, rule: 'gancho-lento', message: `so ${hookEvents} mudancas nos primeiros 30 s` });
  }
  return issues.sort((a, b) => a.at - b.at);
}
