# Africa SME Summit — africasmesummit.com

Static marketing site for the SMEs Conference, 30 September 2026,
University of Nairobi.

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

- [ ] Speaker headshots — replace the PHOTO wells in `app/page.tsx`
- [ ] Partner logos — currently set as text in `lib/event.ts`
- [ ] Confirmed agenda — `AGENDA` is indicative, marked as such on the page
- [ ] Photos from a previous ICL conference (social proof section)
- [ ] 301 redirect from ichooselife.global/sustainable-business-summit

## Design notes

Palette derives from the printed poster so web and print read as one
campaign. Clay red (`--color-clay`) is used **only** for the early-bird
deadline — nothing else on the site is red, so red always means time is
running out.

The signature element is the pairing rule: a hairline broken by a gold
diamond, used only where the page joins the two sides of the summit's
thesis — 7.4M enterprises and 13 universities. It is not decoration and
should not be used on single items.

## Pages

- `/` — the landing page
- `/speakers` — full profiles with biographies

The homepage carries the speaker wall but no biographies. That is
deliberate: every paragraph between the hero and the ticket block delays
the decision, and five bios would add roughly a screen and a half. Anyone
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

The `bio` field on each speaker in `lib/event.ts` is a **draft written only
from that person's stated role and organisation**. Nothing in them is
researched biography and nothing should be treated as fact about a named
individual.

Send each speaker their own line and replace it with what they send back.
This is the one item in the repo that must not ship unreviewed.

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
