import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const BEZIER_SOURCE_CONVERGE_MERGE_DURATION = 150; // 5s @ 30fps

export interface BezierConvergeProps extends BasePresetProps {
  sources?: string[];
  destination?: string;
  tagline?: string;
}

const DEFAULT_SOURCES = ['POUPANÇA', 'RESERVA', 'SALÁRIO', 'BÔNUS'];

export const BezierSourceConvergeMergePreset: React.FC<BezierConvergeProps> = ({
  transparent = true,
  sources = DEFAULT_SOURCES,
  destination = 'ESTRUTURA COE',
  tagline = 'CENTRALIZAÇÃO E DRENAGEM DE CAPITAL',
}) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const particleT = interpolate(frame, [35, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const destPulse = interpolate(frame, [80, 105], [1, 1.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const W = 1600;
  const H = 700;
  const targetX = 1200;
  const targetY = 350;

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
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 20,
            letterSpacing: '0.25em',
            color: OFurryTheme.colors.accentOrange,
            marginBottom: 30,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>

        <div style={{ position: 'relative', width: W, height: H }}>
          {/* Curvas SVG Bézier */}
          <svg
            width={W}
            height={H}
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            {sources.map((_, i) => {
              const startY = 120 + i * 150;
              const startX = 240;
              const d = `M ${startX} ${startY} C ${startX + 400} ${startY}, ${targetX - 300} ${targetY}, ${targetX} ${targetY}`;

              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke="rgba(255, 153, 0, 0.2)"
                    strokeWidth="4"
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={OFurryTheme.colors.accentOrange}
                    strokeWidth="6"
                    strokeDasharray={1200}
                    strokeDashoffset={1200 * (1 - drawProgress)}
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 15px ${OFurryTheme.colors.accentOrangeAlpha(0.8)})`,
                    }}
                  />
                  {/* Pacote de Capital Viajando */}
                  {drawProgress > 0.5 && (
                    <circle
                      cx={startX + (targetX - startX) * particleT}
                      cy={startY + (targetY - startY) * particleT}
                      r="10"
                      fill="#FFFFFF"
                      style={{ filter: 'drop-shadow(0 0 12px #FFFFFF)' }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Fontes à Esquerda */}
          {sources.map((s, i) => {
            const startY = 120 + i * 150;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 60,
                  top: startY,
                  transform: 'translateY(-50%)',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  fontSize: 28,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {s}
              </div>
            );
          })}

          {/* Destino de Convergência à Direita */}
          <div
            style={{
              position: 'absolute',
              left: targetX,
              top: targetY,
              transform: `translate(-20%, -50%) scale(${destPulse})`,
              padding: '28px 44px',
              backgroundColor: '#000000',
              border: `4px solid ${OFurryTheme.colors.accentOrange}`,
              boxShadow: `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 44, color: OFurryTheme.colors.accentOrange, textTransform: 'uppercase' }}>
              {destination}
            </div>
            <div style={{ fontFamily: OFurryTheme.typography.families.mono, fontSize: 16, color: '#888888', marginTop: 6 }}>
              PONTO DE DRENAGEM
            </div>
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
