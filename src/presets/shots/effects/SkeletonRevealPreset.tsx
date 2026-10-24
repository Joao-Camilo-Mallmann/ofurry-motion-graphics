import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const SKELETON_REVEAL_DURATION = 120; // 4s @ 30fps

export interface SkeletonRevealProps extends BasePresetProps {
  label?: string;
  metric?: string;
  description?: string;
}

export const SkeletonRevealPreset: React.FC<SkeletonRevealProps> = ({
  transparent = true,
  label = 'ESTRUTURA DE DESÁGIO',
  metric = '15.4% IMEDIATO',
  description = 'CUSTO DE SAÍDA ANTECIPADA REVELADO',
}) => {
  const frame = useCurrentFrame();

  const wireframeP = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const solidifyP = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 960,
            height: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px ${solidifyP > 0.5 ? 'solid' : 'dashed'} ${
              solidifyP > 0.5 ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.3)'
            }`,
            backgroundColor: solidifyP > 0.5 ? 'rgba(0,0,0,0.95)' : 'transparent',
            boxShadow:
              solidifyP > 0.5
                ? `0 0 60px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`
                : 'none',
            padding: 40,
            boxSizing: 'border-box',
            transform: `scale(${interpolate(wireframeP, [0, 1], [0.85, 1])})`,
            opacity: wireframeP,
            transition: 'border-color 0.2s, background-color 0.2s',
          }}
        >
          {/* Wireframe Guides que se solidificam */}
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 20,
              letterSpacing: '0.2em',
              color: solidifyP > 0.5 ? OFurryTheme.colors.accentOrange : '#888888',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontSize: 110,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: solidifyP > 0.5 ? '#FFFFFF' : 'transparent',
              WebkitTextStroke: solidifyP > 0.5 ? 'none' : `2px ${OFurryTheme.colors.accentOrange}`,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            {metric}
          </div>

          <div
            style={{
              marginTop: 28,
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 18,
              color: solidifyP > 0.5 ? '#AAAAAA' : 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
