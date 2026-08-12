import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import {
  EVENT, EARLY_BIRD_ENDS, SPEAKERS, FAQ,
  ACTIVE_TICKET, TICKET_PRICE, TICKET_PRICE_PLAIN,
} from "@/lib/event";
import "./globals.css";

/**
 * The only webfont the site actually uses.
 *
 * `next/font` downloads it at build time and serves it from our own origin,
 * so a visitor's browser never contacts Google. That is the point: the
 * previous <link> to fonts.googleapis.com sent every visitor's IP address
 * and user agent to Google on every page view, before they had interacted
 * with anything, and the privacy page could not honestly claim otherwise.
 *
 * It also fetched Fraunces and Public Sans, which nothing on the site ever
 * referenced — three families downloaded, one used. Those two are gone.
 *
 * Body and heading type is unaffected: `--font-sans` asks for Archivo, which
 * has never been loaded here, so it resolves to system-ui exactly as before.
 */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://africasmesummit.com"),
  title: `${EVENT.name} ${EVENT.year} — ${EVENT.dateShort}, Nairobi`,
  // Tier name as well as price, so the sentence stays true after the early
  // bird ends: "Early bird from KES 5,800" becomes "Standard from KES 6,800"
  // rather than advertising an expired rate. Same length as before, which
  // matters — this is the search snippet.
  description:
    `One day where Kenya's SMEs meet capital, buyers, county government and 13 universities. 30 September 2026, University of Nairobi. ${ACTIVE_TICKET.tier} from ${TICKET_PRICE}.`,
  keywords: [
    "SME conference Kenya",
    "SME summit Nairobi",
    "MSME Kenya 2026",
    "small business conference Kenya",
    "industry academia collaboration Kenya",
  ],
  openGraph: {
    title: `${EVENT.name} ${EVENT.year}`,
    description: EVENT.tagline,
    url: "https://africasmesummit.com",
    siteName: EVENT.name,
    locale: "en_KE",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${EVENT.name} ${EVENT.year}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} ${EVENT.year}`,
    description: EVENT.tagline,
    images: ["/og.jpg"],
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
  startDate: `${EVENT.dateISO}T08:00:00+03:00`,
  endDate: `${EVENT.dateISO}T17:30:00+03:00`,
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
  image: ["https://africasmesummit.com/og.jpg"],
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
    <html lang="en-KE" className={plexMono.variable}>
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
      <body>{children}</body>
    </html>
  );
}
