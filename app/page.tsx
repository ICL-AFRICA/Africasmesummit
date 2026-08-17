import Link from "next/link";
import Btn from "@/components/Btn";
import SpeakerCard from "@/components/SpeakerCard";
import HeroMosaic from "@/components/HeroMosaic";
import StickyBar from "@/components/StickyBar";
import TicketTicker from "@/components/TicketTicker";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { EVENT, TICKETS, SPEAKERS, TRACKS, PATHS, AGENDA, FAQ, PARTNERS, PHOTOS, REASONS, EARLY_BIRD_LABEL, TICKET_CTA, SPEAKER_COUNT_CAP, DATE_DAY_MONTH, AGENDA_SOURCE } from "@/lib/event";

/* Section heading: mono eyebrow, then the line. Centred in the dark
   sections, left-aligned in the light ones, so the two fields read as
   different kinds of space rather than the same layout recoloured. */
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

export default function Page() {
  return (
    <>
      {/* One urgency mechanism per screen, never two at once. On a phone
          that is the top bar; on desktop it is the floating ticker, which
          has room to breathe there and none on a phone. */}
      <StickyBar mobileOnly />
      <TicketTicker />

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      {/* current="/" so the new Home link marks itself on the page it points
          at, the same as every other nav item. */}
      <SiteHeader overlay barOnMobile current="/" />

      <main>
        {/* ── Hero: photography does the work ───────────────────────── */}
        <section className="relative bg-ink">
          {/* Height and floor both shrink by the header's flow height below
              lg, so the headline keeps the position it had when the header
              overlaid the hero rather than sitting above it. */}
          <div className="relative h-[calc(86vh-var(--header-flow))] min-h-[calc(560px-var(--header-flow))] w-full overflow-hidden">
            <HeroMosaic />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pb-10 sm:pb-14">
                <h1 className="h-xl text-white text-[15vw] sm:text-[9vw] lg:text-[7.5rem]">
                  Africa SME Summit
                </h1>
              </div>
            </div>
          </div>
          <div className="border-t border-line">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-[16px] text-white">
              <p>{EVENT.dateLabel}</p>
              <p className="text-white">{EVENT.venue}, University of Nairobi</p>
            </div>
          </div>
        </section>

        {/* ── The statement ─────────────────────────────────────────── */}
        <section className="bg-card">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-32 text-center">
            <p className="eyebrow text-ink/45 mb-6">One day, {DATE_DAY_MONTH}</p>
            <h2 className="h-lg text-4xl sm:text-6xl lg:text-[4.2rem] max-w-4xl mx-auto">
              7.4 million enterprises.<br />One of them is yours.
            </h2>
            <p className="lede mt-8 max-w-2xl mx-auto text-[18px] text-ink/70">
              Kenya&rsquo;s small businesses carry 80% of the workforce and almost none of
              the support. This is the day they meet the capital, the buyers, the county
              governments and the thirteen universities that can actually move them
              forward — in one room, in one day.
            </p>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Btn href={EVENT.ticketUrl}>{TICKET_CTA}</Btn>
              <Btn href="/partner" tone="outline" internal>Become a partner</Btn>
              <Btn href="/exhibit" tone="outline" internal>Book a stand</Btn>
            </div>
          </div>
        </section>

        {/* ── Speaker wall: edge to edge, no cards, no gaps ─────────── */}
        <section id="speakers" className="bg-ink">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-24 pb-12 text-center">
            <p className="eyebrow text-white mb-5">On stage</p>
            <h2 className="h-lg text-white text-4xl sm:text-5xl">The people you came to meet</h2>
            <p className="lede mt-5 text-white max-w-xl mx-auto text-[16px]">
              {SPEAKER_COUNT_CAP} names, one room, and a whole day to get to them.
            </p>
          </div>
          {/* Four across at lg, not three: seven speakers plus the closing
              tile is eight, which fills two rows exactly. At three it left a
              hole in the last row, and the tiles are edge to edge with no
              gaps, so a hole shows as a bare ink rectangle. Adding or
              removing a speaker means checking this number again. */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {SPEAKERS.map((s, i) => (
              <SpeakerCard
                key={s.slug}
                index={i}
                name={s.name}
                role={s.role}
                org={s.org}
                href={`/speakers#${s.slug}`}
              />
            ))}
            <div className="aspect-[4/5] bg-raise flex flex-col justify-between p-6 sm:p-8">
              <p className="eyebrow text-marigold">Speaking slots</p>
              <div>
                <p className="h-sm text-white text-lg sm:text-2xl">
                  There is room on the programme for one more.
                </p>
                <Link href="/contact" className="mt-4 inline-block text-[16px] text-marigold hover:text-white transition-colors">
                  Propose a session →
                </Link>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-14 flex flex-wrap justify-center gap-3">
            <Btn href="/speakers" tone="onDark" internal>View all speakers</Btn>
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
          </div>
        </section>

        {/* ── Tracks over a photograph ──────────────────────────────── */}
        {/* The hairline earns its keep here specifically: this section and
            the speaker wall above it are both bg-ink, so without it the two
            read as one long dark run. Everywhere else on the site a section
            boundary is drawn by the field changing colour. */}
        <section id="tracks" className="relative bg-ink border-t border-line">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTOS.floor} alt="" className="w-full h-full object-cover opacity-25" />
          </div>
          <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Head eyebrow="Six tracks" dark>Pick what your business actually needs</Head>
            <div className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {TRACKS.map((t, i) => (
                <div key={t.n} className="border-t border-line pt-5">
                  <p className={`font-mono text-[12px] mb-3 ${
                    ["text-marigold","text-clay","text-indigo","text-palm","text-marigold","text-clay"][i]
                  }`}>{t.n}</p>
                  <h3 className="h-sm text-white text-lg">{t.name}</h3>
                  {/* Track 02 has no description yet — see TRACKS. A name on
                      its own reads as incomplete; the old line left in place
                      would have read as wrong. */}
                  {t.line && <p className="lede mt-2.5 text-[16px] text-white">{t.line}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Three paths ───────────────────────────────────────────── */}
        <section id="why" className="bg-paper">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <div className="text-center">
              <p className="eyebrow text-ink/45 mb-5">One day to attend</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                Built differently for three kinds of visitor
              </h2>
              <p className="lede mt-5 text-ink/60 max-w-xl mx-auto text-[16px]">
                Same summit, three different reasons to be here — pick the one that
                matches why you are coming.
              </p>
            </div>
            <div className="mt-14 grid gap-px bg-rule lg:grid-cols-3">
              {PATHS.map((p, i) => (
                <div key={p.who} className={`p-8 sm:p-10 flex flex-col ${i === 1 ? "bg-ink text-white" : "bg-card"}`}>
                  <p className={`eyebrow ${i === 1 ? "text-marigold" : "text-ink/45"}`}>{p.who}</p>
                  <h3 className={`h-sm text-2xl mt-4 ${i === 1 ? "text-white" : "text-ink"}`}>{p.lead}</h3>
                  <p className={`lede mt-4 text-[16px] ${i === 1 ? "text-white" : "text-ink/65"}`}>{p.body}</p>
                  <ul className={`mt-7 pt-6 space-y-3 border-t ${i === 1 ? "border-line" : "border-rule"}`}>
                    {p.points.map((pt) => (
                      <li key={pt} className={`flex gap-3 text-[16px] ${i === 1 ? "text-white" : "text-ink/75"}`}>
                        <span className={i === 1 ? "text-marigold" : "text-ink/35"}>✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Five reasons ──────────────────────────────────────────── */}
        <section className="bg-ink">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <div className="text-center">
              <p className="eyebrow text-white mb-5">Why people give up a working day</p>
              <h2 className="h-lg text-white text-4xl sm:text-5xl">
                Five reasons the summit is worth it
              </h2>
              <p className="lede mt-5 text-white max-w-xl mx-auto text-[16px]">
                Not five features — five things people actually leave with.
              </p>
            </div>
            <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 border border-line">
              {REASONS.map((r) => (
                <div key={r.n} className="bg-ink p-8">
                  <p className={`font-mono text-[12px] ${["text-marigold","text-clay","text-indigo","text-palm","text-marigold"][Number(r.n)-1]}`}>{r.n}</p>
                  <h3 className="h-sm text-white text-lg mt-4">{r.t}</h3>
                  <p className="lede mt-3 text-[16px] text-white">{r.d}</p>
                </div>
              ))}
              <div className="bg-ink p-8 flex items-end">
                <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              </div>
            </div>
          </div>
        </section>

        {/* ── Agenda ────────────────────────────────────────────────── */}
        <section id="agenda" className="bg-card">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Head eyebrow="The running order">{DATE_DAY_MONTH}, hour by hour</Head>
            <ul className="mt-14 border-t border-rule">
              {AGENDA.map((a) => (
                <li key={a.time} className="grid grid-cols-[4rem_1fr] sm:grid-cols-[8rem_1fr_16rem] gap-4 sm:gap-10 py-6 border-b border-rule items-baseline">
                  <span className="font-mono text-[16px] text-ink/45">{a.time}</span>
                  <span className="h-sm text-lg sm:text-2xl">{a.title}</span>
                  {/* Most items in the real programme are a time and a title
                      and nothing else. Rendering an empty third column left a
                      stray grid cell on every one of them. */}
                  {a.note && (
                    <span className="col-start-2 sm:col-start-3 text-[16px] text-ink/55">{a.note}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[12px] text-ink/45">
              {AGENDA_SOURCE}
            </p>
          </div>
        </section>

        {/* ── Tickets ───────────────────────────────────────────────── */}
        <section id="tickets" className="bg-paper">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <div className="text-center">
              <p className="eyebrow text-ink/45 mb-5">Tickets</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                {`Book before ${EARLY_BIRD_LABEL} and save KES 1,000`}
              </h2>
            </div>
            <div className="mt-14 grid gap-px bg-rule lg:grid-cols-3">
              {TICKETS.map((t) => (
                <div key={t.tier} className={`p-8 sm:p-10 flex flex-col ${t.urgent ? "bg-ink text-white" : "bg-card"}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className={`eyebrow ${t.urgent ? "text-marigold" : "text-ink/45"}`}>{t.tier}</p>
                    <p className={`font-mono text-[12px] ${t.urgent ? "text-white" : "text-ink/45"}`}>{t.note}</p>
                  </div>
                  <p className={`h-lg mt-6 text-5xl ${t.urgent ? "text-white" : "text-ink"}`}>
                    {t.currency && <span className="text-lg align-top mr-2 font-normal">{t.currency}</span>}
                    {t.price}
                  </p>
                  <ul className={`mt-8 pt-6 space-y-3 border-t ${t.urgent ? "border-line" : "border-rule"}`}>
                    {t.includes.map((i) => (
                      <li key={i} className={`flex gap-3 text-[16px] ${t.urgent ? "text-white" : "text-ink/70"}`}>
                        <span className={t.urgent ? "text-marigold" : "text-ink/35"}>✓</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={EVENT.ticketUrl}
                    className={`mt-9 inline-flex justify-center px-6 py-3.5 text-[16px] font-medium transition-colors ${
                      t.urgent ? "bg-gold text-ink hover:brightness-110" : "bg-ink text-white hover:bg-raise"
                    }`}
                  >
                    {`Book ${t.tier.toLowerCase()}`}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[16px] text-ink/60">
              Exhibiting or sponsoring? <Link href="/exhibit" className="underline underline-offset-4 hover:text-ink">Booths from KES 30,000</Link>{" "}
              and <Link href="/partner" className="underline underline-offset-4 hover:text-ink">packages from KES 125,000</Link>.
            </p>
            <p className="mt-2 text-center text-[16px] text-ink/60">
              Group rate for four or more from one organisation —{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-ink">ask us for a code</Link>.
            </p>
          </div>
        </section>

        {/* ── Partners ──────────────────────────────────────────────── */}
        <section className="bg-card border-t border-rule">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20">
            <p className="eyebrow text-ink/45 mb-4">2026 partners</p>
            <h2 className="h-lg text-3xl sm:text-4xl max-w-2xl">
              Convened alongside
            </h2>
            {/* Every logo file is the same 400x192 canvas with the mark
                already optically balanced inside it, so this one rule sizes
                all nine and the balance survives every breakpoint. */}
            <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-rule border border-rule">
              {PARTNERS.map((p) => (
                <li key={p.name} className="bg-card h-32 flex items-center justify-center px-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    width={400}
                    height={192}
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[190px] h-auto"
                  />
                </li>
              ))}
              {/* Nine logos leave one empty slot at 2 columns and one at 5,
                  and none at 3. Without this the gap shows the grid's own
                  rule colour through and reads as a missing partner. */}
              <li aria-hidden="true" className="bg-card h-32 block sm:hidden lg:block" />
            </ul>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section id="faq" className="bg-paper">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Head eyebrow="Before you book">Questions</Head>
            <dl className="mt-14 grid sm:grid-cols-2 gap-x-16 border-t border-rule">
              {FAQ.map((f) => (
                <div key={f.q} className="py-6 border-b border-rule">
                  <dt className="h-sm text-[18px]">{f.q}</dt>
                  <dd className="lede mt-2 text-[16px] text-ink/65">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────── */}
        <section className="bg-ink">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-24 pb-16 text-center">
            <h2 className="h-lg text-white text-4xl sm:text-6xl max-w-3xl mx-auto">
              One day. One room. Bring the business.
            </h2>
            <p className="lede mt-6 text-white">
              {EVENT.dateLabel} · {EVENT.venue}, University of Nairobi
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              <Btn href="/exhibit" tone="onDark" internal>Book a stand</Btn>
            </div>
          </div>
          <div className="overflow-hidden border-t border-line">
            <p className="outline-type text-[10vw] leading-[1.05] whitespace-nowrap text-center py-8 select-none">
              #SMESUMMITKE
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
