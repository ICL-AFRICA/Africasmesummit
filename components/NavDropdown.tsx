"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

/**
 * A desktop nav item that opens a small menu of links beneath it. Added 13
 * October 2026 for "Jiinue Accelerator", whose four sections (Faculty,
 * Sessions, Graduants, Africa SMEs Award Winners) are jump links down the one
 * /accelerator page — see ACCELERATOR_SECTIONS in lib/event.ts.
 *
 * The label stays a real link to the page itself, so clicking it still goes
 * there; the chevron beside it is its own button that toggles the menu, which
 * is what a keyboard or screen-reader user operates (aria-expanded +
 * aria-controls). Hover opens it too, Escape closes it and returns focus to
 * the chevron, and so does clicking elsewhere or tabbing out. The panel sits
 * inside the wrapper (with a transparent top pad rather than a gap), so the
 * pointer can travel from the label to the menu without it closing.
 *
 * Desktop only — SiteHeader renders it inside the nav that is hidden below
 * min-[1660px]. The hamburger panel (components/MobileNav.tsx) lists the same
 * links flat instead of using this.
 *
 * Kept as its own client component so SiteHeader stays a server component.
 */
type Item = { label: string; href: string };

export default function NavDropdown({
  label, href, items, active, tone: mode = "light",
}: {
  label: string; href: string; items: readonly Item[]; active: boolean;
  /** "glass": white text and a dark glass menu, for the homepage's floating
   *  panel (components/GlassNav.tsx). */
  tone?: "light" | "glass";
}) {
  const glass = mode === "glass";
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const tone = glass ? "text-white" : active ? "text-ink" : "text-ink/60 hover:text-ink";

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className="flex items-center gap-1.5">
        <Link href={href} className={`whitespace-nowrap transition-colors ${tone} ${glass ? "glass-link rounded-lg px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" + (active ? " is-active" : "") : ""}`}>
          {label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${label} sections`}
          onClick={() => setOpen((o) => !o)}
          className={`inline-flex h-6 w-6 items-center justify-center transition-colors ${tone} ${glass ? "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" : ""}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"
               stroke="currentColor" strokeWidth="1.5"
               className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M2 4.5l4 4 4-4" />
          </svg>
        </button>
      </div>

      {open && (
        <div id={panelId} className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <ul className={glass ? "glass-menu min-w-[280px] py-2" : "min-w-[280px] rounded-xl border border-rule bg-white py-2 shadow-lg"}>
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={`block whitespace-nowrap px-5 py-3 text-[16px] transition-colors ${glass ? "text-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none" : "text-ink hover:bg-paper"}`}
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
