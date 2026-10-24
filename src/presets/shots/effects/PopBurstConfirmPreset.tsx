import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';
import { AssetIcon } from '../../../primitives/AssetIcon';
import { OFurryIconName } from '../../../theme/icons';

export const POP_BURST_CONFIRM_DURATION = 120; // 4s @ 30fps

export interface PopBurstConfirmProps extends BasePresetProps {
  iconName?: OFurryIconName;
  confirmLabel?: string;
  subText?: string;
}

const N_PARTICLES = 12;

export const PopBurstConfirmPreset: React.FC<PopBurstConfirmProps> = ({
  transparent = true,
  iconName = 'warning',
  confirmLabel = 'BLOQUEIO CONFIRMADO',
  subText = 'SEU CAPITAL ESTÁ TRAVADO POR 1.825 DIAS',
}) => {
  const f = useCurrentFrame();
  const POP = 25;

  const scale = (() => {
    if (f <= 18) return 1;
    if (f <= 22) return interpolate(f, [18, 22], [1, 0.65], { easing: Easing.in(Easing.quad) });
    if (f <= POP) return 0.65;
    if (f <= 32) return interpolate(f, [POP, 32], [0.65, 1.35], { easing: Easing.out(Easing.cubic) });
    return interpolate(f, [32, 44], [1.35, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.back(2)),
    });
  })();

  const pt = interpolate(f, [POP, POP + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pDist = 180 + 260 * Easing.out(Easing.cubic)(pt);
  const pLen = 60 * (1 - pt);

  const rt = interpolate(f, [POP, POP + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringR = 160 + 380 * Easing.out(Easing.cubic)(rt);
  const ringO = Math.max(0, 1 - rt);

  const tagT = interpolate(f, [38, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
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
        <div style={{ position: 'relative', width: 0, height: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Anel de Onda de Choque */}
          {f >= POP && ringO > 0 && (
            <div
              style={{
                position: 'absolute',
                width: ringR * 2,
                height: ringR * 2,
                borderRadius: ringR,
                border: `4px solid ${OFurryTheme.colors.accentOrange}`,
                boxShadow: `0 0 40px ${OFurryTheme.colors.accentOrange}`,
                opacity: ringO,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Partículas Radiais Disparadas */}
          {f >= POP && pt < 1 && (
            <svg
              width="1200"
              height="1200"
              viewBox="-600 -600 1200 1200"
              style={{ position: 'absolute', pointerEvents: 'none' }}
            >
              {Array.from({ length: N_PARTICLES }).map((_, i) => {
                const angle = (i / N_PARTICLES) * Math.PI * 2;
                const x1 = Math.cos(angle) * (pDist - pLen);
                const y1 = Math.sin(angle) * (pDist - pLen);
                const x2 = Math.cos(angle) * pDist;
                const y2 = Math.sin(angle) * pDist;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={OFurryTheme.colors.accentOrange}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          )}

          {/* Ícone Monumental com Compressão e Estouro */}
          <div
            style={{
              position: 'absolute',
              transform: `scale(${scale})`,
              filter: `drop-shadow(0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.8)})`,
            }}
          >
            <AssetIcon name={iconName} variant="orange" size={240} glow={true} />
          </div>
        </div>

        {/* Tarja de Confirmação que Salta */}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            transform: `scale(${tagT})`,
            textAlign: 'center',
            opacity: tagT,
          }}
        >
          <div
            style={{
              fontSize: 70,
              lineHeight: 1,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}
          >
            {confirmLabel}
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 20,
              letterSpacing: '0.15em',
              color: OFurryTheme.colors.accentOrange,
              textTransform: 'uppercase',
            }}
          >
            {subText}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
