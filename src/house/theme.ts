/**
 * Tokens do estilo da casa (OFurry Investidor), medidos nos 7 videos publicados do canal
 * (analise em docs/referencias/analise-canal-2026-10.md).
 *
 * Regra de ouro: 2 familias de fonte, 1 cor por significado, algo novo na tela a cada 1-2 s.
 */

export const House = {
  fonts: {
    /** Legenda cinetica e todo texto de fala. Montserrat ExtraBold, caixa alta. */
    caption: `'Montserrat', sans-serif`,
    /** Numeros, porcentagens, valores e titulos de capitulo. */
    number: `'Bebas Neue', 'Montserrat', sans-serif`,
  },
  weights: {
    whisper: 300, // fala reflexiva / ponte em cinza
    titleItalic: 600, // titulo de secao fixo, citacao
    caption: 800,
    heavy: 900,
  },
  /** Tamanhos em px para 1920x1080. O canal usava 2-8% da altura sem regra; padronizado aqui. */
  sizes: {
    caption: 84, // ~5.5% de altura de maiuscula, legivel no celular
    captionEmphasis: 110, // palavra-chave segurada
    whisper: 56,
    sectionTitle: 54,
    label: 40, // rotulo embaixo de icone
    number: 260,
    numberSmall: 150,
    chapterNumeral: 300,
    chapterTitle: 72,
  },
  colors: {
    bg: '#000000',
    text: '#FDFDFD',
    whisper: '#8C8C8C',
    grid: '#FFFFFF',
    /** Cores por significado. Nunca usar ganho/perda trocados. */
    gain: '#2EE04A',
    loss: '#E3141B',
    highlight: '#F4E812', // palavra-chave, ouro, "olha isso"
    brand: '#FF9900', // laranja da marca / Bitcoin / mascote
    info: '#22D3EE', // apoio tecnico, glitch
  },
  /** Tempos em segundos medidos no canal. */
  timing: {
    cardMin: 0.3, // o gancho do video 1 chega a 0.25 s por cartao
    cardTypical: 0.8,
    keywordHold: 1.0,
    hookCard: 0.6,
    entryFrames: 4, // pop / whip / subida com blur
    glitchFrames: 2,
    maxStaticHold: 4, // nenhum plano fica sem novidade por mais que isso
    maxBlackWithVoice: 0.6, // tela preta com narracao: no maximo isso
    chapterSilence: 1.0,
  },
  layout: {
    width: 1920,
    height: 1080,
    fps: 30,
    captionY: 0.5, // centro
    safeMargin: 96,
  },
} as const;

export type HouseTone = 'neutral' | 'gain' | 'loss' | 'highlight' | 'brand' | 'info';

export function toneColor(tone: HouseTone = 'neutral'): string {
  switch (tone) {
    case 'gain':
      return House.colors.gain;
    case 'loss':
      return House.colors.loss;
    case 'highlight':
      return House.colors.highlight;
    case 'brand':
      return House.colors.brand;
    case 'info':
      return House.colors.info;
    default:
      return House.colors.text;
  }
}

/** Sinal do numero decide a cor: "-" perda, "+" ganho. */
export function toneFromValue(value: string | number): HouseTone {
  const s = String(value).trim();
  if (s.startsWith('-') || s.startsWith('−')) return 'loss';
  if (s.startsWith('+')) return 'gain';
  return 'neutral';
}

export const sec = (s: number, fps: number = House.layout.fps) => Math.round(s * fps);
