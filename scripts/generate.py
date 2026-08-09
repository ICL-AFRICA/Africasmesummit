#!/usr/bin/env python3
"""Africa SME Summit — logo system.

THE IDEA
    Two halves meeting. The mark is a single diamond split down the middle
    by a narrow seam: the left half solid, the right half outlined. Industry
    and academia; capital and enterprise; the two sides the summit exists to
    put in one room.

    It is one shape, not an illustration, so it survives being stamped on a
    lanyard, embroidered on a polo, or rendered 16 pixels wide in a browser
    tab. The seam is the meaning and it is also the only detail — which is
    why it holds at small sizes where a more literal mark would fill in.

WHY A DIAMOND
    It is already the site's signature element (the gold node on the pairing
    rule), so the logo is not a new idea bolted on — it is the mark the
    design system was already implying.

OUTPUT
    logo-primary       horizontal lockup, for the site header and letterhead
    logo-stacked       for square placements and social avatars
    logo-mark          the diamond alone, for favicons and merchandise
    logo-mono-light    one colour, for dark backgrounds and single-colour print
    logo-mono-dark     one colour, for light backgrounds
"""

import os
import sys, pathlib

INK   = "#14113A"
GOLD  = "#C99A2E"
PAPER = "#FFFFFF"

# Output directory. Defaults to public/logo/ relative to the repo root, which
# is where these SVGs are served from; pass a path to write elsewhere (used to
# diff a regeneration against what is committed).
#
# This was previously an absolute path from the machine these were first
# written on, which meant they could not run anywhere else.
OUT = sys.argv[1] if len(sys.argv) > 1 else str(
    pathlib.Path(__file__).resolve().parent.parent / "public" / "logo")
os.makedirs(OUT, exist_ok=True)

# Geometry: a diamond of side S centred on (cx, cy), split by a seam of
# width `gap`. Halves are drawn separately so each can take its own fill.
def diamond_halves(cx, cy, r, gap):
    g = gap / 2
    left = f"M {cx-g} {cy-r} L {cx-r} {cy} L {cx-g} {cy+r} Z"
    right = f"M {cx+g} {cy-r} L {cx+r} {cy} L {cx+g} {cy+r} Z"
    return left, right


def mark(cx, cy, r, solid, outline, stroke_w=None, gap_ratio=0.07):
    """Left half solid, right half outlined. The asymmetry is deliberate —
    two identical halves would read as decoration; one filled and one open
    reads as two different things meeting."""
    gap = r * gap_ratio
    l, rt = diamond_halves(cx, cy, r, gap)
    sw = stroke_w if stroke_w is not None else r * 0.13
    return (
        f'<path d="{l}" fill="{solid}"/>'
        f'<path d="{rt}" fill="none" stroke="{outline}" stroke-width="{sw:.2f}" '
        f'stroke-linejoin="miter"/>'
    )


FONT = ("-apple-system, BlinkMacSystemFont, 'Archivo', 'Helvetica Neue', "
        "Arial, sans-serif")


def wordmark(x, y, size, colour, accent, anchor="start"):
    """AFRICA SME SUMMIT — 'SME' in the accent so the eye lands on the
    subject rather than the geography."""
    tracking = size * 0.085
    return (
        f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="600" letter-spacing="{tracking:.2f}" fill="{colour}" '
        f'text-anchor="{anchor}">AFRICA <tspan fill="{accent}">SME</tspan> SUMMIT</text>'
    )


def svg(w, h, body, bg=None):
    back = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">{back}{body}</svg>')


def write(name, content):
    with open(f"{OUT}/{name}.svg", "w") as f:
        f.write(content)
    print(f"  {name}.svg")


# ── primary: horizontal lockup ─────────────────────────────────────────
W, H = 420, 92
body = mark(46, H / 2, 26, GOLD, PAPER)
body += wordmark(92, H / 2 + 7, 21, PAPER, GOLD)
write("logo-primary", svg(W, H, body))

body = mark(46, H / 2, 26, GOLD, INK)
body += wordmark(92, H / 2 + 7, 21, INK, GOLD)
write("logo-primary-light", svg(W, H, body))

# ── stacked: square placements, avatars ────────────────────────────────
# Three lines, not two: "AFRICA SME" on one line is wide enough that any
# font substitution breaks the lockup. One word per line cannot.
W = H = 260
body = mark(W / 2, 92, 38, GOLD, PAPER)
for i, (word, colour, track) in enumerate([
        ("AFRICA", PAPER, 4.2), ("SME", GOLD, 6.0), ("SUMMIT", PAPER, 4.2)]):
    body += (f'<text x="{W/2}" y="{168 + i*30}" font-family="{FONT}" '
             f'font-size="20" font-weight="600" letter-spacing="{track}" '
             f'fill="{colour}" text-anchor="middle">{word}</text>')
write("logo-stacked", svg(W, H, body))

# ── mark alone ─────────────────────────────────────────────────────────
write("logo-mark", svg(120, 120, mark(60, 60, 46, GOLD, PAPER)))
write("logo-mark-light", svg(120, 120, mark(60, 60, 46, GOLD, INK)))

# ── single colour, for embroidery, stamps, one-colour print ────────────
W, H = 420, 92
body = mark(46, H / 2, 26, PAPER, PAPER)
body += wordmark(92, H / 2 + 7, 21, PAPER, PAPER)
write("logo-mono-light", svg(W, H, body))

body = mark(46, H / 2, 26, INK, INK)
body += wordmark(92, H / 2 + 7, 21, INK, INK)
write("logo-mono-dark", svg(W, H, body))

# ── favicon: thicker stroke and a wider seam so the idea survives 16px ──
write("logo-favicon", svg(64, 64,
      f'<rect width="64" height="64" fill="{INK}"/>' +
      mark(32, 32, 21, GOLD, PAPER, stroke_w=3.0, gap_ratio=0.10)))

print("\nAll marks are single-path geometry — no gradients, no effects,")
print("no raster. They scale from a favicon to a roll-up banner.")
