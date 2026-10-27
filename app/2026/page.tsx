import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import TicketBtn from "@/components/TicketBtn";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SummitHero from "@/components/SummitHero";
import RoadToTimeline from "@/components/RoadToTimeline";
import {
  EVENT, NEXT_SUMMIT, SUMMIT_PHOTOS, KEYNOTES, DATE_LONG, NEWSLETTER,
  AWARDS_2026, VOICES_2026, COMMITMENTS_2026, PLAN_2026_2030, AI_TRACK_INSIGHT, SEALS_2026,
} from "@/lib/event";

export const metadata: Metadata = {
  title: `Recap — ${EVENT.name} 2026`,
  description:
    `What happened at the Africa SME Summit 2026 on ${DATE_LONG} at ${EVENT.venue}: the award winners, what the speakers said, the six commitments made on the day, and the road to 2027.`,
  alternates: { canonical: "https://africasmesummit.com/2026/" },
};

/* A voice's photograph, when the programme has one: matched on surname against
   KEYNOTES so there is one source for each person's picture. Mr. Kabii has no
   photograph in the programme, so he gets an initials circle like anyone else
   without one. */
function photoFor(name: string): string | null {
  const surname = name.replace(/,.*$/, "").split(" ").pop() ?? "";
  return KEYNOTES.find((k) => k.name.includes(surname))?.photo ?? null;
}
function initials(name: string) {
  const words = name.replace(/^(Prof\.|Dr\.|Mr\.|Eng\.|Ms\.)\s+/, "").replace(/,.*$/, "").split(" ");
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export default function Recap2026() {
  return (
    <PageShell
      current="/2026"
      eyebrow="Recap · 2026"
      title="The summit happened. Here is what came out of it."
      lede={`On ${DATE_LONG}, industry, academia, county government and enterprise met at ${EVENT.venue}, Nairobi. These are the winners, the voices, the commitments — and where it goes next.`}
      above={
        <section className="border-b border-line">
          <SummitHero
            photos={SUMMIT_PHOTOS}
            eyebrow="The summit, in pictures"
            heading={`${EVENT.name} 2026 · ${DATE_LONG} · ${EVENT.venue}`}
          />
        </section>
      }
    >
      {/* Awards ------------------------------------------------------------ */}
      <section className="border-b border-line tint-marigold">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-24">
          <Reveal as="p" className="eyebrow text-marigold mb-5">The awards</Reveal>
          <Reveal as="h2" className="h-lg max-w-3xl text-3xl text-white sm:text-5xl">
            WetBlu takes top honours at the 2026 awards
          </Reveal>
          <Reveal as="p" className="lede mt-6 max-w-2xl text-[18px] text-white">
            A leather brand, a spice maker and a tallow producer. All three add value to Kenyan raw materials — which is what value addition looks like for Kenyan SMEs.
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {AWARDS_2026.map((a, i) => (
              <Reveal key={a.brand} className="panel-card flex flex-col bg-raise p-7 sm:p-8">
                <p className={`eyebrow ${i === 0 ? "text-marigold" : "text-white"}`}>{a.place}</p>
                <h3 className="h-sm mt-4 text-3xl text-white">{a.brand}</h3>
                <p className="mt-1 text-[16px] text-white">{a.who}</p>
                <p className="mt-5 text-[16px] leading-relaxed text-white">{a.line}</p>
                <p className="mt-4 border-t border-line pt-4 text-[16px] leading-relaxed text-white">{a.detail}</p>
                {a.next && <p className="mt-4 text-[16px] leading-relaxed text-white">{a.next}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Voices ------------------------------------------------------------ */}
      <section className="border-b border-line tint-indigo">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-24">
          <Reveal as="p" className="eyebrow text-white mb-5">In their words</Reveal>
          <Reveal as="h2" className="h-lg max-w-3xl text-3xl text-white sm:text-5xl">
            Five voices on closing the gap between classroom and market
          </Reveal>
          <Reveal as="p" className="lede mt-6 max-w-2xl text-[18px] text-white">
            Kenya&rsquo;s small businesses do not lack ideas. What they lack, speaker after speaker argued, is a working bridge between the lecture hall, the laboratory and the market.
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {VOICES_2026.map((v) => {
              const photo = photoFor(v.name);
              return (
                <Reveal key={v.name} className="panel-card flex flex-col bg-raise p-7 sm:p-8">
                  <blockquote className="h-sm text-[22px] leading-snug text-white sm:text-2xl">
                    &ldquo;{v.quote}&rdquo;
                  </blockquote>
                  <p className="mt-5 flex-1 text-[16px] leading-relaxed text-white">{v.gist}</p>
                  <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 flex-none rounded-full object-cover object-top" />
                    ) : (
                      <span aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gold font-mono text-[16px] font-semibold text-ink">
                        {initials(v.name)}
                      </span>
                    )}
                    <span>
                      <span className="block text-[16px] font-semibold text-white">{v.name}</span>
                      <span className="block text-[16px] leading-snug text-white">{v.role}</span>
                    </span>
                  </figcaption>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments + the plan ------------------------------------------- */}
      <section id="commitments" className="border-b border-line tint-palm">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal as="p" className="eyebrow text-marigold mb-5">What was agreed</Reveal>
            <Reveal as="h2" className="h-lg text-3xl text-white sm:text-5xl">Six commitments</Reveal>
            <Reveal as="p" className="lede mt-6 max-w-xl text-[18px] text-white">
              Nairobi City County will lead a tripartite technical working group of county government, industry and academia. Success, said Dr. Mutethya, will be measured by businesses that grow, investment mobilised, jobs created and livelihoods improved.
            </Reveal>
            <ol className="mt-10 divide-y divide-line border-y border-line">
              {COMMITMENTS_2026.map((c, i) => (
                <Reveal as="li" key={c.what} className="flex gap-5 py-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold font-mono text-[16px] font-semibold text-ink" aria-hidden="true">{i + 1}</span>
                  <div>
                    <p className="text-[18px] font-medium leading-snug text-white">{c.what}</p>
                    <p className="mt-1 text-[16px] text-white">{c.who}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="panel-card h-fit bg-raise p-7 sm:p-9">
            <p className="eyebrow text-marigold">The road ahead</p>
            <h3 className="h-sm mt-4 text-2xl text-white sm:text-3xl">{PLAN_2026_2030.name}</h3>
            <p className="mt-5 text-[18px] leading-relaxed text-white">
              Aim: {PLAN_2026_2030.aim} {PLAN_2026_2030.partner}
            </p>
            <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              {PLAN_2026_2030.stats.map((s) => (
                <div key={s.value}>
                  <dt className="h-lg text-5xl text-marigold">{s.value}</dt>
                  <dd className="mt-2 text-[16px] leading-snug text-white">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Road to 2027 ------------------------------------------------------ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal as="p" className="eyebrow text-marigold mb-5">What happens next</Reveal>
          <Reveal as="h2" className="h-lg mb-12 max-w-3xl text-3xl text-white sm:text-5xl">
            From this summit to the next
          </Reveal>
          <Reveal><RoadToTimeline /></Reveal>
        </div>
      </section>

      {/* AI insight + SEALs ------------------------------------------------ */}
      <section className="border-b border-line tint-clay">
        <div className="mx-auto grid max-w-[1600px] gap-5 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <Reveal className="panel-card flex flex-col bg-raise p-7 sm:p-9">
            <p className="eyebrow text-marigold">Track 04 · AI &amp; Technology</p>
            <h2 className="h-lg mt-4 text-3xl text-white sm:text-4xl">{AI_TRACK_INSIGHT.title}</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-white">{AI_TRACK_INSIGHT.body}</p>
            <blockquote className="mt-6 border-l-4 border-gold pl-5 text-[20px] leading-snug text-white">
              &ldquo;{AI_TRACK_INSIGHT.quote}&rdquo;
              <span className="mt-2 block font-mono text-[16px] text-marigold">{AI_TRACK_INSIGHT.quoteBy}</span>
            </blockquote>
            <p className="eyebrow mt-8 text-white">{AI_TRACK_INSIGHT.checklistTitle}</p>
            <ul className="mt-3 space-y-2">
              {AI_TRACK_INSIGHT.checklist.map((q) => (
                <li key={q} className="flex gap-3 text-[16px] text-white"><span className="flex-none text-marigold" aria-hidden="true">?</span>{q}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="panel-card flex flex-col bg-raise p-7 sm:p-9">
            <p className="eyebrow text-marigold">Youth · SEALs commissioning</p>
            <h2 className="h-lg mt-4 text-3xl text-white sm:text-4xl">{SEALS_2026.title}</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-white">{SEALS_2026.body}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-white">Core values</p>
                <ul className="mt-3 space-y-2">
                  {SEALS_2026.values.map((v) => <li key={v} className="text-[16px] text-white">{v}</li>)}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-white">The charge</p>
                <ul className="mt-3 space-y-2">
                  {SEALS_2026.charge.map((v) => <li key={v} className="text-[16px] text-white">{v}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The 2026 archive -------------------------------------------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal as="p" className="eyebrow text-white mb-5">The 2026 archive</Reveal>
          <Reveal as="h2" className="h-lg max-w-3xl text-3xl text-white sm:text-5xl">Look back at the programme</Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { h: "/speakers", t: "Speakers & panelists", d: "Who was on the programme." },
              { h: "/tracks", t: "The tracks", d: "The four side tracks and what each covered." },
              { h: "/press", t: "Press and updates", d: "The build-up, in photos and updates." },
              { h: NEWSLETTER.pdf, t: `${NEWSLETTER.title} (PDF)`, d: `${NEWSLETTER.issue}. ${NEWSLETTER.blurb}`, ext: true },
            ].map((c) => (
              <Reveal key={c.h}>
                {c.ext ? (
                  <a href={c.h} className="panel-card block h-full bg-raise p-7 transition-colors hover:bg-ink" download>
                    <p className="h-sm text-2xl text-white">{c.t} ↓</p>
                    <p className="mt-3 text-[16px] leading-relaxed text-white">{c.d}</p>
                  </a>
                ) : (
                  <Link href={c.h} className="panel-card block h-full bg-raise p-7 transition-colors hover:bg-ink">
                    <p className="h-sm text-2xl text-white">{c.t} →</p>
                    <p className="mt-3 text-[16px] leading-relaxed text-white">{c.d}</p>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close ------------------------------------------------------------- */}
      <section>
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal as="h2" className="h-lg max-w-3xl text-4xl text-white sm:text-6xl">
            See you {NEXT_SUMMIT.dateConfirmed ? "on" : "in"} <span className="text-marigold">{NEXT_SUMMIT.label}</span>.
          </Reveal>
          <Reveal as="p" className="lede mt-6 max-w-2xl text-[18px] text-white">
            {NEXT_SUMMIT.purpose}{NEXT_SUMMIT.dateConfirmed ? "" : " The exact date will be announced here first."}
          </Reveal>
          <Reveal className="mt-9 flex flex-wrap gap-4">
            <TicketBtn tone="gold" />
            <Btn href="/" internal tone="onDark">Back to the 2027 summit</Btn>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
