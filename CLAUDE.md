# Africa SME Summit

Marketing site for a one-day conference, Thursday 15 October 2026, University
of Nairobi. Next.js 15 static export, Tailwind v4, on Vercel. No database, no
server, no env vars.

## Stack and toolchain

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · deployed on
Vercel.

**Node 24, pinned in two places that do different jobs.** `.nvmrc` says `24`
and only tells a local version manager what to use — on its own it pins
nothing about a deploy. `engines.node` in `package.json` says `24.x` and **is
the one Vercel reads** (that, or the Node.js Version dropdown in Project
Settings). Change both together or they drift.

**`output: 'export'` is set** in `next.config.mjs`, alongside
`images: { unoptimized: true }` and `trailingSlash: true`. A migration off
static export is planned but **has not happened** — until it does, treat the
static constraints as real: no server at runtime, no runtime env vars, no
image optimisation, and security headers live in `vercel.json` because
`headers()` does nothing under `output: 'export'`.

## Brand tokens

Defined as CSS custom properties in the `@theme` block of `app/globals.css`.
`Marketing/AFRICA-SME-SUMMIT-BRAND.md` and `public/logo/BRAND.md` carry the
reasoning; these are the values.

| Token | Hex | |
|---|---|---|
| `--color-paper` | `#FBF8F3` | the page, warm off-white |
| `--color-ink` | `#191539` | body text and the dark fields |
| `--color-marigold` | `#E3A428` | enterprise — the ticket action |
| `--color-clay` | `#C6553F` | urgency and deadlines |
| `--color-indigo` | `#3F6FA8` | capital and institutions |
| `--color-palm` | `#4F9367` | growth — universities and research |

**Type is Archivo plus IBM Plex Mono**, matching the brand doc. `--font-sans`
is Archivo, `--font-mono` is IBM Plex Mono.

**But `--font-sans` declares "Archivo" and nothing ever loads it**, so every
heading and every paragraph on the site currently renders in `system-ui`. Only
IBM Plex Mono is actually served — vendored as four woff2 files in
`public/fonts/`, with `@font-face` rules at the top of `app/globals.css`. It is
deliberately NOT `next/font`: that fetches from Google at build time, which
made `npm run build` fail whenever the network was unavailable. Do not
reintroduce it. If Archivo should genuinely be loaded, that is a sitewide
typography change and needs a visual pass, not a one-line fix.

## Read before changing anything

- `README.md` — architecture, SEO, the hero animation, the ticker
- `SETUP.md` — deployment and the pre-launch checklist
- `public/logo/BRAND.md` — palette, type scale, logo spacing rules

## Rules that are not preferences

- **All content lives in `lib/event.ts`.** Never hardcode a date, price or
  name in a component.
- **`EARLY_BIRD_ENDS` is the single source for the deadline.** Every label,
  both countdowns and the schema.org offer derive from it. Never write the
  date anywhere else — the page this replaced drifted precisely that way.
- **`DATE_ISO` is the single source for the conference date.** Same rule,
  learned the hard way: when the summit moved from 30 September to 15
  October the date had to be hunted out of fifteen places. It now derives
  everywhere, including the search descriptions. Never type it again.
- **Nothing below 16px** except `.eyebrow` labels at 12px.
- **No muted greys and no opacity on text over dark backgrounds.** Hierarchy
  on dark comes from size and weight. On paper `#6E6884` is fine.
- **Rotate the four brand colours.** None is "the brand colour". Clay red is
  reserved for the early-bird deadline, so red always means time is running out.
- **The ticket action always reads "Get a ticket — KES 5,800"**, every page,
  every section. The nav is the one exception, for space at 390px.
- **Track anchors are positional, not slug-based.** `/tracks` renders
  `#track-1` … `#track-6` from the array index, so **reordering `TRACKS`
  silently repoints every inbound link** — including any live paid ad or
  printed QR code pointing at a track. Reorder only with the links updated in
  the same commit.
- **A track finds its speakers by exact string match** — `t.name === s.topic`.
  There is no fuzzy matching and no second mapping to keep in sync, which is
  the point; it also means renaming a track without changing the matching
  `topic` values silently empties its speaker list. This has already bitten
  once: `"Kenya Entrepreneurship Ecosystem"` against a track named
  `"…Ecosystem strengthening"`.
- **`trailingSlash: true`**, so internal links emit with the slash before the
  hash — `/tracks/#track-4`, not `/tracks#track-4`. Worth knowing when
  grepping the built HTML for a link, or writing a redirect.
- **`npm run build` must pass before committing.**

## How to work here

**Never answer from memory — audit the file.** Memory of this repo goes stale
between sessions, and a confident wrong answer about what `lib/event.ts`
contains is worse than no answer. Memory tells you what to check; it does not
tell you what is true. Grep it, read it, then say it.

**When verification surprises you, stop and surface options.** Not when
something fails — when it *passes in a different shape* than the instruction
assumed. The wrong move is picking the closest-fit path and continuing, which
hides the gap so nobody sees the assumption was wrong. State the mismatch,
give two or three paths with honest tradeoffs, recommend one, wait.

**Build green does not mean it works.** `npm run build` proves it compiles and
exports. It proves nothing about what a person sees. Anything touching a form,
the countdown, the ticker or the hero animation gets opened in a browser and
exercised before it ships. Both bugs this site has produced — the truncated
ticker string and the dead lint script — were invisible to a passing build.

**One concern per commit.** A change is N commits, not one. When something
breaks in six weeks you want `git bisect` landing on twenty lines, not four
hundred. If you find something broken that is out of scope, say so and leave
it — do not fix it in passing.

## Outstanding — needs someone other than Claude

- **Sponsorship tier inclusions are drafts.** Tier names and prices are
  verified against the live TikoHub listing; the `includes` bullets are not
  from a rate card. `/partner` marks them indicative via
  `SPONSOR_INCLUDES_NOTE` until the real sponsorship document arrives —
  delete that note when it does.
- **No Standard Delegate Pass exists on TikoHub yet** — see `SETUP.md`.
