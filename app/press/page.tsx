import type { Metadata } from "next";
import Link from "next/link";
import Btn from "@/components/Btn";
import PageShell from "@/components/PageShell";
import UpdateGallery from "@/components/UpdateGallery";
import { EVENT, VENUE_SHORT, SUMMIT_UPDATES, PRESS_CONTACT, TICKET_CTA, DATE_LONG } from "@/lib/event";

export const metadata: Metadata = {
  title: `Press — ${EVENT.name} ${EVENT.year}`,
  description:
    `What's happening on the way to the Africa SME Summit, ${DATE_LONG} at ${EVENT.venue} — new partners, speakers, papers and ticket milestones, in photos and video.`,
  alternates: { canonical: "https://africasmesummit.com/press" },
};

/**
 * Per-tag accent, mirroring SUMMIT_UPDATES' doc comment in lib/event.ts:
 * marigold = Speakers, clay = Tickets, indigo = Partners, palm = Papers.
 * Keyed on `tag` exactly as written there. Used only for each category's
 * own heading now (24 September 2026) — cards no longer carry a left
 * border stripe in their own colour, since the section they sit under
 * already says the tag; see the redesign comment below.
 */
const TAG_TEXT: Record<string, string> = {
  Speakers: "text-marigold-t",
  Tickets: "text-clay-t",
  Partners: "text-indigo-t",
  Papers: "text-palm-t",
};

/* Fixed category order for grouping SUMMIT_UPDATES below — same order as
   the object above. A tag with nothing posted to it yet simply renders no
   section, rather than an empty heading. */
const TAG_ORDER = ["Speakers", "Tickets", "Partners", "Papers"] as const;

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
      {/* Redesigned 24 September 2026 at ICL's request: what was one flat
          two-up feed is now grouped into the same categories the tag colour
          already implied (TAG_ORDER, matching TAG_TEXT above) — newest
          first within each group — because a flat feed stops scanning well
          once there is a lot of content, and there will be. A tag with
          nothing posted to it yet renders no section at all.

          Each card's media also shrank from a full-bleed 16:9 hero down to
          a minimised thumbnail wearing .keynote-frame — the same glossy,
          rounded, floating treatment as the keynote portraits on the
          homepage and /speakers, at ICL's explicit request that press
          media "feel the same" as those, sized at the keynote cards' own
          aspect-[4/5] rather than forced into a square (a first pass at
          this shrank it to a 144px square, which read as too small once
          live — 24 September 2026, ICL). The card itself carries
          .panel-card, the same real-gap, floating-shadow treatment now
          used by every card grid on the site (see both classes in
          globals.css) — no more left-border tag stripe on the card, since
          the category heading above it already says the tag.

          Per-image captions (UpdateGallery's crossfading name bar, built
          for the keynote lineup card) are switched off here via
          showCaptions={false} — a name in small text over a small face
          at this size read as clutter rather than identification, and the
          card's own title/body already say who is confirmed. */}
      {TAG_ORDER.map((tag) => {
        const items = SUMMIT_UPDATES
          .filter((u) => u.tag === tag)
          .slice()
          .sort((a, b) => (a.date < b.date ? 1 : -1));
        if (items.length === 0) return null;
        return (
          <section key={tag} className="border-b border-line">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
              <p className={`eyebrow mb-8 ${TAG_TEXT[tag]}`}>{tag}</p>
              <div className="grid gap-6 lg:grid-cols-2">
                {items.map((u) => (
                  <article
                    key={u.title}
                    className={`panel-card bg-ink overflow-hidden flex flex-col sm:flex-row gap-6 p-6 sm:p-7 ${u.urgent ? "glow-clay" : ""}`}
                  >
                    {u.media && (
                      <div className="keynote-frame overflow-hidden bg-raise flex-none w-full sm:w-52 aspect-[4/5]">
                        {u.media.type === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={u.media.src}
                            alt={u.media.alt}
                            loading="lazy"
                            className={`w-full h-full ${u.media.fit === "contain" ? "object-contain" : "object-cover"}`}
                          />
                        ) : u.media.type === "gallery" ? (
                          <UpdateGallery images={u.media.images} showCaptions={false} />
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
                    <div className="min-w-0 flex-1">
                      <time dateTime={u.date} className="font-mono text-[12px] text-white/40">
                        {updateLabel(u.date)}
                      </time>
                      <h2 className="h-sm text-white text-xl mt-2">{u.title}</h2>
                      <p className="lede mt-2.5 text-[16px] text-white/80">{u.body}</p>
                      {u.link && (
                        u.link.style === "button" ? (
                          <Btn href={u.link.href} tone="gold" className="mt-5">
                            {u.link.text}
                          </Btn>
                        ) : (
                          <Link
                            href={u.link.href}
                            className="mt-3 inline-flex items-center gap-1.5 text-[16px] text-white underline underline-offset-4 hover:text-marigold transition-colors"
                          >
                            {u.link.text}
                            <span aria-hidden="true">→</span>
                          </Link>
                        )
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
              <span className="venue-float">{EVENT.venue}</span>, {VENUE_SHORT}, {EVENT.dateLabel}.
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
