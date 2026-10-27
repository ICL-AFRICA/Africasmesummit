import Link from "next/link";
import Btn from "@/components/Btn";
import TicketBtn from "@/components/TicketBtn";
import StickyBar from "@/components/StickyBar";
import TicketTicker from "@/components/TicketTicker";
import SummitCountdownBadge from "@/components/SummitCountdownBadge";
import Countdown from "@/components/Countdown";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VenueHoverButton from "@/components/VenueHoverButton";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import EdgeMosaic from "@/components/EdgeMosaic";
import AfricaCutout from "@/components/AfricaCutout";
import RoadToTimeline from "@/components/RoadToTimeline";
import EnquiryForm from "@/components/EnquiryForm";
import {
  EVENT, FAQ, PARTNERS, PHOTOS, NEXT_SUMMIT, SUMMIT_PHOTOS, VENUE_SHORT,
  AWARDS_2026, VOICES_2026, COMMITMENTS_2026, PLAN_2026_2030, DATE_LONG,
} from "@/lib/event";

/**
 * The homepage, rebuilt 19 October 2026 around the NEXT summit (2027), from
 * ICL's mock-up. The 2026 summit is over, so this page no longer sells it:
 * the ticket sections, early-bird bars and per-tier booking buttons are gone
 * from the homepage (the 2026 programme lives at /2026/ and its sub-pages),
 * and every ticket button follows the TICKETING_OPEN switch in lib/event.ts.
 *
 * Order: hero (venue + trailer, Africa cut-out, headline, date, call to
 * action) → four reasons to come → the case → 2026 in review → road to 2027
 * → the summit in pictures → ways to take part → updates sign-up → partners
 * → questions → close.
 */

/* Section heading: mono eyebrow, then the line. */
function Head({ eyebrow, children, center = false, dark = false }: {
  eyebrow: string; children: React.ReactNode; center?: boolean; dark?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className={`eyebrow mb-5 ${dark ? "text-white" : "text-ink/45"}`}>{eyebrow}</p>
      <h2 className={`h-lg text-4xl sm:text-5xl lg:text-[3.4rem] ${dark ? "text-white" : "text-ink"} ${center ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
        {children}
      </h2>
    </div>
  );
}

const ICON = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

/* The four benefits under the hero (copy verbatim from ICL's brief). Line
   icons drawn to one grid: 24px, 1.5 stroke, round caps. */
const VALUE_PROPS = [
  {
    title: "Grow Your Business",
    body: "Access new markets, partners and opportunities.",
    icon: <svg {...ICON}><path d="M4 20h16" /><rect x="5" y="13" width="3" height="7" /><rect x="10.500" y="10" width="3" height="10" /><rect x="16" y="7" width="3" height="13" /><path d="M5 9l5-4 3 2 6-4" /><path d="M16 3h3v3" /></svg>,
  },
  {
    title: "Meet Investors",
    body: "Connect with capital and strategic partners.",
    icon: <svg {...ICON}><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.500 2.500a1 1 0 1 0 3-3l-3.880-3.880a3 3 0 0 0-4.240 0l-.88.88a1 1 0 1 1-3-3l2.810-2.810a5.790 5.790 0 0 1 7.060-.87l.47.28a2 2 0 0 0 1.420.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.500 6.500a1 1 0 1 0 3-3" /><path d="M3 4h8" /></svg>,
  },
  {
    title: "Share Ideas",
    body: "Learn from industry leaders and innovators.",
    icon: <svg {...ICON}><path d="M15 14c.2-1 .7-1.700 1.500-2.500 1-.9 1.500-2.200 1.500-3.500A6 6 0 0 0 6 8c0 1 .2 2.200 1.500 3.500.7.7 1.300 1.500 1.500 2.500" /><path d="M9 18h6" /><path d="M10 21h4" /></svg>,
  },
  {
    title: "Build Lasting Networks",
    body: "Be part of a vibrant African business community.",
    icon: <svg {...ICON}><circle cx="12" cy="5.500" r="2.500" /><circle cx="5.500" cy="17.500" r="2.500" /><circle cx="18.500" cy="17.500" r="2.500" /><path d="M10.500 7.800 6.600 15.200M13.500 7.800l3.900 7.400M8 17.500h8" /></svg>,
  },
] as const;

const TAKE_PART = [
  { href: "/exhibit", title: "Exhibit", body: "Put your product in front of the buyers, investors and county officials in the room." },
  { href: "/partner", title: "Partner", body: "Back the summit and the plan it launches — with your name where the delegates look." },
  { href: "/contact", title: "Propose a session", body: "Have a lesson Kenya's small businesses should hear? Tell us what you would bring." },
] as const;

export default function Page() {
  const award = AWARDS_2026[0];
  const voice = VOICES_2026[0];
  return (
    <>
      <StickyBar mobileOnly />
      <TicketTicker />
      <SummitCountdownBadge afterHero />

      <SiteHeader variant="glass" current="/" />

      <main>
        {/* ── Hero: the trailer, full bleed ─────────────────────────────
            Rebuilt 27 October 2026 from ICL's redesign brief. The glass
            header above takes no space and floats over this section, which
            therefore runs to the top of the page. Layers, back to front:
            the trailer (muted, looping, poster as fallback); a navy wash; a
            gradient behind the text; a vignette; the gold edge mosaic; then
            the content. The whole first screen is nav + hero + benefits. */}
        <section className="relative isolate min-h-[38rem] overflow-hidden bg-ink lg:h-[max(34rem,calc(100svh-12.5rem))] lg:max-h-[58rem]">
          <HeroVideo cinema />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[rgba(12,14,46,0.5)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(10,12,40,0.9) 0%, rgba(10,12,40,0.72) 36%, rgba(10,12,40,0.2) 66%, rgba(10,12,40,0) 100%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden" style={{ background: "linear-gradient(180deg, rgba(10,12,40,0.55) 0%, rgba(10,12,40,0.7) 100%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 45%, rgba(6,8,30,0) 55%, rgba(6,8,30,0.6) 100%), linear-gradient(180deg, rgba(10,12,40,0.55) 0%, rgba(10,12,40,0) 22%)" }} />
          <EdgeMosaic />

          <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-5 pb-14 pt-[calc(var(--glass-nav)+2.5rem)] sm:px-8 lg:px-12 lg:pb-8 lg:pt-[var(--glass-nav)]">
            <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-6">
              <div>
                <p className="hero-rise text-[16px] font-semibold uppercase tracking-[0.2em] text-gold sm:tracking-[0.3em]">
                  Connect <span aria-hidden="true">•</span> Invest <span aria-hidden="true">•</span> Grow
                </p>
                <h1 className="hero-rise hero-serif mt-4 text-[clamp(2.9rem,12vw,4.5rem)] text-white md:text-[clamp(2.6rem,5.6vw,5.75rem)] lg:text-[clamp(3.2rem,6.4vw,5.75rem)]" style={{ ["--d" as string]: "120ms" }}>
                  <span className="block">Africa SME</span>
                  <span className="block">Summit <span className="text-gold">{NEXT_SUMMIT.year}</span></span>
                </h1>
                <p className="hero-rise mt-6 max-w-[30rem] text-[19px] leading-snug text-white sm:text-[22px]" style={{ ["--d" as string]: "240ms" }}>
                  {NEXT_SUMMIT.tagline}
                </p>
                <p className="hero-rise mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[17px] text-white" style={{ ["--d" as string]: "340ms" }}>
                  <span className="flex items-center gap-3">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
                      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.500h.01M12 17.500h.01" />
                    </svg>
                    {NEXT_SUMMIT.label}
                  </span>
                  <span aria-hidden="true" className="h-6 w-px bg-white"></span>
                  <span className="flex items-center gap-3">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
                      <path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21z" /><circle cx="12" cy="9.500" r="2.500" />
                    </svg>
                    {NEXT_SUMMIT.place}
                  </span>
                </p>
                <div className="hero-rise mt-9 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "440ms" }}>
                  <TicketBtn tone="gold" className="rounded-full px-8 text-[18px] font-semibold shadow-[0_12px_28px_-12px_rgba(227,164,40,0.9)]" />
                  <VenueHoverButton
                    images={SUMMIT_PHOTOS.slice(0, 5).map((p) => ({ src: p.thumb, alt: p.alt }))}
                    href="/2026"
                    tag="Recap"
                    label={String(EVENT.year)}
                  />
                </div>
              </div>

              <div className="hero-map-in relative mx-auto w-full max-w-[34rem] md:max-w-none">
                <AfricaCutout
                  src="/img/summit/8232.webp"
                  alt="A speaker at the podium at the 2026 summit, framed in the outline of Africa"
                  className="mx-auto h-auto w-full max-w-[30rem] md:max-w-none lg:ml-auto lg:mr-14 lg:h-[min(36rem,calc(100svh-17.5rem))] lg:w-auto xl:mr-20"
                />
                <p className="mt-5 text-center font-serif text-[22px] italic leading-tight text-gold lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:max-w-[12rem] lg:-rotate-6 lg:text-right lg:text-[26px]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  Stronger SMEs.<br />A richer Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Four benefits: the bright band under the hero ───────────── */}
        <section aria-label="Why attend" className="border-t-[3px] border-gold bg-paper">
          <div className="mx-auto grid max-w-[1600px] gap-x-0 gap-y-7 px-5 py-9 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12 lg:py-8">
            {VALUE_PROPS.map((v, i) => (
              <div
                key={v.title}
                className={`benefit flex items-center gap-5 lg:flex-col lg:gap-3 lg:px-6 lg:text-center ${i > 0 ? "lg:border-l lg:border-rule" : ""}`}
              >
                <span className="benefit-icon flex h-[60px] w-[60px] flex-none items-center justify-center rounded-full border-[1.5px] border-gold text-gold lg:h-[66px] lg:w-[66px]">{v.icon}</span>
                <div>
                  <h2 className="h-sm text-[19px] font-semibold text-ink">{v.title}</h2>
                  <p className="mt-1 text-[16px] leading-snug text-ink/80">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── The case ─────────────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-24 bg-card tint-marigold">
          <div className="mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8 sm:py-32">
            <Reveal>
              <p className="eyebrow mb-6 text-ink/45">Next: {NEXT_SUMMIT.label}</p>
              <h2 className="h-lg mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-[4.2rem]">
                7.4 million enterprises.<br />One of them is yours.
              </h2>
              <p className="lede mx-auto mt-8 max-w-2xl text-[18px] text-ink/70">
                {NEXT_SUMMIT.purpose} Capital, buyers, county government and the universities that
                can move small businesses forward, in one room — and a plan to measure what changes.
              </p>
            </Reveal>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <TicketBtn />
              <Btn href="/exhibit" tone="outline" internal>Exhibit</Btn>
              <Btn href="/partner" tone="outline" internal>Partner with us</Btn>
            </div>
            <div className="mt-14 flex justify-center">
              <Countdown
                tone="light"
                target={NEXT_SUMMIT.starts}
                activeLabel={`Until ${EVENT.name} ${NEXT_SUMMIT.year}`}
                endedLabel="The summit is under way."
              />
            </div>
            {!NEXT_SUMMIT.dateConfirmed && (
              <p className="mx-auto mt-5 max-w-md text-[16px] text-ink/70">
                Counting to the start of {NEXT_SUMMIT.label}. The exact date is still to be announced.
              </p>
            )}
          </div>
        </section>

        {/* ── 2026 in review ───────────────────────────────────────────── */}
        <section className="border-t border-rule bg-paper tint-indigo">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-28">
            <Reveal>
              <Head eyebrow={`${EVENT.year} in review`}>The summit happened. This is what came out of it.</Head>
              <p className="lede mt-6 max-w-2xl text-[18px] text-ink/70">
                {DATE_LONG}, {EVENT.venue}, {VENUE_SHORT}: an awards stage, five keynote voices and
                six commitments from county, industry and academia.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <Reveal className="panel-card flex flex-col bg-ink p-7 text-white sm:p-8">
                <p className="eyebrow text-marigold">{award.place} · Awards</p>
                <h3 className="h-sm mt-4 text-3xl text-white">{award.brand}</h3>
                <p className="mt-1 text-[16px] text-white">{award.who}</p>
                <p className="mt-5 flex-1 text-[16px] leading-relaxed text-white">{award.line}</p>
                <p className="mt-5 text-[16px] text-white">
                  Second: {AWARDS_2026[1].brand}. Third: {AWARDS_2026[2].brand}.
                </p>
              </Reveal>
              <Reveal delay={80} className="panel-card flex flex-col bg-ink p-7 text-white sm:p-8">
                <p className="eyebrow text-marigold">In their words</p>
                <blockquote className="h-sm mt-4 flex-1 text-2xl leading-snug text-white">
                  &ldquo;{voice.quote}&rdquo;
                </blockquote>
                <p className="mt-6 border-t border-line pt-4 text-[16px] text-white">
                  <span className="font-semibold">{voice.name}</span><br />{voice.role}
                </p>
              </Reveal>
              <Reveal delay={160} className="panel-card flex flex-col bg-ink p-7 text-white sm:p-8">
                <p className="eyebrow text-marigold">What was agreed</p>
                <h3 className="h-sm mt-4 text-3xl text-white">{COMMITMENTS_2026.length} commitments</h3>
                <ul className="mt-5 flex-1 space-y-3">
                  {COMMITMENTS_2026.slice(0, 3).map((c) => (
                    <li key={c.what} className="flex gap-3 text-[16px] leading-snug text-white">
                      <span aria-hidden="true" className="flex-none text-marigold">✓</span>{c.what}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[16px] text-white">…and {COMMITMENTS_2026.length - 3} more.</p>
              </Reveal>
            </div>
            <div className="mt-10">
              <Btn href="/2026" internal>Read the full 2026 recap</Btn>
            </div>
          </div>
        </section>

        {/* ── The road to 2027 ─────────────────────────────────────────── */}
        <section className="bg-ink tint-palm">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-28">
            <Reveal>
              <Head eyebrow="The road to 2027" dark>From this summit to the next.</Head>
              <p className="lede mt-6 max-w-2xl text-[18px] text-white">
                {PLAN_2026_2030.name}. {PLAN_2026_2030.aim} {NEXT_SUMMIT.label} is where the plan launches.
              </p>
            </Reveal>
            <Reveal className="mt-14"><RoadToTimeline /></Reveal>
          </div>
        </section>

        {/* ── The summit in pictures ───────────────────────────────────── */}
        <section className="border-t border-line bg-ink">
          <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-16 sm:px-8 sm:pb-28">
            <Reveal>
              <p className="eyebrow mb-5 text-white">{EVENT.year}, in pictures</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
              {SUMMIT_PHOTOS.slice(0, 6).map((p, i) => (
                <Reveal key={p.src} delay={i * 50}>
                  <Link href="/2026" className="block aspect-[3/2] overflow-hidden rounded-xl bg-raise transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt={p.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <Btn href="/2026" internal tone="onDark">See all {SUMMIT_PHOTOS.length} photos</Btn>
            </div>
          </div>
        </section>

        {/* ── Venue ────────────────────────────────────────────────────── */}
        <section id="venue" className="scroll-mt-24 border-t border-rule bg-paper tint-palm">
          <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <Head eyebrow="The venue">{NEXT_SUMMIT.venue}, Nairobi.</Head>
              <p className="lede mt-6 max-w-lg text-[18px] text-ink/70">
                {NEXT_SUMMIT.label} returns to {EVENT.venue}, {EVENT.venueDetail}, where the 2026
                summit was held. The exact date will be announced here first.
              </p>
              <div className="mt-8"><Btn href="/2026" internal tone="outline">See the 2026 summit here</Btn></div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {PHOTOS.venue.slice(0, 3).map((p, i) => (
                <Reveal key={p.src} delay={i * 90} className={i === 0 ? "col-span-2" : ""}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className={`w-full rounded-xl object-cover ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Take part ────────────────────────────────────────────────── */}
        <section className="bg-card tint-clay">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-28">
            <Reveal><Head eyebrow={`Take part in ${NEXT_SUMMIT.year}`}>Three ways to be in the room.</Head></Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {TAKE_PART.map((t, i) => (
                <Reveal key={t.href} delay={i * 80}>
                  <Link href={t.href} className="panel-card block h-full bg-ink p-8 text-white transition-colors hover:bg-raise">
                    <h3 className="h-sm text-3xl text-white">{t.title} →</h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-white">{t.body}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Updates sign-up ──────────────────────────────────────────── */}
        <section id="updates" className="scroll-mt-24 bg-ink tint-marigold">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2">
            <Reveal>
              <Head eyebrow="Be first to know" dark>Get {NEXT_SUMMIT.year} updates.</Head>
              <p className="lede mt-6 max-w-lg text-[18px] text-white">
                Tell us who you are and where to reach you. We will send you the date as soon as it
                is fixed, and tell you when tickets open — nothing in between.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <EnquiryForm
                subject={`${EVENT.name} ${NEXT_SUMMIT.year} — updates sign-up`}
                cta="Send me the updates"
                successTitle="You are on the list."
                successBody={`We will email you the ${NEXT_SUMMIT.year} date and when tickets open.`}
                fields={[
                  { name: "name", label: "Your name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "interest", label: "I am interested as", options: ["Attendee", "Exhibitor", "Partner or sponsor", "Speaker", "Press"] },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Partners ─────────────────────────────────────────────────── */}
        <section className="overflow-hidden border-t border-rule bg-card tint-palm">
          <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8">
            <Reveal>
              <p className="eyebrow mb-4 text-ink/45">2026 partners</p>
              <h2 className="h-lg max-w-2xl text-3xl sm:text-4xl">Convened alongside</h2>
            </Reveal>
          </div>
          {/* Full-bleed strip, duplicated once so it loops without a seam
              (.partner-track in globals.css); the second copy is aria-hidden. */}
          <div className="relative pb-16 [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)]">
            <div className="partner-track flex w-max items-center gap-16 py-4">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex h-24 w-[190px] shrink-0 items-center justify-center"
                  aria-hidden={i >= PARTNERS.length}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={i < PARTNERS.length ? p.name : ""}
                    width={400}
                    height={192}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full max-w-[190px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="bg-paper tint-marigold">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-28">
            <Reveal><Head eyebrow="Questions">What people ask</Head></Reveal>
            <dl className="mt-14 grid gap-x-16 border-t border-rule sm:grid-cols-2">
              {FAQ.map((f, i) => (
                <Reveal key={f.q} as="div" delay={Math.min(i, 5) * 60} className="border-b border-rule py-6">
                  <dt className="h-sm text-[18px]">{f.q}</dt>
                  <dd className="lede mt-2 text-[16px] text-ink/65">{f.a}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────────────── */}
        <section className="bg-ink tint-clay">
          <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-24 text-center sm:px-8">
            <Reveal>
              <h2 className="h-lg mx-auto max-w-3xl text-4xl text-white sm:text-6xl">
                One day. One room. Bring the business.
              </h2>
              <p className="lede mt-6 text-white">
                {NEXT_SUMMIT.label} · <span className="venue-float">{NEXT_SUMMIT.venue}</span>, {VENUE_SHORT}
              </p>
            </Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <TicketBtn tone="gold" />
              <Btn href="/exhibit" tone="onDark" internal>Exhibit</Btn>
            </div>
          </div>
          <div className="overflow-hidden border-t border-line">
            <p className="outline-type select-none whitespace-nowrap py-8 text-center text-[10vw] leading-[1.05]">
              #SMESUMMITKE
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
