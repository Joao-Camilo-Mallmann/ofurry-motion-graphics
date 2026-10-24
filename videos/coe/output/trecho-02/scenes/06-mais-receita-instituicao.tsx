import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const MaisReceitaInstituicaoComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift anti-freeze
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.7,
    amplitudeX: 0.4,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Crash-zoom frontal brutal (frames 0-14)
  const crashSpring = getSpringProgress(frame, fps, 0, {
    damping: 25,
    mass: 0.7,
    stiffness: 300,
    overshootClamping: false,
  });
  const crashScale = interpolate(crashSpring, [0, 1], [0.65, 1]);
  const crashOpacity = interpolate(crashSpring, [0, 0.2, 1], [0, 1, 1]);

  // Entrance 2: Badge de ancoragem institucional (frames 12-28)
  const badgeSpring = getSpringProgress(frame, fps, 12, MotionPresets.snappy);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [20, 0]);

  // Entrance 3: Hairline de conclusão de trecho (frames 20-50)
  const lineProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 960]);

  // Continuous subtle neon pulse
  const neonGlow = 1 + Math.sin((frame / 20) * Math.PI) * 0.015;

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
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0) scale(${crashScale})`,
          opacity: crashOpacity,
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
          {/* MICRO-TAG DESTINO FINAL */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
              opacity: badgeOpacity,
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
              DESTINATÁRIO REAL // MARGEM FINANCEIRA
            </span>
          </div>

          {/* MONUMENTAL HERO: + RECEITA (160PX ARCHIVO BLACK NEON) */}
          <div
            style={{
              overflow: 'hidden',
              transform: `scale(${neonGlow})`,
            }}
          >
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 160,
                lineHeight: 0.9,
                letterSpacing: '-4px',
                textTransform: 'uppercase',
                color: OFurryTheme.colors.highlightSolid,
                textShadow: '0 0 50px rgba(255, 153, 0, 0.45)',
              }}
            >
              + RECEITA
            </h1>
          </div>

          {/* APOIO HERO: P/ A INSTITUIÇÃO (BEBAS NEUE 120PX) */}
          <div
            style={{
              marginTop: 14,
              opacity: badgeOpacity,
              transform: `translateY(${badgeY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.condensed,
                fontSize: 120,
                lineHeight: 0.85,
                letterSpacing: '5px',
                color: OFurryTheme.colors.primary,
                textTransform: 'uppercase',
              }}
            >
              P/ A INSTITUIÇÃO
            </span>
          </div>

          {/* HAIRLINE TÉCNICA ANCORADA */}
          <div
            style={{
              marginTop: 32,
              width: lineWidth,
              maxWidth: '85%',
              height: 1,
              backgroundColor: OFurryTheme.colors.borderLight,
            }}
          />

          {/* CONCLUSÃO TÉCNICA */}
          <div
            style={{
              marginTop: 20,
              opacity: interpolate(frame, [30, 60], [0, 0.85]),
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 16,
              color: OFurryTheme.colors.secondary,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
            }}
          >
            O CLIENTE É O INSUMO. A RECEITA É O PRODUTO.
          </div>
        </div>
      </div>
    </div>
  );
};

export const maisReceitaInstituicaoScene: BespokeScene = {
  id: 'mais-receita-instituicao',
  name: 'O Motor da Instituição',
  durationInFrames: 135, // 4.5 segundos a 30fps
  component: MaisReceitaInstituicaoComponent,
};
