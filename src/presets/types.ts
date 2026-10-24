import React from 'react';

export type ShotcraftCategory =
  | 'camera'
  | 'typography'
  | 'data'
  | 'effects'
  | 'transition';

export type ShotcraftPresetId =
  | 'basic-3d-scene'
  | 'cursor-flyover'
  | 'blur-slide'
  | 'brace-expand'
  | 'cel-flash-stomp'
  | 'countdown-arc-scatter'
  | 'glitch-cycle'
  | 'paper-title-card'
  | 'text-as-mask'
  | 'title-demote-to-label'
  | 'split-text-stagger'
  | 'scramble-decode'
  | 'word-relay-filmstrip'
  | 'counter-confetti'
  | 'ring-diagram-annotation-reveal'
  | 'timeline-travel'
  | 'value-stagger-gradient'
  | 'beat-step-list-theme-cycle'
  | 'bezier-source-converge-merge'
  | 'panel-to-canvas'
  | 'card-stack'
  | 'pop-burst-confirm'
  | 'list-reveal'
  | 'product-card-progressive-assemble'
  | 'radial-ripple-phone-chips'
  | 'research-card-stack-scroll'
  | 'segmented-thumb-hero'
  | 'skeleton-reveal'
  | 'svg-shape-morph'
  | 'icon-flip-bloom'
  | 'bottom-push-stack-wipe';

export interface BasePresetProps {
  transparent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface ShotcraftPresetMeta {
  id: ShotcraftPresetId;
  name: string;
  category: ShotcraftCategory;
  defaultDurationInFrames: number;
  videoPreview: string;
  recipeSource: string;
  ofurryArchetype: 'A (Blueprint / Ficha)' | 'B (Layered Stash)' | 'C (Crash Slam)' | 'D (Split Tensão)' | 'Cinematic Transição';
  intention: string;
  description: string;
  component: React.FC<BasePresetProps & Record<string, unknown>>;
}
