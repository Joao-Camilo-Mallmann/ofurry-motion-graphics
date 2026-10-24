import React from 'react';
import { Easing, interpolate } from 'remotion';
import { House } from './theme';

/**
 * Entradas medidas no canal (quadros a 30 fps):
 *  - cut:   troca seca (legendas e poses do mascote)
 *  - pop:   escala 45% -> 105% -> 100% em 4 quadros (legenda pura, icones)
 *  - whip:  entra de lado com desfoque horizontal em 4 quadros (rajadas do gancho)
 *  - rise:  sobe com desfoque vertical em 4 quadros (legenda, mascote)
 *  - glitch: 2 quadros de listras na cor do destaque + 1 de desfoque
 *  - blur:  sai do desfoque em 6 quadros (prints, cartoes)
 */
export type EntryKind = 'cut' | 'pop' | 'whip' | 'rise' | 'glitch' | 'blur';

export interface EntryStyle {
  transform: string;
  opacity: number;
  filter?: string;
  /** Deslocamento das fatias de glitch (px), quando ativo. */
  glitch?: number[];
}

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Filtros SVG de desfoque direcional. Renderize uma vez por composicao. */
export const MotionBlurDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
    <defs>
      {[1, 2, 3, 4, 6, 9, 14].map((n) => (
        <React.Fragment key={n}>
          <filter id={`ofh-${n}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={`${n * 3} 0`} />
          </filter>
          <filter id={`ofv-${n}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={`0 ${n * 3}`} />
          </filter>
        </React.Fragment>
      ))}
    </defs>
  </svg>
);

const BLUR_STEPS = [1, 2, 3, 4, 6, 9, 14];
const nearestBlur = (v: number) => BLUR_STEPS.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a));

/**
 * Estilo de entrada para um elemento que apareceu ha `f` quadros.
 * `dir` = 1 entra da direita/baixo, -1 da esquerda/cima.
 */
export function entry(kind: EntryKind, f: number, opts: { dir?: 1 | -1; distance?: number; frames?: number } = {}): EntryStyle {
  const n = opts.frames ?? House.timing.entryFrames;
  const dir = opts.dir ?? 1;
  if (f < 0) return { transform: 'none', opacity: 0 };
  switch (kind) {
    case 'cut':
      return { transform: 'none', opacity: 1 };
    case 'pop': {
      const s = interpolate(f, [0, n * 0.6, n], [0.45, 1.05, 1], clamp);
      return { transform: `scale(${s})`, opacity: interpolate(f, [0, 1], [0.6, 1], clamp) };
    }
    case 'whip': {
      const d = opts.distance ?? 260;
      const p = interpolate(f, [0, n], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
      const blur = p > 0.05 ? `url(#ofh-${nearestBlur(p * 9)})` : undefined;
      return { transform: `translateX(${dir * d * p}px)`, opacity: interpolate(f, [0, 1], [0.4, 1], clamp), filter: blur };
    }
    case 'rise': {
      const d = opts.distance ?? 90;
      const p = interpolate(f, [0, n], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
      const blur = p > 0.05 ? `url(#ofv-${nearestBlur(p * 6)})` : undefined;
      return { transform: `translateY(${dir * d * p}px)`, opacity: interpolate(f, [0, 1], [0.3, 1], clamp), filter: blur };
    }
    case 'glitch': {
      if (f < House.timing.glitchFrames) {
        const k = f === 0 ? 1 : -0.6;
        return { transform: 'none', opacity: 1, glitch: [34 * k, -22 * k, 48 * k, -12 * k] };
      }
      const b = interpolate(f, [House.timing.glitchFrames, House.timing.glitchFrames + 2], [6, 0], clamp);
      return { transform: 'none', opacity: 1, filter: b > 0.3 ? `blur(${b}px)` : undefined };
    }
    case 'blur': {
      const m = opts.frames ?? 6;
      const b = interpolate(f, [0, m], [18, 0], clamp);
      return {
        transform: `scale(${interpolate(f, [0, m], [1.06, 1], clamp)})`,
        opacity: interpolate(f, [0, m * 0.6], [0, 1], clamp),
        filter: b > 0.3 ? `blur(${b}px)` : undefined,
      };
    }
  }
}

/** Micro movimento continuo: nada fica 100% parado (o canal tinha planos congelados de 15 s+). */
export function breathe(frame: number, fps: number, amount = 0.012, periodS = 3.2) {
  const t = frame / fps;
  return 1 + Math.sin((t / periodS) * Math.PI * 2) * amount;
}

/** Push-in lento usado nos prints e na replica da thumbnail. */
export function pushIn(frame: number, durationFrames: number, to = 1.06) {
  return interpolate(frame, [0, Math.max(1, durationFrames)], [1, to], clamp);
}
