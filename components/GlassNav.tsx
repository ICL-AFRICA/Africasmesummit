"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavDropdown from "@/components/NavDropdown";

/**
 * The homepage's navigation (27 October 2026, ICL's "cinematic" refinement):
 * no bar, no logo — a small floating panel of translucent navy glass at the
 * top (centred on desktop, top right on phones and tablets), over the hero video, which therefore starts at the very top of
 * the page.
 *
 * The links ARE the hamburger's pages — same labels, same routes, same
 * hierarchy (the list comes from NAV in SiteHeader.tsx, which also feeds the
 * menu). Nothing is renamed or invented. Three of the ten
 * (SECONDARY below) drop out of the row below 1280px so the panel stays
 * compact; they are always in the hamburger, which carries every page and the
 * accelerator's sections at every width. Below 1024px only the hamburger shows.
 *
 * The glass itself is CSS (.glass-panel in globals.css): relatively
 * transparent at rest, firmer and more blurred on hover or keyboard focus, and
 * firmer again once the page has scrolled past the hero (so it stays legible
 * over the pale sections). Touch screens get a firmer resting state because
 * they have no hover. The panel is position:fixed and out of the page's
 * flow, so there is no strip behind it.
 */
type Link_ = { label: string; href: string };
type Entry = Link_ & { children?: readonly Link_[] };

/* Collapsed into the hamburger below xl. */
const SECONDARY = new Set(["/providers", "/papers", "/2026"]);

export default function GlassNav({ nav, current = "", solid: alwaysSolid = false }: {
  nav: readonly Entry[]; current?: string;
  /** Hold the firmer glass from the first pixel (every page but the homepage). */
  solid?: boolean;
}) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex justify-end px-4 pt-4 sm:px-6 sm:pt-5 lg:justify-center lg:px-10 lg:pt-6">
        <div className="glass-panel pointer-events-auto" data-solid={solid || alwaysSolid ? "true" : undefined}>
          <nav aria-label="Main" className="hidden items-center gap-1 pl-3 pr-1 text-[16px] font-medium lg:flex 2xl:gap-3">
            {nav.map((n) => {
              const active = current === n.href;
              const wrap = SECONDARY.has(n.href) ? "hidden xl:block" : "";
              return (
                <div key={n.href} className={wrap}>
                  {n.children ? (
                    <NavDropdown label={n.label} href={n.href} items={n.children} active={active} tone="glass" />
                  ) : (
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`glass-link block whitespace-nowrap rounded-lg px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${active ? "is-active" : ""}`}
                    >
                      {n.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-white/30 lg:block" />
          <MobileNav nav={nav} current={current} always tone="glass" />
        </div>
      </div>
    </header>
  );
}
