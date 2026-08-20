# Africa SME Summit — africasmesummit.com

Static marketing site for the SMEs Conference, Thursday 15 October 2026,
University of Nairobi.

The date lives in exactly one place — `DATE_ISO` in `lib/event.ts`. Every
label, heading, search description and the schema.org start and end times
derive from it. It moved from 30 September once already; do not type a date
anywhere else.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · static export.

Partly shared with JuaPath — React 19, TypeScript and Tailwind carry over,
so components and styling read the same. The framework does not: JuaPath is
Vite + React Router + shadcn/ui, this is Next.js App Router. Routing, the
bundler, the build output and the deploy config are all different, so do not
carry assumptions across on any of those.

`output: 'export'` means `npm run build` emits plain HTML to `out/`. There is
no server at runtime — the whole site is files on a CDN, which is what
actually survives a traffic spike when the link goes out to a newsletter.
Only the countdown, the forms and the mobile menu ship JavaScript.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static HTML in ./out
```

## Deploy

Vercel: import the repo, framework preset Next.js, no env vars needed.
Point africasmesummit.com at it. Any static host works — `out/` is portable.

Node 24, pinned in two places because they do different jobs. **`engines.node`
in `package.json` is the one that reaches Vercel** — Vercel reads that (or the
Node.js Version dropdown in Project Settings), and does not read `.nvmrc`.
`.nvmrc` only tells a local version manager which version to use, so on its
own it pins nothing about a deploy. Change both together or they drift.

### Security headers

`vercel.json` sets four: HSTS, `X-Frame-Options: DENY`, `nosniff` and a
referrer policy. They are in `vercel.json` rather than `next.config.mjs`
because `headers()` is a server feature and does nothing under
`output: 'export'`.

The set is adapted from JuaPath's. Four of its rules were deliberately
dropped, because a static brochure site is not an authenticated SPA:

- **The SPA rewrite** (everything → `/index.html`). JuaPath is client-routed
  and needs it. This site has real HTML per route; the rewrite would serve
  the wrong page.
- **`Cache-Control: no-store` on HTML.** Correct for a logged-in app showing
  per-user data. Here it would defeat the CDN caching that is the entire
  reason this is a static export.
- **The CSP.** JuaPath's enumerates Supabase, Google Analytics and
  ElevenLabs. None exist here, and a copied allowlist is worse than none —
  it looks reviewed without being true. Worth writing from scratch later.
- **HSTS `preload`.** The header alone does nothing until you submit the
  domain at hstspreload.org, and removal takes months. `max-age` plus
  `includeSubDomains` gives the protection without the one-way door. Add
  `preload` if you deliberately choose to submit.

`vercel.json` is strict JSON — no comments, and Vercel rejects unknown
top-level keys, so this is the note that would otherwise sit in the file.

## Editing content

**Everything is in `lib/event.ts`.** Dates, prices, speakers, tracks, agenda,
FAQ, partners. Change a value there and it updates everywhere on the page.

This exists because the old ICL page drifted: three event names, two
early-bird dates, tracks worded differently from the poster. One file
prevents that.

The early bird deadline is `EARLY_BIRD_ENDS`. When it passes, the countdown
swaps itself for the standard-rate message automatically — no code change
needed on the day. See [Dates](#dates) for the current value and what derives
from it.

## Still to add

- [ ] Sharper originals for `speaker-1` to `speaker-5`. All seven headshots
      are in place; those five are flyer extracts and soft on a retina
      screen. `speaker-6` and `speaker-7` are supplied originals and need
      nothing. Tracked with the rest of the launch work in `SETUP.md`.
- [ ] Confirmed agenda. `AGENDA` is the real running order transcribed from
      "SME Conference Program - 14.08.2026", but nobody has called it final,
      so the page says "Programme as at 14 August 2026. Times may still
      move." Confirm it and that line comes off.
- [ ] Photography from a previous ICL conference to replace
      `public/img/floor.jpg`, the placeholder sitting behind the closing
      section at 25% opacity
- [ ] 301 redirect from ichooselife.global/sustainable-business-summit

## Working documents

Drafts that need a person rather than a commit. They live in the repo so the
open questions travel with the code instead of sitting in someone's inbox.

- `docs/email-to-mike.md` — the four open items needing Mike's decision:
  the Standard Delegate Pass on TikoHub, the sponsorship and booth
  inclusions, and original headshots for five speakers. **Sent 12 August
  2026**; record his answers under each item as they come back.
- `docs/privacy-review-notes.md` — a technical audit of what the site
  actually does, set against what `/privacy` claims, for ICL to review and
  sign off. Includes eight questions only ICL can answer.
- `docs/logo.md` — how the mark is built.

`SETUP.md` holds the launch checklist these feed.

## Design notes

Palette derives from the printed poster so web and print read as one
campaign. Clay red (`--color-clay`) is used **only** for the early-bird
deadline — nothing else on the site is red, so red always means time is
running out.

The signature element is the pairing rule: a hairline broken by a gold
diamond, used only where the page joins the two sides of the summit's
thesis — 7.4M enterprises and 13 universities. It is not decoration and
should not be used on single items.

## Partner logos

Nine logos, from nine sources, in four file formats, with aspect ratios from
5.6:1 (the Mount Kenya wordmark) to 0.83:1 (the Nairobi crest). Dropped into a
grid as supplied they look like nine unrelated screenshots. `PARTNERS` in
`lib/event.ts` carries the name and the file; the files are built by
`scripts/build-partner-logos.py`.

What that script does, and why each step is there:

- **Knocks out the background by flood-filling inward from the edges**, not by
  replacing white globally. Four of the nine arrived as JPEG or flat PNG on
  white. A global white-to-transparent rule would have punched holes through
  the gaps in the Access sunburst and the counters of the ASSEK letterforms.
- **Trims using a bounding box that holds 99.9% of the ink mass**, rather than
  the outright extremes, so a stray compression speck at the edge does not
  inflate the box and shrink the logo.
- **Deletes sliver components** — anything at most 6px on its short side and
  at least 50px on its long one. It was written for a 6×552 scan line down
  the edge of the old Zetech JPEG, which survived everything else; since
  Zetech supplied a clean PNG the rule fires on nothing and is kept as a
  guard for the next scanned source. This is deliberately a *shape* rule
  and not a size one: ASSEK has 604 separate components and Mount Kenya keeps
  40% of its ink in small ones, so any "drop small parts" threshold would eat
  real logo.
- **Scales each to equal optical _area_, not equal height.** Matching heights
  is the usual mistake and it makes a wide wordmark tower over a crest.
- **Centres everything on one shared 400×192 canvas**, so all nine files are
  the same size, one CSS rule sizes them, and the balance holds at every
  breakpoint.

To replace one: drop the new file in at 400×192 with transparency and nothing
else changes. To rebuild from new originals:

```bash
python3 scripts/build-partner-logos.py ~/path/to/originals
```

It writes a `_sheet.png` contact sheet next to the output — look at that
before shipping, because the optical balance is a judgement call and the ink
statistics it prints do not capture it.

The originals are not in the repo; they are third-party brand assets. The
filenames the script expects are listed in it.

**Left in full colour deliberately.** The speaker wall is greyscale with
colour on hover, and the same treatment would unify these nine more strongly
— but partner marks are often governed by someone else's brand rules, and
desaturating a government coat of arms is not a call to make unilaterally. If
you want it, it is one `grayscale` class on the `img`, matching `.portrait`.

**One is as good as its source allows, not as good as it should be.**
The University of Nairobi crest came as a 250×302 GIF, near its native
resolution already, so it softens on a retina screen. Ask for an SVG or a
large PNG.

Zetech was the other one and is now fixed: the university supplied the
vertical RGB lockup at 1224×1193 with real alpha. It is a taller shape than
the JPEG it replaced, so it clamps on height rather than reaching the ink
target — it sits second-lightest in the row, above Mount Kenya. The overall
spread is unchanged at 2.32×, which is set by Mount Kenya and the Kenyan coat
of arms, not by Zetech.

## Pages

- `/` — the landing page
- `/speakers` — full profiles with biographies

The homepage carries the speaker wall but no biographies. That is
deliberate: every paragraph between the hero and the ticket block delays
the decision, and seven bios would add several screens. Anyone
who wants depth clicks through; anyone who wants a ticket is not slowed
down.

## Calls to action

All buttons route through `components/Btn.tsx`. Four tones — `primary`,
`outline`, `onDark`, `gold` — and the ticket action is always `gold` and
always reads **"Get a ticket — KES 5,800"**, on every page and in every
section. Changing the label in one place and not the others is the most
common way a landing page starts feeling untrustworthy.

The nav button reads "Get ticket" rather than the full label, purely
because of the space available at 390px.

## Speaker biographies — read before launch

`bio` is an **array of paragraphs**, and each speaker carries a `draft` flag.

All seven are supplied biographies, reproduced verbatim from
`Marketing/speaker-bios-cleaned.md` and marked `draft: false`. They are
someone's own words about themselves — do not copy-edit them, including the
American spellings, without asking that person first.

The flag stays even though nothing is currently `true`. It records whether a
line is that person's own words or something written for them. **A speaker
added later with a bio drafted from a job title must be marked
`draft: true`** and approved by that person before launch — nothing
published may assert biography about a named individual who has not signed
it off. That is the one rule here that must not be quietly dropped.

## Speaker photographs

`PHOTOS.speakers` in `lib/event.ts` is **positional — index N is `SPEAKERS[N]`**.
Adding a speaker without adding a photo at the matching index puts the wrong
face under a person's name, so the two always change together.

All seven are 800x1000. `speaker-1` to `speaker-5` are flyer extracts and are
softer than they should be; ask those five for their originals. `speaker-6`
and `speaker-7` are supplied originals, cropped to 4:5 by
`scripts/build-speaker-headshots.py` — crop boxes are hand-set per photograph
and are exactly 800x1000, so neither image is resampled. The sources live
outside the repo; the script prints what it did and refuses a crop that falls
outside the source.

## Site map

| Route | Purpose |
|---|---|
| `/` | Landing page — hero, speakers, paths, agenda, tracks, tickets, FAQ |
| `/speakers` | Full profiles with biographies |
| `/partner` | Sponsorship tiers + enquiry form |
| `/exhibit` | Stand options + reservation form |
| `/papers` | Call for papers + abstract submission |
| `/contact` | Everything else, including group bookings |
| `/privacy` | Required before running Google or Meta ads |
| `404` | Custom, with routes out |

Tickets are the only external destination — they go to the ticketing
provider set in `EVENT.ticketUrl`.

## Forms

Set `FORM_ENDPOINT` in `lib/event.ts` before launch. Create a form at
Formspree, Tally or Basin and paste the endpoint.

Until it is set, forms fall back to opening a pre-filled email, so nothing
is a dead end — but you lose roughly half the people who would otherwise
have submitted, and you get no record.

Every form includes a honeypot field for bots.

## No dead ends

`npm run build` then run the link crawler in the repo history: it walks
every built page and fails on a broken link or a missing anchor. Current
state: zero broken links, zero missing anchors. The only `mailto:` left is
the direct email address offered alongside each form, which is a choice
rather than a fallback.

Below 1024px the top nav is replaced by a hamburger opening a full-screen
panel — see `components/MobileNav.tsx`. Before that existed, the five inner
pages were reachable on a phone only by scrolling to the footer, which this
file previously described as sufficient. It was not: a nav that requires
scrolling past the entire page is not navigation.

The ticket button stays in the bar at every width and is never behind the
menu. Someone who arrived ready to buy should not have to open a menu to
find the thing they came for.

The header is `sticky top-0` below lg and static at lg and up. On a phone it
is the only persistent ticket CTA there is — the early-bird bar scrolls away
and the floating ticker is desktop-only — so before this, a phone had a buy
button at the very top of the document and nowhere else. At lg the ticker
already does that job.

The bar does not stick. Two pinned elements cost about a fifth of a 390×780
screen, and one urgency mechanism per screen is the rule. It scrolls away
under the header.

Because a sticky header sits in the flow, it pushes the homepage hero down by
its own height. `--header-flow` in `globals.css` carries that height and the
hero subtracts it, so the headline lands where it always did. Remeasure it if
the mark size or the header padding changes.

## Dates

`EARLY_BIRD_ENDS` in `lib/event.ts` is the only place the deadline is
written. `EARLY_BIRD_LABEL` and `STANDARD_FROM` derive from it, and the
countdown, the sticky bar, the pricing notes, the pricing headline and the
schema.org offer all read from those.

Change the constant and every one of them follows. This is deliberate: the
page it replaces drifted out of sync precisely because the same date was
typed in several places.

Current value: **31 August 2026, 23:59 EAT** — matching the printed flyer.

## The hero animation

Three (four on desktop) columns of photography drifting past at different
speeds, duotoned into the indigo.

**Motion decisions, and why:**

- **CSS transforms only.** No JavaScript, no scroll listeners, no library.
  The entire animation is `translate3d` on four elements, which the
  compositor runs on its own thread — it cannot jank the page and it adds
  nothing to the bundle.
- **Slow: 78–110 seconds per cycle.** Fast movement behind a headline is a
  legibility problem and a nausea problem. At this speed the page reads as
  alive rather than busy, and nobody ever watches a loop complete.
- **Different speeds, alternating direction.** Parallax feel without
  coupling anything to scroll position.
- **`prefers-reduced-motion` stops it dead** and leaves a static mosaic. Not
  optional — a moving background is among the worst offenders for
  vestibular disorders.
- **Seamless loop with no extra bytes.** Each column's list renders twice and
  the transform runs to exactly -50%; the duplicate `<img>` tags reuse the
  same cached file.
- **Two columns on a phone, three at 640px, four at 1024px.** Three columns
  at 390px is visual noise.

**Weight:** 16 WebP images, 438 KB total, sized to what actually renders
rather than to the source files. The first two of each column load eagerly;
the rest are lazy. This audience is on mobile data.

**Photography:** stock images of East African enterprises, chosen to look
like the delegates rather than like a stock library. Three uploaded images
were deliberately excluded — one was a café in Budapest (Hungarian menu
board) and two were European florist studio shots. Replace all of these with
photography from last year's conference when it exists.

## SEO

Audited against the built HTML rather than the source. Current state:

| Check | Status |
|---|---|
| Unique title + description per page | 7/7, all within snippet limits |
| Exactly one `<h1>` per page | 7/7 |
| Canonical URL | 7/7 |
| Open Graph + Twitter card with image | 7/7 |
| `sitemap.xml` | present, 7 URLs |
| `robots.txt` | present, points at the sitemap |
| Favicon + Apple touch icon | present |
| `BusinessEvent` structured data | start/end times, venue, offer, 5 performers |
| `FAQPage` structured data | 7 questions |
| Images missing `alt` | none |

**Why the structured data matters more than the copy here.** A dated event
is eligible for Google's event results — a card with the date, venue and
ticket price directly in the search listing. That needs `BusinessEvent`
with a valid `offers` block. The `FAQPage` block makes the seven homepage
questions eligible for expandable rich results.

**What the `offers` block actually derives, and what that does not buy you.**
This paragraph previously said the block was wired to `EARLY_BIRD_ENDS` so
the advertised price window is never stale. That was only ever half true:
`validThrough` was derived, but the price itself was the literal string
`"5800"` typed into `app/layout.tsx`. Google was being handed a hardcoded
number next to a derived date.

`price`, `priceCurrency` and `validThrough` now all derive from the active
tier in `lib/event.ts`, alongside the ticket buttons and the meta
description, so nothing can disagree with anything else.

Derived is not the same as live. The site is a static export, so the tier is
chosen when the site is **built**. The deadline passing does not change HTML
already on the CDN — see the 1 September item in `SETUP.md`. Until the site
is rebuilt after the deadline, the structured data keeps advertising the
early-bird price, and it will be as wrong as everything else on the page.
Wrong in one place rather than several is the improvement here; it is not
self-healing.

**The OG image (`public/og.jpg`) is generated, not hand-made.** Regenerate
it if the headline or date changes. It matters more than usual here:
WhatsApp is how a Kenyan conference link actually travels, and without an
OG image a share renders as a bare grey box.

**Still worth doing after launch:**

- Submit the sitemap in Google Search Console
- 301 the old ICL page — two live pages competing for the same query is
  the single biggest ranking risk, and the old one has more history
- Replace `performer` names with each speaker's approved biography once
  those come back

## Prices

Every price on the site comes from the live TikoHub listing at
`EVENT.ticketUrl`, so the two never disagree:

| | |
|---|---|
| Early bird delegate | KES 5,800 (until the [early-bird deadline](#dates)) |
| Standard delegate | KES 6,800 |
| Student, with ID | KES 2,000 |
| Papers call ticket | KES 6,800 |
| Startup exhibition booth | KES 30,000 |
| Corporate exhibition booth | KES 50,000 |
| Bronze / Silver / Gold / Platinum | 125k / 250k / 500k / 1M |

Everything is bookable directly — booths and sponsorship packages no longer
sit behind an enquiry form. Someone ready to spend KES 30,000 on a booth
should not have to email and wait two days.

**Two things needing attention:**

1. **There is no Standard Delegate Pass on TikoHub.** The flyer and this
   site both promise KES 6,800 from 1 September; the only 6,800 item is the
   Papers Call ticket. Create it before the [early-bird deadline](#dates).
2. **The sponsorship `includes` bullets are drafts.** Names and prices are
   real; the inclusion lists were written to be plausible. A sponsor paying
   KES 1,000,000 will expect every line, so confirm them with Mike.

## The early-bird ticker

One urgency mechanism per screen, never two at once. Which one depends on
the space available:

| | Homepage | Inner pages |
|---|---|---|
| Desktop | floating ticker, bottom right | top bar |
| Mobile | top bar | top bar |

`components/TicketTicker.tsx` is **desktop only**. On a phone a floating card
covers a third of the viewport and competes with the content it is trying to
sell; the top bar does the same job in 48px.

**The ticker is also homepage-only, and that is deliberate — considered and
rejected, not an oversight.** `PageShell` does not include it, so on a
desktop inner page, once the top bar has scrolled away there is no CTA
fixed to the screen. That is not the same gap as the phone one that produced
the sticky header, and it does not want the same fix. The seven `PageShell`
pages are short, they are reached deliberately rather than landed on cold,
and each one already ends with a ticket button. Putting a dismissible
floating card on all seven would solve a problem they do not have and add an
element someone has to close on every page. Please do not re-add it as a
bug fix.

The two carry different copy, because they have different space. The bar on
a phone reads `KES 5,800 · 22d left` — the price and the urgency, nothing
truncated. On desktop it reads the full sentence. Fitting one string into
both was what produced `Early bird — KES 5,80…`.

Three behaviours worth knowing:

- **It waits 1.4s before appearing.** Arriving with the hero fights the first
  impression; arriving just after reads as an offer rather than an
  interruption.
- **Dismissal is remembered** in `localStorage` under `asm-ticker-dismissed`.
  Being asked to close the same thing on every page is what makes these
  hated. Clear that key to see it again while testing.
- **It removes itself when the deadline passes** rather than showing zeros.
  Nothing to change on the day — see [Dates](#dates).
