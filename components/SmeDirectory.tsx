"use client";

import { useState } from "react";
import { SME_SECTORS, SME_NETWORK } from "@/lib/event";

/* One accent per sector, reusing the site's own four-colour rotation
   (never a fifth) — same palette /tracks and /press already use for this
   exact job. Colour is never the only signal: the sector name is always
   repeated as text too, both on its own card and above the businesses it
   leads to.

   Whole class strings only, never `hover:${colour}` — Tailwind only
   generates what it can read literally in the source, so an interpolated
   variant silently compiles to nothing (see app/page.tsx's tracks grid for
   the exact failure this avoids). */
const ACCENT: Record<string, string> = {
  agribusiness: "text-palm-t",
  products: "text-clay-t",
  health: "text-indigo-t",
  services: "text-marigold-t",
};
const ACCENT_BORDER: Record<string, string> = {
  agribusiness: "border-palm",
  products: "border-clay",
  health: "border-indigo",
  services: "border-marigold",
};
/* Sector-card top rule: flat by default, takes the sector's colour on
   hover — the same "only the rule moves" affordance the homepage tracks
   grid uses for its own clickable cards. */
const CARD_BORDER: Record<string, string> = {
  agribusiness: "border-line hover:border-palm",
  products: "border-line hover:border-clay",
  health: "border-line hover:border-indigo",
  services: "border-line hover:border-marigold",
};
const CARD_TITLE_HOVER: Record<string, string> = {
  agribusiness: "group-hover:text-palm-t",
  products: "group-hover:text-clay-t",
  health: "group-hover:text-indigo-t",
  services: "group-hover:text-marigold-t",
};

type Sector = (typeof SME_SECTORS)[number]["key"];

/**
 * The SME network, browsed sector-first.
 *
 * Redesigned 1 October 2026 at ICL's (boss's) request, replacing the
 * original "All + four filter chips above a flat wall of ten companies"
 * version (see git history). A flat wall of unrelated businesses — leather
 * goods next to counselling next to fencing posts — read as noise without
 * a way to narrow it; the chip row fixed that, but the boss's note was
 * sharper still: lead with the four sectors as their own destination, not
 * as filters bolted onto a list that was already fully visible. So this is
 * two views in one component rather than one list with a toggle:
 *
 *   1. SECTOR VIEW (default, `active === null`) — four big cards, one per
 *      SME_SECTORS entry, each with its own blurb and a preview of up to
 *      three real company logos from inside it. This is the "no need for
 *      the all filter" the boss asked for: there is no way to see all ten
 *      at once any more, by design — pick a sector first.
 *   2. SECTOR DETAIL (`active` set) — the businesses in that one sector,
 *      same card markup the old flat list used, reached only by clicking
 *      a sector card and left only by the "All sectors" control above the
 *      grid.
 *
 * Plain component state, not a URL/hash — consistent with how the rest of
 * the site handles this kind of in-page toggle (see AgendaPreview's
 * hover state), and there was no request for a shareable per-sector link.
 */
export default function SmeDirectory() {
  const [active, setActive] = useState<Sector | null>(null);

  if (active === null) {
    return (
      <div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {SME_SECTORS.map((s, i) => {
            const companies = SME_NETWORK.filter((c) => c.sector === s.key);
            const preview = companies.slice(0, 3);
            const extra = companies.length - preview.length;
            const count = companies.length;

            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setActive(s.key)}
                  className={`panel-card group w-full text-left bg-raise p-8 sm:p-10 flex flex-col border-t-2 transition-colors ${CARD_BORDER[s.key]}`}
                >
                  <p className={`font-mono text-[12px] ${ACCENT[s.key]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className={`h-sm text-white text-2xl sm:text-3xl mt-4 transition-colors ${CARD_TITLE_HOVER[s.key]}`}>
                    {s.label}
                  </h2>
                  <p className="lede mt-4 text-[16px] text-white">{s.blurb}</p>

                  {/* Real logos, not icons — a genuine preview of what's
                      behind the click rather than decoration. White tiles
                      regardless of a logo's own background, same treatment
                      as the company cards below. */}
                  <div className="mt-7 flex items-center gap-3">
                    {preview.map((c) => (
                      <span
                        key={c.slug}
                        className="h-12 w-12 rounded-lg bg-white flex items-center justify-center p-2 flex-none"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.logo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="max-h-full max-w-full object-contain"
                        />
                      </span>
                    ))}
                    {extra > 0 && (
                      <span className="text-[13px] text-white/50">+{extra} more</span>
                    )}
                  </div>

                  <p className={`mt-7 pt-6 border-t border-line text-[16px] ${ACCENT[s.key]}`}>
                    {count} {count === 1 ? "business" : "businesses"}{" "}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const sector = SME_SECTORS.find((s) => s.key === active)!;
  const shown = SME_NETWORK.filter((c) => c.sector === active);

  return (
    <div>
      <button
        type="button"
        onClick={() => setActive(null)}
        className="inline-flex items-center gap-2 text-[14px] text-white/70 hover:text-white transition-colors"
      >
        <span aria-hidden="true">←</span> All sectors
      </button>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="h-sm text-white text-2xl sm:text-3xl">{sector.label}</h2>
        <span className={`font-mono text-[13px] ${ACCENT[active]}`}>
          {shown.length} {shown.length === 1 ? "business" : "businesses"}
        </span>
      </div>
      <p className="lede mt-3 text-[16px] text-white max-w-2xl">{sector.blurb}</p>

      {/* aria-live so a screen-reader user hears the new list announced
          when a sector card is picked, not just the heading's own change. */}
      <ul aria-live="polite" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <li
            key={c.slug}
            className={`panel-card bg-raise p-6 flex flex-col border-t-2 ${ACCENT_BORDER[c.sector]}`}
          >
            <div className="h-20 rounded-lg bg-white flex items-center justify-center p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={`${c.name} logo`}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <h3 className="h-sm text-white text-xl mt-5">{c.name}</h3>
            <p className={`mt-1 text-[14px] font-medium ${ACCENT[c.sector]}`}>{c.tagline}</p>

            <p className="lede mt-4 text-[15px] text-white flex-1">{c.blurb}</p>

            <div className="mt-5 pt-4 border-t border-line">
              <p className="text-[13px] text-white/70">{c.highlight}</p>
              <p className="mt-2 text-[13px] font-mono text-white/50">{c.location}</p>
            </div>

            {c.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {c.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[14px] text-white underline underline-offset-4 hover:text-marigold transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
