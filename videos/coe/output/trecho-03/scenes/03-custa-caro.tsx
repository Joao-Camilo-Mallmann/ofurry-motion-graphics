import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 03: O Golpe do Custo
 * Arquétipo: Crash Zoom / Word Slam
 * Câmera em crash zoom violento, ícone thief em escala brutal e palavra única de choque.
 */
export const CustaCaroScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic crash zoom entrance (frames 0-20)
  const crashSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const cameraZoom = interpolate(crashSpring, [0, 1], [1.7, 1]);
  const cameraOpacity = interpolate(crashSpring, [0, 0.3, 1], [0, 1, 1]);

  // Micro-screenshake on collision settle (frames 14-26)
  const shakeOffset =
    frame >= 14 && frame <= 24
      ? Math.sin(frame * 3) * (24 - frame) * 0.9
      : 0;

  // Thief icon snap from left (frames 6-28)
  const thiefSpring = getSpringProgress(frame, fps, 6, MotionPresets.bouncy);
  const thiefX = interpolate(thiefSpring, [0, 1], [-250, 0]);
  const thiefScale = interpolate(thiefSpring, [0, 1], [0.6, 1.1]);

  // Text punch from bottom (frames 14-36)
  const textSpring = getSpringProgress(frame, fps, 14, MotionPresets.snappy);
  const textY = interpolate(textSpring, [0, 1], [90, 0]);

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
          transform: `scale(${cameraZoom}) translate3d(${shakeOffset}px, ${shakeOffset * 0.5}px, 0)`,
          opacity: cameraOpacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: OFurryTheme.layout.safeArea.left,
            right: OFurryTheme.layout.safeArea.right,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 50,
          }}
        >
          {/* GIANT THIEF ICON CRASHING FROM LEFT */}
          <div
            style={{
              transform: `translate3d(${thiefX}px, 0, 0) scale(${thiefScale})`,
              filter: 'drop-shadow(0 0 35px rgba(255, 51, 75, 0.75))',
            }}
          >
            <AssetIcon
              name="thief"
              variant="white"
              size={240}
              glow={true}
              glowColor="#FF334B"
              showRing={true}
              delay={4}
            />
          </div>

          {/* MONUMENTAL WORD SLAM */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              transform: `translate3d(0, ${textY}px, 0)`,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 60,
                color: OFurryTheme.colors.primary,
                letterSpacing: '0.08em',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              SAIR ANTES
            </span>
            <h1
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 135,
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '-0.03em',
                color: '#FF334B',
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(255, 51, 75, 0.85)',
              }}
            >
              CUSTA CARO
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export const custaCaroScene = {
  id: '03-custa-caro',
  name: 'Custa Caro (Word Slam)',
  durationInFrames: 140, // 4.66s
  component: CustaCaroScene,
};
