import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const SPLIT_TEXT_STAGGER_DURATION = 120; // 4s @ 30fps

export interface SplitTextStaggerProps extends BasePresetProps {
  text?: string;
  subLabel?: string;
}

export const SplitTextStaggerPreset: React.FC<SplitTextStaggerProps> = ({
  transparent = true,
  text = 'RISCO OCULTO',
  subLabel = 'ANÁLISE DE VOLATILIDADE EXTREMA',
}) => {
  const frame = useCurrentFrame();
  const chars = text.split('');

  const START = 10;
  const RISE = 14;
  const SETTLE = 6;
  const OVERSHOOT = -12;

  const charY = (f: number, idx: number): number => {
    const t0 = START + idx * 2.5;
    if (f < t0 + RISE) {
      return interpolate(f, [t0, t0 + RISE], [125, OVERSHOOT], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      });
    }
    return interpolate(f, [t0 + RISE, t0 + RISE + SETTLE], [OVERSHOOT, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    });
  };

  // Baseline neon crescendo da esquerda para a direita
  const lineW = interpolate(frame, [START, START + 28], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [START + 25, START + 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Caixa de Texto com Overflow Hidden por Caractere */}
          <div style={{ display: 'flex', overflow: 'hidden', paddingBottom: 10 }}>
            {chars.map((ch, idx) => (
              <div
                key={idx}
                style={{
                  overflow: 'hidden',
                  display: 'inline-block',
                  verticalAlign: 'bottom',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 160,
                    lineHeight: 0.9,
                    color: '#FFFFFF',
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    transform: `translateY(${charY(frame, idx)}%)`,
                    paddingRight: ch === ' ' ? 30 : 4,
                  }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              </div>
            ))}
          </div>

          {/* Baseline Neon Solid Hairline */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: `${lineW}%`,
              height: 4,
              backgroundColor: OFurryTheme.colors.accentOrange,
              boxShadow: `0 0 20px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
            }}
          />
        </div>

        {/* Micro-label Inferior */}
        <div
          style={{
            marginTop: 36,
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 20,
            letterSpacing: '0.2em',
            color: '#AAAAAA',
            opacity: subOpacity,
            textTransform: 'uppercase',
          }}
        >
          {subLabel}
        </div>
      </div>
    </OFurryStage>
  );
};
