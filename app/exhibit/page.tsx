import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import StandBooking from "@/components/StandBooking";
import Btn from "@/components/Btn";
import { EVENT, STAND_OPTIONS, TICKET_CTA, DATE_LONG, BOOKING_URL } from "@/lib/event";

export const metadata: Metadata = {
  title: `Book a stand — ${EVENT.name} ${EVENT.year}`,
  description:
    `Exhibition stands at the Africa SME Summit, ${DATE_LONG}, ${EVENT.venue}. Show your product to buyers, banks, universities and county government.`,
  alternates: { canonical: "https://africasmesummit.com/exhibit" },
};

export default function Exhibit() {
  return (
    <PageShell
      current="/exhibit"
      eyebrow="Exhibition"
      title="Put your product in front of people who can buy it"
      lede="The Innovation Expo runs all day and the gallery walk brings every delegate past the stands at lunch. Stands are limited and they go before the summit fills."
    >
      <section className="border-b border-line tint-clay">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal as="p" className="eyebrow text-white mb-5">Stand options</Reveal>
          {/* .panel-card (globals.css) — real gap + floating shadow,
              replacing the shared-hairline seam. Both cards now sit on
              bg-raise (not bg-ink) so the shadow reads against a lighter
              card than the dark section behind it. */}
          <div className="grid gap-6 lg:grid-cols-2">
            {STAND_OPTIONS.map((s, i) => (
              <Reveal key={s.name} as="div" delay={i * 90} className="panel-card bg-raise p-8 sm:p-10 flex flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="eyebrow text-marigold">{s.name}</p>
                  <p className="font-mono text-[12px] text-white">{s.who}</p>
                </div>
                <p className="h-lg text-white text-4xl mt-6">
                  <span className="text-lg align-top mr-2 font-normal">{s.currency}</span>
                  {s.price}
                </p>
                <ul className="mt-7 pt-6 space-y-3 border-t border-line flex-1">
                  {s.includes.map((x) => (
                    <li key={x} className="flex gap-3 text-[16px] text-white">
                      <span className="text-marigold flex-none">✓</span>{x}
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKING_URL}
                  className={`rounded-lg mt-8 inline-flex justify-center px-6 py-3.5 text-[16px] font-medium transition-all ${
                    i === 0 ? "bg-gold text-ink hover:brightness-110"
                            : "border border-line text-white hover:border-gold hover:text-marigold-t"}`}
                >
                  Book this booth
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[16px] text-white">
            Booths are bookable directly and allocated in the order they are paid for.
            Questions about position or what fits? Ask below.
          </p>
        </div>
      </section>

      {/* Reserve a stand. The plan is the picker, so this section runs full
          width rather than the two-column split it used before — thirty-one
          stands over two floors do not fit in half a page. */}
      <section className="border-b border-line tint-palm">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow text-white mb-5">Reserve a stand</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl">Choose your spot in the hall</h2>
            <p className="lede mt-5 text-white text-[17px] max-w-2xl">
              Thirty-one stands across the two floors. Pick the one you want and
              tell us what you are bringing — stands are allocated in the order
              enquiries arrive, and we confirm within two working days.
            </p>
          </Reveal>

          <div className="mt-10 border-l-2 border-clay bg-raise px-6 py-5 max-w-2xl">
            <p className="font-mono text-[12px] uppercase tracking-widest text-clay-t">Venue update</p>
            <p className="lede mt-2 text-[16px] text-white">
              The summit has moved to Ole Sereni. The floor plan below still shows the
              previous venue&rsquo;s layout — stand letters and positions are being redrawn
              for the new hall. You can still reserve a stand now; we will confirm your
              exact spot once the new plan is ready.
            </p>
          </div>

          <div className="mt-12">
            <StandBooking />
          </div>

          <div className="mt-12 pt-8 border-t border-line text-[16px] text-white space-y-1 max-w-2xl">
            <p>Or reach us directly</p>
            <p>{EVENT.email}</p>
            {EVENT.phone.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <p className="lede text-white">Attending rather than exhibiting?</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
            <Btn href="/partner" tone="onDark" internal>Become a partner</Btn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
