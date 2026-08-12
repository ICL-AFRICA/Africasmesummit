# Africa SME Summit

Marketing site for a one-day conference, 30 September 2026, University of
Nairobi. Next.js 15 static export, Tailwind v4, on Vercel. No database, no
server, no env vars.

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
- **Nothing below 16px** except `.eyebrow` labels at 12px.
- **No muted greys and no opacity on text over dark backgrounds.** Hierarchy
  on dark comes from size and weight. On paper `#6E6884` is fine.
- **Rotate the four brand colours.** None is "the brand colour". Clay red is
  reserved for the early-bird deadline, so red always means time is running out.
- **The ticket action always reads "Get a ticket — KES 5,800"**, every page,
  every section. The nav is the one exception, for space at 390px.
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

- **Sponsorship tier inclusions are drafts.** Names and prices are real.
- **No Standard Delegate Pass exists on TikoHub yet** — see `SETUP.md`.
