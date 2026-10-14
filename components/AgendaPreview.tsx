"use client";

import { useId, useState } from "react";
import { AGENDA, AGENDA_SOURCE, PROGRAMME_URL } from "@/lib/event";

/* Same four-colour rotation the full agenda list used to render inline
   with, kept as a dot beside each slot. The quiet slots (arrival, anthem,
   prayer) get a smaller, plainer dot instead of smaller or greyer text —
   nothing on this section drops below 16px or fades to a muted grey. */
const ACCENT_BG = ["bg-marigold", "bg-clay", "bg-indigo", "bg-palm"];

/**
 * The homepage's programme block. Three shapes over its life:
 *
 *  1. Until 25 September 2026: the full hour-by-hour running order, always
 *     visible, above a download bar.
 *  2. 25 September 2026, at ICL's request: just the download bar, with a
 *     condensed preview of the running order that appeared on hover or
 *     keyboard focus of the bar — which a phone visitor never got, since
 *     there is no hover on touch.
 *  3. 14 October 2026, at ICL's request (this version): the block moved to
 *     sit directly under the speakers section, and the hover preview became
 *     a button. It reads "Expand to see more of the programme"; pressing it
 *     opens the condensed running order (the same trimmed list as before —
 *     each slot's facilitator note and the `sessions` sub-rows are left to
 *     the PDF), and the PDF download sits at the bottom of that list, once
 *     someone has seen the shape of the day and wants all of it. Works the
 *     same on touch and with a keyboard, which the hover version could not.
 *
 * Centred on 14 October 2026, at ICL's request: the heading above and this
 * button share one centre line, and the opened panel is held to a readable
 * width (max-w-4xl) under them rather than running the full page width.
 *
 * The download is deliberately inside the expanded panel, as asked — the
 * collapsed block is only the button. The footer's "The day" link and the
 * Accelerator page's agenda link both land on #agenda, i.e. on this heading
 * and button, which is the right place for them.
 */
export default function AgendaPreview() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="btn-glow rounded-lg inline-flex items-center gap-3 bg-ink text-white px-6 py-3.5 text-[16px] font-medium hover:bg-raise transition-colors"
      >
        {open ? "Hide the programme" : "Expand to see more of the programme"}
        <svg
          width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4.5l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div id={panelId} className="mt-8 w-full max-w-4xl rounded-2xl border border-rule bg-paper">
          <div className="p-5 sm:p-8">
            {AGENDA.map((a, i) => (
              <div
                key={a.time}
                className={`flex items-baseline gap-4 sm:gap-5 ${a.quiet ? "py-2" : "py-3"}`}
              >
                {/* Fixed-width cell so the quiet slots' smaller dot doesn't
                    shift their times out of line with the named slots'. */}
                <span aria-hidden="true" className="shrink-0 w-2 flex justify-center">
                  <span
                    className={`rounded-full ${
                      a.quiet ? "h-1 w-1 bg-ink" : `h-2 w-2 ${ACCENT_BG[i % ACCENT_BG.length]}`
                    }`}
                  />
                </span>
                <span className="font-mono tabular-nums text-[16px] text-ink shrink-0 w-14">
                  {a.time}
                </span>
                <span className={`text-[16px] text-ink ${a.quiet ? "" : "font-medium"}`}>
                  {a.title}
                </span>
              </div>
            ))}
            <p className="mt-4 pt-4 border-t border-rule text-[16px] text-ink">
              {AGENDA_SOURCE}
            </p>

            {/* The download sits last, at the bottom of the summary. */}
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <p className="flex-1 min-w-[220px] text-[16px] text-ink">
                Want every slot and every facilitator? Get the full confirmed programme.
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
        </div>
      )}
    </div>
  );
}
