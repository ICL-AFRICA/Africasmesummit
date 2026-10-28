import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import CursorGlow from "@/components/CursorGlow";
import Splash from "@/components/Splash";
import { EVENT, NEXT_SUMMIT, FAQ, TICKETING_OPEN, ACTIVE_TICKET, TICKET_PRICE_PLAIN, EARLY_BIRD_ENDS, SHARE_DESCRIPTION } from "@/lib/event";
import "./globals.css";

/**
 * The share card, with a cache key on the end.
 *
 * WhatsApp, LinkedIn and Facebook cache an OG image against its URL and hold
 * it for a long time. og.jpg keeps its filename when the card is rebuilt, so
 * without this those platforms would go on serving the old picture — the one
 * with the old date — and the fix would be invisible exactly where it
 * matters. The key is the summit's year and month label, so it changes if and
 * only if the thing printed on the card changes (when the real 2027 date is
 * set, NEXT_SUMMIT.label changes and the card must be rebuilt anyway).
 *
 * Rebuild the picture itself with `node scripts/build-og.mjs`.
 */
const OG_IMAGE = `/og.jpg?v=${encodeURIComponent(NEXT_SUMMIT.label.replace(/\s+/g, "-"))}`;

const NAME_YEAR = `${EVENT.name} ${NEXT_SUMMIT.year}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://africasmesummit.com"),
  // 19 October 2026: the site now speaks of the NEXT summit. The 2026 event
  // is over; its recap lives at /2026/.
  title: `${NAME_YEAR} — ${NEXT_SUMMIT.label}, ${NEXT_SUMMIT.venue}, Nairobi`,
  description:
    `${NEXT_SUMMIT.tagline} Africa SME Summit returns to ${NEXT_SUMMIT.venue}, Nairobi in ${NEXT_SUMMIT.label}. See the 2026 recap and get the 2027 date first.`,
  keywords: [
    "Africa SME Summit 2027",
    "African SME summit",
    "SME conference Africa",
    "MSME Africa 2027",
    "small business conference Africa",
    "African entrepreneurship",
    "AfCFTA small business",
    "SME summit Nairobi",
  ],
  openGraph: {
    title: NAME_YEAR,
    description: SHARE_DESCRIPTION,
    url: "https://africasmesummit.com",
    siteName: EVENT.name,
    locale: "en",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: NAME_YEAR }],
  },
  twitter: {
    card: "summary_large_image",
    title: NAME_YEAR,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  alternates: { canonical: "https://africasmesummit.com" },
};

// Event structured data. Describes the NEXT summit (2027). Only the month is
// confirmed, so startDate is the year-month "2027-03", which schema.org
// accepts as an ISO 8601 partial date. Google's event rich results want a full
// date and may skip this until a day is set — when NEXT_SUMMIT.dateConfirmed
// goes true, set the real start/end here. No performers (the 2027 programme
// does not exist yet — the 2026 speakers are not 2027 performers) and no
// offers while TICKETING_OPEN is false: the 2026 price must not be attached to
// the 2027 event.
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "BusinessEvent",
  name: NAME_YEAR,
  startDate: NEXT_SUMMIT.starts.slice(0, NEXT_SUMMIT.dateConfirmed ? 25 : 7),
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: `${EVENT.venue}, ${EVENT.venueDetail}`,
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  },
  description: `${NEXT_SUMMIT.tagline} ${NEXT_SUMMIT.purpose}`,
  organizer: {
    "@type": "Organization",
    name: EVENT.host,
    url: "https://ichooselife.global",
  },
  image: [`https://africasmesummit.com${OG_IMAGE}`],
  ...(TICKETING_OPEN
    ? {
        offers: {
          "@type": "Offer",
          price: TICKET_PRICE_PLAIN,
          priceCurrency: ACTIVE_TICKET.currency,
          url: EVENT.ticketUrl,
          availability: "https://schema.org/InStock",
          validThrough: EARLY_BIRD_ENDS.slice(0, 10),
        },
      }
    : {}),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#171442" />
        {/* Loading screen switch (components/Splash.tsx). Runs before the
            first paint: the screen is shown only if this tab has not been
            shown it yet. If sessionStorage is blocked, the screen is left
            off rather than repeated on every page. <html> carries
            suppressHydrationWarning because of the class this adds. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'try{if(!sessionStorage.getItem("icl-splash"))document.documentElement.classList.add("splash-on")}catch(e){}',
          }}
        />
        {/* Progressive-enhancement fallback for .reveal (globals.css):
            without JavaScript, components/Reveal.tsx never runs and
            .reveal-in never gets added, so this forces every .reveal
            element back to fully visible rather than leaving it at the
            base opacity: 0 forever. Added 25 September 2026 alongside
            the site-wide scroll-reveal motion system. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>
        <Splash />
        {/* One instance, sitewide — see components/CursorGlow.tsx. */}
        <CursorGlow />
        {children}
        {/* Consent, and the two trackers behind it. The <noscript> beacons
            that used to sit here are gone on purpose: they fire without
            JavaScript, and a visitor without JavaScript cannot be shown a
            consent bar or answer it. A beacon that cannot be refused is not
            compatible with asking. */}
        <Analytics />
      </body>
    </html>
  );
}
