import { BeatSheet } from '../HouseTimeline';

/**
 * Validacao: os primeiros 47 s do video de maior retencao do canal ("VOCE tem ate 2030...")
 * refeitos so com o kit da casa, a partir da legenda da narracao original.
 * Tempos copiados do catalogo da analise (docs/referencias/analise-canal-2026-10.md).
 */
export const ganchoVideo01: BeatSheet = {
  id: 'House-Demo-Gancho-Video01',
  duration: 47,
  fps: 30,
  subtitlePath: 'house/demo/narracao-video01.vtt',
  cardOptions: { maxWords: 2, maxChars: 16 },
  captions: [
    { from: 4.4, until: 11.6, entry: 'whip' },
    { from: 11.6, until: 12.7, entry: 'pop', y: 0.72 },
    { from: 12.7, until: 17.7, entry: 'whip' },
    { from: 26.7, until: 32.7, entry: 'whip' },
    { from: 43.6, until: 46.9, entry: 'pop', y: 0.72 },
  ],
  backdrops: [
    { at: 0, backdrop: 'grid' },
    { at: 4.4, backdrop: 'stars' },
    { at: 12.7, backdrop: 'black' },
    { at: 21.5, backdrop: 'grid' },
    { at: 32.7, backdrop: 'black' },
    { at: 37.7, backdrop: 'stars' },
  ],
  beats: [
    // H2 pergunta direta ao espectador, digitada e apagada
    { kind: 'type-on', at: 0.25, until: 2.2, text: 'Quanto custa a sua liberdade?' },
    { kind: 'type-on', at: 2.25, until: 4.3, text: 'E o seu futuro?', eraseAt: 3.25 },
    // H3 primeiro objeto, sem nome ainda (misterio)
    { kind: 'icon', at: 11.6, until: 12.7, icon: 'bitcoin', tone: 'brand', y: 0.36 },
    // H9 payoff do clique: a propria thumbnail
    { kind: 'thumb', at: 17.7, until: 21.5, src: 'house/demo/thumb-video01.jpg' },
    // H4 primeira aparicao do mascote com a tag do canal
    // (sem PNG do mascote ainda: as poses viram o marcador cinza; troque por 'mascote/<pose>.png')
    { kind: 'mascot', at: 22.4, until: 26.7, placement: 'center', nameTag: true, poses: [{ at: 22.4 }, { at: 25.0 }] },
    // H6 prova na tela
    { kind: 'proof', at: 32.7, until: 37.6, highlight: [0.08, 0.12, 0.7, 0.18], highlightAt: 34 },
    // H3 diagrama que se monta com a fala: "?" -> alta -> o mundo
    {
      kind: 'icons',
      at: 37.75,
      until: 43.5,
      items: [
        { icon: 'circle-help', at: 37.75 },
        { icon: 'trending-up', at: 39.5, tone: 'gain' },
        { icon: 'earth', at: 41.5 },
      ],
    },
    { kind: 'icon', at: 45.7, until: 47, icon: 'bitcoin', tone: 'brand', y: 0.36 },
  ],
};

/** Mostruario das receitas que o gancho nao cobre: numero, capitulo, secao e icone negado. */
export const receitasDemo: BeatSheet = {
  id: 'House-Demo-Receitas',
  duration: 20,
  fps: 30,
  subtitle: `WEBVTT

00:00:00.200 --> 00:00:02.000
Isso aqui custa caro

00:00:07.000 --> 00:00:09.000
o banco ganha a taxa

00:00:16.500 --> 00:00:19.500
e o seu dinheiro fica preso
`,
  cardOptions: { maxWords: 2 },
  captions: [
    { from: 0, until: 2.2, entry: 'pop' },
    { from: 16.5, until: 19.8, entry: 'rise', y: 0.72 },
  ],
  backdrops: [
    { at: 0, backdrop: 'black' },
    { at: 7, backdrop: 'grid' },
    { at: 12, backdrop: 'black' },
  ],
  beats: [
    { kind: 'number', at: 2.2, until: 4.6, value: '-80%', caption: 'em 2 anos' },
    { kind: 'number', at: 4.6, until: 7, value: 'R$ 50.000', countFrom: 0, tone: 'gain' },
    {
      kind: 'icons',
      at: 7,
      until: 12,
      relation: '>',
      items: [
        { icon: 'landmark', label: 'banco', at: 7 },
        { icon: 'hand-coins', label: 'taxa', at: 8.2, tone: 'highlight' },
        { icon: 'wallet', label: 'voce', at: 9.4, strikeAt: 10.6 },
      ],
    },
    { kind: 'chapter', at: 12, until: 16.4, number: 2, title: 'O custo escondido' },
    { kind: 'section', at: 16.4, until: 20, text: 'Liquidez' },
    { kind: 'icon', at: 16.4, until: 20, icon: 'lock', tone: 'loss', y: 0.42, animated: false },
  ],
};
