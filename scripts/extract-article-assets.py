"""
Recover article-page imagery and glyphs from the client's 1:1 article PNG reference (1280x4397, no frame border).

  python -I scripts/extract-article-assets.py <article.png>

Outputs go to src/assets/article/.
- Photos/screens are cropped to their drawn box (corner rounding is re-applied in CSS).
- Single-colour glyphs are separated from their flat backgrounds (alpha recovered).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Image.open(sys.argv[1]).convert('RGB')
ARR = np.asarray(SRC).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'article'
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


# Photos / screenshots (lossless WebP keeps them crisp and small)
PHOTOS = {
    'article-hero.webp': (94, 462, 789, 911),        # 695x449, r12
    'figure-availability.webp': (95, 2252, 788, 2545),  # 693x293 inside the 1px figure border
    'latest-featured.webp': (883, 286, 1192, 501),   # 309x215, r8
    'latest-thumb-1.webp': (878, 683, 926, 731),     # 48x48
    'latest-thumb-2.webp': (878, 773, 926, 821),
    'latest-thumb-3.webp': (878, 863, 926, 911),
    'author-anchal-gupta.webp': (92, 933, 144, 985),  # 52x52, circular in CSS
}
for name, box in PHOTOS.items():
    save(SRC.crop(box), name, lossless=True, quality=100)

# Single-colour glyphs (transparent), each with a nearby flat background sample
GLYPHS = {
    'icon-clock.png': ((739, 244, 755, 260), (760, 244, 762, 246)),
    'icon-bookmark.png': ((711, 950, 727, 966), (705, 945, 707, 947)),
    'icon-share.png': ((791, 950, 807, 967), (786, 945, 788, 947)),
    'icon-book.png': ((866, 219, 886, 239), (890, 214, 892, 216)),
    'icon-chevron-right.png': ((1202, 222, 1210, 234), (1212, 222, 1214, 224)),
    'icon-thumb-up.png': ((312, 3170, 328, 3186), (306, 3168, 308, 3170)),
    'icon-thumb-down.png': ((384, 3170, 400, 3186), (379, 3168, 381, 3170)),
    'icon-clock-featured.png': ((882, 518, 898, 534), (900, 516, 902, 518)),
}
for name, (box, bg) in GLYPHS.items():
    save(unmix(box, bg), name)
