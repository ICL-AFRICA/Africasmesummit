"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Photo = { src: string; thumb: string; alt: string; fit?: "contain" };

/**
 * The picture block at the very top of /press.
 *
 * First version (19 October 2026, from ICL's sketch): a 16:9 frame in a
 * centred column with a four-photo strip under it. Reworked the same day at
 * ICL's request — "fill the entire page", with the picture selection
 * "enlarged below the main section", "sliding instead of being still", and
 * growing "when the cursor hovers above it":
 *
 *  - The frame runs edge to edge and takes the rest of the first screen
 *    (the 15rem is the top bar and header above it, plus a sliver of the
 *    rail below so there is something to scroll towards). The picture is
 *    cropped to fill, weighted towards the upper middle where faces are.
 *    The caption sits on the picture over a dark gradient.
 *  - Below it is a rail of large thumbnails that drifts sideways on its
 *    own, as a loop. It stops while the cursor or keyboard focus is on it,
 *    so a photo can be clicked without chasing it, and each thumbnail
 *    grows when hovered. Clicking one shows it in the frame and scrolls
 *    back up. The rail holds two copies of the list so the loop has no
 *    seam; the second copy is hidden from assistive tech and the tab order.
 *  - "See all" still opens every photo as a grid.
 *
 * The frame advances every few seconds by itself, pauses while the cursor or
 * focus is on it, and stops for good once a visitor picks a photo or uses an
 * arrow. Pause/Play is always on screen. Visitors who ask for reduced motion
 * get no autoplay and no drifting rail — the rail becomes a plain,
 * scrollable row.
 *
 * The one portrait photograph is shown whole over a blurred copy of itself,
 * since a full-width crop would keep a thin slice of it.
 */
export default function SummitHero({
  photos,
  eyebrow,
  heading,
}: {
  photos: readonly Photo[];
  eyebrow: string;
  heading: string;
}) {
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
    frameRef.current?.scrollIntoView({ behavior: reducedMotion.current ? "auto" : "smooth", block: "start" });
  };

  const photo = photos[index];
  const contain = photo.fit === "contain";

  const arrow =
    "absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-raise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div>
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
        className="relative h-[calc(100svh-15rem)] min-h-[24rem] w-full overflow-hidden bg-raise"
      >
        {contain && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`bg-${photo.src}`}
            src={photo.thumb}
            alt=""
            aria-hidden="true"
            className="summit-fade absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          decoding="async"
          fetchPriority={index === 0 ? "high" : undefined}
          className={`summit-fade absolute inset-0 h-full w-full ${contain ? "object-contain" : "object-cover object-[50%_30%]"}`}
        />

        {/* Darkens the lower part of the picture so the caption and the
            controls read on any photograph. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: "linear-gradient(to top, #191539 0%, rgba(25, 21, 57, 0) 100%)" }}
        />

        <button type="button" onClick={() => go(index - 1)} aria-label="Previous photo" className={`${arrow} left-4 sm:left-8`}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next photo" className={`${arrow} right-4 sm:right-8`}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
        </button>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 px-5 pb-5 sm:px-8 sm:pb-8">
          <div>
            <p className="eyebrow mb-2 text-marigold">{eyebrow}</p>
            <h2 className="h-sm text-balance text-2xl text-white sm:text-4xl">{heading}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-raise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
              </svg>
              {playing ? "Pause" : "Play"}
            </button>
            <span className="rounded-full bg-ink px-5 py-2.5 font-mono text-[16px] tabular-nums text-white" aria-live="off">
              {index + 1} / {total}
            </span>
          </div>
        </div>
      </div>

      {/* The sliding rail. Two copies of the list end to end, translated by
          exactly half its width and looped (.summit-rail in globals.css).
          Vertical padding gives a hovered thumbnail room to grow without
          being clipped by the rail's overflow. */}
      <div className="summit-rail-wrap overflow-x-hidden py-12 motion-reduce:overflow-x-auto" aria-label="Photo selection" role="region">
        <ul className="summit-rail flex w-max" style={{ ["--n" as string]: total }}>
          {[...photos, ...photos].map((p, k) => {
            const i = k % total;
            const dup = k >= total;
            const active = i === index;
            return (
              <li key={k} className={`mr-5 shrink-0 ${dup ? "summit-rail-dup" : ""}`} aria-hidden={dup || undefined}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  tabIndex={dup ? -1 : undefined}
                  aria-label={`Show photo ${i + 1} of ${total}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative block aspect-[3/2] w-[clamp(15rem,24vw,28rem)] overflow-hidden rounded-xl bg-raise transition-all duration-300 ease-out hover:z-20 hover:scale-[1.18] hover:shadow-[0_24px_40px_-12px_rgba(0,0,0,0.7)] focus-visible:z-20 focus-visible:scale-[1.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    active ? "ring-4 ring-marigold" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumb} alt="" loading={k < 6 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center px-5 pb-12 sm:px-8">
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
          className="mx-auto mb-14 grid max-w-[1600px] grid-cols-2 gap-3 px-5 sm:grid-cols-3 sm:gap-4 sm:px-8 lg:grid-cols-4 xl:grid-cols-6"
        >
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-label={`Show photo ${i + 1} of ${total}: ${p.alt}`}
                className="block aspect-[3/2] w-full overflow-hidden rounded-xl bg-raise transition-transform duration-300 hover:z-10 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
