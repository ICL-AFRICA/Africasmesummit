"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Btn from "@/components/Btn";
import { EVENT, TICKET_CTA } from "@/lib/event";

/**
 * Navigation below min-[1560px] (a bespoke Tailwind breakpoint) — was below
 * 1024px (lg) until 3 October 2026, when "Speakers" and "Providers" were
 * relabelled to the much longer "Speakers & Panelists" and "Service
 * Provider" and the full nine-item row no longer fit at 1024 even after
 * tightening its gaps and padding as far as they reasonably go (see the
 * long comment on NAV and the `<nav>` element in components/SiteHeader.tsx
 * for the actual measurements). xl (1280px) was tried next and was also
 * too narrow once spacing was restored to its normal, generous values —
 * measured at ~115px of real overflow in a real build, not a near miss.
 * Force-rendering the nav at full width and measuring against the header
 * across a range of viewports put the true minimum at ~1400px, so
 * min-[1440px] was picked as the nearest round number clear of that floor
 * (~32px to spare).
 *
 * Moved again 5 October 2026, when "Accelerator" (/accelerator) was added
 * as a tenth nav item: the same re-measure (required on every add, not
 * assumed) showed the homepage's natural zero-overflow point had moved
 * out to ~1518px. 2xl (1536px) was tried and measured too tight against
 * that new floor — only ~18px of margin. min-[1560px] was picked as the
 * next round number clear of it, restoring this row's usual ~32px buffer
 * on both the homepage and an interior page. See the fuller measurement
 * history in components/SiteHeader.tsx.
 *
 * Both instances below were updated to `min-[1560px]:hidden` to match
 * SiteHeader's `hidden min-[1560px]:flex`, so the two stay in lockstep —
 * a screen shows either this hamburger or that full row, never both or
 * neither.
 *
 * The bar itself only gains a hamburger — the ticket button stays visible
 * beside it at every width. Someone who arrived ready to buy should never
 * have to open a menu to find the thing they came for.
 *
 * Kept out of SiteHeader so the header stays a server component: the panel
 * is the only part that needs JavaScript, and it is the only part that
 * ships any.
 */
type NavItem = { label: string; href: string };

const PANEL_ID = "mobile-nav-panel";

export default function MobileNav({
  nav, current = "",
}: {
  nav: readonly NavItem[]; current?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollY = useRef(0);

  /* Focus returns to the hamburger synchronously, which runs before React
     unmounts the panel and before the scroll lock is released below — so the
     page is still pinned and the focus call cannot move it. `preventScroll`
     states that intent rather than relying on it: the header sits at the top
     of the document, so if the lock strategy ever changes, focusing it from
     further down the page would drag the page up under the reader. */
  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  /* Scroll lock. `overflow: hidden` on body is ignored by iOS Safari, so the
     page is pinned with `position: fixed` instead — which discards the scroll
     offset, hence restoring it by hand on the way out. `behavior: instant`
     because html has `scroll-behavior: smooth`, and without it the page
     visibly scrolls back to where you were after closing. */
  useEffect(() => {
    if (!open) return;
    scrollY.current = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY.current}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo({ top: scrollY.current, behavior: "instant" });
    };
  }, [open]);

  /* Focus moves into the panel on open, is trapped while it is open, and
     returns to the hamburger on close (see `close`). Without the trap, Tab
     walks out of the panel and into the page behind it, which for a screen
     reader user means silently browsing a page they cannot see. */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );

    focusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active !== null && panel.contains(active);
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        className="min-[1560px]:hidden inline-flex items-center justify-center h-11 w-11 flex-none text-ink"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"
             fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div
          id={PANEL_ID}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="nav-panel min-[1560px]:hidden fixed inset-0 z-[60] h-[100dvh] bg-paper flex flex-col"
        >
          <div className="flex-none flex items-center justify-between border-b border-rule px-5 sm:px-8 py-4 sm:py-5">
            <span className="eyebrow text-ink">Menu</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex items-center justify-center h-11 w-11 -mr-2 text-ink"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"
                   fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 sm:px-8">
            <ul>
              {nav.map((n) => (
                <li key={n.href} className="border-b border-rule">
                  {/* Current page is weight, not opacity — faded type is how
                      hierarchy is usually built and it reads as disabled. */}
                  <Link
                    href={n.href}
                    onClick={close}
                    aria-current={current === n.href ? "page" : undefined}
                    className={`flex items-center min-h-[64px] text-[22px] text-ink ${
                      current === n.href ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-none border-t border-rule px-5 sm:px-8 py-6">
            <Btn href={EVENT.ticketUrl} tone="gold" className="w-full justify-center">
              {TICKET_CTA}
            </Btn>
          </div>
        </div>
      )}
    </>
  );
}
