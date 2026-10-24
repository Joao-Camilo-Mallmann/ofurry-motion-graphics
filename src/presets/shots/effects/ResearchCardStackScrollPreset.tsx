import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const RESEARCH_CARD_STACK_SCROLL_DURATION = 144; // 4.8s @ 30fps

export interface ResearchStackProps extends BasePresetProps {
  documents?: string[];
  tagline?: string;
}

const DEFAULT_DOCS = [
  'DOCUMENTO 01: REGULAMENTO GERAL DO COE',
  'DOCUMENTO 02: CLÁUSULA DE RESGATE FORÇADO',
  'DOCUMENTO 03: SIMULAÇÃO DE CENÁRIO PESSIMISTA',
  'DOCUMENTO 04: HISTÓRICO REAL DE RETORNO (IPCA)',
  'DOCUMENTO 05: LAUDO DE RETENÇÃO DO BANCO',
];

export const ResearchCardStackScrollPreset: React.FC<ResearchStackProps> = ({
  transparent = true,
  documents = DEFAULT_DOCS,
  tagline = 'PROVAS DOCUMENTAIS FORENSES',
}) => {
  const t = useT();
  const N = documents.length;
  const currentActive = Math.min(N - 1, Math.floor(t * N));

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
            marginBottom: 36,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>

        <div style={{ position: 'relative', width: 900, height: 420 }}>
          {documents.map((doc, idx) => {
            const appearT = seg(t, idx * 0.16, idx * 0.16 + 0.15, E.outCubic);
            if (appearT <= 0) return null;

            const isTop = idx === currentActive;
            const depth = Math.max(0, currentActive - idx);
            const scale = lerp(depth, 1, 0.88);
            const yOffset = depth * 35;
            const opacity = lerp(depth, 1, 0.4);
            const blur = depth * 4;

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  backgroundColor: isTop ? '#000000' : 'rgba(20,20,20,0.85)',
                  border: `3px solid ${isTop ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.2)'}`,
                  boxShadow: isTop
                    ? `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}`
                    : '0 10px 30px rgba(0,0,0,0.8)',
                  padding: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  zIndex: 20 - depth,
                  transition: 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: OFurryTheme.typography.families.mono,
                      fontSize: 16,
                      color: isTop ? OFurryTheme.colors.accentOrange : '#888',
                    }}
                  >
                    PROVA AUDITADA #{idx + 1}
                  </span>
                  {isTop && (
                    <span
                      style={{
                        padding: '4px 12px',
                        backgroundColor: OFurryTheme.colors.accentOrange,
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      CONFIRMADO
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 40,
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {doc}
                </div>

                <div
                  style={{
                    height: 4,
                    width: '100%',
                    backgroundColor: isTop ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.1)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
