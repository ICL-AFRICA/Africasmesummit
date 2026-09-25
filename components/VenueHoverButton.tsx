"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * The homepage header's venue mention. Two joined pill segments —
 * "Venue" (with Emara Ole Sereni's own roundel) and "Ole Sereni" — read
 * together as a labelled field, replacing the old plain-text "Ole Sereni,
 * Mombasa Road" (Mombasa Road dropped 25 September 2026 at ICL's request,
 * once "Venue" made the label explicit and the road name redundant).
 *
 * Two independent hover behaviours, both ICL's request:
 *
 * 1. Hovering (or focusing) anywhere in the group lifts a small
 *    crossfading photo strip above it, cycling through a handful of Ole
 *    Sereni photos; clicking the "Ole Sereni" segment (the only part that
 *    is actually a link) goes to the full venue gallery on /press. This
 *    is unchanged from the 24 September version — see the photo-mounting
 *    comment below.
 *
 * 2. Hovering specifically the "Venue" segment swaps the pair's fill:
 *    "Venue" goes white→gold and "Ole Sereni" goes gold→white, together,
 *    with a smooth colour transition — pure CSS via :has() (see
 *    .venue-seg-venue in globals.css), the same mechanism .ticket-card's
 *    hover-glow already uses elsewhere on the site. "Venue" itself never
 *    navigates anywhere; it is a label, not a link, so this is mouse/
 *    keyboard-hover-only by design, same as .venue-float and .keynote-frame
 *    elsewhere on the site (see their own comments on why touch devices
 *    don't get a hover-only affordance).
 *
 * Deliberately scoped to just this one homepage instance, not every
 * EVENT.venue mention sitewide — see .venue-float in globals.css, which
 * still handles the other five (they sit mid-sentence in paragraph copy on
 * /contact, /tracks, /speakers, /not-found and /press's own closing CTA).
 */
export default function VenueHoverButton({
  images,
  href,
  label,
  logoSrc,
}: {
  images: readonly { src: string; alt: string }[];
  href: string;
  label: string;
  logoSrc: string;
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
      className="venue-toggle inline-flex"
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

      <span className="venue-toggle-pill">
        {/* Label, not a link — see doc comment above for why this segment
            has no keyboard/touch equivalent for its colour-swap hover. */}
        <span className="venue-seg venue-seg-venue">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" className="venue-seg-logo" />
          Venue
        </span>
        <Link href={href} className="venue-seg venue-seg-name">
          {label}
        </Link>
      </span>
    </span>
  );
}
