# Africa SME Summit — brand

## The palette

Four colours, equal weight, plus an ink and a paper.

| | Field | Text-safe | Use |
|---|---|---|---|
| **Marigold** | `#E3A428` | `#8A5E0E` | Enterprise. The primary accent, and the ticket action |
| **Clay** | `#C6553F` | `#A33C28` | Craft and market. Urgency, deadlines |
| **Indigo** | `#3F6FA8` | `#2E5382` | Capital and institutions |
| **Palm** | `#4F9367` | `#2F6B47` | Growth. Universities and research |
| **Ink** | `#191539` | — | All body text and dark fields |
| **Paper** | `#FBF8F3` | — | The page |

## Why these four, and why they work

Google's palette is the reference, but copying its colours would have been
the wrong lesson. What makes it work is structural:

**The four hues sit far apart but at similar weight.** Google's are at 5°,
45°, 145° and 217° — gaps of 40, 100 and 72 degrees. Ours are at 10°, 40°,
141° and 213° — gaps of 30, 101 and 72. Near-identical architecture. That
even spacing is why no single colour dominates and the set reads as a group.

**Equal weight means no hierarchy.** None of the four is "the brand colour"
with three assistants. They are peers. For a summit whose entire premise is
that four constituencies matter equally, that is the point rather than a
stylistic preference.

**Saturated, not tasteful.** Google's palette feels human because it does
not apologise. Ours is pulled slightly warmer and slightly down in
saturation — enough to read as considered rather than childlike, not so far
that it becomes another muted consultancy palette.

## Why it feels like a community

Three deliberate choices:

**Warm-dominant.** Three of the four are warm; only indigo is cool. A
cool-dominant palette reads institutional. A warm one reads like people.

**Earth-derived rather than screen-derived.** Marigold, clay and palm are
pigment names, not RGB names. They come from markets, from soil, from
things that are made by hand. Indigo is the one that carries the
institutional weight, and it is outnumbered three to one — which is roughly
the ratio in the room.

**They overlap.** The logo works by laying these fields over one another so
the intersections produce new colours. A palette where the colours combine
into more colours is, quite literally, a picture of a community. A palette
of four isolated swatches is a picture of four organisations.

## Using it

**Rotate, do not rank.** Sections, tracks and cards take different colours
in sequence. The moment one colour becomes "the brand colour" and the rest
become decoration, the idea collapses.

**Field colours are for fields.** Marigold at `#E3A428` is 2.06:1 on paper —
fine as a large area, unreadable as text. Every colour has a darker
text-safe variant, and text always uses that.

**One accent at a time.** A card takes one colour, not two. The mixing
happens in the logo, not in the interface.

**Paper is the default.** The page is warm off-white with generous space and
colour used sparingly. That is also how Google's own products use their
palette: the colours are the mark, not the wallpaper.

## What changes on the site

The site was indigo-dominant. It becomes paper-dominant with ink text, which:

- lets the overlap logo work — it needs a light background, multiply
  blending on indigo goes to mud
- feels more open and less corporate, which is the community brief
- keeps the dark treatment for the hero and the closing section, so the
  photography still has weight

The hero stays dark. Photography of people at work is stronger against ink
than against paper, and it gives the page somewhere to breathe out.

## The lockup

**8px between the mark and the name.** Use `map-mark-tight.svg` for this, not
`map-mark.svg`.

The reason: smoothing pulls the coastline inside its own vertices, so a
viewBox derived from the outline still carries a few percent of invisible
margin. That margin inflated the gap — a 20px CSS value was rendering as
26px. The tight variant is cropped to the measured ink, so a gap value means
what it says. Verified at 7px rendered against an 8px declaration.

**Mark on the left, name stacked in three lines beside it.** That is the
primary arrangement everywhere: header, footer, print, slides.

Stacking the name is what makes it work. One long line has to shrink to fit
a header bar; three short lines each sit at a readable size, and the block
squares up against the mark instead of trailing off beside it.

`map-lockup.svg` is the single-file version for print and slides.
`map-stacked.svg` centres the same three lines under the mark, for square
placements and social avatars.

**The mark and the name are separate, not one file.** Locking them into a
single SVG means shrinking the whole thing to fit a header, which drops the
wordmark to about 7px and makes it unreadable.

So the mark is an image and the name is live HTML text:

- the two are sized independently
- the name stays crisp at any zoom and on any screen
- it is selectable, searchable and readable by a screen reader
- on a phone the name stacks to two lines rather than shrinking

Minimum sizes: mark 44px, name 15px with 0.14em tracking. Below that use
`map-solid-ink.svg` with no wordmark at all.

The `map-primary.svg` and `map-stacked.svg` files still exist as single-file
lockups for print, slides and anywhere the size is fixed and generous.

## Type sizes

**Nothing that forms a sentence goes below 16px.** Only tracked uppercase
labels sit smaller, and they are 12px, not 10.

Before this pass, 74 of 82 size declarations on the site were under 16px —
mostly 13 and 14. That is a common failure and it is worst in reversed type,
where thin light strokes on a dark field lose more than dark-on-light does.

| | Size |
|---|---|
| Body, list items, card copy, form labels | 16px |
| Lede paragraphs | 17–18px |
| Tracked uppercase labels (`.eyebrow`) | 12px |
| Line height for body | 1.65 |

## No muted text on dark. Ever.

There is no grey and no opacity on reversed type anywhere on the site. Every
word on an ink background is solid white.

This started as a contrast problem and turned out to be a method problem.
Fading text to 70% or reaching for a grey is how hierarchy is usually built
on light backgrounds, and it does not transfer: thin light strokes on a dark
field lose far more than dark strokes on a light one, and the maths hides
it — the muted grey passed AA at 7.2:1 and still read washed out.

**Hierarchy on dark comes from size and weight instead.** The speaker cards
show the pattern: name at 22px, role at 16px light, organisation at 16px
semibold — three clear levels, one colour.

On paper the muted grey `#6E6884` is fine and still in use. The rule is
specific to reversed type.

## Other organisations' marks are not ours to restyle

**Partner logos on the site stay in full colour. This was considered and
rejected, not overlooked — please do not "fix" it.**

The site desaturates photography on purpose. Speaker portraits render
greyscale and return to colour on hover, and the hero mosaic is duotoned into
the ink. That rule does real work: five headshots arriving from five sources
at five different qualities look deliberate in one tone rather than mismatched.

The nine partner logos are exactly the same shape of problem — nine sources,
three file formats, wildly different colour temperature — so the same
treatment is the obvious next step. It is still the wrong one, for a reason
that has nothing to do with how it looks.

**The duotone rule applies to photography we control.** We commissioned it or
licensed it, and how it is graded is our call. A partner's logo is their
asset, governed by their brand guidelines, and a great many of those
guidelines prohibit recolouring, tinting or desaturating the mark outright.
Applying a house treatment to someone else's identity is not a style choice
we get to make on their behalf.

That goes double for the Government of Kenya coat of arms. It is a state
emblem, its use is a matter of permission rather than taste, and desaturating
it to tidy up a logo wall is not ours to do.

So the wall is slightly louder than the rest of the page, and that is the
correct trade. The consistency was bought elsewhere instead — every logo is
scaled to equal optical area on a shared canvas, which is what actually makes
a mixed set read as a group. Colour was never the thing doing that work.

If a specific partner tells us in writing that a mono treatment is fine, treat
that as applying to their mark alone. It is not a precedent for the wall.
