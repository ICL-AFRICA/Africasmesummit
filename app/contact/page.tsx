import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import Btn from "@/components/Btn";
import { EVENT, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Contact — ${EVENT.name} ${EVENT.year}`,
  description:
    `Contact the Africa SME Summit team about tickets, group bookings, speaking, partnership or exhibiting. ${DATE_LONG}, ${EVENT.venue}.`,
  alternates: { canonical: "https://africasmesummit.com/contact" },
};

export default function Contact() {
  return (
    <PageShell
      current="/contact"
      eyebrow="Contact"
      title="Ask us anything"
      lede="Tickets, group rates, speaking, partnership, exhibiting, or directions on the day — this reaches the team running the summit."
    >
      <section className="border-b border-line tint-clay">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20 grid gap-14 lg:grid-cols-[1fr_minmax(0,32rem)]">
          <Reveal as="div">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-marigold mb-3">Email</p>
                <a href={`mailto:${EVENT.email}`} className="text-white text-[16px] hover:text-marigold-t transition-colors">
                  {EVENT.email}
                </a>
                <p className="text-[16px] text-white mt-2">We reply within two working days.</p>
              </div>
              <div>
                <p className="eyebrow text-marigold mb-3">Phone</p>
                <p className="text-white text-[16px]">{EVENT.conferencePhone}</p>
                <p className="text-[16px] text-white mt-2">Weekdays, 9am–5pm EAT.</p>
              </div>
              <div>
                <p className="eyebrow text-marigold mb-3">Venue</p>
                <p className="text-white text-[16px]"><span className="venue-float">{EVENT.venue}</span></p>
                <p className="text-[16px] text-white">{EVENT.venueDetail}</p>
                <p className="text-[16px] text-white">{EVENT.city}</p>
              </div>
              <div>
                <p className="eyebrow text-marigold mb-3">Date</p>
                <p className="text-white text-[16px]">{EVENT.dateLabel}</p>
                <p className="text-[16px] text-white">Registration opens 08:00</p>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-line">
              <p className="eyebrow text-white mb-5">Looking for something specific?</p>
              <div className="flex flex-wrap gap-3">
                <Btn href="/partner" tone="onDark" internal>Become a partner</Btn>
                <Btn href="/exhibit" tone="onDark" internal>Book a stand</Btn>
                <Btn href="/papers" tone="onDark" internal>Submit a paper</Btn>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" delay={120}>
          <EnquiryForm
            subject="Enquiry — Africa SME Summit 2026"
            cta="Send message"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone" },
              {
                name: "topic", label: "What is this about", required: true,
                options: ["Tickets", "Group booking (4+)", "Speaking", "Partnership", "Exhibiting", "Call for papers", "Something else"],
              },
              { name: "message", label: "Your message", type: "textarea", required: true },
            ]}
          />
          </Reveal>
        </div>
      </section>

      <section className="tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 text-center">
          <p className="lede text-white">Ready to book?</p>
          <div className="mt-6">
            <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
