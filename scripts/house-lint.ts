/**
 * Checa uma folha de batidas contra as regras do canal antes de renderizar.
 * Uso:
 *   bun run house:lint                         todas as folhas do Remotion (src/house/sheets.ts)
 *   bun run house:lint <id>                    uma folha do Remotion
 *   bun run house:lint <video> <trecho>        videos/<video>/output/trecho-XX/beats.json
 *   bun run house:lint caminho/beats.json
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { BeatSheet } from '../src/house/beats';
import { cardsFromSubtitle } from '../src/house/captions';
import { lintBeatSheet } from '../src/house/lint';
import { HOUSE_SHEETS } from '../src/house/sheets';

const root = join(import.meta.dir, '..');
const args = process.argv.slice(2);
const jobs: { sheet: BeatSheet; base: string }[] = [];

if (args[0]?.endsWith('.json')) {
  const p = resolve(args[0]);
  jobs.push({ sheet: JSON.parse(readFileSync(p, 'utf8')), base: dirname(p) });
} else if (args.length === 2) {
  const p = join(root, 'videos', args[0], 'output', `trecho-${args[1].padStart(2, '0')}`, 'beats.json');
  if (!existsSync(p)) {
    console.error(`Nao achei ${p}`);
    process.exit(1);
  }
  jobs.push({ sheet: JSON.parse(readFileSync(p, 'utf8')), base: dirname(p) });
} else {
  for (const s of HOUSE_SHEETS.filter((s) => !args[0] || s.id === args[0])) jobs.push({ sheet: s, base: join(root, 'public') });
}

let total = 0;
for (const { sheet, base } of jobs) {
  const sub = sheet.subtitle ?? (sheet.subtitlePath ? readFileSync(join(base, sheet.subtitlePath), 'utf8') : '');
  const cards = sub ? cardsFromSubtitle(sub, sheet.cardOptions).filter((c) => c.start < sheet.duration) : [];
  const issues = lintBeatSheet(sheet, cards);
  total += issues.length;
  console.log(`\n${sheet.id}: ${issues.length} aviso(s), ${sheet.beats.length} batidas, ${cards.length} cartoes de legenda`);
  for (const i of issues) console.log(`  [${i.at.toFixed(1)}-${i.until.toFixed(1)}s] ${i.rule}: ${i.message}`);
}
process.exit(total ? 1 : 0);
