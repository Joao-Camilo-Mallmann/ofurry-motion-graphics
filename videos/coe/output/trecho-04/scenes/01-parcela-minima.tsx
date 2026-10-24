import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 01: A Parcela Mínima (5%)
 * Duração: 300 frames (10.0s @ 30fps)
 * Arquétipo B puro: Layered Text Stash (docs/RefFurry/ref2.png)
 * Métrica monumental '5%' com traço neon espesso #FF9900 e preenchimento preto,
 * com notas de dinheiro espiando de trás dos caracteres. Zero poluição de tags.
 */
export const ParcelaMinimaScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-ambient drift para não congelar o timeline
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.8,
    amplitudeX: 0.8,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance spring para as notas de dinheiro (Layer 0)
  const iconSpring = getSpringProgress(frame, fps, 0, MotionPresets.bouncy);
  const iconY = interpolate(iconSpring, [0, 1], [60, -30]);
  const iconScale = interpolate(iconSpring, [0, 1], [0.5, 1.1]);
  const iconOpacity = interpolate(iconSpring, [0, 0.4, 1], [0, 0.9, 1]);

  // Entrance spring para o texto monumental 5% (Layer 1)
  const textSpring = getSpringProgress(frame, fps, 8, MotionPresets.snappy);
  const textScale = interpolate(textSpring, [0, 1], [0.75, 1]);
  const textOpacity = interpolate(textSpring, [0, 0.3, 1], [0, 1, 1]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: OFurryTheme.typography.families.hero,
        color: OFurryTheme.colors.primary,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* LAYERED INTERSECT CONTAINER (ref2.png) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            transform: `scale(${textScale})`,
            opacity: textOpacity,
          }}
        >
          {/* LAYER 0: Money / Cédulas espiando atrás */}
          <div
            style={{
              position: 'absolute',
              zIndex: 0,
              transform: `translate3d(20px, ${iconY}px, 0) scale(${iconScale}) rotate(-5deg)`,
              opacity: iconOpacity,
              filter: 'drop-shadow(0 0 40px rgba(255, 153, 0, 0.5))',
            }}
          >
            <AssetIcon
              name="money"
              variant="original"
              size={280}
              glow={true}
              glowColor="#FF9900"
              delay={0}
            />
          </div>

          {/* LAYER 1: Métrica monumental 5% */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 270,
                lineHeight: 0.88,
                margin: 0,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#000000',
                WebkitTextStroke: `6px ${OFurryTheme.colors.accentOrange}`,
                textShadow: `0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.65)}`,
              }}
            >
              5%
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export const parcelaMinimaScene = {
  id: '01-parcela-minima',
  name: 'A Parcela Mínima (5%)',
  durationInFrames: 300, // 10.0s
  component: ParcelaMinimaScene,
};
