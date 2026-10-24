import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const CARD_STACK_DURATION = 126; // 4.2s @ 30fps

export interface CardStackProps extends BasePresetProps {
  assets?: string[];
  trapIndex?: number;
}

const DEFAULT_ASSETS = ['CDB', 'LCI', 'LCA', 'CRI', 'CRA', 'COE'];

export const CardStackPreset: React.FC<CardStackProps> = ({
  transparent = true,
  assets = DEFAULT_ASSETS,
  trapIndex = 5,
}) => {
  const t = useT();
  const N = assets.length;

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          {assets.map((name, i) => {
            const inT = seg(t, 0.02 + i * 0.04, 0.02 + i * 0.04 + 0.3);
            const y = lerp(E.spring(inT, 0.25), 600, 0);

            const fan = seg(t, 0.45, 0.72, E.inOutCubic);
            const k = i - (N - 1) / 2;
            const rot = k * 12 * fan;
            const tx = k * 140 * fan;
            const tz = -30 * Math.abs(k) * fan;

            const isTrap = i === trapIndex;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: -140,
                  top: -210,
                  width: 280,
                  height: 420,
                  borderRadius: 8,
                  backgroundColor: isTrap ? '#000000' : 'rgba(20,20,20,0.9)',
                  border: `3px solid ${isTrap ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.2)'}`,
                  boxShadow: isTrap
                    ? `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`
                    : '0 20px 40px rgba(0,0,0,0.8)',
                  transformOrigin: '50% 120%',
                  transform: `translate3d(${tx}px, ${y}px, ${tz}px) rotate(${rot}deg)`,
                  opacity: Math.min(1, inT * 3),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 32,
                  boxSizing: 'border-box',
                  zIndex: isTrap ? 50 : 10 + i,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: OFurryTheme.typography.families.mono,
                      fontSize: 16,
                      color: isTrap ? OFurryTheme.colors.accentOrange : '#888',
                    }}
                  >
                    ATIVO #{i + 1}
                  </span>
                  {isTrap && (
                    <span style={{ fontSize: 14, color: '#FF3333', fontWeight: 800 }}>ALERTA</span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 72,
                    lineHeight: 0.9,
                    color: isTrap ? OFurryTheme.colors.accentOrange : '#FFFFFF',
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {name}
                </div>

                <div
                  style={{
                    fontFamily: OFurryTheme.typography.families.mono,
                    fontSize: 14,
                    color: isTrap ? '#FFFFFF' : '#666',
                    textAlign: 'center',
                  }}
                >
                  {isTrap ? 'ESTRUTURA COMPLEXA' : 'RENDA FIXA PURA'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
