/**
 * Folha de batidas (beat sheet): o formato do canal, lido pelos dois motores.
 *  - Remotion: src/house/HouseTimeline.tsx (folhas registradas em src/house/sheets.ts)
 *  - HyperFrames: scripts/hf/build-trecho.ts (arquivo beats.json de cada trecho)
 * Tempos SEMPRE em segundos do audio da narracao do trecho.
 * Em beats.json, caminhos (subtitlePath, audio, src, pose) sao relativos a pasta do proprio arquivo;
 * no Remotion, relativos a public/.
 */
import type { CardOptions } from './captions';
import type { EntryKind } from './motion';
import type { HouseTone } from './theme';

export type MascotPlacement = 'center' | 'left-third' | 'right-third' | 'corner-left' | 'corner-right';

export type Backdrop = 'black' | 'grid' | 'stars' | 'transparent' | { blur: string; video?: boolean };

export type Beat =
  | { kind: 'type-on'; at: number; until: number; text: string; eraseAt?: number; italic?: boolean }
  | { kind: 'icon'; at: number; until: number; icon: string; label?: string; tone?: HouseTone; strikeAt?: number; x?: number; y?: number; loopEvery?: number; animated?: boolean }
  | { kind: 'icons'; at: number; until: number; items: { icon: string; label?: string; at: number; tone?: HouseTone; strikeAt?: number }[]; relation?: string; y?: number }
  | { kind: 'number'; at: number; until: number; value: string; countFrom?: number; caption?: string; tone?: HouseTone }
  | { kind: 'mascot'; at: number; until: number; pose?: string; poses?: { at: number; pose?: string }[]; placement?: MascotPlacement; shrinkAt?: number; nameTag?: boolean }
  | { kind: 'proof'; at: number; until: number; src?: string; highlight?: [number, number, number, number]; highlightAt?: number }
  | { kind: 'chapter'; at: number; until: number; number: number | string; title: string }
  | { kind: 'section'; at: number; until: number; text: string }
  | { kind: 'thumb'; at: number; until: number; src: string }
  | { kind: 'broll'; at: number; until: number; src: string; video?: boolean };

export interface CaptionWindow {
  from: number;
  until: number;
  entry?: EntryKind;
  y?: number;
  whisper?: boolean;
}

export interface BeatSheet {
  id: string;
  /** Audio da narracao do trecho (beats.json/HyperFrames). */
  audio?: string;
  /** Duracao total em segundos. */
  duration: number;
  fps?: number;
  /** Legenda da narracao: caminho em public/ (.srt/.vtt) ou o conteudo inline. */
  subtitlePath?: string;
  subtitle?: string;
  cardOptions?: CardOptions;
  /** Janelas em que a legenda cinetica aparece. Omitir = o video inteiro. */
  captions?: CaptionWindow[];
  /** Troca de fundo ao longo do tempo. */
  backdrops: { at: number; backdrop: Backdrop }[];
  beats: Beat[];
  filmDust?: boolean;
}

