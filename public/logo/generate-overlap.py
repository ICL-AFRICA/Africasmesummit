#!/usr/bin/env python3
"""Africa SME Summit — the overlap mark.

Four translucent fields laid over one another, together forming the
continent. They are the four constituencies the summit exists to put in one
room: enterprises, capital, universities, and the institutions that serve
them.

Where fields overlap the colour deepens and a new one appears. Four inks
produce roughly a dozen apparent colours, and none of them had to be chosen
— they are what happens when the four are together. That is the brand
argument made in one shape.

Palette architecture follows Google's — four hues spread evenly at similar
weight, so none dominates — but the colours are earth-derived rather than
primary, which is what makes the set read as community rather than product.
"""

import math, os

MARIGOLD = "#E3A428"
CLAY     = "#C6553F"
INDIGO   = "#3F6FA8"
PALM     = "#4F9367"
INK      = "#191539"
PAPER    = "#FBF8F3"

OUT = "/home/claude/asm/public/logo"
os.makedirs(OUT, exist_ok=True)
FONT = ("-apple-system, BlinkMacSystemFont, 'Archivo', 'Helvetica Neue', "
        "Arial, sans-serif")

AFRICA = [
    (11, 37), (20, 33), (25, 32), (32, 31), (34, 29),
    (37, 22), (39, 15), (43, 12), (48, 12), (51, 12),
    (45, 5), (41, -2), (40, -8), (40, -14), (35, -20),
    (33, -26), (31, -30), (27, -34), (20, -35), (18, -34),
    (15, -27), (12, -20), (12, -14), (13, -8), (11, -4),
    (9, 0), (9, 4), (5, 4), (2, 6), (-3, 5),
    (-8, 4), (-11, 6), (-13, 9), (-16, 12), (-17, 15),
    (-16, 21), (-13, 27), (-10, 30), (-6, 36), (0, 36),
    (5, 37),
]


def fit(pts, size, pad=0.90):
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    sx, sy = max(xs)-min(xs), max(ys)-min(ys)
    s = size*pad/max(sx, sy)
    ox = size/2 - (min(xs)+sx/2)*s
    oy = size/2 + (min(ys)+sy/2)*s
    return [(ox+x*s, oy-y*s) for x,y in pts], s, ox, oy


def smooth(P, tension=0.34, close=True):
    n=len(P); d=[f"M {P[0][0]:.2f} {P[0][1]:.2f}"]
    for i in (range(n) if close else range(n-1)):
        p0,p1,p2,p3 = P[(i-1)%n],P[i],P[(i+1)%n],P[(i+2)%n]
        c1=(p1[0]+(p2[0]-p0[0])*tension/3, p1[1]+(p2[1]-p0[1])*tension/3)
        c2=(p2[0]-(p3[0]-p1[0])*tension/3, p2[1]-(p3[1]-p1[1])*tension/3)
        d.append(f"C {c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}")
    if close: d.append("Z")
    return " ".join(d)


def blob(cx, cy, rx, ry, rot, wobble):
    pts=[]; n=len(wobble)
    for i in range(n):
        a=2*math.pi*i/n; r=wobble[i]
        x=math.cos(a)*rx*r; y=math.sin(a)*ry*r
        pts.append((cx + x*math.cos(rot)-y*math.sin(rot),
                    cy + x*math.sin(rot)+y*math.cos(rot)))
    return smooth(pts, tension=0.9)


def build(size, opacity=0.50, uid_extra=""):
    P, s, ox, oy = fit(AFRICA, size)
    outline = smooth(P, tension=0.30)
    uid = f"afr{size}{uid_extra}"
    g = lambda lon, lat: (ox + lon*s, oy - lat*s)

    # Four fields on a rough diamond, all meeting in the centre. Each is
    # anchored where its constituency actually concentrates.
    fields = [
        (blob(*g(1, 18),  size*0.33, size*0.31, -0.30,
              (1.0,0.86,1.12,0.92,1.06,0.88)),  MARIGOLD),   # enterprises, west
        (blob(*g(31, 20), size*0.31, size*0.30,  0.50,
              (1.1,0.9,1.0,0.86,1.12,0.94)),    INDIGO),     # institutions, north-east
        (blob(*g(24, -14),size*0.32, size*0.35,  0.12,
              (0.94,1.1,0.9,1.06,0.96,1.08)),   CLAY),       # markets, south-east
        (blob(*g(8, -4),  size*0.27, size*0.30, -0.10,
              (1.06,0.92,1.08,0.9,1.1,0.94)),   PALM),       # growth, centre-west
    ]
    body = "".join(
        f'<path d="{d}" fill="{c}" opacity="{opacity}" '
        f'style="mix-blend-mode:multiply"/>' for d, c in fields)

    return (f'<defs><clipPath id="{uid}"><path d="{outline}"/></clipPath></defs>'
            f'<g clip-path="url(#{uid})">{body}</g>')


def svg(w,h,body,bg=None):
    back=f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">{back}{body}</svg>')

def write(n,c):
    open(f"{OUT}/{n}.svg","w").write(c); print(f"  {n}.svg")

def wordmark(x,y,size,colour,accent):
    return (f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="600" letter-spacing="{size*0.085:.2f}" fill="{colour}">'
            f'AFRICA <tspan fill="{accent}">SME</tspan> SUMMIT</text>')

S=130
write("map-mark",       svg(S,S,build(S,uid_extra="a")))
write("map-mark-paper", svg(S,S,build(S,uid_extra="b"), bg=PAPER))

W,H=470,118
b=f'<g transform="translate(2,0)">{build(112,uid_extra="c")}</g>'
write("map-primary", svg(W,H,b+wordmark(126,H/2+7,21,INK,"#8A5E0E")))

# PRIMARY lockup: mark on the left, name stacked in three lines beside it.
# Each line sits at a readable size instead of one long line shrinking to
# fit, and the block squares up against the mark.
# 8px between the artwork and the type — measured, not eyeballed. The mark
# is placed by its ink bounds so the spacing is real at any size.
import re as _re
_tight = open(f"{OUT}/map-mark-tight.svg").read()
_vb = [float(v) for v in _re.search(r'viewBox="([^"]+)"', _tight).group(1).split()]
_inner = _tight[_tight.index('>', _tight.index('<svg')) + 1 : _tight.rindex('</svg>')]

MARK_H = 132.0
_k = MARK_H / _vb[3]
MARK_W = _vb[2] * _k
GAP = 8.0
TEXT_X = MARK_W + GAP

W, H = TEXT_X + 268, 152
b = (f'<g transform="translate({-_vb[0]*_k:.2f},{10 - _vb[1]*_k:.2f}) '
     f'scale({_k:.4f})">{_inner}</g>')
for i, (word, colour) in enumerate([("AFRICA", INK), ("SME", "#8A5E0E"), ("SUMMIT", INK)]):
    b += (f'<text x="{TEXT_X:.1f}" y="{54+i*38}" font-family="{FONT}" font-size="32" '
          f'font-weight="600" letter-spacing="2.9" fill="{colour}">{word}</text>')
write("map-lockup", svg(W, H, b))

# Centred stack, for square placements and avatars
W=H=290
b=f'<g transform="translate({(W-170)/2:.0f},10)">{build(170,uid_extra="e")}</g>'
for i,(word,colour,track) in enumerate([("AFRICA",INK,4.2),("SME","#8A5E0E",6.0),("SUMMIT",INK,4.2)]):
    b+=(f'<text x="{W/2}" y="{204+i*30}" font-family="{FONT}" font-size="20" '
        f'font-weight="600" letter-spacing="{track}" fill="{colour}" '
        f'text-anchor="middle">{word}</text>')
write("map-stacked", svg(W,H,b))

# Tight crop: no transparent margin, so a CSS gap beside it means exactly
# what it says. Used for the header and footer lockups.
def build_tight(size, uid_extra=""):
    """Crop the viewBox to the RENDERED ink, not to the polygon bounds.

    Smoothing pulls the coastline inside its own vertices, so a viewBox
    derived from the points still leaves a few percent of empty space. That
    margin is invisible but it inflates any gap set beside the mark — a 20px
    CSS gap was rendering as 26px. Measuring the raster and trimming to it
    means a gap value finally means what it says."""
    import io, cairosvg
    from PIL import Image
    inner = build(size, uid_extra=uid_extra)
    probe = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" '
             f'viewBox="0 0 {size} {size}">{inner}</svg>')
    png = cairosvg.svg2png(bytestring=probe.encode(), output_width=600,
                           output_height=600, background_color=None)
    im = Image.open(io.BytesIO(png)).convert("RGBA"); px = im.load()
    minx, maxx, miny, maxy = 600, 0, 600, 0
    for y in range(600):
        for x in range(600):
            if px[x, y][3] > 12:
                minx=min(minx,x); maxx=max(maxx,x); miny=min(miny,y); maxy=max(maxy,y)
    k = size / 600.0
    vx, vy = minx*k, miny*k
    vw, vh = (maxx-minx+1)*k, (maxy-miny+1)*k
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{vw:.2f}" height="{vh:.2f}" '
            f'viewBox="{vx:.2f} {vy:.2f} {vw:.2f} {vh:.2f}">{inner}</svg>')

open(f"{OUT}/map-mark-tight.svg","w").write(build_tight(130, uid_extra="t"))
print("  map-mark-tight.svg")

# Flat single-colour fallback for embroidery, stamps and anything below 56px
P,_,_,_ = fit(AFRICA, 120)
write("map-solid-ink",   svg(120,120,f'<path d="{smooth(P,0.30)}" fill="{INK}"/>'))
write("map-solid-paper", svg(120,120,f'<path d="{smooth(P,0.30)}" fill="{PAPER}"/>'))
print("\nFour fields: enterprises, institutions, markets, growth.")
