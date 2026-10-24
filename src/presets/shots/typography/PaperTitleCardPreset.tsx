import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const PAPER_TITLE_CARD_DURATION = 90; // 3s @ 30fps

export interface PaperTitleCardProps extends BasePresetProps {
  headline?: string;
  highlightWord?: string;
  metricLabel?: string;
}

export const PaperTitleCardPreset: React.FC<PaperTitleCardProps> = ({
  transparent = true,
  headline = 'O QUE O BANCO NUNCA CONTOU',
  highlightWord = 'NUNCA',
  metricLabel = 'CLÁUSULA 8.2 // TAXA DE SAÍDA ANTECIPADA',
}) => {
  const frame = useCurrentFrame();

  const words = headline.split(' ');

  // Underline animado
  const underlineScale = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Fade in do micro-label
  const labelOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          textAlign: 'center',
          padding: 60,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px 28px',
            maxWidth: 1500,
          }}
        >
          {words.map((w, i) => {
            const startF = i * 4;
            const progress = interpolate(frame, [startF, startF + 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            const scale = interpolate(progress, [0, 1], [1.3, 1]);
            const isHighlight = w.toUpperCase() === highlightWord.toUpperCase();

            return (
              <span
                key={i}
                style={{
                  fontSize: 110,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  opacity: progress,
                  transform: `scale(${scale})`,
                  color: isHighlight ? OFurryTheme.colors.accentOrange : '#FFFFFF',
                  textShadow: isHighlight
                    ? `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`
                    : 'none',
                  display: 'inline-block',
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        {/* Tarja / Underline Sólido Neon */}
        <div
          style={{
            width: 480,
            height: 6,
            backgroundColor: OFurryTheme.colors.accentOrange,
            marginTop: 40,
            transform: `scaleX(${underlineScale})`,
            transformOrigin: 'center center',
            boxShadow: `0 0 25px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
          }}
        />

        {/* Micro-label Inferior */}
        <div
          style={{
            marginTop: 32,
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 20,
            letterSpacing: '0.15em',
            color: '#AAAAAA',
            opacity: labelOpacity,
            textTransform: 'uppercase',
          }}
        >
          {metricLabel}
        </div>
      </div>
    </OFurryStage>
  );
};
