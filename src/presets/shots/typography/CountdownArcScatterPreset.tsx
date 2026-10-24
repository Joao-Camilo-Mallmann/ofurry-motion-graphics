import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const COUNTDOWN_ARC_SCATTER_DURATION = 90; // 3s @ 30fps

export interface CountdownArcScatterProps extends BasePresetProps {
  finalNumber?: string;
  subWords?: string[];
}

const NUMS = ['60', '48', '36', '24', '12', '5', '3', '1'];

export const CountdownArcScatterPreset: React.FC<CountdownArcScatterProps> = ({
  transparent = true,
  finalNumber = '5',
  subWords = ['ANOS', 'PRESO', 'NO COE'],
}) => {
  const t = useT();
  const rot = lerp(seg(t, 0, 0.5, E.outCubic), 80, 0);
  const hand = seg(t, 0.52, 0.72, E.inOutCubic);
  const out = seg(t, 0.5, 0.7, E.inQuad);

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          {/* Números em Arco */}
          {NUMS.map((n, i) => {
            const isTarget = n === finalNumber;
            const baseAngle = (i - 5) * 22;
            const currentAngle = baseAngle + rot;
            const rad = (currentAngle * Math.PI) / 180;
            const R0 = 380;
            const arcX = Math.sin(rad) * R0;
            const arcY = -Math.cos(rad) * R0;

            const targetX = -260;
            const targetY = 0;

            const posX = isTarget ? lerp(hand, arcX, targetX) : arcX;
            const posY = isTarget ? lerp(hand, arcY, targetY) : arcY;
            const opacity = isTarget ? 1 : Math.max(0, 1 - out);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: posX,
                  top: posY,
                  transform: 'translate(-50%, -50%)',
                  opacity,
                  fontSize: isTarget ? 180 : 70,
                  color: isTarget ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.3)',
                  textShadow: isTarget ? `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.7)}` : 'none',
                  letterSpacing: '-0.04em',
                }}
              >
                {n}
              </div>
            );
          })}

          {/* Palavras Reveladas Após o Travamento */}
          <div
            style={{
              position: 'absolute',
              left: 40,
              top: 0,
              transform: 'translateY(-50%)',
              display: 'flex',
              gap: 24,
            }}
          >
            {subWords.map((w, idx) => {
              const p = seg(t, 0.65 + idx * 0.08, 0.65 + idx * 0.08 + 0.2, E.outCubic);
              return (
                <span
                  key={idx}
                  style={{
                    fontSize: 100,
                    lineHeight: 1,
                    color: '#FFFFFF',
                    opacity: p,
                    transform: `translateY(${lerp(p, 40, 0)}px)`,
                    filter: `blur(${(1 - p) * 12}px)`,
                    display: 'inline-block',
                    textTransform: 'uppercase',
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
