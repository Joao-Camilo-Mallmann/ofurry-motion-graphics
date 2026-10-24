import './fonts';
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { CaptionCard, CardOptions, cardsFromSubtitle } from './captions';
import { EntryKind, MotionBlurDefs, breathe, entry } from './motion';
import { House, HouseTone, toneColor } from './theme';

export interface KineticCaptionsProps {
  /** Conteudo de um .srt/.vtt da narracao (tempo absoluto do video). */
  subtitle?: string;
  /** Ou cartoes ja prontos. */
  cards?: CaptionCard[];
  cardOptions?: CardOptions;
  /** Segundo do video que corresponde ao frame 0 desta Sequence. */
  offsetSeconds?: number;
  /** Janela da legenda (s, tempo do video). Fora dela nao desenha nada. */
  from?: number;
  until?: number;
  entryKind?: EntryKind;
  /** Alterna a direcao do whip a cada cartao (como no gancho do video 1). */
  alternate?: boolean;
  /** Posicao vertical do centro (0-1). 0.72 = sobre o peito do mascote. */
  y?: number;
  size?: number;
  /** Cor das palavras de destaque (numeros e *palavras marcadas*). */
  emphasisTone?: HouseTone;
  /** Estilo sussurro: Montserrat Light cinza (falas de ponte/reflexao). */
  whisper?: boolean;
}

/**
 * Legenda cinetica do canal: 1-3 palavras, Montserrat ExtraBold, caixa alta, branco, no centro,
 * trocando no ritmo da fala. E a camada que mais aparece nos videos (30% do tempo no video 1).
 */
export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  subtitle,
  cards: cardsProp,
  cardOptions,
  offsetSeconds = 0,
  from = -Infinity,
  until = Infinity,
  entryKind = 'pop',
  alternate = true,
  y = House.layout.captionY,
  size = House.sizes.caption,
  emphasisTone = 'highlight',
  whisper = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cards = useMemo(
    () => cardsProp ?? (subtitle ? cardsFromSubtitle(subtitle, cardOptions) : []),
    [cardsProp, subtitle, cardOptions]
  );
  const t = offsetSeconds + frame / fps;
  if (t < from || t > until) return null;

  const idx = cards.findIndex((c) => t >= c.start && t < c.end);
  if (idx < 0) return null;
  const card = cards[idx];
  const local = Math.round((t - card.start) * fps);
  const e = entry(entryKind, local, { dir: alternate && idx % 2 ? -1 : 1 });
  const s = breathe(frame, fps, 0.008);

  const words = card.text.toUpperCase().split(/\s+/);
  const emph = card.emphasis?.toUpperCase();
  const color = whisper ? House.colors.whisper : House.colors.text;
  const style: React.CSSProperties = {
    fontFamily: House.fonts.caption,
    fontWeight: whisper ? House.weights.whisper : House.weights.caption,
    fontSize: whisper ? House.sizes.whisper : size,
    letterSpacing: '-0.01em',
    lineHeight: 1.05,
    color,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  const content = words.map((w, i) => {
    const isEmph = emph && w.replace(/[.,!?;:]/g, '') === emph;
    return (
      <span
        key={i}
        style={
          isEmph
            ? { color: toneColor(emphasisTone), fontSize: Math.round((style.fontSize as number) * 1.25) }
            : undefined
        }
      >
        {i ? ' ' : ''}
        {w}
      </span>
    );
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <MotionBlurDefs />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${y * 100}%`,
          display: 'flex',
          justifyContent: 'center',
          transform: 'translateY(-50%)',
        }}
      >
        <div style={{ position: 'relative', transform: `${e.transform} scale(${s})`, opacity: e.opacity, filter: e.filter }}>
          {e.glitch ? (
            // fatias deslocadas na cor de destaque (transicao de listras do video 3)
            e.glitch.map((dx, k) => (
              <div
                key={k}
                style={{
                  ...style,
                  position: k ? 'absolute' : 'relative',
                  inset: k ? 0 : undefined,
                  color: k % 2 ? toneColor(emphasisTone) : color,
                  transform: `translateX(${dx}px)`,
                  clipPath: `inset(${k * 25}% 0 ${100 - (k + 1) * 25}% 0)`,
                }}
              >
                {content}
              </div>
            ))
          ) : (
            <div style={style}>{content}</div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
