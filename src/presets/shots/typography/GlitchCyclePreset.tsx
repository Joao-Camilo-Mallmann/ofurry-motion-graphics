import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { lerp, rand, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const GLITCH_CYCLE_DURATION = 150; // 5s @ 30fps

export interface GlitchCycleProps extends BasePresetProps {
  phrases?: string[];
}

const DEFAULT_PHRASES = [
  '100% CAPITAL PROTEGIDO',
  'RENTABILIDADE ILIMITADA',
  'SEM RISCO DE MERCADO',
  'ZERO RETORNO REAL',
];
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@!$';
const KF = [1, 0, 0, 0.15, 0, 0, 1];
const KF_LAST = [1, 0, 0, 0.1, 0, 0, 0];

const glitchAt = (kf: number[], p: number) => {
  const segs = kf.length - 1;
  const x = Math.min(segs - 1e-6, Math.max(0, p * segs));
  const i = Math.floor(x);
  return lerp(x - i, kf[i], kf[i + 1]);
};

export const GlitchCyclePreset: React.FC<GlitchCycleProps> = ({
  transparent = true,
  phrases = DEFAULT_PHRASES,
}) => {
  const t = useT();
  const N = phrases.length;
  const slot = Math.min(N - 1, Math.floor(t * N));
  const p = t * N - slot;
  const text = phrases[slot];
  const g = glitchAt(slot === N - 1 ? KF_LAST : KF, p);

  const frame = Math.floor(t * 150);
  const bucket = Math.floor(frame / 2);
  const jx = (rand(bucket * 7 + slot) - 0.5) * g * 24;
  const jy = (rand(bucket * 11 + slot + 30) - 0.5) * g * 12;

  const isFinal = slot === N - 1;

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div
          style={{
            transform: `translate(${jx}px, ${jy}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isFinal ? 130 : 90,
            color: isFinal ? OFurryTheme.colors.accentOrange : '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            textShadow:
              g > 0.05
                ? `${g * 8}px 0 rgba(255, 153, 0, 0.8), ${-g * 8}px 0 rgba(255, 50, 50, 0.8)`
                : isFinal
                ? `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`
                : 'none',
          }}
        >
          {text.split('').map((ch, idx) => {
            const scramble = g > 0.1 && rand(bucket * 13 + idx) < g * 0.75;
            const displayChar = scramble
              ? POOL[Math.floor(rand(bucket * 19 + idx) * POOL.length)]
              : ch;

            return (
              <span key={idx} style={{ display: 'inline-block' }}>
                {displayChar === ' ' ? '\u00A0' : displayChar}
              </span>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
