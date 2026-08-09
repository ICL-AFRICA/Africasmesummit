export const dynamic = "force-static";

import type { MetadataRoute } from "next";

const BASE = "https://africasmesummit.com";

/**
 * Static sitemap. Small site, so it is hand-listed rather than crawled —
 * add a route here when you add a page.
 *
 * Priorities reflect what actually sells tickets: the homepage and the
 * speakers page do the persuading, the legal page does not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`,         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/speakers`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/partner`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/exhibit`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/papers`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,  lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`,  lastModified: now, changeFrequency: "yearly",  priority: 0.1 },
  ];
}
