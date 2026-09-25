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
 *
 * `caption` (added 21 September 2026, at ICL's request, for the keynote
 * lineup card) is optional per image — a gallery of plain event photos
 * doesn't need one. When present it crossfades in lockstep with its image,
 * same duration and easing, as a bottom scrim bar rather than a fixed-height
 * strip, so a two-line caption doesn't clip.
 *
 * `showCaptions` (added 24 September 2026, at ICL's request) turns that
 * bar off entirely, image data and all — for the keynote lineup card,
 * once its frame shrank to a minimised, .keynote-frame-sized thumbnail
 * on /press, a name crossfading in tiny text over a small face read as
 * clutter rather than identification (the card's own title and body copy
 * already say who is confirmed). Defaults to true so any other gallery
 * that does supply captions keeps showing them at full card size.
 *
 * `fit` (added 25 September 2026, at ICL's request) mirrors the
 * single-image escape hatch in lib/event.ts / app/press/page.tsx.
 * Defaults to "cover", which fills the card's frame and crops — fine for
 * photos shot to roughly match it. "contain" letterboxes every image in
 * the set uncropped instead, for a gallery whose photos are a different
 * aspect ratio than the frame, like the landscape Zetech MoU photos.
 */
export default function UpdateGallery({
  images,
  showCaptions = true,
  fit = "cover",
}: {
  images: readonly { src: string; alt: string; caption?: string }[];
  showCaptions?: boolean;
  fit?: "cover" | "contain";
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
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            fit === "contain" ? "object-contain" : "object-cover"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Captions live in their own absolutely-positioned, crossfading layer
          — one per image, same i === index opacity toggle as the photos —
          so the name under the portrait changes exactly as the portrait
          does, never a beat ahead or behind. Sits above the images but
          below the dots (z-10), with enough top padding on the gradient
          for the fade to read as a scrim rather than a hard bar. */}
      {showCaptions && images.some((img) => img.caption) && (
        <div className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none">
          {images.map((img, i) =>
            img.caption ? (
              <p
                key={img.src}
                className={`absolute inset-x-0 bottom-0 px-4 pb-8 pt-10 text-[14px] sm:text-[15px] font-medium text-white
                            bg-gradient-to-t from-ink/90 via-ink/50 to-transparent
                            transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {img.caption}
              </p>
            ) : null
          )}
        </div>
      )}

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
