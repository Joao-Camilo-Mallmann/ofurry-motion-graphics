import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 04: O Grande Desconto / Deságio
 * Arquétipo: Monumental Metric Intersect (Inspirado em docs/RefFurry/ref2.png)
 * Métrica colossal vazada com stroke neon orange e ícone chart-lose espiando por trás.
 */
export const GrandeDescontoScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.2,
    amplitudeX: 0.6,
    amplitudeRotate: 0,
    periodFrames: 70,
  });

  // Downward gravity drop for the stash graphic (frames 0-25)
  const stashSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const stashY = interpolate(stashSpring, [0, 1], [-80, -25]);
  const stashScale = interpolate(stashSpring, [0, 1], [0.7, 1.05]);

  // Entrance spring for Monumental Stroke Metric (-35%) (frames 8-32)
  const metricSpring = getSpringProgress(frame, fps, 8, MotionPresets.bouncy);
  const metricScale = interpolate(metricSpring, [0, 1], [0.75, 1]);
  const metricOpacity = interpolate(metricSpring, [0, 0.3, 1], [0, 1, 1]);

  // Animated discount counter (frames 10-45)
  const countSpring = getSpringProgress(frame, fps, 10, MotionPresets.snappy);
  const countVal = Math.round(interpolate(countSpring, [0, 1], [0, 35]));

  // Impact stamp reveal (frames 24-42)
  const stampSpring = getSpringProgress(frame, fps, 24, MotionPresets.snappy);
  const stampScale = interpolate(stampSpring, [0, 1], [1.3, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.4, 1], [0, 1, 1]);

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
        {/* TOP CLASSIFICATION TAG */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            transform: `scale(${stampScale})`,
            opacity: stampOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: '#FF334B',
              padding: '8px 24px',
              borderRadius: 3,
              boxShadow: '0 0 25px rgba(255, 51, 75, 0.65)',
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.18em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              VENDA FORÇADA NO MERCADO
            </span>
          </div>
        </div>

        {/* LAYERED METRIC STASH CONTAINER (ref2.png style) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            transform: `scale(${metricScale})`,
            opacity: metricOpacity,
          }}
        >
          {/* LAYER 0 (BEHIND METRIC): Chart Lose Icon peeking out from behind the numbers */}
          <div
            style={{
              position: 'absolute',
              zIndex: 0,
              transform: `translate3d(60px, ${stashY}px, 0) scale(${stashScale})`,
              filter: 'drop-shadow(0 0 30px rgba(255, 153, 0, 0.5))',
            }}
          >
            <AssetIcon
              name="chart-lose"
              variant="white"
              size={210}
              glow={true}
              delay={4}
            />
          </div>

          {/* LAYER 1 (FOREGROUND): Colossal -35% with black fill & thick neon orange stroke (ref2.png) */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 220,
                fontWeight: 900,
                lineHeight: 0.85,
                color: '#000000',
                WebkitTextStroke: `6px ${OFurryTheme.colors.accentOrange}`,
                letterSpacing: '-0.05em',
                textShadow: `0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
              }}
            >
              -{countVal}%
            </div>
            <span
              style={{
                display: 'block',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 54,
                letterSpacing: '0.06em',
                color: OFurryTheme.colors.primary,
                marginTop: 12,
                textTransform: 'uppercase',
                textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              }}
            >
              GRANDE DESCONTO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const grandeDescontoScene = {
  id: '04-grande-desconto',
  name: 'Grande Desconto (Metric Stash)',
  durationInFrames: 160, // 5.33s
  component: GrandeDescontoScene,
};
