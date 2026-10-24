import React from 'react';
import { OFurryTheme } from '../../../theme/ofurry';
import { E, lerp, seg, useT, OFurryStage } from '../../motionUtils';
import { BasePresetProps } from '../../types';

export const BASIC_3D_SCENE_DURATION = 180; // 6s @ 30fps

const POSES = [
  { x: 0,   y: 0,   z: 0,    rx: 0, ry: 0,   rz: 0,  s: 1,   label: 'CONTRATO', sub: 'Premissa Inicial' },
  { x: 520, y: -60, z: -180, rx: 0, ry: -40, rz: 0,  s: 1,   label: 'TAXA REAL', sub: 'Deságio Oculto' },
  { x: 160, y: 300, z: -520, rx: 0, ry: 0,   rz: 90, s: 1,   label: 'BLOQUEIO', sub: 'Carência 5 Anos' },
  { x: 220, y: 90,  z: -260, rx: 0, ry: 0,   rz: 0,  s: 3.1, label: 'ARMADILHA', sub: 'Custo Total Revelado' },
];

const FLY_AT = [0.22, 0.48, 0.76];
const FLY = 0.16;

export const Basic3DScenePreset: React.FC<BasePresetProps> = ({ transparent = true }) => {
  const t = useT();

  let af = 0;
  const cam = { ...POSES[0] };
  for (let i = 0; i < FLY_AT.length; i++) {
    const f = seg(t, FLY_AT[i], FLY_AT[i] + FLY, E.inOutCubic);
    af += f;
    const p = POSES[i + 1];
    cam.x = lerp(f, cam.x, p.x);
    cam.y = lerp(f, cam.y, p.y);
    cam.z = lerp(f, cam.z, p.z);
    cam.rx = lerp(f, cam.rx, p.rx);
    cam.ry = lerp(f, cam.ry, p.ry);
    cam.rz = lerp(f, cam.rz, p.rz);
    cam.s = lerp(f, cam.s, p.s);
  }

  const over = seg(t, FLY_AT[2], FLY_AT[2] + FLY);

  return (
    <OFurryStage transparent={transparent}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1000px',
          fontFamily: OFurryTheme.typography.families.hero,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `scale(${1 / cam.s}) rotateZ(${-cam.rz}deg) rotateY(${-cam.ry}deg) rotateX(${-cam.rx}deg) translate3d(${-cam.x}px, ${-cam.y}px, ${-cam.z}px)`,
          }}
        >
          {POSES.map((p, i) => {
            const dist = Math.abs(af - i);
            const active = over > 0.5 ? 1 : Math.max(0, 1 - dist);
            const op = lerp(active, 0.2, 1);
            const isTarget = Math.round(af) === i || over > 0.5;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 380,
                  height: 220,
                  left: -190,
                  top: -110,
                  transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg)`,
                  transformStyle: 'preserve-3d',
                  opacity: op,
                  border: `2px solid ${isTarget ? OFurryTheme.colors.accentOrange : 'rgba(255,255,255,0.2)'}`,
                  background: isTarget ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.4)',
                  padding: 24,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isTarget ? `0 0 40px ${OFurryTheme.colors.accentOrangeAlpha(0.4)}` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: OFurryTheme.typography.families.mono,
                      fontSize: 14,
                      color: OFurryTheme.colors.accentOrange,
                      letterSpacing: '0.1em',
                    }}
                  >
                    STEP 0{i + 1}
                  </span>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: isTarget ? OFurryTheme.colors.accentOrange : '#555',
                    }}
                  />
                </div>

                <div>
                  <h2
                    style={{
                      fontFamily: OFurryTheme.typography.families.hero,
                      fontSize: 38,
                      color: '#FFFFFF',
                      margin: '0 0 6px 0',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.label}
                  </h2>
                  <p
                    style={{
                      fontFamily: OFurryTheme.typography.families.body,
                      fontSize: 16,
                      color: '#AAAAAA',
                      margin: 0,
                    }}
                  >
                    {p.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </OFurryStage>
  );
};
