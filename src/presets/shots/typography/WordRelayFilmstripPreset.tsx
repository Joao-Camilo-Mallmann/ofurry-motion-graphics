import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const WORD_RELAY_FILMSTRIP_DURATION = 150; // 5s @ 30fps

export interface WordRelayFilmstripProps extends BasePresetProps {
  leadWord?: string;
  relayWords?: string[];
}

const DEFAULT_WORDS = ['PROMETE', 'TRAVA', 'PRENDE', 'CORRÓI'];

export const WordRelayFilmstripPreset: React.FC<WordRelayFilmstripProps> = ({
  transparent = true,
  leadWord = 'O CONTRATO',
  relayWords = DEFAULT_WORDS,
}) => {
  const frame = useCurrentFrame();

  const N = relayWords.length;
  const stepFrames = 35;
  const currentStep = Math.min(N - 1, Math.floor(frame / stepFrames));
  const stepProgress = interpolate(
    frame % stepFrames,
    [22, stepFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const scrollY = (currentStep + (currentStep < N - 1 ? stepProgress : 0)) * 240;

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 120px',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        {/* Lado Esquerdo: Lead Word Estático Monumental */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 22,
              letterSpacing: '0.2em',
              color: OFurryTheme.colors.accentOrange,
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            MECÂNICA OPERACIONAL
          </div>
          <h1
            style={{
              fontSize: 140,
              lineHeight: 0.9,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            {leadWord}
          </h1>
        </div>

        {/* Linha Divisória 1px Vertical */}
        <div
          style={{
            width: 2,
            height: '60%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            margin: '0 80px',
          }}
        />

        {/* Lado Direito: Carretel Vertical de Verbos de Impacto */}
        <div
          style={{
            flex: 1,
            height: 240,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${-scrollY}px)`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {relayWords.map((word, idx) => {
              const isActive = idx === currentStep;
              return (
                <div
                  key={idx}
                  style={{
                    height: 240,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 140,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    color: isActive ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.25)',
                    textShadow: isActive
                      ? `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`
                      : 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
