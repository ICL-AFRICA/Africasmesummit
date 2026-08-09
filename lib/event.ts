/**
 * Every fact about the summit lives here.
 *
 * The old ICL page drifted out of sync with the poster — three names, two
 * early-bird dates, tracks in different words. One file fixes that: change a
 * value here and it changes everywhere on the site at once.
 */

export const EVENT = {
  name: "Africa SME Summit",
  year: 2026,
  tagline: "Accelerating business growth through industry–academia collaboration",
  dateISO: "2026-09-30",
  dateLabel: "Wednesday 30 September 2026",
  dateShort: "30 Sept 2026",
  venue: "Chandaria Centre for Performing Arts",
  venueDetail: "University of Nairobi, Main Campus",
  city: "Nairobi, Kenya",
  ticketUrl: "https://tikohub.com/events/562",
  phone: ["0717 605151", "0724 255822"],
  email: "info@africasmesummit.com",
  host: "I Choose Life – Africa",
} as const;

/** Early bird closes 31 Aug 2026, 23:59 East Africa Time (UTC+3).
    This must match the printed flyer. It does. */
export const EARLY_BIRD_ENDS = "2026-08-31T23:59:00+03:00";

/** Derived label — never type the deadline anywhere else. The old ICL page
    drifted because the date lived in several places at once. */
export const EARLY_BIRD_LABEL = new Date(EARLY_BIRD_ENDS).toLocaleDateString(
  "en-GB", { day: "numeric", month: "long", timeZone: "Africa/Nairobi" }
);

/** The day the standard rate begins. */
export const STANDARD_FROM = new Date(
  new Date(EARLY_BIRD_ENDS).getTime() + 60_000
).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Nairobi" });

/**
 * Delegate tickets, matching what is actually purchasable on TikoHub.
 *
 * WARNING: there is currently no Standard Delegate Pass on the ticketing
 * page. The printed flyer promises KES 6,800 from 1 September, and the only
 * 6,800 item on TikoHub is the Papers Call ticket, which is a different
 * thing. Create the standard pass before 31 August, or the site will be
 * advertising a ticket nobody can buy.
 */
export const TICKETS = [
  {
    tier: "Early bird",
    price: "5,800",
    currency: "KES",
    note: `Until ${EARLY_BIRD_LABEL}`,
    urgent: true,
    includes: [
      "Full-day access to all six tracks",
      "Innovation Expo and gallery walk",
      "Lunch and refreshments",
      "Delegate pack and certificate",
    ],
  },
  {
    tier: "Standard",
    price: "6,800",
    currency: "KES",
    note: `From ${STANDARD_FROM}`,
    urgent: false,
    includes: [
      "Full-day access to all six tracks",
      "Innovation Expo and gallery walk",
      "Lunch and refreshments",
      "Delegate pack and certificate",
    ],
  },
  {
    tier: "Student",
    price: "2,000",
    currency: "KES",
    note: "Valid student ID required",
    urgent: false,
    includes: [
      "Full-day access to all six tracks",
      "Innovation Expo and gallery walk",
      "Lunch and refreshments",
      "Bring your student ID to registration",
    ],
  },
] as const;

/**
 * The ticket price, derived — never typed anywhere else.
 *
 * These live here rather than beside EARLY_BIRD_LABEL only because they read
 * from TICKETS, which is declared above them.
 *
 * ── Which tier is quoted, and the one thing to know about it ─────────────
 *
 * TICKET_CTA follows the deadline: early bird until EARLY_BIRD_ENDS, standard
 * after it. Quoting 5,800 on 1 September would advertise a price that has
 * expired, which is worse than any alternative here.
 *
 * BUT: this site is a static export, so the line below runs at BUILD time,
 * not in the visitor's browser. The deployed HTML carries whatever was true
 * when it was built. Passing the deadline does NOT change a page already on
 * the CDN — only a rebuild does.
 *
 * So unlike the countdown and the early-bird bar, which are client-side and
 * genuinely need nothing done on the day, THIS NEEDS A REDEPLOY ON OR AFTER
 * 1 SEPTEMBER. Any push to main does it; there is nothing to edit. Until then
 * every ticket button still reads 5,800.
 *
 * Making it client-side instead was the alternative and was rejected: it
 * would put JavaScript on ten static buttons and let the most important
 * price on the site visibly change after paint.
 */
const EARLY_BIRD_ACTIVE = Date.now() < new Date(EARLY_BIRD_ENDS).getTime();

/** The tier the site should be quoting right now. */
export const ACTIVE_TICKET = EARLY_BIRD_ACTIVE ? TICKETS[0] : TICKETS[1];

/** "KES 5,800" — the currently correct price, for prose. */
export const TICKET_PRICE = `${ACTIVE_TICKET.currency} ${ACTIVE_TICKET.price}`;

/** "5800" — digits only, for the schema.org offer. */
export const TICKET_PRICE_PLAIN = ACTIVE_TICKET.price.replace(/,/g, "");

/**
 * "Get a ticket — KES 5,800". The label on every ticket button on the site.
 *
 * One string in one place, because a landing page whose ticket button says
 * one price in the hero and another in the footer stops being believed.
 */
export const TICKET_CTA = `Get a ticket — ${TICKET_PRICE}`;

/**
 * "KES 5,800" — always the early-bird price, whatever the date.
 *
 * Separate from TICKET_PRICE on purpose: this is for copy that names the
 * early bird explicitly ("Early bird — KES 5,800"), where the standard price
 * would make the sentence contradict itself.
 */
export const EARLY_BIRD_PRICE = `${TICKETS[0].currency} ${TICKETS[0].price}`;

/**
 * Titles exactly as they appear on the printed poster.
 *
 * IMPORTANT — the `bio` lines below are drafts written only from each
 * speaker's stated role and organisation. Nothing here is researched
 * biography. Send each person their own line for approval before launch,
 * and replace with what they send back.
 */
export const SPEAKERS = [
  {
    slug: "susan-ndungu",
    name: "Ms. Susan Ndungu",
    role: "Head of SME Banking",
    org: "NCBA Bank",
    topic: "Finance, Capital & Investment",
    bio: "Susan leads SME banking at NCBA, one of the largest lenders to small and medium enterprises in Kenya. Her session covers what a bank is actually looking at when a small business applies for credit — and the parts of an application owners most often get wrong.",
  },
  {
    slug: "mike-mutungi",
    name: "Eng. Mike Mutungi",
    role: "Founder & CEO",
    org: "I Choose Life – Africa",
    topic: "Kenya Entrepreneurship Ecosystem",
    bio: "Mike founded I Choose Life – Africa, which works across health, education and enterprise for young people aged 10 to 34, and convenes this summit. He speaks on connecting classrooms, universities and industry so that what young people learn leads somewhere.",
  },
  {
    slug: "michael-maddy",
    name: "Mr. Michael Maddy",
    role: "CRO and Co-Founder",
    org: "Fleet Planner",
    topic: "Market access & Cross-border trade",
    bio: "Michael co-founded Fleet Planner and leads its revenue function. His session is on building a commercial operation that can sell beyond its home market — pricing, channels, and the decisions that make cross-border trade viable for a small team.",
  },
  {
    slug: "henry-yatich",
    name: "Dr. Henry K. Yatich",
    role: "Principal, Graduate Studies",
    org: "Mount Kenya University",
    topic: "Industry and Academia collaboration",
    bio: "Henry leads graduate studies at Mount Kenya University. He speaks on how a business puts a university research team on a live problem, what the university needs in return, and why most industry–academia partnerships fail before they start.",
  },
  {
    slug: "victor-sila",
    name: "Mr. Victor Sila",
    role: "Founder",
    org: "JuaPath",
    topic: "Adopting AI and Technology",
    bio: "Victor built JuaPath, a voice-first AI tutor now running in Kenyan secondary schools. His session is a practical read on adopting AI in a small business this year — what is worth the money, what is not, and what it takes to make any of it stick.",
  },
] as const;

export const TRACKS = [
  { n: "01", name: "Finance, Capital & Investment", line: "Where the money actually is, and what lenders need to see from you." },
  { n: "02", name: "Market access & Cross-border trade", line: "Getting your product past the county line and across the border." },
  { n: "03", name: "Talent & Human Resource acquisition with safeguarding", line: "Hiring well, and the safeguarding duties that come with it." },
  { n: "04", name: "Adopting AI and Technology", line: "What is worth adopting this year for growth and efficiency, and what is noise." },
  { n: "05", name: "Industry and Academia collaboration", line: "Putting a university research team on a problem in your business." },
  { n: "06", name: "Kenya Entrepreneurship Ecosystem strengthening", line: "The policy, the funds, and the institutions you should know by name." },
] as const;

/** Three buyers, three reasons. The old page spoke to one. */
export const PATHS = [
  {
    who: "Business owners",
    lead: "You run an SME",
    body: "Meet the person who runs SME banking at NCBA. Put a university research team on a problem in your business. Show your product to four county governments in one afternoon.",
    points: ["Capital and market access", "Research support at no cost to you", "Buyers, banks and county government in one room"],
  },
  {
    who: "Universities",
    lead: "You teach or research",
    body: "Submit a paper through the call. Place your students on live enterprise problems that count towards their qualification. Join 13 universities already in the programme.",
    points: ["Papers call and publishing", "Student placement into real businesses", "Industry partners for ongoing research"],
  },
  {
    who: "Corporates & county",
    lead: "You serve the SME sector",
    body: "This is where the businesses you are trying to reach spend the day. Exhibit, speak, or sponsor a track — and meet enterprises already screened through the ICL programme.",
    points: ["Exhibition and speaking slots", "Profile to 10,000+ across ICL platforms", "Direct access to screened enterprises"],
  },
] as const;

export const BENEFITS = [
  { t: "Publish your research", d: "Papers call open to academics and practitioners." },
  { t: "Show what you have built", d: "Innovation Expo and gallery walk for products and services." },
  { t: "Take the stage", d: "Speaking and panel opportunities across six tracks." },
  { t: "Get seen after the day", d: "Profile across ICL platforms and newsletters reaching over 10,000." },
  { t: "Meet the universities", d: "13 institutions with a combined 250,000 students." },
  { t: "Meet government", d: "Nairobi, Machakos, Laikipia and Uasin Gishu county participation." },
] as const;

/** Indicative running order — replace with the confirmed programme. */
export const AGENDA = [
  { time: "08:00", title: "Registration & morning networking", note: "Exhibition stands open" },
  { time: "09:00", title: "Opening keynote", note: "The state of Kenya's SME sector" },
  { time: "10:00", title: "Industry–academia panel", note: "How research reaches an enterprise" },
  { time: "11:00", title: "Track sessions — first round", note: "Six parallel tracks" },
  { time: "13:00", title: "Lunch & gallery walk", note: "Products on display" },
  { time: "14:00", title: "Track sessions — second round", note: "Six parallel tracks" },
  { time: "15:30", title: "Business pitch forum", note: "Enterprises meet capital" },
  { time: "17:00", title: "Closing & networking", note: "Communiqué and next steps" },
] as const;

export const FAQ = [
  { q: "Is lunch included?", a: "Yes. Every ticket includes lunch and refreshments through the day." },
  { q: "Can I send a colleague instead?", a: "Yes. Tickets are transferable up to 48 hours before the summit — send us both names on the contact page." },
  { q: "Is there parking at the University of Nairobi?", a: "Parking is available on the Main Campus. Arrive by 08:00, as spaces fill before the opening keynote." },
  { q: "Do exhibitors need a separate ticket?", a: "The exhibitor package includes two delegate passes. Additional team members need standard tickets." },
  { q: "Will I get a certificate?", a: "Yes. Certificates of participation are issued to all delegates at the close." },
  { q: "How do I submit a paper?", a: "Submit an abstract on the call for papers page — it lists the tracks and the review timeline." },
  { q: "Is there a group rate?", a: "Yes, for four or more from the same organisation. Ask on the contact page and we will send you a code." },
] as const;

export const PARTNERS = [
  "Government of Kenya",
  "Sverige",
  "University of Nairobi",
  "Sustainable World Corporation",
  "Children's Mission",
  "Access",
  "Mount Kenya University",
  "ASSEK",
  "Zetech University",
] as const;

/**
 * Placeholder photography.
 *
 * Lorem Picsum serves real Unsplash photographs from a stable, seeded URL,
 * so the layout can be reviewed with actual images rather than grey boxes.
 * Every one of these is a placeholder — replace with photography from last
 * year's conference before launch. Seeds are deterministic, so the same
 * image appears on every build and review.
 */
export const PHOTOS = {
  /* Speaker headshots are extracted from the printed flyer at 800x1000.
     They are adequate but not ideal — ask each speaker for the original
     file and drop it in with the same name for a sharper result.

     hero.jpg and floor.jpg are still placeholders. Replace with photography
     from last year's conference — same filenames, no code change needed.

     For quick Unsplash comps while you wait for the real photos, swap any
     value for a seeded Picsum URL, e.g.
       hero: "https://picsum.photos/seed/asm-hero/2000/1125"                */
  hero: "/img/hero.jpg",
  heroVideo: "",           // drop last year's edit here — <video> takes over
  speakers: [
    "/img/speaker-1.jpg",
    "/img/speaker-2.jpg",
    "/img/speaker-3.jpg",
    "/img/speaker-4.jpg",
    "/img/speaker-5.jpg",
  ],
  floor: "/img/floor.jpg",
} as const;

/** Why people actually give up a working day. Not features — reasons. */
export const REASONS = [
  { n: "01", t: "Capital", d: "The head of SME banking at NCBA is in the room, and so are the funds and guarantee schemes most owners have never been walked through." },
  { n: "02", t: "Research", d: "Thirteen universities looking for live enterprise problems. Bring yours and leave with a team on it." },
  { n: "03", t: "Buyers", d: "Four county governments participating, plus the corporates who procure from businesses this size." },
  { n: "04", t: "Proof", d: "The gallery walk puts your product in front of people who can place an order, not just admire it." },
  { n: "05", t: "The room", d: "Everyone here runs or serves a small business in Kenya. No tourists." },
] as const;

/**
 * Form endpoint.
 *
 * The site is a static export, so there is no server to receive a form POST.
 * Every form here submits to an external form service — create a form at
 * Formspree (or Tally, or Basin), paste the endpoint below, and submissions
 * land in an inbox and a dashboard.
 *
 * Until this is set, forms fall back to a mailto so nothing is ever a dead
 * end — but set it before launch. A mailto loses you roughly half of the
 * people who would otherwise have filled the form in.
 */
export const FORM_ENDPOINT = "https://formspree.io/f/xeajeyqa";

/**
 * Sponsorship packages. Names and prices come from the live TikoHub listing
 * and are correct.
 *
 * The `includes` bullets are DRAFTS — written to be plausible, not taken
 * from a rate card. Confirm every line with Mike before launch: a sponsor
 * paying KES 1,000,000 on the strength of this list will expect all of it.
 */
export const SPONSOR_TIERS = [
  {
    tier: "Platinum", price: "1,000,000", currency: "KES",
    limit: "One available", featured: true,
    includes: [
      "Named alongside the summit on all materials",
      "Opening address from your leadership",
      "Premium exhibition booth",
      "Ten delegate passes",
      "Logo on stage, badges and the delegate pack",
      "Profile across ICL platforms reaching 10,000+",
    ],
  },
  {
    tier: "Gold", price: "500,000", currency: "KES",
    limit: "Limited", featured: false,
    includes: [
      "Your name on one of the six tracks",
      "Chair or co-chair that track's sessions",
      "Exhibition booth",
      "Six delegate passes",
      "Logo on the programme and the website",
    ],
  },
  {
    tier: "Silver", price: "250,000", currency: "KES",
    limit: "Open", featured: false,
    includes: [
      "Panel or speaking slot",
      "Exhibition booth",
      "Four delegate passes",
      "Logo on the programme and the website",
    ],
  },
  {
    tier: "Bronze", price: "125,000", currency: "KES",
    limit: "Open", featured: false,
    includes: [
      "Logo on the website and the delegate pack",
      "Two delegate passes",
      "Materials in the delegate bag",
      "Named in the post-summit report",
    ],
  },
] as const;

/** Exhibition booths, priced as listed on TikoHub. */
export const STAND_OPTIONS = [
  {
    name: "Startup Exhibition Booth", price: "30,000", currency: "KES",
    who: "For small and growing businesses",
    includes: [
      "Booth for the full day",
      "Your products on the lunchtime gallery walk",
      "Two delegate passes",
      "Listed in the delegate pack",
    ],
  },
  {
    name: "Corporate Exhibition Booth", price: "50,000", currency: "KES",
    who: "For established companies and institutions",
    includes: [
      "Larger booth on the main circulation route",
      "Your products on the lunchtime gallery walk",
      "Four delegate passes",
      "Listed in the delegate pack and on the website",
    ],
  },
] as const;

/** The papers call has its own ticket on TikoHub. */
export const PAPERS_TICKET = { price: "6,800", currency: "KES" } as const;


/** Hero mosaic photography — East African enterprises at work.
    Order matters: the first two of each column load eagerly. */
export const HERO_IMAGES = [
  "/img/hero/basket-weaver.webp",
  "/img/hero/shopkeeper.webp",
  "/img/hero/tailor.webp",
  "/img/hero/juice-bar.webp",
  "/img/hero/belt-seller.webp",
  "/img/hero/grocer.webp",
  "/img/hero/produce-stall.webp",
  "/img/hero/boda-delivery.webp",
  "/img/hero/denim-brand.webp",
  "/img/hero/tea-pickers.webp",
  "/img/hero/beadwork.webp",
  "/img/hero/photographer.webp",
  "/img/hero/market-stall.webp",
  "/img/hero/nairobi-street.webp",
  "/img/hero/studio.webp",
  "/img/hero/fruit-seller.webp",
] as const;
