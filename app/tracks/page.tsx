import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import PageShell from "@/components/PageShell";
import { EVENT, TRACKS, TRACK_EXTRAS, SPEAKERS, PHOTOS, TICKET_CTA, DATE_LONG, DATE_DAY_MONTH } from "@/lib/event";

export const metadata: Metadata = {
  title: `The six tracks — ${EVENT.name} ${EVENT.year}`,
  description:
    `The six tracks at the Africa SME Summit, ${DATE_LONG}: finance and capital, market access and cross-border trade, talent and safeguarding, AI adoption, industry-academia collaboration and Kenya's entrepreneurship ecosystem.`,
  alternates: { canonical: "https://africasmesummit.com/tracks" },
};

/* Colour rotates across the six, the same sequence the homepage uses, so a
   track keeps its colour between the card you clicked and the section you
   land on. That continuity is the whole point of the anchor link. */
const ACCENT = ["text-marigold", "text-clay", "text-indigo", "text-palm", "text-marigold", "text-clay"];
const RULE = ["border-marigold", "border-clay", "border-indigo", "border-palm", "border-marigold", "border-clay"];

export default function Tracks() {
  return (
    <PageShell
      current="/tracks"
      eyebrow={`Six tracks · ${DATE_DAY_MONTH}`}
      title="Pick what your business actually needs"
      lede="Six parallel sessions after the tea break. You do not have to choose now — but this is what each one is, who it is for, and what you should expect to leave with."
    >
      {TRACKS.map((t, i) => {
        /* Who is on a track is not restated here — it is derived from the
           speakers' own `topic`, so a track cannot claim someone the speaker
           page does not. Four of the six have nobody confirmed yet, and say
           nothing rather than "TBC". */
        const extra = TRACK_EXTRAS[t.slug];
        const speaking = SPEAKERS
          .map((s, idx) => ({ ...s, photo: PHOTOS.speakers[idx] }))
          .filter((s) => s.topic === t.name);

        return (
          <section key={t.slug} id={`track-${i + 1}`} className="border-b border-line scroll-mt-24">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-14 sm:py-20">
              <div className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,22rem)_1fr]">
                <div>
                  <p className={`font-mono text-[12px] ${ACCENT[i]}`}>{t.n}</p>
                  <h2 className="h-lg text-white text-3xl sm:text-4xl mt-4">{t.name}</h2>
                  <p className="lede mt-4 text-[17px] text-white">{t.line}</p>
                  {t.format && (
                    <p className="mt-6 inline-block border border-line px-3 py-1.5 font-mono text-[12px] text-white">
                      {t.format}
                    </p>
                  )}
                </div>

                <div className="max-w-2xl">
                  {t.who && (
                    <>
                      <p className="eyebrow text-white mb-2">Who it is for</p>
                      <p className="lede text-[18px] text-white">{t.who}</p>
                    </>
                  )}

                  {t.outcomes.length > 0 && (
                    <div className={`mt-8 pt-7 border-t-2 ${RULE[i]}`}>
                      <p className="eyebrow text-white mb-4">What you will leave with</p>
                      <ul className="space-y-3.5">
                        {t.outcomes.map((o) => (
                          <li key={o} className="flex gap-3 text-[17px] text-white">
                            <span className={`flex-none ${ACCENT[i]}`}>—</span>
                            <span className="lede">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Track-specific detail. Only one track has this, and the
                      shape is deliberately problem-then-tool: the arrow is
                      the whole argument, since the objection to AI in a small
                      business is never "what does it do", it is "what does it
                      fix for me". */}
                  {extra && (
                    <div className={`mt-8 pt-7 border-t-2 ${RULE[i]}`}>
                      <p className="eyebrow text-white mb-5">{extra.intro}</p>
                      <ul className="grid gap-px bg-line border border-line sm:grid-cols-2">
                        {extra.useCases.map((u) => (
                          <li key={u.n} className="bg-ink p-6 flex flex-col">
                            <p className={`font-mono text-[12px] ${ACCENT[i]}`}>{u.n}</p>
                            <h3 className="h-sm text-white text-lg mt-3">{u.name}</h3>
                            <p className="mt-3 text-[16px] font-light text-white">{u.fixes}</p>
                            <p className="mt-4 pt-4 border-t border-line text-[16px] text-white flex gap-2.5">
                              <span className={`flex-none ${ACCENT[i]}`} aria-hidden="true">→</span>
                              <span className="lede">{u.tools}</span>
                            </p>
                          </li>
                        ))}
                      </ul>

                      {/* The memorable bit, and the reason to be in the room
                          rather than read the list — so it is given its own
                          weight instead of becoming a fifth card. */}
                      <div className={`mt-8 border-l-2 pl-6 ${RULE[i]}`}>
                        <p className="eyebrow text-white mb-2">{extra.note.lead}</p>
                        <p className="lede text-[18px] text-white">{extra.note.body}</p>
                        <p className="mt-3 text-[16px] font-light text-white">
                          Live, with {extra.note.who}.
                        </p>
                      </div>
                    </div>
                  )}

                  {speaking.length > 0 && (
                    <div className="mt-8 pt-7 border-t border-line">
                      <p className="eyebrow text-white mb-4">On this track</p>
                      <ul className="flex flex-wrap gap-x-8 gap-y-5">
                        {speaking.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/speakers#${s.slug}`} className="flex items-center gap-3 group">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={s.photo}
                                alt=""
                                width={800}
                                height={1000}
                                loading="lazy"
                                decoding="async"
                                className="w-12 h-12 object-cover object-top flex-none"
                              />
                              <span className="text-[16px] text-white">
                                <span className="block font-medium group-hover:text-marigold transition-colors">
                                  {s.name}
                                </span>
                                <span className="block font-light">{s.org}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="h-lg text-white text-3xl sm:text-4xl">
              One ticket, all six.
            </h2>
            <p className="lede mt-5 text-white text-[17px]">
              The tracks run in parallel, so you pick on the day rather than in
              advance. {EVENT.venue}, {EVENT.dateLabel}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={EVENT.ticketUrl} tone="gold">{TICKET_CTA}</Btn>
              <Btn href="/papers" tone="onDark" internal>Submit a paper</Btn>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
