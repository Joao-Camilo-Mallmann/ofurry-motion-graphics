/**
 * "Gravador" de motion/react para o build do HyperFrames.
 * Renderiza o icone do Lucide Animated em HTML estatico e grava, em cada elemento animado,
 * um atributo data-lm com { tag, base, target, transition, style } ja resolvidos.
 * O runtime hf/kit/house-runtime.js (House.lucide) toca isso quadro a quadro.
 */
import React, { forwardRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Variants = Record<string, any>;
export type Transition = Record<string, any>;

const CONTROLS = '__lucideControls';
export function useAnimation() {
  return { [CONTROLS]: true, start: async () => undefined, stop: () => undefined, set: () => undefined };
}
export const cubicBezier = (a: number, b: number, c: number, d: number) => ({ __bezier: [a, b, c, d] });
export const easeInOut = 'easeInOut';
export const easeOut = 'easeOut';
export const easeIn = 'easeIn';
export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

const TARGETS = ['animate', 'visible', 'fadeIn', 'active', 'firstState', 'show'];
const MOTION_ONLY = ['animate', 'initial', 'variants', 'transition', 'custom', 'exit', 'whileHover', 'whileTap', 'whileInView', 'whileFocus', 'onAnimationComplete', 'onAnimationStart', 'layout', 'layoutId'];

function resolve(variants: Variants | undefined, name: any, custom: any) {
  if (!name) return undefined;
  if (typeof name === 'object' && !(CONTROLS in name)) return name;
  if (typeof name !== 'string' || !variants) return undefined;
  const v = variants[name];
  return typeof v === 'function' ? v(custom) : v;
}

/** JSON sem perder Infinity nem funcoes de curva. */
function serialize(v: any): any {
  if (v === Infinity) return 'Infinity';
  if (typeof v === 'function') return 'easeInOut';
  if (Array.isArray(v)) return v.map(serialize);
  if (v && typeof v === 'object') {
    const o: Record<string, any> = {};
    for (const [k, x] of Object.entries(v)) o[k] = serialize(x);
    return o;
  }
  return v;
}

function make(tag: string) {
  const C = forwardRef<any, any>((props, ref) => {
    const { variants, initial, animate, transition, custom, style, ...rest } = props;
    const baseName = typeof initial === 'string' ? initial : 'normal';
    const base = (initial && typeof initial === 'object' ? initial : resolve(variants, baseName, custom)) ?? resolve(variants, 'normal', custom) ?? {};
    let target: any;
    if (animate && typeof animate === 'object' && !(CONTROLS in animate)) target = animate;
    else if (variants) for (const n of TARGETS) if (variants[n]) { target = resolve(variants, n, custom); break; }
    for (const k of MOTION_ONLY) delete rest[k];
    const spec = serialize({
      tag,
      base,
      target,
      transition,
      style: style ? { originX: style.originX, originY: style.originY } : undefined,
    });
    const cleanStyle = style ? { ...style } : undefined;
    if (cleanStyle) {
      delete cleanStyle.originX;
      delete cleanStyle.originY;
    }
    return React.createElement(tag, { ref, ...rest, style: cleanStyle, 'data-lm': JSON.stringify(spec) });
  });
  C.displayName = `motion.${tag}`;
  return C;
}

const cache: Record<string, React.ComponentType<any>> = {};
export const motion: Record<string, React.ComponentType<any>> = new Proxy({} as Record<string, React.ComponentType<any>>, {
  get: (_t, tag: string) => (cache[tag] ??= make(tag)),
});
