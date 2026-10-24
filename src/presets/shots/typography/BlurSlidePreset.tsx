import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const BLUR_SLIDE_DURATION = 114; // 3.8s @ 30fps

export interface BlurSlideProps extends BasePresetProps {
  heroWords?: string[];
  subLabel?: string;
}

export const BlurSlidePreset: React.FC<BlurSlideProps> = ({
  transparent = true,
  heroWords = ['A', 'GRANDE', 'ILUSÃO'],
  subLabel = 'ANÁLISE FORENSE DO COE // 2026',
}) => {
  const t = useT();

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
          gap: 28,
        }}
      >
        {/* Micro-label Superior */}
        <div
          style={{
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 18,
            color: OFurryTheme.colors.accentOrange,
            letterSpacing: '0.15em',
            opacity: seg(t, 0.02, 0.22, E.outCubic),
            transform: `translateY(${lerp(seg(t, 0.02, 0.22, E.outCubic), 20, 0)}px)`,
          }}
        >
          {subLabel}
        </div>

        {/* Hero Monumental Words com Blur Slide Stagger */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            fontFamily: OFurryTheme.typography.families.hero,
            fontSize: 140,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            WebkitTextStroke: `3px ${OFurryTheme.colors.accentOrange}`,
          }}
        >
          {heroWords.map((word, i) => {
            const p = seg(t, 0.12 + i * 0.08, 0.12 + i * 0.08 + 0.35, E.outCubic);
            return (
              <span
                key={i}
                style={{
                  opacity: p,
                  transform: `translateY(${lerp(p, 60, 0)}px)`,
                  filter: `blur(${(1 - p) * 16}px)`,
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
