import Link from "next/link";
import { EVENT } from "@/lib/event";

/**
 * One footer for every page, and the site's safety net: every page is
 * reachable from here, so no route is ever a dead end — including on
 * small screens where the top nav collapses.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-ink border-t border-line text-white">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-[16px]">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/map-mark-tight.svg" alt="" width={72} height={72} className="h-16 w-auto flex-none" />
            <span className="block text-[19px] font-semibold tracking-[0.09em] text-white leading-[1.12]">
              AFRICA<br />
              <span className="text-marigold">SME</span><br />
              SUMMIT
            </span>
          </div>
          <p className="mt-5">{EVENT.dateLabel}</p>
          <p className="mt-2">Convened by {EVENT.host}</p>
        </div>

        <div>
          <p className="eyebrow text-marigold mb-3">The summit</p>
          <ul className="space-y-1.5">
            {[["Speakers", "/speakers"], ["The day", "/#agenda"], ["Tracks", "/tracks"],
              ["Tickets", "/#tickets"], ["Questions", "/#faq"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-marigold mb-3">Take part</p>
          <ul className="space-y-1.5">
            {[["Become a partner", "/partner"], ["Book a stand", "/exhibit"],
              ["Call for papers", "/papers"], ["Propose a session", "/contact"],
              ["Group bookings", "/contact"], ["Press", "/press"]].map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          {/* Two lines only, by request. The venue block and the "Contact
              page →" link that used to sit here are gone; /contact is still
              reachable from the "Take part" column above (Propose a session,
              Group bookings), so the no-dead-ends rule still holds. */}
          <p className="eyebrow text-marigold mb-3">Get in touch</p>
          <p>
            <a href={`mailto:${EVENT.email}`} className="hover:text-white transition-colors">
              {EVENT.email}
            </a>
          </p>
          <p>{EVENT.conferencePhone}</p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-5 flex flex-wrap gap-4 justify-between text-[12px] font-mono">
          <span>© {EVENT.year} {EVENT.host}</span>
          <span className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>Nairobi</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
