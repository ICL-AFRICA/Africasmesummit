import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import {
  EVENT, DATE_LONG, TICKET_CTA, SIGNATURE_OPPORTUNITIES,
  ACCELERATOR, ACCELERATOR_FACULTY, ACCELERATOR_SESSIONS,
  ACCELERATOR_GRADUATES, ACCELERATOR_CERTIFICATION, ACCELERATOR_AWARD_WINNERS,
} from "@/lib/event";

export const metadata: Metadata = {
  title: `The Jiinue Business Accelerator — ${EVENT.name} ${EVENT.year}`,
  description:
    `${ACCELERATOR.tagline}, launching from the ${EVENT.name} stage, ${DATE_LONG} at ${EVENT.venue}.`,
  alternates: { canonical: "https://africasmesummit.com/accelerator" },
};

/* The Award's own time/body already live in SIGNATURE_OPPORTUNITIES
   (shared with /partner) — read from there rather than retyping the 16:30
   slot and its description a third time. */
const AWARD = SIGNATURE_OPPORTUNITIES.find((o) => o.name === "The Africa SME Award 2026")!;

/**
 * Shared "nothing to show yet" panel for a section whose backing list in
 * lib/event.ts is still empty — ACCELERATOR_FACULTY, _SESSIONS,
 * _GRADUATES and _AWARD_WINNERS are all empty until the programme
 * actually has faculty, a session list, graduates or named winners (see
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
      {/* About — what Jiinue actually does, in plain terms. Plain bg-ink,
          no tint: this is the page's own read-this-first paragraph, not
          one of the five named sections Mike asked for, so it stays
          visually quieter than they are. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="lede max-w-2xl text-[18px] text-white">{ACCELERATOR.body}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Faculty ────────────────────────────────────────────────── */}
      <section className="border-b border-line tint-indigo">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-indigo-t mb-3">Faculty</p>
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

      {/* ── Sessions ───────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-marigold-t mb-3">Sessions</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">
              What the programme actually covers
            </h2>
          </Reveal>
          <div className="mt-10">
            {ACCELERATOR_SESSIONS.length === 0 ? (
              <Reveal>
                <ComingSoon>
                  The session list is published once the first cohort's modules
                  are set — each one will appear here with what it covers.
                </ComingSoon>
              </Reveal>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {ACCELERATOR_SESSIONS.map((s, i) => (
                  <Reveal key={s.title} as="div" delay={i * 70} className="panel-card bg-raise/60 p-7 sm:p-8">
                    <h3 className="h-sm text-white text-xl">{s.title}</h3>
                    <p className="lede mt-3 text-[16px] text-white">{s.summary}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

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
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-palm-t mb-3">Certification</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl">What graduating earns you</h2>
            <p className="lede mt-5 max-w-2xl text-[17px] text-white">{ACCELERATOR_CERTIFICATION.body}</p>
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
