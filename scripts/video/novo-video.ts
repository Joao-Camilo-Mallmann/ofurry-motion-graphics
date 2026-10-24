/**
 * Cria a pasta de um video novo.
 * Uso: bun run video:novo <id> --titulo "Titulo do video" [--roteiro caminho.md] [--audio narracao.wav]
 *
 * videos/<id>/
 *   video.json        manifesto (titulo, narracao, transcricao, trechos)
 *   roteiro.md        roteiro completo (unica fonte de contexto entre trechos)
 *   midia/            narracao completa + transcricao
 *   acervo/           prints/, broll/, imagens/  (assets citados pelos beats)
 *   output/           trecho-XX/ (criados por video:cortar)
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { VideoManifest, videoDir, writeManifest } from './lib';

const args = process.argv.slice(2);
const id = args[0];
const opt = (k: string) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : undefined;
};
if (!id || id.startsWith('--')) {
  console.error('Uso: bun run video:novo <id> --titulo "..." [--roteiro roteiro.md] [--audio narracao.wav]');
  process.exit(1);
}
const dir = videoDir(id);
if (existsSync(join(dir, 'video.json'))) {
  console.error(`Ja existe: ${dir}/video.json`);
  process.exit(1);
}
for (const d of ['midia', 'acervo/prints', 'acervo/broll', 'acervo/imagens', 'output']) mkdirSync(join(dir, d), { recursive: true });

const m: VideoManifest = { id, titulo: opt('--titulo') ?? id, trechos: [] };

const roteiro = opt('--roteiro');
if (roteiro) copyFileSync(resolve(roteiro), join(dir, 'roteiro.md'));
else if (!existsSync(join(dir, 'roteiro.md'))) writeFileSync(join(dir, 'roteiro.md'), `# ${m.titulo}\n\n## [GANCHO]\n\n## [BLOCO 1]\n`);

const audio = opt('--audio');
if (audio) {
  const src = resolve(audio);
  const dest = join(dir, 'midia', 'narracao.wav');
  if (extname(src).toLowerCase() === '.wav') copyFileSync(src, dest);
  else spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-vn', '-ac', '2', '-ar', '48000', dest], { stdio: 'inherit' });
  m.narracao = 'midia/narracao.wav';
}
writeManifest(m);
console.log(`Video criado: ${dir}`);
console.log(audio ? `Proximo: bun run video:transcrever ${id}` : `Proximo: coloque a narracao com --audio ou em midia/narracao.wav e rode bun run video:transcrever ${id}`);
