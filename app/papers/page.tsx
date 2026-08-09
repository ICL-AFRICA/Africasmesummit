import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import EnquiryForm from "@/components/EnquiryForm";
import Btn from "@/components/Btn";
import { EVENT, TRACKS, PAPERS_TICKET, TICKET_CTA } from "@/lib/event";

export const metadata: Metadata = {
  title: `Call for papers — ${EVENT.name} ${EVENT.year}`,
  description: "Call for papers for the Africa SME Summit, 30 September 2026. Open to academics and practitioners across six tracks, from SME finance to market access.",
  alternates: { canonical: "https://africasmesummit.com/papers" },
};

const STEPS = [
  { n: "01", t: "Submit an abstract", d: "Up to 400 words, naming the track it belongs to and what the work shows." },
  { n: "02", t: "Review", d: "The committee reads every submission and replies within three weeks." },
  { n: "03", t: "Present", d: "Accepted papers are presented in their track on 30 September." },
  { n: "04", t: "Publish", d: "Selected papers go into the post-summit proceedings." },
];

export default function Papers() {
  return (
    <PageShell
      current="/papers"
      eyebrow="Call for papers"
      title="Research that reaches the businesses it is about"
      lede="Open to academics and practitioners. We are looking for work that a Kenyan small business owner could act on — not only work that advances the literature."
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
          <p className="eyebrow text-white mb-5">Tracks open to submissions</p>
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

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20 grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-white mb-5">Submit</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl">Send your abstract</h2>
            <p className="lede mt-5 text-white text-[16px] max-w-md">
              Paste the abstract below, or send a note and we will reply with the
              full submission guidance.
            </p>
          </div>
          <EnquiryForm
            subject="Paper submission — Africa SME Summit 2026"
            cta="Submit abstract"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "institution", label: "Institution or organisation", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "track", label: "Track", options: [...TRACKS.map((t) => t.name), "Not sure yet"], required: true },
              { name: "title", label: "Paper title", required: true },
              { name: "abstract", label: "Abstract (up to 400 words)", type: "textarea", required: true },
            ]}
          />
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
