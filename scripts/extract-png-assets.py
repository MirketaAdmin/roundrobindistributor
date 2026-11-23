"""
Recover visual assets from the client's 1:1 homepage PNG reference (1284x9180, 2px frame border).

  python -I scripts/extract-png-assets.py <homepage.png>

All coordinates below are in 1280px frame space (the PNG has a 2px black border on x).
Outputs go to src/assets/. These are raster crops of a 1x export — not original vector files.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Image.open(sys.argv[1]).convert('RGB')
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets'
OFF = 2  # frame border


def crop(x0, y0, x1, y1):
    return SRC.crop((x0 + OFF, y0, x1 + OFF, y1))


def save(img, rel, **kw):
    path = OUT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, **kw)
    print(f'{rel:45} {img.size[0]}x{img.size[1]}')


def detect_rect(x0, y0, x1, y1, bg, tol=18):
    """Bounding box (frame coords, exclusive end) of pixels differing from `bg` inside a region."""
    a = np.asarray(crop(x0, y0, x1, y1)).astype(int)
    diff = np.abs(a - np.array(bg)).sum(axis=2) > tol
    ys, xs = np.nonzero(diff)
    return x0 + xs.min(), y0 + ys.min(), x0 + xs.max() + 1, y0 + ys.max() + 1


def unmix_icon(box, bg, ink):
    """Single-colour icon on a flat fill -> RGBA with the ink colour and recovered alpha."""
    a = np.asarray(crop(*box)).astype(float)
    b = np.array(bg, float)
    c = np.array(ink, float)
    alpha = ((a - b) @ (c - b)) / ((c - b) @ (c - b))
    alpha = np.clip(alpha, 0, 1)
    rgba = np.zeros(a.shape[:2] + (4,), np.uint8)
    rgba[..., :3] = c.astype(np.uint8)
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


def darkest(box):
    a = np.asarray(crop(*box)).reshape(-1, 3)
    return tuple(int(v) for v in a[a.sum(axis=1).argmin()])


def lightest(box):
    a = np.asarray(crop(*box)).reshape(-1, 3)
    return tuple(int(v) for v in a[a.sum(axis=1).argmax()])


# ---------- Logos (cropped on the exact surface they sit on) ----------
save(crop(56, 20, 130, 81), 'logos/rrd-logo-header.png')          # header, on white
save(crop(56, 8823, 130, 8884), 'logos/rrd-logo-footer.png')      # footer, on #f9f9ff
save(crop(924, 4702, 1052, 4807), 'logos/rrd-logo-large.png')     # heritage card, on #f0f3ff

# ---------- Hero background: photo + shapes, with the copy column removed ----------
HERO_TOP, HERO_H = 101, 714
hero = np.asarray(crop(0, HERO_TOP, 1280, HERO_TOP + HERO_H)).astype(float).copy()
# Copy-column elements (frame coords) measured from the reference.
TEXT_BOXES = [
    (54, 180, 596, 248), (54, 244, 576, 312), (54, 308, 526, 376), (54, 372, 280, 434),  # headline lines
    (54, 450, 616, 476), (54, 480, 616, 506), (54, 510, 616, 536), (54, 542, 160, 562),  # paragraph
    (54, 584, 282, 612), (287, 584, 530, 612), (54, 616, 250, 644), (257, 616, 482, 644),  # chips
    (46, 656, 252, 728), (250, 660, 414, 718),                                             # buttons (+shadow)
    (54, 734, 326, 758),                                                                    # note link
]


def is_background(px):
    return px.sum() > 3 * 225 and px[2] >= px[0]  # pale blue page tones only


for x0, y0, x1, y1 in TEXT_BOXES:
    for y in range(y0 - HERO_TOP, y1 - HERO_TOP):
        left = hero[y, x0 - 2]
        right = hero[y, x1 + 1]
        if not is_background(right):  # photo edge: hold the left tone
            right = left
        t = np.linspace(0, 1, x1 - x0)[:, None]
        hero[y, x0:x1] = left * (1 - t) + right * t
# Row-wise fills leave faint banding; smooth only the filled pixels (left of the photo edge).
from PIL import ImageFilter  # noqa: E402

filled = Image.fromarray(hero.round().astype(np.uint8))
mask = Image.new('L', filled.size, 0)
mpx = np.zeros((HERO_H, 1280), np.uint8)
for x0, y0, x1, y1 in TEXT_BOXES:
    mpx[max(0, y0 - HERO_TOP - 2):y1 - HERO_TOP + 2, x0:min(x1, 600)] = 255
mask = Image.fromarray(mpx).filter(ImageFilter.GaussianBlur(2))
smooth = filled.filter(ImageFilter.GaussianBlur(10))
filled = Image.composite(smooth, filled, mask)
save(filled, 'images/hero-background.webp', quality=92, method=6)

# ---------- Governance illustration ----------
# region kept inside the panel's 24px corner radius so the navy section fill is never sampled
gx0, gy0, gx1, gy1 = detect_rect(70, 3905, 612, 4318, (22, 41, 69), tol=30)
save(crop(gx0, gy0, gx1, gy1), 'images/governance-illustration.webp', quality=92, method=6)
print('  governance rect', (gx0, gy0, gx1, gy1))

# ---------- Insights article images ----------
for name, cx in (('omni-channel-alternative', 56), ('lead-distribution', 454), ('round-robin-best-practices', 851)):
    ax0, ay0, ax1, ay1 = detect_rect(cx + 8, 7452, cx + 366, 7684, lightest((cx + 4, 7700, cx + 8, 7704)), tol=24)
    ax1, ay1 = ax1 - 1, ay1 - 1  # drop the 1px anti-aliased fringe against the card fill
    save(crop(ax0, ay0, ax1, ay1), f'images/article-{name}.webp', quality=92, method=6)
    print('  article rect', name, (ax0, ay0, ax1, ay1))

# ---------- Icons with no approved Lucide equivalent (tile/card crops, alpha recovered) ----------
ICONS = {
    # name: (box, background sample box)
    'icon-military-tech': ((305, 873, 345, 913), (307, 891, 309, 893)),
    'icon-stacked-windows': ((778, 873, 818, 913), (780, 891, 782, 893)),
    'icon-person-off': ((80, 1291, 124, 1335), (82, 1311, 84, 1313)),
    'icon-screen-settings': ((480, 1554, 524, 1598), (482, 1574, 484, 1576)),
    'icon-precision-manufacturing': ((678, 3939, 702, 3963), (660, 3925, 664, 3929)),
    'icon-payments': ((678, 4131, 702, 4155), (660, 4117, 664, 4121)),
    'icon-psychology': ((970, 4131, 994, 4155), (952, 4117, 956, 4121)),
}
for name, (box, bg_box) in ICONS.items():
    bg = tuple(int(v) for v in np.asarray(crop(*bg_box)).reshape(-1, 3).mean(axis=0).round())
    on_dark = sum(bg) < 300
    ink = lightest(box) if on_dark else darkest(box)
    save(unmix_icon(box, bg, ink), f'icons/{name}.png')
    print(f'  bg {bg} ink {ink}')
