"""Copy a Figma image fill into public/images/ as a compressed WebP.

    python scripts/design/asset.py <imageRef-prefix> <out/name> [--w=1600] [--q=78]

<imageRef-prefix> is the start of an imageRef as printed by outline.mjs (img:xxxxxxxxxx).
Writes public/images/<out/name>.webp, scaled down to at most --w px wide, and prints
the public URL to use in code (/images/<out/name>.webp).
"""
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
flags = dict(a[2:].split("=") for a in sys.argv[1:] if a.startswith("--"))
prefix, name = args
max_w = int(flags.get("w", 1600))
quality = int(flags.get("q", 78))

matches = sorted((root / "design/figma/assets").glob(prefix + "*"))
if len(matches) != 1:
    sys.exit(f"{len(matches)} assets match {prefix!r}: {[m.name for m in matches][:5]}")

img = Image.open(matches[0])
img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
if img.width > max_w:
    img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
out = root / "public/images" / f"{name}.webp"
out.parent.mkdir(parents=True, exist_ok=True)
img.save(out, "WEBP", quality=quality, method=6)
print(f"/images/{name}.webp  {img.width}x{img.height}  {out.stat().st_size // 1024} KB")
