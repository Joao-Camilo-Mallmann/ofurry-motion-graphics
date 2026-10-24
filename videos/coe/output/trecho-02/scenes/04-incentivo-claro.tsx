import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const IncentivoClaroComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift anti-freeze
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.7,
    amplitudeX: 0.4,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: Punch frontal Z com tensão cinematográfica (frames 0-20)
  const entrySpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const entryScale = interpolate(entrySpring, [0, 1], [0.82, 1]);
  const entryOpacity = interpolate(entrySpring, [0, 0.4, 1], [0, 1, 1]);

  // Push-in contínuo da lente (Z: 1.00 -> 1.05 ao longo de 105 frames)
  const cameraPushIn = interpolate(frame, [15, 105], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Expansão dramática de letter-spacing
  const letterSpacing = interpolate(frame, [10, 105], [-2, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Laser vertical neon que parte o frame
  const laserHeight = interpolate(frame, [0, 30], [0, 480], {
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
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0) scale(${entryScale * cameraPushIn})`,
          opacity: entryOpacity,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* LASER VERTICAL CENTRAL NEON (2PX) */}
        <div
          style={{
            position: 'absolute',
            width: 2,
            height: laserHeight,
            backgroundColor: OFurryTheme.colors.highlightSolid,
            boxShadow: '0 0 16px rgba(255, 153, 0, 0.8)',
            zIndex: 1,
            opacity: 0.7,
          }}
        />

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
            zIndex: 2,
          }}
        >
          {/* MICRO-TAG TENSÃO */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 32,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '6px 18px',
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
              ALINHAMENTO DE INTERESSES // PONTO CRÍTICO
            </span>
          </div>

          {/* MONUMENTAL HERO: "INCENTIVO CLARO" */}
          <div
            style={{
              overflow: 'hidden',
              padding: '12px 24px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 140,
                lineHeight: 0.95,
                letterSpacing: `${letterSpacing}px`,
                textTransform: 'uppercase',
                color: OFurryTheme.colors.primary,
              }}
            >
              INCENTIVO CLARO
            </h1>
          </div>

          {/* SOLID NEON ACCENT BADGE */}
          <div
            style={{
              marginTop: 28,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: OFurryTheme.colors.highlightSolid,
              color: OFurryTheme.colors.highlightText,
              padding: '10px 32px',
              fontWeight: 900,
              letterSpacing: '3px',
              fontSize: 22,
              fontFamily: OFurryTheme.typography.families.hero,
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(255, 153, 0, 0.4)',
            }}
          >
            <span>O SISTEMA RECOMPENSA A VENDA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const incentivoClaroScene: BespokeScene = {
  id: 'incentivo-claro',
  name: 'O Incentivo Perverso',
  durationInFrames: 105, // 3.5 segundos a 30fps
  component: IncentivoClaroComponent,
};
