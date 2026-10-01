import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SmeDirectory from "@/components/SmeDirectory";
import Btn from "@/components/Btn";
import { EVENT, SME_NETWORK, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `SMEs — ${EVENT.name} ${EVENT.year}`,
  description:
    `${SME_NETWORK.length} real Kenyan SMEs ICL works alongside, by sector — agribusiness, products and manufacturing, health and youth, services and events. ${DATE_LONG}.`,
  alternates: { canonical: "https://africasmesummit.com/network" },
};

/* Renamed from "Network" and rebuilt 1 October 2026 at ICL's (boss's)
   request: the old version opened on an explanatory paragraph ("The
   businesses we work with") before a flat, filterable wall of all ten
   companies. That intro is gone — the eyebrow/title/lede below stay short
   on purpose, because the real introduction is now the sector cards
   themselves (SmeDirectory), which carry their own blurb and lead straight
   into browsing. See components/SmeDirectory.tsx for the sector-first,
   no-"All"-filter behaviour this replaced it with. */
export default function Network() {
  return (
    <PageShell
      current="/network"
      eyebrow="SMEs"
      title="Pick a sector"
      lede={`${SME_NETWORK.length} Kenyan SMEs ICL works alongside, grouped by what they do.`}
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
