import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { OFurryTheme } from '../../../../../src/theme/ofurry';
import { MotionPresets, getSpringProgress, getAmbientDrift } from '../../../../../src/theme/motion';
import { AssetIcon } from '../../../../../src/primitives';

/**
 * Cena 02: A Ficha Técnica do Vencimento
 * Arquétipo: Ficha Técnica Neon / Blueprint (Inspirado diretamente em docs/RefFurry/ref1.png)
 * Ícone em contorno verde neon, título verde e specs em formato chave = valor.
 */
export const DinheiroPresoScene: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient micro-drift
  const ambient = getAmbientDrift(frame, {
    amplitudeY: 1.2,
    amplitudeX: 0.5,
    amplitudeRotate: 0,
    periodFrames: 80,
  });

  // Entrance spring for Certificate Icon (frames 0-25)
  const iconSpring = getSpringProgress(frame, fps, 0, MotionPresets.bouncy);
  const iconScale = interpolate(iconSpring, [0, 1], [0.4, 1]);
  const iconOpacity = interpolate(iconSpring, [0, 0.4, 1], [0, 1, 1]);

  // Entrance spring for "COE" Title (frames 8-28)
  const titleSpring = getSpringProgress(frame, fps, 8, MotionPresets.snappy);
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 0.5, 1], [0, 1, 1]);

  // Staggered reveals for specs (frames 18-50)
  const spec1Spring = getSpringProgress(frame, fps, 18, MotionPresets.snappy);
  const spec2Spring = getSpringProgress(frame, fps, 26, MotionPresets.snappy);
  const spec3Spring = getSpringProgress(frame, fps, 34, MotionPresets.snappy);

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
          gap: 20,
        }}
      >
        {/* ICON WIREFRAME IN ELECTRIC NEON GREEN (ref1.png) */}
        <div
          style={{
            transform: `scale(${iconScale})`,
            opacity: iconOpacity,
            filter: 'drop-shadow(0 0 25px rgba(0, 255, 0, 0.7))',
          }}
        >
          <AssetIcon
            name="certificate"
            variant="green"
            size={180}
            glow={true}
            showRing={true}
            glowColor="#00FF00"
            delay={2}
          />
        </div>

        {/* ASSET TITLE IN VIVID GREEN (#00FF00) */}
        <div
          style={{
            transform: `translate3d(0, ${titleY}px, 0)`,
            opacity: titleOpacity,
          }}
        >
          <h2
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: 82,
              lineHeight: 1,
              margin: 0,
              letterSpacing: '0.04em',
              color: '#00FF00',
              textShadow: '0 0 30px rgba(0, 255, 0, 0.75)',
            }}
          >
            COE
          </h2>
        </div>

        {/* CLEAN KEY-VALUE SPECS WITH EQUAL SIGNS (ref1.png blueprint) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
            marginTop: 8,
          }}
        >
          {/* Line 1 */}
          <div
            style={{
              transform: `translate3d(0, ${interpolate(spec1Spring, [0, 1], [25, 0])}px, 0)`,
              opacity: interpolate(spec1Spring, [0, 0.4, 1], [0, 0.9, 1]),
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
            >
              Taxa = Retorno Limitado
            </span>
          </div>

          {/* Line 2 */}
          <div
            style={{
              transform: `translate3d(0, ${interpolate(spec2Spring, [0, 1], [25, 0])}px, 0)`,
              opacity: interpolate(spec2Spring, [0, 0.4, 1], [0, 0.9, 1]),
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
            >
              Prazo = 3 a 5 anos
            </span>
          </div>

          {/* Line 3 (Hazard callout) */}
          <div
            style={{
              transform: `translate3d(0, ${interpolate(spec3Spring, [0, 1], [25, 0])}px, 0)`,
              opacity: interpolate(spec3Spring, [0, 0.4, 1], [0, 0.9, 1]),
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
            >
              Condições ={' '}
              <span
                style={{
                  color: OFurryTheme.colors.accentOrange,
                  textShadow: `0 0 20px ${OFurryTheme.colors.accentOrange}`,
                }}
              >
                Zero Liquidez
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dinheiroPresoScene = {
  id: '02-dinheiro-preso',
  name: 'Dinheiro Preso (Blueprint ref1.png)',
  durationInFrames: 160, // 5.33s
  component: DinheiroPresoScene,
};
