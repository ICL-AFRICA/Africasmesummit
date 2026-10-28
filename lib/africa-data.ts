/**
 * The figures the homepage quotes about African business — and where each
 * one comes from.
 *
 * WHY THIS FILE EXISTS (28 October 2026). The summit's theme for 2027 is
 * Africa, and the homepage opens on numbers. A number on a website goes stale
 * silently: nothing tells anyone it is three years old. So every figure lives
 * here, once, WITH its source, link, publication date and the date someone last
 * checked it. The homepage reads from this file and prints the source under
 * every number; nothing about these figures is typed into a page.
 *
 * HOW TO UPDATE A FIGURE (about two minutes):
 *   1. Find the newer figure from a primary source (IFC, World Bank, AfDB,
 *      ILO, the AfCFTA Secretariat, a national statistics office). Not a
 *      news story quoting it, where the primary source can be found.
 *   2. Edit that entry below: `value`, `label`, `scope` (be exact — "Africa"
 *      and "Sub-Saharan Africa" are different), `source`, `url`,
 *      `publishedOn` (the date of the publication, yyyy-mm-dd) and
 *      `checkedOn` (today).
 *   3. Run   node scripts/check-figures.mjs   — it lists every figure with its
 *      age and flags any that are over two years old or not re-checked for 12
 *      months. Run it before each release and whenever the summit date or
 *      programme is announced.
 *   4. `npm run build`, look at the homepage, commit.
 * To add a figure, add an entry and put its id in HOME_FIGURES. To remove
 * one, take its id out of HOME_FIGURES. To change the headline, point
 * HEADLINE at another id.
 *
 * WHAT NOT TO DO: do not round up, do not widen the scope ("Sub-Saharan
 * Africa" must not become "Africa"), do not drop the year. If a source gives
 * no data year, `publishedOn` is the year shown.
 *
 * STATE OF THE FIGURES ON 28 OCTOBER 2026 — read this before relying on them.
 * The three oldest are from 2018 and are the most recent that could be
 * verified to a primary page that day; they are exactly the kind that should be
 * replaced the moment a newer release is found (the IFC publishes MSME finance
 * gap estimates; the ILO publishes a new informality edition). The AfCFTA
 * numbers are the African Union Secretariat's, as reported in August 2026 —
 * replace with the AfCFTA Secretariat's own page when it can be cited.
 */
export type Figure = {
  id: string;
  /** What is printed large: "44 million+". */
  value: string;
  /** What it counts, as a phrase that follows the value. */
  label: string;
  /** The geography it covers, exactly as the source states it. */
  scope: string;
  /** Who published it. */
  source: string;
  /** The page it was read on. */
  url: string;
  /** yyyy-mm-dd of the publication. */
  publishedOn: string;
  /** yyyy-mm-dd the figure was last checked against the source. */
  checkedOn: string;
  note?: string;
};

export const AFRICA_FIGURES: readonly Figure[] = [
  {
    id: "msmes",
    value: "44 million+",
    label: "formal small and medium businesses",
    scope: "Sub-Saharan Africa",
    source: "IFC / SME Finance Forum",
    url: "https://findevgateway.org/news/ifc-sme-finance-forum-target-solutions-africas-usd-331-billion-sme-finance-gap",
    publishedOn: "2018-05-16",
    checkedOn: "2026-10-28",
    note: "Source says \"at least 44 million formal MSMEs\"; 51% of them need more finance than they can access.",
  },
  {
    id: "finance-gap",
    value: "USD 331 billion",
    label: "of SME financing demand not being met",
    scope: "Africa",
    source: "IFC / SME Finance Forum",
    url: "https://findevgateway.org/news/ifc-sme-finance-forum-target-solutions-africas-usd-331-billion-sme-finance-gap",
    publishedOn: "2018-05-16",
    checkedOn: "2026-10-28",
    note: "Source wording: entrepreneurs are \"hungry for USD 331 billion in new funding across Africa\".",
  },
  {
    id: "afcfta",
    value: "1.4 billion",
    label: "people in one continental market, with a combined GDP of about USD 3.4 trillion",
    scope: "African Continental Free Trade Area",
    source: "African Union Secretariat, as reported by ThisDay",
    url: "https://www.thisdaylive.com/2026/08/05/afcfta-can-rescue-1-4bn-africans-from-economic-fragmentation/",
    publishedOn: "2026-08-05",
    checkedOn: "2026-10-28",
    note: "Secondary report of an AU figure; replace with the AfCFTA Secretariat's own page when it can be cited.",
  },
  {
    id: "informal",
    value: "85.8%",
    label: "of employment is informal — most of Africa's work is done by small, unregistered businesses",
    scope: "Africa",
    source: "ILO, Women and men in the informal economy (3rd ed.)",
    url: "https://www.ilo.org/resource/news/more-60-cent-worlds-employed-population-are-informal-economy",
    publishedOn: "2018-04-30",
    checkedOn: "2026-10-28",
  },
  {
    id: "kenya-msmes",
    value: "7.41 million",
    label: "micro, small and medium enterprises (1.56 million licensed, 5.85 million unlicensed)",
    scope: "Kenya, the host country",
    source: "Kenya National Bureau of Statistics, 2016 MSME Survey (reference year 2015)",
    url: "https://www.knbs.or.ke/2016-micro-small-and-medium-enterprises-msme-survey-basic-report-2/",
    publishedOn: "2016-12-31",
    checkedOn: "2026-10-28",
    note: "Still the most recent nationally representative count as far as could be found; publishedOn is the survey year, not an exact date.",
  },
] as const;

/** The figure the homepage headline uses. */
export const HEADLINE = "msmes";
/** The figures shown in the strip under it, in this order. */
export const HOME_FIGURES = ["msmes", "finance-gap", "afcfta", "informal"] as const;
/** The host-country figure, shown as one labelled line, never in the headline. */
export const HOST_FIGURE = "kenya-msmes";

export const figure = (id: string): Figure => {
  const f = AFRICA_FIGURES.find((x) => x.id === id);
  if (!f) throw new Error(`africa-data: no figure with id "${id}"`);
  return f;
};

/** "IFC / SME Finance Forum · 2018" — the line printed under a number. */
export const figureCredit = (f: Figure) => `${f.source} · ${f.publishedOn.slice(0, 4)}`;
