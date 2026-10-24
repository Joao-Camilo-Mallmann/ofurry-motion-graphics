import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const RING_DIAGRAM_ANNOTATION_REVEAL_DURATION = 150; // 5s @ 30fps

export interface RingDiagramProps extends BasePresetProps {
  title?: string;
  dataPoints?: Array<{ label: string; pct: string; color: string }>;
}

const DEFAULT_POINTS = [
  { label: 'RETENÇÃO DA BANCA', pct: '85%', color: OFurryTheme.colors.accentOrange },
  { label: 'REPASSE AO ASSESSOR', pct: '12%', color: '#FF4444' },
  { label: 'SOBRA REAL DO CLIENTE', pct: '3%', color: '#FFFFFF' },
];

export const RingDiagramAnnotationRevealPreset: React.FC<RingDiagramProps> = ({
  transparent = true,
  title = 'DIVISÃO DO BOLO // ANÁLISE FORENSE',
  dataPoints = DEFAULT_POINTS,
}) => {
  const frame = useCurrentFrame();

  const ringDraw = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const shiftLeft = interpolate(frame, [45, 70], [0, -280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 1200,
            height: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Anéis Concêntricos à Esquerda */}
          <div
            style={{
              position: 'absolute',
              transform: `translateX(${shiftLeft}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="440" height="440" viewBox="0 0 440 440">
              <circle
                cx="220"
                cy="220"
                r="180"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="8"
              />
              <circle
                cx="220"
                cy="220"
                r="180"
                fill="none"
                stroke={OFurryTheme.colors.accentOrange}
                strokeWidth="14"
                strokeDasharray={1130}
                strokeDashoffset={1130 * (1 - ringDraw * 0.85)}
                strokeLinecap="round"
                transform="rotate(-90 220 220)"
                style={{ filter: `drop-shadow(0 0 20px ${OFurryTheme.colors.accentOrangeAlpha(0.8)})` }}
              />
              <circle
                cx="220"
                cy="220"
                r="130"
                fill="none"
                stroke="#FF4444"
                strokeWidth="10"
                strokeDasharray={816}
                strokeDashoffset={816 * (1 - ringDraw * 0.55)}
                strokeLinecap="round"
                transform="rotate(-90 220 220)"
              />
              <circle
                cx="220"
                cy="220"
                r="80"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeDasharray={502}
                strokeDashoffset={502 * (1 - ringDraw * 0.35)}
                strokeLinecap="round"
                transform="rotate(-90 220 220)"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: 50, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                COE
              </span>
            </div>
          </div>

          {/* Painel Lateral de Anotações que se Revela */}
          <div
            style={{
              position: 'absolute',
              right: 40,
              width: 540,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.mono,
                fontSize: 16,
                letterSpacing: '0.2em',
                color: '#888888',
                marginBottom: 8,
              }}
            >
              {title}
            </div>

            {dataPoints.map((dp, idx) => {
              const itemP = interpolate(frame, [60 + idx * 12, 75 + idx * 12], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });

              return (
                <div
                  key={idx}
                  style={{
                    opacity: itemP,
                    transform: `translateX(${interpolate(itemP, [0, 1], [40, 0])}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 24, color: '#CCCCCC' }}>{dp.label}</span>
                    <span
                      style={{
                        fontSize: 48,
                        color: dp.color,
                        letterSpacing: '-0.03em',
                        textShadow: `0 0 20px ${dp.color}66`,
                      }}
                    >
                      {dp.pct}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
