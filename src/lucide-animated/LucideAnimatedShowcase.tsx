import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AnimatedLucide } from './AnimatedLucide';
import { LucideAnimatedName } from './icons';

const FINANCE_SET: LucideAnimatedName[] = [
  'trending-up',
  'trending-down',
  'chart-line',
  'circle-dollar-sign',
  'hand-coins',
  'wallet',
  'lock',
  'hourglass',
  'flame',
  'rocket',
  'chart-column-increasing',
  'badge-percent',
];

/** Grade de teste: cada icone dispara 6 frames depois do anterior e repete a cada 60 frames. */
export const LucideAnimatedShowcase: React.FC<{ transparent?: boolean }> = ({ transparent = false }) => (
  <AbsoluteFill
    style={{
      backgroundColor: transparent ? 'transparent' : '#000000',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      alignItems: 'center',
      justifyItems: 'center',
      padding: 80,
    }}
  >
    {FINANCE_SET.map((name, i) => (
      <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <AnimatedLucide
          name={name}
          size={180}
          color={i % 3 === 0 ? '#FF9900' : '#FFFFFF'}
          startFrame={10 + i * 6}
          loopEvery={60}
          glow={i % 3 === 0}
        />
        <span style={{ color: '#777', fontFamily: 'monospace', fontSize: 18 }}>{name}</span>
      </div>
    ))}
  </AbsoluteFill>
);
