import React from 'react';
import { useCurrentFrame } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const SCRAMBLE_DECODE_DURATION = 120; // 4s @ 30fps

export interface ScrambleDecodeProps extends BasePresetProps {
  targetText?: string;
  tagline?: string;
}

const CHARSET = 'ABCDEF0123456789#%&$@*';
const LOCK_START = 15;
const LOCK_STEP = 5;
const FLASH_LEN = 3;

const h = (n: number) => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};

export const ScrambleDecodePreset: React.FC<ScrambleDecodeProps> = ({
  transparent = true,
  targetText = 'TAXA REAL = 2.5%',
  tagline = 'DECODIFICAÇÃO DE SPREAD OCULTO',
}) => {
  const frame = useCurrentFrame();
  const chars = targetText.split('');

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
          gap: 36,
        }}
      >
        <div
          style={{
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 20,
            letterSpacing: '0.25em',
            color: OFurryTheme.colors.accentOrange,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            fontSize: 130,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'uppercase',
          }}
        >
          {chars.map((ch, i) => {
            if (ch === ' ') {
              return <span key={i} style={{ display: 'inline-block', width: '0.4em' }} />;
            }

            const lockFrame = LOCK_START + i * LOCK_STEP;
            const locked = frame >= lockFrame;
            const flashing = locked && frame < lockFrame + FLASH_LEN;
            const tick = Math.floor(frame / 2);
            const scrambleChar = CHARSET[Math.floor(h(i * 101 + tick * 7 + 13) * CHARSET.length)];
            const shown = locked ? ch : scrambleChar;

            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  color: flashing
                    ? '#000000'
                    : locked
                    ? OFurryTheme.colors.accentOrange
                    : 'rgba(255,255,255,0.4)',
                  backgroundColor: flashing ? OFurryTheme.colors.accentOrange : 'transparent',
                  padding: '2px 4px',
                  borderRadius: 2,
                  boxShadow: flashing ? `0 0 25px ${OFurryTheme.colors.accentOrange}` : 'none',
                  transition: 'none',
                }}
              >
                {shown}
              </span>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
