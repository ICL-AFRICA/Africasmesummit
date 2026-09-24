import Link from "next/link";
import Btn from "@/components/Btn";
import HeroMosaic from "@/components/HeroMosaic";
import StickyBar from "@/components/StickyBar";
import TicketTicker from "@/components/TicketTicker";
import SummitCountdownBadge from "@/components/SummitCountdownBadge";
import Countdown from "@/components/Countdown";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { EVENT, VENUE_SHORT, TICKETS, SPEAKERS, TRACKS, PATHS, AGENDA, FAQ, PARTNERS, PHOTOS, REASONS, EARLY_BIRD_LABEL, EARLY_BIRD_ACTIVE, TICKET_CTA, SPEAKER_COUNT_CAP, DATE_DAY_MONTH, AGENDA_SOURCE, KEYNOTES, SUMMIT_STARTS, PROGRAMME_URL } from "@/lib/event";

/* Agenda accent colours — the same four-colour rotation used on /tracks
   (marigold, clay, indigo, palm), so a track's colour means the same thing
   wherever it shows up on the site rather than the agenda inventing its
   own palette. Two forms because a `bg-*` dot and a `border-*` rule need
   different Tailwind classes for the same colour. */
const AGENDA_ACCENT_BG = ["bg-marigold", "bg-clay", "bg-indigo", "bg-palm"];
const AGENDA_ACCENT_BORDER = ["border-marigold", "border-clay", "border-indigo", "border-palm"];

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
              <p className="text-white"><span className="venue-float">{EVENT.venue}</span>, {VENUE_SHORT}</p>
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
              Kenya&rsquo;s small businesses carry 80% of the workforce and get almost
              none of the support. This is the one day that changes that — the capital,
              the buyers, the county governments and the thirteen universities that can
              move them forward, all in one room.
            </p>
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
        <section className="bg-card border-t border-rule">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20 sm:py-24">
            <div className="text-center mb-14">
              <p className="eyebrow text-ink/45 mb-5">Keynote</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                Before the tracks open
              </h2>
              <p className="lede mt-5 text-ink/60 max-w-2xl mx-auto text-[16px]">
                Two Vice-Chancellors, the summit&rsquo;s own convener, the CEO of the
                Teachers Service Commission, and Nairobi County&rsquo;s CECM for Business
                and Hustler Opportunities, setting the tone before six tracks open.
              </p>
            </div>
            <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {KEYNOTES.map((k) => (
                <div key={k.slug}>
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
                </div>
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
        <section id="speakers" className="bg-ink">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pt-24 pb-14 text-center">
            <p className="eyebrow text-white mb-5">On stage</p>
            <h2 className="h-lg text-white text-4xl sm:text-5xl">The people you came to meet</h2>
            <p className="lede mt-5 text-white max-w-xl mx-auto text-[16px]">
              {SPEAKER_COUNT_CAP} panel speakers across six tracks, one room, one day.
            </p>
          </div>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 pb-16">
            <div className="grid gap-x-6 gap-y-11 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
              {SPEAKERS.map((s, i) => (
                <Link
                  key={s.slug}
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
            <Head eyebrow="Six tracks" dark>Pick what your business actually needs</Head>
            <div className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {TRACKS.map((t, i) => (
                /* The whole card is the link, so the target is the card and
                   not a five-word tail. The top rule takes the track's colour
                   and thickens on hover — the only thing that moves, which is
                   enough to say "this is clickable" without decoration. */
                <Link
                  key={t.n}
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
              ))}
            </div>
          </div>
        </section>

        {/* ── Three paths ───────────────────────────────────────────── */}
        {/* Cards use .panel-card (globals.css) for a real gap plus a
            floating shadow, replacing the old shared-hairline seam — same
            treatment now applied to every card grid on the site, at ICL's
            request. See the comment on .panel-card for the full context. */}
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
            <div className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-3">
              {PATHS.map((p, i) => (
                <div key={p.who} className={`panel-card p-8 sm:p-10 flex flex-col ${i === 1 ? "bg-ink text-white" : "bg-card"}`}>
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
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {REASONS.map((r) => (
                <div key={r.n} className="panel-card bg-raise p-8">
                  <p className={`font-mono text-[12px] ${["text-marigold","text-clay","text-indigo","text-palm","text-marigold"][Number(r.n)-1]}`}>{r.n}</p>
                  <h3 className="h-sm text-white text-lg mt-4">{r.t}</h3>
                  <p className="lede mt-3 text-[16px] text-white">{r.d}</p>
                </div>
              ))}
              <div className="p-8 flex items-end">
                <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              </div>
            </div>
          </div>
        </section>

        {/* ── Agenda ────────────────────────────────────────────────── */}
        {/* Redesigned 19 September 2026 against the confirmed programme:
            the old plain-row list treated every slot as equally weighty,
            which is wrong now that most slots carry a named facilitator and
            three carry several concurrent sessions at once. Logistics
            (`quiet`: arrivals, breaks, prayers, the photo session) render
            small and muted so the actual content of the day — the talks,
            launches and parallel tracks — is what reads as busy. A rotating
            accent dot gives the list some rhythm without any motion, in
            keeping with the rest of the page. */}
        <section id="agenda" className="bg-card">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <Head eyebrow="The confirmed running order">{DATE_DAY_MONTH}, hour by hour</Head>
            <div className="mt-14 border-t border-rule">
              {AGENDA.map((a, i) => (
                <div
                  key={a.time}
                  className={`grid grid-cols-[3.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 border-b border-rule transition-colors hover:bg-raise/50 ${a.quiet ? "py-4" : "py-7 sm:py-8"}`}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${a.quiet ? "bg-ink/15" : AGENDA_ACCENT_BG[i % AGENDA_ACCENT_BG.length]}`}
                    />
                    <span className={`font-mono tabular-nums ${a.quiet ? "text-[13px] text-ink/35" : "text-[15px] sm:text-[16px] text-ink/45"}`}>
                      {a.time}
                    </span>
                  </div>
                  <div>
                    <p className={a.quiet ? "text-[15px] text-ink/50" : "h-sm text-lg sm:text-2xl"}>
                      {a.title}
                    </p>
                    {a.note && (
                      <p className={`mt-1.5 text-[15px] sm:text-[16px] ${a.quiet ? "text-ink/40" : "text-ink/55"}`}>
                        {a.note}
                      </p>
                    )}
                    {/* Concurrent sessions under one time — the 10:30 launches
                        and the two blocks of parallel tracks. Each gets its
                        own accent border so a dense block still scans as
                        several distinct things, not one paragraph. */}
                    {a.sessions && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {a.sessions.map((s, j) => (
                          <div key={s.title} className={`border-l-2 pl-4 ${AGENDA_ACCENT_BORDER[j % AGENDA_ACCENT_BORDER.length]}`}>
                            <p className="text-[15px] sm:text-[16px] font-medium text-ink">{s.title}</p>
                            <p className="mt-1 text-[14px] text-ink/55">{s.note}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[12px] text-ink/45">
              {AGENDA_SOURCE}
            </p>

            {/* Downloadable programme — the confirmed PDF this agenda is
                transcribed from, for anyone who wants the whole running
                order to keep, print or forward, rather than re-scrolling
                this section on the day. Placed directly under the agenda
                it mirrors, at ICL's request. Same download-link pattern as
                the partnership brochure on /partner (a plain link with the
                `download` attribute, not a Btn — the arrow Btn always
                renders implies a page to visit, not a file to keep), so a
                "get the PDF" action looks the same wherever it shows up. */}
            <div className="mt-10 flex flex-wrap items-center gap-5 border border-rule bg-raise/40 px-6 sm:px-8 py-6">
              <span aria-hidden="true" className="font-mono text-[12px] text-ink/40 tracking-widest">PDF</span>
              <p className="flex-1 min-w-[220px] text-[15px] sm:text-[16px] text-ink">
                Get the full confirmed programme — every slot, every facilitator.
              </p>
              <a
                href={PROGRAMME_URL}
                download
                className="btn-glow rounded-lg inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium transition-all border border-ink/20 text-ink hover:border-ink"
              >
                Get the full programme (PDF)
                <span aria-hidden="true" className="text-[12px]">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Tickets ───────────────────────────────────────────────── */}
        <section id="tickets" className="bg-paper">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-24 sm:py-28">
            <div className="text-center">
              <p className="eyebrow text-ink/45 mb-5">Tickets</p>
              <h2 className="h-lg text-4xl sm:text-5xl max-w-2xl mx-auto">
                {EARLY_BIRD_ACTIVE
                  ? <>Book before <span className="text-clay">{EARLY_BIRD_LABEL}</span> and save KES 1,000</>
                  : "Early bird sold out — book standard now before seats go"}
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-3">
              {TICKETS.map((t) => {
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
                  <div
                    key={t.tier}
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
                  </div>
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
        <section className="bg-card border-t border-rule overflow-hidden">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20">
            <p className="eyebrow text-ink/45 mb-4">2026 partners</p>
            <h2 className="h-lg text-3xl sm:text-4xl max-w-2xl">
              Convened alongside
            </h2>
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
              {EVENT.dateLabel} · <span className="venue-float">{EVENT.venue}</span>, {VENUE_SHORT}
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
