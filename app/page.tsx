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
import HeroFrame from "@/components/HeroFrame";
import AfricaCutout from "@/components/AfricaCutout";
import RoadToTimeline from "@/components/RoadToTimeline";
import EnquiryForm from "@/components/EnquiryForm";
import {
  EVENT, FAQ, PARTNERS, NEXT_SUMMIT, SUMMIT_PHOTOS, VENUE_SHORT,
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

const ICON = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

/* The four value props under the hero (mock-up copy, verbatim). */
const VALUE_PROPS = [
  {
    title: "Grow Your Business",
    body: "Access new markets, partners and opportunities.",
    icon: <svg {...ICON}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>,
  },
  {
    title: "Meet Investors",
    body: "Connect with capital and strategic partners.",
    icon: <svg {...ICON}><circle cx="12" cy="12" r="9" /><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.100 0-2-.4-2.500-1.200M12 6.500V8m0 8v1.500" /></svg>,
  },
  {
    title: "Share Ideas",
    body: "Learn from industry leaders and innovators.",
    icon: <svg {...ICON}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 00-3.500 10.900c.6.5 1 1.200 1 2V16h5v-.1c0-.8.4-1.500 1-2A6 6 0 0012 3z" /></svg>,
  },
  {
    title: "Build Lasting Networks",
    body: "Be part of a vibrant African business community.",
    icon: <svg {...ICON}><circle cx="9" cy="8" r="3.500" /><path d="M2.500 20c0-3.600 2.900-6 6.500-6s6.500 2.400 6.500 6" /><path d="M16 4.500a3.500 3.500 0 010 7M18 14.300c2.200.7 3.500 2.700 3.500 5.700" /></svg>,
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
      <SummitCountdownBadge />

      <SiteHeader overlay barOnMobile current="/" />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-ink tint-marigold">
          <div className="mx-auto max-w-[1600px] px-5 pb-14 pt-10 sm:px-8 sm:pb-20 lg:pb-16 lg:pt-40">
            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
              <Reveal>
                <HeroFrame
                  image="/img/venue/venue-exterior.webp"
                  imageAlt={`Aerial view of ${EVENT.venue}, Mombasa Road, Nairobi`}
                  label={`${EVENT.venue} Hotel, Nairobi`}
                />
              </Reveal>
              <Reveal delay={120} className="mx-auto w-full max-w-[34rem] lg:max-w-none">
                <AfricaCutout
                  src="/img/summit/8232.webp"
                  alt="A speaker at the podium in front of the Africa SME Summit backdrop, framed in the outline of Africa"
                  className="mx-auto h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] lg:max-h-[27rem]"
                />
              </Reveal>
            </div>

            <div className="mx-auto mt-10 max-w-4xl text-center sm:mt-14 lg:mt-10">
              <h1 className="hero-serif text-[2.6rem] text-white sm:text-7xl lg:text-[4.75rem]">
                {EVENT.name} <span className="text-gold">{NEXT_SUMMIT.year}</span>
              </h1>
              <p className="lede mx-auto mt-6 max-w-2xl text-[19px] text-white sm:text-[21px]">
                {NEXT_SUMMIT.tagline}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <p className="flex items-center gap-3 text-[17px] font-medium text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
                    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
                  </svg>
                  {NEXT_SUMMIT.year} <span aria-hidden="true" className="text-gold">|</span> {NEXT_SUMMIT.place}
                </p>
                <TicketBtn tone="gold" className="rounded-full" />
                <VenueHoverButton
                  images={SUMMIT_PHOTOS.slice(0, 5).map((p) => ({ src: p.thumb, alt: p.alt }))}
                  href="/2026"
                  tag="Recap"
                  label={String(EVENT.year)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Four reasons ─────────────────────────────────────────────── */}
        <section className="border-y border-rule bg-paper">
          <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-4 lg:gap-6">
            {VALUE_PROPS.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="flex items-start gap-4">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gold text-ink">{v.icon}</span>
                <div>
                  <h2 className="h-sm text-[19px] font-semibold text-ink">{v.title}</h2>
                  <p className="mt-1.5 text-[16px] leading-snug text-ink/75">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── The case ─────────────────────────────────────────────────── */}
        <section className="bg-card tint-marigold">
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
