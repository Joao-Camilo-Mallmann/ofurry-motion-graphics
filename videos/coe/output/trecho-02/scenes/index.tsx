import React from 'react';
import { Series } from 'remotion';
import { TrechoPackage } from '../../../../../src/videos/types';
import { ilusaoSofisticadoScene, IlusaoSofisticadoComponent } from './01-ilusao-sofisticado';
import { gerarReceitaScene, GerarReceitaComponent } from './02-gerar-receita';
import { comissaoDiscrepanciaScene, ComissaoDiscrepanciaComponent } from './03-comissao-discrepancia';
import { incentivoClaroScene, IncentivoClaroComponent } from './04-incentivo-claro';
import { outroLadoMesaScene, OutroLadoMesaComponent } from './05-outro-lado-mesa';
import { maisReceitaInstituicaoScene, MaisReceitaInstituicaoComponent } from './06-mais-receita-instituicao';

export * from './01-ilusao-sofisticado';
export * from './02-gerar-receita';
export * from './03-comissao-discrepancia';
export * from './04-incentivo-claro';
export * from './05-outro-lado-mesa';
export * from './06-mais-receita-instituicao';

export const CoeTrecho02FullSequence: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={ilusaoSofisticadoScene.durationInFrames}>
        <IlusaoSofisticadoComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={gerarReceitaScene.durationInFrames}>
        <GerarReceitaComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={comissaoDiscrepanciaScene.durationInFrames}>
        <ComissaoDiscrepanciaComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={incentivoClaroScene.durationInFrames}>
        <IncentivoClaroComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={outroLadoMesaScene.durationInFrames}>
        <OutroLadoMesaComponent transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={maisReceitaInstituicaoScene.durationInFrames}>
        <MaisReceitaInstituicaoComponent transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};

export const trecho02Package: TrechoPackage = {
  id: 'trecho-02',
  title: 'Bloco 4: O Conflito de Interesses & Comissão',
  scenes: [
    ilusaoSofisticadoScene,      // 01: 120 frames (4.0s)
    gerarReceitaScene,           // 02: 105 frames (3.5s)
    comissaoDiscrepanciaScene,   // 03: 150 frames (5.0s)
    incentivoClaroScene,         // 04: 105 frames (3.5s)
    outroLadoMesaScene,          // 05: 135 frames (4.5s)
    maisReceitaInstituicaoScene, // 06: 135 frames (4.5s)
  ],
  fullSequenceComponent: CoeTrecho02FullSequence,
};
