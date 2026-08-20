"""
Floor plan pipeline — the two hall plans, and the coordinates of every spot.

The exhibit page lets someone pick their stand off the plan rather than from a
dropdown, which only works if the hotspots sit exactly on the drawn stands. So
the positions are not eyeballed: they are read out of the PDF's own text layer,
where every "EB3" and "T17" label already has a bounding box. Re-run this when
the plan changes and the hotspots move with it.

Steps:
  1. render page 1 at 200dpi (page 2 is a stock terrace render, not a plan)
  2. split the sheet into its two floors. The drawings abut with no gap, but
     every 6th-floor label sits above 43% and every 5th-floor one below 63%,
     so a cut through the quiet band between them is unambiguous
  3. trim each floor to its ink and save as WebP
  4. re-express each label's centre as a percentage of its own floor image,
     which is what the component positions buttons with

Needs poppler (pdftoppm, pdftotext) — the same toolchain already used to read
the programme docx. Prints a TypeScript block to paste into lib/event.ts.

    python3 scripts/build-floorplan.py ~/Downloads/"Final Floor Plan1.pdf"
"""
from PIL import Image
import numpy as np, pathlib, re, subprocess, sys, tempfile

PDF = pathlib.Path(sys.argv[1]).expanduser()
OUT = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "public/img/floorplan")
OUT.mkdir(parents=True, exist_ok=True)

SPLIT = 0.535          # quietest row between the two drawings
CORPORATE, STARTUP = "EB", "T"

tmp = pathlib.Path(tempfile.mkdtemp())
subprocess.run(["pdftoppm", "-png", "-r", "200", "-f", "1", "-l", "1", str(PDF), str(tmp / "pg")], check=True)
sheet = Image.open(next(tmp.glob("pg*.png"))).convert("RGB")
W, H = sheet.size

subprocess.run(["pdftotext", "-bbox-layout", "-f", "1", "-l", "1", str(PDF), str(tmp / "b.xml")], check=True)
xml = (tmp / "b.xml").read_text()
pw, ph = (float(v) for v in re.search(r'<page width="([\d.]+)" height="([\d.]+)"', xml).groups())
labels = [(w.strip(), (float(a) + float(c)) / 2 / pw, (float(b) + float(d)) / 2 / ph)
          for a, b, c, d, w in re.findall(
              r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]+)</word>', xml)
          if re.fullmatch(r"(EB|T)\d+", w.strip())]


def trim(im):
    a = np.array(im)
    ink = a.min(axis=2) < 240
    ys, xs = np.where(ink)
    pad = 8
    box = (max(0, xs.min() - pad), max(0, ys.min() - pad),
           min(im.size[0], xs.max() + pad), min(im.size[1], ys.max() + pad))
    return im.crop(box), box


floors = [
    ("sixth", "6th floor", 0.0, SPLIT),
    ("fifth", "5th floor", SPLIT, 1.0),
]

print("export const FLOOR_PLAN = [")
for slug, name, y0, y1 in floors:
    top, bot = int(H * y0), int(H * y1)
    crop, box = trim(sheet.crop((0, top, W, bot)))
    cw, ch = crop.size
    crop.save(OUT / f"{slug}.webp", "WEBP", quality=88, method=6)

    here = [(n, x, y) for n, x, y in labels if y0 <= y < y1]
    here.sort(key=lambda t: (t[0][:2] if t[0].startswith("EB") else t[0][:1], int(re.sub(r"\D", "", t[0]))))
    print(f'  {{')
    print(f'    slug: "{slug}", name: "{name}",')
    print(f'    image: "/img/floorplan/{slug}.webp", w: {cw}, h: {ch},')
    print(f"    spots: [")
    for n, x, y in here:
        # page fraction -> pixel on the sheet -> pixel in the trimmed crop -> % of crop
        px, py = x * W, y * H - top
        fx, fy = (px - box[0]) / cw * 100, (py - box[1]) / ch * 100
        kind = "corporate" if n.startswith("EB") else "startup"
        print(f'      {{ id: "{n}", kind: "{kind}", x: {fx:.1f}, y: {fy:.1f} }},')
    print(f"    ],")
    print(f"  }},")
    print(f"  // {slug}: {cw}x{ch}, {len(here)} spots", file=sys.stderr)
print("] as const;")
