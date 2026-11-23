"""
Recover the Support page glyphs from the client's 1:1 PNG reference (1280x3351, no frame border).

  python -I scripts/extract-support-assets.py <support.png>

Outputs go to src/assets/support/. Every glyph is single-colour (#005695) on a flat surface, so it is
separated from that surface with its alpha recovered (transparent PNG, drawn size + 2px margin).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ARR = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'support'
OUT.mkdir(parents=True, exist_ok=True)


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


GLYPHS = {
    # hero card tiles (#e7eeff)
    'tile-managing.png': ((91, 481, 113, 503), (84, 474, 86, 476)),
    'tile-troubleshooting.png': ((487, 480, 512, 505), (481, 474, 483, 476)),
    'tile-faqs.png': ((885, 481, 907, 503), (878, 474, 880, 476)),
    # category headings (white)
    'heading-managing.png': ((54, 764, 78, 789), (60, 740, 62, 742)),
    'heading-troubleshooting.png': ((54, 1127, 81, 1154), (60, 1100, 62, 1102)),
    'heading-faqs.png': ((54, 1666, 78, 1691), (60, 1640, 62, 1642)),
    # accordion chevrons (#f7f9fe)
    'chevron-up.png': ((1184, 856, 1204, 876), (1170, 850, 1172, 852)),
    'chevron-down.png': ((1184, 1009, 1204, 1029), (1170, 1000, 1172, 1002)),
}
for name, (box, bg) in GLYPHS.items():
    img = unmix(box, bg)
    img.save(OUT / name)
    print(f'{name:28} {img.size[0]}x{img.size[1]}')
