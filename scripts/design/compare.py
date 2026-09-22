"""Side-by-side Figma render vs site screenshot, cut into readable vertical slices.

    python scripts/design/compare.py <figma.png> <site.png> <out-prefix> [--slice=1200] [--scale=0.5]
    python scripts/design/compare.py <page-name> [--w=1440|375] [--slice=..] [--scale=..]

Both images are scaled to the same width, placed left (Figma) / right (site), and
split into slices of --slice source pixels so each output image stays legible.
Writes <out-prefix>-01.png, -02.png, ... and prints the paths with the y-range.
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw

args = [a for a in sys.argv[1:] if not a.startswith("--")]
flags = dict(a[2:].split("=") for a in sys.argv[1:] if a.startswith("--"))
if len(args) == 1:
    # Page-name mode: resolve the Figma render and site shot from pages.json.
    root = Path(__file__).resolve().parents[2]
    width = int(flags.get("w", 1440))
    page = next(p for p in json.loads((root / "scripts/design/pages.json").read_text()) if p["name"] == args[0])
    node = page["desktop" if width == 1440 else "mobile"]
    frame = next(f for f in json.loads((root / "design/figma/frames.json").read_text()) if f["id"] == node)
    figma_path = str(root / "design/figma/renders" / (frame["file"] + ".png"))
    site_path = str(root / f"design/shots/{args[0]}-{width}.png")
    prefix = str(root / f"design/shots/cmp/{args[0]}-{width}")
else:
    figma_path, site_path, prefix = args
slice_h = int(flags.get("slice", 1200))
scale = float(flags.get("scale", 0.5))

figma = Image.open(figma_path).convert("RGB")
site = Image.open(site_path).convert("RGB")
# Normalise the site shot to the Figma frame width (they should already match).
if site.width != figma.width:
    site = site.resize((figma.width, round(site.height * figma.width / site.width)))

w = figma.width
total = max(figma.height, site.height)
gap = 12
label_h = 22
n = 0
for top in range(0, total, slice_h):
    n += 1
    bottom = min(top + slice_h, total)
    h = bottom - top
    sw, sh = round(w * scale), round(h * scale)
    canvas = Image.new("RGB", (sw * 2 + gap, sh + label_h), (255, 0, 255))
    for i, (img, name) in enumerate(((figma, "FIGMA"), (site, "SITE"))):
        part = Image.new("RGB", (w, h), (230, 230, 230))
        if top < img.height:
            part.paste(img.crop((0, top, w, min(bottom, img.height))), (0, 0))
        canvas.paste(part.resize((sw, sh)), (i * (sw + gap), label_h))
        ImageDraw.Draw(canvas).text((i * (sw + gap) + 6, 4), f"{name}  y {top}-{bottom}  (h {img.height})", fill=(0, 0, 0))
    ImageDraw.Draw(canvas).rectangle((0, 0, canvas.width, label_h - 1), outline=None)
    out = f"{prefix}-{n:02d}.png"
    canvas.save(out)
    print(out, f"y {top}-{bottom}")
