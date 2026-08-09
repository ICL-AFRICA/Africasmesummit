import type { Metadata } from "next";
import { EVENT, EARLY_BIRD_ENDS, SPEAKERS, FAQ } from "@/lib/event";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://africasmesummit.com"),
  title: `${EVENT.name} ${EVENT.year} — ${EVENT.dateShort}, Nairobi`,
  description:
    "One day where Kenya's SMEs meet capital, buyers, county government and 13 universities. 30 September 2026, University of Nairobi. Early bird from KES 5,800.",
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
    price: "5800",
    priceCurrency: "KES",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
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
