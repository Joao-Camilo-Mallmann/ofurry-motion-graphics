import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { BespokeScene } from '../../../../../src/videos/types';

export const ComissaoDiscrepanciaComponent: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift anti-freeze
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 0.8,
    amplitudeX: 0.5,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance 1: CDB / Tesouro (lado esquerdo sutil) - frames 0-25
  const leftSpring = getSpringProgress(frame, fps, 0, MotionPresets.smooth);
  const leftX = interpolate(leftSpring, [0, 1], [-80, 0]);
  const leftOpacity = interpolate(leftSpring, [0, 0.5, 1], [0, 0.4, 0.45]);

  // Entrance 2: Explosive COE Hero (lado direito monumental) - frames 15-45
  const coeSpring = getSpringProgress(frame, fps, 15, {
    damping: 14,
    mass: 0.7,
    stiffness: 240,
    overshootClamping: false,
  });
  const coeScale = interpolate(coeSpring, [0, 1], [0.6, 1]);
  const coeX = interpolate(coeSpring, [0, 1], [150, 0]);
  const coeOpacity = interpolate(coeSpring, [0, 0.3, 1], [0, 1, 1]);

  // Whip-tilt 2.5D
  const tiltY = interpolate(coeSpring, [0, 1], [12, -4]);

  // Counter animation from 1X to 5X
  const counterValue = interpolate(frame, [25, 65], [1, 5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const formattedMultiplier = `${counterValue.toFixed(0)}X+`;

  // Continuous micro-pulse
  const heroPulse = 1 + Math.sin((frame / 22) * Math.PI) * 0.012;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: OFurryTheme.typography.families.body,
        color: OFurryTheme.colors.primary,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0) perspective(1000px) rotateY(${tiltY}deg)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: OFurryTheme.layout.safeArea.top,
            bottom: OFurryTheme.layout.safeArea.bottom,
            left: OFurryTheme.layout.safeArea.left,
            right: OFurryTheme.layout.safeArea.right,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* LADO ESQUERDO: CDB / TESOURO DIRETO (OPACIDADE BAIXA, SECUNDÁRIO) */}
          <div
            style={{
              width: '32%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              opacity: leftOpacity,
              transform: `translateX(${leftX}px)`,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 18,
                letterSpacing: '3px',
                color: OFurryTheme.colors.secondary,
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              INVESTIMENTOS SIMPLES
            </span>
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.condensed,
                fontSize: 70,
                lineHeight: 0.95,
                color: OFurryTheme.colors.primary,
                textTransform: 'uppercase',
              }}
            >
              CDB / TESOURO
            </span>
            <div
              style={{
                marginTop: 20,
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 56,
                fontWeight: 700,
                color: OFurryTheme.colors.secondary,
              }}
            >
              ~0.2%
            </div>
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 14,
                letterSpacing: '2px',
                color: OFurryTheme.colors.muted,
                marginTop: 6,
                textTransform: 'uppercase',
              }}
            >
              COMISSÃO MÉDIA DA MESA
            </span>
          </div>

          {/* DIVISOR VERTICAL DINÂMICO DE 1PX */}
          <div
            style={{
              width: 1,
              height: 420,
              backgroundColor: OFurryTheme.colors.borderLight,
              opacity: 0.6,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: `${((frame * 2) % 420)}px`,
                width: 3,
                left: -1,
                height: 40,
                backgroundColor: OFurryTheme.colors.highlightSolid,
              }}
            />
          </div>

          {/* LADO DIREITO: COE MONUMENTAL (PROTAGONISTA DA CENA, 60% DA ÁREA) */}
          <div
            style={{
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingLeft: 40,
              opacity: coeOpacity,
              transform: `translateX(${coeX}px) scale(${coeScale * heroPulse})`,
            }}
          >
            {/* MICRO-TAG COE */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: OFurryTheme.colors.highlightSolid,
                }}
              />
              <span
                style={{
                  fontFamily: OFurryTheme.typography.families.tech,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '4px',
                  color: OFurryTheme.colors.highlightSolid,
                  textTransform: 'uppercase',
                }}
              >
                PRODUTO ESTRUTURADO // COE
              </span>
            </div>

            {/* NÚMERO MONUMENTAL: 5X+ (SPACE GROTESK 230PX) */}
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 230,
                lineHeight: 0.85,
                fontWeight: 900,
                letterSpacing: '-6px',
                color: OFurryTheme.colors.highlightSolid,
                textShadow: '0 0 60px rgba(255, 153, 0, 0.4)',
              }}
            >
              {formattedMultiplier}
            </div>

            {/* SUB-HERO BEBAS NEUE */}
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.condensed,
                fontSize: 64,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: OFurryTheme.colors.primary,
                marginTop: 10,
              }}
            >
              MAIS COMISSÃO
            </div>

            {/* FAIXA NEON DE ALERTA BRUTALISTA */}
            <div
              style={{
                marginTop: 20,
                backgroundColor: OFurryTheme.colors.highlightSolid,
                color: OFurryTheme.colors.highlightText,
                padding: '8px 24px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 20,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 900,
              }}
            >
              ATÉ 3% A 5% RETIDOS NA SAÍDA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const comissaoDiscrepanciaScene: BespokeScene = {
  id: 'comissao-discrepancia',
  name: 'A Discrepância de Comissão (CDB vs COE)',
  durationInFrames: 150, // 5.0 segundos a 30fps
  component: ComissaoDiscrepanciaComponent,
};
