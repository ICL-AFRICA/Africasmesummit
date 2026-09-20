"use client";

import { useEffect, useState } from "react";
import { readConsent, writeConsent, subscribeConsent, type Consent } from "@/lib/consent";

/**
 * The current choice, and a way to change it, on /privacy.
 *
 * A consent bar you cannot revisit is a nag, not a choice — someone who
 * accepts on a phone at a bus stop has no route back. This states what is
 * set and offers the opposite, in one control, on the page that explains what
 * the cookies do.
 */
export default function ConsentChoice() {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(readConsent());
    return subscribeConsent(setConsent);
  }, []);

  if (consent === undefined) return null;   // not read yet — say nothing

  const line =
    consent === "granted"
      ? "You accepted advertising cookies on this device."
      : consent === "denied"
        ? "You declined advertising cookies on this device. None are loaded."
        : "You have not been asked yet on this device.";

  return (
    <div className="mt-10 border-t border-line pt-8">
      <p className="eyebrow text-white mb-3">Your choice</p>
      <p className="lede text-[17px] text-white max-w-2xl">{line}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {consent !== "granted" && (
          <button
            type="button"
            onClick={() => writeConsent("granted")}
            className="rounded-lg px-5 py-3 text-[16px] font-medium border border-line text-white
                       hover:border-marigold hover:text-marigold transition-colors"
          >
            Accept advertising cookies
          </button>
        )}
        {consent !== "denied" && (
          <button
            type="button"
            onClick={() => writeConsent("denied")}
            className="rounded-lg px-5 py-3 text-[16px] font-medium border border-line text-white
                       hover:border-marigold hover:text-marigold transition-colors"
          >
            Decline advertising cookies
          </button>
        )}
      </div>
      {consent === "granted" && (
        <p className="mt-4 text-[16px] font-light text-white max-w-2xl">
          Declining stops them loading from your next page view. Cookies already
          set are removed through your browser's settings, not from here.
        </p>
      )}
    </div>
  );
}
