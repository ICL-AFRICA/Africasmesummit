"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Photo = { src: string; thumb: string; alt: string; fit?: "contain" };

/**
 * The picture block at the very top of /press (19 October 2026, at ICL's
 * request, from a sketch: logo, one large 16:9 frame, four images under it).
 * The logo is the site header above it; the large frame is a slideshow of
 * the summit photographs; the four images are a strip of thumbnails.
 *
 * Behaviour, kept deliberately plain:
 *  - The large frame advances every few seconds on its own, pauses the
 *    moment a mouse or keyboard focus is on it, and stops for good once a
 *    visitor picks a photo or uses an arrow. A Pause/Play button is always
 *    there (an auto-moving image needs one). Visitors who have asked for
 *    reduced motion get no autoplay at all, only the controls.
 *  - The strip shows the four photos around the current one in fixed groups
 *    of four, so it never slides under a cursor. Clicking one shows it large.
 *  - "See all photos" opens every photo as a grid; clicking one shows it
 *    large and scrolls back up to the frame.
 *
 * Landscape photographs fill the frame (object-cover). The two portrait
 * ones are letterboxed (object-contain) rather than cropped to a 16:9 slice.
 *
 * Sizing: the frame and strip share one width, capped so that on a laptop
 * screen the frame plus the strip fit inside the first screen instead of
 * the frame alone pushing the strip below the fold. 1.37 is the width that
 * a given height can hold: frame (9/16 of the width) plus strip (about a
 * sixth of it) is 0.73 of the width, and 1 / 0.73 = 1.37. The 20rem is the
 * bar, header and heading above the frame.
 */
export default function SummitHero({ photos }: { photos: readonly Photo[] }) {
  const total = photos.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const reducedMotion = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reducedMotion.current = true;
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || hovered || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5500);
    return () => clearInterval(id);
  }, [playing, hovered, total]);

  // Warm the next photograph so the change doesn't flash an empty frame.
  useEffect(() => {
    const next = new Image();
    next.src = photos[(index + 1) % total].src;
  }, [index, photos, total]);

  const go = useCallback(
    (to: number) => {
      setPlaying(false);
      setIndex(((to % total) + total) % total);
    },
    [total],
  );

  const pick = (i: number) => {
    go(i);
    frameRef.current?.scrollIntoView({ behavior: reducedMotion.current ? "auto" : "smooth", block: "center" });
  };

  const photo = photos[index];
  const groupStart = Math.floor(index / 4) * 4;
  const strip = [0, 1, 2, 3].map((k) => (groupStart + k) % total);

  return (
    <div
      className="mx-auto"
      style={{ maxWidth: "min(100%, max(30rem, calc((100svh - 20rem) * 1.37)))" }}
    >
      <div
        ref={frameRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Africa SME Summit 2026 photographs"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
        }}
        className="relative aspect-video overflow-hidden rounded-2xl bg-raise scroll-mt-28"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          decoding="async"
          fetchPriority={index === 0 ? "high" : undefined}
          className={`summit-fade absolute inset-0 h-full w-full ${photo.fit === "contain" ? "object-contain" : "object-cover"}`}
        />

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-raise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-raise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
        </button>

        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[16px] font-medium text-white transition-colors hover:bg-raise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
            </svg>
            {playing ? "Pause" : "Play"}
          </button>
          <span className="rounded-full bg-ink px-4 py-2 font-mono text-[16px] tabular-nums text-white" aria-live="off">
            {index + 1} / {total}
          </span>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-3 sm:mt-4 sm:gap-4" aria-label="Photo strip">
        {strip.map((i) => {
          const t = photos[i];
          const active = i === index;
          return (
            <li key={`${groupStart}-${i}`}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-label={`Show photo ${i + 1} of ${total}`}
                aria-current={active ? "true" : undefined}
                className={`block aspect-[3/2] w-full overflow-hidden rounded-xl bg-raise ring-offset-2 ring-offset-ink transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  active ? "ring-2 ring-marigold" : "hover:ring-2 hover:ring-white"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.thumb} alt="" decoding="async" className="h-full w-full object-cover" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          aria-controls="summit-all-photos"
          className="btn-glow inline-flex items-center gap-3 rounded-lg border border-white px-6 py-3.5 text-[16px] font-medium text-white transition-colors hover:bg-raise"
        >
          {showAll ? "Hide all photos" : `See all ${total} photos`}
          <svg
            width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            className={`transition-transform ${showAll ? "rotate-180" : ""}`}
          >
            <path d="M2 4.5l4 4 4-4" />
          </svg>
        </button>
      </div>

      {showAll && (
        <ul
          id="summit-all-photos"
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6"
        >
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-label={`Show photo ${i + 1} of ${total}: ${p.alt}`}
                className="block aspect-[3/2] w-full overflow-hidden rounded-xl bg-raise transition-shadow hover:ring-2 hover:ring-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
