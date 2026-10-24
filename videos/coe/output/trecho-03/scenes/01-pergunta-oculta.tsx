import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 01: A Pergunta Silenciada
 * Arquétipo: Layered Text Stash / Intersect (Inspirado em docs/RefFurry/ref2.png)
 * Tipografia com contorno neon espesso e ícone silent espiando por trás das letras.
 */
export const PerguntaOcultaScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-ambient drift (anti-freeze, amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.5,
    amplitudeX: 0.6,
    amplitudeRotate: 0,
    periodFrames: 75,
  });

  // Entrance spring for Stash Icon (behind text)
  const iconSpring = getSpringProgress(frame, fps, 0, MotionPresets.bouncy);
  const iconY = interpolate(iconSpring, [0, 1], [60, -30]);
  const iconScale = interpolate(iconSpring, [0, 1], [0.6, 1.05]);
  const iconOpacity = interpolate(iconSpring, [0, 0.4, 1], [0, 0.85, 1]);

  // Entrance spring for Monumental Stroke Text (frames 10-32)
  const textSpring = getSpringProgress(frame, fps, 10, MotionPresets.snappy);
  const textScale = interpolate(textSpring, [0, 1], [0.8, 1]);
  const textOpacity = interpolate(textSpring, [0, 0.3, 1], [0, 1, 1]);

  // Micro-label snap (frames 24-44)
  const tagSpring = getSpringProgress(frame, fps, 24, MotionPresets.snappy);
  const tagY = interpolate(tagSpring, [0, 1], [30, 0]);
  const tagOpacity = interpolate(tagSpring, [0, 0.5, 1], [0, 1, 1]);

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
        {/* TOP CONTEXT TAG */}
        <div
          style={{
            position: 'absolute',
            top: 140,
            opacity: tagOpacity,
            transform: `translate3d(0, ${tagY}px, 0)`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: OFurryTheme.colors.accentOrange,
              borderRadius: '50%',
              boxShadow: `0 0 12px ${OFurryTheme.colors.accentOrange}`,
            }}
          />
          <span
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 16,
              letterSpacing: '0.2em',
              color: OFurryTheme.colors.accentOrange,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            O TABU DO INVESTIMENTO
          </span>
        </div>

        {/* LAYERED INTERSECT CONTAINER (ref2.png style) */}
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
          {/* LAYER 0 (BEHIND TEXT): Silent Icon peeking out from behind the letters */}
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
              name="silent"
              variant="white"
              size={230}
              glow={true}
              showGlowHalo={true}
              delay={2}
            />
          </div>

          {/* LAYER 1 (FOREGROUND): Monumental text with thick neon orange stroke & black fill (ref2.png) */}
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
                fontSize: 155,
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#000000',
                WebkitTextStroke: `5px ${OFurryTheme.colors.accentOrange}`,
                textShadow: `0 0 25px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`,
              }}
            >
              PERGUNTA
            </h1>
            <span
              style={{
                display: 'block',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 70,
                letterSpacing: '0.04em',
                color: OFurryTheme.colors.primary,
                marginTop: 8,
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
              }}
            >
              QUE NINGUÉM FAZ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const perguntaOcultaScene = {
  id: '01-pergunta-oculta',
  name: 'A Pergunta Oculta (Layered Stash)',
  durationInFrames: 140, // 4.66s
  component: PerguntaOcultaScene,
};
