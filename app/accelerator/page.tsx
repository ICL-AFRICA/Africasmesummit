import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import {
  EVENT, DATE_LONG, TICKET_CTA, SIGNATURE_OPPORTUNITIES, AGENDA,
  ACCELERATOR, ACCELERATOR_FACULTY, ACCELERATOR_MONTHS, ACCELERATOR_SYLLABUS,
  ACCELERATOR_GRADUATES, ACCELERATOR_CERTIFICATION, ACCELERATOR_AWARD_WINNERS,
} from "@/lib/event";

/* Derived, never typed — the curriculum lives in ACCELERATOR_MONTHS. */
const SESSION_COUNT = ACCELERATOR_MONTHS.reduce((n, m) => n + m.sessions.length, 0);

/* One brand colour per month, rotated (marigold, indigo, palm — clay stays
   reserved for the early-bird deadline). Whole class strings only, so
   Tailwind can read every one literally. The order is also chosen so no
   month sits next to an identically tinted section: Faculty above is
   palm, Graduants below is marigold. The colour lives on the card rule,
   the month bar and the ticks, never on small text: the site's "-t" text
   tokens are tuned for paper and measure well under 3:1 on this dark
   page (marigold-t is about 2.4:1), so labels here stay white and let
   weight and size carry the hierarchy. */
const MONTH_STYLE = [
  { tint: "tint-marigold", bar: "bg-marigold", tick: "text-marigold", border: "border-marigold" },
  { tint: "tint-indigo", bar: "bg-indigo", tick: "text-indigo", border: "border-indigo" },
  { tint: "tint-palm", bar: "bg-palm", tick: "text-palm", border: "border-palm" },
] as const;

export const metadata: Metadata = {
  title: `${ACCELERATOR.name} — ${EVENT.name} ${EVENT.year}`,
  description:
    `${ACCELERATOR.tagline}, live today at jiinuehub.com and introduced from the ${EVENT.name} stage, ${DATE_LONG} at ${EVENT.venue}. A ${SESSION_COUNT}-session, ${ACCELERATOR_MONTHS.length}-month curriculum from baseline assessment to investor pitch.`,
  alternates: { canonical: "https://africasmesummit.com/accelerator" },
};

/* The Award's own time/body already live in SIGNATURE_OPPORTUNITIES
   (shared with /partner) — read from there rather than retyping the 16:30
   slot and its description a third time. */
const AWARD = SIGNATURE_OPPORTUNITIES.find((o) => o.name === "The Africa SME Award 2026")!;

/* The 10:30 "Launches" slot already carries Jiinue's own introduction,
   alongside the three other things launching the same moment (Juapath's
   research study, the SLP Project, next year's summit) — read straight
   from AGENDA rather than retyped, so this stays correct if the running
   order ever moves again. Rendered below as a real excerpt of the day's
   schedule with Jiinue's own row picked out, not a separate claim about
   the agenda that could drift from it. */
const LAUNCHES = AGENDA.find((a) => a.title === "Launches")!;
const LAUNCH_SESSIONS = LAUNCHES.sessions ?? [];

/**
 * Shared "nothing to show yet" panel for a section whose backing list in
 * lib/event.ts is still empty — ACCELERATOR_FACULTY, _GRADUATES and
 * _AWARD_WINNERS are all empty until the programme actually has faculty,
 * graduates or named winners (see
 * the doc comment above ACCELERATOR in lib/event.ts). A plain honest
 * notice here, never an invented name or a blank heading with nothing
 * under it.
 */
function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel-card bg-ink border border-dashed border-line p-7 sm:p-8 max-w-2xl">
      <p className="text-[16px] text-white">{children}</p>
    </div>
  );
}

export default function Accelerator() {
  return (
    <PageShell
      current="/accelerator"
      eyebrow="Launching at the summit"
      title={ACCELERATOR.name}
      lede={`${ACCELERATOR.tagline} — launching live from the summit stage at ${ACCELERATOR.launchTime} on ${EVENT.dateLabel}, introduced by the ${ACCELERATOR.launchIntroRole}.`}
    >
      {/* About + "Live now" — what Jiinue actually does, then the actual
          way in. Added 5 October 2026 when ICL corrected the page's own
          premise: Jiinue isn't a future project, it's already built and
          live at jiinuehub.com — so the page's job is getting a business,
          service provider or academic institution to click through and
          start, not just describing something not built yet. The two
          halves below are deliberately paired in one section rather than
          stacked as separate ones: left is the platform's own name as a
          live link plus the direct call to action (ICL's exact line, in
          ACCELERATOR.ctaLine); right is the real agenda slot it launches
          in, pulled from AGENDA itself rather than retyped, with its own
          row picked out from the other three things launching alongside
          it at 10:30. Read together they tell the actual story — already
          live today, AND introduced to the whole room on the day — rather
          than making a reader piece that together from two separate
          sections. */}
      <section className="border-b border-line tint-indigo">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <Reveal>
              <p className="eyebrow text-indigo-t mb-3">Live now</p>
              <h2 className="h-lg text-3xl sm:text-4xl max-w-xl">
                <a
                  href={ACCELERATOR.url}
                  className="text-white underline decoration-white/30 underline-offset-8 hover:decoration-white transition-colors"
                >
                  {ACCELERATOR.name}
                  <span aria-hidden="true" className="text-[20px] ml-2">↗</span>
                </a>
              </h2>
              <p className="lede mt-5 max-w-xl text-[17px] text-white">{ACCELERATOR.body}</p>
              <p className="h-sm text-white text-xl mt-7 max-w-xl">{ACCELERATOR.ctaLine}</p>
              <Btn href={ACCELERATOR.url} tone="gold" className="mt-6">{ACCELERATOR.ctaButton}</Btn>
            </Reveal>

            <Reveal delay={90}>
              <p className="eyebrow text-indigo-t mb-3">On the agenda</p>
              <h3 className="h-sm text-white text-xl sm:text-2xl max-w-md">
                Introduced live, {LAUNCHES.time} on {EVENT.dateLabel}
              </h3>
              <div className="mt-6 panel-card bg-ink p-5 sm:p-6">
                {LAUNCH_SESSIONS.map((s) => {
                  const isJiinue = s.title.toLowerCase().includes("jiinue");
                  return (
                    <div
                      key={s.title}
                      className="flex items-baseline gap-3 py-3 border-b border-line last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 shrink-0 rounded-full mt-1.5 ${isJiinue ? "bg-marigold" : "bg-white/20"}`}
                      />
                      <span className="font-mono tabular-nums text-[12px] text-white/50 shrink-0 w-11">
                        {LAUNCHES.time}
                      </span>
                      <div>
                        <p className={`text-[15px] text-white ${isJiinue ? "font-semibold" : ""}`}>{s.title}</p>
                        <p className="text-[13px] text-white/60 mt-0.5">{s.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-[14px] text-white/60">
                <Link href="/#agenda" className="underline underline-offset-4 hover:text-white transition-colors">
                  See the full day&rsquo;s agenda
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Faculty ────────────────────────────────────────────────── */}
      {/* tint-palm, not indigo — the new "Live now" section above this
          one (added 5 October 2026) already uses tint-indigo, and two
          identically-tinted sections back to back reads as one long
          block rather than two. Palm was otherwise next unused going
          into the Sessions intro (plain) and the three month sections below. */}
      <section className="border-b border-line tint-palm">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-palm-t mb-3">Faculty</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">
              The mentors and instructors behind each module
            </h2>
          </Reveal>
          <div className="mt-10">
            {ACCELERATOR_FACULTY.length === 0 ? (
              <Reveal>
                <ComingSoon>
                  Faculty are announced as the programme is confirmed — the mentors
                  and instructors leading each module will appear here with their
                  roles and organisations.
                </ComingSoon>
              </Reveal>
            ) : (
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {ACCELERATOR_FACULTY.map((f, i) => (
                  <Reveal key={f.name} as="div" delay={Math.min(i, 5) * 70}>
                    <div className="keynote-frame portrait-tint aspect-[4/5] overflow-hidden bg-raise">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.photo} alt={f.name} className="portrait w-full h-full object-cover" />
                    </div>
                    <h3 className="h-sm text-white text-xl mt-5">{f.name}</h3>
                    <p className="text-[15px] text-white mt-1">{f.role}</p>
                    <p className="text-[15px] text-white font-medium">{f.org}</p>
                    {f.bio.map((p, n) => (
                      <p key={n} className="lede text-[15px] text-white mt-3 max-w-md">{p}</p>
                    ))}
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Sessions: the curriculum ───────────────────────────────── */}
      {/* Built 8 October 2026 from the curriculum ICL supplied (ACCELERATOR_
          MONTHS in lib/event.ts), replacing what used to be an empty
          "sessions to be announced" notice. An intro with the two actions
          first (start on Jiinue Hub, or take the syllabus away), then one
          section per month so the programme reads as a journey rather than
          a flat list of twelve. Nothing here states how sessions are
          delivered, when a cohort starts, who can join or what it costs —
          the curriculum doesn't say, so the page doesn't either. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-marigold mb-3">Sessions</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">
              What the programme actually covers
            </h2>
            <p className="lede mt-5 max-w-2xl text-[17px] text-white">
              {SESSION_COUNT} sessions across {ACCELERATOR_MONTHS.length} months, from a
              baseline diagnostic to a final pitching competition and graduation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Btn href={ACCELERATOR.url} tone="gold">{ACCELERATOR.ctaButton}</Btn>
              <a
                href={ACCELERATOR_SYLLABUS.url}
                download
                className="btn-glow rounded-lg inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium border border-line text-white transition-all hover:border-marigold hover:text-marigold-t"
              >
                {ACCELERATOR_SYLLABUS.label}
                <span aria-hidden="true" className="text-[12px]">↓</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {ACCELERATOR_MONTHS.map((m, mi) => {
        const style = MONTH_STYLE[mi % MONTH_STYLE.length];
        return (
          <section key={m.month} className={`border-b border-line ${style.tint}`}>
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
              <Reveal>
                <span aria-hidden="true" className={`block h-1 w-12 rounded-full mb-4 ${style.bar}`} />
                <p className="eyebrow text-white mb-3">Month {m.month}</p>
                <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">{m.title}</h2>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {m.sessions.map((s, i) => (
                  <Reveal
                    key={s.number}
                    as="div"
                    delay={i * 70}
                    className={`panel-card bg-raise p-7 sm:p-8 flex flex-col border-t-2 ${style.border}`}
                  >
                    <p className="font-mono text-[12px] uppercase tracking-widest text-white">
                      Session {String(s.number).padStart(2, "0")}
                    </p>
                    <h3 className="h-sm text-white text-xl sm:text-2xl mt-3">{s.title}</h3>
                    {s.subtitle && (
                      <p className="mt-1 text-[16px] font-semibold text-white">{s.subtitle}</p>
                    )}
                    <p className="eyebrow text-white mt-6">Learning objective</p>
                    <p className="lede mt-2 text-[16px] text-white">{s.objective}</p>
                    <p className="eyebrow text-white mt-6">Key deliverables</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-[16px] text-white">
                          <span aria-hidden="true" className={`flex-none ${style.tick}`}>✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Graduants ──────────────────────────────────────────────── */}
      <section className="border-b border-line tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-marigold-t mb-3">Graduants</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">
              Businesses that complete the Accelerator
            </h2>
          </Reveal>
          <div className="mt-10">
            {ACCELERATOR_GRADUATES.length === 0 ? (
              <Reveal>
                <ComingSoon>
                  Nobody has graduated yet — Jiinue launches from the summit stage
                  on {EVENT.dateLabel}. The first cohort&rsquo;s graduates, and the
                  businesses they run, will be celebrated here once they complete
                  the programme.
                </ComingSoon>
              </Reveal>
            ) : (
              <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {ACCELERATOR_GRADUATES.map((g, i) => (
                  <Reveal key={g.name} as="div" delay={Math.min(i, 7) * 60}>
                    {g.photo && (
                      <div className="portrait-tint aspect-[4/5] max-w-[13rem] overflow-hidden bg-raise">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.photo} alt={g.name} className="portrait w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="h-sm text-white text-xl mt-4">{g.name}</h3>
                    <p className="text-[15px] text-white mt-1">{g.business}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Certification ──────────────────────────────────────────── */}
      {/* Unlike Faculty/Graduants/Award winners above and below,
          this isn't a "to be announced" section — certification is a real,
          already-live mechanism of the platform itself, confirmed by ICL
          5 October 2026 (see the doc comment on ACCELERATOR_CERTIFICATION
          in lib/event.ts). No ComingSoon panel here; the body states the
          mechanism plainly, with a direct way to start it. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-palm-t mb-3">Certification</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">What completing it earns you</h2>
            <p className="lede mt-5 max-w-2xl text-[17px] text-white">{ACCELERATOR_CERTIFICATION.body}</p>
            <Btn href={ACCELERATOR.url} tone="onDark" className="mt-7">Get certified on Jiinue Hub</Btn>
          </Reveal>
        </div>
      </section>

      {/* ── Africa SME Award winners ───────────────────────────────── */}
      <section className="tint-palm">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-palm-t mb-3">Africa SME Award winners</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">
              Announced live, {AWARD.time} on {EVENT.dateLabel}
            </h2>
            <p className="lede mt-5 max-w-2xl text-[17px] text-white">{AWARD.body}</p>
          </Reveal>
          <div className="mt-10">
            {ACCELERATOR_AWARD_WINNERS.length === 0 ? (
              <Reveal>
                <ComingSoon>
                  Winners are named from the stage at the ceremony itself — this
                  section lists them, with their businesses, once they&rsquo;re
                  announced.
                </ComingSoon>
              </Reveal>
            ) : (
              <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {ACCELERATOR_AWARD_WINNERS.map((w, i) => (
                  <Reveal key={w.name} as="div" delay={Math.min(i, 7) * 60}>
                    {w.photo && (
                      <div className="portrait-tint aspect-[4/5] max-w-[13rem] overflow-hidden bg-raise">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={w.photo} alt={w.name} className="portrait w-full h-full object-cover" />
                      </div>
                    )}
                    {w.category && <p className="font-mono text-[12px] text-palm-t mt-4">{w.category}</p>}
                    <h3 className="h-sm text-white text-xl mt-2">{w.name}</h3>
                    <p className="text-[15px] text-white mt-1">{w.business}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Close — same two actions as every other page, plus a way for
          someone who wants to be faculty, a mentor or an Accelerator
          partner to say so, since that's a real path into this page that
          "Get a ticket" doesn't cover. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-20 sm:py-24 text-center">
          <h2 className="h-lg text-white text-3xl sm:text-5xl max-w-2xl mx-auto">
            Want to be part of it — as faculty, a mentor or a partner?
          </h2>
          <p className="lede mt-5 text-white">
            {EVENT.venue}, {EVENT.city}, {EVENT.dateLabel}.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
            <Btn href="/partner#enquire" tone="onDark" internal>Get in touch</Btn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
