"use client";

import { useEffect, useState } from "react";
import { EARLY_BIRD_ENDS } from "@/lib/event";

/**
 * A generic countdown to any target timestamp.
 *
 * Originally hardcoded to the early-bird deadline (still the default, so
 * every existing call site keeps working unchanged). Generalised 18
 * September 2026 to also drive the summit-day countdown on the homepage —
 * pass `target` and the two labels to point it at a different date.
 *
 * Renders a stable placeholder on the server so the static export has no
 * layout shift, then fills in on mount. When the target passes it swaps
 * itself for `endedLabel` rather than showing zeros, so the page never
 * pressures someone with a deadline that has already gone.
 */

function remaining(target: number) {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({
  tone = "dark",
  target: targetISO = EARLY_BIRD_ENDS,
  activeLabel = "Early bird closes in",
  endedLabel = "Early bird sold out — standard rate applies.",
}: {
  tone?: "dark" | "light";
  target?: string;
  activeLabel?: string;
  endedLabel?: string;
}) {
  const target = new Date(targetISO).getTime();
  const [left, setLeft] = useState<ReturnType<typeof remaining> | undefined>(undefined);

  useEffect(() => {
    setLeft(remaining(target));
    const id = setInterval(() => setLeft(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const onDark = tone === "dark";
  const labelClass = onDark ? "text-white" : "text-ink";
  // Was "text-cream" — not a defined colour token anywhere in the theme, so
  // it compiled to no rule at all and the digits fell back to inherited
  // text-ink on a dark field: ink on ink, invisible. Found 19 September
  // 2026 on the /papers notifications countdown, the first dark-tone,
  // dark-background use of this component (the homepage countdown uses
  // tone="light", which was never broken).
  const digitClass = onDark ? "text-white" : "text-ink";

  // Before hydration: reserve the space, say nothing that could be wrong.
  if (left === undefined) {
    return (
      <div className="h-[68px]" aria-hidden="true" />
    );
  }

  if (left === null) {
    return (
      <p className={`font-mono text-sm ${labelClass}`}>
        {endedLabel}
      </p>
    );
  }

  const units: [number, string][] = [
    [left.days, "days"],
    [left.hours, "hrs"],
    [left.minutes, "min"],
    [left.seconds, "sec"],
  ];

  return (
    <div>
      <p className={`eyebrow mb-2 ${onDark ? "text-clay-bright" : "text-clay"}`}
         style={onDark ? { color: "#E8776A" } : undefined}>
        {activeLabel}
      </p>
      <div className="flex items-end gap-4" role="timer" aria-live="off">
        {units.map(([value, label]) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span className={`font-mono text-3xl sm:text-4xl tabular-nums ${digitClass}`}>
              {pad(value)}
            </span>
            <span className={`font-mono text-[12px] uppercase tracking-widest ${labelClass}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
