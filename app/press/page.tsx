import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import PageShell from "@/components/PageShell";
import { EVENT, SUMMIT_UPDATES, PRESS_CONTACT, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Updates — ${EVENT.name} ${EVENT.year}`,
  description:
    `What's happening on the way to the Africa SME Summit, ${DATE_LONG} at the University of Nairobi — new partners, speakers, papers and ticket milestones.`,
  alternates: { canonical: "https://africasmesummit.com/press" },
};

/**
 * Per-tag accent, mirroring SUMMIT_UPDATES' doc comment in lib/event.ts:
 * marigold = Speakers, clay = Tickets, indigo = Partners, palm = Papers.
 * Keyed on `tag` exactly as written there.
 */
const TAG_STYLE: Record<string, { border: string; text: string }> = {
  Speakers: { border: "border-marigold", text: "text-marigold-t" },
  Tickets: { border: "border-clay", text: "text-clay-t" },
  Partners: { border: "border-indigo", text: "text-indigo-t" },
  Papers: { border: "border-palm", text: "text-palm-t" },
};

function updateLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "Africa/Nairobi",
  });
}

export default function Press() {
  return (
    <PageShell
      current="/press"
      eyebrow="On the way to the summit"
      title="Everything building up to October 15"
      lede="New partners, speakers, deadlines and milestones, as they happen — nothing here is embargoed, so quote or share whatever's useful."
    >
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-[46rem] space-y-px bg-line border border-line">
            {SUMMIT_UPDATES.map((u) => (
              <article
                key={u.title}
                className={`bg-ink p-8 sm:p-10 border-l-2 ${TAG_STYLE[u.tag].border}`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`font-mono text-[12px] uppercase tracking-widest ${TAG_STYLE[u.tag].text}`}>
                    {u.tag}
                  </span>
                  <span aria-hidden="true" className="text-white/30">·</span>
                  <time dateTime={u.date} className="font-mono text-[12px] text-white/40">
                    {updateLabel(u.date)}
                  </time>
                </div>
                <h2 className="h-sm text-white text-2xl mt-4">{u.title}</h2>
                <p className="lede mt-3 text-[17px] text-white/80 max-w-2xl">{u.body}</p>
                {u.link && (
                  <Link
                    href={u.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-[16px] text-white underline underline-offset-4 hover:text-marigold transition-colors"
                  >
                    {u.link.text}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media contact — kept from the old press-release layout. The page's
          job has changed, but a working journalist looking for a human to
          call should still find one here. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <p className="eyebrow text-marigold mb-5">Press and media contact</p>
            <p className="h-sm text-white text-2xl">{PRESS_CONTACT.name}</p>
            <p className="text-[16px] text-white mt-1">{PRESS_CONTACT.org}</p>

            <div className="mt-6 space-y-1.5 text-[16px] text-white">
              <p>
                <a
                  href={`mailto:${PRESS_CONTACT.email}`}
                  className="hover:text-marigold transition-colors"
                >
                  {PRESS_CONTACT.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${PRESS_CONTACT.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-marigold transition-colors"
                >
                  {PRESS_CONTACT.phone}
                </a>
              </p>
              <p className="pt-3">{PRESS_CONTACT.address}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <h2 className="h-lg text-white text-3xl sm:text-4xl">
              Don't want to miss the next one?
            </h2>
            <p className="lede mt-5 text-white text-[17px]">
              {EVENT.venue}, University of Nairobi, {EVENT.dateLabel}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              <Btn href="/speakers" tone="onDark" internal>See the speakers</Btn>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
