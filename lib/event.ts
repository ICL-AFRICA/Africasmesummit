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
  /* TWO SETS OF CONTACT DETAILS, ON PURPOSE. Do not collapse them.

     `conferenceEmail` / `conferencePhone` are the summit team's own line,
     on the convening organisation's live domain. They are what the footer
     and the contact page publish, because they reach a real inbox today.

     `email` / `phone` are the original site-wide details. `email` is still
     a PLACEHOLDER — see SETUP.md step 7, it has to be created before
     launch — and it is what the enquiry form falls back to, and what the
     exhibit, partner and privacy pages print. Changing the form's fallback
     is a separate decision from changing what the footer advertises, which
     is why these did not get merged. */
  conferenceEmail: "conference@ichooselife.or.ke",
  conferencePhone: "0724 255822",

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
 * `bio` is an array of paragraphs, not a string. Five of the seven are
 * supplied biographies that run to two and three paragraphs, and joining
 * them into one block would run twelve lines without a break.
 *
 * IMPORTANT — two bios are still drafts. Susan Ndungu and Henry Yatich were
 * written only from a stated role and organisation; nothing in them is
 * researched biography and neither may be presented as fact about a named
 * individual. They are marked `draft: true` below. Send each person their
 * own line for approval before launch and replace it with what comes back.
 *
 * The other five came from the speakers themselves via
 * `Marketing/speaker-bios-cleaned.md` and are reproduced verbatim — do not
 * copy-edit someone's approved biography, including the American spellings,
 * without asking them first.
 */
export const SPEAKERS = [
  {
    slug: "susan-ndungu",
    name: "Ms. Susan Ndungu",
    role: "Head of SME Banking",
    org: "NCBA Bank",
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: [
      "Susan leads SME banking at NCBA, one of the largest lenders to small and medium enterprises in Kenya. Her session covers what a bank is actually looking at when a small business applies for credit — and the parts of an application owners most often get wrong.",
    ],
  },
  {
    slug: "mike-mutungi",
    name: "Eng. Mike Mutungi",
    role: "Founder & CEO",
    org: "I Choose Life – Africa",
    topic: "Kenya Entrepreneurship Ecosystem",
    draft: false,
    bio: [
      "Eng. Mike Mutungi is Founder and CEO of I Choose Life – Africa (ICL) and Chairman of the Association of Startup and SME Enablers of Kenya (ASSEK). He holds a Bachelor of Science in Geospatial and Space Technology from the University of Nairobi and a Master of Divinity from NIST.",
      "For over 20 years, Mike has designed programs spanning health, education, economic empowerment, leadership and governance, and institutional strengthening. He currently chairs the NGOs Network (HENNET) and sits on the boards of several organizations, including Planning Interiors and Jiinue Microcredit. He has overseen the development of strategic plans for programs and organizations across Africa, Europe, and the Middle East, and is the author of Kenya Mpya: Selecting and Holding Leaders to Account.",
    ],
  },
  {
    slug: "michael-maddy",
    name: "Mr. Michael Maddy",
    role: "CRO and Co-Founder",
    org: "Fleet Planner",
    topic: "Market access & Cross-border trade",
    draft: false,
    bio: [
      "Michael Maddy is Chief Revenue Officer and Co-Founder of Fleet Planner, a Kenya-based logistics technology company using AI to transform fleet management and supply chain operations across East Africa. The platform improves fleet efficiency, real-time logistics visibility, and operational optimization. In his role, Michael leads revenue growth, market expansion, and customer adoption across a diverse portfolio of logistics and transport clients.",
      "He brings cross-industry experience spanning fintech, healthtech, mortgage banking, and logistics, and has driven business development, strategic partnerships, and market-entry initiatives with global organizations including Wells Fargo, Boeing, and Warner Bros. Discovery, with a focus on systems integration and operational efficiency.",
      "Michael is recognized for his expertise in technology commercialization, revenue strategy, and logistics innovation. He holds a Master's degree and a Bachelor of Science in Education, and serves as a lecturer at Africa International University (AIU).",
    ],
  },
  {
    slug: "henry-yatich",
    name: "Dr. Henry K. Yatich",
    role: "Principal, Graduate Studies",
    org: "Mount Kenya University",
    topic: "Industry and Academia collaboration",
    draft: true,
    bio: [
      "Henry leads graduate studies at Mount Kenya University. He speaks on how a business puts a university research team on a live problem, what the university needs in return, and why most industry–academia partnerships fail before they start.",
    ],
  },
  {
    slug: "victor-sila",
    name: "Mr. Victor Sila",
    role: "Founder",
    org: "JuaPath",
    topic: "Adopting AI and Technology",
    draft: false,
    bio: [
      "Victor Sila is a Kenyan-born, San Francisco-based product builder and Founder of JuaPath, a voice-first, kid-safe AI learning platform for K–12 students. He has helped deploy AI shopping assistance at scale — at Amazon, he worked on Rufus, an AI shopping assistant that reached over 300 million customers and drove nearly $12 billion in incremental annualized sales. He currently leads AI-powered search experiences at Walmart, including the Sparky assistant.",
      "In Kenya, JuaPath is running a live pilot across six schools with 600 Grade 12 students, focused on math, reading, and science exam readiness, built to function in low-connectivity environments. Victor believes the fastest path to AI-powered jobs is AI-powered skills, and brings a practical, on-the-ground perspective to help MSMEs and Kenya build the talent, trust, and economic value a strong national AI framework makes possible.",
    ],
  },
  {
    slug: "hilda-muteshi",
    name: "Dr. Hilda Muteshi",
    role: "Design & Inclusive Business Modeling Expert",
    org: "SUS-AFRIC",
    topic: "Market access & Cross-border trade",
    draft: false,
    bio: [
      "Dr. Hilda Muteshi is an expert in design and inclusive business modeling, holding a PhD in Business Administration (Marketing) and an MBA in Marketing. With more than 15 years of experience across the private sector and development, including 10 years in cross-sector research and consultancy, she focuses on human-centered and behavioral design, creating inclusive business models and scalable solutions that improve livelihoods, create jobs, and increase income for the Base of the Pyramid, while empowering youth and women economically.",
      "Dr. Muteshi has led projects funded by GIZ, UNHCR, the EU, FCDO, FAO, BMZ, and GFFO, building the capacity of local structures to improve community resilience. She currently serves as lead consultant for lean innovation and entrepreneurship on the Somali Women Market Access Challenge, and previously worked as a public innovation consultant for the GovTech Kenya Innovation Challenge. She is committed to applied research, using co-creation and evidence-based, user-centric design thinking to build sustainable, shared-prosperity models across Africa.",
    ],
  },
  {
    slug: "salome-ayugi",
    name: "Salome Ayugi",
    role: "Associate Director, Special Projects & Kenya Operations",
    org: "Sinapis",
    topic: "Kenya Entrepreneurship Ecosystem",
    draft: false,
    bio: [
      "Salome Ayugi serves as Associate Director of Special Projects and Kenya Operations at Sinapis, where she leads strategic partnerships, manages multi-country initiatives, and oversees operations across Kenya. She brings over 9 years of experience supporting startup growth, investment readiness, and business acceleration programs, including her prior role as Sinapis's Kenya Country Manager, where she managed large-scale entrepreneurship programs and drove regional strategy.",
      "Salome holds a Bachelor's degree in Communication and Media Technology from Maseno University, with project management and leadership training from the Kenya Institute of Project Management and Strathmore Business School. She contributes to the startup ecosystem through mentorship, governance, and leadership, currently serving as Board Vice Chairperson of the Association of Startup and SME Enablers of Kenya (ASSEK).",
    ],
  },
] as const;

/**
 * The line-up count, written out, for the prose that counts the speakers.
 *
 * Three headlines say how many people are on the programme. Hardcoding the
 * word is how the copy ends up claiming five when the array holds seven —
 * the roster has already changed twice. Derive it and the sentence cannot
 * drift from the data.
 */
const COUNT_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
] as const;

export const SPEAKER_COUNT = COUNT_WORDS[SPEAKERS.length] ?? String(SPEAKERS.length);
export const SPEAKER_COUNT_CAP =
  SPEAKER_COUNT.charAt(0).toUpperCase() + SPEAKER_COUNT.slice(1);

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

/**
 * Partners, in the order they appear on the homepage.
 *
 * `logo` files are built from the supplied originals by the pipeline
 * described in README under "Partner logos". They are all 400x192 WebP with
 * transparency, each scaled to roughly equal optical area rather than equal
 * height — nine logos ranging from a 5.6:1 wordmark to a 0.66:1 crest look
 * nothing alike if you match their heights. Because every file is the same
 * size, one CSS rule sizes all of them and the balance holds at every
 * breakpoint. Drop in a replacement at the same dimensions and it will sit
 * correctly without touching the markup.
 *
 * `name` is the accessible name, so it must read as the organisation would
 * write it.
 */
export const PARTNERS = [
  { name: "Government of Kenya",           logo: "/img/partners/government-of-kenya.webp" },
  { name: "Sverige",                       logo: "/img/partners/sverige.webp" },
  { name: "University of Nairobi",         logo: "/img/partners/university-of-nairobi.webp" },
  { name: "Sustainable World Corporation", logo: "/img/partners/sustainable-world-corporation.webp" },
  { name: "Children's Mission",            logo: "/img/partners/childrens-mission.webp" },
  { name: "Access",                        logo: "/img/partners/access.webp" },
  { name: "Mount Kenya University",        logo: "/img/partners/mount-kenya-university.webp" },
  { name: "ASSEK",                         logo: "/img/partners/assek.webp" },
  { name: "Zetech University",             logo: "/img/partners/zetech-university.webp" },
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
  /* Speaker headshots, 800x1000, INDEXED IN THE SAME ORDER AS `SPEAKERS`.
     Adding a speaker without adding a photo at the matching index puts the
     wrong face under a person's name, so change the two together.

     1-5 are extracted from the printed flyer. They are adequate but not
     ideal — ask each speaker for the original file and drop it in with the
     same name for a sharper result. 6 and 7 are supplied originals, cropped
     to 4:5 by `scripts/build-speaker-headshots.py`.

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
    "/img/speaker-6.jpg",
    "/img/speaker-7.jpg",
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
