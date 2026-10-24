import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { OFurryTheme } from '../../../theme/ofurry';
import { OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const BOTTOM_PUSH_STACK_WIPE_DURATION = 90; // 3s @ 30fps

export interface BottomPushWipeProps extends BasePresetProps {
  sceneAText?: string;
  sceneBText?: string;
}

export const BottomPushStackWipePreset: React.FC<BottomPushWipeProps> = ({
  transparent = true,
  sceneAText = 'A PROMESSA',
  sceneBText = 'A COBRANÇA',
}) => {
  const frame = useCurrentFrame();

  const PUSH_START = 30;
  const PUSH_DUR = 25;

  const pushP = interpolate(frame, [PUSH_START, PUSH_START + PUSH_DUR], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.12, 0.9, 0.2, 1),
  });

  const H = 1080;
  const sceneAY = -pushP * H;
  const sceneBY = (1 - pushP) * H;

  return (
    <OFurryStage transparent={transparent}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Cena A: Sendo Empurrada para Cima */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateY(${sceneAY}px)`,
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
              letterSpacing: '0.2em',
              color: '#888888',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            FASE 01
          </div>
          <h1
            style={{
              fontSize: 160,
              lineHeight: 0.9,
              margin: 0,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            {sceneAText}
          </h1>
        </div>

        {/* Linha Divisória de Contato Físico */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: sceneBY,
            height: 6,
            backgroundColor: OFurryTheme.colors.accentOrange,
            boxShadow: `0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
            zIndex: 20,
          }}
        />

        {/* Cena B: Empurrando de Baixo para Cima */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateY(${sceneBY}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: OFurryTheme.typography.families.hero,
            backgroundColor: transparent ? 'rgba(0,0,0,0.95)' : '#000000',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 20,
              letterSpacing: '0.2em',
              color: OFurryTheme.colors.accentOrange,
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            FASE 02
          </div>
          <h1
            style={{
              fontSize: 160,
              lineHeight: 0.9,
              margin: 0,
              color: OFurryTheme.colors.accentOrange,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              textShadow: `0 0 50px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
            }}
          >
            {sceneBText}
          </h1>
        </div>
      </div>
    </OFurryStage>
  );
};
