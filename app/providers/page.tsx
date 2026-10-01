import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import ServiceProviderDirectory from "@/components/ServiceProviderDirectory";
import Btn from "@/components/Btn";
import { EVENT, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Providers — ${EVENT.name} ${EVENT.year}`,
  description:
    `Finance, legal, talent, technology and growth-support partners for the SMEs in the Africa SME Summit network. ${DATE_LONG}.`,
  alternates: { canonical: "https://africasmesummit.com/providers" },
};

/* Added 1 October 2026 at ICL's (boss's) request, alongside the six
   SERVICE_PROVIDER_CATEGORIES in lib/event.ts. Same sector-cards-first
   pattern /network uses (see components/ServiceProviderDirectory.tsx) —
   short eyebrow/title/lede here on purpose, same reasoning as /network's:
   the real introduction is the category cards themselves. Ships with
   SERVICE_PROVIDERS empty; the directory component handles that state
   explicitly rather than this page working around it. */
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

      <section className="tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <Reveal>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl mx-auto">
              Are you a service provider?
            </h2>
            <p className="lede mt-5 text-white text-[17px] max-w-xl mx-auto">
              If you support SMEs with finance, legal, talent, technology or
              growth programmes, we want to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn href="/contact" tone="gold" internal>Get in touch</Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
