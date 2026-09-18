"use client";

import { useEffect, useState } from "react";
import { EVENT, SUMMIT_STARTS } from "@/lib/event";

/**
 * Floating "days to the summit" badge — added 19 September 2026 alongside
 * the inline countdown in the hero, at the user's request, as a second,
 * always-visible copy that survives scrolling.
 *
 * Deliberately opposite corner from TicketTicker (bottom-left, not
 * bottom-right) so the two floating elements never overlap or compete —
 * one is the ticket deadline, this one is the summit date itself, and they
 * answer different questions.
 *
 * Ticks once a minute, not once a second: a floating badge that recalculates
 * every second reads as nervous out of the corner of your eye in a way the
 * full digit countdown in the hero doesn't, because here it's the only
 * thing on screen doing it. A days count doesn't need second-level
 * precision anyway.
 */
export default function SummitCountdownBadge() {
  const target = new Date(SUMMIT_STARTS).getTime();
  const [days, setDays] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => {
      const ms = target - Date.now();
      setDays(ms > 0 ? Math.floor(ms / 86_400_000) : null);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [target]);

  // Before hydration, and once the summit is under way: show nothing.
  if (days === undefined || days === null) return null;

  return (
    <div
      className="hidden sm:flex fixed z-40 left-6 bottom-8
                 items-center gap-3 bg-ink text-white border border-line
                 shadow-[0_8px_40px_rgba(25,21,57,0.18)] px-5 py-3"
      role="complementary"
      aria-label="Countdown to the summit"
    >
      <span className="font-mono text-3xl leading-none tabular-nums text-marigold">
        {days}
      </span>
      <span className="text-[12px] leading-tight text-white/70">
        day{days === 1 ? "" : "s"} to<br />{EVENT.name} {EVENT.year}
      </span>
    </div>
  );
}
