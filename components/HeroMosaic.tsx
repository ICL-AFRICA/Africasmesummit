import { HERO_IMAGES } from "@/lib/event";

/**
 * The hero: three columns of Kenyan enterprise photography drifting past at
 * different speeds, duotoned into the indigo so the type stays legible.
 *
 * Motion decisions, in order of how much they mattered:
 *
 * 1. CSS transforms only — no JavaScript, no scroll listeners, no library.
 *    The whole animation is `translate3d` on three elements, which the
 *    compositor handles on its own thread. It cannot jank the main thread
 *    and it costs nothing in bundle size.
 *
 * 2. Slow. 60–90 seconds per cycle. Fast movement behind a headline is a
 *    legibility problem and a nausea problem; at this speed the page feels
 *    alive rather than busy, and nobody watches a loop complete.
 *
 * 3. Different speeds per column, with the middle column travelling the
 *    other way. Parallax without parallax — no scroll coupling required.
 *
 * 4. `prefers-reduced-motion` stops it dead and leaves a static mosaic.
 *    This is not optional: vestibular disorders are real and a moving
 *    background is one of the worst offenders.
 *
 * 5. Each column's list is rendered twice. The translate runs to exactly
 *    -50%, so the loop is seamless and the duplicate <img> tags reuse the
 *    same cached file — no extra bytes.
 *
 * The first four images load eagerly so the hero paints; the rest are lazy,
 * because this audience is on mobile data and the whole set is 438 KB.
 */

/* Four columns of four. Columns three and four are hidden at narrower
   breakpoints by CSS, so the strongest photography is loaded into the first
   two — those are the ones a phone will show. */
const COLUMNS = [
  { images: HERO_IMAGES.slice(0, 4),   className: "hero-drift-a" },
  { images: HERO_IMAGES.slice(4, 8),   className: "hero-drift-b" },
  { images: HERO_IMAGES.slice(8, 12),  className: "hero-drift-c" },
  { images: HERO_IMAGES.slice(12, 16), className: "hero-drift-d" },
];

export default function HeroMosaic() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-grid">
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="hero-col">
            <div className={`hero-track ${col.className}`}>
              {[0, 1].map((pass) =>
                col.images.map((src, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={`${pass}-${src}`}
                    src={src}
                    alt=""
                    width={440}
                    height={550}
                    loading={pass === 0 && i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="hero-img"
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Duotone + scrim. Two layers: colour blend ties the photography to
          the palette, gradient guarantees headline contrast regardless of
          which frame happens to be behind it. */}
      <div className="hero-tint" />
      <div className="hero-scrim" />
    </div>
  );
}
