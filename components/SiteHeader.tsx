import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { EVENT } from "@/lib/event";

/**
 * One header for every page. `overlay` floats it over the homepage hero
 * photograph; everywhere else it sits on the indigo with a hairline under it.
 */
/* Nine items — "SMEs" (/network) added 30 September 2026 for the new
   SME-showcase page, relabelled from "Network" on 1 October 2026 at ICL's
   (boss's) request when the page itself was redesigned. "Papers" (/papers)
   relabelled to "Academia" the same day, same request — the href is
   unchanged, still /papers, only the link text changed. "Providers"
   (/providers) added 1 October 2026, same request, for the new service
   providers directory — "Service Providers" was too long/wide for this
   row (every other label is one short word), so the nav text is the
   shortened "Providers" while the page itself is titled "Service
   Providers" in full.

   Reordered 2 October 2026 at ICL's (boss's) request: Exhibit now comes
   before Partner (was the other way round), and Providers moved from
   right after SMEs to right after Partner. Home, Press and Contact were
   not mentioned in that request and keep their existing positions — first
   and last two respectively.

   The row is measured rather than assumed, every time an item is added OR
   reordered — a reorder changes nothing about total width, but is still
   re-measured here on the belief that an untested change is an unverified
   one. At the lg breakpoint itself — 1024px, the tightest width this nav
   is ever shown at, since below it the whole nav collapses into
   MobileNav — the lockup, nine links and the ticket button were
   re-measured in a real build to confirm they still fit on one line with
   no wrap or overlap (see the commit that added this line for how).
   Adding a tenth needs the same re-measure at 1024, not at 1440 where
   there is hundreds of pixels spare. */
const NAV = [
  { label: "Home", href: "/" },
  { label: "Speakers", href: "/speakers" },
  { label: "SMEs", href: "/network" },
  { label: "Exhibit", href: "/exhibit" },
  { label: "Partner", href: "/partner" },
  { label: "Providers", href: "/providers" },
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
          ? `sticky top-0 z-40 bg-paper border-b border-rule lg:absolute lg:inset-x-0 lg:border-b-0 lg:bg-paper/95 lg:backdrop-blur ${
              barOnMobile ? "lg:top-0" : "lg:top-11"
            }`
          : "sticky top-0 z-40 bg-paper border-b border-rule lg:static"
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
        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-8 text-[16px]">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={current === n.href ? "text-ink" : "text-ink/60 hover:text-ink transition-colors"}
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
