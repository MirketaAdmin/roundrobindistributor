"""
Recover About-page assets from the client's 1:1 About PNG reference (1280x4314, no frame border).

  python -I scripts/extract-about-assets.py <about.png>

Outputs go to src/assets/about/. These are raster crops of a 1x export — not original files.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

SRC = Image.open(sys.argv[1]).convert('RGB')
ARR = np.asarray(SRC).astype(float)
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'about'


def crop(x0, y0, x1, y1):
    return SRC.crop((x0, y0, x1, y1))


def save(img, name, **kw):
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / name, **kw)
    print(f'{name:36} {img.size[0]}x{img.size[1]}')


def mean_colour(x0, y0, x1, y1):
    return tuple(ARR[y0:y1, x0:x1].reshape(-1, 3).mean(axis=0))


def unmix(box, bg, ink):
    """Single-colour glyph on a flat fill -> RGBA with the ink colour and recovered alpha."""
    x0, y0, x1, y1 = box
    a = ARR[y0:y1, x0:x1]
    b, c = np.array(bg), np.array(ink, float)
    alpha = np.clip(((a - b) @ (c - b)) / ((c - b) @ (c - b)), 0, 1)
    rgba = np.zeros(a.shape[:2] + (4,), np.uint8)
    rgba[..., :3] = c.astype(np.uint8)
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


def extreme(box, darkest=True):
    x0, y0, x1, y1 = box
    a = ARR[y0:y1, x0:x1].reshape(-1, 3)
    i = a.sum(axis=1).argmin() if darkest else a.sum(axis=1).argmax()
    return tuple(a[i])


# ---------- Hero background (photo + shapes) with the copy column removed ----------
TOP, H = 101, 634
hero = ARR[TOP:TOP + H].copy()
# Areas over plain gradient: filled as whole rectangles.
RECT_BOXES = [
    (52, 158, 206, 184),                        # breadcrumb
    (52, 414, 566, 566),                        # paragraph (left of the chair)
    (46, 580, 300, 640), (298, 580, 514, 640),  # buttons (+shadow / outside stroke)
    (52, 654, 324, 678),                        # note link
]
# The headline overlaps the decorative arc: only its glyph pixels are filled, so the arc survives.
GLYPH_BOXES = [(52, 208, 642, 282), (52, 272, 642, 346), (52, 336, 400, 410)]


def is_page_tone(p):
    return p.sum() > 3 * 225 and p[2] >= p[0]


smooth_mask = np.zeros((H, 1280), np.uint8)

for x0, y0, x1, y1 in RECT_BOXES:
    for y in range(y0 - TOP, y1 - TOP):
        left, right = hero[y, x0 - 2], hero[y, x1 + 1]
        if not is_page_tone(right) or np.abs(right - left).sum() > 24:
            right = left
        t = np.linspace(0, 1, x1 - x0)[:, None]
        hero[y, x0:x1] = left * (1 - t) + right * t
    smooth_mask[max(0, y0 - TOP - 2):y1 - TOP + 2, x0:min(x1, 590)] = 255

for x0, y0, x1, y1 in GLYPH_BOXES:
    region = hero[y0 - TOP:y1 - TOP, x0:x1]
    r, g, b = region[..., 0], region[..., 1], region[..., 2]
    glyph = (region.sum(axis=2) < 560) | ((b - r > 70) & (r < 170))
    glyph = np.asarray(Image.fromarray((glyph * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    for yy in range(glyph.shape[0]):
        row, m = region[yy], glyph[yy]
        xx = 0
        while xx < len(m):
            if not m[xx]:
                xx += 1
                continue
            start = xx
            while xx < len(m) and m[xx]:
                xx += 1
            left = row[start - 1] if start > 0 else hero[y0 - TOP + yy, x0 - 2]
            right = row[xx] if xx < len(m) else left
            t = np.linspace(0, 1, xx - start + 2)[1:-1, None]
            row[start:xx] = left * (1 - t) + right * t
    smooth_mask[y0 - TOP:y1 - TOP, x0:x1][glyph] = 255

filled = Image.fromarray(hero.round().astype(np.uint8))
filled = Image.composite(
    filled.filter(ImageFilter.GaussianBlur(4)),
    filled,
    Image.fromarray(smooth_mask).filter(ImageFilter.GaussianBlur(1.5)),
)
save(filled, 'about-hero-background.webp', quality=92, method=6)

# ---------- Images ----------
save(crop(32, 813, 602, 1225), 'who-we-are-mockup.webp', quality=92, method=6)  # on white
for name, x in (('solution-startups', 451), ('solution-nonprofit', 715), ('solution-enterprise', 979)):
    save(crop(x, 2082, x + 243, 2259), f'{name}.webp', quality=92, method=6)
save(crop(66, 2757, 324, 3017), 'team-rajeev-kumar.webp', quality=92, method=6)
save(crop(359, 2757, 618, 3017), 'team-maureen-kumar.webp', quality=92, method=6)

# ---------- Logos (cropped with their white tiles) ----------
save(crop(701, 2784, 750, 2834), 'logo-mirketa-tile.png')
save(crop(700, 2918, 751, 2969), 'logo-rrd-tile.png')

# ---------- Single-colour icons (alpha recovered) ----------
ICONS = {
    # name: (glyph box, background sample box)
    'icon-home': ((54, 162, 70, 179), (71, 163, 73, 165)),
    'icon-cloud': ((76, 1533, 124, 1582), (78, 1555, 80, 1557)),
    'icon-hub': ((473, 1533, 522, 1582), (475, 1555, 477, 1557)),
    'icon-tune': ((870, 1533, 919, 1582), (872, 1555, 874, 1557)),
    'icon-building': ((1154, 2796, 1178, 2820), (1150, 2790, 1152, 2792)),
    'icon-verified': ((1152, 2930, 1176, 2954), (1148, 2924, 1150, 2926)),
    'icon-swap': ((926, 2864, 950, 2888), (920, 2860, 922, 2862)),
    'icon-check-circle': ((684, 3004, 702, 3022), (705, 3004, 707, 3006)),
}
for name, (box, bg_box) in ICONS.items():
    bg = mean_colour(*bg_box)
    ink = extreme(box, darkest=True)
    save(unmix(box, bg, ink), f'{name}.png')
    print(f'   bg {tuple(int(v) for v in bg)} ink {tuple(int(v) for v in ink)}')
