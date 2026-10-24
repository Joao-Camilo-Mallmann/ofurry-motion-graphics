import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';
import { AssetIcon } from '../../../primitives/AssetIcon';
import { OFurryIconName } from '../../../theme/icons';

export const PRODUCT_CARD_PROGRESSIVE_ASSEMBLE_DURATION = 150; // 5s @ 30fps

export interface ProductCardAssembleProps extends BasePresetProps {
  assetName?: string;
  iconName?: OFurryIconName;
  promisedReturn?: string;
  realReturn?: string;
}

export const ProductCardProgressiveAssemblePreset: React.FC<ProductCardAssembleProps> = ({
  transparent = true,
  assetName = 'COE AUTOCALL',
  iconName = 'bank',
  promisedReturn = '150% DO CDI',
  realReturn = 'ZERO GANHO REAL',
}) => {
  const frame = useCurrentFrame();

  const iconPop = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const titlePop = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Risco sobre o ganho prometido
  const strikeProgress = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Revelação do Ganho Real
  const realPop = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
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
            width: 1000,
            border: `3px solid ${OFurryTheme.colors.accentOrange}`,
            backgroundColor: 'rgba(0,0,0,0.92)',
            boxShadow: `0 0 60px ${OFurryTheme.colors.accentOrangeAlpha(0.5)}`,
            padding: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
          }}
        >
          {/* Top Bar com Ícone e Nome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ transform: `scale(${iconPop})` }}>
              <AssetIcon name={iconName} variant="orange" size={90} glow={true} />
            </div>
            <div style={{ opacity: titlePop, transform: `translateY(${interpolate(titlePop, [0, 1], [20, 0])}px)` }}>
              <span style={{ fontFamily: OFurryTheme.typography.families.mono, fontSize: 16, color: '#888' }}>
                ESTRUTURA AUDITADA
              </span>
              <h2 style={{ fontSize: 64, margin: 0, color: '#FFFFFF', textTransform: 'uppercase' }}>
                {assetName}
              </h2>
            </div>
          </div>

          <div style={{ height: 2, backgroundColor: 'rgba(255,255,255,0.15)' }} />

          {/* Promessa Comercial Riscada */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontFamily: OFurryTheme.typography.families.mono, fontSize: 16, color: '#888' }}>
              PROMESSA DO FOLHETO:
            </span>
            <div
              style={{
                fontSize: 54,
                color: 'rgba(255,255,255,0.5)',
                position: 'relative',
                display: 'inline-block',
                marginTop: 4,
              }}
            >
              {promisedReturn}
              {/* Tarja de Risco Vermelha */}
              <div
                style={{
                  position: 'absolute',
                  left: -10,
                  top: '50%',
                  width: `${strikeProgress * 105}%`,
                  height: 6,
                  backgroundColor: '#FF3333',
                  boxShadow: '0 0 20px #FF3333',
                }}
              />
            </div>
          </div>

          {/* Realidade Efetiva que Salta */}
          <div style={{ opacity: realPop, transform: `scale(${realPop})` }}>
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.mono,
                fontSize: 18,
                color: OFurryTheme.colors.accentOrange,
                letterSpacing: '0.15em',
              }}
            >
              REALIDADE APÓS INFLAÇÃO E DESÁGIO:
            </span>
            <div
              style={{
                fontSize: 85,
                lineHeight: 0.95,
                color: OFurryTheme.colors.accentOrange,
                textTransform: 'uppercase',
                textShadow: `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
                marginTop: 8,
              }}
            >
              {realReturn}
            </div>
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
