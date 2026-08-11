import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import StickyBar from "@/components/StickyBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { EVENT, SPEAKERS, PHOTOS, TICKET_CTA, SPEAKER_COUNT, SPEAKER_COUNT_CAP } from "@/lib/event";

export const metadata: Metadata = {
  title: `Speakers — ${EVENT.name} ${EVENT.year}`,
  description:
    "Speakers at the Africa SME Summit, 30 September 2026: SME banking at NCBA, cross-border trade, industry-academia collaboration and AI adoption for small business.",
  alternates: { canonical: "https://africasmesummit.com/speakers" },
};

export default function Speakers() {
  return (
    <>
      <StickyBar />

      {/* Nav — same bar as the homepage, but on the indigo field rather
          than over a photograph, so it needs its own background. */}
      <SiteHeader current="/speakers" />

      <main className="bg-ink">
        {/* Header */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20 sm:py-24">
            <p className="eyebrow text-white mb-5">On stage · {EVENT.dateShort}</p>
            <h1 className="h-lg text-white text-5xl sm:text-6xl lg:text-7xl max-w-4xl">
              The people you came to meet
            </h1>
            <p className="lede mt-7 text-white max-w-2xl text-[18px]">
              {SPEAKER_COUNT_CAP} speakers, one day, and enough time between
              the sessions to actually get to the person you came for.
            </p>
          </div>
        </section>

        {/* Profiles — alternating so the eye moves down the page instead of
            reading five identical rows. */}
        {SPEAKERS.map((s, i) => (
          <section key={s.slug} id={s.slug} className="border-b border-line">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-14 sm:py-20">
              <div className={`grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,26rem)_1fr] items-start ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`portrait-tint aspect-[4/5] overflow-hidden bg-raise ${i % 2 ? "lg:[direction:ltr]" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTOS.speakers[i]} alt={s.name} className="portrait w-full h-full object-cover" />
                </div>

                <div className={i % 2 ? "lg:[direction:ltr]" : ""}>
                  <p className="font-mono text-[12px] text-marigold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="h-lg text-white text-3xl sm:text-4xl mt-4">{s.name}</h2>
                  <p className="text-[16px] text-white mt-3">{s.role}</p>
                  <p className="text-[16px] text-white font-medium">{s.org}</p>

                  {/* Supplied bios run to three paragraphs; the two drafts
                      are a single one. Same markup handles both. */}
                  <div className="mt-8 max-w-2xl space-y-5">
                    {s.bio.map((para, n) => (
                      <p key={n} className="lede text-[17px] sm:text-[18px] text-white">
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-line max-w-2xl">
                    <p className="eyebrow text-white mb-2">Speaking on</p>
                    <p className="h-sm text-white text-lg">{s.topic}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Close — the same two actions as every other page */}
        <section>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20 sm:py-24 text-center">
            <h2 className="h-lg text-white text-3xl sm:text-5xl max-w-2xl mx-auto">
              All {SPEAKER_COUNT}, one room, thirty September.
            </h2>
            <p className="lede mt-5 text-white">
              {EVENT.venue}, University of Nairobi
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              <Btn href="/" tone="onDark" internal>Back to the summit</Btn>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
