import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';

/**
 * Cena 04: A Ruptura (NÃO É O COE)
 * Duração: 150 frames (5.0s @ 30fps)
 * Arquétipo C: Crash Zoom / Word Slam brutalista
 * Tarja retangular sólida neon #FF9900 com tipografia preta monumental: 'NÃO É O COE'.
 * Sem firulas, colisão pura e corte a seco.
 */
export const NaoEOCOEScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-ambient drift
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.0,
    amplitudeX: 0.4,
    amplitudeRotate: 0,
    periodFrames: 70,
  });

  // Crash Zoom Entrance (frames 0-14)
  const crashSpring = getSpringProgress(frame, fps, 0, { ...MotionPresets.snappy, damping: 20, stiffness: 290 });
  const scale = interpolate(crashSpring, [0, 1], [1.7, 1]);
  const opacity = interpolate(crashSpring, [0, 0.2, 1], [0, 1, 1]);

  // Micro-shake pós-impacto (frames 14-20)
  const shakeY = frame >= 14 && frame <= 20 ? (frame % 2 === 0 ? 3 : -3) : 0;

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
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY + shakeY}px, 0)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* SOLID NEON BANNER (OFurry signature brutalist style) */}
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              padding: '24px 60px',
              borderRadius: 2,
              boxShadow: `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.65)}`,
              transform: 'rotate(-2deg)',
            }}
          >
            <h1
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 145,
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#000000',
                fontWeight: 900,
              }}
            >
              NÃO É O COE
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export const naoEOCOEScene = {
  id: '04-nao-e-o-coe',
  name: 'A Ruptura (NÃO É O COE)',
  durationInFrames: 150, // 5.0s
  component: NaoEOCOEScene,
};
