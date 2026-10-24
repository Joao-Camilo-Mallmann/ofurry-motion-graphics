import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const GerarReceitaComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift anti-freeze
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.8,
    amplitudeX: 0.4,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Massive Vertical Stomp (frames 0-14)
  const stompSpring = getSpringProgress(frame, fps, 0, {
    damping: 20,
    mass: 0.7,
    stiffness: 260,
    overshootClamping: false,
  });
  const stompY = interpolate(stompSpring, [0, 1], [-300, 0]);
  const stompScale = interpolate(stompSpring, [0, 0.7, 1], [1.2, 0.96, 1]);

  // Micro-shake sísmico nos primeiros 8 frames após impacto (f6-f14)
  const shake =
    frame >= 6 && frame <= 14
      ? Math.sin((frame - 6) * Math.PI * 1.5) * (14 - frame) * 0.8
      : 0;

  // Entrance 2: Rótulo de alerta e tags (frames 14-30)
  const labelSpring = getSpringProgress(frame, fps, 14, MotionPresets.snappy);
  const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);
  const labelY = interpolate(labelSpring, [0, 1], [25, 0]);

  // Neon breathing pulse
  const neonPulse = 1 + Math.sin((frame / 20) * Math.PI) * 0.015;

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
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY + shake}px, 0)`,
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
              marginBottom: 30,
              opacity: labelOpacity,
              transform: `translateY(${labelY}px)`,
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
              MOTIVAÇÃO DA DISTRIBUIÇÃO // META DA MESA
            </span>
          </div>

          {/* SOLID NEON MASSIVE SLAM BOX (ANTI-AI SLOP: #FF9900 COM TEXTO #000000) */}
          <div
            style={{
              transform: `translateY(${stompY}px) scale(${stompScale * neonPulse})`,
              backgroundColor: OFurryTheme.colors.highlightSolid,
              padding: '28px 64px',
              display: 'inline-block',
              boxShadow: '0 20px 60px rgba(255, 153, 0, 0.45)',
            }}
          >
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 140,
                lineHeight: 0.9,
                letterSpacing: '-2px',
                textTransform: 'uppercase',
                color: OFurryTheme.colors.highlightText,
              }}
            >
              GERAR RECEITA
            </h1>
          </div>

          {/* SUBTEXT MONUMENTAL ANCORADO */}
          <div
            style={{
              marginTop: 36,
              opacity: labelOpacity,
              transform: `translateY(${labelY}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.condensed,
                fontSize: 48,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: OFurryTheme.colors.primary,
              }}
            >
              O PRODUTO É DESENHADO PARA O DISTRIBUIDOR
            </span>
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 16,
                letterSpacing: '2px',
                color: OFurryTheme.colors.muted,
                textTransform: 'uppercase',
              }}
            >
              COMISSÃO IMEDIATA EMBUTIDA NA ESTRUTURA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const gerarReceitaScene: BespokeScene = {
  id: 'gerar-receita',
  name: 'A Máquina de Gerar Receita',
  durationInFrames: 105, // 3.5 segundos a 30fps
  component: GerarReceitaComponent,
};
