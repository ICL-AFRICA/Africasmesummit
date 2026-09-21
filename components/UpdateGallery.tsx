"use client";

import { useEffect, useRef, useState } from "react";

/**
 * In-card image gallery for a SUMMIT_UPDATES entry whose `media` is a
 * `gallery` (see the type in lib/event.ts). Auto-advances through the set
 * on a slow interval — the one place on the site an image changes on its
 * own — so it stays gentle: a plain crossfade, one slow tick, and it stops
 * the moment a visitor's mouse or keyboard focus lands on the card, the
 * same pause-on-hover/focus convention as .partner-track's marquee on the
 * homepage (globals.css).
 *
 * Respects prefers-reduced-motion at the JS level, not just the CSS one:
 * a visitor who has asked for less motion gets a still first photo and
 * dots to click through by hand, rather than a faster-fading version of
 * the same auto-play. The crossfade itself still runs on a CSS transition,
 * which the sitewide reduced-motion rule in globals.css already collapses
 * to effectively instant either way.
 */
export default function UpdateGallery({
  images,
}: {
  images: readonly { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (images.length < 2 || paused || reducedMotion.current) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4200);
    return () => clearInterval(id);
  }, [images.length, paused]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          aria-hidden={i === index ? undefined : true}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
