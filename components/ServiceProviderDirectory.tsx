"use client";

import { useState } from "react";
import { SERVICE_PROVIDER_CATEGORIES, SERVICE_PROVIDERS } from "@/lib/event";

/* Same six-rotating-through-four brand colours TRACKS and /tracks use
   (marigold, clay, indigo, palm, marigold, clay) — never a fifth. Whole
   class strings only, never `hover:${colour}` (Tailwind only generates
   what it can read literally in the source — see app/page.tsx's tracks
   grid for the failure this avoids). */
const ROTATION = ["marigold", "clay", "indigo", "palm", "marigold", "clay"] as const;

const ACCENT: Record<string, string> = {
  marigold: "text-marigold-t", clay: "text-clay-t", indigo: "text-indigo-t", palm: "text-palm-t",
};
const ACCENT_BORDER: Record<string, string> = {
  marigold: "border-marigold", clay: "border-clay", indigo: "border-indigo", palm: "border-palm",
};
const CARD_BORDER: Record<string, string> = {
  marigold: "border-line hover:border-marigold", clay: "border-line hover:border-clay",
  indigo: "border-line hover:border-indigo", palm: "border-line hover:border-palm",
};
const CARD_TITLE_HOVER: Record<string, string> = {
  marigold: "group-hover:text-marigold-t", clay: "group-hover:text-clay-t",
  indigo: "group-hover:text-indigo-t", palm: "group-hover:text-palm-t",
};

type Category = (typeof SERVICE_PROVIDER_CATEGORIES)[number]["key"];
const colourOf = (key: Category) => ROTATION[SERVICE_PROVIDER_CATEGORIES.findIndex((c) => c.key === key) % 4];

/**
 * Service providers, browsed category-first — same two-view shape as
 * components/SmeDirectory.tsx (sector cards, then a click drills into that
 * one category), built 1 October 2026 at ICL's (boss's) request alongside
 * it.
 *
 * The one real difference from SmeDirectory: SERVICE_PROVIDERS ships empty
 * (see lib/event.ts), so every category starts at zero. Both views handle
 * that explicitly rather than assuming a non-empty list the way
 * SmeDirectory can — a category card reads "Be the first listed" instead
 * of a count, skips the logo-preview strip entirely (there is nothing yet
 * to preview), and the detail view shows an invitation to apply rather
 * than an empty grid. Once SERVICE_PROVIDERS has entries in a category,
 * both views render exactly as SmeDirectory's do.
 */
export default function ServiceProviderDirectory() {
  const [active, setActive] = useState<Category | null>(null);

  if (active === null) {
    return (
      <ul className="grid gap-6 sm:grid-cols-2">
        {SERVICE_PROVIDER_CATEGORIES.map((cat, i) => {
          const colour = colourOf(cat.key);
          const providers = SERVICE_PROVIDERS.filter((p) => p.category === cat.key);
          const preview = providers.slice(0, 3);
          const extra = providers.length - preview.length;

          return (
            <li key={cat.key}>
              <button
                type="button"
                onClick={() => setActive(cat.key)}
                className={`panel-card group w-full text-left bg-raise p-8 sm:p-10 flex flex-col border-t-2 transition-colors ${CARD_BORDER[colour]}`}
              >
                <p className={`font-mono text-[12px] ${ACCENT[colour]}`}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className={`h-sm text-white text-2xl sm:text-3xl mt-4 transition-colors ${CARD_TITLE_HOVER[colour]}`}>
                  {cat.label}
                </h2>
                <p className="lede mt-4 text-[16px] text-white">{cat.blurb}</p>

                {preview.length > 0 && (
                  <div className="mt-7 flex items-center gap-3">
                    {preview.map((p) => (
                      <span
                        key={p.slug}
                        className="h-12 w-12 rounded-lg bg-white flex items-center justify-center p-2 flex-none"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.logo} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    ))}
                    {extra > 0 && <span className="text-[13px] text-white/50">+{extra} more</span>}
                  </div>
                )}

                <p className={`mt-7 pt-6 border-t border-line text-[16px] ${ACCENT[colour]}`}>
                  {providers.length > 0
                    ? `${providers.length} ${providers.length === 1 ? "provider" : "providers"}`
                    : "Be the first listed"}{" "}
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  const cat = SERVICE_PROVIDER_CATEGORIES.find((c) => c.key === active)!;
  const colour = colourOf(active);
  const shown = SERVICE_PROVIDERS.filter((p) => p.category === active);

  return (
    <div>
      <button
        type="button"
        onClick={() => setActive(null)}
        className="inline-flex items-center gap-2 text-[14px] text-white/70 hover:text-white transition-colors"
      >
        <span aria-hidden="true">←</span> All categories
      </button>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="h-sm text-white text-2xl sm:text-3xl">{cat.label}</h2>
        {shown.length > 0 && (
          <span className={`font-mono text-[13px] ${ACCENT[colour]}`}>
            {shown.length} {shown.length === 1 ? "provider" : "providers"}
          </span>
        )}
      </div>
      <p className="lede mt-3 text-[16px] text-white max-w-2xl">{cat.blurb}</p>

      {shown.length === 0 ? (
        /* No providers yet in this category — an invitation, not a dead
           end. Every category reads this way at launch; see the comment
           on SERVICE_PROVIDERS in lib/event.ts. */
        <div className={`mt-10 panel-card bg-raise p-8 sm:p-10 border-t-2 ${ACCENT_BORDER[colour]} max-w-xl`}>
          <p className="h-sm text-white text-xl">No providers listed here yet.</p>
          <p className="lede mt-3 text-[16px] text-white">
            If your organisation offers {cat.label.toLowerCase()} services to SMEs, we'd like to hear from you.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-[15px] text-marigold hover:text-white transition-colors"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : (
        <ul aria-live="polite" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug} className={`panel-card bg-raise p-6 flex flex-col border-t-2 ${ACCENT_BORDER[colour]}`}>
              <div className="h-20 rounded-lg bg-white flex items-center justify-center p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
              </div>

              <h3 className="h-sm text-white text-xl mt-5">{p.name}</h3>
              <p className={`mt-1 text-[14px] font-medium ${ACCENT[colour]}`}>{p.tagline}</p>

              <p className="lede mt-4 text-[15px] text-white flex-1">{p.blurb}</p>

              <div className="mt-5 pt-4 border-t border-line">
                <p className="text-[13px] text-white/70">{p.highlight}</p>
                <p className="mt-2 text-[13px] font-mono text-white/50">{p.location}</p>
              </div>

              {p.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {p.links.map((l) => (
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
      )}
    </div>
  );
}
