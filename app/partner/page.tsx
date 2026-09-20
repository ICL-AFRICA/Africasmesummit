import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import EnquiryForm from "@/components/EnquiryForm";
import Btn from "@/components/Btn";
import { EVENT, SPONSOR_TIERS, SPONSOR_INCLUDES_NOTE, TICKET_CTA, DATE_LONG, BOOKING_URL, BROCHURE_URL } from "@/lib/event";

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
          <p className="eyebrow text-white mb-5">What partners get</p>
          {/* The inclusions below are drafts. Saying so here is the whole
              point — it sits above the grid rather than under it, because a
              caveat a sponsor reads after the price and the Book button has
              not done its job. Remove with SPONSOR_INCLUDES_NOTE once the
              rate card lands. */}
          <p className="lede text-[16px] text-white max-w-2xl mb-8">
            {SPONSOR_INCLUDES_NOTE}
          </p>
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
                    href={BOOKING_URL}
                    className="btn-glow rounded-lg mt-7 inline-flex justify-center px-5 py-3 text-[16px] font-medium transition-colors bg-ink text-white hover:bg-raise"
                  >
                    Book {t.tier}
                  </a>
                </div>
              );
            })}
          </div>

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

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20 grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-white mb-5">Tell us what you need</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl">Start the conversation</h2>
            <p className="lede mt-5 text-white text-[16px] max-w-md">
              A short note is enough. We will reply within two working days with
              options and what each one costs.
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
              { name: "tier", label: "Which level interests you", options: [...SPONSOR_TIERS.map((t) => t.tier), "Not sure yet"] },
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
