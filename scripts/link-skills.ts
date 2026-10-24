/**
 * Liga cada skill de .agents/skills em .claude/skills (para o Claude Code encontrar).
 * Uso: bun run skills:link
 * No Windows cria junções; no macOS/Linux, links simbólicos. .claude/skills fica fora do git.
 */
import { existsSync, mkdirSync, readdirSync, symlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dir, '..');
const from = join(root, '.agents', 'skills');
const to = join(root, '.claude', 'skills');
mkdirSync(to, { recursive: true });
let made = 0;
for (const name of readdirSync(from, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const dest = join(to, name);
  if (existsSync(dest)) continue;
  symlinkSync(join(from, name), dest, process.platform === 'win32' ? 'junction' : 'dir');
  made++;
}
console.log(`${made} skill(s) ligada(s) em .claude/skills`);
