/**
 * Baixa os icones do Lucide Animated (https://lucide-animated.com, MIT) e adapta para o Remotion.
 *
 * Uso: bun run sync:lucide-animated
 *
 * Para cada icone do registro:
 *  - troca `motion/react` pelo shim deterministico (src/lucide-animated/motion-shim.tsx)
 *  - troca `@/lib/utils` pelo `cn` local
 *  - grava em src/lucide-animated/icons/<nome>.tsx
 * Depois gera src/lucide-animated/icons/index.ts com o mapa nome -> componente.
 */
import { mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'https://lucide-animated.com/r';
const OUT = join(import.meta.dir, '..', 'src', 'lucide-animated', 'icons');

type RegistryItem = { name: string };
type RegistryFile = { files: { content: string }[] };

async function fetchJson<T>(url: string, tries = 3): Promise<T> {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url);
    if (res.ok) return (await res.json()) as T;
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  throw new Error(`Falha ao baixar ${url}`);
}

function adapt(src: string): string {
  let s = src.replace(/^"use client";\s*/m, '');
  s = s.replace(/from "motion\/react"/g, 'from "../motion-shim"');
  s = s.replace(/import \{ cn \} from "@\/lib\/utils";/g, 'import { cn } from "../cn";');
  if (/\bReact\./.test(s) && !/import (\* as )?React\b/.test(s)) {
    s = `import type * as React from "react";\n${s}`;
  }
  return `// Gerado por scripts/sync-lucide-animated.ts a partir de lucide-animated.com (MIT). Nao editar a mao.\n// @ts-nocheck\n${s}`;
}

async function main() {
  const registry = await fetchJson<{ items: RegistryItem[] }>(`${BASE}/registry.json`);
  const names = registry.items.map((i) => i.name).sort();

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const exports: { name: string; component: string }[] = [];
  const failed: string[] = [];
  const queue = [...names];

  async function worker() {
    while (queue.length) {
      const name = queue.shift()!;
      try {
        const item = await fetchJson<RegistryFile>(`${BASE}/${name}.json`);
        const content = item.files.map((f) => f.content).join('\n');
        const m =
          content.match(/export \{ (?:\w+ as )?(\w+Icon) \}/) ?? content.match(/export const (\w+Icon)\s*=/);
        if (!m) throw new Error('sem export');
        writeFileSync(join(OUT, `${name}.tsx`), adapt(content));
        exports.push({ name, component: m[1] });
      } catch (e) {
        failed.push(`${name}: ${(e as Error).message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: 12 }, worker));

  exports.sort((a, b) => a.name.localeCompare(b.name));
  const lines = [
    '// Gerado por scripts/sync-lucide-animated.ts. Nao editar a mao.',
    "import type { ComponentType } from 'react';",
    ...exports.map((e) => `import { ${e.component} } from './${e.name}';`),
    '',
    'export const LUCIDE_ANIMATED = {',
    ...exports.map((e) => `  '${e.name}': ${e.component},`),
    '} as unknown as Record<LucideAnimatedName, ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>>;',
    '',
    `export type LucideAnimatedName =\n${exports.map((e) => `  | '${e.name}'`).join('\n')};`,
    '',
    `export const LUCIDE_ANIMATED_NAMES: LucideAnimatedName[] = [${exports.map((e) => `'${e.name}'`).join(', ')}];`,
    '',
  ];
  writeFileSync(join(OUT, 'index.ts'), `import type * as React from 'react';\n${lines.join('\n')}`);

  console.log(`${exports.length} icones gravados em src/lucide-animated/icons`);
  if (failed.length) console.log(`Falharam (${failed.length}):\n${failed.join('\n')}`);
  console.log(`Arquivos: ${readdirSync(OUT).length}`);
}

main();
