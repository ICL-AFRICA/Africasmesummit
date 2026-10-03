import { HERO_VIDEO } from "@/lib/event";

/**
 * The hero: the summit's own trailer footage, muted and looping behind the
 * headline — replacing HeroMosaic's drifting photo grid as the homepage's
 * hero visual, 3 October 2026, at ICL's (boss's) explicit request. See the
 * doc comment on HERO_VIDEO in lib/event.ts for why this exists and how the
 * asset was prepared; HeroMosaic.tsx is untouched and still fully wired, so
 * reverting to the photo mosaic is a one-line import swap in app/page.tsx.
 *
 * Decisions, in order of how much they mattered:
 *
 * 1. muted + autoPlay + loop + playsInline is the one combination every
 *    mobile and desktop browser will actually autoplay without a tap. No
 *    `controls` — this is a background, not a player; there is nothing for
 *    a visitor to pause, scrub or unmute, same as HeroMosaic was never
 *    something you could "pause" either.
 *
 * 2. The file itself has no audio track (stripped at the source, see
 *    HERO_VIDEO's comment) — belt and braces alongside `muted`, since "no
 *    audio" was the explicit request, not just "start silent."
 *
 * 3. `preload="auto"`: this is the first thing a visitor sees, same as
 *    HeroMosaic's first images loading eagerly — no lazy/none treatment
 *    here, unlike a secondary video further down a page.
 *
 * 4. `prefers-reduced-motion` stops it completely, same vestibular-safety
 *    rule HeroMosaic enforced for its drifting columns (arguably more
 *    important for 47 seconds of real footage than a slow photo drift).
 *    Done in pure CSS, no JavaScript: both the <video> and a static <img>
 *    of its poster frame are always in the DOM, and `.hero-video` /
 *    `.hero-video-poster` in globals.css show exactly one of them depending
 *    on the media query — nothing here ever calls `.pause()`.
 *
 * `object-cover` plus the same `.hero-tint` / `.hero-scrim` overlays
 * HeroMosaic used underneath the headline, unchanged — those two layers
 * don't care what kind of pixels are beneath them.
 */
export default function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO.src}
        poster={HERO_VIDEO.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Reduced-motion fallback — a still frame, shown only when the video
          above is hidden by the media query in globals.css. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-video-poster absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO.poster}
        alt=""
      />
      <div className="hero-tint" />
      <div className="hero-scrim" />
    </div>
  );
}
