import React from 'react';
import { Series } from 'remotion';
import { TrechoPackage } from '../../../../../src/videos/types';
import { parcelaMinimaScene, ParcelaMinimaScene } from './01-parcela-minima';
import { perfilTrocadoScene, PerfilTrocadoScene } from './02-perfil-trocado';
import { tresMudancasScene, TresMudancasScene } from './03-tres-mudancas';
import { naoEOCOEScene, NaoEOCOEScene } from './04-nao-e-o-coe';
import { construirABaseScene, ConstruirABaseScene } from './05-construir-a-base';

export * from './01-parcela-minima';
export * from './02-perfil-trocado';
export * from './03-tres-mudancas';
export * from './04-nao-e-o-coe';
export * from './05-construir-a-base';

export const CoeTrecho04FullSequence: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={parcelaMinimaScene.durationInFrames}>
        <ParcelaMinimaScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={perfilTrocadoScene.durationInFrames}>
        <PerfilTrocadoScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={tresMudancasScene.durationInFrames}>
        <TresMudancasScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={naoEOCOEScene.durationInFrames}>
        <NaoEOCOEScene transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={construirABaseScene.durationInFrames}>
        <ConstruirABaseScene transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};

export const trecho04Package: TrechoPackage = {
  id: 'trecho-04',
  title: 'Trecho 04: A Solução Real & A Grande Lição (40s)',
  scenes: [
    parcelaMinimaScene,   // 01: 300 frames (10.0s)
    perfilTrocadoScene,   // 02: 180 frames (6.0s)
    tresMudancasScene,    // 03: 330 frames (11.0s)
    naoEOCOEScene,        // 04: 150 frames (5.0s)
    construirABaseScene,  // 05: 240 frames (8.0s)
  ],
  fullSequenceComponent: CoeTrecho04FullSequence,
};
