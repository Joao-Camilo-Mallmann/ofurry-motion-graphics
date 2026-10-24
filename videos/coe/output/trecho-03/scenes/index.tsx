import React from 'react';
import { Series } from 'remotion';
import { TrechoPackage } from '../../../../../src/videos/types';
import { perguntaOcultaScene, PerguntaOcultaScene } from './01-pergunta-oculta';
import { dinheiroPresoScene, DinheiroPresoScene } from './02-dinheiro-preso';
import { custaCaroScene, CustaCaroScene } from './03-custa-caro';
import { grandeDescontoScene, GrandeDescontoScene } from './04-grande-desconto';

export * from './01-pergunta-oculta';
export * from './02-dinheiro-preso';
export * from './03-custa-caro';
export * from './04-grande-desconto';

export const CoeTrecho03FullSequence: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={perguntaOcultaScene.durationInFrames}>
        <PerguntaOcultaScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={dinheiroPresoScene.durationInFrames}>
        <DinheiroPresoScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={custaCaroScene.durationInFrames}>
        <CustaCaroScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={grandeDescontoScene.durationInFrames}>
        <GrandeDescontoScene transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};

export const trecho03Package: TrechoPackage = {
  id: 'trecho-03',
  title: 'Trecho 03: Liquidez e Resgate Antecipado (20s)',
  scenes: [
    perguntaOcultaScene,  // 01: 140 frames (4.66s)
    dinheiroPresoScene,   // 02: 160 frames (5.33s)
    custaCaroScene,       // 03: 140 frames (4.66s)
    grandeDescontoScene,  // 04: 160 frames (5.33s)
  ],
  fullSequenceComponent: CoeTrecho03FullSequence,
};
