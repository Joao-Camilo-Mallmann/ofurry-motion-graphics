import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Img, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { GridFloor, Starfield, Vignette } from './backdrops';
import { CaptionCard, cardsFromSubtitle } from './captions';
import { BlurPlate, ChapterCard, FilmDust, IconBeat, Mascot, NumberHit, ProofCard, SectionTitle, TypeOn } from './elements';
import { KineticCaptions } from './KineticCaptions';
import { pushIn } from './motion';
import { House } from './theme';

import type { Backdrop, Beat, BeatSheet, CaptionWindow } from './beats';
export type { Backdrop, Beat, BeatSheet, CaptionWindow } from './beats';

function useSubtitle(sheet: BeatSheet): string | undefined {
  const [text, setText] = useState<string | undefined>(sheet.subtitle);
  const [handle] = useState(() => (sheet.subtitlePath && !sheet.subtitle ? delayRender(`legenda ${sheet.subtitlePath}`) : null));
  useEffect(() => {
    if (!sheet.subtitlePath || sheet.subtitle) return;
    fetch(staticFile(sheet.subtitlePath))
      .then((r) => r.text())
      .then((t) => {
        setText(t);
        if (handle !== null) continueRender(handle);
      });
  }, [sheet.subtitlePath, sheet.subtitle, handle]);
  return text;
}

const BackdropLayer: React.FC<{ backdrop: Backdrop }> = ({ backdrop }) => {
  if (backdrop === 'transparent') return null;
  if (backdrop === 'black') return <AbsoluteFill style={{ backgroundColor: House.colors.bg }} />;
  if (backdrop === 'grid') return <GridFloor />;
  if (backdrop === 'stars') return <Starfield />;
  return <BlurPlate src={backdrop.blur} video={backdrop.video} />;
};

const Thumb: React.FC<{ src: string; frames: number }> = ({ src, frames }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 30, frames - 20, frames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: o, transform: `scale(${pushIn(frame, frames, 1.08)})` }}>
      <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </AbsoluteFill>
  );
};

const IconsRow: React.FC<{ beat: Extract<Beat, { kind: 'icons' }>; fps: number }> = ({ beat, fps }) => {
  const n = beat.items.length;
  return (
    <AbsoluteFill>
      {beat.items.map((it, i) => {
        const x = n === 1 ? 0.5 : 0.2 + (0.6 * i) / (n - 1);
        const from = Math.round((it.at - beat.at) * fps);
        return (
          <Sequence key={i} from={from} layout="none">
            <IconBeat icon={it.icon} label={it.label} tone={it.tone} x={x} y={beat.y ?? 0.42} size={n > 3 ? 200 : n === 3 ? 260 : 320} strikeAt={it.strikeAt !== undefined ? Math.round((it.strikeAt - it.at) * fps) : undefined} />
          </Sequence>
        );
      })}
      {beat.relation &&
        n > 1 &&
        beat.items.slice(1).map((it, i) => {
          const x = 0.2 + (0.6 * (i + 0.5)) / (n - 1);
          return (
            <Sequence key={`r${i}`} from={Math.round((it.at - beat.at) * fps)} layout="none">
              <div style={{ position: 'absolute', left: `${x * 100}%`, top: `${(beat.y ?? 0.42) * 100}%`, transform: 'translate(-50%,-50%)', fontFamily: House.fonts.number, fontSize: 140, color: House.colors.text }}>
                {beat.relation}
              </div>
            </Sequence>
          );
        })}
    </AbsoluteFill>
  );
};

const BeatView: React.FC<{ beat: Beat; fps: number; frames: number }> = ({ beat, fps, frames }) => {
  const rel = (s: number) => Math.round((s - beat.at) * fps);
  switch (beat.kind) {
    case 'type-on':
      return <TypeOn text={beat.text} eraseAt={beat.eraseAt !== undefined ? rel(beat.eraseAt) : undefined} italic={beat.italic} />;
    case 'icon':
      return <IconBeat icon={beat.icon} label={beat.label} tone={beat.tone} x={beat.x} y={beat.y} loopEvery={beat.loopEvery} animated={beat.animated} strikeAt={beat.strikeAt !== undefined ? rel(beat.strikeAt) : undefined} />;
    case 'icons':
      return <IconsRow beat={beat} fps={fps} />;
    case 'number':
      return <NumberHit value={beat.value} countFrom={beat.countFrom} caption={beat.caption} tone={beat.tone} />;
    case 'mascot':
      return (
        <Mascot
          pose={beat.pose}
          poses={beat.poses?.map((p) => ({ at: rel(p.at), pose: p.pose }))}
          placement={beat.placement}
          shrinkAt={beat.shrinkAt !== undefined ? rel(beat.shrinkAt) : undefined}
          nameTag={beat.nameTag}
        />
      );
    case 'proof':
      return <ProofCard src={beat.src} highlight={beat.highlight} highlightAt={beat.highlightAt !== undefined ? rel(beat.highlightAt) : undefined} exitAt={frames - 3} />;
    case 'chapter':
      return <ChapterCard number={beat.number} title={beat.title} />;
    case 'section':
      return <SectionTitle text={beat.text} />;
    case 'thumb':
      return <Thumb src={beat.src} frames={frames} />;
    case 'broll':
      return <BlurPlate src={beat.src} video={beat.video} blur={0} dim={0} />;
  }
};

/** Renderiza uma folha de batidas inteira: fundo -> batidas -> legenda cinetica -> poeira. */
export const HouseTimeline: React.FC<{ sheet: BeatSheet; transparent?: boolean }> = ({ sheet, transparent = false }) => {
  const { fps } = useVideoConfig();
  const subtitle = useSubtitle(sheet);
  const [cards, setCards] = useState<CaptionCard[] | undefined>(undefined);
  useEffect(() => {
    if (subtitle) setCards(cardsFromSubtitle(subtitle, sheet.cardOptions));
  }, [subtitle, sheet.cardOptions]);

  const total = Math.round(sheet.duration * fps);
  const bds = [...sheet.backdrops].sort((a, b) => a.at - b.at);
  const windows = sheet.captions ?? [{ from: 0, until: sheet.duration }];

  return (
    <AbsoluteFill style={{ backgroundColor: transparent ? 'transparent' : House.colors.bg }}>
      {!transparent &&
        bds.map((b, i) => {
          const from = Math.round(b.at * fps);
          const to = i < bds.length - 1 ? Math.round(bds[i + 1].at * fps) : total;
          return (
            <Sequence key={`bd${i}`} from={from} durationInFrames={Math.max(1, to - from)} name={`fundo ${typeof b.backdrop === 'string' ? b.backdrop : 'blur'}`}>
              <BackdropLayer backdrop={b.backdrop} />
            </Sequence>
          );
        })}
      {!transparent && <Vignette strength={0.55} />}

      {sheet.beats.map((beat, i) => {
        const from = Math.round(beat.at * fps);
        const frames = Math.max(1, Math.round((beat.until - beat.at) * fps));
        return (
          <Sequence key={`b${i}`} from={from} durationInFrames={frames} name={`${beat.kind} ${beat.at}s`}>
            <BeatView beat={beat} fps={fps} frames={frames} />
          </Sequence>
        );
      })}

      {cards &&
        windows.map((w, i) => (
          <KineticCaptions key={`c${i}`} cards={cards} from={w.from} until={w.until} entryKind={w.entry} y={w.y} whisper={w.whisper} />
        ))}

      {sheet.filmDust !== false && !transparent && <FilmDust />}
    </AbsoluteFill>
  );
};
