import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const BEAT_STEP_LIST_THEME_CYCLE_DURATION = 120; // 4s @ 30fps

export interface BeatStepListProps extends BasePresetProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  'RENDA FIXA?',
  'PRODUTO ESTRUTURADO',
  'DERIVATIVO SINTÉTICO',
  'ARMADILHA DO BANCO',
];

const ROW_H = 140;
const BEAT_LEN = 22;
const FIRST_BEAT = 20;

export const BeatStepListThemeCyclePreset: React.FC<BeatStepListProps> = ({
  transparent = true,
  items = DEFAULT_ITEMS,
}) => {
  const frame = useCurrentFrame();

  const N_BEATS = items.length - 1;
  const raw = (frame - FIRST_BEAT) / BEAT_LEN;
  const beat = Math.min(N_BEATS, Math.max(0, Math.floor(raw) + 1));
  const beatStartFrame = FIRST_BEAT + (beat - 1) * BEAT_LEN;

  const tInBeat =
    beat === 0
      ? 1
      : interpolate((frame - beatStartFrame) / 6, [0, 1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: (x) => 1 - Math.pow(1 - x, 3),
        });

  const step = beat === 0 ? 0 : beat - 1 + tInBeat;
  const listY = -step * ROW_H;
  const pop = beat === 0 ? 1 : interpolate(tInBeat, [0, 0.5, 1], [1.14, 0.98, 1]);

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        {/* Tarja Central Fixa que Captura as Palavras */}
        <div
          style={{
            position: 'absolute',
            width: 1400,
            height: ROW_H + 20,
            backgroundColor: OFurryTheme.colors.accentOrange,
            transform: `scale(${pop})`,
            boxShadow: `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`,
            borderRadius: 4,
          }}
        />

        {/* Lista Vertical que Desliza */}
        <div
          style={{
            position: 'relative',
            height: ROW_H,
            overflow: 'visible',
          }}
        >
          <div
            style={{
              transform: `translateY(${listY}px)`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {items.map((item, idx) => {
              const isActive = Math.round(step) === idx;

              return (
                <div
                  key={idx}
                  style={{
                    height: ROW_H,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 100,
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: isActive ? '#000000' : 'rgba(255,255,255,0.25)',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.1s ease',
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
