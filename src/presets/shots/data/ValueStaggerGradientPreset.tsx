import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const VALUE_STAGGER_GRADIENT_DURATION = 120; // 4s @ 30fps

export interface ValueStaggerGradientProps extends BasePresetProps {
  headline?: string;
  metricLabel?: string;
}

const N = 12;

export const ValueStaggerGradientPreset: React.FC<ValueStaggerGradientProps> = ({
  transparent = true,
  headline = 'DEGRADAÇÃO DO RETORNO',
  metricLabel = '-34% EM TERMOS REAIS',
}) => {
  const t = useT();

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
          padding: 80,
        }}
      >
        <div
          style={{
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 22,
            letterSpacing: '0.2em',
            color: OFurryTheme.colors.accentOrange,
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>

        <div
          style={{
            fontSize: 110,
            lineHeight: 1,
            color: '#FF3333',
            marginBottom: 60,
            letterSpacing: '-0.03em',
            textShadow: '0 0 40px rgba(255, 51, 51, 0.6)',
          }}
        >
          {metricLabel}
        </div>

        {/* Barras em Cascata Escalonada */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 20,
            height: 280,
            width: '80%',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: N }).map((_, i) => {
            const delay = i * 0.03;
            const p = seg(t, 0.1 + delay, 0.35 + delay, E.outCubic);

            // Altura decrescente (perda progressiva)
            const baseH = lerp(i / (N - 1), 260, 40);
            const currentH = baseH * p;

            const isAlert = i >= N - 3;
            const barColor = isAlert ? '#FF3333' : OFurryTheme.colors.accentOrange;

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: currentH,
                  backgroundColor: barColor,
                  boxShadow: `0 0 20px ${barColor}66`,
                  transformOrigin: 'bottom center',
                  opacity: p,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingTop: 8,
                }}
              >
                {p > 0.8 && (
                  <span
                    style={{
                      fontFamily: OFurryTheme.typography.families.mono,
                      fontSize: 14,
                      color: '#000000',
                      fontWeight: 800,
                    }}
                  >
                    M{i + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
