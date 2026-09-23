import Link from "next/link";
import Btn from "@/components/Btn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { EVENT, VENUE_SHORT } from "@/lib/event";

/* A custom 404 so a mistyped or expired link still leads somewhere useful.
   Old posters and shared links outlive the pages they pointed at. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ink">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-28 sm:py-36">
          <p className="eyebrow text-marigold mb-5">404</p>
          <h1 className="h-lg text-white text-4xl sm:text-6xl max-w-3xl">
            That page is not here — but the summit still is.
          </h1>
          <p className="lede mt-7 text-white max-w-xl text-[18px]">
            {EVENT.dateLabel}, <span className="venue-float">{EVENT.venue}</span>, {VENUE_SHORT}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/" tone="gold" internal>Go to the summit</Btn>
            <Btn href="/contact" tone="onDark" internal>Contact us</Btn>
          </div>
          <div className="mt-14 pt-10 border-t border-line max-w-xl">
            <p className="eyebrow text-white mb-4">Or try</p>
            <ul className="grid grid-cols-2 gap-2 text-[16px]">
              {[["Speakers", "/speakers"], ["Tickets", "/#tickets"], ["Become a partner", "/partner"],
                ["Book a stand", "/exhibit"], ["Call for papers", "/papers"], ["The day", "/#agenda"]].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-white hover:text-marigold-t transition-colors">{l} →</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
