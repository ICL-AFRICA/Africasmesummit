import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import Reveal from "@/components/Reveal";
import StickyBar from "@/components/StickyBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { EVENT, VENUE_SHORT, SPEAKERS, PHOTOS, TICKET_CTA, SPEAKER_COUNT, DATE_LONG, DATE_DAY_MONTH, KEYNOTES, KEYNOTE_COUNT, KEYNOTE_COUNT_CAP } from "@/lib/event";

export const metadata: Metadata = {
  title: `Speakers — ${EVENT.name} ${EVENT.year}`,
  description:
    `Speakers at the Africa SME Summit, ${DATE_LONG}: SME banking at NCBA, cross-border trade, industry-academia collaboration and AI adoption for small business.`,
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
              {KEYNOTE_COUNT_CAP} keynote speakers and {SPEAKER_COUNT} panel speakers, six
              tracks, one day — and enough room between sessions to actually
              reach the person you came for.
            </p>
          </div>
        </section>

        {/* ── Keynote speakers ──────────────────────────────────────── */}
        {/* Full-width alternating rows, same shape this page always used for
            every profile — kept deliberately larger than the panelist grid
            below, since there are three of these rather than nineteen. */}
        <section className="border-b border-line bg-raise/40 tint-clay">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-12 sm:pt-16">
            <Reveal as="p" className="eyebrow text-marigold mb-2">Keynote</Reveal>
            <h2 className="h-sm text-white text-2xl sm:text-3xl">Before the tracks open</h2>
            <p className="lede mt-3 text-white/70 max-w-2xl text-[16px]">
              Two Vice-Chancellors, the summit&rsquo;s own convener, the CEO of the
              Teachers Service Commission, and Nairobi County&rsquo;s CECM for Business
              and Hustler Opportunities, on stage before the panel speakers below.
            </p>
          </div>
          {KEYNOTES.map((k, i) => (
            <Reveal key={k.slug} as="div" id={k.slug} className={i > 0 ? "border-t border-line" : ""}>
              <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-14 sm:py-20">
                <div className={`grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,26rem)_1fr] items-start ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                  <div className={`keynote-frame portrait-tint aspect-[4/5] overflow-hidden bg-raise ${i % 2 ? "lg:[direction:ltr]" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={k.photo} alt={k.name} className="portrait w-full h-full object-cover" />
                  </div>

                  <div className={i % 2 ? "lg:[direction:ltr]" : ""}>
                    <p className="font-mono text-[12px] text-marigold">{k.label}</p>
                    <h2 className="h-lg text-white text-3xl sm:text-4xl mt-4">{k.name}</h2>
                    <p className="text-[16px] text-white mt-3">{k.role}</p>
                    <p className="text-[16px] text-white font-medium">{k.org}</p>

                    <div className="mt-8 max-w-2xl space-y-5">
                      {k.bio.map((para, n) => (
                        <p key={n} className="lede text-[17px] sm:text-[18px] text-white">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ── Panel speakers ────────────────────────────────────────── */}
        {/* A denser grid than the keynote rows above — smaller portraits,
            three across at lg — so nineteen panelists don't each claim a
            full-width row the way the keynotes above do. */}
        <section className="border-b border-line tint-indigo">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-16 sm:pt-20">
            <Reveal>
              <p className="eyebrow text-white mb-2">Panel speakers</p>
              <h2 className="h-sm text-white text-2xl sm:text-3xl">Across the six tracks</h2>
            </Reveal>
          </div>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-12 sm:py-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {SPEAKERS.map((s, i) => (
              <Reveal key={s.slug} as="div" id={s.slug} delay={(i % 6) * 60}>
                <div className="portrait-tint aspect-[4/5] max-w-[13rem] overflow-hidden bg-raise">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTOS.speakers[i]} alt={s.name} className="portrait w-full h-full object-cover" />
                </div>

                <p className="font-mono text-[12px] text-marigold mt-5">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="h-sm text-white text-xl sm:text-2xl mt-2">{s.name}</h3>
                <p className="text-[15px] text-white mt-2">{s.role}</p>
                <p className="text-[15px] text-white font-medium">{s.org}</p>

                <div className="mt-4 max-w-md space-y-3">
                  {s.bio.map((para, n) => (
                    <p key={n} className="lede text-[15px] text-white">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-line max-w-md">
                  <p className="eyebrow text-white mb-1 text-[11px]">Speaking on</p>
                  <p className="h-sm text-white text-base">{s.topic}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Close — the same two actions as every other page */}
        <section className="tint-palm">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20 sm:py-24 text-center">
            <h2 className="h-lg text-white text-3xl sm:text-5xl max-w-2xl mx-auto">
              All {SPEAKER_COUNT} panel speakers and {KEYNOTE_COUNT} keynote speakers,
              one room, {DATE_DAY_MONTH}.
            </h2>
            <p className="lede mt-5 text-white">
              <span className="venue-float">{EVENT.venue}</span>, {VENUE_SHORT}
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
