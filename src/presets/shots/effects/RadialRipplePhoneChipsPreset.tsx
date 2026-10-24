import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';
import { AssetIcon } from '../../../primitives/AssetIcon';
import { OFurryIconName } from '../../../theme/icons';

export const RADIAL_RIPPLE_PHONE_CHIPS_DURATION = 150; // 5s @ 30fps

export interface RadialRippleProps extends BasePresetProps {
  centerIcon?: OFurryIconName;
  centerMetric?: string;
  leftAlert?: string;
  rightAlert?: string;
}

const RSZ = [780, 580, 400, 240];

export const RadialRipplePhoneChipsPreset: React.FC<RadialRippleProps> = ({
  transparent = true,
  centerIcon = 'warning',
  centerMetric = 'ALERTA',
  leftAlert = 'BLOQUEIO 5 ANOS',
  rightAlert = 'RETENÇÃO 85%',
}) => {
  const t = useT();

  const leftP = seg(t, 0.2, 0.38, E.outBack);
  const rightP = seg(t, 0.3, 0.48, E.outBack);

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
        {/* Ondas Concéntricas Neon Radiais */}
        {RSZ.map((size, i) => {
          const breath = 1 + Math.sin(t * Math.PI * 4 + i * 1.5) * 0.05;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                border: `2px solid ${OFurryTheme.colors.accentOrangeAlpha(0.18 + i * 0.08)}`,
                transform: `scale(${breath})`,
                pointerEvents: 'none',
              }}
            />
          );
        })}

        {/* Núcleo Central de Alerta */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ filter: `drop-shadow(0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.8)})` }}>
            <AssetIcon name={centerIcon} variant="orange" size={160} glow={true} />
          </div>
          <div
            style={{
              fontSize: 48,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginTop: 16,
              textTransform: 'uppercase',
            }}
          >
            {centerMetric}
          </div>
        </div>

        {/* Tag Flutuante Esquerda */}
        <div
          style={{
            position: 'absolute',
            left: 240,
            transform: `scale(${lerp(leftP, 0.6, 1)}) translateY(${lerp(leftP, 30, 0)}px)`,
            opacity: leftP,
            padding: '18px 36px',
            backgroundColor: '#000000',
            border: `3px solid ${OFurryTheme.colors.accentOrange}`,
            boxShadow: `0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`,
            fontSize: 32,
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          {leftAlert}
        </div>

        {/* Tag Flutuante Direita */}
        <div
          style={{
            position: 'absolute',
            right: 240,
            transform: `scale(${lerp(rightP, 0.6, 1)}) translateY(${lerp(rightP, 30, 0)}px)`,
            opacity: rightP,
            padding: '18px 36px',
            backgroundColor: '#000000',
            border: '3px solid #FF4444',
            boxShadow: '0 0 35px rgba(255, 68, 68, 0.6)',
            fontSize: 32,
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          {rightAlert}
        </div>
      </div>
    </OFurryStage>
  );
};
