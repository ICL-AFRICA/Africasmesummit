"use client";

import { useEffect, useRef } from "react";

/**
 * A single soft light that drifts toward the pointer — "cursor affect on
 * the site as it moves around," at ICL's request, 25 September 2026.
 * Mounted once in the root layout (app/layout.tsx), fixed above the page.
 *
 * The transform is written straight onto the node via a ref inside a
 * rAF-throttled pointermove listener — no React state, so no re-render
 * on every pixel of mouse movement — and .cursor-glow (globals.css) eases
 * that transform with a CSS transition rather than tracking 1:1, so the
 * light reads as trailing light rather than a second, snappier cursor.
 *
 * Gated out entirely (not just faded) on touch and under
 * prefers-reduced-motion — see the media queries on .cursor-glow — so the
 * only work this component's listener does on a phone is nothing: the
 * checks below skip attaching it in the first place.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        el.style.opacity = "1";
      });
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        el.style.opacity = "0";
      }, 2400);
    };
    const leave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
