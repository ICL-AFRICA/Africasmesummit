import Link from "next/link";
import Btn from "@/components/Btn";
import HeroMosaic from "@/components/HeroMosaic";
import StickyBar from "@/components/StickyBar";
import TicketTicker from "@/components/TicketTicker";
import SummitCountdownBadge from "@/components/SummitCountdownBadge";
import Countdown from "@/components/Countdown";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VenueHoverButton from "@/components/VenueHoverButton";
import Reveal from "@/components/Reveal";
import AgendaPreview from "@/components/AgendaPreview";
import { EVENT, VENUE_SHORT, TICKETS, SPEAKERS, TRACKS, PATHS, FAQ, PARTNERS, PHOTOS, REASONS, EARLY_BIRD_LABEL, EARLY_BIRD_ACTIVE, TICKET_CTA, SPEAKER_COUNT_CAP, DATE_DAY_MONTH, KEYNOTES, SUMMIT_STARTS } from "@/lib/event";

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
          has room to breathe there and none on a phone. The summit-date
          badge is a separate thing (it never expires and never asks for a
          click), so it sits in the opposite corner rather than competing
          with the ticket urgency for the same visual attention. */}
      <StickyBar mobileOnly />
      <TicketTicker />
      <SummitCountdownBadge />

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
              {/* Enclosed as a "Venue" / name toggle 24-25 September 2026,
                  at ICL's request — see VenueHoverButton.tsx. "Mombasa
                  Road" came out once "Venue" made the label explicit and
                  the road name read as redundant. This is the one
                  EVENT.venue mention on the site that got this treatment;
                  the other five keep the plain .venue-float hover-lift. */}
              <p className="text-white">
                <VenueHoverButton
                  images={PHOTOS.venue.slice(0, 5)}
                  href="/press#venue"
                  label={EVENT.venue}
                  logoSrc={PHOTOS.venueLogo}
                />
              </p>
            </div>
          </div>
        </section>

        {/* ── The statement ─────────────────────────────────────────── */}
        <section className="bg-card tint-marigold">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-32 text-center">
            <Reveal>
              <p className="eyebrow text-ink/45 mb-6">One day, {DATE_DAY_MONTH}</p>
              <h2 className="h-lg text-4xl sm:text-6xl lg:text-[4.2rem] max-w-4xl mx-auto">
                7.4 million enterprises.<br />One of them is yours.
              </h2>
              <p className="lede mt-8 max-w-2xl mx-auto text-[18px] text-ink/70">
                Kenya&rsquo;s small businesses carry 80% of the workforce and get almost
                none of the support. This is the one day that changes that — the capital,
                the buyers, the county governments and the thirteen universities that can
                move them forward, all in one room.
              </p>
            </Reveal>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Btn href={EVENT.ticketUrl}>{TICKET_CTA}</Btn>
              <Btn href="/exhibit" tone="outline" internal>Book a stand</Btn>
              <Btn href="/partner" tone="outline" internal>Partner with us</Btn>
            </div>

            {/* Counts down to the summit itself rather than a ticket deadline
                — the one urgency signal that never expires until the day
                actually arrives, so it keeps working long after the early
                bird (and every other deadline on the page) has closed. */}
            <div className="mt-14 flex justify-center">
              <Countdown
                tone="light"
                target={SUMMIT_STARTS}
                activeLabel={`Until ${EVENT.name} ${EVENT.year}`}
                endedLabel="The summit is under way."
              />
            </div>
          </div>
        </section>

        {/* ── Keynote speakers ──────────────────────────────────────── */}
        {/* Moved ahead of the panel wall on 19 September 2026 — the original
            brief was "the VC section above the panelist speakers," and this
            page had it backwards (panel wall first, keynotes second) since
            the restructuring landed. /speakers already had the order right;
            this brings the homepage in line with it. A short curated list,
            not the whole roster — deliberately bigger than the panel wall
            tiles below, one portrait each instead of a shared edge-to-edge
            grid, so the summit's headline names get room to breathe before
            the panel wall. Gitau still fills the running order's Welcome
            Remarks slot at 08:50 (see AGENDA — corrected 19 September 2026
            against the confirmed programme, which has no 10:45 slot);
            Mutungi, Munene and Mitei are keynote speakers without a single
            fixed slot label of their own (Mitei does have her own AGENDA
            session, at 10:00, but the card just says "Keynote speaker"
            like Mutungi's and Munene's — see the KEYNOTES comment).

            Grid widened from a fixed 3-up to 2-up/4-up on 21 September 2026
            when Evaleen Mitei joined as the fourth keynote — a straight
            sm:grid-cols-3 would have orphaned her card alone on its own
            row. Widened again to 2-up/3-up/5-up on 24 September 2026 when
            Anastasia Nyalita joined as the fifth: 5-up at desktop keeps one
            clean row instead of 4-then-1, and the added md:3-up step gives
            tablet widths a balanced 3+2 instead of 2+2+1.

            The portraits also picked up .keynote-frame the same day —
            rounded corners, a soft shadow and a faint sheen, at ICL's
            request for a "classy, floating" feel. That's a deliberate
            departure from the flat/hairline rule atop globals.css (no
            shadows, no rounded corners) for these five portraits
            specifically, same as .venue-float and the glow-* classes
            already are elsewhere on the page — not a reversal of the flat
            rule everywhere else. */}
        <section className="bg-card border-t border-rule tint-clay">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20 sm:py-24">
            <Reveal className="text-center mb-14" as="div">
              <p className="eyebrow text-ink/45 mb-5">Keynote</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                Before the tracks open
              </h2>
              <p className="lede mt-5 text-ink/60 max-w-2xl mx-auto text-[16px]">
                Two Vice-Chancellors, the summit&rsquo;s own convener, the CEO of the
                Teachers Service Commission, and Nairobi County&rsquo;s CECM for Business
                and Hustler Opportunities, setting the tone before six tracks open.
              </p>
            </Reveal>
            <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {KEYNOTES.map((k, i) => (
                <Reveal key={k.slug} delay={Math.min(i, 5) * 80}>
                  <div className="keynote-frame portrait-tint aspect-[4/5] overflow-hidden bg-raise">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={k.photo}
                      alt={k.name}
                      className="portrait w-full h-full object-cover"
                    />
                  </div>
                  <p className="eyebrow text-ink/45 mt-5 mb-2">{k.label}</p>
                  <h3 className="h-sm text-2xl">{k.name}</h3>
                  <p className="text-[16px] text-ink/70 mt-2">{k.role}</p>
                  <p className="text-[16px] text-ink font-medium">{k.org}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Speaker wall: every panel speaker, one clean directory ─── */}
        {/* Redesigned 19 September 2026 at ICL's request: all
            {SPEAKER_COUNT_CAP} panel speakers now show here, not a curated
            seven — a step down in visual weight from the keynote portraits
            above on purpose (smaller photos, name and title only, no bio;
            full bios still live on /speakers). A dense, gapped, uniform
            grid rather than the old edge-to-edge tiles reads as a
            professional directory rather than a features wall, and it
            never leaves a hole in the last row the way the no-gap grid did
            — a short row just trails off, which a gapped grid can afford. */}
        <section id="speakers" className="bg-ink tint-indigo">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-24 pb-14 text-center">
            <Reveal>
              <p className="eyebrow text-white mb-5">On stage</p>
              <h2 className="h-lg text-white text-4xl sm:text-5xl">The people you came to meet</h2>
              <p className="lede mt-5 text-white max-w-xl mx-auto text-[16px]">
                {SPEAKER_COUNT_CAP} panel speakers across six tracks, one room, one day.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pb-16">
            <div className="grid gap-x-6 gap-y-11 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
              {SPEAKERS.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 6) * 60}>
                <Link
                  href={`/speakers#${s.slug}`}
                  className="group block"
                  aria-label={`${s.name} — ${s.role}, ${s.org}`}
                >
                  <div className="portrait-tint aspect-[4/5] overflow-hidden bg-raise">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PHOTOS.speakers[i]}
                      alt={s.name}
                      className="portrait w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-3 h-sm text-white text-[14px] sm:text-[15px] leading-snug group-hover:text-marigold transition-colors">
                    {s.name}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-white/55 leading-snug mt-0.5">
                    {s.role}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-white/55 leading-snug">
                    {s.org}
                  </p>
                </Link>
                </Reveal>
              ))}
            </div>
            <p className="mt-12 text-center text-[16px] text-white/70">
              There is room on the programme for one more —{" "}
              <Link href="/contact" className="text-marigold hover:text-white transition-colors underline underline-offset-4">
                propose a session
              </Link>.
            </p>
          </div>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pb-16 flex flex-wrap justify-center gap-3">
            <Btn href="/speakers" tone="onDark" internal>View all speakers</Btn>
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
          </div>
        </section>

        {/* ── Tracks over a photograph ──────────────────────────────── */}
        {/* The hairline earns its keep here specifically: this section and
            the speaker wall above it are both bg-ink, so without it the two
            read as one long dark run. Everywhere else on the site a section
            boundary is drawn by the field changing colour.

            Cards picked up .panel-card on 24 September 2026 at ICL's
            request, same as every other card grid on the site — rounded
            corners, a floating shadow, a hover lift. Each one is now a
            solid bg-raise panel rather than transparent text over the
            floor photo, so the shadow and gloss actually read; the photo
            still shows through in the gaps between cards. */}
        <section id="tracks" className="relative bg-ink border-t border-line">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTOS.floor} alt="" className="w-full h-full object-cover opacity-25" />
          </div>
          <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Reveal><Head eyebrow="Six tracks" dark>Pick what your business actually needs</Head></Reveal>
            <div className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {TRACKS.map((t, i) => (
                /* The whole card is the link, so the target is the card and
                   not a five-word tail. The top rule takes the track's colour
                   and thickens on hover — the only thing that moves, which is
                   enough to say "this is clickable" without decoration. */
                <Reveal key={t.n} delay={Math.min(i, 5) * 70}>
                <Link
                  href={`/tracks#track-${i + 1}`}
                  /* Whole class strings, never `hover:${colour}`. Tailwind
                     only generates what it can read literally in the source,
                     so an interpolated variant compiles to nothing — which is
                     exactly what happened here: marigold worked and the other
                     three silently did not. No transition-colors utility
                     here — .panel-card's own transition list already covers
                     border-color, and a second `transition` shorthand on the
                     same element would just overwrite the first. */
                  className={`panel-card group block bg-raise p-6 sm:p-7 border-t-2 ${
                    ["border-line hover:border-marigold",
                     "border-line hover:border-clay",
                     "border-line hover:border-indigo",
                     "border-line hover:border-palm",
                     "border-line hover:border-marigold",
                     "border-line hover:border-clay"][i]
                  }`}
                >
                  <p className={`font-mono text-[12px] mb-3 ${
                    ["text-marigold","text-clay","text-indigo","text-palm","text-marigold","text-clay"][i]
                  }`}>{t.n}</p>
                  <h3 className="h-sm text-white text-lg group-hover:text-marigold transition-colors">{t.name}</h3>
                  {/* Track 02 has no description yet — see TRACKS. A name on
                      its own reads as incomplete; the old line left in place
                      would have read as wrong. */}
                  {t.line && <p className="lede mt-2.5 text-[16px] text-white">{t.line}</p>}
                  {/* The line that helps someone self-select, which is the
                      most useful thing the track copy added. */}
                  {t.who && <p className="mt-3 text-[16px] font-light text-white">{t.who}</p>}
                  <p className="mt-4 text-[16px] text-marigold">
                    What you will leave with{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Three paths ───────────────────────────────────────────── */}
        {/* Cards use .panel-card (globals.css) for a real gap plus a
            floating shadow, replacing the old shared-hairline seam — same
            treatment now applied to every card grid on the site, at ICL's
            request. See the comment on .panel-card for the full context. */}
        <section id="why" className="bg-paper tint-palm">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Reveal className="text-center" as="div">
              <p className="eyebrow text-ink/45 mb-5">One day to attend</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                Built differently for three kinds of visitor
              </h2>
              <p className="lede mt-5 text-ink/60 max-w-xl mx-auto text-[16px]">
                Same summit, three different reasons to be here — pick the one that
                matches why you are coming.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-3">
              {PATHS.map((p, i) => (
                <Reveal key={p.who} delay={i * 90} className={`panel-card p-8 sm:p-10 flex flex-col ${i === 1 ? "bg-ink text-white" : "bg-card"}`}>
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Five reasons ──────────────────────────────────────────── */}
        <section className="bg-ink tint-marigold">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Reveal className="text-center" as="div">
              <p className="eyebrow text-white mb-5">Why people give up a working day</p>
              <h2 className="h-lg text-white text-4xl sm:text-5xl">
                Five reasons the summit is worth it
              </h2>
              <p className="lede mt-5 text-white max-w-xl mx-auto text-[16px]">
                Not five features — five things people actually leave with.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {REASONS.map((r, i) => (
                <Reveal key={r.n} as="div" delay={i * 70} className="panel-card bg-raise p-8">
                  <p className={`font-mono text-[12px] ${["text-marigold","text-clay","text-indigo","text-palm","text-marigold"][Number(r.n)-1]}`}>{r.n}</p>
                  <h3 className="h-sm text-white text-lg mt-4">{r.t}</h3>
                  <p className="lede mt-3 text-[16px] text-white">{r.d}</p>
                </Reveal>
              ))}
              <div className="p-8 flex items-end">
                <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              </div>
            </div>
          </div>
        </section>

        {/* ── Agenda ────────────────────────────────────────────────── */}
        {/* Redesigned 19 September 2026 against the confirmed programme,
            then redesigned again 25 September 2026 at ICL's request: the
            always-visible hour-by-hour list that used to render here (see
            the git history for that version — `quiet` slots small and
            muted, named slots busy, a rotating accent dot for rhythm) is
            now a single line plus the download bar, with the full running
            order living in components/AgendaPreview.tsx and showing only
            on hover/focus. See that file's own doc comment for the full
            reasoning. */}
        <section id="agenda" className="bg-card tint-clay">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Reveal><Head eyebrow="The confirmed running order">{DATE_DAY_MONTH}, hour by hour</Head></Reveal>
            <Reveal delay={80} className="mt-10">
              <AgendaPreview />
            </Reveal>
          </div>
        </section>

        {/* ── Tickets ───────────────────────────────────────────────── */}
        <section id="tickets" className="bg-paper tint-indigo">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Reveal className="text-center" as="div">
              <p className="eyebrow text-ink/45 mb-5">Tickets</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                {EARLY_BIRD_ACTIVE
                  ? <>Book before <span className="text-clay">{EARLY_BIRD_LABEL}</span> and save KES 1,000</>
                  : "Early bird sold out — book standard now before seats go"}
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-3">
              {TICKETS.map((t, i) => {
                /* The Early Bird tile is the one card whose deal can expire
                   under it. Once EARLY_BIRD_ACTIVE flips false (a redeploy
                   after EARLY_BIRD_ENDS — see the comment on that constant),
                   this tile goes flat and mute rather than still inviting a
                   click on a price that no longer exists: struck-through
                   price, "Sold out" instead of the countdown note, and a CTA
                   that pushes toward booking at the standard rate right now
                   instead of pretending the early tier is still open. */
                const justClosed = t.tier === "Early bird" && !EARLY_BIRD_ACTIVE;
                return (
                  <Reveal
                    key={t.tier}
                    as="div"
                    delay={i * 90}
                    className={`ticket-card panel-card p-8 sm:p-10 flex flex-col ${
                      justClosed ? "bg-card glow-clay" : t.urgent ? "bg-ink text-white" : "bg-card"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className={`eyebrow ${justClosed ? "text-ink/35" : t.urgent ? "text-marigold" : "text-ink/45"}`}>
                        {t.tier}
                      </p>
                      <p
                        className={
                          justClosed
                            ? "sold-out-badge inline-flex items-center rounded-full bg-clay-t text-white font-mono text-[12px] font-semibold uppercase tracking-wide px-3 py-1 glow-clay"
                            : t.urgent
                              ? "font-mono text-[12px] text-marigold font-semibold"
                              : "font-mono text-[12px] text-ink/45"
                        }
                      >
                        {justClosed ? "Sold out" : t.note}
                      </p>
                    </div>
                    <p className={`h-lg mt-6 text-5xl ${justClosed ? "text-clay-t line-through text-glow-clay" : t.urgent ? "text-white" : "text-ink"}`}>
                      {t.currency && <span className="text-lg align-top mr-2 font-normal">{t.currency}</span>}
                      {t.price}
                    </p>
                    <ul className={`mt-8 pt-6 space-y-3 border-t ${justClosed ? "border-rule" : t.urgent ? "border-line" : "border-rule"}`}>
                      {t.includes.map((i) => (
                        <li key={i} className={`flex gap-3 text-[16px] ${justClosed ? "text-ink/45" : t.urgent ? "text-white" : "text-ink/70"}`}>
                          <span className={justClosed ? "text-ink/25" : t.urgent ? "text-marigold" : "text-ink/35"}>✓</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={EVENT.ticketUrl}
                      className={`rounded-lg mt-9 inline-flex justify-center px-6 py-3.5 text-[16px] font-medium transition-colors ${
                        justClosed
                          ? "cta-standard-book bg-paper text-ink/60 hover:text-ink border border-rule"
                          : t.urgent
                            ? "bg-gold text-ink hover:brightness-110"
                            : "bg-ink text-white hover:bg-raise"
                      }`}
                    >
                      {justClosed ? "Book standard now" : `Book ${t.tier.toLowerCase()}`}
                    </a>
                  </Reveal>
                );
              })}
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
        {/* Redesigned 19 September 2026 at ICL's request: the fixed 5×2
            grid (with two hidden filler cells just to keep the row counts
            even at every breakpoint) is gone in favour of one continuously
            scrolling strip, which sidesteps that filler-cell bookkeeping
            entirely — a scrolling row has no "leftover slot" to fill no
            matter how many partners there are. The list is duplicated once
            (see .partner-track in globals.css for why) so it loops without
            a visible seam; the second copy is aria-hidden so screen readers
            only hear each partner named once. */}
        <section className="bg-card border-t border-rule overflow-hidden tint-palm">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20">
            <Reveal>
              <p className="eyebrow text-ink/45 mb-4">2026 partners</p>
              <h2 className="h-lg text-3xl sm:text-4xl max-w-2xl">
                Convened alongside
              </h2>
            </Reveal>
          </div>
          {/* Full-bleed, outside the max-width wrapper above, so the strip
              can scroll edge to edge and the fade mask has room to work
              against the section's own background rather than a hard
              content-column edge. */}
          <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)]">
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
                    className="w-full max-w-[190px] h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section id="faq" className="bg-paper tint-marigold">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Reveal><Head eyebrow="Before you book">Questions</Head></Reveal>
            <dl className="mt-14 grid sm:grid-cols-2 gap-x-16 border-t border-rule">
              {FAQ.map((f, i) => (
                <Reveal key={f.q} as="div" delay={Math.min(i, 5) * 60} className="py-6 border-b border-rule">
                  <dt className="h-sm text-[18px]">{f.q}</dt>
                  <dd className="lede mt-2 text-[16px] text-ink/65">{f.a}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────── */}
        <section className="bg-ink tint-clay">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-24 pb-16 text-center">
            <Reveal>
              <h2 className="h-lg text-white text-4xl sm:text-6xl max-w-3xl mx-auto">
                One day. One room. Bring the business.
              </h2>
              <p className="lede mt-6 text-white">
                {EVENT.dateLabel} · <span className="venue-float">{EVENT.venue}</span>, {VENUE_SHORT}
              </p>
            </Reveal>
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
