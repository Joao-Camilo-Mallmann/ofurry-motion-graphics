import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 05: O Alicerce (BASE)
 * Duração: 240 frames (8.0s @ 30fps)
 * Arquétipo B puro: Layered Text Stash (docs/RefFurry/ref2.png)
 * Palavra monumental 'BASE' com preenchimento preto e traço neon espesso #FF9900,
 * com os pilares físicos (pillar) sustentando a estrutura por trás das letras.
 */
export const ConstruirABaseScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-ambient drift sutil
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.2,
    amplitudeX: 0.5,
    amplitudeRotate: 0,
    periodFrames: 85,
  });

  // Entrance spring para os pilares (Layer 0)
  const iconSpring = getSpringProgress(frame, fps, 0, MotionPresets.bouncy);
  const iconY = interpolate(iconSpring, [0, 1], [60, -35]);
  const iconScale = interpolate(iconSpring, [0, 1], [0.6, 1.05]);
  const iconOpacity = interpolate(iconSpring, [0, 0.4, 1], [0, 0.9, 1]);

  // Entrance spring para o texto monumental BASE (Layer 1)
  const textSpring = getSpringProgress(frame, fps, 8, MotionPresets.snappy);
  const textScale = interpolate(textSpring, [0, 1], [0.75, 1]);
  const textOpacity = interpolate(textSpring, [0, 0.3, 1], [0, 1, 1]);

  // Frase inferior de apoio (frames 28-48)
  const subSpring = getSpringProgress(frame, fps, 28, MotionPresets.smooth);
  const subY = interpolate(subSpring, [0, 1], [20, 0]);
  const subOpacity = interpolate(subSpring, [0, 0.6, 1], [0, 0.7, 0.85]);

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
          {/* LAYER 0: Pilares de sustentação atrás */}
          <div
            style={{
              position: 'absolute',
              zIndex: 0,
              transform: `translate3d(0, ${iconY}px, 0) scale(${iconScale})`,
              opacity: iconOpacity,
              filter: 'drop-shadow(0 0 35px rgba(255, 153, 0, 0.45))',
            }}
          >
            <AssetIcon
              name="pillar"
              variant="white"
              size={240}
              glow={true}
              delay={0}
            />
          </div>

          {/* LAYER 1: Monumental stroke text (ref2.png) */}
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
                fontSize: 220,
                lineHeight: 0.88,
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#000000',
                WebkitTextStroke: `6px ${OFurryTheme.colors.accentOrange}`,
                textShadow: `0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.65)}`,
              }}
            >
              BASE
            </h1>
          </div>
        </div>

        {/* SUBTITLE */}
        <div
          style={{
            marginTop: 28,
            opacity: subOpacity,
            transform: `translate3d(0, ${subY}px, 0)`,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 48,
              letterSpacing: '0.06em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontWeight: 700,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            CONSTRUA A BASE
          </span>
        </div>
      </div>
    </div>
  );
};

export const construirABaseScene = {
  id: '05-construir-a-base',
  name: 'O Alicerce (BASE)',
  durationInFrames: 240, // 8.0s
  component: ConstruirABaseScene,
};
