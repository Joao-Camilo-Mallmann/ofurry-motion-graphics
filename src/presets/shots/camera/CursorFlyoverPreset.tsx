import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const CURSOR_FLYOVER_DURATION = 180; // 6s @ 30fps

type Vec = Record<string, number>;
const acc = (t: number, base: Vec, kfs: { at: number[]; to: Vec }[], keys: string[], ease: (x: number) => number) => {
  const out: Vec = {};
  for (const k of keys) out[k] = base[k];
  let prev = base;
  for (const kf of kfs) {
    const u = seg(t, kf.at[0], kf.at[1], ease);
    for (const k of keys) out[k] += u * (kf.to[k] - prev[k]);
    prev = kf.to;
  }
  return out;
};

const CAM = [
  { tx: 50, ty: 50, s: 0.85, cx: 50, cy: 52 },
  { tx: 35, ty: 35, s: 1.55, cx: 38, cy: 38 },
  { tx: 75, ty: 35, s: 1.55, cx: 78, cy: 36 },
  { tx: 75, ty: 75, s: 1.55, cx: 72, cy: 76 },
  { tx: 35, ty: 75, s: 1.55, cx: 32, cy: 78 },
];
const WIN = [[0.18, 0.32], [0.38, 0.52], [0.58, 0.72], [0.78, 0.92]];
const KEY = ['tx', 'ty', 's', 'cx', 'cy'];

export const CursorFlyoverPreset: React.FC<BasePresetProps> = ({ transparent = true }) => {
  const t = useT();

  const kfs = [
    { at: WIN[0], to: CAM[1] },
    { at: WIN[1], to: CAM[2] },
    { at: WIN[2], to: CAM[3] },
    { at: WIN[3], to: CAM[4] },
  ];
  const cur = acc(t, CAM[0], kfs, KEY, E.inOutCubic);

  const clicks = [
    seg(t, WIN[0][1] - 0.04, WIN[0][1] + 0.08, E.outCubic),
    seg(t, WIN[1][1] - 0.04, WIN[1][1] + 0.08, E.outCubic),
    seg(t, WIN[2][1] - 0.04, WIN[2][1] + 0.08, E.outCubic),
    seg(t, WIN[3][1] - 0.04, WIN[3][1] + 0.08, E.outCubic),
  ];

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1200px',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            transform: `scale(${cur.s}) translate(${(50 - cur.tx) * 1.5}%, ${(50 - cur.ty) * 1.5}%)`,
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            transition: 'none',
          }}
        >
          {/* 4 Pontos de Auditoria Editorial */}
          <div
            style={{
              position: 'absolute',
              left: '15%',
              top: '18%',
              width: '32%',
              height: '32%',
              border: `2px solid ${OFurryTheme.colors.accentOrange}`,
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: 30,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 16, color: OFurryTheme.colors.accentOrange }}>CLÁUSULA 01</span>
            <div style={{ fontSize: 32, color: '#FFFFFF' }}>TAXA DE ENTRADA = 0%</div>
            <div style={{ fontSize: 18, color: '#888' }}>Promessa Comercial</div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '15%',
              top: '18%',
              width: '32%',
              height: '32%',
              border: '2px solid rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: 30,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 16, color: '#FF3333' }}>CLÁUSULA 02 (ARMADILHA)</span>
            <div style={{ fontSize: 32, color: '#FFFFFF' }}>SPREAD OCULTO = 3.5%</div>
            <div style={{ fontSize: 18, color: '#888' }}>Retido na Fonte</div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '15%',
              bottom: '18%',
              width: '32%',
              height: '32%',
              border: '2px solid rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: 30,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 16, color: OFurryTheme.colors.accentOrange }}>CLÁUSULA 03</span>
            <div style={{ fontSize: 32, color: '#FFFFFF' }}>TETO GANHO = 12%</div>
            <div style={{ fontSize: 18, color: '#888' }}>Cap Máximo Artificial</div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '15%',
              bottom: '18%',
              width: '32%',
              height: '32%',
              border: '2px solid rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: 30,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 16, color: OFurryTheme.colors.accentOrange }}>CLÁUSULA 04</span>
            <div style={{ fontSize: 32, color: '#FFFFFF' }}>CARÊNCIA = 5 ANOS</div>
            <div style={{ fontSize: 18, color: '#888' }}>Zero Liquidez</div>
          </div>

          {/* Cursor Neon Perseguidor */}
          <div
            style={{
              position: 'absolute',
              left: `${cur.cx}%`,
              top: `${cur.cy}%`,
              transform: 'translate(-5px, -5px)',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3l7 18 3-7 7-3L3 3z"
                fill={OFurryTheme.colors.accentOrange}
                stroke="#000000"
                strokeWidth="2"
              />
            </svg>
            {clicks.map((clk, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 4,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  border: `2px solid ${OFurryTheme.colors.accentOrange}`,
                  transform: `scale(${clk * 3})`,
                  opacity: Math.max(0, 1 - clk),
                  pointerEvents: 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </OFurryStage>
  );
};
