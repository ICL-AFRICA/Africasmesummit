import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import EnquiryForm from "@/components/EnquiryForm";
import Btn from "@/components/Btn";
import { EVENT, SPONSOR_TIERS, SPONSOR_INCLUDES_NOTE, TICKET_CTA, DATE_LONG, BOOKING_URL } from "@/lib/event";

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
 * Platinum and Gold read as the two premium tiers (solid, filled buttons).
 * Silver and Bronze read as the two accessible tiers (outlined, tinted on
 * hover). That split plus the four different hues is the hierarchy signal —
 * see the tier-accent tokens in globals.css for the contrast reasoning.
 */
const TIER_STYLE: Record<string, { accent: string; chip: string; button: string }> = {
  Platinum: {
    accent: "border-t-4 border-platinum",
    chip: "text-platinum",
    button: "bg-platinum text-ink hover:brightness-110",
  },
  Gold: {
    accent: "border-t-4 border-marigold",
    chip: "text-marigold",
    button: "bg-marigold text-ink hover:brightness-110",
  },
  Silver: {
    accent: "border-t-4 border-silver",
    chip: "text-silver",
    button: "border border-silver text-silver hover:bg-silver hover:text-ink",
  },
  Bronze: {
    accent: "border-t-4 border-bronze",
    chip: "text-bronze",
    button: "border border-bronze text-bronze hover:bg-bronze hover:text-ink",
  },
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
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line">
            {SPONSOR_TIERS.map((t) => (
              <div
                key={t.tier}
                className={`p-7 sm:p-8 flex flex-col ${t.featured ? "bg-raise" : "bg-ink"} ${TIER_STYLE[t.tier].accent}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className={`eyebrow ${TIER_STYLE[t.tier].chip}`}>{t.tier}</p>
                  <p className="font-mono text-[12px] text-white">{t.limit}</p>
                </div>
                <p className="h-lg text-white text-3xl mt-5">
                  <span className="text-base align-top mr-1.5 font-normal">{t.currency}</span>
                  {t.price}
                </p>
                <ul className="mt-6 pt-5 space-y-2.5 border-t border-line flex-1">
                  {t.includes.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[16px] text-white">
                      <span className={`${TIER_STYLE[t.tier].chip} flex-none`}>✓</span>{x}
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKING_URL}
                  className={`mt-7 inline-flex justify-center px-5 py-3 text-[16px] font-medium transition-all ${TIER_STYLE[t.tier].button}`}
                >
                  Book {t.tier}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[16px] text-white">
            Packages are bookable directly. If you need something shaped differently,
            tell us who you are trying to reach and we will come back with a proposal.
          </p>
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
