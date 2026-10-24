import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const BRACE_EXPAND_DURATION = 114; // 3.8s @ 30fps

export interface BraceExpandProps extends BasePresetProps {
  revealText?: string;
  tagline?: string;
}

export const BraceExpandPreset: React.FC<BraceExpandProps> = ({
  transparent = true,
  revealText = 'TAXA ZERO',
  tagline = 'A PROMESSA DO ASSESSOR',
}) => {
  const t = useT();
  const on = t >= 0.05 ? 1 : 0;
  const ex = seg(t, 0.12, 0.36, E.outBack);
  const sc = lerp(ex, 0.5, 1);
  const halfDist = 420;
  const x = halfDist * ex;

  const tagOpacity = seg(t, 0.42, 0.65, E.outCubic);

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
        <div style={{ position: 'relative', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Braçadeira Esquerda */}
          <div
            style={{
              position: 'absolute',
              left: `calc(50% - ${x}px)`,
              fontSize: 160,
              lineHeight: 1,
              color: OFurryTheme.colors.accentOrange,
              transform: `translate(-50%, -8%) scale(${sc})`,
              opacity: on,
              textShadow: `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`,
            }}
          >
            {'{'}
          </div>

          {/* Texto Revelado como Cortina */}
          <div
            style={{
              width: Math.max(0, x * 2 - 120),
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              opacity: on,
            }}
          >
            <h1
              style={{
                fontSize: 120,
                lineHeight: 1,
                margin: 0,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
              }}
            >
              {revealText}
            </h1>
          </div>

          {/* Braçadeira Direita */}
          <div
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              fontSize: 160,
              lineHeight: 1,
              color: OFurryTheme.colors.accentOrange,
              transform: `translate(-50%, -8%) scale(${sc})`,
              opacity: on,
              textShadow: `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.6)}`,
            }}
          >
            {'}'}
          </div>
        </div>

        {/* Micro-label Inferior */}
        <div
          style={{
            marginTop: 40,
            fontFamily: OFurryTheme.typography.families.mono,
            fontSize: 20,
            letterSpacing: '0.2em',
            color: '#888888',
            opacity: tagOpacity,
            transform: `translateY(${lerp(tagOpacity, 15, 0)}px)`,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>
      </div>
    </OFurryStage>
  );
};
