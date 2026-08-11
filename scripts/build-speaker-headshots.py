"""
Speaker headshots -> the 800x1000 the wall expects.

The five flyer extracts are tight head-and-shoulders crops at 800x1000. Two
speakers supplied their own photographs at other shapes, and dropping those
in raw would break the wall two ways: the aspect ratio gets fixed by
`object-cover` at whatever the browser feels like anchoring to, and a
full-length portrait next to six head-and-shoulders reads as a mistake.

So both are cropped to 4:5 here, anchored on the face rather than the frame
centre, and sized so the head occupies roughly the same share of the tile as
it does in the existing five.

Crop boxes are exactly 800x1000, which means NO resampling on either image —
what lands in public/img is original pixels. That is why the numbers below
are hand-set per photograph rather than computed from a face detector: two
images is not enough to justify the dependency, and a wrong automatic crop
on a named person's face is worse than a hand-checked one.

Sources live outside the repo (they are originals, not build inputs). Paths
are relative to ~/Downloads as supplied.

    python3 scripts/build-speaker-headshots.py
"""
from PIL import Image
import pathlib

SRC = pathlib.Path.home() / "Downloads"
OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "img"

W, H = 800, 1000

# (source file, output name, crop box) — crop is (left, top, right, bottom)
# and every box is exactly 800x1000, so nothing is scaled.
JOBS = [
    (
        # Dr. Hilda Muteshi — 1066x1600, three-quarter length on pale blue.
        # x centred on the face at ~545, not on the 533 frame centre. Top
        # anchored at 0: the source already leaves ~65px above the hair,
        # which is the headroom the existing crops carry.
        "hilda.jpeg", "speaker-6.jpg", (145, 0, 945, 1000),
    ),
    (
        # Salome Ayugi — 1000x1000 studio square on light grey. Face sits
        # right of centre at ~600, so the 800-wide window shifts right; it
        # stops at 980 rather than 1000 to keep a margin at the shoulder
        # instead of cutting it flush to the edge.
        "Salome headshot 1.png", "speaker-7.jpg", (180, 0, 980, 1000),
    ),
]


def build(src_name, out_name, box):
    src = SRC / src_name
    if not src.exists():
        raise SystemExit(f"missing source: {src}")

    img = Image.open(src).convert("RGB")
    w, h = img.size
    if box[2] > w or box[3] > h:
        raise SystemExit(f"{src_name}: crop {box} outside {w}x{h}")

    out = img.crop(box)
    assert out.size == (W, H), f"{out_name}: got {out.size}, want {(W, H)}"

    path = OUT / out_name
    out.save(path, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"  {out_name}  <- {src_name}  {w}x{h} crop{box}  {path.stat().st_size // 1024}KB")


if __name__ == "__main__":
    print("speaker headshots ->", OUT)
    for job in JOBS:
        build(*job)
