import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const IlusaoSofisticadoComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift anti-freeze (Anti-Wobble: amplitudeRotate: 0)
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.9,
    amplitudeX: 0.5,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Crash Zoom Punch no Z & Opacity (frames 0-20)
  const zoomSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const zoomScale = interpolate(zoomSpring, [0, 1], [0.75, 1]);
  const zoomOpacity = interpolate(zoomSpring, [0, 0.3, 1], [0, 1, 1]);

  // Entrance 2: Mask reveal da palavra SOFISTICADO (frames 0-24)
  const textSpring = getSpringProgress(frame, fps, 4, MotionPresets.snappy);
  const textY = interpolate(textSpring, [0, 1], [140, 0]);

  // Entrance 3: Micro-tag técnica superior (frames 12-32)
  const tagSpring = getSpringProgress(frame, fps, 12, MotionPresets.smooth);
  const tagOpacity = interpolate(tagSpring, [0, 1], [0, 1]);

  // Entrance 4: Hairline de precisão inferior com laser shimmer (frames 20-50)
  const lineProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 920]);

  // Continuous micro-expansion (anti-freeze)
  const continuousBreathing = interpolate(frame, [25, 120], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shimmerOffset = (frame * 14) % 1300;

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
      {/* Camada de Micro-Drift e Câmera 2.5D */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0) scale(${zoomScale * continuousBreathing})`,
          opacity: zoomOpacity,
          perspective: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
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
          {/* MICRO-TAG TÉCNICA SUPERIOR */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 28,
              opacity: tagOpacity,
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
              PERCEPÇÃO DO INVESTIDOR // STATUS VS CONTROLE
            </span>
          </div>

          {/* MONUMENTAL HERO: "SOFISTICADO" COM MASK REVEAL */}
          <div
            style={{
              overflow: 'hidden',
              paddingBottom: 16,
              maxWidth: '95%',
            }}
          >
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 145,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                textTransform: 'uppercase',
                color: OFurryTheme.colors.primary,
                transform: `translateY(${textY}px)`,
                display: 'inline-block',
              }}
            >
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>“</span>
              SOFISTICADO
              <span style={{ color: OFurryTheme.colors.highlightSolid }}>”</span>
            </h1>
          </div>

          {/* SOLID NEON ACCENT BADGE (ANTI-AI SLOP) */}
          <div
            style={{
              marginTop: 20,
              opacity: tagOpacity,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: OFurryTheme.colors.highlightSolid,
              color: OFurryTheme.colors.highlightText,
              padding: '10px 28px',
              fontWeight: 900,
              letterSpacing: '3px',
              fontSize: 22,
              fontFamily: OFurryTheme.typography.families.hero,
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(255, 153, 0, 0.35)',
            }}
          >
            <span>ILUSÃO DE CONTROLE</span>
          </div>

          {/* HAIRLINE TÉCNICA COM SHIMMER LUMINOSO */}
          <div
            style={{
              marginTop: 36,
              width: lineWidth,
              maxWidth: '85%',
              height: 1,
              backgroundColor: OFurryTheme.colors.borderLight,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: shimmerOffset - 250,
                width: 200,
                background: `linear-gradient(90deg, transparent, ${OFurryTheme.colors.highlightSolid}, transparent)`,
              }}
            />
          </div>

          {/* SUB-FOOTER TECHNICAL DATA */}
          <div
            style={{
              marginTop: 20,
              opacity: interpolate(frame, [30, 55], [0, 0.85]),
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: 16,
              color: OFurryTheme.colors.secondary,
              letterSpacing: '2px',
            }}
          >
            COMPLEXIDADE EMBUTIDA SEM TRANSPARÊNCIA
          </div>
        </div>
      </div>
    </div>
  );
};

export const ilusaoSofisticadoScene: BespokeScene = {
  id: 'ilusao-sofisticado',
  name: 'A Ilusão da Sofisticação',
  durationInFrames: 120, // 4.0 segundos a 30fps
  component: IlusaoSofisticadoComponent,
};
