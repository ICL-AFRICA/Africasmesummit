import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import ServiceProviderDirectory from "@/components/ServiceProviderDirectory";
import Link from "next/link";
import { EVENT, DATE_LONG, SERVICE_PROVIDER_TEMPLATE_URL, SERVICE_PROVIDER_EMAIL } from "@/lib/event";

export const metadata: Metadata = {
  title: `Providers — ${EVENT.name} ${EVENT.year}`,
  description:
    `Finance, legal, talent, technology and growth-support partners for the SMEs in the Africa SME Summit network. ${DATE_LONG}.`,
  alternates: { canonical: "https://africasmesummit.com/providers" },
};

/* Added 1 October 2026 at ICL's (boss's) request, alongside the
   SERVICE_PROVIDER_CATEGORIES in lib/event.ts (seven of them now — a
   seventh, Climate Action & Sustainability, joined 2 October 2026). Same
   sector-cards-first pattern /network uses (see
   components/ServiceProviderDirectory.tsx) — short eyebrow/title/lede
   here on purpose, same reasoning as /network's: the real introduction is
   the category cards themselves. Ships with SERVICE_PROVIDERS empty; the
   directory component handles that state explicitly rather than this
   page working around it. */
export default function Providers() {
  return (
    <PageShell
      current="/providers"
      eyebrow="Providers"
      title="Pick a category"
      lede="Partners who support the businesses in our network, grouped by what they offer."
    >
      <section className="tint-indigo">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <ServiceProviderDirectory />
          </Reveal>
        </div>
      </section>

      {/* Download-and-email intake, added 2 October 2026 at ICL's
          request: the profile template this links to (same shape as
          ServiceProvider in lib/event.ts) is how the first SERVICE_PROVIDERS
          entries actually get populated — see the comment on that export.
          Two steps, two buttons: download the template, then email the
          filled-in copy back. SERVICE_PROVIDER_EMAIL is ICL's own
          communications inbox, not EVENT.email, so completed templates
          land wherever ICL triages this specific intake rather than in
          the main contact line — the mailto subject below is pre-filled
          so the message is identifiable the moment it arrives. The
          template's own cover page repeats this same address and offers
          WhatsApp as an alternative, so this isn't the only way in, just
          the fastest one from this page. */}
      <section className="tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <Reveal>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl mx-auto">
              Are you a service provider?
            </h2>
            <p className="lede mt-5 text-white text-[17px] max-w-xl mx-auto">
              If you support SMEs with finance, legal, talent, technology or
              growth programmes, we want to hear from you. Download our
              profile template, fill it in, and email it back to be
              considered for this page.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={SERVICE_PROVIDER_TEMPLATE_URL}
                download
                className="btn-glow rounded-lg inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium bg-gold text-ink transition-all hover:brightness-110"
              >
                Download the profile template (DOCX)
                <span aria-hidden="true" className="text-[12px]">↓</span>
              </a>
              <a
                href={`mailto:${SERVICE_PROVIDER_EMAIL}?subject=${encodeURIComponent("Service provider profile submission")}&body=${encodeURIComponent("Hi ICL team,\n\nPlease find our completed service-provider profile template attached.\n\nCompany name: \nCategory (from the Providers page): \n\nThanks,")}`}
                className="btn-glow rounded-lg inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium border border-line text-white transition-all hover:border-marigold hover:text-marigold-t"
              >
                Email your profile
                <span aria-hidden="true" className="text-[12px]">✉</span>
              </a>
            </div>
            <p className="mt-5 text-white/70 text-[14px]">
              Prefer another way to reach us?{" "}
              <Link href="/contact" className="text-white underline underline-offset-2 hover:text-marigold-t transition-colors">
                Get in touch
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
