import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const TIMELINE_TRAVEL_DURATION = 150; // 5s @ 30fps

export interface TimelineTravelProps extends BasePresetProps {
  milestones?: Array<{ year: string; title: string; impact: string; isDanger?: boolean }>;
}

const DEFAULT_MILESTONES = [
  { year: 'ANO 01', title: 'APORTE INICIAL', impact: '100% Retido', isDanger: false },
  { year: 'ANO 02', title: 'IPCA EM ALTA', impact: 'Perda de Poder', isDanger: true },
  { year: 'ANO 03', title: 'TETO ATINGIDO', impact: 'Ganho Travado', isDanger: true },
  { year: 'ANO 05', title: 'RESGATE REAL', impact: 'Corrosão -28%', isDanger: true },
];

export const TimelineTravelPreset: React.FC<TimelineTravelProps> = ({
  transparent = true,
  milestones = DEFAULT_MILESTONES,
}) => {
  const frame = useCurrentFrame();

  const N = milestones.length;
  const GAP = 700;
  const totalDist = (N - 1) * GAP;

  const progress = interpolate(frame, [15, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.15, 1),
  });

  const currentX = progress * totalDist;

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        {/* Linha Central do Eixo Temporal */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '55%',
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        />

        {/* Eixo que se move no Mundo */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '55%',
            transform: `translateX(${-currentX}px)`,
            display: 'flex',
          }}
        >
          {milestones.map((m, idx) => {
            const posX = idx * GAP;
            const dist = Math.abs(currentX - posX);
            const isCurrent = dist < 200;
            const cardScale = interpolate(dist, [0, 500], [1, 0.75], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const cardOp = interpolate(dist, [0, 600], [1, 0.35], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: posX,
                  transform: `translate(-50%, -50%) scale(${cardScale})`,
                  opacity: cardOp,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Marcador no Eixo */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: isCurrent ? OFurryTheme.colors.accentOrange : '#FFFFFF',
                    boxShadow: isCurrent ? `0 0 25px ${OFurryTheme.colors.accentOrange}` : 'none',
                    marginBottom: 30,
                  }}
                />

                {/* Card de Ficha de Marco */}
                <div
                  style={{
                    width: 420,
                    padding: '24px 32px',
                    border: `2px solid ${isCurrent ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.2)'}`,
                    backgroundColor: isCurrent ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)',
                    textAlign: 'center',
                    boxShadow: isCurrent ? `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.5)}` : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: OFurryTheme.typography.families.mono,
                      fontSize: 18,
                      color: OFurryTheme.colors.accentOrange,
                      letterSpacing: '0.15em',
                      marginBottom: 8,
                    }}
                  >
                    {m.year}
                  </div>
                  <div style={{ fontSize: 40, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: 12 }}>
                    {m.title}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: m.isDanger ? '#FF4444' : '#00FF00',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {m.impact}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
