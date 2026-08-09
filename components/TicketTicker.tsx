"use client";

import { useEffect, useState } from "react";
import { EARLY_BIRD_ENDS, EARLY_BIRD_LABEL, EVENT } from "@/lib/event";

const KEY = "asm-ticker-dismissed";

/**
 * Floating early-bird ticker.
 *
 * Sits bottom-right on desktop, full width along the bottom on a phone.
 * Three behaviours worth knowing:
 *
 * 1. It waits ~1.4s before appearing. Arriving with the hero fights the
 *    first impression; arriving just after it feels like an offer rather
 *    than an interruption.
 * 2. Dismissal is remembered in localStorage. Being asked to close the same
 *    thing on every page is what makes these hated.
 * 3. It removes itself when the deadline passes rather than showing zeros —
 *    the page should never pressure someone with a deadline that has gone.
 */
export default function TicketTicker() {
  const target = new Date(EARLY_BIRD_ENDS).getTime();
  const [left, setLeft] = useState<number | null | undefined>(undefined);
  const [closed, setClosed] = useState(true);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") return;
    } catch { /* private mode — just show it */ }
    setClosed(false);
    const reveal = setTimeout(() => setShown(true), 1400);
    const tick = () => {
      const ms = target - Date.now();
      setLeft(ms > 0 ? ms : null);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => { clearInterval(id); clearTimeout(reveal); };
  }, [target]);

  function dismiss() {
    setShown(false);
    try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setTimeout(() => setClosed(true), 320);
  }

  if (closed || left === undefined || left === null) return null;

  const units: [number, string][] = [
    [Math.floor(left / 86_400_000), "Days"],
    [Math.floor((left / 3_600_000) % 24), "Hours"],
    [Math.floor((left / 60_000) % 60), "Minutes"],
    [Math.floor((left / 1000) % 60), "Seconds"],
  ];

  return (
    <div
      /* Desktop only. On a phone a floating card covers a third of the
         viewport and competes with the content it is trying to sell; the
         top bar does the same job in 44px. */
      className={`hidden sm:block fixed z-50 right-8 bottom-8
                  transition-all duration-300 ease-out
                  ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      role="complementary"
      aria-label="Early bird offer"
    >
      <div className="relative bg-card border border-rule shadow-[0_8px_40px_rgba(25,21,57,0.18)]">
        <button
          onClick={dismiss}
          aria-label="Dismiss early bird offer"
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center
                     rounded-full bg-ink text-white text-[16px] leading-none
                     hover:bg-raise transition-colors"
        >
          ×
        </button>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 px-6 py-5">
          <p className="text-[16px] text-ink font-medium">
            Early bird — ends {EARLY_BIRD_LABEL}
          </p>

          <div className="flex items-start gap-4">
            {units.map(([value, label]) => (
              <div key={label} className="text-center">
                <span className="block font-mono text-[28px] leading-none tabular-nums text-ink">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[12px] text-ink/60">{label}</span>
              </div>
            ))}
          </div>

          <a
            href={EVENT.ticketUrl}
            className="ml-auto bg-marigold text-ink px-5 py-3 text-[16px] font-semibold
                       hover:brightness-105 transition-all"
          >
            Book ticket now
          </a>


        </div>
      </div>
    </div>
  );
}
