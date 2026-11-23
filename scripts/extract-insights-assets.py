"""
Recover Insights-page glyphs from the client's 1:1 Insights PNG reference (1280x2251, no frame border).

  python -I scripts/extract-insights-assets.py <insights.png>

Outputs go to src/assets/insights/.
- Single-colour glyphs (search, chevrons) are separated from their flat backgrounds (alpha recovered).
- The multi-colour category glyphs and the "⌘ K" hint are cropped together with their own chip/kbd
  surface colour, so they sit seamlessly on the same CSS surface.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Image.open(sys.argv[1]).convert('RGB')
ARR = np.asarray(SRC).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'insights'
OUT.mkdir(parents=True, exist_ok=True)


def save(img, name):
    img.save(OUT / name)
    print(f'{name:28} {img.size[0]}x{img.size[1]}')


def unmix(box, bg_box):
    x0, y0, x1, y1 = box
    a = ARR[y0:y1, x0:x1]
    bg = ARR[bg_box[1]:bg_box[3], bg_box[0]:bg_box[2]].reshape(-1, 3).mean(axis=0)
    flat = a.reshape(-1, 3)
    ink = flat[flat.sum(axis=1).argmin()]
    alpha = np.clip(((a - bg) @ (ink - bg)) / ((ink - bg) @ (ink - bg)), 0, 1)
    rgba = np.zeros(a.shape[:2] + (4,), np.uint8)
    rgba[..., :3] = ink.astype(np.uint8)
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


# Single-colour glyphs (transparent)
save(unmix((94, 406, 114, 426), (120, 400, 122, 402)), 'icon-search.png')
save(unmix((1174, 403, 1192, 419), (1160, 400, 1162, 402)), 'icon-select-chevron.png')
save(unmix((508, 1735, 526, 1753), (511, 1756, 513, 1758)), 'icon-pager-prev.png')
save(unmix((754, 1735, 772, 1753), (757, 1756, 759, 1758)), 'icon-pager-next.png')

# Multi-colour category glyphs, cropped on the chip surface (#f0f3ff): chip x + 8 → text start − 2
CHIP_GLYPHS = {
    'chip-speed.png': (222, 241),
    'chip-workload.png': (398, 425),
    'chip-security.png': (607, 627),
    'chip-implementation.png': (838, 858),
}
for name, (x0, x1) in CHIP_GLYPHS.items():
    save(SRC.crop((x0, 463, x1, 484)), name)

# "⌘ K" keyboard hint, cropped with its #e7eeff surface
save(SRC.crop((870, 404, 910, 432)), 'kbd-cmd-k.png')
