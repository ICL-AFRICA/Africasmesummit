import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import Countdown from "@/components/Countdown";
import Link from "next/link";
import {
  EVENT, TRACKS, PAPERS_TICKET, TICKET_CTA, DATE_DAY_MONTH,
  PAPERS_SUBMISSION_DEADLINE, PAPERS_SUBMISSION_LABEL, PAPERS_SUBMISSIONS_OPEN,
  PAPERS_NOTIFY_DATE, PAPERS_NOTIFY_LABEL, PAPERS_NOTIFY_PENDING,
} from "@/lib/event";

export const metadata: Metadata = {
  title: PAPERS_SUBMISSIONS_OPEN
    ? `Call for papers — closes ${PAPERS_SUBMISSION_LABEL} — ${EVENT.name} ${EVENT.year}`
    : `Call for papers — ${EVENT.name} ${EVENT.year}`,
  description: PAPERS_SUBMISSIONS_OPEN
    ? `Submissions for the Africa SME Summit ${EVENT.year} call for papers are open until ${PAPERS_SUBMISSION_LABEL}. Selection notifications go out ${PAPERS_NOTIFY_LABEL}.`
    : `Submissions for the Africa SME Summit ${EVENT.year} call for papers are closed. Selection notifications go out ${PAPERS_NOTIFY_LABEL}.`,
  alternates: { canonical: "https://africasmesummit.com/papers" },
};

/* Step 01 is the only one that changes shape between the two states —
   the rest of the pipeline (review, present, publish) runs the same
   either way. Written as a ternary on the whole entry rather than just
   its fields, so nothing here can end up half in one state and half in
   the other. */
const STEPS = [
  PAPERS_SUBMISSIONS_OPEN
    ? { n: "01", t: "Submissions open", d: `The window closes ${PAPERS_SUBMISSION_LABEL}. Get your abstract in before then.` }
    : { n: "01", t: "Submissions closed", d: `The window closed ${PAPERS_SUBMISSION_LABEL}. Every abstract that came in is now with the committee.` },
  { n: "02", t: "Review", d: "The committee reads every submission and replies within three weeks." },
  { n: "03", t: "Present", d: `Accepted papers are presented in their track on ${DATE_DAY_MONTH}.` },
  { n: "04", t: "Publish", d: "Selected papers go into the post-summit proceedings." },
];

export default function Papers() {
  return (
    <PageShell
      current="/papers"
      eyebrow={PAPERS_SUBMISSIONS_OPEN ? `Call for papers — closes ${PAPERS_SUBMISSION_LABEL}` : "Call for papers — submissions closed"}
      title="Research that reaches the businesses it is about"
      lede={
        PAPERS_SUBMISSIONS_OPEN
          ? `Submissions are open until ${PAPERS_SUBMISSION_LABEL} — send your abstract and hear back by ${PAPERS_NOTIFY_LABEL}, accepted or not.`
          : `Submissions closed ${PAPERS_SUBMISSION_LABEL}. The committee is reading every one of them now — everyone who sent an abstract hears back by ${PAPERS_NOTIFY_LABEL}, accepted or not.`
      }
    >
      {/* This card is the anticipation mechanism /papers builds around,
          whichever state the call is in — a live countdown rather than a
          dead one. Extended 20 September 2026: submissions reopened until
          PAPERS_SUBMISSION_DEADLINE (a real future date now, not a past
          one), so this card counts down to THAT while open — urgency to
          get an abstract in — and only switches to counting down to the
          notification date once the window shuts again, which is the one
          and only thing it used to count down to before the extension.
          Boxed rather than run as plain paragraphs — a bordered, tinted
          card so it reads as a widget you'd check back on, not another
          block of copy. */}
      <section className="border-b border-line bg-raise/30">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="notify-card rounded-xl border border-marigold/40 bg-ink p-8 sm:p-12 grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
            <div>
              <p className="eyebrow text-marigold-t mb-5">
                {PAPERS_SUBMISSIONS_OPEN ? "Closing soon" : "What’s next"}
              </p>
              <h2 className="h-lg text-white text-3xl sm:text-4xl">
                {PAPERS_SUBMISSIONS_OPEN
                  ? "The window is open again"
                  : (PAPERS_NOTIFY_PENDING ? "Results land soon" : "Results are out")}
              </h2>
              <p className="lede mt-5 text-white text-[16px] max-w-md">
                {PAPERS_SUBMISSIONS_OPEN
                  ? `Submissions close ${PAPERS_SUBMISSION_LABEL}. Get your abstract in before then — everyone who submits hears back by ${PAPERS_NOTIFY_LABEL}, accepted or not.`
                  : (PAPERS_NOTIFY_PENDING
                    ? `Every submitter hears from the committee by ${PAPERS_NOTIFY_LABEL} — accepted or not. Accepted papers present live to the room on ${DATE_DAY_MONTH}.`
                    : `Notifications went out ${PAPERS_NOTIFY_LABEL}. If you submitted and haven't heard from us, `)}
                {!PAPERS_SUBMISSIONS_OPEN && !PAPERS_NOTIFY_PENDING && (
                  <Link href="/contact" className="underline underline-offset-4 hover:text-marigold">
                    get in touch
                  </Link>
                )}
                {!PAPERS_SUBMISSIONS_OPEN && !PAPERS_NOTIFY_PENDING && "."}
              </p>
              <p className="lede mt-4 text-white/60 text-[15px] max-w-md">
                {PAPERS_SUBMISSIONS_OPEN ? (
                  <>
                    Ready to send yours?{" "}
                    <Link href="/contact" className="underline underline-offset-4 hover:text-marigold">
                      Get in touch
                    </Link>{" "}
                    and we'll point you to the submission form.
                  </>
                ) : (
                  <>
                    Missed this round?{" "}
                    <Link href="/contact" className="underline underline-offset-4 hover:text-marigold">
                      Ask us to flag you
                    </Link>{" "}
                    for the next call for papers.
                  </>
                )}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Countdown
                target={PAPERS_SUBMISSIONS_OPEN ? PAPERS_SUBMISSION_DEADLINE : PAPERS_NOTIFY_DATE}
                activeLabel={PAPERS_SUBMISSIONS_OPEN ? "Submissions close in" : "Notifications in"}
                endedLabel={PAPERS_SUBMISSIONS_OPEN ? "Submissions have closed." : "Notifications are out."}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line tint-clay">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-10 flex flex-wrap items-center justify-between gap-6">
          <Reveal as="div">
            <p className="eyebrow text-marigold-t mb-2">Papers call ticket</p>
            <p className="h-lg text-white text-3xl">
              <span className="text-base align-top mr-2 font-normal">{PAPERS_TICKET.currency}</span>
              {PAPERS_TICKET.price}
            </p>
            <p className="lede mt-2 text-[16px] text-white">
              Includes full delegate access on the day.
            </p>
          </Reveal>
          <Btn href={EVENT.ticketUrl} tone="gold">Book the papers ticket</Btn>
        </div>
      </section>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal as="p" className="eyebrow text-white mb-5">How it works</Reveal>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} as="div" delay={i * 80} className="bg-ink p-8">
                <p className="font-mono text-[12px] text-marigold">{s.n}</p>
                <h3 className="h-sm text-white text-lg mt-4">{s.t}</h3>
                <p className="lede mt-3 text-[16px] text-white">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal as="p" className="eyebrow text-white mb-5">
            {PAPERS_SUBMISSIONS_OPEN ? "The six tracks you can submit against" : "The six tracks submissions came in against"}
          </Reveal>
          <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <Reveal key={t.n} as="div" delay={Math.min(i, 5) * 70} className="border-t border-line pt-5">
                <p className="font-mono text-[12px] text-marigold-t mb-3">{t.n}</p>
                <h3 className="h-sm text-white text-lg">{t.name}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
            <Btn href="/contact" tone="onDark" internal>Ask a question</Btn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
