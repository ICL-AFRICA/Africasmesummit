import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { EVENT } from "@/lib/event";

/**
 * One header for every page. `overlay` floats it over the homepage hero
 * video; everywhere else it sits on the indigo with a hairline under it.
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
   minimum fit at ~1400px (essentially flush, ~5px of overflow still at
   1400 itself). `min-[1440px]` — a bespoke Tailwind arbitrary-value
   breakpoint — was chosen as the first round number clear of that
   minimum, leaving about 32px of margin rather than sitting flush against
   it; `2xl` (1536px) was rejected as an unnecessarily large compromise
   that would hide the full nav on a wider range of ordinary desktop
   widths (1440–1535px) than the measured minimum requires.

   Below min-[1440px], `nav` and MobileNav's hamburger now swap at the same
   breakpoint (both were `lg:hidden`/`hidden lg:flex`, both are now
   `min-[1440px]:hidden`/`hidden min-[1440px]:flex` — see
   components/MobileNav.tsx). The header's own shape — background, and the
   `overlay` variant's absolute/rounded/floating treatment — still switches
   at lg, unchanged: between 1024 and 1440 the homepage now shows the
   floating white pill with just the lockup, hamburger and ticket button
   inside it, which is a clean, intentional state, not a half-migrated one.
   --header-flow in globals.css is keyed to the header's own lg breakpoint,
   not to the nav's, so it did not need to change.

   The row is measured rather than assumed, every time an item is added,
   reordered OR relabelled — a reorder or relabel changes total width even
   when the item count doesn't, so it gets the same re-measure as an
   addition would. At the min-[1440px] breakpoint itself — now the
   tightest width this nav is ever shown at, since below it the whole nav
   collapses into MobileNav — the lockup, nine links and the ticket button
   were re-measured in a real build to confirm they still fit on one line
   with real margin (~32px) to spare. Adding a tenth, or lengthening a
   label again, needs the same re-measure at 1440 now, not at 1024 or
   1280. */
const NAV = [
  { label: "Home", href: "/" },
  { label: "Speakers & Panelists", href: "/speakers" },
  { label: "SMEs", href: "/network" },
  { label: "Exhibit", href: "/exhibit" },
  { label: "Partner", href: "/partner" },
  { label: "Service Provider", href: "/providers" },
  { label: "Academia", href: "/papers" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader({ overlay = false, current = "", barOnMobile = false }: {
  overlay?: boolean; current?: string; barOnMobile?: boolean;
}) {
  return (
    /* Sticky below lg, static at lg and up.

       On a phone the header is the only persistent ticket CTA there is: the
       early-bird bar scrolls away and the floating ticker is desktop-only, so
       before this the whole phone experience had a buy button at the very top
       of the document and nowhere else. At lg the ticker already does that
       job, and a pinned bar there only costs vertical space.

       The early-bird bar deliberately does NOT stick. Two pinned elements
       would eat ~19% of a 390x780 viewport, and the site's own rule is one
       urgency mechanism per screen. The bar is dismissible and disappears at
       the deadline; the header is permanent. The bar scrolls away under it.

       Background stays fully opaque, not the bg-paper/95 used for the desktop
       overlay: at lg that translucency sits over a still hero, but a sticky
       bar below lg passes over photography, ink sections and body copy, and
       95% paper over the ink field turns the wordmark to mud. The overlay
       treatment is kept at lg, where it was designed to work. */
    <header
      className={
        overlay
          ? `sticky top-0 z-40 bg-white border-b border-rule lg:absolute lg:inset-x-8 lg:border-b-0 lg:rounded-[1.25rem] lg:bg-white/95 lg:backdrop-blur nav-float ${
              barOnMobile ? "lg:top-6" : "lg:top-[4.25rem]"
            }`
          : "sticky top-0 z-40 bg-white border-b border-rule lg:static"
      }
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-5 xl:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
        {/* Lockup: mark on the left, name stacked in three lines beside it.
            Stacking the name lets each line sit at a readable size instead
            of one long line shrinking to fit the bar — and it squares the
            block up against the mark. */}
        <Link href="/" className="flex items-center gap-2 flex-none min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/map-mark-tight.svg" alt=""
               width={96} height={96} className="h-[62px] w-auto sm:h-[76px] flex-none" />
          <span className="block text-[19px] sm:text-[23px] font-semibold tracking-[0.09em] text-ink leading-[1.12]">
            AFRICA<br />
            <span className="text-marigold-t">SME</span><br />
            SUMMIT
          </span>
        </Link>
        <nav className="hidden min-[1440px]:flex items-center gap-8 text-[16px]">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap ${current === n.href ? "text-ink" : "text-ink/60 hover:text-ink transition-colors"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2 flex-none">
          {/* Hamburger sits left of the ticket button, and only the nav
              collapses — the ticket action is never behind a menu. */}
          <MobileNav nav={NAV} current={current} />
          <a
            href={EVENT.ticketUrl}
            className="rounded-lg bg-ink text-white px-4 sm:px-6 lg:px-4 xl:px-6 py-2.5 sm:py-3 text-[16px] sm:text-[16px] font-medium hover:bg-raise transition-colors flex-none"
          >
            Get ticket
          </a>
        </div>
      </div>
    </header>
  );
}
