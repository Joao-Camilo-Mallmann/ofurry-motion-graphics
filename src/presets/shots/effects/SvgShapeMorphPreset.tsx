import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const SVG_SHAPE_MORPH_DURATION = 150; // 5s @ 30fps

export interface SvgShapeMorphProps extends BasePresetProps {
  labelA?: string;
  labelB?: string;
}

const CX = 960;
const CY = 500;
const N = 120;
const BASE = 220;

const rA = (th: number) => BASE * (1 + 0.35 * Math.cos(th * 3));
const rB = (th: number) => BASE * (1 + 0.3 * Math.sin(th * 5 + 0.8));

const RAD_A: number[] = [];
const RAD_B: number[] = [];
for (let i = 0; i < N; i++) {
  const th = (i / N) * Math.PI * 2;
  RAD_A.push(rA(th));
  RAD_B.push(rB(th));
}

const buildPath = (m: number) => {
  let d = '';
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2;
    const r = lerp(m, RAD_A[i], RAD_B[i]);
    const x = CX + Math.cos(th) * r;
    const y = CY + Math.sin(th) * r;
    d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d + ' Z';
};

export const SvgShapeMorphPreset: React.FC<SvgShapeMorphProps> = ({
  transparent = true,
  labelA = 'RENDA FIXA SEGURA',
  labelB = 'DERIVATIVO COMPLEXO',
}) => {
  const t = useT();

  const m = seg(t, 0.2, 0.65, E.inOutCubic);
  const pathD = buildPath(m);
  const breath = 1 + 0.06 * Math.sin(m * Math.PI);
  const currentLabel = m < 0.5 ? labelA : labelB;

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
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <g transform={`translate(${CX}, ${CY}) scale(${breath}) translate(${-CX}, ${-CY})`}>
            {/* Preenchimento e Traço Neon */}
            <path
              d={pathD}
              fill={OFurryTheme.colors.accentOrangeAlpha(0.12)}
              stroke={OFurryTheme.colors.accentOrange}
              strokeWidth="5"
              style={{ filter: `drop-shadow(0 0 35px ${OFurryTheme.colors.accentOrangeAlpha(0.8)})` }}
            />
          </g>
        </svg>

        {/* Texto Central da Metamorfose */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            marginTop: 60,
          }}
        >
          <div
            style={{
              fontSize: 68,
              lineHeight: 1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            {currentLabel}
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.mono,
              fontSize: 18,
              letterSpacing: '0.2em',
              color: OFurryTheme.colors.accentOrange,
              marginTop: 16,
              textTransform: 'uppercase',
            }}
          >
            METAMORFOSE DO RISCO
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
