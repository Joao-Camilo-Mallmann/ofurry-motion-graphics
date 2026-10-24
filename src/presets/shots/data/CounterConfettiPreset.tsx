import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, rand, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const COUNTER_CONFETTI_DURATION = 120; // 4s @ 30fps

export interface CounterConfettiProps extends BasePresetProps {
  finalValue?: number;
  prefix?: string;
  suffix?: string;
  tagline?: string;
}

const SPARKS = Array.from({ length: 48 }, (_, i) => {
  const angle = rand(i * 17) * Math.PI * 2;
  const speed = 250 + rand(i * 23) * 450;
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 4 + rand(i * 11) * 8,
    color: i % 3 === 0 ? '#FFFFFF' : OFurryTheme.colors.accentOrange,
    gravity: 300 + rand(i * 7) * 200,
    delay: rand(i * 13) * 0.05,
  };
});

export const CounterConfettiPreset: React.FC<CounterConfettiProps> = ({
  transparent = true,
  finalValue = 100,
  prefix = 'R$ ',
  suffix = ' MIL',
  tagline = 'CAPITAL MÍNIMO EXIGIDO',
}) => {
  const t = useT();
  const p = seg(t, 0.05, 0.55, E.outQuart);
  const currentVal = Math.round(p * finalValue);

  // Anel de impacto no lock-in
  const shockP = seg(t, 0.53, 0.8, E.outExpo);

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
            fontSize: 22,
            letterSpacing: '0.2em',
            color: OFurryTheme.colors.accentOrange,
            marginBottom: 20,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>

        {/* Shockwave Ring */}
        {shockP > 0 && shockP < 1 && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              borderRadius: '50%',
              border: `4px solid ${OFurryTheme.colors.accentOrange}`,
              transform: `scale(${shockP * 7})`,
              opacity: 1 - shockP,
              pointerEvents: 'none',
              boxShadow: `0 0 40px ${OFurryTheme.colors.accentOrange}`,
            }}
          />
        )}

        {/* Faíscas Neon */}
        {t >= 0.53 && (
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
            {SPARKS.map((sp, idx) => {
              const dt = Math.max(0, (t - 0.53 - sp.delay) / 0.4);
              if (dt <= 0 || dt >= 1) return null;
              const x = sp.vx * dt;
              const y = sp.vy * dt + 0.5 * sp.gravity * dt * dt;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: sp.size,
                    height: sp.size,
                    backgroundColor: sp.color,
                    borderRadius: 2,
                    boxShadow: `0 0 15px ${sp.color}`,
                    opacity: 1 - dt,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Métrica Hero Colossal */}
        <div
          style={{
            fontSize: 230,
            lineHeight: 0.85,
            color: '#000000',
            WebkitTextStroke: `6px ${OFurryTheme.colors.accentOrange}`,
            textShadow: `0 0 60px ${OFurryTheme.colors.accentOrangeAlpha(0.8)}`,
            letterSpacing: '-0.04em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {prefix}
          {currentVal}
          {suffix}
        </div>
      </div>
    </OFurryStage>
  );
};
