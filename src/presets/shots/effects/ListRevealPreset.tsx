import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const LIST_REVEAL_DURATION = 108; // 3.6s @ 30fps

export interface ListRevealProps extends BasePresetProps {
  title?: string;
  specs?: Array<{ key: string; value: string }>;
}

const DEFAULT_SPECS = [
  { key: 'ATIVO', value: 'COE SINTÉTICO DI' },
  { key: 'TAXA BASE', value: '100% DO CDI' },
  { key: 'CAP MÁXIMO', value: 'TRAVA EM 12%' },
  { key: 'CARÊNCIA', value: '5 ANOS FECHADO' },
  { key: 'LIQUIDEZ', value: 'ZERO ANTES DO FIM' },
];

export const ListRevealPreset: React.FC<ListRevealProps> = ({
  transparent = true,
  title = 'FICHA TÉCNICA // BLUEPRINT',
  specs = DEFAULT_SPECS,
}) => {
  const t = useT();
  const driftY = lerp(t, 25, -25);

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
            transform: `translateY(${driftY}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: 860,
          }}
        >
          {/* Header da Ficha */}
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 20,
              letterSpacing: '0.2em',
              color: OFurryTheme.colors.accentOrange,
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>

          {/* Linhas da Ficha em Arquétipo A (Blueprint Neon) */}
          {specs.map((item, i) => {
            const p = seg(t, 0.05 + i * 0.08, 0.05 + i * 0.08 + 0.25, E.outBack);
            const scale = 0.8 + Math.max(0, p) * 0.2;
            const y = lerp(Math.max(0, p), 30, 0);
            const opacity = Math.min(1, p * 2.5);

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 30px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  borderLeft: `5px solid ${OFurryTheme.colors.accentOrange}`,
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  opacity,
                  transform: `scale(${scale}) translateY(${y}px)`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    color: '#AAAAAA',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.key}
                </span>

                <span
                  style={{
                    fontSize: 34,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  = {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
