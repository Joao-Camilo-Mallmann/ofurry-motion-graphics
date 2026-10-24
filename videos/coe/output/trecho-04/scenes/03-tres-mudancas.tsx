import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 03: A Ficha Técnica da Simplicidade (SIMPLES)
 * Duração: 330 frames (11.0s @ 30fps)
 * Arquétipo A puro: Ficha Técnica Neon (Fiel a docs/RefFurry/ref1.png)
 * Ícone outline em verde neon elétrico (#00FF00), título 'SIMPLES' e
 * 3 specs com sinal '=', entrando em cadência com a locução.
 * Zero cards, zero caixas cinzas.
 */
export const TresMudancasScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-ambient drift
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.2,
    amplitudeX: 0.5,
    amplitudeRotate: 0,
    periodFrames: 90,
  });

  // Entrance spring para Ícone & Título (frames 0-24)
  const headerSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const headerScale = interpolate(headerSpring, [0, 1], [0.75, 1]);
  const headerOpacity = interpolate(headerSpring, [0, 0.3, 1], [0, 1, 1]);

  // Spec Line 1: Risco = Transparente (entra aos 2.0s / 60 frames)
  const spec1Spring = getSpringProgress(frame, fps, 60, MotionPresets.snappy);
  const spec1X = interpolate(spec1Spring, [0, 1], [-40, 0]);
  const spec1Opacity = interpolate(spec1Spring, [0, 0.4, 1], [0, 1, 1]);

  // Spec Line 2: Custo = Zero Oculto (entra aos 5.0s / 150 frames)
  const spec2Spring = getSpringProgress(frame, fps, 150, MotionPresets.snappy);
  const spec2X = interpolate(spec2Spring, [0, 1], [-40, 0]);
  const spec2Opacity = interpolate(spec2Spring, [0, 0.4, 1], [0, 1, 1]);

  // Spec Line 3: Carteira = Real (entra aos 8.0s / 240 frames)
  const spec3Spring = getSpringProgress(frame, fps, 240, MotionPresets.snappy);
  const spec3X = interpolate(spec3Spring, [0, 1], [-40, 0]);
  const spec3Opacity = interpolate(spec3Spring, [0, 0.4, 1], [0, 1, 1]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: OFurryTheme.typography.families.hero,
        color: OFurryTheme.colors.primary,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* HEADER SECTION (ref1.png: GREEN NEON OUTLINE + TITLE) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${headerScale})`,
            opacity: headerOpacity,
            marginBottom: 24,
          }}
        >
          <AssetIcon
            name="certificate"
            variant="green"
            size={180}
            glow={true}
            glowColor="#00FF00"
            showRing={true}
            delay={0}
          />

          <h1
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: 85,
              lineHeight: 1,
              margin: '10px 0 0 0',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#00FF00',
              textShadow: '0 0 25px rgba(0, 255, 0, 0.7)',
            }}
          >
            SIMPLES
          </h1>
        </div>

        {/* SPECS LIST (ref1.png: PURE WHITE SOLID TEXT WITH '=' SEPARATOR) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            width: '100%',
          }}
        >
          {/* SPEC 1 */}
          <div
            style={{
              transform: `translate3d(${spec1X}px, 0, 0)`,
              opacity: spec1Opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 52,
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textShadow: '0 4px 18px rgba(0,0,0,0.8)',
              }}
            >
              Risco <span style={{ color: '#00FF00', margin: '0 12px' }}>=</span> Transparente
            </span>
          </div>

          {/* SPEC 2 */}
          <div
            style={{
              transform: `translate3d(${spec2X}px, 0, 0)`,
              opacity: spec2Opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 52,
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textShadow: '0 4px 18px rgba(0,0,0,0.8)',
              }}
            >
              Custo <span style={{ color: '#00FF00', margin: '0 12px' }}>=</span> Zero Oculto
            </span>
          </div>

          {/* SPEC 3 */}
          <div
            style={{
              transform: `translate3d(${spec3X}px, 0, 0)`,
              opacity: spec3Opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: 52,
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textShadow: '0 4px 18px rgba(0,0,0,0.8)',
              }}
            >
              Carteira <span style={{ color: '#00FF00', margin: '0 12px' }}>=</span> Real
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const tresMudancasScene = {
  id: '03-tres-mudancas',
  name: 'A Ficha Técnica (SIMPLES)',
  durationInFrames: 330, // 11.0s
  component: TresMudancasScene,
};
