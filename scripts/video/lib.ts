/** Utilitarios compartilhados pelos scripts de organizacao de video (skill ofurry-organizar-video). */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseWords, TimedWord } from '../../src/house/captions';

export const ROOT = resolve(import.meta.dir, '..', '..');
export const HF_VERSION = '0.8.193';

export const videoDir = (id: string) => join(ROOT, 'videos', id);
export const trechoId = (n: string | number) => `trecho-${String(n).padStart(2, '0')}`;
export const trechoDir = (id: string, n: string | number) => join(videoDir(id), 'output', trechoId(n));

export interface TrechoInfo {
  id: string;
  titulo?: string;
  inicio: number; // segundos na narracao completa
  fim: number;
  bloco?: string; // bloco do roteiro
}
export interface VideoManifest {
  id: string;
  titulo: string;
  narracao?: string; // midia/narracao.wav
  transcricao?: string; // midia/transcricao.json
  trechos: TrechoInfo[];
}

export function readManifest(id: string): VideoManifest {
  const p = join(videoDir(id), 'video.json');
  if (!existsSync(p)) throw new Error(`Video ${id} sem video.json. Rode: bun run video:novo ${id} --titulo "..."`);
  return JSON.parse(readFileSync(p, 'utf8'));
}
export function writeManifest(m: VideoManifest) {
  m.trechos.sort((a, b) => a.inicio - b.inicio);
  writeFileSync(join(videoDir(m.id), 'video.json'), JSON.stringify(m, null, 2) + '\n');
}

export function loadWords(file: string): TimedWord[] {
  return parseWords(readFileSync(file, 'utf8'));
}

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9%$ ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

/**
 * Acha uma frase do roteiro na transcricao (tolerante a pequenas diferencas de transcricao).
 * Retorna o indice da primeira palavra e a nota (0-1) da melhor janela.
 */
export function findPhrase(words: TimedWord[], phrase: string, fromIndex = 0): { index: number; score: number } | null {
  const target = norm(phrase);
  if (!target.length) return null;
  const tokens = words.map((w) => norm(w.text).join(' '));
  let best: { index: number; score: number } | null = null;
  for (let i = fromIndex; i <= tokens.length - target.length; i++) {
    let hit = 0;
    for (let k = 0; k < target.length; k++) if (tokens[i + k] === target[k]) hit++;
    const score = hit / target.length;
    if (!best || score > best.score) best = { index: i, score };
    if (score === 1) break;
  }
  return best;
}

export const fmt = (t: number) => {
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`;
};

export function toVtt(words: TimedWord[]): string {
  // VTT com uma palavra por cue: legivel por qualquer editor e pelo parser da casa
  const ts = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = (t % 60).toFixed(3).padStart(6, '0');
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`;
  };
  return `WEBVTT\n\n${words.map((w) => `${ts(w.start)} --> ${ts(w.end)}\n${w.text}`).join('\n\n')}\n`;
}
