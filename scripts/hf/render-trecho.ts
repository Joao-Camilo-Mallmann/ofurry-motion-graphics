/**
 * Checa e renderiza o projeto HyperFrames de um trecho.
 *
 * Uso: bun run hf:render <video> <trecho> [--so-preto | --so-alpha] [--draft]
 *   -> <trecho>/render/<video>-trecho-XX.mp4        (fundo preto, para conferir com audio)
 *   -> <trecho>/render/<video>-trecho-XX-alpha.mov  (ProRes 4444 transparente, para o editor)
 */
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const HF_VERSION = '0.8.193';
const ROOT = resolve(import.meta.dir, '..', '..');
const args = process.argv.slice(2);
const [video, trechoArg] = args.filter((a) => !a.startsWith('--'));
if (!video || !trechoArg) {
  console.error('Uso: bun run hf:render <video> <trecho> [--so-preto | --so-alpha] [--draft]');
  process.exit(1);
}
const trecho = `trecho-${trechoArg.padStart(2, '0')}`;
const dir = join(ROOT, 'videos', video, 'output', trecho);
const hfDir = join(dir, 'hf');
if (!existsSync(join(hfDir, 'index.html'))) {
  console.error(`Projeto nao encontrado: ${hfDir}. Rode antes: bun run hf:build ${video} ${trechoArg}`);
  process.exit(1);
}
const out = join(dir, 'render');
mkdirSync(out, { recursive: true });
const quality = args.includes('--draft') ? 'draft' : 'delivery';
const hf = (...a: string[]) => spawnSync('npx', ['-y', `hyperframes@${HF_VERSION}`, ...a], { cwd: hfDir, stdio: 'inherit', shell: true });

console.log('> check');
const check = hf('check', '--json');
if (check.status !== 0) {
  console.error('check falhou: corrija os erros antes de renderizar.');
  process.exit(check.status ?? 1);
}
const base = `${video}-${trecho}`;
if (!args.includes('--so-alpha')) {
  console.log('> render MP4 (fundo preto)');
  hf('render', '-o', JSON.stringify(join(out, `${base}.mp4`)), '-q', quality, '--quiet');
}
if (!args.includes('--so-preto')) {
  console.log('> render MOV transparente (ProRes 4444)');
  hf('render', '--format', 'mov', '--variables', `"{\\"transparente\\":true}"`, '-o', JSON.stringify(join(out, `${base}-alpha.mov`)), '--quiet');
}
console.log(`Pronto: ${out}`);
