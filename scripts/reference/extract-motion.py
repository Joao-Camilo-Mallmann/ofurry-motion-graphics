"""
Extrai trechos de motion de um video de referencia do canal.

Uso:
    python -I scripts/reference/extract-motion.py <pasta-do-video> [--dark 0.55]

A pasta precisa ter `video.mp4` e, de preferencia, `video.pt-orig.vtt` ou `video.pt.vtt`.
Gera dentro dela:
    analise/transcricao.txt     falas com tempo
    analise/segmentos.json      trechos detectados (fundo preto e overlay laranja)
    analise/visao-geral-XX.jpg  grade com 1 frame a cada 3s do video inteiro
    analise/seg-XXX.jpg         folha de contato de cada trecho (entrada em 6 fps + resto)
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

SAMPLE_FPS = 4
SW, SH = 128, 72


def fmt(t: float) -> str:
    m, s = divmod(t, 60)
    return f"{int(m):02d}:{s:05.2f}"


def parse_vtt(path: Path):
    """Legenda automatica do YouTube: pega so as linhas com marcacao por palavra."""
    if not path or not path.exists():
        return []
    text = path.read_text(encoding="utf-8", errors="ignore")
    cues = []
    for block in text.split("\n\n"):
        lines = block.strip().splitlines()
        if not lines or "-->" not in lines[0]:
            continue
        m = re.match(r"(\d+):(\d+):([\d.]+) --> (\d+):(\d+):([\d.]+)", lines[0])
        if not m:
            continue
        h1, m1, s1, h2, m2, s2 = m.groups()
        t0 = int(h1) * 3600 + int(m1) * 60 + float(s1)
        t1 = int(h2) * 3600 + int(m2) * 60 + float(s2)
        tagged = [l for l in lines[1:] if "<c>" in l]
        if tagged:
            clean = re.sub(r"<[^>]+>", "", tagged[-1]).strip()
            if clean:
                cues.append({"t0": round(t0, 2), "t1": round(t1, 2), "text": clean})
    if not cues:  # legenda manual, sem marcacao por palavra
        for block in text.split("\n\n"):
            lines = block.strip().splitlines()
            if lines and "-->" in lines[0]:
                m = re.match(r"(\d+):(\d+):([\d.]+) --> (\d+):(\d+):([\d.]+)", lines[0])
                if m:
                    h1, m1, s1, h2, m2, s2 = m.groups()
                    cues.append({
                        "t0": int(h1) * 3600 + int(m1) * 60 + float(s1),
                        "t1": int(h2) * 3600 + int(m2) * 60 + float(s2),
                        "text": " ".join(re.sub(r"<[^>]+>", "", l) for l in lines[1:]).strip(),
                    })
    return cues


def text_between(cues, t0, t1, pad=0.3):
    return " ".join(c["text"] for c in cues if c["t1"] >= t0 - pad and c["t0"] <= t1 + pad)


def sample_frames(video: Path):
    cmd = ["ffmpeg", "-v", "error", "-i", str(video), "-vf", f"fps={SAMPLE_FPS},scale={SW}:{SH}",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, SH, SW, 3).astype(np.int16)


def metrics(frames):
    r, g, b = frames[..., 0], frames[..., 1], frames[..., 2]
    luma = 0.299 * r + 0.587 * g + 0.114 * b
    dark = (luma < 28).mean(axis=(1, 2))
    bright = (luma > 170).mean(axis=(1, 2))
    orange = ((r > 200) & (g > 105) & (g < 200) & (b < 90)).mean(axis=(1, 2))
    diff = np.zeros(len(frames))
    diff[1:] = np.abs(np.diff(luma, axis=0)).mean(axis=(1, 2))
    return dark, bright, orange, diff


def runs(mask, max_gap=2, min_len=4):
    out, start, gap = [], None, 0
    for i, v in enumerate(mask):
        if v:
            if start is None:
                start = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap > max_gap:
                end = i - gap
                if end - start + 1 >= min_len:
                    out.append((start, end))
                start, gap = None, 0
    if start is not None:
        end = len(mask) - 1 - gap
        if end - start + 1 >= min_len:
            out.append((start, end))
    return out


def grab(video: Path, t: float, w: int, h: int) -> Image.Image:
    cmd = ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(video), "-frames:v", "1",
           "-vf", f"scale={w}:{h}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    if len(raw) < w * h * 3:
        return Image.new("RGB", (w, h), (40, 0, 0))
    return Image.frombytes("RGB", (w, h), raw[: w * h * 3])


def font(size):
    for f in ["C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/arial.ttf"]:
        try:
            return ImageFont.truetype(f, size)
        except OSError:
            pass
    return ImageFont.load_default()


def sheet(images, labels, cols, w, h, title=None):
    rows = (len(images) + cols - 1) // cols
    top = 40 if title else 0
    canvas = Image.new("RGB", (cols * w, rows * h + top), (30, 30, 30))
    d = ImageDraw.Draw(canvas)
    if title:
        d.text((10, 8), title, fill=(255, 255, 255), font=font(22))
    for i, (im, lab) in enumerate(zip(images, labels)):
        x, y = (i % cols) * w, (i // cols) * h + top
        canvas.paste(im, (x, y))
        d.rectangle([x, y, x + w - 1, y + h - 1], outline=(80, 80, 80))
        d.rectangle([x, y, x + 9 * len(lab) + 12, y + 24], fill=(0, 0, 0))
        d.text((x + 6, y + 3), lab, fill=(255, 220, 0), font=font(16))
    return canvas


def main():
    folder = Path(sys.argv[1])
    dark_thr = float(sys.argv[sys.argv.index("--dark") + 1]) if "--dark" in sys.argv else 0.55
    video = folder / "video.mp4"
    out = folder / "analise"
    out.mkdir(exist_ok=True)

    vtt = next((p for p in [folder / "video.pt-orig.vtt", folder / "video.pt.vtt"] if p.exists()), None)
    cues = parse_vtt(vtt)
    (out / "transcricao.txt").write_text(
        "\n".join(f"[{fmt(c['t0'])}] {c['text']}" for c in cues), encoding="utf-8")

    frames = sample_frames(video)
    dark, bright, orange, diff = metrics(frames)
    dur = len(frames) / SAMPLE_FPS

    # Fundo preto com conteudo (nao e so um fade para preto)
    black_bg = (dark > dark_thr) & ((bright > 0.002) | (orange > 0.0008))
    # Overlay laranja sobre gravacao
    overlay = (dark <= dark_thr) & (orange > 0.012)

    segs = []
    for kind, mask in [("fundo-preto", black_bg), ("overlay-laranja", overlay)]:
        for a, b in runs(mask):
            t0, t1 = a / SAMPLE_FPS, (b + 1) / SAMPLE_FPS
            segs.append({
                "tipo": kind,
                "t0": round(t0, 2), "t1": round(t1, 2), "duracao": round(t1 - t0, 2),
                "preto_medio": round(float(dark[a:b + 1].mean()), 3),
                "laranja_medio": round(float(orange[a:b + 1].mean()), 4),
                "movimento_medio": round(float(diff[a:b + 1].mean()), 2),
                "fala": text_between(cues, t0, t1),
            })
    segs.sort(key=lambda s: s["t0"])

    for i, s in enumerate(segs, 1):
        s["id"] = f"seg-{i:03d}"
        t0, t1 = s["t0"], s["t1"]
        entry = [t0 + k / 6 for k in range(6) if t0 + k / 6 < t1]
        rest_n = 6
        rest = [t0 + 1 + (t1 - t0 - 1) * (k + 1) / (rest_n + 1) for k in range(rest_n)] if t1 - t0 > 1.3 else []
        times = entry + rest
        ims = [grab(video, t, 480, 270) for t in times]
        title = f"{s['id']}  {s['tipo']}  {fmt(t0)} -> {fmt(t1)}  ({s['duracao']}s)   fala: {s['fala'][:110]}"
        sheet(ims, [fmt(t) for t in times], 4, 480, 270, title).save(out / f"{s['id']}.jpg", quality=85)
        s["folha"] = f"analise/{s['id']}.jpg"

    # Visao geral: 1 frame a cada 3s, 6x5 por folha (90s)
    step, per = 3.0, 30
    ts = [t for t in np.arange(0, dur, step)]
    for k in range(0, len(ts), per):
        chunk = ts[k:k + per]
        ims = [grab(video, t, 320, 180) for t in chunk]
        labs = []
        for t in chunk:
            tag = next((s["id"] for s in segs if s["t0"] - 0.5 <= t <= s["t1"] + 0.5), "")
            labs.append(f"{fmt(t)} {tag}")
        sheet(ims, labs, 6, 320, 180, f"{folder.name}  {fmt(chunk[0])} - {fmt(chunk[-1])}").save(
            out / f"visao-geral-{k // per + 1:02d}.jpg", quality=80)

    summary = {
        "video": folder.name,
        "duracao_s": round(dur, 1),
        "segundos_fundo_preto": round(sum(s["duracao"] for s in segs if s["tipo"] == "fundo-preto"), 1),
        "segundos_overlay": round(sum(s["duracao"] for s in segs if s["tipo"] == "overlay-laranja"), 1),
        "segmentos": segs,
    }
    (out / "segmentos.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{folder.name}: {len(segs)} trechos, {summary['segundos_fundo_preto']}s fundo preto, "
          f"{summary['segundos_overlay']}s overlay, {dur:.0f}s total")


if __name__ == "__main__":
    main()
