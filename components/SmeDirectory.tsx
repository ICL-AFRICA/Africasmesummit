"use client";

import { useState } from "react";
import { SME_SECTORS, SME_NETWORK } from "@/lib/event";

/* One accent per sector, reusing the site's own four-colour rotation
   (never a fifth) — same palette /tracks and /press already use for this
   exact job. Colour is never the only signal: the chip and the card both
   repeat the sector as text too. */
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
const CHIP_ACTIVE: Record<string, string> = {
  agribusiness: "bg-palm text-white border-palm",
  products: "bg-clay text-white border-clay",
  health: "bg-indigo text-white border-indigo",
  services: "bg-marigold text-ink border-marigold",
};

type Sector = (typeof SME_SECTORS)[number]["key"];

/**
 * The SME network, browsable by sector.
 *
 * A flat wall of ten unrelated businesses — leather goods next to
 * counselling next to fencing posts — reads as noise without a way to
 * narrow it. Filtering by sector is the whole point: "all" up front so the
 * range is visible at a glance, then a click narrows to one kind of
 * business. Counts on each chip are computed from SME_NETWORK, never
 * typed, so a new company added there is reflected here automatically.
 */
export default function SmeDirectory() {
  const [active, setActive] = useState<Sector | "all">("all");

  const countOf = (key: Sector) => SME_NETWORK.filter((c) => c.sector === key).length;
  const shown = active === "all" ? SME_NETWORK : SME_NETWORK.filter((c) => c.sector === active);

  return (
    <div>
      {/* Filter chips. role="group" plus aria-pressed rather than a native
          radio group — visually and behaviourally these are toggle chips,
          not a form. */}
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by sector">
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
            active === "all"
              ? "bg-white text-ink border-white"
              : "border-line text-white hover:border-white"
          }`}
        >
          All {SME_NETWORK.length}
        </button>
        {SME_SECTORS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(s.key)}
            aria-pressed={active === s.key}
            className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
              active === s.key ? CHIP_ACTIVE[s.key] : "border-line text-white hover:border-white"
            }`}
          >
            {s.label} · {countOf(s.key)}
          </button>
        ))}
      </div>

      {/* The directory. aria-live so a screen-reader user hears the list
          change when a chip is pressed, not just the chip's own state. */}
      <ul
        aria-live="polite"
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
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

            <p className={`font-mono text-[11px] uppercase tracking-widest mt-5 ${ACCENT[c.sector]}`}>
              {SME_SECTORS.find((s) => s.key === c.sector)?.label}
            </p>
            <h3 className="h-sm text-white text-xl mt-2">{c.name}</h3>
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
