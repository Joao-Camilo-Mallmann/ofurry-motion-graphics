import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const CEL_FLASH_STOMP_DURATION = 120; // 4s @ 30fps

export interface CelFlashStompProps extends BasePresetProps {
  words?: Array<{ text: string; start: number; end: number; rot: number }>;
}

const DEFAULT_WORDS = [
  { text: 'CUSTA', start: 0, end: 30, rot: 2 },
  { text: 'MUITO', start: 30, end: 60, rot: -2 },
  { text: 'CARO', start: 60, end: 9999, rot: 0 },
];

export const CelFlashStompPreset: React.FC<CelFlashStompProps> = ({
  transparent = true,
  words = DEFAULT_WORDS,
}) => {
  const frame = useCurrentFrame();
  const currentWord = words.find((w) => frame >= w.start && frame < w.end) ?? words[words.length - 1];
  const t = frame - currentWord.start;

  const LAND = 6;
  const scale =
    t < 4
      ? interpolate(t, [0, 4], [1.25, 0.96], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.poly(4)),
        })
      : interpolate(t, [4, LAND], [0.96, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.quad),
        });

  // Flash de fundo neon sólido nos primeiros 6 frames após o impacto
  const ft = t - LAND;
  const isFlashing = ft >= 0 && ft < 8 && Math.floor(ft / 2) % 2 === 0;

  return (
    <OFurryStage transparent={transparent}>
      {/* Background Flash Layer (Neon #FF9900 / Pure Black) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: isFlashing
            ? OFurryTheme.colors.accentOrange
            : transparent
            ? 'transparent'
            : '#000000',
          transition: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale}) rotate(${currentWord.rot}deg)`,
        }}
      >
        <h1
          style={{
            fontFamily: OFurryTheme.typography.families.hero,
            fontSize: 220,
            lineHeight: 0.85,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: isFlashing ? '#000000' : '#FFFFFF',
            WebkitTextStroke: isFlashing ? 'none' : `5px ${OFurryTheme.colors.accentOrange}`,
            textShadow: isFlashing ? 'none' : `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`,
          }}
        >
          {currentWord.text}
        </h1>
      </div>
    </OFurryStage>
  );
};
