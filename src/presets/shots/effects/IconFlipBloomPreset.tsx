import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';
import { AssetIcon } from '../../../primitives/AssetIcon';
import { OFurryIconName } from '../../../theme/icons';

export const ICON_FLIP_BLOOM_DURATION = 120; // 4s @ 30fps

export interface IconFlipBloomProps extends BasePresetProps {
  initialIcon?: OFurryIconName;
  brandText?: string;
  channelTag?: string;
}

export const IconFlipBloomPreset: React.FC<IconFlipBloomProps> = ({
  transparent = true,
  initialIcon = 'thief',
  brandText = 'OFURRY',
  channelTag = 'ANÁLISE INDEPENDENTE SEM CONFLITO',
}) => {
  const frame = useCurrentFrame();

  // 0-30: Icon entra e balança
  const iconIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 30-48: Giro no eixo Y que achata o ícone
  const flipY = interpolate(frame, [30, 48], [0, 90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // 48-75: Bloom neon e revelação da marca
  const bloomProgress = interpolate(frame, [48, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const isFlipped = frame >= 48;

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Fase 1: Ícone Inicial Girando em Y */}
          {!isFlipped && (
            <div
              style={{
                transform: `scale(${iconIn}) rotateY(${flipY}deg)`,
                opacity: iconIn,
                filter: `drop-shadow(0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.6)})`,
              }}
            >
              <AssetIcon name={initialIcon} variant="orange" size={200} glow={true} />
            </div>
          )}

          {/* Fase 2: Flash de Bloom Neon e Wordmark Monumental OFURRY */}
          {isFlipped && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${interpolate(bloomProgress, [0, 1], [0.85, 1])})`,
                opacity: bloomProgress,
              }}
            >
              <h1
                style={{
                  fontSize: 190,
                  lineHeight: 0.85,
                  margin: 0,
                  color: '#000000',
                  WebkitTextStroke: `6px ${OFurryTheme.colors.accentOrange}`,
                  textShadow: `0 0 60px ${OFurryTheme.colors.accentOrangeAlpha(0.85)}`,
                  letterSpacing: '-0.04em',
                }}
              >
                {brandText}
              </h1>

              <div
                style={{
                  marginTop: 24,
                  fontFamily: OFurryTheme.typography.families.mono,
                  fontSize: 22,
                  letterSpacing: '0.25em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                {channelTag}
              </div>
            </div>
          )}
        </div>
      </div>
    </OFurryStage>
  );
};
