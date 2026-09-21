import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import PageShell from "@/components/PageShell";
import UpdateGallery from "@/components/UpdateGallery";
import { EVENT, SUMMIT_UPDATES, PRESS_CONTACT, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Press — ${EVENT.name} ${EVENT.year}`,
  description:
    `What's happening on the way to the Africa SME Summit, ${DATE_LONG} at the University of Nairobi — new partners, speakers, papers and ticket milestones, in photos and video.`,
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
      lede="New partners, speakers, deadlines and milestones — in photos and video as they happen. Nothing here is embargoed, so quote or share whatever's useful."
    >
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          {/* Widened from the old 46rem article measure — a card carrying a
              photo or video needs more than a text column's worth of room,
              and the feed reads better in two columns above the lg
              breakpoint. */}
          <div className="grid gap-6 lg:grid-cols-2 max-w-[1100px]">
            {SUMMIT_UPDATES.map((u) => (
              <article
                key={u.title}
                className={`bg-ink border-l-2 ${TAG_STYLE[u.tag].border} overflow-hidden flex flex-col`}
              >
                {/* Media bleeds to the card's own edges — no padding, no
                    rounded corners (the site is sharp everywhere) — so a
                    photo or clip reads as press material, not a thumbnail
                    stuck inside a text card. Fixed 16:9 box either way, so
                    a mixed feed of photo/video/text-only cards still lines
                    up in the grid. */}
                {u.media && (
                  <div className="aspect-video w-full bg-raise flex-none">
                    {u.media.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={u.media.src}
                        alt={u.media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : u.media.type === "gallery" ? (
                      <UpdateGallery images={u.media.images} />
                    ) : (
                      <video
                        controls
                        playsInline
                        preload="none"
                        poster={u.media.poster}
                        className="w-full h-full object-cover"
                      >
                        <source src={u.media.src} type="video/mp4" />
                      </video>
                    )}
                  </div>
                )}
                <div className="p-8 sm:p-10">
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
                  <p className="lede mt-3 text-[17px] text-white/80">{u.body}</p>
                  {u.link && (
                    <Link
                      href={u.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[16px] text-white underline underline-offset-4 hover:text-marigold transition-colors"
                    >
                      {u.link.text}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
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
