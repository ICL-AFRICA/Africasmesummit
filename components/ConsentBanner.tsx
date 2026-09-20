"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { writeConsent } from "@/lib/consent";

/**
 * The consent bar.
 *
 * Light on purpose. It is a bar along the bottom, not a modal: nothing is
 * covered, nothing is trapped, and someone who wants to read about the summit
 * can read about the summit. A brochure site that greys itself out and
 * demands a decision before showing you anything has decided its advertising
 * matters more than its content.
 *
 * Two buttons of equal weight. Accept is ink rather than marigold — on this
 * site marigold means the ticket action, and a consent button that looks like
 * the buy button is a dark pattern by accident. Decline is an outline of the
 * same size, not a wisp of grey text; refusing should not be the harder
 * click.
 *
 * It slides up once, gently, and only after mount — the markup is not in the
 * static HTML, so nothing flashes before hydration decides whether to show it
 * at all. Reduced-motion users get it without the movement.
 */
export default function ConsentBanner() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 450);   // let the page land first
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="region"
      aria-label="Cookie choice"
      className={`fixed inset-x-0 bottom-0 z-[60] bg-paper border-t border-rule
                  transition-transform duration-500 ease-out
                  motion-reduce:transition-none
                  ${shown ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-5 flex flex-col gap-4
                      sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="text-[16px] text-ink max-w-2xl">
          We use two advertising cookies — Meta and LinkedIn — to measure whether
          our advertising reaches anyone. Nothing else, and the site works the
          same either way.{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-marigold-t transition-colors">
            What we collect
          </Link>
        </p>

        <div className="flex gap-3 flex-none">
          <button
            type="button"
            onClick={() => writeConsent("denied")}
            className="rounded-lg px-5 py-3 text-[16px] font-medium border border-rule text-ink
                       hover:border-ink transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => writeConsent("granted")}
            className="rounded-lg px-5 py-3 text-[16px] font-medium bg-ink text-white
                       hover:bg-raise transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
