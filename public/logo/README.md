# Africa SME Summit — logo

## Two marks, one system

**The network mark** is the primary. The continent drawn as a network:
nodes across the landmass linked to their neighbours, with five gold hubs at
real cities — Nairobi largest, because that is where the summit is, then
Lagos, Cairo, Johannesburg and Accra.

It is a map of where the enterprises are and where they connect, with the
host city weighted. That specificity is what keeps it from being a generic
"Africa plus dots": the hubs are placed at actual coordinates, not
decoratively.

Be aware that Africa-built-from-a-network is a well-populated category in
African tech branding. The distinctiveness here comes from the execution —
nodes and links rather than branching strokes, two colours, and real city
positions — rather than from the idea.

**The solid split diamond** is a separate, simpler mark: one shape, two
halves, one filled and one outlined. It exists because the network stops
being legible below about 40px.

This is not indecision. A mark that carries meaning at poster size and a
mark that survives a 16px browser tab are different problems, and pretending
one shape solves both produces something that does neither well.

| Use | Mark |
|---|---|
| Posters, banners, decks, social cards, merchandise, anywhere it has room | `net-*` |
| Site header, favicon, app icon, embroidery, stamps, anything under ~48px | `logo-*` |

The site header uses the **solid** mark. It was built with the network one
first and the network turned to mush at 36px — which is exactly the rule
above, applied honestly rather than wishfully.

## On the reference

The uploaded reference by Mohammed Ismail (@misma) resolves a branching
network into the outline of Africa. That is his work and this is not a
version of it. What was taken is the principle — a network resolving into a
silhouette — applied to a shape this summit already owned from its own
design system.

## Files

**Network (primary)**

| File | Use |
|---|---|
| `net-primary.svg` | Horizontal lockup, dark backgrounds |
| `net-primary-light.svg` | Horizontal lockup, light backgrounds |
| `net-stacked.svg` | Square placements, social avatars |
| `net-mark.svg` | Mark alone, dark backgrounds |
| `net-mark-light.svg` | Mark alone, light backgrounds |
| `net-mark-mono-light.svg` | One colour, white |
| `net-mark-mono-dark.svg` | One colour, indigo |

**Solid (small sizes)**

| File | Use |
|---|---|
| `logo-primary.svg` / `logo-primary-light.svg` | Horizontal lockup |
| `logo-stacked.svg` | Square placements |
| `logo-mark.svg` / `logo-mark-light.svg` | Mark alone |
| `logo-mono-light.svg` / `logo-mono-dark.svg` | Single colour |
| `logo-favicon.svg` | Drawn heavier for 16px |

## Using it

**Clear space:** at least the height of the mark on every side.

**Minimum size:** network mark 40px, horizontal lockup 150px wide. Below
that switch to the solid set.

**Colour:** gold `#C99A2E`, indigo `#14113A`. Over photography use a mono
version on a dark area rather than the two-colour one.

**Do not** recolour, add shadows, stretch, rotate, or set the wordmark in a
different typeface.

## Regenerating

    python3 generate-network.py    # the network set
    python3 generate.py            # the solid set

Geometry is defined once in each, so changing the seam, the lattice density
or the colours propagates to every variant.

## Before sending to a printer

The wordmark references Archivo by name rather than being converted to
outlines. A machine without Archivo will substitute something wider. Open
the file and convert text to outlines before any print or merchandise order.

---

## A third option: the overlap mark (`map-*`)

Three translucent fields laid over each other, together forming the
continent. They are the three audiences the site already names —
enterprises, universities, and the institutions that serve them.

Where two fields overlap the colour deepens. Where all three overlap it is
darkest, and that patch sits in central Africa. That is the summit: the one
place all three are in the same room.

**On the palette.** The reference that prompted this uses primaries — blue,
red, yellow, green — which is a stock illustration decorating a shape. A
logo has to live beside the site, the poster and the banner, so this uses
gold, sky and clay from the campaign and lets the overlaps generate the
intermediate tones. Three inks, six apparent colours, no new palette.

**It is light-background only.** Multiply blending on indigo goes to mud.
There is no dark variant and there should not be one — use the solid mark
on dark.

| File | Use |
|---|---|
| `map-mark-light.svg` | Mark, transparent background |
| `map-mark.svg` | Mark on white |
| `map-primary-light.svg` | Horizontal lockup |
| `map-stacked-light.svg` | Stacked lockup |

**Minimum size 56px.** It degrades more gracefully than the node network —
the fields stay distinguishable where individual dots would have merged —
but the coastline detail is gone by 40px.

Regenerate with `python3 generate-overlap.py`.

---

## Three marks, one decision to make

There are now three directions in this folder, and the summit should ship
with one:

| | Idea | Strength | Weakness |
|---|---|---|---|
| `logo-*` | Split diamond | Most ownable, works at any size, cheapest to print | Abstract; says nothing about Africa |
| `net-*` | Continent as a node network, hubs at real cities | Specific — Nairobi weighted as host | Crowded category in African tech branding |
| `map-*` | Continent as three overlapping fields | Warmest; the overlap carries real meaning | Light backgrounds only; three-colour print costs more |

They are not meant to coexist. Pick one, and keep the split diamond as the
small-size fallback for favicons and embroidery whichever you choose.
