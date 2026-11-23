"""
Recover Contact-page icons from the client's 1:1 Contact PNG reference (1280x2549, no frame border).

  python -I scripts/extract-contact-assets.py <contact.png>

Outputs go to src/assets/contact/. Single-colour glyphs are separated from their flat backgrounds
(alpha recovered), so they render as transparent PNGs on the same CSS surfaces.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ARR = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'contact'


def mean_colour(x0, y0, x1, y1):
    return ARR[y0:y1, x0:x1].reshape(-1, 3).mean(axis=0)


def darkest(x0, y0, x1, y1):
    a = ARR[y0:y1, x0:x1].reshape(-1, 3)
    return a[a.sum(axis=1).argmin()]


def unmix(box, bg, ink):
    x0, y0, x1, y1 = box
    a = ARR[y0:y1, x0:x1]
    alpha = np.clip(((a - bg) @ (ink - bg)) / ((ink - bg) @ (ink - bg)), 0, 1)
    rgba = np.zeros(a.shape[:2] + (4,), np.uint8)
    rgba[..., :3] = ink.astype(np.uint8)
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


ICONS = {
    # name: (glyph box, background sample box)
    'icon-trending-up': ((80, 450, 124, 494), (82, 470, 84, 472)),
    'icon-terminal': ((477, 450, 521, 494), (479, 470, 481, 472)),
    'icon-hub': ((874, 450, 918, 494), (876, 470, 878, 472)),
    'icon-shield': ((80, 926, 116, 962), (82, 942, 84, 944)),
    'icon-card-arrow': ((391, 612, 407, 628), (385, 612, 387, 614)),
    'icon-external-link': ((302, 1284, 322, 1304), (296, 1286, 298, 1288)),
    'icon-chevron-up': ((580, 1623, 612, 1655), (582, 1639, 584, 1641)),
    'icon-chevron-down': ((572, 1882, 604, 1914), (574, 1898, 576, 1900)),
}

OUT.mkdir(parents=True, exist_ok=True)
for name, (box, bg_box) in ICONS.items():
    bg = mean_colour(*bg_box)
    ink = darkest(*box)
    img = unmix(box, bg, ink)
    img.save(OUT / f'{name}.png')
    print(f'{name:22} {img.size[0]}x{img.size[1]}  bg {tuple(int(v) for v in bg)} ink {tuple(int(v) for v in ink)}')
