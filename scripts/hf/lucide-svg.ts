/**
 * SVG dos icones para o HyperFrames.
 *  - staticIcon(name, size): qualquer icone do lucide-react.
 *  - animatedIcon(name, size): icone do Lucide Animated com data-lm (spec da animacao) em cada elemento animado.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as Lucide from 'lucide-react';

const ROOT = join(import.meta.dir, '..', '..');
const ICONS_DIR = join(ROOT, 'src', 'lucide-animated', 'icons');
const CACHE = join(import.meta.dir, '.cache', 'lucide');

const pascal = (s: string) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

export function hasAnimated(name: string) {
  return existsSync(join(ICONS_DIR, `${name}.tsx`));
}

export function staticIcon(name: string, size: number): string {
  const map = Lucide as unknown as Record<string, React.ComponentType<any>>;
  const Comp = map[pascal(name)] ?? map[`${pascal(name)}Icon`];
  if (!Comp) throw new Error(`Icone Lucide nao encontrado: ${name}`);
  return renderToStaticMarkup(React.createElement(Comp, { size, color: 'currentColor', strokeWidth: 2 }));
}

export async function animatedIcon(name: string, size: number): Promise<string> {
  mkdirSync(CACHE, { recursive: true });
  const src = readFileSync(join(ICONS_DIR, `${name}.tsx`), 'utf8')
    .replace(/from "\.\.\/motion-shim"/g, 'from "../../lucide-record"')
    .replace(/from "\.\.\/cn"/g, 'from "../../../../src/lucide-animated/cn"');
  const file = join(CACHE, `${name}.tsx`);
  writeFileSync(file, src);
  const mod = await import(file);
  const Comp = Object.values(mod).find((v) => typeof v === 'function' || (typeof v === 'object' && v !== null && '$$typeof' in (v as object))) as React.ComponentType<any>;
  if (!Comp) throw new Error(`Componente animado nao encontrado: ${name}`);
  const html = renderToStaticMarkup(React.createElement(Comp, { size }));
  // tira o <div> de hover do original e fica so com o <svg>
  const m = html.match(/<svg[\s\S]*<\/svg>/);
  return m ? m[0] : html;
}

export async function iconSvg(name: string, size: number, animated = true): Promise<{ svg: string; animated: boolean }> {
  if (animated && hasAnimated(name)) return { svg: await animatedIcon(name, size), animated: true };
  return { svg: staticIcon(name, size), animated: false };
}
