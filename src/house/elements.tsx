import './fonts';
import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import * as Lucide from 'lucide-react';
import { AnimatedLucide } from '../lucide-animated/AnimatedLucide';
import { LUCIDE_ANIMATED, LucideAnimatedName } from '../lucide-animated/icons';
import { EntryKind, MotionBlurDefs, breathe, entry, pushIn } from './motion';
import { House, HouseTone, toneColor, toneFromValue } from './theme';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// ---------------------------------------------------------------------------
// H2 Pergunta digitada (abertura e fechamento)
// ---------------------------------------------------------------------------
export interface TypeOnProps {
  text: string;
  /** Caracteres por segundo. O canal digita a ~22 cps. */
  cps?: number;
  /** Frame (local) em que comeca a apagar em backspace. Omitir = nao apaga. */
  eraseAt?: number;
  size?: number;
  italic?: boolean;
  tone?: HouseTone;
  y?: number;
}

export const TypeOn: React.FC<TypeOnProps> = ({ text, cps = 22, eraseAt, size = House.sizes.caption, italic = false, tone = 'neutral', y = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.floor((frame / fps) * cps);
  const erased = eraseAt !== undefined && frame > eraseAt ? Math.floor(((frame - eraseAt) / fps) * cps * 1.6) : 0;
  const n = Math.max(0, Math.min(text.length, typed) - erased);
  const caretOn = Math.floor(frame / (fps * 0.5)) % 2 === 0;
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          top: `${y * 100}%`,
          transform: 'translateY(-50%)',
          fontFamily: House.fonts.caption,
          fontWeight: italic ? House.weights.titleItalic : House.weights.caption,
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: size,
          color: toneColor(tone),
          whiteSpace: 'pre',
        }}
      >
        {text.slice(0, n).toUpperCase()}
        <span style={{ opacity: caretOn ? 1 : 0, fontWeight: 300 }}>|</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// H3 Icone-beat: icone branco com brilho que entra quando o substantivo e dito
// ---------------------------------------------------------------------------
export interface IconBeatProps {
  /** Nome kebab-case. Se existir no Lucide Animated usa a versao animada; senao o Lucide estatico. */
  icon: string;
  label?: string;
  size?: number;
  tone?: HouseTone;
  glow?: boolean;
  entryKind?: EntryKind;
  /** Frame local em que a animacao interna do icone animado dispara. */
  animateAt?: number;
  loopEvery?: number;
  /** Frame local em que o icone sai (encolhe e some). */
  exitAt?: number;
  /** Risco vermelho por cima (a fala nega/elimina o item). */
  strikeAt?: number;
  /** false = forca o Lucide estatico mesmo existindo versao animada (confira o que a animacao faz). */
  animated?: boolean;
  x?: number; // 0-1, centro do icone
  y?: number;
}

const kebabToPascal = (s: string) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

export const LucideIcon: React.FC<{ name: string; size: number; color: string; strokeWidth?: number }> = ({ name, size, color, strokeWidth = 2 }) => {
  const map = Lucide as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>>;
  const Comp = map[kebabToPascal(name)] ?? map[`${kebabToPascal(name)}Icon`] ?? Lucide.CircleHelp;
  return <Comp size={size} color={color} strokeWidth={strokeWidth} />;
};

export const IconBeat: React.FC<IconBeatProps> = ({
  icon,
  label,
  size = 380, // icone sozinho ocupa ~20-35% da largura nos videos do canal
  tone = 'neutral',
  glow = true,
  entryKind = 'pop',
  animateAt = 4,
  loopEvery,
  exitAt,
  strikeAt,
  animated: allowAnimated = true,
  x = 0.5,
  y = 0.45,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = toneColor(tone);
  const e = entry(entryKind, frame);
  const exit = exitAt !== undefined ? interpolate(frame, [exitAt, exitAt + 5], [1, 0], clamp) : 1;
  const animated = allowAnimated && icon in LUCIDE_ANIMATED;
  const strike = strikeAt !== undefined ? interpolate(frame, [strikeAt, strikeAt + 6], [0, 1], clamp) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        transform: `translate(-50%, -50%) ${e.transform} scale(${exit * breathe(frame, fps, 0.015)})`,
        opacity: e.opacity * exit,
        filter: e.filter,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 22,
      }}
    >
      <MotionBlurDefs />
      <div style={{ position: 'relative', filter: glow ? `drop-shadow(0 0 ${size / 10}px ${color}aa)` : undefined, lineHeight: 0 }}>
        {animated ? (
          <AnimatedLucide name={icon as LucideAnimatedName} size={size} color={color} startFrame={animateAt} loopEvery={loopEvery} />
        ) : (
          <LucideIcon name={icon} size={size} color={color} />
        )}
        {strike > 0 && (
          <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }} viewBox="0 0 100 100">
            <line x1={8} y1={92} x2={8 + 84 * strike} y2={92 - 84 * strike} stroke={House.colors.loss} strokeWidth={9} strokeLinecap="round" />
          </svg>
        )}
      </div>
      {label && (
        <div
          style={{
            fontFamily: House.fonts.caption,
            fontWeight: House.weights.caption,
            fontSize: House.sizes.label,
            color: House.colors.text,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// H5 Numero-chave: Bebas grande com brilho, cor pelo sinal, contagem opcional
// ---------------------------------------------------------------------------
export interface NumberHitProps {
  /** Texto final, ex.: "-80%", "R$ 50.000", "21 MILHOES". */
  value: string;
  /** Conta de `countFrom` ate o numero dentro de `value` durante `countFrames`. */
  countFrom?: number;
  countFrames?: number;
  tone?: HouseTone;
  caption?: string;
  size?: number;
  entryKind?: EntryKind;
  y?: number;
}

const formatLike = (template: string, n: number) => {
  const m = template.match(/-?[\d.,]+/);
  if (!m) return template;
  const decimals = (m[0].split(',')[1] ?? '').length;
  const abs = Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return template.replace(m[0], `${n < 0 ? '-' : ''}${abs}`);
};

export const NumberHit: React.FC<NumberHitProps> = ({ value, countFrom, countFrames = 24, tone, caption, size = House.sizes.number, entryKind = 'pop', y = 0.48 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const finalTone = tone ?? toneFromValue(value);
  const color = toneColor(finalTone);
  const e = entry(entryKind, frame);
  let shown = value;
  if (countFrom !== undefined) {
    const target = Number((value.match(/-?[\d.,]+/)?.[0] ?? '0').replace(/\./g, '').replace(',', '.'));
    const p = interpolate(frame, [0, countFrames], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
    shown = formatLike(value, countFrom + (target - countFrom) * p);
  }
  return (
    <AbsoluteFill style={{ alignItems: 'center' }}>
      <MotionBlurDefs />
      <div
        style={{
          position: 'absolute',
          top: `${y * 100}%`,
          transform: `translateY(-50%) ${e.transform} scale(${breathe(frame, fps, 0.01)})`,
          opacity: e.opacity,
          filter: e.filter,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: House.fonts.number,
            fontSize: size,
            lineHeight: 0.9,
            color,
            textShadow: `0 0 ${size / 8}px ${color}99, 0 0 ${size / 3}px ${color}44`,
            whiteSpace: 'nowrap',
          }}
        >
          {shown}
        </div>
        {caption && (
          <div style={{ fontFamily: House.fonts.caption, fontWeight: House.weights.caption, fontSize: House.sizes.label + 6, color: House.colors.text, marginTop: 18, textTransform: 'uppercase' }}>
            {caption}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// H4 Mascote: slot para as poses da raposa (PNG com fundo transparente em public/mascote/)
// ---------------------------------------------------------------------------
export type MascotPlacement = 'center' | 'left-third' | 'right-third' | 'corner-left' | 'corner-right';

export interface MascotProps {
  /** Caminho em public/, ex.: "mascote/explicando.png". Sem arquivo mostra um marcador cinza. */
  pose?: string;
  /** Troca de pose por corte seco: [{ at: frameLocal, pose }]. */
  poses?: { at: number; pose?: string }[];
  placement?: MascotPlacement;
  /** Frame local em que encolhe para o canto (vira mini-mascote). */
  shrinkAt?: number;
  shrinkTo?: 'corner-left' | 'corner-right';
  /** Tag "OFurry" que cresce na primeira aparicao. */
  nameTag?: boolean;
  height?: number;
}

const PLACE: Record<MascotPlacement, { x: number; h: number }> = {
  center: { x: 0.5, h: 0.88 },
  'left-third': { x: 0.3, h: 0.88 },
  'right-third': { x: 0.7, h: 0.88 },
  'corner-left': { x: 0.11, h: 0.34 },
  'corner-right': { x: 0.89, h: 0.34 },
};

export const Mascot: React.FC<MascotProps> = ({ pose, poses, placement = 'center', shrinkAt, shrinkTo = 'corner-right', nameTag = false, height }) => {
  const frame = useCurrentFrame();
  const { fps, height: H, width: W } = useVideoConfig();
  const current = poses ? poses.filter((p) => frame >= p.at).pop()?.pose ?? pose : pose;
  const a = PLACE[placement];
  const b = PLACE[shrinkTo];
  const k = shrinkAt !== undefined ? interpolate(frame, [shrinkAt, shrinkAt + 8], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) }) : 0;
  const x = a.x + (b.x - a.x) * k;
  const h = (height ?? a.h * H) + ((b.h * H) - (height ?? a.h * H)) * k;
  const e = entry('rise', frame, { distance: 260, frames: 8 });
  const sway = Math.sin((frame / fps) * 1.3) * 4;
  const tagIn = interpolate(frame, [12, 18, 75, 82], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill>
      <MotionBlurDefs />
      <div
        style={{
          position: 'absolute',
          left: x * W,
          bottom: 0,
          height: h,
          transform: `translateX(-50%) ${e.transform} translateY(${sway}px) scale(${breathe(frame, fps, 0.01, 2.6)})`,
          transformOrigin: '50% 100%',
          opacity: e.opacity,
          filter: e.filter,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {current ? (
          <Img src={staticFile(current)} style={{ height: '100%', width: 'auto' }} />
        ) : (
          <div
            style={{
              height: '100%',
              aspectRatio: '0.62',
              borderRadius: '40% 40% 8% 8%',
              background: 'linear-gradient(#3a3a3a, #1c1c1c)',
              border: '3px dashed #666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontFamily: House.fonts.caption,
              fontWeight: 800,
              fontSize: Math.max(18, h / 22),
            }}
          >
            MASCOTE
          </div>
        )}
      </div>
      {nameTag && tagIn > 0 && (
        <div
          style={{
            position: 'absolute',
            left: x * W,
            bottom: h * 0.16,
            transform: `translateX(-50%) scale(${tagIn})`,
            background: '#FFFFFF',
            color: House.colors.brand,
            fontFamily: House.fonts.caption,
            fontWeight: 800,
            fontSize: 30,
            padding: '8px 28px',
            borderRadius: 40,
          }}
        >
          OFurry
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// H6 Print de prova: imagem inclinada em 3D que endireita, marca vermelha e sai em glitch
// ---------------------------------------------------------------------------
export interface ProofCardProps {
  /** Caminho em public/ do print (noticia, site, extrato). */
  src?: string;
  /** Retangulo a marcar, em fracao da imagem: [x, y, w, h]. */
  highlight?: [number, number, number, number];
  highlightAt?: number;
  /** Frame local da saida com glitch. */
  exitAt?: number;
  widthRatio?: number;
}

export const ProofCard: React.FC<ProofCardProps> = ({ src, highlight, highlightAt = 24, exitAt, widthRatio = 0.62 }) => {
  const frame = useCurrentFrame();
  const { width: W } = useVideoConfig();
  const w = W * widthRatio;
  const settle = interpolate(frame, [0, 10], [1, 0], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const rotY = -24 * settle - 6 + interpolate(frame, [10, 160], [0, 5], clamp);
  const rotX = 10 * settle + 4;
  const e = entry('blur', frame, { frames: 6 });
  const draw = highlight ? interpolate(frame, [highlightAt, highlightAt + 10], [0, 1], clamp) : 0;
  const glitchOn = exitAt !== undefined && frame >= exitAt;
  const gone = exitAt !== undefined && frame >= exitAt + 3;
  if (gone) return null;
  const jitter = glitchOn ? (random(`pc-${frame}`) - 0.5) * 60 : 0;

  return (
    <AbsoluteFill style={{ perspective: 1400, alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: w,
          transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${pushIn(frame, 180, 1.05)}) translateX(${jitter}px)`,
          opacity: e.opacity,
          filter: glitchOn ? `hue-rotate(90deg) saturate(3)` : e.filter,
          boxShadow: '0 0 0 2px rgba(255,255,255,0.35), 0 30px 120px rgba(255,255,255,0.12)',
          position: 'relative',
          background: '#111',
          aspectRatio: src ? undefined : '16 / 10',
        }}
      >
        {src ? (
          <Img src={staticFile(src)} style={{ width: '100%', display: 'block' }} />
        ) : (
          <div style={{ color: '#777', fontFamily: House.fonts.caption, fontWeight: 800, fontSize: 40, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            PRINT DE PROVA
          </div>
        )}
        {highlight && draw > 0 && (
          // caixa vermelha "desenhada" da esquerda para a direita
          <div
            style={{
              position: 'absolute',
              left: `${highlight[0] * 100}%`,
              top: `${highlight[1] * 100}%`,
              width: `${highlight[2] * 100}%`,
              height: `${highlight[3] * 100}%`,
              border: `6px solid ${House.colors.loss}`,
              borderRadius: 6,
              boxShadow: `0 0 18px ${House.colors.loss}88`,
              clipPath: `inset(-12px ${(1 - draw) * 100}% -12px -12px)`,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// H7 Capitulo numerado: 1 s de preto, numeral + titulo, segura e corta
// ---------------------------------------------------------------------------
export const ChapterCard: React.FC<{ number: number | string; title: string; silenceFrames?: number }> = ({ number, title, silenceFrames = 30 }) => {
  const frame = useCurrentFrame();
  const f = frame - silenceFrames;
  if (f < 0) return null;
  const e = entry('blur', f, { frames: 8 });
  const tIn = interpolate(f, [6, 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 48 }}>
      <div style={{ fontFamily: House.fonts.number, fontSize: House.sizes.chapterNumeral, color: House.colors.brand, lineHeight: 0.8, opacity: e.opacity, filter: e.filter, transform: e.transform }}>
        {number}
      </div>
      <div
        style={{
          fontFamily: House.fonts.caption,
          fontWeight: House.weights.caption,
          fontSize: House.sizes.chapterTitle,
          color: House.colors.text,
          textTransform: 'uppercase',
          opacity: tIn,
          transform: `translateX(${(1 - tIn) * 40}px)`,
          maxWidth: 1100,
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// H8 Titulo de secao fixo (topo-centro, italico) enquanto a ilustracao troca embaixo
// ---------------------------------------------------------------------------
export const SectionTitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const e = entry('rise', frame, { dir: -1, distance: 40 });
  return (
    <AbsoluteFill>
      <MotionBlurDefs />
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: House.fonts.caption,
          fontWeight: House.weights.titleItalic,
          fontStyle: 'italic',
          fontSize: House.sizes.sectionTitle,
          color: House.colors.text,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          transform: e.transform,
          opacity: e.opacity,
          filter: e.filter,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Texturas e placas de fundo
// ---------------------------------------------------------------------------
/** Poeira e riscos de pelicula por cima do preto (presente em quase todo preto do canal). */
export const FilmDust: React.FC<{ amount?: number; opacity?: number }> = ({ amount = 26, opacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const seed = Math.floor(frame / 2); // muda a cada 2 quadros, como pelicula
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity }}>
      <svg width={width} height={height}>
        {Array.from({ length: amount }, (_, i) => {
          const x = random(`d-x-${seed}-${i}`) * width;
          const y = random(`d-y-${seed}-${i}`) * height;
          const r = 0.6 + random(`d-r-${seed}-${i}`) * 2.2;
          return <circle key={i} cx={x} cy={y} r={r} fill="#FFFFFF" opacity={0.35 + random(`d-o-${seed}-${i}`) * 0.5} />;
        })}
        {random(`scratch-${seed}`) > 0.7 && (
          <line
            x1={random(`sx-${seed}`) * width}
            y1={0}
            x2={random(`sx-${seed}`) * width + 6}
            y2={height}
            stroke="#FFFFFF"
            strokeWidth={1}
            opacity={0.18}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};

/** Imagem ou video desfocado como fundo do mascote/icones (27% do tempo no video 1). */
export const BlurPlate: React.FC<{ src: string; video?: boolean; blur?: number; dim?: number }> = ({ src, video = false, blur = 18, dim = 0.55 }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ filter: `blur(${blur}px)`, transform: 'scale(1.08)' }}>
      {video ? (
        <OffthreadVideo src={staticFile(src)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
    <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${dim})` }} />
  </AbsoluteFill>
);
