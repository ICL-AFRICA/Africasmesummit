import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Btn from "@/components/Btn";
import Countdown from "@/components/Countdown";
import Link from "next/link";
import {
  EVENT, TRACKS, PAPERS_TICKET, TICKET_CTA, DATE_DAY_MONTH,
  PAPERS_NOTIFY_DATE, PAPERS_NOTIFY_LABEL, PAPERS_NOTIFY_PENDING,
} from "@/lib/event";

export const metadata: Metadata = {
  title: `Call for papers — ${EVENT.name} ${EVENT.year}`,
  description:
    `Submissions for the Africa SME Summit ${EVENT.year} call for papers are closed. Selection notifications go out ${PAPERS_NOTIFY_LABEL}.`,
  alternates: { canonical: "https://africasmesummit.com/papers" },
};

const STEPS = [
  { n: "01", t: "Submissions closed", d: "The window closed 14 September. Every abstract that came in is now with the committee." },
  { n: "02", t: "Review", d: "The committee reads every submission and replies within three weeks." },
  { n: "03", t: "Present", d: `Accepted papers are presented in their track on ${DATE_DAY_MONTH}.` },
  { n: "04", t: "Publish", d: "Selected papers go into the post-summit proceedings." },
];

export default function Papers() {
  return (
    <PageShell
      current="/papers"
      eyebrow="Call for papers — submissions closed"
      title="Research that reaches the businesses it is about"
      lede={`Submissions closed 14 September. The committee is reading every one of them now — everyone who sent an abstract hears back by ${PAPERS_NOTIFY_LABEL}, accepted or not.`}
    >
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-marigold-t mb-2">Papers call ticket</p>
            <p className="h-lg text-white text-3xl">
              <span className="text-base align-top mr-2 font-normal">{PAPERS_TICKET.currency}</span>
              {PAPERS_TICKET.price}
            </p>
            <p className="lede mt-2 text-[16px] text-white">
              Includes full delegate access on the day.
            </p>
          </div>
          <Btn href={EVENT.ticketUrl} tone="gold">Book the papers ticket</Btn>
        </div>
      </section>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="eyebrow text-white mb-5">How it works</p>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-ink p-8">
                <p className="font-mono text-[12px] text-marigold">{s.n}</p>
                <h3 className="h-sm text-white text-lg mt-4">{s.t}</h3>
                <p className="lede mt-3 text-[16px] text-white">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="eyebrow text-white mb-5">The six tracks submissions came in against</p>
          <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((t) => (
              <div key={t.n} className="border-t border-line pt-5">
                <p className="font-mono text-[12px] text-marigold-t mb-3">{t.n}</p>
                <h3 className="h-sm text-white text-lg">{t.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submissions are closed, so this is no longer a form — it's the
          anticipation mechanism the papers page needs instead: a live
          countdown to the notification date rather than a dead countdown
          to the submission deadline that has already passed, plus a way
          for anyone who missed this round to get flagged for the next one. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20 grid gap-14 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow text-marigold-t mb-5">What&rsquo;s next</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl">
              {PAPERS_NOTIFY_PENDING ? "Results land soon" : "Results are out"}
            </h2>
            <p className="lede mt-5 text-white text-[16px] max-w-md">
              {PAPERS_NOTIFY_PENDING
                ? `Every submitter hears from the committee by ${PAPERS_NOTIFY_LABEL} — accepted or not. Accepted papers present live to the room on ${DATE_DAY_MONTH}.`
                : `Notifications went out ${PAPERS_NOTIFY_LABEL}. If you submitted and haven't heard from us, `}
              {!PAPERS_NOTIFY_PENDING && (
                <Link href="/contact" className="underline underline-offset-4 hover:text-marigold">
                  get in touch
                </Link>
              )}
              {!PAPERS_NOTIFY_PENDING && "."}
            </p>
            <p className="lede mt-4 text-white/60 text-[15px] max-w-md">
              Missed this round?{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-marigold">
                Ask us to flag you
              </Link>{" "}
              for the next call for papers.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Countdown
              target={PAPERS_NOTIFY_DATE}
              activeLabel="Notifications in"
              endedLabel="Notifications are out."
            />
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
