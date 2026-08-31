"use client";

import { useEffect, useState } from "react";
import ConsentBanner from "@/components/ConsentBanner";
import MetaPixel from "@/components/MetaPixel";
import LinkedInInsight from "@/components/LinkedInInsight";
import { readConsent, subscribeConsent, type Consent } from "@/lib/consent";

/**
 * Consent, and the two trackers it gates.
 *
 * The gate is the whole point: neither tracker is rendered — so neither
 * script is requested, and no cookie is set — until someone has actually
 * accepted. Before that the site contacts nobody, which is the state it was
 * in before any of this was added.
 *
 * `undefined` is "we have not read localStorage yet" and renders nothing at
 * all. That is deliberate rather than pedantic: showing the bar for a frame
 * to somebody who decided months ago is the kind of small rudeness that makes
 * people stop trusting the bar.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(readConsent());
    return subscribeConsent(setConsent);
  }, []);

  if (consent === undefined) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <MetaPixel />
          <LinkedInInsight />
        </>
      )}
      {consent === null && <ConsentBanner />}
    </>
  );
}
