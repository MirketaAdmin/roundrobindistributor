"""
Recover the Thank You page assets from the client's 1:1 PNG reference (1280x1897, no frame border).

  python -I scripts/extract-thank-you-assets.py <thank-you.png>

Outputs go to src/assets/thank-you/.
- The two badge discs are opaque circles: cropped square (lossless WebP) and clipped round in CSS.
  The translucent halo behind them is drawn in CSS.
- The button glyphs are single-colour on a flat fill: alpha recovered (transparent PNG).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Image.open(sys.argv[1]).convert('RGB')
ARR = np.asarray(SRC).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'thank-you'
OUT.mkdir(parents=True, exist_ok=True)


def save(img, name, **kw):
    img.save(OUT / name, **kw)
    print(f'{name:28} {img.size[0]}x{img.size[1]}')


def unmix(box, bg_box):
    x0, y0, x1, y1 = box
    a = ARR[y0:y1, x0:x1]
    bg = ARR[bg_box[1]:bg_box[3], bg_box[0]:bg_box[2]].reshape(-1, 3).mean(axis=0)
    flat = a.reshape(-1, 3)
    ink = flat[np.abs(flat - bg).sum(axis=1).argmax()]
    alpha = np.clip(((a - bg) @ (ink - bg)) / ((ink - bg) @ (ink - bg)), 0, 1)
    rgba = np.zeros(a.shape[:2] + (4,), np.uint8)
    rgba[..., :3] = ink.astype(np.uint8)
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


# Badge discs (green 56px with white check disc; blue 28px with white "verified" glyph)
save(SRC.crop((612, 201, 668, 257)), 'badge-check.webp', lossless=True, quality=100)
save(SRC.crop((656, 245, 684, 273)), 'badge-verified.webp', lossless=True, quality=100)

# Button glyphs: home (white on #1370ba), book (#126fba on white)
save(unmix((463, 588, 479, 605), (450, 580, 452, 582)), 'icon-home.png')
save(unmix((691, 588, 712, 604), (680, 580, 682, 582)), 'icon-book.png')
