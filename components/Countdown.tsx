"use client";

import { useEffect, useState } from "react";
import { EARLY_BIRD_ENDS } from "@/lib/event";

/**
 * The early-bird countdown — the only client-side JavaScript on the page.
 *
 * Renders a stable placeholder on the server so the static export has no
 * layout shift, then fills in on mount. When the deadline passes it swaps
 * itself for the standard-rate message rather than showing zeros, so the
 * page never tells someone they are too late for a rate that is still open,
 * or too early for one that has closed.
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

export default function Countdown({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const target = new Date(EARLY_BIRD_ENDS).getTime();
  const [left, setLeft] = useState<ReturnType<typeof remaining> | undefined>(undefined);

  useEffect(() => {
    setLeft(remaining(target));
    const id = setInterval(() => setLeft(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const onDark = tone === "dark";
  const labelClass = onDark ? "text-white" : "text-ink";
  const digitClass = onDark ? "text-cream" : "text-ink";

  // Before hydration: reserve the space, say nothing that could be wrong.
  if (left === undefined) {
    return (
      <div className="h-[68px]" aria-hidden="true" />
    );
  }

  if (left === null) {
    return (
      <p className={`font-mono text-sm ${labelClass}`}>
        Early bird has closed — standard rate applies.
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
        Early bird closes in
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
