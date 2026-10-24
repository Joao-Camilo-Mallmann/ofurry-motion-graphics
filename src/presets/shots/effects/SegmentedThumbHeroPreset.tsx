import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const SEGMENTED_THUMB_HERO_DURATION = 120; // 4s @ 30fps

export interface SegmentedThumbProps extends BasePresetProps {
  optionA?: string;
  optionB?: string;
  tagline?: string;
}

export const SegmentedThumbHeroPreset: React.FC<SegmentedThumbProps> = ({
  transparent = true,
  optionA = 'PROMESSA DO ASSESSOR',
  optionB = 'REALIDADE DO CONTRATO',
  tagline = 'A MUDANÇA DE PERSPECTIVA',
}) => {
  const frame = useCurrentFrame();

  const switchProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const thumbX = switchProgress * 540;

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
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 20,
            letterSpacing: '0.25em',
            color: OFurryTheme.colors.accentOrange,
            marginBottom: 40,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>

        {/* Segmented Control Container Gigante */}
        <div
          style={{
            position: 'relative',
            width: 1100,
            height: 140,
            borderRadius: 70,
            backgroundColor: '#000000',
            border: '3px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            boxSizing: 'border-box',
          }}
        >
          {/* Thumb Deslizante Neon */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              width: 540,
              height: 120,
              borderRadius: 60,
              backgroundColor: switchProgress > 0.5 ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.15)',
              transform: `translateX(${thumbX}px)`,
              boxShadow:
                switchProgress > 0.5
                  ? `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`
                  : 'none',
              transition: 'background-color 0.2s ease',
            }}
          />

          {/* Opção A */}
          <div
            style={{
              flex: 1,
              zIndex: 10,
              textAlign: 'center',
              fontSize: 34,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: switchProgress < 0.5 ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
              transition: 'color 0.2s ease',
            }}
          >
            {optionA}
          </div>

          {/* Opção B */}
          <div
            style={{
              flex: 1,
              zIndex: 10,
              textAlign: 'center',
              fontSize: 34,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: switchProgress > 0.5 ? '#000000' : 'rgba(255,255,255,0.4)',
              transition: 'color 0.2s ease',
            }}
          >
            {optionB}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
