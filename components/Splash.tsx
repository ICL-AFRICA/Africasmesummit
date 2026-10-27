import SplashController from "@/components/SplashController";
import { EVENT, NEXT_SUMMIT } from "@/lib/event";

/**
 * The loading screen (19 October 2026, at ICL's request): the logo on the
 * brand's dark field, a thin progress line, and one line saying which summit
 * this is. It covers the page while the first page of a visit loads and then
 * lifts away.
 *
 * Shown ONCE PER VISIT, not on every click: the first page a visitor opens in
 * a browser tab shows it, later pages in that tab do not, and a reload in the
 * same tab does not. A script in <head> (app/layout.tsx) decides this before
 * the first paint, by adding `splash-on` to <html> only when the visitor has
 * not been shown it yet — so a returning page never flashes the screen, and a
 * visitor with JavaScript off never sees it at all. If anything goes wrong
 * after it has been shown, a CSS timer hides it after 8 seconds regardless
 * (.splash in globals.css), so it can never trap someone.
 *
 * This file is only the markup, rendered into the static HTML so it is on
 * screen from the very first paint. SplashController does the leaving.
 *
 * The line of text reads NEXT_SUMMIT, the same source as the homepage hero,
 * so it changes with them.
 */
export default function Splash() {
  return (
    <div id="splash" className="splash" role="status" aria-live="polite">
      <div className="splash-inner">
        <div className="splash-lockup">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/map-mark-tight.svg" alt="" width={96} height={96} className="splash-mark" />
          <span className="splash-name">
            AFRICA<br />
            <span className="splash-name-accent">SME</span><br />
            SUMMIT
          </span>
        </div>
        <div className="splash-track" aria-hidden="true">
          <div className="splash-bar" />
        </div>
        <p className="splash-line">
          {EVENT.name} {NEXT_SUMMIT.year} <span aria-hidden="true">&middot;</span> {NEXT_SUMMIT.label}
        </p>
        <p className="sr-only">Loading</p>
        <SplashController />
      </div>
    </div>
  );
}
