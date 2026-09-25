"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

/**
 * Fades and rises a section of content in once it scrolls into view —
 * "text dynamics" and "the card changes" from ICL's 25 September 2026
 * request, rolled out site-wide. One small component instead of a
 * dependency: an IntersectionObserver flips .reveal-in on once (then
 * disconnects — this is an entrance, not a toggle for a repeat visit
 * scrolling past again), and app/globals.css owns the actual motion (see
 * .reveal / .reveal-in there for why it is opacity + translateY and
 * nothing louder).
 *
 * No-JS / crawler safety: the element starts and stays fully visible
 * (.reveal alone, with no JS, never applies opacity: 0 — see the
 * <noscript> override in layout.tsx) if this component's effect never
 * runs. IntersectionObserver missing entirely (very old browsers) is
 * handled the same way, explicitly, below.
 *
 * `as` picks the wrapper tag (a <div> almost everywhere; the FAQ grid
 * needs the wrapper to itself be a grid item, which a plain div already
 * is). `delay` is a plain transitionDelay in ms, for staggering a list —
 * pass `i * 70` or similar from a .map() and each item settles a beat
 * after the last rather than all firing at once.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /* Anything else (id, aria-*, href for an `as={Link}` usage, etc.) passes
     straight through to the underlying element — Reveal only ever adds
     behaviour, it should never narrow what the wrapped tag can do. */
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return createElement(
    as,
    {
      ...rest,
      ref,
      className: `reveal${inView ? " reveal-in" : ""}${className ? ` ${className}` : ""}`,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
