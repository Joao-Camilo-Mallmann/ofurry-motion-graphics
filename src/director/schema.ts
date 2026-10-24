import { z } from 'zod';

/**
 * Zod Schemas and TypeScript Types for OFurry Motion Director (ADR-004 Anchored Composition)
 */

export const PositionSchema = z.object({
  x: z.number().optional().describe('X offset or coordinate in px or percentage'),
  y: z.number().optional().describe('Y offset or coordinate in px or percentage'),
});

// ADR-004 Anchoring & Relational Positioning Schemas
export const AnchorPointSchema = z.enum([
  'cap-height-right',
  'baseline-left',
  'stamp-corner',
  'leader-line',
  'side-rail',
  'center-below',
]);

export const CompositionBridgeSchema = z.enum([
  'connector-line',
  'overlap',
  'color-trail',
  'none-justified',
]);

export const AnchorToSchema = z.object({
  targetId: z.string().describe('ID of the dominant parent element to anchor to'),
  point: AnchorPointSchema.default('cap-height-right'),
  bridge: CompositionBridgeSchema.default('connector-line'),
  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
});

// 1. Text Reveal Element Schema
export const TextElementSchema = z.object({
  id: z.string().optional(),
  type: z.literal('text'),
  text: z.string().describe('Minimal text - 2 to 4 keywords recommended'),
  subtitle: z.string().optional(),
  variant: z.enum(['hero', 'title', 'subtitle', 'badge']).default('title'),
  highlightWords: z.array(z.string()).default([]),
  font: z.enum(['archivo', 'bebas', 'syne', 'space-grotesk', 'jakarta', 'montserrat']).optional(),
  align: z.enum(['center', 'left', 'right']).default('center'),
  delay: z.number().default(0),
  glow: z.boolean().default(false),
  revealMode: z.enum(['mask', 'punch', 'strikethrough', 'stagger']).default('mask'),
  strikethroughDelay: z.number().default(25),
  position: PositionSchema.optional(),
  anchorTo: AnchorToSchema.optional(),
  sizeRatio: z.number().optional().describe('Relative size multiplier (0.2 to 2.0)'),
});

// 2. Icon Element Schema
export const IconElementSchema = z.object({
  id: z.string().optional(),
  type: z.literal('icon'),
  name: z.string().default('Zap').describe('Lucide icon name e.g. TrendingUp, DollarSign, Shield, Zap, Cpu, Flame, Lock, Layers, Target'),
  size: z.number().default(96),
  color: z.string().optional(),
  accentColor: z.string().optional(),
  delay: z.number().default(0),
  showRing: z.boolean().default(true),
  showGlow: z.boolean().default(true),
  position: PositionSchema.optional(),
  anchorTo: AnchorToSchema.optional(),
  sizeRatio: z.number().optional().describe('Relative scale ratio derived from dominant anchor (e.g. 0.55-0.75 for hero text, 0.35-0.45 for hero numbers)'),
});

// 3. Animated Number Counter Schema
export const NumberElementSchema = z.object({
  id: z.string().optional(),
  type: z.literal('number'),
  value: z.number().describe('Target metric value'),
  startValue: z.number().default(0),
  prefix: z.string().default(''),
  suffix: z.string().default(''),
  label: z.string().optional(),
  decimals: z.number().default(0),
  durationInFrames: z.number().default(25),
  delay: z.number().default(0),
  variant: z.enum(['hero', 'badge', 'card']).default('hero'),
  position: PositionSchema.optional(),
  anchorTo: AnchorToSchema.optional(),
  sizeRatio: z.number().optional(),
});

// 4. Connected Tech Nodes Schema
export const NodePointSchema = z.object({
  id: z.string(),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  label: z.string().optional(),
  icon: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

export const NodeConnectionSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const NodesElementSchema = z.object({
  id: z.string().optional(),
  type: z.literal('nodes'),
  nodes: z.array(NodePointSchema),
  connections: z.array(NodeConnectionSchema).default([]),
  delay: z.number().default(0),
  drawDuration: z.number().default(30),
  width: z.number().default(800),
  height: z.number().default(450),
  position: PositionSchema.optional(),
  anchorTo: AnchorToSchema.optional(),
  sizeRatio: z.number().optional(),
});

// 5. Dynamic Chart Schema
export const ChartDataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const ChartElementSchema = z.object({
  id: z.string().optional(),
  type: z.literal('chart'),
  data: z.array(ChartDataPointSchema),
  chartType: z.enum(['line', 'bar']).default('line'),
  delay: z.number().default(0),
  drawDuration: z.number().default(35),
  width: z.number().default(700),
  height: z.number().default(360),
  showGrid: z.boolean().default(true),
  highlightLast: z.boolean().default(true),
  position: PositionSchema.optional(),
  anchorTo: AnchorToSchema.optional(),
  sizeRatio: z.number().optional(),
});

// Discriminated Union of all Visual Elements
export const VisualElementSchema = z.discriminatedUnion('type', [
  TextElementSchema,
  IconElementSchema,
  NumberElementSchema,
  NodesElementSchema,
  ChartElementSchema,
]);

// Choreography Configuration
export const ChoreographySchema = z.object({
  entryDirection: z.enum(['bottom-up', 'left-glide', 'radial-burst', 'diagonal-flow']).default('bottom-up'),
  drawSpeed: z.enum(['snappy', 'smooth-draw', 'cascade']).default('snappy'),
  ambientMotion: z.enum(['gentle-float', 'pulse-glow', 'grid-drift']).default('gentle-float'),
});

// Art Direction Metadata (Tier 2 Freedom)
export const ArtDirectionSchema = z.object({
  mood: z.enum(['aggressive-alert', 'optimistic-growth', 'analytical-tech', 'mysterious-reveal']).optional(),
  visualMetaphor: z.string().optional().describe('Visual representation concept'),
  overridePrompt: z.string().optional().describe('Custom visual direction requested by user'),
  presetId: z.string().optional().describe('Video-Shotcraft V1 Preset ID (e.g. cel-flash-stomp, basic-3d-scene)'),
});

// ADR-004 6 Layout Silhouettes + Legacy compatibility
export const LayoutSilhouetteSchema = z.enum([
  // ADR-006 5 Strategic Typographic Archetypes
  'monumental-punch',
  'metric-authority',
  'strike-redaction',
  'binary-tension',
  'forensic-callout',
  // ADR-004 Canonical Silhouettes
  'monumental-hero',
  'horizontal-split',
  'stacked-steps',
  'blueprint-grifo',
  'hud-radial',
  'split-authority',
  // Legacy aliases
  'centered-hero',
  'split-left',
  'split-right',
  'radial-network',
  'bottom-heavy',
  'dual-compare',
  'freeform',
]);

// Complete Scene Specification Schema
export const SceneSpecSchema = z.object({
  id: z.string(),
  durationInFrames: z.number().min(15).default(90),
  layout: LayoutSilhouetteSchema.default('monumental-hero'),
  presetId: z.string().optional().describe('Optional Video-Shotcraft V1 Preset ID'),
  choreography: ChoreographySchema.default({
    entryDirection: 'bottom-up',
    drawSpeed: 'snappy',
    ambientMotion: 'gentle-float',
  }),
  artDirection: ArtDirectionSchema.optional(),
  elements: z.array(VisualElementSchema).min(1),
});

// TypeScript Types (using z.input to allow natural optional fields on authored scenes)
export type AnchorPoint = z.infer<typeof AnchorPointSchema>;
export type CompositionBridge = z.infer<typeof CompositionBridgeSchema>;
export type AnchorTo = z.input<typeof AnchorToSchema>;
export type LayoutSilhouette = z.infer<typeof LayoutSilhouetteSchema>;

export type TextElement = z.input<typeof TextElementSchema>;
export type IconElement = z.input<typeof IconElementSchema>;
export type NumberElement = z.input<typeof NumberElementSchema>;
export type NodesElement = z.input<typeof NodesElementSchema>;
export type ChartElement = z.input<typeof ChartElementSchema>;
export type VisualElement = z.input<typeof VisualElementSchema>;
export type Choreography = z.input<typeof ChoreographySchema>;
export type ArtDirection = z.input<typeof ArtDirectionSchema>;
export type SceneSpec = z.input<typeof SceneSpecSchema>;

export type SceneSpecOutput = z.output<typeof SceneSpecSchema>;
