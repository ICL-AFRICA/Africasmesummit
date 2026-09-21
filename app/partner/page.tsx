import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import EnquiryForm from "@/components/EnquiryForm";
import Btn from "@/components/Btn";
import {
  EVENT, SPONSOR_TIERS, SIGNATURE_OPPORTUNITIES, PARTNER_PRINT_LABEL,
  TICKET_CTA, DATE_LONG, BOOKING_URL, BROCHURE_URL, PARTNERSHIP_PROPOSAL_URL,
} from "@/lib/event";

export const metadata: Metadata = {
  title: `Become a partner — ${EVENT.name} ${EVENT.year}`,
  description:
    `Partnership and sponsorship for the Africa SME Summit, ${DATE_LONG}. Reach Kenyan SME owners, 13 universities and four county governments in one day.`,
  alternates: { canonical: "https://africasmesummit.com/partner" },
};

/**
 * Per-tier visual identity for the package grid below. Purely presentational
 * — colour, not content, so it lives here rather than in lib/event.ts. Keyed
 * on `t.tier` exactly as written in SPONSOR_TIERS; the four keys must match.
 *
 * Each card's ENTIRE background is now its tier colour (not just an accent
 * border) — that is the hierarchy signal, so every card reads the same way:
 * ink text throughout, one shared dark button. Text stays at full-strength
 * ink rather than the site's usual ink/NN muted-opacity trick, deliberately —
 * these backgrounds are mid-tone/saturated (unlike the near-white `bg-card`
 * elsewhere), and ink/45-style fading measures well under 3:1 against them.
 * See the tier tokens in globals.css for the solid-ink contrast numbers.
 */
const TIER_STYLE: Record<string, { bg: string }> = {
  Bronze: { bg: "bg-bronze" },
  Silver: { bg: "bg-silver" },
  Gold: { bg: "bg-marigold" },
  Platinum: { bg: "bg-platinum" },
};

export default function Partner() {
  return (
    <PageShell
      current="/partner"
      eyebrow="Partnership"
      title="Reach the businesses you are trying to serve"
      lede="Everyone in this room runs or supports a small business in Kenya. If that is who you sell to, fund, regulate or research, this is a day of direct access rather than a logo on a banner."
    >
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <p className="eyebrow text-white">What partners get</p>
            {/* The full rate card, one level up from the summary grid below.
                Sits with the section heading rather than at the foot of the
                page, since this is the document a sponsor actually forwards
                internally for sign-off. */}
            <a
              href={PARTNERSHIP_PROPOSAL_URL}
              download
              className="btn-glow rounded-lg inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium border border-line text-white transition-all hover:border-marigold hover:text-marigold-t"
            >
              Download the partnership proposal (PDF)
              <span aria-hidden="true" className="text-[12px]">↓</span>
            </a>
          </div>
          {/* Changed 20 September 2026 at ICL's request: each card now spells
              out everything that tier actually gets — the full cumulative
              list, flattened from every tier up to and including this one
              (SPONSOR_TIERS itself still only stores what's NEW at each
              tier; see the comment there) — rather than "everything in the
              tier before, plus" and just the new bullets. A sponsor reading
              only the Platinum card should see all seventeen things they
              get without having to add up three other cards first.
              Deliberately NOT equal-height any more (items-start, no
              flex-1 slack-absorber): a four-bullet Bronze card and a
              seventeen-bullet Platinum card are supposed to look like
              different amounts of value, not be forced to the same size.
              The "Book" button sits right after each card's own content,
              wherever that lands. */}
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line items-start">
            {SPONSOR_TIERS.map((t, i) => {
              const included = SPONSOR_TIERS.slice(0, i + 1).flatMap((tier) => tier.includes);
              return (
                <div
                  key={t.tier}
                  className={`p-7 sm:p-8 flex flex-col ${TIER_STYLE[t.tier].bg}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="eyebrow text-ink">{t.tier}</p>
                    <p className="font-mono text-[12px] text-ink">{t.limit}</p>
                  </div>
                  <p className="text-[13px] text-ink/70 mt-1">{t.title}</p>
                  <p className="h-lg text-ink text-3xl mt-5">
                    <span className="text-base align-top mr-1.5 font-normal">{t.currency}</span>
                    {t.price}
                  </p>
                  <ul className="mt-6 pt-5 space-y-2.5 border-t border-ink/60">
                    {included.map((x) => (
                      <li key={x} className="flex gap-2.5 text-[16px] text-ink">
                        <span className="flex-none">✓</span>{x}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={t.tier === "Platinum" ? "#enquire" : BOOKING_URL}
                    className="btn-glow rounded-lg mt-7 inline-flex justify-center px-5 py-3 text-[16px] font-medium transition-colors bg-ink text-white hover:bg-raise"
                  >
                    {t.cta}
                  </a>
                </div>
              );
            })}
          </div>

          {/* The proposal's own deadline for making print — a real, dated
              fact from the source document, not a manufactured countdown.
              Text only, no timer: this is one cutoff among several on the
              site, and the homepage already owns the one ticking-clock
              urgency mechanism. */}
          <p className="mt-6 text-[15px] text-white/70 max-w-2xl">
            Materials go to print shortly. A partner confirmed by{" "}
            <span className="text-marigold-t font-medium">{PARTNER_PRINT_LABEL}</span> appears
            in the printed programme, on delegate badges and across the remaining campaign —
            after that, everything your tier promises still stands, just not in print.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-[16px] text-white max-w-xl">
              Packages are bookable directly. If you need something shaped differently,
              tell us who you are trying to reach and we will come back with a proposal.
            </p>
            {/* Pure CSS hover preview — no JS, so it costs nothing on a page
                that otherwise ships none. The thumbnail is a 336px WebP
                (~24KB) of the brochure's own cover, lazy-loaded, so it never
                competes with anything above the fold. */}
            <div className="group relative inline-block">
              <div
                className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-[168px] -translate-x-1/2 opacity-0
                           scale-95 transition-all duration-200 ease-out
                           group-hover:opacity-100 group-hover:scale-100
                           group-focus-within:opacity-100 group-focus-within:scale-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/brochure-preview.webp"
                  alt="Preview of the Africa SME Summit partnership brochure"
                  width={168}
                  height={237}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto border border-line shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                />
              </div>
              <a
                href={BROCHURE_URL}
                download
                className="btn-glow rounded-lg inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium border border-line text-white transition-all hover:border-marigold hover:text-marigold-t"
              >
                Get the full brochure (PDF)
                <span aria-hidden="true" className="text-[12px]">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signature opportunities — deliberately outside the tier grid and
          its four-colour system: these aren't a fifth tier, they're a
          different kind of offer (one partner each, by application), so the
          section reads as its own thing rather than a row bolted onto the
          table above. */}
      <section className="border-b border-line bg-raise/30">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="eyebrow text-marigold-t mb-3">Signature opportunities</p>
          <h2 className="h-lg text-white text-3xl sm:text-4xl">Two moments the whole room stops for</h2>
          <p className="lede mt-5 text-white max-w-2xl text-[17px]">
            Neither is included in the tiers above. Both go to a single partner, by
            application, negotiated directly with the convener.
          </p>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 border border-line">
            {SIGNATURE_OPPORTUNITIES.map((o) => (
              <div key={o.name} className="bg-ink p-8 sm:p-10">
                <p className="font-mono text-[12px] uppercase tracking-widest text-marigold-t">
                  {o.time} · {o.moment}
                </p>
                <h3 className="h-sm text-white text-2xl mt-4">{o.name}</h3>
                <p className="lede mt-3 text-[17px] text-white/80">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20 grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-white mb-5">Tell us what you need</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl">Start the conversation</h2>
            <p className="lede mt-5 text-white text-[16px] max-w-md">
              A short note is enough. We will reply within two working days with
              options and what each one costs. This is also where a Convening
              Partner enquiry, or a question about the Award or the Accelerator
              launch, starts.
            </p>
            <div className="mt-8 pt-8 border-t border-line text-[16px] text-white space-y-1">
              <p className="text-white">Or reach us directly</p>
              <p>{EVENT.email}</p>
              {EVENT.phone.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <EnquiryForm
            subject="Partnership enquiry — Africa SME Summit 2026"
            cta="Send partnership enquiry"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "organisation", label: "Organisation", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone" },
              {
                name: "tier", label: "Which level interests you",
                options: [...SPONSOR_TIERS.map((t) => t.tier), "The Africa SME Award", "The Jiinue Accelerator launch", "Not sure yet"],
              },
              { name: "message", label: "Who are you trying to reach?", type: "textarea", required: true },
            ]}
          />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <p className="lede text-white">Looking for an exhibition stand instead?</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Btn href="/exhibit" tone="onDark" internal>Book a stand</Btn>
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
