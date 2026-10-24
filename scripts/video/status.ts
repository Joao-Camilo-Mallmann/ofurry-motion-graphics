/**
 * Mostra onde cada trecho de um video esta no fluxo.
 * Uso: bun run video:status <id>
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fmt, readManifest, trechoDir, videoDir } from './lib';

const id = process.argv[2];
if (!id) {
  console.error('Uso: bun run video:status <id>');
  process.exit(1);
}
const m = readManifest(id);
const dir = videoDir(id);
console.log(`${m.titulo} (${id})`);
console.log(`  narracao:    ${m.narracao && existsSync(join(dir, m.narracao)) ? m.narracao : 'FALTA'}`);
console.log(`  transcricao: ${m.transcricao && existsSync(join(dir, m.transcricao)) ? m.transcricao : 'FALTA'}`);
console.log('');
const outDirs = existsSync(join(dir, 'output')) ? readdirSync(join(dir, 'output')).filter((d) => d.startsWith('trecho-')) : [];
const ids = [...new Set([...m.trechos.map((t) => t.id), ...outDirs])].sort();
for (const tid of ids) {
  const t = m.trechos.find((x) => x.id === tid);
  const d = trechoDir(id, tid.replace('trecho-', ''));
  const plano = join(d, 'plano.md');
  const aprovado = existsSync(plano) && /Estado:\s*APROVADO/i.test(readFileSync(plano, 'utf8'));
  let nBeats = 0;
  if (existsSync(join(d, 'beats.json'))) {
    try {
      nBeats = JSON.parse(readFileSync(join(d, 'beats.json'), 'utf8')).beats?.length ?? 0;
    } catch {
      nBeats = -1;
    }
  }
  const hf = existsSync(join(d, 'hf', 'index.html'));
  const renders = existsSync(join(d, 'render')) ? readdirSync(join(d, 'render')).filter((f) => /\.(mp4|mov|webm)$/.test(f)) : [];
  const etapa = renders.length ? 'renderizado' : hf ? 'cenas geradas' : nBeats > 0 ? 'batidas escritas' : aprovado ? 'plano aprovado' : existsSync(plano) ? 'plano em rascunho' : 'sem plano';
  console.log(
    `  ${tid}  ${t ? `${fmt(t.inicio)}-${fmt(t.fim)}` : '            '}  ${etapa.padEnd(18)} batidas=${nBeats < 0 ? 'JSON invalido' : nBeats}  ${renders.join(', ')}  ${t?.titulo ?? ''}`
  );
}
