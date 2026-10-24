import React from 'react';
import { LucideMotionProvider } from './motion-shim';
import { LUCIDE_ANIMATED, LucideAnimatedName } from './icons';

export interface AnimatedLucideProps {
  /** Nome kebab-case do icone (ver LUCIDE_ANIMATED_NAMES ou lucide-animated.com). */
  name: LucideAnimatedName;
  /** Tamanho em px. Padrao do canal: 160-280 para icone dominante. */
  size?: number;
  /** Cor do traco. Padrao branco puro. */
  color?: string;
  /** Frame (relativo a Sequence) em que a animacao do icone dispara. */
  startFrame?: number;
  /** Repete a animacao a cada N frames. Omitir = toca uma vez e segura. */
  loopEvery?: number;
  /** Multiplicador de velocidade da animacao original (as originais sao de hover, curtas). */
  speed?: number;
  /** Variante alvo. Quase todos usam "animate". */
  variant?: string;
  /** Brilho neon suave atras do traco. */
  glow?: boolean;
  /** Espessura do traco (o original e 2 num viewBox 24). */
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/**
 * Icone do Lucide Animated rodando de forma deterministica no Remotion.
 * A animacao original (de hover) dispara em `startFrame` e pode repetir com `loopEvery`.
 */
export const AnimatedLucide: React.FC<AnimatedLucideProps> = ({
  name,
  size = 200,
  color = '#FFFFFF',
  startFrame = 0,
  loopEvery,
  speed = 1,
  variant = 'animate',
  glow = false,
  strokeWidth,
  style,
}) => {
  const Icon = LUCIDE_ANIMATED[name];
  if (!Icon) return null;
  const strokeCss = strokeWidth
    ? ({ ['--lucide-stroke' as string]: strokeWidth } as React.CSSProperties)
    : undefined;
  return (
    <LucideMotionProvider startFrame={startFrame} loopEvery={loopEvery} speed={speed} variant={variant}>
      {strokeWidth ? (
        <style>{`.ofurry-lucide-sw svg, .ofurry-lucide-sw svg * { stroke-width: var(--lucide-stroke); }`}</style>
      ) : null}
      <div
        className={strokeWidth ? 'ofurry-lucide-sw' : undefined}
        style={{
          display: 'inline-flex',
          color,
          lineHeight: 0,
          filter: glow ? `drop-shadow(0 0 ${Math.round(size / 14)}px ${color}88)` : undefined,
          ...strokeCss,
          ...style,
        }}
      >
        <Icon size={size} />
      </div>
    </LucideMotionProvider>
  );
};
