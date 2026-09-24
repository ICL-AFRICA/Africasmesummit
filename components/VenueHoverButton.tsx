"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * The homepage header's venue mention, enclosed as an orange (gold) pill
 * button that also gives a peek at the venue: hover or focus it and a
 * small crossfading photo strip lifts into view above the button, cycling
 * through a handful of Ole Sereni photos; click (or tap) it and you land on
 * the full venue gallery on /press. Added 24 September 2026 at ICL's
 * request.
 *
 * Deliberately scoped to just this one homepage instance, not every
 * EVENT.venue mention sitewide — see .venue-float in globals.css, which
 * still handles the other five (they sit mid-sentence in paragraph copy on
 * /contact, /tracks, /speakers, /not-found and /press's own closing CTA;
 * turning those into photo-preview buttons too would read as interruption
 * rather than a feature).
 *
 * Coloured with Btn's own `gold` tone (bg-gold/text-ink — the site's one
 * orange) rather than routed through Btn itself: Btn's padding, arrow and
 * btn-glow pulse are tuned for a primary call to action, and this sits
 * inline in a thin one-line header bar next to the date, not a hero.
 * .venue-btn (globals.css) supplies only the pill shape and the
 * lift-and-shadow hover state.
 *
 * The photo stack is not mounted until the first hover/focus, so a visitor
 * who never interacts with the button never downloads it — the homepage
 * hero doesn't pay for a preview nobody asked to see. Touch devices skip
 * the preview entirely and go straight to a tap-to-navigate click, since
 * there is no hover state to preview from.
 */
export default function VenueHoverButton({
  images,
  href,
  label,
}: {
  images: readonly { src: string; alt: string }[];
  href: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (hovered) setLoaded(true);
  }, [hovered]);

  useEffect(() => {
    if (!hovered || !loaded || images.length < 2 || reducedMotion.current) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1100);
    return () => clearInterval(id);
  }, [hovered, loaded, images.length]);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {loaded && (
        <span
          className={`venue-preview ${hovered ? "venue-preview-visible" : ""}`}
          aria-hidden="true"
        >
          {images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt=""
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </span>
      )}
      <Link href={href} className="venue-btn bg-gold text-ink font-semibold">
        {label}
      </Link>
    </span>
  );
}
