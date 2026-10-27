"use client";

import { useState } from "react";
import { HERO_VIDEO } from "@/lib/event";

/**
 * The left-hand picture in the 2027 hero: the venue, in a gold-outlined
 * rounded frame, with a round play button in the middle and the venue's name
 * pinned bottom-left (ICL's mock-up, 19 October 2026). Pressing play swaps
 * the photograph for the summit's trailer (HERO_VIDEO), with controls, in
 * the same frame; there is nothing to load until then (preload="none"), so
 * the homepage no longer pulls the video on every visit.
 *
 * The trailer has no audio track (see HERO_VIDEO), so autoplay-on-click has
 * no sound surprise either way.
 */
export default function HeroFrame({
  image, imageAlt, label,
}: { image: string; imageAlt: string; label: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[16/10] lg:aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] border-[3px] border-gold bg-raise shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
      {playing ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          controls
          autoPlay
          playsInline
          preload="none"
          aria-label="Africa SME Summit trailer"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(25,21,57,0.75) 0%, rgba(25,21,57,0) 100%)" }} />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play the Africa SME Summit trailer"
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-xl transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-24 sm:w-24"
          >
            <svg width="28" height="28" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1.5l8 4.5-8 4.5z" /></svg>
          </button>
          <p className="absolute bottom-4 left-4 flex items-center gap-2 text-[16px] font-medium text-white sm:bottom-5 sm:left-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-gold"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" /></svg>
            {label}
          </p>
        </>
      )}
    </div>
  );
}
