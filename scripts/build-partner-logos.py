"""
Partner logo pipeline.

Nine logos from nine sources, three file formats, aspect ratios from 0.66:1
to 5.6:1. Goal: one consistent set that reads as a group.

Steps per logo:
  1. knock out the background — flood fill inward from the edges, so white
     INSIDE a logo (the gaps in the Access sunburst, the counters in the
     ASSEK letters) survives while the surrounding field goes
  2. trim to the ink, using a mass-percentile bounding box rather than an
     absolute one, so JPEG specks at the edge don't inflate the box
  3. scale to equal optical AREA, not equal height — a 5.6:1 wordmark and a
     0.66:1 crest look nothing alike if you match their heights
  4. centre on one shared canvas so every asset is the same size and the
     normalisation survives every breakpoint
"""
from PIL import Image, ImageDraw
import numpy as np, pathlib, sys

#   python3 scripts/build-partner-logos.py <source-dir> [out-dir]
#
# The originals are not in the repo — they are third-party brand assets. Point
# <source-dir> at wherever they are; the filenames expected are in FILES below.
SRC = pathlib.Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else pathlib.Path.home() / "Downloads"
OUT = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else pathlib.Path("public/img/partners")
OUT.mkdir(parents=True, exist_ok=True)

CANVAS = (400, 192)            # 2x the 200x96 display box
PAD_X, PAD_Y = 12, 12
MAX_W = CANVAS[0] - PAD_X * 2  # 376
MAX_H = CANVAS[1] - PAD_Y * 2  # 168

# Tuned by eye against a contact sheet. Higher makes the compact marks (the
# crests) bigger; the wide wordmarks stop growing once they hit MAX_W, so
# pushing it much past this starts to shrink Mount Kenya relative to the rest.
TARGET_INK = 11500.0

MAGIC = (255, 0, 255)

FILES = {
    # The convener leads the row. Supplied at 3508x2480 with alpha; the mark
    # is a navy roundel with a white dove inside it, which is exactly the case
    # knockout_white's edge-seeded flood fill exists for — a global
    # white-to-transparent rule would delete the bird.
    "i-choose-life":                  "ichooselife_logo.png",
    "government-of-kenya":            "Coat_of_arms_of_Kenya_(Official).svg.webp",
    "sverige":                        "Sverige.png",
    "university-of-nairobi":          "univesity_Of_nairobi.gif",
    "sustainable-world-corporation":  "Sustainable World Corporation.png",
    "childrens-mission":              "Children's Mission.png",
    "access":                         "access_logo.jpg",
    "mount-kenya-university":         "Mount-Kenya-University-Logo.png",
    "assek":                          "assel.jpeg",
    # Supplied by the university, Aug 2026: the vertical RGB lockup at
    # 1224x1193 with real alpha, replacing a 362x552 JPEG that was already at
    # its native resolution and soft on retina. README asked for exactly this.
    "zetech-university":              "Zetech University Logo_Vert RGB (5).png",
}


def knockout_white(im: Image.Image) -> Image.Image:
    """Flood fill the edge-connected near-white field to transparent."""
    rgb = Image.new("RGB", im.size, (255, 255, 255))
    rgb.paste(im.convert("RGB"))
    a = np.array(rgb)
    h, w = a.shape[:2]

    # seed from every border pixel that is already near-white
    seeds = []
    step = 3
    for x in range(0, w, step):
        for y in (0, h - 1):
            if a[y, x].min() > 195: seeds.append((x, y))
    for y in range(0, h, step):
        for x in (0, w - 1):
            if a[y, x].min() > 195: seeds.append((x, y))

    for s in seeds:
        try:
            ImageDraw.floodfill(rgb, s, MAGIC, thresh=42)
        except Exception:
            pass

    filled = np.array(rgb)
    bg = np.all(filled == np.array(MAGIC), axis=-1)
    out = np.array(im.convert("RGBA"))
    out[bg, 3] = 0
    return Image.fromarray(out)


def drop_slivers(im: Image.Image) -> tuple[Image.Image, int]:
    """Erase scan-line artifacts: components at most 6px on their short side
    and at least 50px on their long one. Verified against all nine sources —
    it fires on exactly one component, the 6x552 line down the edge of the
    Zetech JPEG, and on nothing else. Deliberately a SHAPE rule, not a size
    one: ASSEK has 604 legitimate components and Mount Kenya keeps 40% of its
    ink in small ones, so any percentage threshold would eat real logo."""
    a = np.array(im)
    mask = a[..., 3] > 40
    h, w = mask.shape
    seen = np.zeros((h, w), bool)
    removed = 0
    for sy, sx in np.argwhere(mask):
        if seen[sy, sx]:
            continue
        stack = [(sy, sx)]; seen[sy, sx] = True; px = []
        y0 = y1 = sy; x0 = x1 = sx
        while stack:
            y, x = stack.pop(); px.append((y, x))
            y0 = min(y0, y); y1 = max(y1, y); x0 = min(x0, x); x1 = max(x1, x)
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; stack.append((ny, nx))
        cw, ch = x1 - x0 + 1, y1 - y0 + 1
        if min(cw, ch) <= 6 and max(cw, ch) >= 50:
            for y, x in px:
                a[y, x, 3] = 0
            removed += 1
    return Image.fromarray(a), removed


def mass_bbox(alpha: np.ndarray, keep=0.999):
    """Bounding box holding `keep` of the ink mass — ignores stray specks."""
    ink = (alpha > 40).astype(np.float64)
    total = ink.sum()
    if total == 0:
        return 0, 0, alpha.shape[1], alpha.shape[0]

    def span(profile):
        c = np.cumsum(profile) / profile.sum()
        lo = int(np.searchsorted(c, (1 - keep) / 2))
        hi = int(np.searchsorted(c, 1 - (1 - keep) / 2))
        return lo, min(hi + 1, len(profile))

    y0, y1 = span(ink.sum(axis=1))
    x0, x1 = span(ink.sum(axis=0))
    return x0, y0, x1, y1


rows = []
for slug, fn in FILES.items():
    p = SRC / fn
    im = Image.open(p)
    orig_mode, orig_size = im.mode, im.size
    im = im.convert("RGBA")

    had_alpha = bool((np.array(im)[..., 3] < 250).any())
    if not had_alpha:
        im = knockout_white(im)

    im, n_slivers = drop_slivers(im)

    arr = np.array(im)
    x0, y0, x1, y1 = mass_bbox(arr[..., 3])
    im = im.crop((x0, y0, x1, y1))

    arr = np.array(im)
    alpha = arr[..., 3]
    ink = int((alpha > 128).sum())
    w, h = im.size

    # equal optical area, then clamp to the box
    s = (TARGET_INK / max(ink, 1)) ** 0.5
    s = min(s, MAX_W / w, MAX_H / h)
    nw, nh = max(1, round(w * s)), max(1, round(h * s))
    im = im.resize((nw, nh), Image.LANCZOS)

    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    canvas.paste(im, ((CANVAS[0] - nw) // 2, (CANVAS[1] - nh) // 2), im)
    canvas.save(OUT / f"{slug}.webp", "WEBP", quality=92, method=6)

    final_ink = int((np.array(canvas)[..., 3] > 128).sum())
    rows.append((slug, orig_mode, orig_size, had_alpha, (w, h), (nw, nh), final_ink,
                 (OUT / f"{slug}.webp").stat().st_size, n_slivers))

print(f"{'slug':32} {'src':>12} {'a':>2} {'trimmed':>11} {'placed':>10} {'ink':>7} {'kb':>5}")
for slug, mode, size, ha, tr, pl, ink, sz, nsl in rows:
    print(f"{slug:32} {str(size[0])+'x'+str(size[1]):>12} {'Y' if ha else '-':>2} "
          f"{str(tr[0])+'x'+str(tr[1]):>11} {str(pl[0])+'x'+str(pl[1]):>10} {ink:7} {sz/1024:5.1f}"
          + (f"   slivers removed: {nsl}" if nsl else ""))
inks = [r[6] for r in rows]
print(f"\nink spread: min {min(inks)}  max {max(inks)}  ratio {max(inks)/min(inks):.2f}x  (1.00 = perfectly even)")
print(f"total: {sum(r[7] for r in rows)/1024:.0f} KB")

# contact sheet on the real cell colour (bg-card, #FFFFFF) for eyeballing
sheet = Image.new("RGB", (CANVAS[0] * 3 + 4, CANVAS[1] * 3 + 4), (230, 224, 214))
for i, (slug, *_ ) in enumerate(rows):
    tile = Image.open(OUT / f"{slug}.webp")
    cell = Image.new("RGB", CANVAS, (255, 255, 255))
    cell.paste(tile, (0, 0), tile)
    sheet.paste(cell, ((i % 3) * (CANVAS[0] + 2), (i // 3) * (CANVAS[1] + 2)))
sheet.save(OUT / "_sheet.png")
print(f"contact sheet: {OUT / '_sheet.png'}")
