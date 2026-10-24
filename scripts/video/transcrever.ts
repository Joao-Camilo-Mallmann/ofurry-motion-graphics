/**
 * Transcreve a narracao completa com tempo por palavra (Parakeet local via HyperFrames; Whisper opcional).
 * Uso: bun run video:transcrever <id> [--motor auto|parakeet|whisper] [--modelo medium] [--importar legenda.srt|.vtt|.json]
 *
 * Gera midia/transcricao.json (palavras) e midia/transcricao.vtt (uma palavra por cue).
 * --importar usa uma legenda que voce ja tem (CapCut, Premiere, YouTube) em vez de transcrever.
 * Depois REVISE o texto: erro de transcricao vira erro na tela.
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { HF_VERSION, loadWords, readManifest, toVtt, videoDir, writeManifest } from './lib';

const args = process.argv.slice(2);
const id = args[0];
const opt = (k: string) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : undefined;
};
if (!id) {
  console.error('Uso: bun run video:transcrever <id> [--modelo small] [--importar legenda.srt]');
  process.exit(1);
}
const m = readManifest(id);
const dir = videoDir(id);
const midia = join(dir, 'midia');
const outJson = join(midia, 'transcricao.json');

const importar = opt('--importar');
if (importar) {
  const words = loadWords(resolve(importar));
  writeFileSync(outJson, JSON.stringify(words.map((w, i) => ({ id: `w${i}`, ...w })), null, 1) + '\n');
} else {
  const audio = join(dir, m.narracao ?? 'midia/narracao.wav');
  if (!existsSync(audio)) {
    console.error(`Sem narracao em ${audio}`);
    process.exit(1);
  }
  const tmp = join(midia, '.hf-transcribe');
  mkdirSync(tmp, { recursive: true });
  // Motor "auto": Parakeet (instalado com `npx hyperframes models install parakeet`) e o padrao para pt;
  // --motor whisper --modelo medium forca o Whisper.
  const motor = opt('--motor') ?? 'auto';
  const model = opt('--modelo');
  console.log(`Transcrevendo (motor ${motor}, pt)...`);
  const hfArgs = ['-y', `hyperframes@${HF_VERSION}`, 'transcribe', JSON.stringify(audio), '-d', JSON.stringify(tmp), '--engine', motor, '--language', 'pt', '--json'];
  if (model) hfArgs.push('--model', model);
  const r = spawnSync('npx', hfArgs, { stdio: ['ignore', 'pipe', 'pipe'], shell: true, maxBuffer: 256 * 1024 * 1024 });
  // stdout: um JSON final { ok, engine, wordCount, transcriptPath }; stderr: progresso e blocos de palavras
  const lines = String(r.stdout ?? '').trim().split(/\r?\n/).filter(Boolean);
  let result: { ok?: boolean; reason?: string; engine?: string; model?: string; transcriptPath?: string; install?: string } = {};
  try {
    result = JSON.parse(lines[lines.length - 1] ?? '{}');
  } catch {
    /* saida inesperada: cai nos caminhos conhecidos abaixo */
  }
  if (r.status !== 0 || result.ok === false) {
    console.error(`Transcricao falhou: ${result.reason ?? `codigo ${r.status}`}`);
    if (result.reason === 'whisper_unavailable' || result.install) console.error(`Instale o modelo: npx hyperframes@${HF_VERSION} models install parakeet`);
    console.error(String(r.stderr ?? '').split(/\r?\n/).filter((l) => !l.includes('"type":"')).slice(-8).join('\n'));
    console.error('Ou use uma legenda pronta: bun run video:transcrever <id> --importar legenda.srt');
    process.exit(1);
  }
  const produced = [result.transcriptPath, join(tmp, 'transcript.json'), join(tmp, 'assets', 'transcript.json')].find((p) => p && existsSync(p));
  if (!produced) {
    console.error(`O HyperFrames nao gerou a transcricao em ${tmp}`);
    process.exit(1);
  }
  console.log(`Motor usado: ${result.engine ?? '?'} ${result.model ?? ''}`);
  copyFileSync(produced, outJson);
}
const words = loadWords(outJson);
writeFileSync(join(midia, 'transcricao.vtt'), toVtt(words));
m.transcricao = 'midia/transcricao.json';
writeManifest(m);
const dur = words.length ? words[words.length - 1].end : 0;
console.log(`${words.length} palavras, ${dur.toFixed(1)} s -> ${outJson}`);
console.log(`Primeiras: ${words.slice(0, 18).map((w) => w.text).join(' ')}`);
console.log(`Proximo: bun run video:buscar ${id} "primeira frase do trecho" "ultima frase do trecho"`);
