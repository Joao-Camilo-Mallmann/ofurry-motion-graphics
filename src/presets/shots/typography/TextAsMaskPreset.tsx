import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const TEXT_AS_MASK_DURATION = 150; // 5s @ 30fps

export interface TextAsMaskProps extends BasePresetProps {
  maskWord?: string;
  tagline?: string;
}

export const TextAsMaskPreset: React.FC<TextAsMaskProps> = ({
  transparent = true,
  maskWord = 'ARMADILHA',
  tagline = 'O SEGREDO DA BANCA',
}) => {
  const f = useCurrentFrame();
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

  const endT = interpolate(f, [90, 125], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const driftX = interpolate(f, [0, 90], [80, -80], clamp);
  const maskScale = interpolate(endT, [0, 1], [1, 20]);
  const captionOpacity = interpolate(f, [85, 100], [1, 0], clamp);

  const MASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <text x="960" y="620" font-family="'Archivo Black', 'Bebas Neue', sans-serif" font-size="290" font-weight="900" letter-spacing="-6" text-anchor="middle" fill="white">
      ${maskWord}
    </text>
  </svg>`;
  const MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(MASK_SVG)}")`;

  return (
    <OFurryStage transparent={transparent}>
      {/* Camada Mascarada com Conteúdo em Movimento (Gradiente Neon Vibrante) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${maskScale})`,
          transformOrigin: '50% 55%',
          WebkitMaskImage: MASK_URL,
          maskImage: MASK_URL,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '1920px 1080px',
          maskSize: '1920px 1080px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -200,
            background: `linear-gradient(135deg, ${OFurryTheme.colors.accentOrange} 0%, #FF5500 50%, #000000 100%)`,
            transform: `translateX(${driftX}px)`,
          }}
        />
      </div>

      {/* Traço Outline Exterior Neon */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
          fontSize: 290,
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: 'transparent',
          WebkitTextStroke: `4px ${OFurryTheme.colors.accentOrange}`,
          pointerEvents: 'none',
          opacity: 1 - endT,
          transform: `scale(${maskScale})`,
          transformOrigin: '50% 55%',
        }}
      >
        {maskWord}
      </div>

      {/* Subtítulo Inferior */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: OFurryTheme.typography.families.mono,
          fontSize: 22,
          letterSpacing: '0.25em',
          color: '#AAAAAA',
          opacity: captionOpacity,
          textTransform: 'uppercase',
        }}
      >
        {tagline}
      </div>
    </OFurryStage>
  );
};
