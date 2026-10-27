"use client";

import { useEffect } from "react";

/**
 * Takes the loading screen away (see components/Splash.tsx for the whole
 * story). Runs only when <head>'s script has switched the screen on
 * (`splash-on` on <html>); otherwise it does nothing.
 *
 * Sequence: wait until the page has finished loading (the window `load`
 * event) AND the screen has been up for a minimum time, so a fast connection
 * shows a brief, deliberate screen rather than a flicker; then
 *   1. `splash-ready`   — the progress line runs out to full (300ms),
 *   2. `splash-lifting` — the screen slides up and fades, and the hero
 *                         headline's entrance, held until now, begins,
 *   3. `splash-on` off  — the screen is removed, and the visit is remembered
 *                         so later pages in this tab skip it.
 *
 * A slow connection is capped: after 4 seconds it leaves even if `load` has
 * not fired (a late image or tracker must not hold up the page).
 * Reduced motion shortens the minimum and swaps the slide for a plain fade.
 */
const MIN_MS = 1100;
const MIN_MS_REDUCED = 400;
const MAX_MS = 4000;

export default function SplashController() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("splash-on")) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduced ? MIN_MS_REDUCED : MIN_MS;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let started = false;

    const leave = () => {
      if (started) return;
      started = true;
      root.classList.add("splash-ready");
      timers.push(
        setTimeout(() => {
          root.classList.add("splash-lifting");
          timers.push(
            setTimeout(() => {
              root.classList.remove("splash-on", "splash-ready", "splash-lifting");
              try { sessionStorage.setItem("icl-splash", "1"); } catch { /* private mode: it will simply show again */ }
            }, reduced ? 250 : 800),
          );
        }, reduced ? 0 : 320),
      );
    };

    const sinceStart = () => performance.now();
    const whenReady = () => {
      const wait = Math.max(0, min - sinceStart());
      timers.push(setTimeout(leave, wait));
    };

    if (document.readyState === "complete") whenReady();
    else window.addEventListener("load", whenReady, { once: true });
    timers.push(setTimeout(leave, Math.max(MAX_MS - sinceStart(), 0)));

    return () => {
      window.removeEventListener("load", whenReady);
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
