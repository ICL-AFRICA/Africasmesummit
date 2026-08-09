import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { EVENT } from "@/lib/event";

/**
 * One header for every page. `overlay` floats it over the homepage hero
 * photograph; everywhere else it sits on the indigo with a hairline under it.
 */
const NAV = [
  { label: "Speakers", href: "/speakers" },
  { label: "Partner", href: "/partner" },
  { label: "Exhibit", href: "/exhibit" },
  { label: "Papers", href: "/papers" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader({ overlay = false, current = "", barOnMobile = false }: {
  overlay?: boolean; current?: string; barOnMobile?: boolean;
}) {
  return (
    <header className={overlay ? `absolute ${barOnMobile ? "top-11 sm:top-0" : "top-11"} inset-x-0 z-40 bg-paper/95 backdrop-blur` : "bg-paper border-b border-rule"}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
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
        <nav className="hidden lg:flex items-center gap-8 text-[16px]">
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
            className="bg-ink text-white px-4 sm:px-6 py-2.5 sm:py-3 text-[16px] sm:text-[16px] font-medium hover:bg-raise transition-colors flex-none"
          >
            Get ticket
          </a>
        </div>
      </div>
    </header>
  );
}
