"use client";

import { useEffect, useState } from "react";
import { EARLY_BIRD_ENDS, EARLY_BIRD_LABEL, EARLY_BIRD_PRICE, EVENT } from "@/lib/event";

/**
 * The early-bird bar. Pinned to the top, present on every scroll position,
 * and the only place on the site that carries urgency.
 *
 * Two states, not one: while the deadline is still open it counts down: once
 * it passes, it does NOT disappear (that was the original behaviour, and it
 * left the page with zero urgency signal for the entire gap between the
 * early-bird deadline and the summit itself — the exact window a visitor is
 * most likely to actually book). Instead it switches to a "sold out" message
 * that pushes toward booking at standard rate now, with the same Book Now
 * action, so there is always something here rather than nothing once the
 * discount is gone.
 */
export default function StickyBar({ mobileOnly = false }: { mobileOnly?: boolean } = {}) {
  const target = new Date(EARLY_BIRD_ENDS).getTime();
  const [left, setLeft] = useState<number | null | undefined>(undefined);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const tick = () => {
      const ms = target - Date.now();
      setLeft(ms > 0 ? ms : null);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === undefined || closed) return null;

  const wrapClass = `${mobileOnly ? "sm:hidden " : ""}`;

  if (left === null) {
    return (
      <div className={`${wrapClass}bg-ink text-white`}>
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 h-12 sm:h-11 flex items-center justify-between gap-3 sm:gap-4 text-[16px]">
          <p className="font-medium truncate">
            Early bird sold out — book now before standard fills too.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 flex-none">
            <a
              href={EVENT.ticketUrl}
              className="bg-marigold text-ink px-4 py-2 font-medium hover:brightness-105 transition-all whitespace-nowrap"
            >
              Book now
            </a>
            <button
              onClick={() => setClosed(true)}
              aria-label="Dismiss notice"
              className="text-white/60 hover:text-white text-[22px] leading-none px-1"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }

  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor((left / 3_600_000) % 24);
  const mins = Math.floor((left / 60_000) % 60);
  const secs = Math.floor((left / 1000) % 60);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={`${wrapClass}bg-marigold text-ink`}>
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 h-12 sm:h-11 flex items-center justify-between gap-3 sm:gap-4 text-[16px]">
        {/* Two messages, not one truncated one. A phone has room for the
            price and the days left; a laptop has room for the sentence. */}
        <p className="font-medium sm:hidden whitespace-nowrap">
          {EARLY_BIRD_PRICE} · <span className="font-mono tabular-nums">{days}d</span> left
        </p>
        <p className="font-medium hidden sm:block truncate">
          {`Early bird — ${EARLY_BIRD_PRICE}. Ends ${EARLY_BIRD_LABEL}.`}
        </p>
        <div className="flex items-center gap-3 sm:gap-4 flex-none">
          <p className="font-mono tabular-nums hidden sm:block">
            {days}d {pad(hours)}:{pad(mins)}:{pad(secs)}
          </p>
          <a
            href={EVENT.ticketUrl}
            className="bg-ink text-white px-4 py-2 font-medium hover:bg-raise transition-colors whitespace-nowrap"
          >
            Book now
          </a>
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss early bird notice"
            className="text-ink/60 hover:text-ink text-[22px] leading-none px-1"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
