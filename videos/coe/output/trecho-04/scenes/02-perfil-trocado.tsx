import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 02: O Alvo Errado (NÃO É VOCÊ)
 * Duração: 180 frames (6.0s @ 30fps)
 * Arquétipo C: Crash Zoom / Word Slam
 * Ícone do investidor (user) anulado pelo x-mark e frase monumental 'NÃO É VOCÊ'.
 * Direto, sem tags de enfeite ou caixas.
 */
export const PerfilTrocadoScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-ambient drift
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.2,
    amplitudeX: 0.6,
    amplitudeRotate: 0,
    periodFrames: 80,
  });

  // Crash Zoom Entrance (frames 0-14)
  const crashSpring = getSpringProgress(frame, fps, 0, { ...MotionPresets.snappy, damping: 18, stiffness: 280 });
  const scale = interpolate(crashSpring, [0, 1], [1.7, 1]);
  const opacity = interpolate(crashSpring, [0, 0.2, 1], [0, 1, 1]);

  // Carimbo Stamp do X-Mark (frames 14-30)
  const stampSpring = getSpringProgress(frame, fps, 14, MotionPresets.snappy);
  const stampScale = interpolate(stampSpring, [0, 1], [1.6, 1]);
  const stampRotate = interpolate(stampSpring, [0, 1], [-12, -4]);
  const stampOpacity = interpolate(stampSpring, [0, 0.3, 1], [0, 1, 1]);

  // Micro-shake no impacto do carimbo (frames 14-22)
  const shakeY = frame >= 14 && frame <= 22 ? (frame % 2 === 0 ? 4 : -4) : 0;
  const shakeX = frame >= 14 && frame <= 22 ? (frame % 2 === 0 ? -3 : 3) : 0;

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
          transform: `translate3d(${ambient.translateX + shakeX}px, ${ambient.translateY + shakeY}px, 0)`,
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
          {/* USER ICON WITH STAMPED X-MARK */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <AssetIcon
              name="user"
              variant="white"
              size={150}
              glow={true}
              delay={0}
            />
            {/* Red / Neon X-Mark Stamp */}
            <div
              style={{
                position: 'absolute',
                transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
                opacity: stampOpacity,
              }}
            >
              <AssetIcon
                name="x-mark"
                variant="original"
                size={170}
                glow={true}
                glowColor="#FF2200"
                delay={0}
              />
            </div>
          </div>

          {/* MONUMENTAL TEXT */}
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 150,
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                textShadow: '0 8px 30px rgba(0,0,0,0.9)',
              }}
            >
              NÃO É VOCÊ
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export const perfilTrocadoScene = {
  id: '02-perfil-trocado',
  name: 'O Alvo Errado (NÃO É VOCÊ)',
  durationInFrames: 180, // 6.0s
  component: PerfilTrocadoScene,
};
