"use client";

import { useState } from "react";
import { AGENDA, AGENDA_SOURCE, PROGRAMME_URL } from "@/lib/event";

/* Same four-colour rotation the full agenda list used to render inline
   with (app/page.tsx kept its own copy for the same reason before this —
   see AGENDA_ACCENT_BG there), just condensed to a dot with no border
   variant needed since the preview never shows the `sessions` sub-rows. */
const ACCENT_BG = ["bg-marigold", "bg-clay", "bg-indigo", "bg-palm"];

/**
 * The homepage's "Agenda" section used to render the full hour-by-hour
 * running order inline, always visible, above the programme download bar.
 * Replaced 25 September 2026 at ICL's request ("remove the program from
 * the home page and just have the button to download the full program,
 * and as someone hovers it let it display") with just this: the download
 * bar, plus a condensed preview of the same running order that fades and
 * lifts into view on hover or keyboard focus of the bar, and disappears
 * the same way on hover-out — same entrance shape as VenueHoverButton's
 * photo preview (.venue-preview in globals.css), just anchored above a
 * full-width bar instead of a corner pill, and taller since twenty-one
 * slots need more room than five photos.
 *
 * The preview drops each slot's facilitator note and the `sessions`
 * sub-rows (the 10:30 launches, the two parallel-track blocks) — a
 * glance at the shape of the day, not a second copy of the full agenda;
 * that full detail is exactly what the PDF download is for.
 *
 * Hover/focus-only, with no touch equivalent — same documented trade-off
 * as VenueHoverButton (see its own comment): a phone visitor gets the
 * download bar and downloads the PDF, which is the actual content either
 * way.
 */
export default function AgendaPreview() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false);
      }}
    >
      <div
        className={`agenda-preview ${hovered ? "agenda-preview-visible" : ""}`}
        aria-hidden={!hovered}
      >
        <div className="p-5 sm:p-6">
          {AGENDA.map((a, i) => (
            <div
              key={a.time}
              className={`flex items-baseline gap-3 sm:gap-4 ${a.quiet ? "py-1.5" : "py-2.5"}`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.quiet ? "bg-ink/15" : ACCENT_BG[i % ACCENT_BG.length]}`}
              />
              <span className="font-mono tabular-nums text-[12px] text-ink/45 shrink-0 w-11">
                {a.time}
              </span>
              <span className={a.quiet ? "text-[13px] text-ink/45" : "text-[14px] text-ink"}>
                {a.title}
              </span>
            </div>
          ))}
          <p className="mt-3 pt-3 border-t border-rule font-mono text-[11px] text-ink/40">
            {AGENDA_SOURCE}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5 border border-rule bg-raise/40 px-6 sm:px-8 py-6">
        <span aria-hidden="true" className="font-mono text-[12px] text-ink/40 tracking-widest">PDF</span>
        <p className="flex-1 min-w-[220px] text-[15px] sm:text-[16px] text-ink">
          Hover to preview the running order, or get the full confirmed programme — every slot, every facilitator.
        </p>
        <a
          href={PROGRAMME_URL}
          download
          className="btn-glow rounded-lg inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium transition-all border border-ink/20 text-ink hover:border-ink"
        >
          Get the full programme (PDF)
          <span aria-hidden="true" className="text-[12px]">↓</span>
        </a>
      </div>
    </div>
  );
}
