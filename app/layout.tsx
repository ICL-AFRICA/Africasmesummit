import type { Metadata } from "next";
import MetaPixel from "@/components/MetaPixel";
import {
  EVENT, EARLY_BIRD_ENDS, SPEAKERS, FAQ, ACTIVE_TICKET, TICKET_PRICE, TICKET_PRICE_PLAIN, DATE_LONG, AGENDA_START, AGENDA_END, SHARE_DESCRIPTION, META_PIXEL_ID,
} from "@/lib/event";
import "./globals.css";

/**
 * The share card, with a cache key on the end.
 *
 * WhatsApp, LinkedIn and Facebook cache an OG image against its URL and hold
 * it for a long time. og.jpg keeps its filename when the card is rebuilt, so
 * without this those platforms would go on serving the old picture — the one
 * with the old date — and the fix would be invisible exactly where it
 * matters. The key is the event date, so it changes if and only if the thing
 * printed on the card changes.
 *
 * Rebuild the picture itself with `node scripts/build-og.mjs`.
 */
const OG_IMAGE = `/og.jpg?v=${EVENT.dateISO}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://africasmesummit.com"),
  title: `${EVENT.name} ${EVENT.year} — ${EVENT.dateShort}, Nairobi`,
  // Tier name as well as price, so the sentence stays true after the early
  // bird ends: "Early bird from KES 5,800" becomes "Standard from KES 6,800"
  // rather than advertising an expired rate. Same length as before, which
  // matters — this is the search snippet.
  description:
    `One day where Kenya's SMEs meet capital, buyers, county government and 13 universities. ${DATE_LONG}, University of Nairobi. ${ACTIVE_TICKET.tier} from ${TICKET_PRICE}.`,
  keywords: [
    "SME conference Kenya",
    "SME summit Nairobi",
    "MSME Kenya 2026",
    "small business conference Kenya",
    "industry academia collaboration Kenya",
  ],
  openGraph: {
    title: `${EVENT.name} ${EVENT.year}`,
    description: SHARE_DESCRIPTION,
    url: "https://africasmesummit.com",
    siteName: EVENT.name,
    locale: "en_KE",
    type: "website",
  images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${EVENT.name} ${EVENT.year}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} ${EVENT.year}`,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  alternates: { canonical: "https://africasmesummit.com" },
};

// Event structured data — makes the summit eligible for Google's event
// results, which matters more than any on-page SEO for a dated event.
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "BusinessEvent",
  name: `${EVENT.name} ${EVENT.year}`,
  startDate: `${EVENT.dateISO}T${AGENDA_START}:00+03:00`,
  endDate: `${EVENT.dateISO}T${AGENDA_END}:00+03:00`,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: `${EVENT.venue}, ${EVENT.venueDetail}`,
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  },
  description: EVENT.tagline,
  organizer: {
    "@type": "Organization",
    name: EVENT.host,
    url: "https://ichooselife.global",
  },
  image: [`https://africasmesummit.com${OG_IMAGE}`],
  performer: SPEAKERS.map((s) => ({
    "@type": "Person",
    name: s.name.replace(/^(Ms\.|Mr\.|Dr\.|Eng\.)\s+/, ""),
    jobTitle: s.role,
    worksFor: { "@type": "Organization", name: s.org },
  })),
  offers: {
    "@type": "Offer",
    price: TICKET_PRICE_PLAIN,
    priceCurrency: ACTIVE_TICKET.currency,
    url: EVENT.ticketUrl,
    availability: "https://schema.org/InStock",
    validThrough: EARLY_BIRD_ENDS.slice(0, 10),
  },
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
    <html lang="en-KE">
      <head>
        <meta name="theme-color" content="#171442" />
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
        {children}
        <MetaPixel />
        {/* The supplied <noscript> fallback, verbatim. It is a plain <img>
            rather than next/image on purpose: it must be a real request the
            moment the markup parses, with no JavaScript involved at all. */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
