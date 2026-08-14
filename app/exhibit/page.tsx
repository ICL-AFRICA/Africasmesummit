import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import EnquiryForm from "@/components/EnquiryForm";
import Btn from "@/components/Btn";
import { EVENT, STAND_OPTIONS, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Book a stand — ${EVENT.name} ${EVENT.year}`,
  description:
    `Exhibition stands at the Africa SME Summit, ${DATE_LONG}, University of Nairobi. Show your product to buyers, banks, universities and county government.`,
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
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <p className="eyebrow text-white mb-5">Stand options</p>
          <div className="grid gap-px bg-line lg:grid-cols-2 border border-line">
            {STAND_OPTIONS.map((s, i) => (
              <div key={s.name} className={`p-8 sm:p-10 flex flex-col ${i === 0 ? "bg-raise" : "bg-ink"}`}>
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
                  href={EVENT.ticketUrl}
                  className={`mt-8 inline-flex justify-center px-6 py-3.5 text-[16px] font-medium transition-all ${
                    i === 0 ? "bg-gold text-ink hover:brightness-110"
                            : "border border-line text-white hover:border-gold hover:text-marigold-t"}`}
                >
                  Book this booth
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[16px] text-white">
            Booths are bookable directly and allocated in the order they are paid for.
            Questions about position or what fits? Ask below.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20 grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-white mb-5">Reserve a stand</p>
            <h2 className="h-lg text-white text-3xl sm:text-4xl">What are you bringing?</h2>
            <p className="lede mt-5 text-white text-[16px] max-w-md">
              Stands are allocated in the order enquiries arrive. We will confirm
              availability within two working days.
            </p>
            <div className="mt-8 pt-8 border-t border-line text-[16px] text-white space-y-1">
              <p className="text-white">Or reach us directly</p>
              <p>{EVENT.email}</p>
              {EVENT.phone.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <EnquiryForm
            subject="Exhibition stand enquiry — Africa SME Summit 2026"
            cta="Reserve a stand"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "business", label: "Business name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", required: true },
              { name: "stand", label: "Which booth", options: [...STAND_OPTIONS.map((s) => s.name), "Not sure yet"] },
              { name: "showing", label: "What will you be showing?", type: "textarea", required: true },
            ]}
          />
        </div>
      </section>

      <section>
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
