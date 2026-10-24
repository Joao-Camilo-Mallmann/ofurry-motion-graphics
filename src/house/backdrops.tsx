import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Fundos recorrentes do canal. Todos aceitam `transparent` para exportar so o elemento
 * (ProRes 4444 / WebM com alpha) e editar por cima da gravacao.
 */

export interface GridFloorProps {
  transparent?: boolean;
  /** Cor das linhas. */
  lineColor?: string;
  /** Altura do horizonte (0 = topo, 1 = base). */
  horizon?: number;
  /** Velocidade com que o chao "anda" na direcao da camera (celulas por segundo). */
  speed?: number;
  /** Espacamento das celulas em px no plano. */
  cell?: number;
  /** Opacidade geral das linhas. */
  opacity?: number;
}

/** Chao de grade em perspectiva sobre preto, com o horizonte sumindo em vinheta. */
export const GridFloor: React.FC<GridFloorProps> = ({
  transparent = false,
  lineColor = '#FFFFFF',
  horizon = 0.55,
  speed = 0.35,
  cell = 90,
  opacity = 0.22,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const offset = ((frame / fps) * speed * cell) % cell;
  const floorTop = height * horizon;

  return (
    <AbsoluteFill style={{ backgroundColor: transparent ? 'transparent' : '#000000', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: -width,
          width: width * 3,
          top: floorTop,
          height: height * 2.2,
          transformOrigin: '50% 0%',
          transform: 'perspective(700px) rotateX(72deg)',
          backgroundImage: `linear-gradient(${lineColor} 1.5px, transparent 1.5px), linear-gradient(90deg, ${lineColor} 1.5px, transparent 1.5px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: `0px ${offset}px`,
          opacity,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

export interface StarfieldProps {
  transparent?: boolean;
  count?: number;
  color?: string;
  /** Deriva lateral em px por segundo (paralaxe lenta). */
  drift?: number;
  seed?: string;
}

/** Ceu de pontos finos piscando devagar, com paralaxe em 3 camadas. */
export const Starfield: React.FC<StarfieldProps> = ({
  transparent = false,
  count = 220,
  color = '#FFFFFF',
  drift = 6,
  seed = 'ofurry-stars',
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: random(`${seed}-x-${i}`) * width,
        y: random(`${seed}-y-${i}`) * height,
        r: 0.6 + random(`${seed}-r-${i}`) * 1.6,
        layer: 1 + Math.floor(random(`${seed}-l-${i}`) * 3),
        phase: random(`${seed}-p-${i}`) * Math.PI * 2,
      })),
    [count, seed, width, height]
  );
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: transparent ? 'transparent' : '#000000' }}>
      <svg width={width} height={height}>
        {stars.map((s, i) => {
          const x = (s.x + t * drift * s.layer) % width;
          const twinkle = interpolate(Math.sin(t * 1.6 + s.phase), [-1, 1], [0.25, 0.9]);
          return <circle key={i} cx={x} cy={s.y} r={s.r * (s.layer / 2)} fill={color} opacity={twinkle * (0.35 + s.layer * 0.2)} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Vinheta radial para dar profundidade ao preto (use por cima do fundo, abaixo do conteudo). */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.75 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);
