import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * OFurry Motion & Easing Primitives
 * Deterministic math functions for timeline interpolation.
 */
export const E = {
  linear: (t: number) => t,
  inQuad: (t: number) => t * t,
  outQuad: (t: number) => t * (2 - t),
  inOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  inCubic: (t: number) => t * t * t,
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  outQuint: (t: number) => 1 - Math.pow(1 - t, 5),
  inQuart: (t: number) => t * t * t * t,
  outExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  outBack: (t: number, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  inBack: (t: number, s = 1.70158) => (s + 1) * t * t * t - s * t * t,
  outElastic: (t: number) =>
    t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
  spring: (t: number, bounce = 0.25) => {
    const w = 8 + 8 * (1 - bounce);
    return 1 - Math.exp(-6 * t) * Math.cos(w * t * bounce * 2.2);
  },
};

export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;

/**
 * Normalized segment progress clamped between [t0, t1] with easing
 */
export const seg = (
  t: number,
  t0: number,
  t1: number,
  ease: (x: number) => number = E.linear
) => ease(Math.min(1, Math.max(0, (t - t0) / Math.max(1e-5, t1 - t0))));

/**
 * Deterministic pseudo-random generator
 */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Normalized composition progress [0, 1]
 */
export const useT = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return Math.min(1, frame / Math.max(1, durationInFrames - 1));
};

/**
 * OFurry Stage Container: Scaled design canvas with Alpha transparency support
 */
export const OFurryStage: React.FC<{
  w?: number;
  h?: number;
  transparent?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ w = 1920, h = 1080, transparent = true, children, style }) => {
  const { width, height } = useVideoConfig();
  const scale = Math.min(width / w, height / h);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparent ? 'transparent' : '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
