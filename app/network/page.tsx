import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SmeDirectory from "@/components/SmeDirectory";
import Btn from "@/components/Btn";
import { EVENT, SME_NETWORK, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Our network — ${EVENT.name} ${EVENT.year}`,
  description:
    `Real Kenyan SMEs ICL works alongside — agribusiness, craft and manufacturing, health and youth development, services and events. ${DATE_LONG}.`,
  alternates: { canonical: "https://africasmesummit.com/network" },
};

export default function Network() {
  return (
    <PageShell
      current="/network"
      eyebrow="Our network"
      title="The businesses we work with"
      lede={`${SME_NETWORK.length} Kenyan SMEs across food, craft, wellness and services — real businesses ICL works alongside, doing real things. This is who the summit is actually for.`}
    >
      <section className="tint-indigo">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <SmeDirectory />
          </Reveal>
        </div>
      </section>

      <section className="tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <Reveal>
            <h2 className="h-lg text-white text-3xl sm:text-4xl max-w-2xl mx-auto">
              Want your business in this list?
            </h2>
            <p className="lede mt-5 text-white text-[17px] max-w-xl mx-auto">
              Exhibit at the summit, or become a partner — either way, this is
              where real SMEs get seen.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn href="/exhibit" tone="gold" internal>Book a stand</Btn>
              <Btn href="/partner" tone="onDark" internal>Become a partner</Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
