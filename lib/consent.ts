"use client";

/**
 * Whether the visitor has agreed to advertising cookies.
 *
 * Three states, and the difference between two of them matters: `null` means
 * nobody has been asked yet, "denied" means they were asked and said no. Only
 * "granted" ever loads a tracker, so an unanswered banner behaves exactly
 * like a refusal until it is answered.
 *
 * Stored in localStorage rather than a cookie, because a cookie would be sent
 * to the server on every request and there is no server — and because setting
 * a cookie to record that someone refused cookies reads badly even when it is
 * technically defensible.
 */
export type Consent = "granted" | "denied";

const KEY = "asm-consent";

/** Fired on the window whenever the choice changes, so the banner, the
    trackers and the control on /privacy stay in step without a reload. */
export const CONSENT_EVENT = "asm-consent-change";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;                      // private mode, storage disabled
  }
}

export function writeConsent(v: Consent | null) {
  try {
    if (v) window.localStorage.setItem(KEY, v);
    else window.localStorage.removeItem(KEY);
  } catch {
    /* ignore — the in-memory state below still drives this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}

export function subscribeConsent(fn: (v: Consent | null) => void) {
  const onChange = (e: Event) => fn((e as CustomEvent).detail ?? null);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) fn(readConsent()); };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onStorage);   // another tab decided
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
