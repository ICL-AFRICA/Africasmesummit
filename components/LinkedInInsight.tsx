"use client";

import Script from "next/script";
import { LINKEDIN_PARTNER_ID } from "@/lib/event";

/**
 * LinkedIn Insight Tag.
 *
 * Renders nothing until LINKEDIN_PARTNER_ID is set, so this file can sit in
 * the tree with the tag switched off.
 *
 * UNLIKE THE META PIXEL, THIS DOES NOT RE-FIRE ON ROUTE CHANGE, and that is
 * deliberate. Meta documents `fbq('track', 'PageView')` as the way to report
 * a view, so MetaPixel calls it on every in-site navigation. LinkedIn
 * publishes no equivalent: `lintrk` takes conversions, not page views, and
 * re-pushing the partner id on navigation is not a documented API. Inventing
 * one would be guessing at another company's runtime and could double-count
 * or corrupt the audience it builds.
 *
 * The consequence is real and worth knowing before reading the numbers:
 * internal links use next/link, so LinkedIn sees the page someone LANDS on
 * and nothing after it. Retargeting audiences and landing-page reporting work
 * as expected; per-page journeys through the site do not. If that matters,
 * the honest fix is LinkedIn conversion events on specific actions, not a
 * synthetic page view.
 */
export default function LinkedInInsight() {
  if (!LINKEDIN_PARTNER_ID) return null;

  return (
    <>
      <Script id="linkedin-partner-id" strategy="afterInteractive">
        {`_linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
      </Script>
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`}
      </Script>
    </>
  );
}
