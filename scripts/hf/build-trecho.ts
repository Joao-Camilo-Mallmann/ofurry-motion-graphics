/**
 * Gera um projeto HyperFrames (HTML + GSAP) a partir do beats.json de um trecho, no estilo da casa.
 *
 * Uso:
 *   bun run hf:build <video> <trecho>          -> videos/<video>/output/trecho-<XX>/beats.json
 *   bun run hf:build <caminho/beats.json>
 *
 * Saida: <pasta-do-trecho>/hf/  (index.html, compositions/*.html, assets/)
 * Depois: bun run hf:render <video> <trecho>   (check + MP4 preto + MOV transparente)
 *
 * O HTML gerado e um primeiro corte editavel: ajuste a mao no app do HyperFrames ou nos arquivos,
 * seguindo a skill ofurry-fazer-cenas. Rodar o build de novo SOBRESCREVE compositions/.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import type { Backdrop, Beat, BeatSheet } from '../../src/house/beats';
import { CaptionCard, cardsFromSubtitle } from '../../src/house/captions';
import { House, HouseTone, toneColor, toneFromValue } from '../../src/house/theme';
import { lintBeatSheet } from '../../src/house/lint';
import { iconSvg } from './lucide-svg';

const ROOT = resolve(import.meta.dir, '..', '..');
const KIT = join(ROOT, 'hf', 'kit');
const W = 1920;
const H = 1080;
const FPS = 30;
const HF_VERSION = '0.8.193';

// ---------------------------------------------------------------------------
// Entrada
// ---------------------------------------------------------------------------
function resolveBeatsPath(args: string[]): string {
  if (args[0]?.endsWith('.json')) return resolve(args[0]);
  const [video, trecho] = args;
  if (!video || !trecho) {
    console.error('Uso: bun run hf:build <video> <trecho>  |  bun run hf:build <beats.json>');
    process.exit(1);
  }
  return join(ROOT, 'videos', video, 'output', `trecho-${trecho.padStart(2, '0')}`, 'beats.json');
}

const beatsPath = resolveBeatsPath(process.argv.slice(2));
if (!existsSync(beatsPath)) {
  console.error(`Nao achei ${beatsPath}`);
  process.exit(1);
}
const baseDir = dirname(beatsPath);
const sheet = JSON.parse(readFileSync(beatsPath, 'utf8')) as BeatSheet;
const OUT = join(baseDir, 'hf');
const COMP = join(OUT, 'compositions');
const ASSETS = join(OUT, 'assets');

const subtitle = sheet.subtitle ?? (sheet.subtitlePath ? readFileSync(join(baseDir, sheet.subtitlePath), 'utf8') : '');
const cards: CaptionCard[] = subtitle ? cardsFromSubtitle(subtitle, sheet.cardOptions).filter((c) => c.start < sheet.duration) : [];

// ---------------------------------------------------------------------------
// Utilitarios
// ---------------------------------------------------------------------------
const r3 = (n: number) => Math.round(n * 1000) / 1000;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const js = (v: unknown) => JSON.stringify(v);
const copied = new Map<string, string>();

/** Copia um arquivo referenciado pela folha para assets/media e devolve o caminho root-relative. */
function asset(rel: string | undefined, opts: { blur?: number } = {}): string | undefined {
  if (!rel) return undefined;
  const src = join(baseDir, rel);
  const key = `${src}|${opts.blur ?? 0}`;
  if (copied.has(key)) return copied.get(key);
  if (!existsSync(src)) {
    console.warn(`  aviso: arquivo nao encontrado, usando marcador: ${rel}`);
    copied.set(key, '');
    return undefined;
  }
  mkdirSync(join(ASSETS, 'media'), { recursive: true });
  const name = opts.blur ? `${basename(rel, extname(rel))}-blur${opts.blur}.jpg` : basename(rel);
  const dest = join(ASSETS, 'media', name);
  if (opts.blur) {
    // desfoque gravado na imagem (o contrato do HyperFrames proibe filtro CSS em footage)
    spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},gblur=sigma=${opts.blur},eq=brightness=-0.18`, '-q:v', '3', dest]);
  } else copyFileSync(src, dest);
  const out = `assets/media/${name}`;
  copied.set(key, out);
  return out;
}

function scene(id: string, css: string, markup: string, script: string): string {
  // house.css e house-runtime.js sao carregados uma vez no index.html (assets/house/)
  return `<template>
  <style>
    #root { position: absolute; inset: 0; }
${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="${W}" data-height="${H}">
${markup}
  </div>
  <script>
    (function () {
      var tl = gsap.timeline({ paused: true });
      var $ = function (id) { return document.getElementById(id); };
${script}
      window.__timelines["${id}"] = tl;
    })();
  </script>
</template>
`;
}

const glow = (color: string, size: number) => `filter: drop-shadow(0 0 ${Math.round(size / 10)}px ${color}aa);`;

// ---------------------------------------------------------------------------
// Fundo
// ---------------------------------------------------------------------------
function buildBackdrops(): string {
  const bds = [...sheet.backdrops].sort((a, b) => a.at - b.at);
  let markup = '';
  let script = '';
  let css = `
    .fundo-black { position: absolute; inset: 0; background: #000; }
    .fundo-plane-wrap { position: absolute; left: ${-W}px; width: ${W * 3}px; top: ${Math.round(H * 0.55)}px; height: ${Math.round(H * 2.2)}px;
      transform-origin: 50% 0%; transform: perspective(700px) rotateX(72deg);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 35%, black 100%); mask-image: linear-gradient(to bottom, transparent 0%, black 35%, black 100%); opacity: 0.22; }
    .fundo-plane { position: absolute; inset: 0;
      background-image: linear-gradient(#fff 1.5px, transparent 1.5px), linear-gradient(90deg, #fff 1.5px, transparent 1.5px); background-size: 90px 90px; }
    .fundo-plate { position: absolute; inset: 0; width: ${W}px; height: ${H}px; object-fit: cover; }
    #fundo-vinheta { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%); z-index: 50; }
  `;
  bds.forEach((b, i) => {
    const start = b.at;
    const end = i < bds.length - 1 ? bds[i + 1].at : sheet.duration;
    const dur = r3(end - start);
    const id = `fundo-s${i + 1}`;
    const kind: Backdrop = b.backdrop;
    let inner = '';
    if (kind === 'black') inner = `<div class="fundo-black"></div>`;
    else if (kind === 'grid') {
      inner = `<div class="fundo-black"></div><div class="fundo-plane-wrap" data-layout-ignore><div id="${id}-plano" class="fundo-plane"></div></div>`;
      script += `      tl.fromTo($("${id}-plano"), { backgroundPosition: "0px 0px" }, { backgroundPosition: "0px ${r3(dur * 0.35 * 90)}px", duration: ${dur}, ease: "none" }, ${r3(start)});\n`;
    } else if (kind === 'stars') {
      const rnd = mulberry(`stars-${i}`);
      const stars = Array.from({ length: 220 }, (_, k) => ({ x: rnd() * W, y: rnd() * H, r: 0.6 + rnd() * 1.6, l: 1 + Math.floor(rnd() * 3), p: rnd() * Math.PI * 2, k }));
      inner = `<div class="fundo-black"></div><svg id="${id}-ceu" width="${W}" height="${H}" style="position:absolute;inset:0">${stars
        .map((s) => `<circle cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${((s.r * s.l) / 2).toFixed(2)}" fill="#fff" data-l="${s.l}" data-p="${s.p.toFixed(3)}" data-x="${s.x.toFixed(1)}"/>`)
        .join('')}</svg>`;
      script += `      (function () {
        var cs = Array.prototype.slice.call($("${id}-ceu").querySelectorAll("circle"));
        House.drive(tl, ${r3(start)}, ${dur}, function (t) {
          for (var k = 0; k < cs.length; k++) {
            var c = cs[k], l = +c.getAttribute("data-l"), p = +c.getAttribute("data-p"), x0 = +c.getAttribute("data-x");
            c.setAttribute("cx", ((x0 + t * 6 * l) % ${W}).toFixed(1));
            c.setAttribute("opacity", ((0.25 + 0.65 * (Math.sin(t * 1.6 + p) * 0.5 + 0.5)) * (0.35 + l * 0.2)).toFixed(3));
          }
        });
      })();\n`;
    } else if (kind !== 'transparent') {
      const src = asset(kind.blur, { blur: 18 });
      inner = src ? `<img class="fundo-plate" src="${src}" alt="">` : `<div class="fundo-black"></div>`;
    }
    markup += `    <div id="${id}" class="clip" data-start="${r3(start)}" data-duration="${dur}" data-track-index="${i}" style="position:absolute;inset:0">${inner}</div>\n`;
  });
  markup += `    <div id="fundo-vinheta" data-layout-ignore></div>\n`;
  return scene('fundo', css, markup, script);
}

function mulberry(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Poeira de pelicula (por cima de tudo, some no modo transparente)
// ---------------------------------------------------------------------------
function buildDust(): string {
  const markup = `    <canvas id="poeira-canvas" class="clip" data-start="0" data-duration="${r3(sheet.duration)}" data-track-index="0" width="${W}" height="${H}" style="position:absolute;inset:0;opacity:0.5" data-layout-ignore></canvas>\n`;
  const script = `      (function () {
        var cv = $("poeira-canvas"), cx = cv.getContext("2d");
        House.drive(tl, 0, ${r3(sheet.duration)}, function (t) {
          var f = Math.floor(t * 15), rnd = House.rng("poeira-" + f);
          cx.clearRect(0, 0, ${W}, ${H});
          cx.fillStyle = "#fff";
          for (var i = 0; i < 26; i++) {
            var x = rnd() * ${W}, y = rnd() * ${H}, r = 0.6 + rnd() * 2.2;
            cx.globalAlpha = 0.35 + rnd() * 0.5;
            cx.beginPath(); cx.arc(x, y, r, 0, Math.PI * 2); cx.fill();
          }
          if (rnd() > 0.7) { var sx = rnd() * ${W}; cx.globalAlpha = 0.18; cx.fillRect(sx, 0, 1.2, ${H}); }
          cx.globalAlpha = 1;
        });
      })();\n`;
  return scene('poeira', '', markup, script);
}

// ---------------------------------------------------------------------------
// Legenda cinetica (um unico host de legendas)
// ---------------------------------------------------------------------------
function buildCaptions(): string {
  const windows = sheet.captions ?? [{ from: 0, until: sheet.duration }];
  let markup = '';
  let script = '';
  let n = 0;
  cards.forEach((c, idx) => {
    const w = windows.find((x) => c.start >= x.from && c.start < x.until);
    if (!w) return;
    n++;
    const id = `leg-${String(n).padStart(3, '0')}`;
    const start = Math.max(w.from, c.start);
    const end = Math.min(w.until, Math.max(c.end, start + 1 / FPS));
    const words = c.text.toUpperCase().split(/\s+/);
    const emph = c.emphasis?.toUpperCase();
    const html = words
      .map((wd) => (emph && wd.replace(/[.,!?;:]/g, '') === emph ? `<span class="house-emph">${esc(wd)}</span>` : esc(wd)))
      .join(' ');
    const entry = w.entry ?? 'pop';
    const top = Math.round((w.y ?? House.layout.captionY) * H - 52);
    const cls = `house-caption${w.whisper ? ' is-whisper' : ''}`;
    const slices =
      entry === 'glitch'
        ? [0, 1, 2, 3]
            .map((k) => `<span class="house-slice ${cls}" style="clip-path: inset(${k * 25}% 0 ${100 - (k + 1) * 25}% 0); color: ${k % 2 ? 'var(--highlight)' : 'var(--text)'}">${html}</span>`)
            .join('')
        : '';
    markup += `    <div id="${id}" class="clip house-center" data-start="${r3(start)}" data-duration="${r3(end - start)}" data-track-index="0" style="top:${top}px"><span style="position:relative;display:inline-block">${slices}<span id="${id}-txt" class="${cls} house-inline">${html}</span></span></div>\n`;
    script += `      House.fit($("${id}-txt"), ${w.whisper ? House.sizes.whisper : House.sizes.caption}, 1600, "Montserrat", ${w.whisper ? 300 : 800});\n`;
    script += `      House.entry(tl, $("${id}-txt"), "${entry}", ${r3(start)}, { dir: ${idx % 2 ? -1 : 1} });\n`;
  });
  return scene('legendas', '', markup, script);
}

// ---------------------------------------------------------------------------
// Batidas
// ---------------------------------------------------------------------------
async function iconBlock(prefix: string, icon: string, size: number, tone: HouseTone | undefined, label: string | undefined, animated: boolean | undefined, start: number, dur: number) {
  const color = toneColor(tone);
  const { svg, animated: isAnim } = await iconSvg(icon, size, animated !== false);
  const markup = `<div id="${prefix}-in" style="display:flex;flex-direction:column;align-items:center">
        <div id="${prefix}-svg" class="house-icon" style="color:${color};${glow(color, size)}">${svg}</div>
        ${label ? `<div class="house-label">${esc(label)}</div>` : ''}
      </div>`;
  let script = `      House.entry(tl, $("${prefix}-in"), "pop", ${r3(start)});\n`;
  if (isAnim) script += `      House.lucide(tl, $("${prefix}-svg"), ${r3(start)}, ${r3(dur)}, { delay: ${r3(4 / FPS)} });\n`;
  return { markup, script };
}

function strike(prefix: string, size: number, at: number) {
  return {
    markup: `<svg id="${prefix}-risco" width="${size}" height="${size}" viewBox="0 0 100 100" style="position:absolute;left:50%;top:0;margin-left:${-size / 2}px;overflow:visible"><line x1="8" y1="92" x2="92" y2="8" stroke="${House.colors.loss}" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`,
    script: `      tl.fromTo($("${prefix}-risco").querySelector("line"), { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: ${r3(6 / FPS)}, ease: "power2.out" }, ${r3(at)});\n`,
  };
}

async function buildBeat(beat: Beat, id: string): Promise<string> {
  const dur = r3(beat.until - beat.at);
  const rel = (s: number) => r3(s - beat.at);
  let css = '';
  let markup = '';
  let script = '';

  switch (beat.kind) {
    case 'type-on': {
      const text = beat.text.toUpperCase();
      markup = `    <div id="${id}-txt" class="clip house-center house-caption" data-start="0" data-duration="${dur}" data-track-index="0" style="top:${Math.round(H / 2 - 52)}px${beat.italic ? ';font-style:italic;font-weight:600' : ''}">${esc(text)}</div>\n`;
      const erase = beat.eraseAt !== undefined ? rel(beat.eraseAt) : -1;
      script = `      (function () {
        var el = $("${id}-txt"), full = ${js(text)};
        House.drive(tl, 0, ${dur}, function (t) {
          var typed = Math.floor(t * 22), erased = ${erase} >= 0 && t > ${erase} ? Math.floor((t - ${erase}) * 22 * 1.6) : 0;
          var n = Math.max(0, Math.min(full.length, typed) - erased);
          var caret = Math.floor(t * 2) % 2 === 0 ? "|" : "\\u00a0";
          el.textContent = full.slice(0, n) + caret;
        });
      })();\n`;
      break;
    }
    case 'icon': {
      const size = 380;
      const x = Math.round((beat.x ?? 0.5) * W);
      const y = Math.round((beat.y ?? 0.45) * H);
      const ib = await iconBlock(`${id}-ic`, beat.icon, size, beat.tone, beat.label, beat.animated, 0, dur);
      const st = beat.strikeAt !== undefined ? strike(`${id}-ic`, size, rel(beat.strikeAt)) : { markup: '', script: '' };
      markup = `    <div id="${id}-ic" class="clip" data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;left:${x - 400}px;width:800px;top:${y - size / 2}px;display:flex;justify-content:center">
      <div style="position:relative">${ib.markup}${st.markup}</div>
    </div>\n`;
      script = ib.script + st.script;
      break;
    }
    case 'icons': {
      const n = beat.items.length;
      const size = n > 3 ? 200 : n === 3 ? 260 : 320;
      const y = Math.round((beat.y ?? 0.42) * H);
      for (let i = 0; i < n; i++) {
        const it = beat.items[i];
        const x = Math.round((n === 1 ? 0.5 : 0.2 + (0.6 * i) / (n - 1)) * W);
        const pid = `${id}-i${i + 1}`;
        const start = rel(it.at);
        const ib = await iconBlock(pid, it.icon, size, it.tone, it.label, undefined, start, r3(dur - start));
        const st = it.strikeAt !== undefined ? strike(pid, size, rel(it.strikeAt)) : { markup: '', script: '' };
        markup += `    <div id="${pid}" class="clip" data-start="${start}" data-duration="${r3(dur - start)}" data-track-index="${i}" style="position:absolute;left:${x - 300}px;width:600px;top:${y - size / 2}px;display:flex;justify-content:center">
      <div style="position:relative">${ib.markup}${st.markup}</div>
    </div>\n`;
        script += ib.script + st.script;
        if (beat.relation && i > 0) {
          const rx = Math.round((0.2 + (0.6 * (i - 0.5)) / (n - 1)) * W);
          const rid = `${id}-r${i}`;
          markup += `    <div id="${rid}" class="clip" data-start="${start}" data-duration="${r3(dur - start)}" data-track-index="${n + i}" style="position:absolute;left:${rx - 100}px;width:200px;top:${y - 80}px;text-align:center"><span id="${rid}-in" class="house-number house-inline" style="font-size:140px;color:var(--text)">${esc(beat.relation)}</span></div>\n`;
          script += `      House.entry(tl, $("${rid}-in"), "pop", ${start});\n`;
        }
      }
      break;
    }
    case 'number': {
      const tone = beat.tone ?? toneFromValue(beat.value);
      const color = toneColor(tone);
      markup = `    <div id="${id}-num" class="clip house-center" data-start="0" data-duration="${dur}" data-track-index="0" style="top:${Math.round(H * 0.48 - 150)}px">
      <div id="${id}-num-in" style="display:inline-block">
        <div id="${id}-num-txt" class="house-number" style="color:${color};text-shadow:0 0 32px ${color}99, 0 0 86px ${color}44">${esc(beat.value)}</div>
        ${beat.caption ? `<div class="house-number-caption">${esc(beat.caption)}</div>` : ''}
      </div>
    </div>\n`;
      script = `      House.entry(tl, $("${id}-num-in"), "pop", 0);\n`;
      if (beat.countFrom !== undefined) {
        const m = beat.value.match(/-?[\d.,]+/);
        const target = m ? Number(m[0].replace(/\./g, '').replace(',', '.')) : 0;
        const decimals = m ? (m[0].split(',')[1] ?? '').length : 0;
        script += `      (function () {
        var el = $("${id}-num-txt"), tpl = ${js(beat.value)}, token = ${js(m ? m[0] : '')};
        House.drive(tl, 0, ${dur}, function (t) {
          var p = Math.min(1, t / 0.8), e = 1 - Math.pow(1 - p, 3);
          var v = ${beat.countFrom} + (${target} - ${beat.countFrom}) * e;
          var s = Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: ${decimals}, maximumFractionDigits: ${decimals} });
          el.textContent = token ? tpl.replace(token, (v < 0 ? "-" : "") + s) : tpl;
        });
      })();\n`;
      }
      break;
    }
    case 'mascot': {
      const place = { center: 0.5, 'left-third': 0.3, 'right-third': 0.7, 'corner-left': 0.11, 'corner-right': 0.89 }[beat.placement ?? 'center'];
      const small = beat.placement === 'corner-left' || beat.placement === 'corner-right';
      const h = Math.round(H * (small ? 0.34 : 0.88));
      const poses = beat.poses?.length ? beat.poses : [{ at: beat.at, pose: beat.pose }];
      let posesHtml = '';
      poses.forEach((p, i) => {
        const s = rel(Math.max(beat.at, p.at));
        const e = i < poses.length - 1 ? rel(poses[i + 1].at) : dur;
        const src = asset(p.pose);
        const pid = `${id}-pose${i + 1}`;
        posesHtml += src
          ? `<img id="${pid}" class="clip" src="${src}" alt="" data-start="${s}" data-duration="${r3(e - s)}" data-track-index="${i + 1}" style="position:absolute;bottom:0;left:50%;height:${h}px;margin-left:${-Math.round(h * 0.31)}px">`
          : `<div id="${pid}" class="clip house-placeholder" data-start="${s}" data-duration="${r3(e - s)}" data-track-index="${i + 1}" style="position:absolute;bottom:0;left:50%;height:${h}px;width:${Math.round(h * 0.62)}px;margin-left:${-Math.round(h * 0.31)}px;border-radius:40% 40% 8% 8%;font-size:${Math.max(18, Math.round(h / 22))}px">MASCOTE ${i + 1}</div>`;
      });
      markup = `    <div id="${id}-m" class="clip" data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;inset:0" data-layout-allow-overflow>
      <div id="${id}-pos" style="position:absolute;left:${Math.round(place * W - 300)}px;width:600px;bottom:0;height:${h}px">
        <div id="${id}-enter" style="position:absolute;inset:0">
          <div id="${id}-sway" style="position:absolute;inset:0">${posesHtml}</div>
        </div>
      </div>
      ${beat.nameTag ? `<div id="${id}-tag" class="clip house-center" data-start="0.4" data-duration="${r3(Math.min(2.3, dur - 0.4))}" data-track-index="9" style="top:${H - Math.round(h * 0.16) - 30}px"><span id="${id}-tag-in" class="house-inline" style="background:#fff;color:#B35C00;font-family:var(--font-caption);font-weight:800;font-size:30px;padding:8px 28px;border-radius:40px">OFurry</span></div>` : ''}
    </div>\n`;
      script = `      House.entry(tl, $("${id}-enter"), "rise", 0, { distance: 260, frames: 8 });
      House.drive(tl, 0, ${dur}, function (t) { $("${id}-sway").style.transform = "translateY(" + (Math.sin(t * 1.3) * 4).toFixed(2) + "px) scale(" + (1 + Math.sin(t * 2.4) * 0.01).toFixed(4) + ")"; });\n`;
      if (beat.nameTag) script += `      House.entry(tl, $("${id}-tag-in"), "pop", 0.4);\n`;
      if (beat.shrinkAt !== undefined) {
        const tx = Math.round(0.89 * W - place * W);
        script += `      tl.fromTo($("${id}-pos"), { x: 0, scale: 1 }, { x: ${tx}, scale: 0.38, transformOrigin: "50% 100%", duration: ${r3(8 / FPS)}, ease: "power3.out" }, ${rel(beat.shrinkAt)});\n`;
      }
      break;
    }
    case 'proof': {
      const src = asset(beat.src);
      const w = Math.round(W * 0.62);
      const hl = beat.highlight;
      const hlAt = beat.highlightAt !== undefined ? rel(beat.highlightAt) : 0.8;
      markup = `    <div id="${id}-p" class="clip" data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center" data-layout-allow-overflow>
      <div id="${id}-card" style="position:relative;width:${w}px;box-shadow:0 0 0 2px rgba(255,255,255,.35),0 30px 120px rgba(255,255,255,.12);background:#111">
        ${src ? `<img src="${src}" alt="" style="width:100%;display:block">` : `<div class="house-placeholder" style="width:100%;aspect-ratio:16/10;font-size:40px">PRINT DE PROVA</div>`}
        ${hl ? `<div id="${id}-hl" style="position:absolute;left:${hl[0] * 100}%;top:${hl[1] * 100}%;width:${hl[2] * 100}%;height:${hl[3] * 100}%;border:6px solid var(--loss);border-radius:6px;box-shadow:0 0 18px #e3141b88;clip-path:inset(-12px 100% -12px -12px)"></div>` : ''}
      </div>
    </div>\n`;
      script = `      var card = $("${id}-card");
      tl.fromTo(card, { rotationY: -30, rotationX: 14, transformPerspective: 1400, opacity: 0, filter: "blur(18px)", scale: 1.06 },
        { rotationY: -6, rotationX: 4, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.33, ease: "power3.out" }, 0);
      tl.fromTo(card, { rotationY: -6 }, { rotationY: -1, scale: 1.04, duration: ${r3(Math.max(0.1, dur - 0.43))}, ease: "power1.inOut", immediateRender: false }, 0.33);
      tl.fromTo(card, { x: 28, filter: "hue-rotate(90deg) saturate(3)" }, { x: -22, filter: "hue-rotate(90deg) saturate(3)", duration: ${r3(2 / FPS)}, immediateRender: false }, ${r3(dur - 3 / FPS)});
      tl.fromTo(card, { opacity: 1 }, { opacity: 0, duration: ${r3(1 / FPS)}, immediateRender: false }, ${r3(dur - 1 / FPS)});\n`;
      if (hl) script += `      tl.fromTo($("${id}-hl"), { clipPath: "inset(-12px 100% -12px -12px)" }, { clipPath: "inset(-12px 0% -12px -12px)", duration: 0.33, ease: "power2.out" }, ${hlAt});\n`;
      break;
    }
    case 'chapter': {
      markup = `    <div id="${id}-c" class="clip" data-start="1" data-duration="${r3(Math.max(0.1, dur - 1))}" data-track-index="0" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:48px">
      <div id="${id}-num" class="house-chapter-num">${esc(String(beat.number))}</div>
      <div id="${id}-tit" class="house-chapter-title">${esc(beat.title)}</div>
    </div>\n`;
      script = `      House.entry(tl, $("${id}-num"), "blur", 1, { frames: 8 });
      tl.fromTo($("${id}-tit"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.27, ease: "expo.out" }, 1.2);\n`;
      break;
    }
    case 'section': {
      markup = `    <div id="${id}-s" class="clip house-center" data-start="0" data-duration="${dur}" data-track-index="0" style="top:70px"><span id="${id}-s-in" class="house-section house-inline">${esc(beat.text)}</span></div>\n`;
      script = `      House.entry(tl, $("${id}-s-in"), "rise", 0, { dir: -1, distance: 40 });\n`;
      break;
    }
    case 'thumb': {
      const src = asset(beat.src);
      markup = `    <div id="${id}-t" class="clip" data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;inset:0">
      <div id="${id}-t-in" style="position:absolute;inset:0">${src ? `<img src="${src}" alt="" style="width:${W}px;height:${H}px;object-fit:cover">` : `<div class="house-placeholder" style="position:absolute;inset:0;font-size:60px">THUMBNAIL</div>`}</div>
    </div>\n`;
      script = `      tl.fromTo($("${id}-t-in"), { opacity: 0, scale: 1 }, { opacity: 1, scale: 1.02, duration: 1, ease: "power2.out" }, 0);
      tl.fromTo($("${id}-t-in"), { scale: 1.02 }, { scale: 1.08, duration: ${r3(Math.max(0.1, dur - 1))}, ease: "none", immediateRender: false }, 1);
      tl.fromTo($("${id}-t-in"), { opacity: 1 }, { opacity: 0, duration: 0.66, ease: "power2.in", immediateRender: false }, ${r3(Math.max(0, dur - 0.7))});\n`;
      break;
    }
    case 'broll': {
      const src = asset(beat.src);
      markup = src
        ? beat.video
          ? `    <video id="${id}-v" class="clip" src="${src}" muted playsinline data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px;object-fit:cover"></video>\n`
          : `    <img id="${id}-v" class="clip" src="${src}" alt="" data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px;object-fit:cover">\n`
        : `    <div id="${id}-v" class="clip house-placeholder" data-start="0" data-duration="${dur}" data-track-index="0" style="position:absolute;inset:0;font-size:60px">B-ROLL</div>\n`;
      break;
    }
  }
  return scene(id, css, markup, script);
}

// ---------------------------------------------------------------------------
// Raiz
// ---------------------------------------------------------------------------
function buildIndex(beatIds: { id: string; beat: Beat }[], audioSrc?: string): string {
  const dur = r3(sheet.duration);
  const host = (id: string, start: number, d: number, track: number, z: number, extra = '') =>
    `      <div id="${id}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${r3(start)}" data-duration="${r3(d)}" data-track-index="${track}" data-track-kind="${id === 'legendas' ? 'captions' : 'graphics'}" data-width="${W}" data-height="${H}" style="z-index:${z}"${extra}></div>`;
  const hosts = [
    host('fundo', 0, dur, 0, 1, ' data-house-backdrop'),
    ...beatIds.map(({ id, beat }, i) => host(id, beat.at, beat.until - beat.at, i + 1, 10 + i)),
    host('legendas', 0, dur, beatIds.length + 1, 100),
    ...(sheet.filmDust === false ? [] : [host('poeira', 0, dur, beatIds.length + 2, 200, ' data-house-backdrop')]),
  ];
  return `<!doctype html>
<!-- Gerado por scripts/hf/build-trecho.ts a partir de ${basename(beatsPath)} (${sheet.id}). -->
<html lang="pt-BR" data-composition-variables='[{"id":"transparente","type":"boolean","label":"Fundo transparente (exportar alpha)","default":false}]'>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="assets/house/house-runtime.js"></script>
    <link rel="stylesheet" href="assets/house/house.css" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: transparent; }
      #root { width: 100%; height: 100%; position: relative; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${dur}" data-width="${W}" data-height="${H}" data-fps="${sheet.fps ?? FPS}">
${hosts.join('\n')}
${audioSrc ? `      <audio id="narracao" src="${audioSrc}" data-start="0" data-duration="${dur}" data-track-index="${beatIds.length + 3}" data-volume="1"></audio>` : ''}
    </div>
    <script>
      var vars = (window.__hyperframes && window.__hyperframes.getVariables && window.__hyperframes.getVariables()) || {};
      if (vars.transparente === true) {
        document.querySelectorAll("[data-house-backdrop]").forEach(function (el) { el.style.opacity = "0"; });
      }
      var tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
}

// ---------------------------------------------------------------------------
async function main() {
  const issues = lintBeatSheet(sheet, cards);
  if (issues.length) {
    console.log(`Lint da casa: ${issues.length} aviso(s) (rode bun run house:lint ${beatsPath} para detalhes)`);
    for (const i of issues.slice(0, 8)) console.log(`  [${i.at.toFixed(1)}-${i.until.toFixed(1)}s] ${i.rule}: ${i.message}`);
  }
  rmSync(COMP, { recursive: true, force: true });
  mkdirSync(COMP, { recursive: true });
  mkdirSync(join(ASSETS, 'fonts'), { recursive: true });
  mkdirSync(join(ASSETS, 'house'), { recursive: true });
  copyFileSync(join(KIT, 'house.css'), join(ASSETS, 'house', 'house.css'));
  copyFileSync(join(KIT, 'house-runtime.js'), join(ASSETS, 'house', 'house-runtime.js'));
  copyFileSync(join(ROOT, 'node_modules', '@fontsource', 'bebas-neue', 'files', 'bebas-neue-latin-400-normal.woff2'), join(ASSETS, 'fonts', 'bebas-neue-400.woff2'));

  let audioSrc: string | undefined;
  if (sheet.audio && existsSync(join(baseDir, sheet.audio))) {
    const ext = extname(sheet.audio);
    copyFileSync(join(baseDir, sheet.audio), join(ASSETS, `narracao${ext}`));
    audioSrc = `assets/narracao${ext}`;
  }

  writeFileSync(join(COMP, 'fundo.html'), buildBackdrops());
  writeFileSync(join(COMP, 'legendas.html'), buildCaptions());
  if (sheet.filmDust !== false) writeFileSync(join(COMP, 'poeira.html'), buildDust());

  const beatIds = sheet.beats.map((beat, i) => ({ id: `b${String(i + 1).padStart(2, '0')}-${beat.kind}`, beat }));
  for (const { id, beat } of beatIds) writeFileSync(join(COMP, `${id}.html`), await buildBeat(beat, id));

  writeFileSync(join(OUT, 'index.html'), buildIndex(beatIds, audioSrc));
  writeFileSync(
    join(OUT, 'hyperframes.json'),
    JSON.stringify(
      {
        $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json',
        registry: 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry',
        paths: { blocks: 'compositions', components: 'compositions/components', assets: 'assets' },
        media: { autoProxy: true },
      },
      null,
      2
    ) + '\n'
  );
  const meta = join(OUT, 'meta.json');
  if (!existsSync(meta)) writeFileSync(meta, JSON.stringify({ id: sheet.id, name: sheet.id, createdAt: new Date().toISOString() }, null, 2) + '\n');
  const hf = `npx --yes hyperframes@${HF_VERSION}`;
  writeFileSync(
    join(OUT, 'package.json'),
    JSON.stringify({ name: sheet.id.toLowerCase(), private: true, type: 'module', scripts: { dev: `${hf} preview`, check: `${hf} check`, render: `${hf} render` } }, null, 2) + '\n'
  );
  console.log(`Projeto HyperFrames gerado em ${OUT}`);
  console.log(`  ${beatIds.length} batidas, ${cards.length} cartoes de legenda, ${r3(sheet.duration)} s`);
  console.log(`  Preview: cd "${OUT}" && npx hyperframes preview`);
}

main();
