import GlassNav from "@/components/GlassNav";
import { ACCELERATOR_SECTIONS } from "@/lib/event";

/**
 * HISTORY of the old full-width bar (superseded 28 October 2026, see
 * SiteHeader below). Kept as a record of how its row was measured.
 *
 * Background changed from bg-paper (the site's warm #FBF8F3 ivory, used
 * everywhere else) to a true bg-white 3 October 2026, at ICL's request to
 * read as a crisp, government-site-style white bar rather than blending
 * into the page's warm tone — referencing the Office of the Data
 * Protection Commissioner's site as the look to match. Scoped to this one
 * component: the warm paper tone is unchanged everywhere else on the site,
 * this is purely the header's own background.
 *
 * At lg and up, the `overlay` variant changed again the same day from a
 * full-width bar flush with the viewport's edges to an inset, rounded
 * floating bar — ICL's request once the hero became a full-bleed video
 * (components/HeroVideo.tsx): "a curved rectangle bar around the buttons,
 * hovering above the video", so the footage reads as visible on all four
 * sides of the nav rather than disappearing behind an edge-to-edge strip.
 * `overlay` is only ever passed by app/page.tsx (grep it — nowhere else
 * does), so this floating treatment is already scoped to the homepage with
 * no extra prop needed; every other page keeps the plain full-width bar.
 * Below lg this is untouched — still the plain full-width sticky bar it
 * already was, since an inset pill at phone width would eat into already
 * scarce side margin, and the .nav-float shadow (globals.css) is lg+ only
 * for the same reason. Corner radius reuses 1.25rem, the exact value
 * .panel-card/.keynote-frame already use for "lifted off the page"
 * surfaces elsewhere on this site, rather than introducing a third radius.
 */
/* Nine items — "SMEs" (/network) added 30 September 2026 for the new
   SME-showcase page, relabelled from "Network" on 1 October 2026 at ICL's
   (boss's) request when the page itself was redesigned. "Papers" (/papers)
   relabelled to "Academia" the same day, same request — the href is
   unchanged, still /papers, only the link text changed. "Providers"
   (/providers) added 1 October 2026, same request, for the new service
   providers directory.

   Reordered 2 October 2026 at ICL's (boss's) request: Exhibit now comes
   before Partner (was the other way round), and Providers moved from
   right after SMEs to right after Partner. Home, Press and Contact were
   not mentioned in that request and keep their existing positions — first
   and last two respectively.

   "Speakers" relabelled "Speakers & Panelists" and "Providers" relabelled
   "Service Provider" on 3 October 2026, at ICL's explicit request for
   these exact strings — hrefs unchanged (/speakers, /providers), this is
   display text only. This reopens a tradeoff flagged when "Providers" was
   first added: "Service Providers" was deliberately shortened back then
   because every other label was one short word and the longer name didn't
   fit; ICL's request this time names the exact, longer strings to use
   instead, so the row is now visibly uneven in label length — a known,
   requested tradeoff, not an oversight.

   That length increase is also what pushed the desktop/mobile switch from
   lg (1024px) — measured, not assumed, same as every change to this row
   before it. With the two longer labels and whitespace-nowrap (added the
   same day — without it the longer labels wrapped onto 2-3 lines inside
   their own link instead of widening the row, which is worse than what it
   replaced), the nine links plus lockup plus ticket button no longer fit
   at 1024 even after tightening this row's gaps and padding as far as they
   reasonably go — the floating pill treatment on the homepage (`overlay`,
   inset-x-8 on both sides) is the tightest case, and a real build at 1024
   still overflowed the header's own right edge by ~90px after tightening.
   CLAUDE.md's "nothing below 16px" rule rules out shrinking the text
   further to close that gap, and cramming gaps/padding any tighter started
   to look broken rather than merely cosy, so spacing was abandoned as the
   fix and the breakpoint itself moved instead.

   xl (1280px) was tried first, reusing a value this file already uses
   elsewhere (ticket button padding), on the theory that a named breakpoint
   is cleaner than a bespoke one — but with the full-width labels and
   generous spacing restored, a real build at 1280 still overflowed by
   ~115px (ticket button's right edge well past the header's own right
   edge on the homepage's floating pill). xl was not close enough to be a
   rounding choice; it was the wrong breakpoint outright.

   The actual natural-fit width was then found by force-rendering the nav
   at full width (bypassing its hidden/flex breakpoint class entirely) and
   measuring its unconstrained right edge against the header at a range of
   viewport widths, on the homepage (worst case, `overlay`'s inset-x-8
   floating pill) and confirmed on an interior page too. That put the bare
   minimum fit at ~1400px at the time. `min-[1440px]` was chosen as the
   first round number clear of that minimum, leaving about 32px of margin.

   "Accelerator" (/accelerator) was added 5 October 2026 at Mike's (ICL
   CEO's) request, between Partner and Service Provider — see NAV below —
   making this a ten-item row for the first time. Per the rule two
   paragraphs down, a tenth item gets the same re-measure an addition
   always does, not an assumption that 1440 still holds: a real build
   showed the homepage's natural zero-overflow point had moved out to
   ~1518px (worst case again — `overlay`'s inset-x-8 floating pill).
   min-[1440px] was no longer enough. `2xl` (1536px) was tried as the
   nearest named breakpoint and measured too tight against the new
   minimum — only ~18px of margin on the homepage, barely more than a
   rounding error. `min-[1560px]` — the next round number — was measured
   to give the same ~32px of margin this row has used as its standard
   buffer since the very first breakpoint move, on both the homepage and
   an interior page.

   Below min-[1560px], `nav` and MobileNav's hamburger now swap at the same
   breakpoint (both were `min-[1440px]:hidden`/`hidden min-[1440px]:flex`,
   both are now `min-[1560px]:hidden`/`hidden min-[1560px]:flex` — see
   components/MobileNav.tsx). The header's own shape — background, and the
   `overlay` variant's absolute/rounded/floating treatment — still switches
   at lg, unchanged: between 1024 and 1560 the homepage now shows the
   floating white pill with just the lockup, hamburger and ticket button
   inside it, which is a clean, intentional state, not a half-migrated one.
   --header-flow in globals.css is keyed to the header's own lg breakpoint,
   not to the nav's, so it did not need to change.

   The row is measured rather than assumed, every time an item is added,
   reordered OR relabelled — a reorder or relabel changes total width even
   when the item count doesn't, so it gets the same re-measure as an
   addition would. At the min-[1560px] breakpoint itself — now the
   tightest width this nav is ever shown at, since below it the whole nav
   collapses into MobileNav — the lockup, ten links and the ticket button
   were re-measured in a real build to confirm they still fit on one line
   with real margin (~32px) to spare. Adding an eleventh, or lengthening a
   label again, needs the same re-measure at 1560 now, not at 1024, 1280
   or 1440.

   13 October 2026, at ICL's (boss's) request: the Accelerator item moved
   from after Partner to after Academia (so: ... Service Provider,
   Academia, Jiinue Accelerator, Press, Contact), was relabelled from
   "Accelerator" to "Jiinue Accelerator" (the page itself is titled the
   full "Jiinue Business Accelerator" — the shorter nav label was chosen
   over the full name to limit how much the row grows), and gained a
   dropdown of its four sections (ACCELERATOR_SECTIONS in lib/event.ts),
   which adds a chevron beside the label. Both the longer label and the
   chevron widen the row, so it was re-measured, the same way as every
   earlier change: force-rendering the nav at widths from 1500 to 1780 in a
   real build and measuring the gap to the lockup and to the ticket button.
   At 1560 the row no longer fit (ticket button ~70px past the edge on the
   homepage's floating pill, the worst case, ~5px on an interior page); it
   first fits at ~1630 and reaches the usual ~32px of margin at 1660. So
   the switch moved from min-[1560px] to min-[1660px] — here and in
   MobileNav, which must stay in lockstep. From 1560 to 1660 the hamburger
   now shows instead of the full row. */
type NavLink = { label: string; href: string };
type NavEntry = NavLink & { children?: readonly NavLink[] };

const NAV: readonly NavEntry[] = [
  { label: "Home", href: "/" },
  { label: "Speakers & Panelists", href: "/speakers" },
  { label: "SMEs", href: "/network" },
  { label: "Exhibit", href: "/exhibit" },
  { label: "Partner", href: "/partner" },
  { label: "Service Provider", href: "/providers" },
  { label: "Academia", href: "/papers" },
  {
    label: "Jiinue Accelerator", href: "/accelerator",
    children: ACCELERATOR_SECTIONS.map((s) => ({ label: s.label, href: `/accelerator#${s.id}` })),
  },
  { label: "Recap", href: "/2026" },
  { label: "Contact", href: "/contact" },
];

/* One header for every page (28 October 2026, ICL: "the nav bar should be the
   same like the one in the home page for all the pages"): the floating glass
   panel from the homepage. On the homepage ("glass") it is translucent over
   the hero video; everywhere else it is held in its firmer, solid state from
   the first pixel, since the page behind it is not always dark. The old
   full-width bar with the logo and the ticket button is gone from every page;
   the long measuring history above describes it and is kept as a record. The
   panel is position:fixed, so pages leave room for it at the top. */
export default function SiteHeader({ current = "", variant = "default" }: {
  current?: string;
  variant?: "default" | "glass";
}) {
  return <GlassNav nav={NAV} current={current} solid={variant !== "glass"} />;
}
