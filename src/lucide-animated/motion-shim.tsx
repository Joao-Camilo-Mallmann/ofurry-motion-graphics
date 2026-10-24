/**
 * Substituto deterministico de `motion/react` para os icones do Lucide Animated.
 *
 * Os icones originais (https://lucide-animated.com, MIT) usam Framer Motion e animam no hover.
 * No Remotion cada frame precisa depender so do numero do frame, entao este modulo
 * reimplementa o pedaco da API que os icones usam (motion.*, useAnimation, variants,
 * transition, keyframes, springs, pathLength) calculando tudo a partir de useCurrentFrame().
 *
 * Quem decide quando a animacao comeca e o <LucideMotionProvider>, usado pelo <AnimatedLucide>.
 */
import React, { createContext, forwardRef, useContext } from 'react';
import { Easing, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from 'remotion';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Variants = Record<string, any>;
export type Transition = Record<string, any>;
type EaseFn = (t: number) => number;

// ---------------------------------------------------------------------------
// Contexto: quando e como o icone anima
// ---------------------------------------------------------------------------
export interface LucideMotionState {
  /** Frame (relativo a Sequence) em que a animacao "animate" comeca. */
  startFrame: number;
  /** Repete a animacao a cada N frames. Omitir = toca uma vez e segura o estado final. */
  loopEvery?: number;
  /** Multiplicador de velocidade (2 = duas vezes mais rapido). */
  speed: number;
  /** Nome da variante alvo. Padrao: "animate". */
  variant: string;
}

const LucideMotionContext = createContext<LucideMotionState>({ startFrame: 0, speed: 1, variant: 'animate' });

export const LucideMotionProvider: React.FC<Partial<LucideMotionState> & { children: React.ReactNode }> = ({
  children,
  startFrame = 0,
  loopEvery,
  speed = 1,
  variant = 'animate',
}) => (
  <LucideMotionContext.Provider value={{ startFrame, loopEvery, speed, variant }}>{children}</LucideMotionContext.Provider>
);

// ---------------------------------------------------------------------------
// API compativel com motion/react
// ---------------------------------------------------------------------------
const CONTROLS_TAG = '__lucideControls';

export function useAnimation() {
  return {
    [CONTROLS_TAG]: true,
    start: async (_v?: unknown) => undefined,
    stop: () => undefined,
    set: (_v?: unknown) => undefined,
  };
}

export const cubicBezier = (a: number, b: number, c: number, d: number): EaseFn => Easing.bezier(a, b, c, d);
export const easeInOut: EaseFn = Easing.bezier(0.42, 0, 0.58, 1);
export const easeOut: EaseFn = Easing.bezier(0, 0, 0.58, 1);
export const easeIn: EaseFn = Easing.bezier(0.42, 0, 1, 1);

export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

const NAMED_EASE: Record<string, EaseFn> = {
  linear: (t) => t,
  easeIn,
  easeOut,
  easeInOut,
  circIn: Easing.in(Easing.circle),
  circOut: Easing.out(Easing.circle),
  circInOut: Easing.inOut(Easing.circle),
  backIn: Easing.bezier(0.31, 0.01, 0.66, -0.59),
  backOut: Easing.bezier(0.33, 1.53, 0.69, 0.99),
  backInOut: Easing.bezier(0.68, -0.6, 0.32, 1.6),
  anticipate: Easing.bezier(0.68, -0.6, 0.32, 1.6),
};

function toEase(e: any): EaseFn {
  if (typeof e === 'function') return e;
  if (Array.isArray(e) && e.length === 4 && e.every((n) => typeof n === 'number')) {
    return Easing.bezier(e[0], e[1], e[2], e[3]);
  }
  if (typeof e === 'string' && NAMED_EASE[e]) return NAMED_EASE[e];
  return easeOut;
}

// Ordem de transformacao do Framer Motion
const TRANSFORM_KEYS = ['x', 'y', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY'];
const DEFAULTS: Record<string, number> = { scale: 1, scaleX: 1, scaleY: 1, opacity: 1, pathLength: 1, pathOffset: 0, pathSpacing: 1 };
const MOTION_ONLY_PROPS = ['animate', 'initial', 'variants', 'transition', 'custom', 'exit', 'whileHover', 'whileTap', 'whileInView', 'whileFocus', 'onAnimationComplete', 'onAnimationStart', 'layout', 'layoutId'];
const FALLBACK_TARGETS = ['animate', 'visible', 'fadeIn', 'active', 'firstState', 'show'];

function resolveVariant(variants: Variants | undefined, name: any, custom: any): Record<string, any> | undefined {
  if (!name) return undefined;
  if (typeof name === 'object' && !(CONTROLS_TAG in name)) return name; // animate={{...}} inline
  if (typeof name !== 'string' || !variants) return undefined;
  const v = variants[name];
  return typeof v === 'function' ? v(custom) : v;
}

function parseUnit(v: any): { n: number; unit: string } | null {
  if (typeof v === 'number') return { n: v, unit: '' };
  if (typeof v === 'string') {
    const m = v.match(/^(-?[\d.]+)(px|%|deg)?$/);
    if (m) return { n: parseFloat(m[1]), unit: m[2] ?? '' };
  }
  return null;
}

function isColor(v: any) {
  return typeof v === 'string' && /^(#|rgb|hsl)/.test(v);
}

/** Valor de uma propriedade no tempo t (segundos desde o inicio da animacao). */
function animateValue(key: string, from: any, target: any, tr: Transition, t: number, fps: number): any {
  let frames: any[] = Array.isArray(target) ? [...target] : [from, target];
  if (frames[0] === null || frames[0] === undefined) frames[0] = from ?? DEFAULTS[key] ?? 0;
  if (frames.length === 1) frames = [frames[0], frames[0]];

  const delay = tr.delay ?? 0;
  const te = t - delay;
  if (te < 0) return Array.isArray(target) ? frames[0] : from;

  const isSpring = tr.type === 'spring' && frames.length === 2;
  const duration = Math.max(0.001, tr.duration ?? (isSpring ? 0.8 : 0.3));
  const repeat = tr.repeat ?? 0;
  const repeatDelay = tr.repeatDelay ?? 0;
  const cycle = duration + repeatDelay;

  let local = te;
  let reverse = false;
  if (repeat > 0) {
    const idx = Math.floor(te / cycle);
    if (idx <= repeat || repeat === Infinity) {
      local = Math.min(te - idx * cycle, duration);
      if ((tr.repeatType === 'reverse' || tr.repeatType === 'mirror') && idx % 2 === 1) reverse = true;
    } else {
      local = duration;
      reverse = (tr.repeatType === 'reverse' || tr.repeatType === 'mirror') && repeat % 2 === 1;
    }
  }

  let p: number;
  if (isSpring) {
    p = spring({
      frame: local * fps,
      fps,
      config: { stiffness: tr.stiffness ?? 100, damping: tr.damping ?? 10, mass: tr.mass ?? 1 },
    });
  } else {
    p = Math.min(1, local / duration);
  }
  if (reverse) p = 1 - p;

  // Segmento de keyframe
  const n = frames.length;
  const times: number[] = tr.times && tr.times.length === n ? tr.times : frames.map((_, i) => i / (n - 1));
  let seg = 0;
  while (seg < n - 2 && p > times[seg + 1]) seg++;
  const span = times[seg + 1] - times[seg] || 1;
  let sp = isSpring ? p : Math.max(0, Math.min(1, (p - times[seg]) / span));
  if (!isSpring) {
    const easeDef = Array.isArray(tr.ease) && typeof tr.ease[0] !== 'number' ? tr.ease[seg] ?? tr.ease[0] : tr.ease ?? 'easeInOut';
    sp = toEase(easeDef)(sp);
  } else {
    sp = (p - times[seg]) / span;
  }

  const a = frames[seg];
  const b = frames[seg + 1];
  if (isColor(a) && isColor(b)) return interpolateColors(Math.max(0, Math.min(1, sp)), [0, 1], [a, b]);
  const pa = parseUnit(a);
  const pb = parseUnit(b);
  if (pa && pb) {
    const val = interpolate(sp, [0, 1], [pa.n, pb.n]);
    return pb.unit ? `${val}${pb.unit}` : val;
  }
  return sp < 0.5 ? a : b; // valores nao interpolaveis (ex.: "d" de path)
}

function num(v: any, fallback: number) {
  const p = parseUnit(v);
  return p ? p.n : fallback;
}

function createMotionComponent(tag: string) {
  const Comp = forwardRef<any, any>((props, ref) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const ctx = useContext(LucideMotionContext);
    const { variants, initial, animate, transition, custom, style, ...rest } = props;

    // Tempo desde o disparo
    let local = frame - ctx.startFrame;
    if (ctx.loopEvery && local >= 0) local = local % ctx.loopEvery;
    const active = local >= 0;
    const t = (Math.max(0, local) / fps) * ctx.speed;

    // Estado base (normal / initial) e alvo
    const baseName = typeof initial === 'string' ? initial : 'normal';
    const base: Record<string, any> =
      (initial && typeof initial === 'object' ? initial : resolveVariant(variants, baseName, custom)) ??
      resolveVariant(variants, 'normal', custom) ??
      {};

    let target: Record<string, any> | undefined;
    if (animate && typeof animate === 'object' && !(CONTROLS_TAG in animate)) {
      target = animate;
    } else if (variants) {
      const names = [ctx.variant, ...FALLBACK_TARGETS];
      for (const nm of names) {
        if (variants[nm]) {
          target = resolveVariant(variants, nm, custom);
          break;
        }
      }
    }

    const values: Record<string, any> = { ...base };
    if (active && target) {
      const { transition: variantTr, transitionEnd: _te, ...targetProps } = target;
      for (const key of Object.keys(targetProps)) {
        const tr = { ...(transition ?? {}), ...(variantTr ?? {}), ...((variantTr ?? transition ?? {})[key] ?? {}) };
        delete tr[key];
        values[key] = animateValue(key, base[key] ?? DEFAULTS[key], targetProps[key], tr, t, fps);
      }
    }
    // Remove "transition" que escapou para os valores
    delete values.transition;
    delete values.transitionEnd;

    // Monta atributos e estilo
    const outStyle: React.CSSProperties = { ...(style ?? {}) };
    const attrs: Record<string, any> = {};
    const transforms: string[] = [];
    for (const key of TRANSFORM_KEYS) {
      if (!(key in values)) continue;
      const v = values[key];
      if (key === 'x' || key === 'translateX') transforms.push(`translateX(${typeof v === 'number' ? `${v}px` : v})`);
      else if (key === 'y' || key === 'translateY') transforms.push(`translateY(${typeof v === 'number' ? `${v}px` : v})`);
      else if (key.startsWith('scale')) transforms.push(`${key}(${num(v, 1)})`);
      else transforms.push(`${key}(${typeof v === 'number' ? `${v}deg` : v})`);
    }
    if (transforms.length) {
      outStyle.transform = transforms.join(' ');
      if (tag !== 'svg' && tag !== 'div') outStyle.transformBox = 'fill-box';
      const ox = values.originX ?? (style as any)?.originX;
      const oy = values.originY ?? (style as any)?.originY;
      if (ox !== undefined || oy !== undefined) {
        const fmtO = (o: any) => (typeof o === 'number' ? `${o * 100}%` : o ?? '50%');
        outStyle.transformOrigin = `${fmtO(ox)} ${fmtO(oy)}`;
      } else if (!outStyle.transformOrigin && !rest.transformOrigin) {
        outStyle.transformOrigin = '50% 50%';
      }
    }
    if (rest.transformOrigin) {
      outStyle.transformOrigin = rest.transformOrigin;
      delete rest.transformOrigin;
    }
    delete (outStyle as any).originX;
    delete (outStyle as any).originY;

    if ('opacity' in values) outStyle.opacity = num(values.opacity, 1);
    if ('pathLength' in values || 'pathOffset' in values) {
      const pl = Math.max(0, Math.min(1, num(values.pathLength, 1)));
      const po = num(values.pathOffset, 0);
      const spacing = num(values.pathSpacing, 1);
      attrs.pathLength = 1;
      attrs.strokeDasharray = `${pl} ${spacing}`;
      attrs.strokeDashoffset = -po;
    }
    for (const [key, v] of Object.entries(values)) {
      if (TRANSFORM_KEYS.includes(key) || ['opacity', 'pathLength', 'pathOffset', 'pathSpacing', 'originX', 'originY'].includes(key)) continue;
      attrs[key] = v;
    }

    for (const k of MOTION_ONLY_PROPS) delete rest[k];
    return React.createElement(tag, { ref, ...rest, ...attrs, style: outStyle });
  });
  Comp.displayName = `motion.${tag}`;
  return Comp;
}

const cache: Record<string, React.ComponentType<any>> = {};
export const motion: Record<string, React.ComponentType<any>> = new Proxy({} as Record<string, React.ComponentType<any>>, {
  get: (_t, tag: string) => (cache[tag] ??= createMotionComponent(tag)),
});
