"""
Recover the Privacy Policy & T&C page glyphs from the client's 1:1 PNG reference (1280x4744, no frame border).

  python -I scripts/extract-legal-assets.py <legal.png>

Outputs go to src/assets/legal/. Every glyph is single-colour on a flat surface, so it is separated
from that surface with its alpha recovered (transparent PNG, drawn size).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ARR = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'legal'
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


# name: (glyph box incl. a 1-2px margin, flat background sample)
GLYPHS = {
    # meta strip (white)
    'icon-calendar.png': ((74, 352, 92, 371), (100, 340, 102, 342)),
    'icon-verified.png': ((330, 352, 349, 371), (360, 340, 362, 342)),
    'icon-history.png': ((615, 352, 633, 371), (640, 340, 642, 342)),
    # trust tiles (#e3f2fc), 40px tiles
    'trust-native.png': ((78, 442, 101, 461), (72, 434, 74, 436)),
    'trust-soc2.png': ((374, 440, 398, 464), (368, 434, 370, 436)),
    'trust-gdpr.png': ((671, 441, 692, 463), (664, 434, 666, 436)),
    'trust-appexchange.png': ((968, 441, 988, 463), (960, 434, 962, 436)),
    # document index
    'icon-search.png': ((92, 606, 109, 623), (85, 600, 87, 602)),
    'icon-shield.png': ((78, 651, 92, 668), (70, 640, 72, 642)),
    # callout (#f2f9fe) and guarantee cards (#f0f3ff)
    'icon-callout-verified.png': ((503, 1102, 528, 1126), (495, 1095, 497, 1097)),
    'icon-no-interception.png': ((503, 1413, 530, 1440), (495, 1405, 497, 1407)),
    'icon-zero-webhooks.png': ((743, 1413, 770, 1440), (735, 1405, 737, 1407)),
    'icon-tenant-boundary.png': ((982, 1413, 1009, 1435), (975, 1405, 977, 1407)),
}
for name, (box, bg) in GLYPHS.items():
    img = unmix(box, bg)
    img.save(OUT / name)
    print(f'{name:28} {img.size[0]}x{img.size[1]}')
