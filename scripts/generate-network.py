#!/usr/bin/env python3
"""Africa SME Summit — network mark.

THE IDEA
    The continent, drawn as a network. Nodes fill the landmass and link to
    their neighbours; five gold hubs sit at real cities, with Nairobi the
    largest because that is where the summit is.

    So it is not a generic "Africa plus dots" mark. It is a map of where the
    enterprises are and where they connect, with the host city weighted.

HONEST NOTE
    "Africa built from a network" is a well-populated category in African
    tech branding, and the uploaded reference (Mohammed Ismail, @misma) is
    one execution of it. This is a different execution — nodes and links
    rather than branching strokes, two colours rather than one, and real
    city positions rather than an even fill. It is not a version of his.

LEGIBILITY
    The continent silhouette survives further down than an abstract cluster
    does, because the eye completes a shape it already knows. Holds to about
    32px. Below that use the solid mark.
"""

import math, os, random
import sys, pathlib

INK, GOLD, PAPER = "#14113A", "#C99A2E", "#FFFFFF"
# Output directory. Defaults to public/logo/ relative to the repo root, which
# is where these SVGs are served from; pass a path to write elsewhere (used to
# diff a regeneration against what is committed).
#
# This was previously an absolute path from the machine these were first
# written on, which meant they could not run anywhere else.
OUT = sys.argv[1] if len(sys.argv) > 1 else str(
    pathlib.Path(__file__).resolve().parent.parent / "public" / "logo")
os.makedirs(OUT, exist_ok=True)
FONT = ("-apple-system, BlinkMacSystemFont, 'Archivo', 'Helvetica Neue', "
        "Arial, sans-serif")

# Simplified continental outline, (longitude, latitude). Enough vertices to
# be unmistakably Africa, few enough that the network reads as a network.
AFRICA = [
    (11, 37), (20, 33), (25, 32), (32, 31), (34, 29),      # Mediterranean, Nile, Suez
    (37, 22), (39, 15), (43, 12), (48, 12), (51, 12),      # Red Sea, Horn
    (45, 5), (41, -2), (40, -8), (40, -14), (35, -20),     # Somalia, Kenya, Tanzania coast
    (33, -26), (31, -30), (27, -34), (20, -35), (18, -34), # Mozambique, Cape
    (15, -27), (12, -20), (12, -14), (13, -8), (11, -4),   # Namibia, Angola
    (9, 0), (9, 4), (5, 4), (2, 6), (-3, 5),               # Gabon, Niger delta, Gulf of Guinea
    (-8, 4), (-11, 6), (-13, 9), (-16, 12), (-17, 15),     # Liberia, Sierra Leone, Dakar
    (-16, 21), (-13, 27), (-10, 30), (-6, 36), (0, 36),    # Mauritania, Western Sahara, Morocco
    (5, 37),
]

# Real cities. Nairobi first — the host, and the biggest node.
CITIES = [
    ("Nairobi",      36.8,  -1.3, 1.00),
    ("Lagos",         3.4,   6.5, 0.74),
    ("Cairo",        31.2,  30.0, 0.74),
    ("Johannesburg", 28.0, -26.2, 0.74),
    ("Accra",        -0.2,   5.6, 0.62),
]


def inside(px, py, poly):
    """Ray casting point-in-polygon."""
    n = len(poly); c = False
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]; xj, yj = poly[j]
        if ((yi > py) != (yj > py)) and \
           (px < (xj - xi) * (py - yi) / (yj - yi + 1e-12) + xi):
            c = not c
        j = i
    return c


def nodes(step=5.6, seed=11):
    """Jittered lattice clipped to the continent. Jitter matters: a regular
    grid reads as a texture, an irregular one reads as a network."""
    rnd = random.Random(seed)
    xs = [p[0] for p in AFRICA]; ys = [p[1] for p in AFRICA]
    pts = []
    y = min(ys)
    row = 0
    while y <= max(ys):
        offset = (row % 2) * step / 2
        x = min(xs) + offset
        while x <= max(xs):
            jx = x + rnd.uniform(-step * 0.22, step * 0.22)
            jy = y + rnd.uniform(-step * 0.22, step * 0.22)
            if inside(jx, jy, AFRICA):
                pts.append((jx, jy))
            x += step
        y += step * 0.86
        row += 1
    return pts


def build(size, node_r, hub_r, link_w, node_col, hub_col, link_col, step=5.6):
    pts = nodes(step)
    cities = [(lon, lat, w) for _, lon, lat, w in CITIES]

    # merge: drop any lattice node sitting on top of a city
    keep = [p for p in pts
            if all(math.hypot(p[0]-c[0], p[1]-c[1]) > step * 0.8 for c in cities)]
    all_pts = [(x, y, 0.0) for x, y in keep] + [(x, y, w) for x, y, w in cities]

    xs = [p[0] for p in all_pts]; ys = [p[1] for p in all_pts]
    spanx, spany = max(xs)-min(xs), max(ys)-min(ys)
    scale = size * 0.86 / max(spanx, spany)
    ox = size/2 - (min(xs)+spanx/2) * scale
    oy = size/2 + (min(ys)+spany/2) * scale       # latitude runs the other way

    P = [(ox + x*scale, oy - y*scale, w) for x, y, w in all_pts]

    reach = step * scale * 1.24
    links = set()
    for i, (xi, yi, _) in enumerate(P):
        for j in range(i+1, len(P)):
            xj, yj, _ = P[j]
            if math.hypot(xj-xi, yj-yi) <= reach:
                links.add((i, j))

    # A floating hub reads as a mistake. Guarantee each one is joined to its
    # three nearest neighbours whatever the reach threshold decided.
    for i, (xi, yi, w) in enumerate(P):
        if w <= 0:
            continue
        near = sorted(((math.hypot(xj-xi, yj-yi), j)
                       for j, (xj, yj, _) in enumerate(P) if j != i))[:3]
        for _, j in near:
            links.add((min(i, j), max(i, j)))

    out = []
    for i, j in sorted(links):
        x1, y1, _ = P[i]; x2, y2, _ = P[j]
        out.append(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" '
                   f'stroke="{link_col}" stroke-width="{link_w:.2f}" '
                   f'stroke-linecap="round" opacity="0.45"/>')
    for x, y, w in P:
        if w > 0:
            out.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{hub_r*w:.2f}" fill="{hub_col}"/>')
        else:
            out.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{node_r:.2f}" fill="{node_col}"/>')
    return "".join(out)


def svg(w, h, body, bg=None):
    back = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">{back}{body}</svg>')

def write(n, c):
    # `with`, not open(...).write(...): the bare form truncates the file the
    # moment it is opened, so anything that raises before the write leaves a
    # zero-byte asset behind. It also leaks the handle.
    with open(f"{OUT}/{n}.svg", "w") as f:
        f.write(c)
    print(f"  {n}.svg")

def wordmark(x, y, size, colour, accent):
    return (f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="600" letter-spacing="{size*0.085:.2f}" fill="{colour}">'
            f'AFRICA <tspan fill="{accent}">SME</tspan> SUMMIT</text>')


S = 120
write("net-mark",            svg(S, S, build(S, 2.6, 5.0, 1.3, PAPER, GOLD, PAPER)))
write("net-mark-light",      svg(S, S, build(S, 2.6, 5.0, 1.3, INK,   GOLD, INK)))
write("net-mark-mono-light", svg(S, S, build(S, 2.6, 5.0, 1.3, PAPER, PAPER, PAPER)))
write("net-mark-mono-dark",  svg(S, S, build(S, 2.6, 5.0, 1.3, INK,   INK,  INK)))

W, H = 460, 112
b = f'<g transform="translate(4,2)">{build(106, 2.3, 4.4, 1.15, PAPER, GOLD, PAPER)}</g>'
write("net-primary", svg(W, H, b + wordmark(122, H/2 + 7, 21, PAPER, GOLD)))
b = f'<g transform="translate(4,2)">{build(106, 2.3, 4.4, 1.15, INK, GOLD, INK)}</g>'
write("net-primary-light", svg(W, H, b + wordmark(122, H/2 + 7, 21, INK, GOLD)))

W = H = 280
b = f'<g transform="translate({(W-160)/2:.0f},8)">{build(160, 3.0, 6.0, 1.5, PAPER, GOLD, PAPER)}</g>'
for i, (word, colour, track) in enumerate(
        [("AFRICA", PAPER, 4.2), ("SME", GOLD, 6.0), ("SUMMIT", PAPER, 4.2)]):
    b += (f'<text x="{W/2}" y="{192 + i*30}" font-family="{FONT}" font-size="20" '
          f'font-weight="600" letter-spacing="{track}" fill="{colour}" '
          f'text-anchor="middle">{word}</text>')
write("net-stacked", svg(W, H, b))
print("\nHubs: Nairobi (largest), Lagos, Cairo, Johannesburg, Accra.")
