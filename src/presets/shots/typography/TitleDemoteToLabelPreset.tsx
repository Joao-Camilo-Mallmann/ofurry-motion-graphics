import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const TITLE_DEMOTE_TO_LABEL_DURATION = 120; // 4s @ 30fps

export interface TitleDemoteProps extends BasePresetProps {
  hookTitle?: string;
  heroMetric?: string;
  metricDetail?: string;
}

export const TitleDemoteToLabelPreset: React.FC<TitleDemoteProps> = ({
  transparent = true,
  hookTitle = 'TAXA DE ADMINISTRAÇÃO',
  heroMetric = '2.5% AO ANO',
  metricDetail = 'RETENÇÃO AUTOMÁTICA DIRETO DA BANCA',
}) => {
  const frame = useCurrentFrame();

  // 0-25: Entrada do Título Hook
  const titleIntro = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 35-60: Demote para Tag Superior
  const demoteP = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const titleScale = interpolate(demoteP, [0, 1], [1, 0.32]);
  const titleY = interpolate(demoteP, [0, 1], [0, -320]);
  const titleX = interpolate(demoteP, [0, 1], [0, -420]);

  // 55-85: Subida da Métrica Monumental Hero
  const metricP = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
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
        {/* Título Hook em Transição para Micro-tag */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${titleX}px, ${titleY}px) scale(${titleScale})`,
            transformOrigin: 'center center',
            opacity: titleIntro,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <h1
            style={{
              fontSize: 120,
              lineHeight: 1,
              margin: 0,
              color: demoteP > 0.5 ? OFurryTheme.colors.accentOrange : '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              transition: 'color 0.2s ease',
            }}
          >
            {hookTitle}
          </h1>
        </div>

        {/* Métrica Monumental que Emerge com Autoridade */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: metricP,
            transform: `translateY(${interpolate(metricP, [0, 1], [80, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 210,
              lineHeight: 0.85,
              color: '#000000',
              WebkitTextStroke: `5px ${OFurryTheme.colors.accentOrange}`,
              textShadow: `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`,
              letterSpacing: '-0.03em',
            }}
          >
            {heroMetric}
          </div>

          <div
            style={{
              marginTop: 30,
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 22,
              letterSpacing: '0.2em',
              color: '#AAAAAA',
              textTransform: 'uppercase',
            }}
          >
            {metricDetail}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
