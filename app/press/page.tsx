import type { Metadata } from "next";
import Btn from "@/components/Btn";
import PageShell from "@/components/PageShell";
import { EVENT, PRESS_RELEASE, PRESS_CONTACT, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Press — ${EVENT.name} ${EVENT.year}`,
  description:
    `Press release and media contact for the Africa SME Summit, ${DATE_LONG} at the University of Nairobi. Convened by I Choose Life – Africa.`,
  alternates: { canonical: "https://africasmesummit.com/press" },
};

const R = PRESS_RELEASE;

export default function Press() {
  return (
    <PageShell
      current="/press"
      eyebrow="Press"
      title="Press room"
      lede="The release below is free to quote in full or in part. For interviews, photography or anything not covered here, the media contact is at the foot of the page."
    >
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          {/* The release is set narrower than the rest of the site. It is a
              document rather than a landing page, and a journalist reads it
              top to bottom — measure matters more than fill. */}
          <article className="max-w-[46rem]">
            <p className="eyebrow text-marigold">{R.kicker}</p>

            <h2 className="h-lg text-white text-3xl sm:text-4xl mt-6">
              {R.headline}
            </h2>
            <p className="lede mt-5 text-white text-[18px]">{R.standfirst}</p>

            <div className="mt-10 pt-8 border-t border-line space-y-6">
              <p className="lede text-[17px] text-white">
                <span className="font-mono text-[16px]">{R.dateline}</span>
                {" — "}
                {R.body[0]}
              </p>
              {R.body.slice(1, 2).map((p) => (
                <p key={p} className="lede text-[17px] text-white">{p}</p>
              ))}
            </div>

            {/* Quotes are pulled out rather than run in. A journalist
                skim-reading for something to lift should find them without
                hunting through the body. */}
            <figure className="my-10 border-l-2 border-marigold pl-6">
              <blockquote className="lede text-white text-[19px] sm:text-[21px]">
                “{R.quotes[0].text}”
              </blockquote>
              <figcaption className="mt-4 text-[16px] text-white">
                <span className="font-semibold">{R.quotes[0].who}</span>
                <span className="block font-light">{R.quotes[0].role}</span>
              </figcaption>
            </figure>

            <div className="space-y-6">
              {R.body.slice(2, 4).map((p) => (
                <p key={p} className="lede text-[17px] text-white">{p}</p>
              ))}
            </div>

            <figure className="my-10 border-l-2 border-palm pl-6">
              <blockquote className="lede text-white text-[19px] sm:text-[21px]">
                “{R.quotes[1].text}”
              </blockquote>
              <figcaption className="mt-4 text-[16px] text-white">
                <span className="font-semibold">{R.quotes[1].who}</span>
                <span className="block font-light">{R.quotes[1].role}</span>
              </figcaption>
            </figure>

            <div className="space-y-6">
              {R.body.slice(4).map((p) => (
                <p key={p} className="lede text-[17px] text-white">{p}</p>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-line">
              <h3 className="h-sm text-white text-xl">Tickets and registration</h3>
              <p className="lede mt-3 text-[17px] text-white">{R.tickets}</p>
            </div>

            {R.about.map((a) => (
              <div key={a.h} className="mt-8 pt-8 border-t border-line">
                <h3 className="h-sm text-white text-xl">{a.h}</h3>
                <p className="lede mt-3 text-[17px] text-white">{a.p}</p>
              </div>
            ))}

            {/* The trade convention for "the release ends here". Journalists
                read it; nobody else needs to. */}
            <p className="mt-10 font-mono text-[16px] text-white text-center">###</p>
          </article>
        </div>
      </section>

      {/* Media contact */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <p className="eyebrow text-marigold mb-5">Media contact</p>
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

      {/* Same two actions as every other page */}
      <section>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <h2 className="h-lg text-white text-3xl sm:text-4xl">
              Covering the summit?
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
