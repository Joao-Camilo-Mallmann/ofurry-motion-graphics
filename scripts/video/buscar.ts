/**
 * Acha em que segundo da narracao uma frase do roteiro foi dita.
 * Uso: bun run video:buscar <id> "frase inicial" ["frase final"]
 * Com duas frases, imprime o intervalo pronto para video:cortar.
 */
import { join } from 'node:path';
import { findPhrase, fmt, loadWords, readManifest, videoDir } from './lib';

const [id, inicio, fim] = process.argv.slice(2);
if (!id || !inicio) {
  console.error('Uso: bun run video:buscar <id> "frase inicial" ["frase final"]');
  process.exit(1);
}
const m = readManifest(id);
if (!m.transcricao) {
  console.error(`Sem transcricao. Rode: bun run video:transcrever ${id}`);
  process.exit(1);
}
const words = loadWords(join(videoDir(id), m.transcricao));
const a = findPhrase(words, inicio);
if (!a) process.exit(1);
const t0 = words[a.index].start;
console.log(`inicio: ${fmt(t0)} (${t0.toFixed(2)} s) confianca ${(a.score * 100).toFixed(0)}%  "${words.slice(a.index, a.index + 10).map((w) => w.text).join(' ')}..."`);
if (fim) {
  const b = findPhrase(words, fim, a.index);
  if (!b) process.exit(1);
  const n = fim.trim().split(/\s+/).length;
  const last = words[Math.min(words.length - 1, b.index + n - 1)];
  const t1 = last.end;
  console.log(`fim:    ${fmt(t1)} (${t1.toFixed(2)} s) confianca ${(b.score * 100).toFixed(0)}%  "...${words.slice(Math.max(0, b.index + n - 10), b.index + n).map((w) => w.text).join(' ')}"`);
  const pad = 0.25;
  console.log(`\nbun run video:cortar ${id} <XX> ${Math.max(0, t0 - pad).toFixed(2)} ${(t1 + pad).toFixed(2)} --titulo "..."`);
}
