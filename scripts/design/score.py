"""Rough visual distance between each page's Figma render and its site screenshot.

    python scripts/design/score.py [name ...]

For each page in pages.json (desktop and mobile), compares the site shot in
design/shots/ with the Figma render: height ratio, and a mean pixel difference
after scaling both to 120 px wide and cropping to the shorter height (0 = same,
higher = further apart). Prints a table sorted worst-first. It is a triage signal
for where to look, not a pass/fail.
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageStat

root = Path(__file__).resolve().parents[2]
pages = json.loads((root / "scripts/design/pages.json").read_text())
frames = {f["id"]: f for f in json.loads((root / "design/figma/frames.json").read_text())}
only = set(sys.argv[1:])


def render_path(node_id):
    f = frames[node_id]
    return root / "design/figma/renders" / (f["file"] + ".png")


def small(img, w=120):
    return img.convert("L").resize((w, max(1, round(img.height * w / img.width))))


rows = []
for p in pages:
    if only and p["name"] not in only:
        continue
    for kind, width in (("desktop", 1440), ("mobile", 375)):
        node = p.get(kind)
        if not node:
            continue
        fig_p, site_p = render_path(node), root / f"design/shots/{p['name']}-{width}.png"
        if not fig_p.exists() or not site_p.exists():
            rows.append((999, p["name"], width, "missing " + ("render" if not fig_p.exists() else "shot"), "", ""))
            continue
        fig, site = Image.open(fig_p), Image.open(site_p)
        a, b = small(fig), small(site)
        h = min(a.height, b.height)
        diff = ImageStat.Stat(ImageChops.difference(a.crop((0, 0, 120, h)), b.crop((0, 0, 120, h)))).mean[0]
        rows.append((round(diff, 1), p["name"], width, f"{site.height / fig.height:.2f}", fig.height, site.height))

rows.sort(key=lambda r: -r[0])
print(f"{'diff':>6}  {'page':28} {'w':>4}  {'h ratio':>7}  {'figma h':>7}  {'site h':>6}")
for r in rows:
    print(f"{r[0]:>6}  {r[1]:28} {r[2]:>4}  {r[3]:>7}  {r[4]!s:>7}  {r[5]!s:>6}")
