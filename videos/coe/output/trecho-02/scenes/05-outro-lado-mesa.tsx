import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const OutroLadoMesaComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift anti-freeze
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.8,
    amplitudeX: 0.5,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Texto de base "MELHOR P/ VOCÊ" (frames 0-20)
  const baseSpring = getSpringProgress(frame, fps, 0, MotionPresets.smooth);
  const baseY = interpolate(baseSpring, [0, 1], [40, 0]);
  const baseOpacity = interpolate(baseSpring, [0, 1], [0, 0.45]);

  // Entrance 2: Carimbo Violento "NÃO REMUNERA" (frames 22-42)
  const stampSpring = getSpringProgress(frame, fps, 22, {
    damping: 14,
    mass: 0.6,
    stiffness: 280,
    overshootClamping: false,
  });
  const stampScale = interpolate(stampSpring, [0, 1], [1.8, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.3, 1], [0, 1, 1]);
  const stampRotate = interpolate(stampSpring, [0, 1], [-8, -2]);

  // Micro-shake pós-impacto do carimbo (frames 28-36)
  const shake =
    frame >= 28 && frame <= 36
      ? Math.sin((frame - 28) * Math.PI * 1.5) * (36 - frame) * 0.9
      : 0;

  // Orbit suave 2.5D
  const orbitY = interpolate(frame, [0, 135], [-4, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: OFurryTheme.typography.families.body,
        color: OFurryTheme.colors.primary,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY + shake}px, 0) perspective(1000px) rotateY(${orbitY}deg)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: OFurryTheme.layout.safeArea.top,
            bottom: OFurryTheme.layout.safeArea.bottom,
            left: OFurryTheme.layout.safeArea.left,
            right: OFurryTheme.layout.safeArea.right,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* MICRO-LABEL SUPERIOR */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: OFurryTheme.colors.highlightSolid,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: OFurryTheme.typography.sizes.microLabel,
                fontWeight: 700,
                letterSpacing: OFurryTheme.typography.letterSpacing.widest,
                color: OFurryTheme.colors.secondary,
                textTransform: 'uppercase',
              }}
            >
              QUEM ESTÁ DO OUTRO LADO DA MESA
            </span>
          </div>

          {/* CONTAINER DO DUELO VISUAL: TEXTO DE BASE VS CARIMBO NEON */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px 40px',
            }}
          >
            {/* TEXTO DE BASE: "MELHOR P/ VOCÊ" (ESMAECIDO) */}
            <div
              style={{
                opacity: baseOpacity,
                transform: `translateY(${baseY}px)`,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: OFurryTheme.typography.families.hero,
                  fontSize: 120,
                  lineHeight: 0.95,
                  letterSpacing: '-2px',
                  textTransform: 'uppercase',
                  color: OFurryTheme.colors.primary,
                }}
              >
                MELHOR P/ VOCÊ
              </h1>
            </div>

            {/* CARIMBO VIOLENTO: "NÃO REMUNERA" (NEON #FF9900 COM TEXTO PRETO) */}
            <div
              style={{
                position: 'absolute',
                transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
                opacity: stampOpacity,
                backgroundColor: OFurryTheme.colors.highlightSolid,
                color: OFurryTheme.colors.highlightText,
                padding: '16px 54px',
                boxShadow: '0 16px 50px rgba(255, 153, 0, 0.5)',
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontFamily: OFurryTheme.typography.families.condensed,
                  fontSize: 130,
                  lineHeight: 0.85,
                  letterSpacing: '4px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                }}
              >
                NÃO REMUNERA
              </span>
            </div>
          </div>

          {/* SUBTEXT EXPLICATIVO ANCORADO */}
          <div
            style={{
              marginTop: 48,
              opacity: interpolate(frame, [40, 70], [0, 0.85]),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 18,
                letterSpacing: '3px',
                color: OFurryTheme.colors.secondary,
                textTransform: 'uppercase',
              }}
            >
              O ASSESSOR É RECOMPENSADO PELA TRANSAÇÃO, NÃO PELO RETORNO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const outroLadoMesaScene: BespokeScene = {
  id: 'outro-lado-mesa',
  name: 'A Falsa Recomendação (O Outro Lado da Mesa)',
  durationInFrames: 135, // 4.5 segundos a 30fps
  component: OutroLadoMesaComponent,
};
