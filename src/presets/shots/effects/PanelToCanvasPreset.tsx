import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const PANEL_TO_CANVAS_DURATION = 130; // 4.3s @ 30fps

export interface PanelToCanvasProps extends BasePresetProps {
  contractTitle?: string;
  trapClause?: string;
  extractedImpact?: string;
}

export const PanelToCanvasPreset: React.FC<PanelToCanvasProps> = ({
  transparent = true,
  contractTitle = 'TERMO DE ADESÃO COE #4891',
  trapClause = 'CLÁUSULA 12.4: MULTA RESCISÓRIA DE 15%',
  extractedImpact = 'DESÁGIO IMEDIATO',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flyProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const targetX = interpolate(flyProgress, [0, 1], [400, 0]);
  const targetY = interpolate(flyProgress, [0, 1], [150, 0]);
  const targetScale = interpolate(flyProgress, [0, 1], [0.6, 1.1]);

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
        {/* Painel de Contrato Esmaecido ao Fundo */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            border: '2px solid rgba(255,255,255,0.15)',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 40,
            opacity: interpolate(frame, [0, 20], [0, 0.4]),
            transform: 'translateY(40px)',
          }}
        >
          <div style={{ fontFamily: OFurryTheme.typography.families.mono, fontSize: 16, color: '#888', marginBottom: 20 }}>
            {contractTitle}
          </div>
          <div style={{ height: 16, backgroundColor: '#333', marginBottom: 12, width: '90%' }} />
          <div style={{ height: 16, backgroundColor: '#333', marginBottom: 12, width: '75%' }} />
          <div style={{ height: 16, backgroundColor: '#222', marginBottom: 12, width: '60%' }} />
        </div>

        {/* Linha Destacada que se Materializa e Salta para a Frente */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            transform: `translate(${targetX}px, ${targetY}px) scale(${targetScale})`,
            padding: '36px 60px',
            backgroundColor: '#000000',
            border: `4px solid ${OFurryTheme.colors.accentOrange}`,
            boxShadow: `0 0 60px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
            textAlign: 'center',
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 18,
              letterSpacing: '0.2em',
              color: OFurryTheme.colors.accentOrange,
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            ARMADILHA DETECTADA NO CONTRATO
          </div>
          <div style={{ fontSize: 44, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: 16 }}>
            {trapClause}
          </div>
          <div
            style={{
              fontSize: 80,
              lineHeight: 0.9,
              color: OFurryTheme.colors.accentOrange,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            {extractedImpact}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
