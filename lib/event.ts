/**
 * Every fact about the summit lives here.
 *
 * The old ICL page drifted out of sync with the poster — three names, two
 * early-bird dates, tracks in different words. One file fixes that: change a
 * value here and it changes everywhere on the site at once.
 */

/**
 * The one date. Every way the site says it derives from this line.
 *
 * The summit moved from 30 September to Thursday 15 October 2026, and the
 * move is what proved the point: the old date had been typed out in fifteen
 * separate places — three fields here, four headings, six search
 * descriptions and two docs — every one of which had to be found by hand.
 * That is precisely the drift this file exists to prevent, and the date had
 * quietly become the worst offender in it.
 *
 * Change DATE_ISO and the whole site follows: labels, headings, search
 * snippets and the schema.org start and end times.
 */
const DATE_ISO = "2026-10-15";
const DAY = new Date(`${DATE_ISO}T09:00:00+03:00`);
const fmtDate = (o: Intl.DateTimeFormatOptions) =>
  DAY.toLocaleDateString("en-GB", { timeZone: "Africa/Nairobi", ...o });

export const EVENT = {
  name: "Africa SME Summit",
  year: 2026,
  tagline: "Accelerating business growth through industry–academia collaboration",
  dateISO: DATE_ISO,
  /* en-GB puts a comma after the weekday; the house style has never had one. */
  dateLabel: fmtDate({ weekday: "long", day: "numeric", month: "long", year: "numeric" })
    .replace(",", ""),
  dateShort: fmtDate({ day: "numeric", month: "short", year: "numeric" }),
  venue: "Chandaria Centre for Performing Arts",
  venueDetail: "University of Nairobi, Main Campus",
  city: "Nairobi, Kenya",
  ticketUrl: "https://tikohub.com/events/562",
  /* ONE email address for the whole site. Everything that invites a reply
     uses it: the footer, the contact page, the exhibit and partner pages,
     the privacy page's contact for exercising data rights, and the enquiry
     form's failure message.

     BEFORE CHANGING IT, CONFIRM THE MAILBOX RECEIVES MAIL. This has already
     gone wrong once: the site shipped with `info@africasmesummit.com`, which
     was only ever aspirational and was never created, so the two places that
     could least afford a dead address — the form's failure path and the
     privacy page's data-rights contact — both pointed at nothing.
     africasmesummit.com now has MX records (Porkbun forwarding), which means
     the domain accepts mail; it does not prove any particular alias in front
     of the @ has been set up.

     Phone is still two entries, which is deliberate but not sacred.
     `conferencePhone` is the single number the footer and contact page
     publish; `phone` is the pair the exhibit and partner pages print, and
     the form quotes `phone[0]`. Collapse them if one number everywhere is
     wanted — nothing depends on there being two. */
  email: "sharon@africasmesummit.com",
  conferencePhone: "0724 255822",
  phone: ["0717 605151", "0724 255822"],
  host: "I Choose Life – Africa",
} as const;

/**
 * The booking step on TikoHub, rather than the event page.
 *
 * Used by the four sponsorship tiers and the two exhibition booths, which
 * are all being bought rather than browsed — one click closer to paying.
 * `EVENT.ticketUrl` stays the destination for the general "Get a ticket"
 * buttons, which are aimed at people still deciding.
 *
 * ONE URL, not six. The six links supplied for the tiers and booths were
 * identical, so TikoHub has no per-package deep link: every button lands on
 * the same page and the buyer still picks their item from the list there.
 * Six fields holding one value is how a set of links drifts apart, so this
 * is a single constant, derived so the event id is written once.
 */
export const BOOKING_URL = `${EVENT.ticketUrl}/booking`;

/** "15 October" — for prose that names the day without the year. */
export const DATE_DAY_MONTH = fmtDate({ day: "numeric", month: "long" });

/** "15 October 2026" — for search descriptions and anywhere the year is wanted. */
export const DATE_LONG = fmtDate({ day: "numeric", month: "long", year: "numeric" });

/** Early bird closes 31 Aug 2026, 23:59 East Africa Time (UTC+3).
    This must match the printed flyer. It does.

    The summit moved to 15 October and this deliberately did not move with
    it: the deadline now falls 45 days before the day rather than 30.
    Confirmed 14 August — the reprinted flyers carry 31 August too, so the
    two stay in step. */
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
 * All seven bios now come from the speakers themselves, via
 * `Marketing/speaker-bios-cleaned.md`, and are reproduced verbatim — do not
 * copy-edit someone's approved biography, including the American spellings,
 * without asking them first.
 *
 * `draft` stays even though every entry is now `false`. It is the flag that
 * says whether a line is that person's own words or something written for
 * them, and a speaker added later with a bio drafted from a job title must
 * be marked `draft: true` and approved before launch. Nothing published may
 * assert biography about a named individual that they have not signed off.
 */
export const SPEAKERS = [
  {
    slug: "susan-ndungu",
    name: "Ms. Susan Ndungu",
    role: "Head of SME Banking",
    org: "NCBA Bank Kenya",
    topic: "Finance, Capital & Investment",
    draft: false,
    bio: [
      "Susan Ndungu is Head of SME Banking at NCBA Bank Kenya, bringing over 20 years of banking experience with a focus on solutioning for micro, small, medium, and corporate businesses.",
      "She leads the development and execution of strategies to empower small and medium-sized enterprises across Kenya, with an approach centered on sustainable growth, tailored financial solutions, and a deep understanding of local market dynamics to drive resilience within the SME sector. Susan currently oversees 100 branches and more than 100 branch relationship managers who champion the SME banking agenda across the network.",
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
    topic: "Market Acquisition, retention & growth",
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
    role: "Principal, College of Graduate Studies and Research",
    org: "Mount Kenya University",
    topic: "Industry and Academia collaboration",
    draft: false,
    bio: [
      "Dr. Henry Yatich is a senior research fellow and the Principal, College of Graduate Studies and Research at Mount Kenya University specializing in research governance and innovation management. He is a Certified Innovation Manager with over 15 years of experience in leading high-impact donor-funded projects, with focus on university-business linkages, employability, and SME growth. He has been recognized for Improving the quality of business education by Association to Advance Collegiate Schools of Business (AACSB) and awarded the Leading EU-AU Research and Innovation Success Story-2024 by Strengthening the Europe-Africa Digital Ecosystem (SEADE) under the ACCESS project 2020-2029.",
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
    topic: "Market Acquisition, retention & growth",
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

const countWord = (n: number): string => COUNT_WORDS[n] ?? String(n);
const countWordCap = (n: number): string => {
  const w = countWord(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
};

/**
 * Delegate passes included with each exhibition booth.
 *
 * Declared here, above both the places that talk about it, because this is
 * precisely where the site contradicted itself: the FAQ promised every
 * exhibitor two passes while the Corporate booth promised four, so anyone
 * who paid KES 50,000 and then read the FAQ was told they got half of what
 * they had bought.
 *
 * The booth bullets and the FAQ answer both derive from these numbers now.
 * Change one here and both sentences follow. Do not type "two" or "four"
 * into either place again.
 */
export const BOOTH_PASSES = { startup: 2, corporate: 4 } as const;

export const TRACKS = [
  { n: "01", name: "Finance, Capital & Investment", line: "Where the money actually is, and what lenders need to see from you." },
  /* Renamed from "Market access & Cross-border trade" to match the 14 August
     programme. The old line described getting a product across a border,
     which is a different subject, so it went.

     This replacement is written from the track's name rather than from a
     session brief — it says what "acquisition, retention and growth" plainly
     means and promises nothing about content. Correct it with whoever owns
     the track; it is the one line on this page not taken from a source. */
  { n: "02", name: "Market Acquisition, retention & growth", line: "Finding customers, keeping the ones you have, and growing what each is worth." },
  { n: "03", name: "Talent & Human Resource acquisition with safeguarding", line: "Hiring well, and the safeguarding duties that come with it." },
  { n: "04", name: "Adopting AI and Technology", line: "What is worth adopting this year for growth and efficiency, and what is noise." },
  { n: "05", name: "Industry and Academia collaboration", line: "Putting a university research team on a problem in your business." },
  { n: "06", name: "Kenya Entrepreneurship Ecosystem strengthening", line: "The policy, the funds, and the institutions you should know by name." },
] as const;

/** Three buyers, three reasons. The old page spoke to one. */
export const PATHS = [
  {
    who: "Corporates & county",
    lead: "You serve the SME sector",
    body: "This is where the businesses you are trying to reach spend the day. Exhibit, speak, or sponsor a track — and meet enterprises already screened through the ICL programme.",
    points: ["Exhibition and speaking slots", "Profile to 10,000+ across ICL platforms", "Direct access to screened enterprises"],
  },
  {
    who: "Universities",
    lead: "You teach or research",
    body: "Submit a paper through the call. Place your students on live enterprise problems that count towards their qualification. Join 13 universities already in the programme.",
    points: ["Papers call and publishing", "Student placement into real businesses", "Industry partners for ongoing research"],
  },
  {
    who: "Business owners",
    lead: "You run an SME",
    body: "Meet the person who runs SME banking at NCBA. Put a university research team on a problem in your business. Show your product to four county governments in one afternoon.",
    points: ["Capital and market access", "Research support at no cost to you", "Buyers, banks and county government in one room"],
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
  { time: "07:30", title: "Arrival and registration", note: "" },
  { time: "09:00", title: "National and East Africa anthems", note: "" },
  { time: "09:05", title: "Opening prayer", note: "" },
  { time: "09:10", title: "Introductions and acknowledgements", note: "" },
  { time: "09:20", title: "Welcome remarks", note: "" },
  { time: "09:30", title: "Panel: accelerating business growth through industry–academia collaboration", note: "" },
  { time: "10:15", title: "Accelerating Africa's business growth through the Quadra Helix", note: "" },
  { time: "10:35", title: "Keynote address", note: "" },
  { time: "10:45", title: "Guest of Honour", note: "" },
  { time: "11:00", title: "Launches", note: "JuaPath research study · Jiinue Business Accelerator platform · SLP Project baseline report · SWC 2027" },
  { time: "11:20", title: "Photo session", note: "" },
  { time: "11:30", title: "Tea break", note: "" },
  { time: "12:00", title: "Parallel sessions", note: "The six tracks, plus the University Chancellors and Industry Roundtable" },
  { time: "12:45", title: "SEALS Training launch", note: "" },
  { time: "13:00", title: "Lunch", note: "" },
  { time: "14:00", title: "Networking, deal making and poster presentations", note: "" },
  { time: "16:00", title: "Africa SME Award 2026 winners presentation", note: "" },
  { time: "17:00", title: "Closing remarks", note: "" },
  { time: "17:30", title: "Closing prayers and departure", note: "" },
] as const;

/**
 * Where the running order came from, and how sure it is.
 *
 * Rendered under the agenda. The programme above is transcribed from
 * "SME Conference Program - 14.08.2026", which is a real running order
 * rather than the invented placeholder it replaced — but nobody has called
 * it final, and it predates the move to 15 October. Say what it is and when
 * it was written, rather than either claiming it is confirmed or calling it
 * indicative when it plainly is not.
 */
export const AGENDA_SOURCE = "Programme as at 14 August 2026. Times may still move.";

/**
 * When the day starts and ends, taken from the running order itself.
 *
 * The schema.org event times and the parking answer in the FAQ both used to
 * carry their own hardcoded 08:00, from the placeholder agenda that had
 * registration at eight. The real programme opens at 07:30, so both were
 * wrong the moment it landed. Derived here so the next programme change
 * carries them along.
 */
export const AGENDA_START = AGENDA[0].time;
export const AGENDA_END = AGENDA[AGENDA.length - 1].time;

export const FAQ = [
  { q: "Is lunch included?", a: "Yes. Every ticket includes lunch and refreshments through the day." },
  { q: "Can I send a colleague instead?", a: "Yes. Tickets are transferable up to 48 hours before the summit — send us both names on the contact page." },
  /* Times here derive from AGENDA rather than being typed: registration opens
     at its first entry, and the answer used to say "before the opening
     keynote", which the real programme does not contain. */
  { q: "Is there parking at the University of Nairobi?", a: `Parking is available on the Main Campus. Registration opens at ${AGENDA_START}, and spaces fill through the morning — come early.` },
  { q: "Do exhibitors need a separate ticket?", a: `Exhibition booths include delegate passes — ${countWord(BOOTH_PASSES.startup)} with the Startup booth and ${countWord(BOOTH_PASSES.corporate)} with the Corporate booth. Additional team members need standard tickets.` },
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
  /* The convener leads. Everything below it is a partner alongside; ICL is
     the organisation doing the convening, so it reads first rather than
     alphabetically or by tier. */
  { name: "I Choose Life – Africa",        logo: "/img/partners/i-choose-life.webp" },
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
 * Site photography.
 *
 * Every key here is rendered by something. Do not add one speculatively —
 * `hero` and `heroVideo` both sat here unused, the second promising a video
 * hero that was never built, and the instructions attached to them described
 * work that would have changed nothing on the page.
 *
 * The seven headshots are real. `floor` is the one placeholder left.
 */
export const PHOTOS = {
  /* Speaker headshots, 800x1000, INDEXED IN THE SAME ORDER AS `SPEAKERS`.
     Adding a speaker without adding a photo at the matching index puts the
     wrong face under a person's name, so change the two together.

     1-5 are extracted from the printed flyer. They are adequate but not
     ideal — ask each speaker for the original file and drop it in with the
     same name for a sharper result. 6 and 7 are supplied originals, cropped
     to 4:5 by `scripts/build-speaker-headshots.py`.

     floor.jpg is still a placeholder — it sits behind the closing section at
     25% opacity. Replace it with photography from last year's conference
     under the same filename and no code changes.

     For a quick comp while you wait for the real photo, swap the value for a
     seeded Picsum URL, e.g.
       floor: "https://picsum.photos/seed/asm-floor/1600/900"                */
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
 * Sponsorship packages. Tier names and prices are verified against the live
 * TikoHub listing — all four match to the shilling.
 *
 * The `includes` bullets are DRAFTS — written to be plausible, not taken
 * from a rate card. The TikoHub listing carries no inclusions for any
 * package, only a name and a price, so it cannot settle them either.
 *
 * Until they come from the real sponsorship document, /partner says so out
 * loud via SPONSOR_INCLUDES_NOTE. A sponsor paying KES 1,000,000 on the
 * strength of a bulleted list under a Book button will expect all of it.
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

/**
 * Shown directly above the tier grid on /partner, because the `includes`
 * bullets above are drafts and the page publishes them under a price and a
 * Book button.
 *
 * DELETE THIS — and the line that renders it — the moment the inclusions
 * come from the real rate card. It is scaffolding for an unfinished fact,
 * not a permanent disclaimer, and leaving it up once the packages are
 * confirmed makes a settled offer read as provisional.
 */
export const SPONSOR_INCLUDES_NOTE =
  "Tiers, prices and availability are confirmed. The inclusions listed under each tier are indicative — we agree the final package with you in writing before anything is committed.";

/**
 * Press release, issued 12 August 2026.
 *
 * DO NOT TEMPLATE LIVE VALUES INTO THIS. Everywhere else on the site, a
 * price or a date must derive from the constants above — that rule exists so
 * the site cannot contradict itself. Here it is inverted: a press release is
 * a dated document that went out to journalists. If `EARLY_BIRD_LABEL` were
 * interpolated into the body, the release would silently rewrite itself on
 * 1 September and no longer match the copy anyone was sent.
 *
 * So the prose is frozen and the numbers are literal, on purpose.
 * `PRESS_RELEASE.checked` records what was true when it was written, so a
 * reader can see whether the release has aged.
 *
 * Frozen from the moment it is sent, not from the moment it is written. Four
 * details were corrected against `SPEAKERS` and `EVENT` before issue: Susan
 * Ndungu's employer, Henry Yatich's title, the venue's full name, and the
 * omission of the convener from the speaker list. Once journalists have the
 * text, corrections mean a second release with its own date — editing a
 * quote someone has already filed is how a newsroom stops trusting you.
 */
export const PRESS_RELEASE = {
  kicker: "For immediate release",
  /* The issue date, and it must be the day the release actually goes out.
     Still unsent as of 14 August. If it slips further, move this — a release
     whose dateline predates the facts in it reads as recycled. */
  dateline: "NAIROBI, KENYA — August 14, 2026",
  headline:
    "Africa SME Summit Will Bring Capital, Academia, and Enterprise Into the Same Room This October",
  standfirst:
    "Kenya has 7.4 million small businesses. On October 15, the people who can help them grow will meet them halfway.",
  /* What the body asserts, as at the issue date. Check against the live
     constants before sending; do not rewrite the body to match. */
  checked: { earlyBird: "5,800", standard: "6,800", earlyBirdEnds: "August 31, 2026", eventDate: "October 15, 2026" },
  body: [
    "The Africa SME Summit, a new one-day convening for Kenya's small business economy, will take place October 15, 2026, at the Chandaria Centre for Performing Arts, University of Nairobi. The summit is convened by I Choose Life – Africa in partnership with the University of Nairobi, and brings investors, banks, universities, and government together with the enterprises they exist to serve — for one day, in one room.",
    "Kenya is home to 7.4 million micro, small, and medium enterprises. Most of them operate informally, cut off from capital, from markets beyond their own county, and from the research being done about them at universities down the road. The Africa SME Summit was built to close that distance.",
    "The summit is organized around four constituencies — industry, academia, capital, and enterprise — meeting across six tracks: finance and investment, market acquisition, retention and growth, talent and human resources, AI and technology adoption, industry-academia collaboration, and strengthening Kenya's entrepreneurship ecosystem.",
    "Confirmed speakers include Susan Ndungu, Head of SME Banking at NCBA Bank Kenya; Michael Maddy, CRO and Co-Founder of Fleet Planner; Dr. Henry K. Yatich, Principal of the College of Graduate Studies and Research at Mount Kenya University; Dr. Hilda Muteshi of SUS-AFRIC; Salome Ayugi, Associate Director at Sinapis; Victor Sila, founder of the AI learning platform JuaPath, who leads the summit's AI and Technology track; and Eng. Mike Mutungi, who convenes the summit and speaks on strengthening Kenya's entrepreneurship ecosystem.",
    "Attendees will leave with more than information: mentor and investor matching within their track, templates and tools they can put to use immediately, and access to a papers call for those doing original research on the sector. The summit's institutional partners include the University of Nairobi, Mount Kenya University, Zetech University, and the Association of Startup and SME Enablers of Kenya (ASSEK), alongside county and international partners.",
  ],
  quotes: [
    {
      text: "We kept seeing the same gap from every direction. A bank with capital to lend and no pipeline of ready businesses. A university with research no one in industry has seen. A business owner with a good idea and no way into either room. This summit puts all four in one room, on purpose, for one day.",
      who: "Eng. Mike Mutungi",
      role: "Founder and CEO of I Choose Life – Africa, and convener of the summit",
    },
    {
      text: "Every SME owner I talk to has already heard that AI matters. What they don't have is fifteen minutes with someone who's actually shipped it. This track isn't theory. It's what to use, what to ignore, and what to do Monday morning.",
      who: "Victor Sila",
      role: "Founder of JuaPath, previously building AI shopping systems at Amazon and Walmart",
    },
  ],
  tickets:
    "Early-bird tickets are KES 5,800 through August 31, 2026, rising to KES 6,800 from September 1. Registration is open now at africasmesummit.com.",
  about: [
    {
      h: "About Africa SME Summit",
      p: "The Africa SME Summit is a one-day convening in Nairobi, Kenya, bringing together small and medium enterprises, investors, financial institutions, universities, and government to close the gap between Kenya's 7.4 million SMEs and the capital, markets, and research that can help them grow. The inaugural summit takes place October 15, 2026, at the Chandaria Centre for Performing Arts, University of Nairobi. Learn more at africasmesummit.com.",
    },
    {
      h: "About I Choose Life – Africa",
      p: "I Choose Life – Africa (ICL) is a Kenyan organization working across health, education, and economic empowerment for young people. Founded and led by Eng. Mike Mutungi, ICL convenes the Africa SME Summit in partnership with the University of Nairobi.",
    },
  ],
} as const;

/** Media contact. The phone is EVENT.phone[0] in international form. */
export const PRESS_CONTACT = {
  name: "Ian Muiga Wangari",
  org: "I Choose Life – Africa",
  email: "ian.wangari@ichooselife.or.ke",
  phone: "(+254) 717 605 151",
  address: "Nine Planets Apartments HSE No. S3, Nairobi",
} as const;

/** Exhibition booths, priced as listed on TikoHub. */
export const STAND_OPTIONS = [
  {
    name: "Startup Exhibition Booth", price: "30,000", currency: "KES",
    who: "For small and growing businesses",
    includes: [
      "Booth for the full day",
      "Your products on the lunchtime gallery walk",
      `${countWordCap(BOOTH_PASSES.startup)} delegate passes`,
      "Listed in the delegate pack",
    ],
  },
  {
    name: "Corporate Exhibition Booth", price: "50,000", currency: "KES",
    who: "For established companies and institutions",
    includes: [
      "Larger booth on the main circulation route",
      "Your products on the lunchtime gallery walk",
      `${countWordCap(BOOTH_PASSES.corporate)} delegate passes`,
      "Listed in the delegate pack and on the website",
    ],
  },
] as const;

/**
 * The hall, and every stand in it.
 *
 * Generated by `scripts/build-floorplan.py` from the venue PDF — the x/y are
 * read out of the plan's own text layer, where each "EB3" and "T17" label
 * already carries a bounding box, so the hotspots sit exactly on the printed
 * labels rather than being eyeballed. Re-run the script when the plan changes.
 *
 * `kind` maps a stand to what is sold: the ten EB stands are the Corporate
 * booth, the twenty-one tables are the Startup booth.
 *
 * NOTE: nothing here knows what has already been taken. The site is a static
 * export with no database, and TikoHub has no per-stand link, so picking a
 * stand states a preference on the enquiry form — it does not reserve
 * anything, and the page must not imply that it does.
 */
export const FLOOR_PLAN = [
  {
    slug: "sixth", name: "6th floor",
    image: "/img/floorplan/sixth.webp", w: 1700, h: 1177,
    spots: [
      { id: "T1", kind: "startup", x: 50.9, y: 12.6 },
      { id: "T2", kind: "startup", x: 55.8, y: 12.6 },
      { id: "T3", kind: "startup", x: 60.4, y: 12.6 },
      { id: "T4", kind: "startup", x: 65.2, y: 12.6 },
      { id: "T5", kind: "startup", x: 71.5, y: 15.4 },
      { id: "T6", kind: "startup", x: 74.6, y: 20.1 },
      { id: "T7", kind: "startup", x: 77.7, y: 24.7 },
      { id: "T8", kind: "startup", x: 87.1, y: 67.8 },
      { id: "T9", kind: "startup", x: 62.4, y: 77.4 },
      { id: "T10", kind: "startup", x: 58.0, y: 78.3 },
      { id: "T11", kind: "startup", x: 53.2, y: 78.9 },
      { id: "T12", kind: "startup", x: 48.4, y: 79.6 },
    ],
  },
  {
    slug: "fifth", name: "5th floor",
    image: "/img/floorplan/fifth.webp", w: 1700, h: 1023,
    spots: [
      { id: "EB1", kind: "corporate", x: 30.9, y: 20.3 },
      { id: "EB2", kind: "corporate", x: 39.1, y: 25.6 },
      { id: "EB3", kind: "corporate", x: 49.4, y: 28.7 },
      { id: "EB4", kind: "corporate", x: 61.1, y: 28.7 },
      { id: "EB5", kind: "corporate", x: 72.7, y: 26.3 },
      { id: "EB6", kind: "corporate", x: 80.1, y: 33.2 },
      { id: "EB7", kind: "corporate", x: 81.9, y: 67.8 },
      { id: "EB8", kind: "corporate", x: 63.3, y: 82.4 },
      { id: "EB9", kind: "corporate", x: 51.7, y: 84.6 },
      { id: "EB10", kind: "corporate", x: 27.8, y: 63.1 },
      { id: "T13", kind: "startup", x: 22.7, y: 24.7 },
      { id: "T14", kind: "startup", x: 24.4, y: 35.9 },
      { id: "T15", kind: "startup", x: 23.5, y: 80.5 },
      { id: "T16", kind: "startup", x: 38.3, y: 44.8 },
      { id: "T17", kind: "startup", x: 37.7, y: 59.8 },
      { id: "T18", kind: "startup", x: 45.0, y: 72.3 },
      { id: "T19", kind: "startup", x: 55.2, y: 74.8 },
      { id: "T20", kind: "startup", x: 63.6, y: 61.6 },
      { id: "T21", kind: "startup", x: 64.1, y: 47.6 },
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
