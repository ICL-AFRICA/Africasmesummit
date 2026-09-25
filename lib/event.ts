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
  venue: "Ole Sereni",
  venueDetail: "Mombasa Road, Nairobi",
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
 * Where the sponsorship tiers and the exhibition booths send people.
 *
 * A literal, not derived. It used to be `${EVENT.ticketUrl}/booking`, which
 * skipped the event page and landed on TikoHub's booking step — one click
 * closer to paying for someone who had already chosen. This slug has no
 * /booking path (it 404s), so that shortcut is gone: these buttons now land
 * on the event page, the same place the general "Grab a ticket" buttons go,
 * reached by a different URL.
 *
 * Both URLs are live and serve the same event — /events/562 and this slug —
 * so the two constants are aliases rather than different destinations. If the
 * extra click matters, https://tikohub.com/events/562/booking still works.
 *
 * The odd-looking "sme-s" is correct: the listing is titled "Africa SME's
 * Summit". Verified — the tidier africa-sme-summit returns 404.
 */
export const BOOKING_URL = "https://tikohub.com/events/africa-sme-s-summit";

/**
 * The sponsorship/partnership brochure, downloadable from /partner.
 *
 * A static asset — no server, so no download-tracking beyond whatever the
 * host provides. Compressed from a 42MB Illustrator export to ~160KB with
 * Ghostscript's /ebook preset (150dpi images); visually unchanged, checked
 * page by page against the original before the compressed file replaced it.
 */
export const BROCHURE_URL = "/brochure/africa-sme-summit-brochure.pdf";

/**
 * The confirmed running order, downloadable below the agenda on the
 * homepage — the same PDF AGENDA above is transcribed from ("AFRICA_SME_
 * SUMMIT_2026_Program_16.09.2026"), so anyone can carry the whole running
 * order rather than re-scrolling the page. Same static-asset pattern as
 * BROCHURE_URL just above: no server, no download-tracking.
 */
export const PROGRAMME_URL = "/programme/africa-sme-summit-2026-programme.pdf";

/**
 * "Mombasa Road" — everything after the first comma in `venueDetail`
 * dropped.
 *
 * `venueDetail` is "Mombasa Road, Nairobi", which is right on a directions
 * line or the contact page but too long for a share preview, the OG card, or
 * a one-line mention next to `EVENT.venue`. All three derive the short form
 * the same way; `scripts/build-og.mjs` applies the same rule when it reads
 * venueDetail out of this file.
 *
 * Also used directly in JSX (the 404 page, the homepage, /press, /speakers)
 * next to `EVENT.venue` — those spots used to hardcode "University of
 * Nairobi" as a literal string instead of deriving it, which is exactly the
 * drift this file exists to prevent. Fixed when the venue moved to Ole
 * Sereni, 23 September 2026.
 */
export const VENUE_SHORT = EVENT.venueDetail.replace(/,.*$/, "");

/**
 * The line under the title when someone shares the link.
 *
 * Leads with the date on purpose. The share card carries the date only inside
 * the picture, so a client that does not load images — or loads it slowly —
 * showed the summit's name and its tagline and no date at all. This is the
 * text half of the same fact.
 */
export const SHARE_DESCRIPTION =
  `${EVENT.dateLabel} · ${VENUE_SHORT}. ${EVENT.tagline}`;

/** "15 October" — for prose that names the day without the year. */
export const DATE_DAY_MONTH = fmtDate({ day: "numeric", month: "long" });

/** "15 October 2026" — for search descriptions and anywhere the year is wanted. */
export const DATE_LONG = fmtDate({ day: "numeric", month: "long", year: "numeric" });

/** Early bird closes 15 Sept 2026, 23:59 East Africa Time (UTC+3).
    Independent of DATE_ISO on purpose — the deadline and the summit date
    move separately, and have.

    Extended from 31 August on 26 August 2026, so that a live deadline sits
    inside the paid campaign window rather than expiring before the spend
    starts. A countdown to a date that has already passed sells nothing.

    TWO THINGS THIS DATE NO LONGER MATCHES, both outside the repo:

      - The printed flyer says 31 August. Until it is reprinted, print and
        web disagree about when the price rises.
      - The press release dated 14 August says "through August 31, 2026,
        rising to KES 6,800 from September 1". It is stale and is NOT edited
        here: a release is a dated document, and correcting one that has gone
        out means issuing a second release, not rewriting the first. See
        PRESS_RELEASE below. */
export const EARLY_BIRD_ENDS = "2026-09-15T23:59:00+03:00";

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
 * page. The site promises KES 6,800 from 16 September (the flyer still says
 * 1 September, and is stale until reprinted), and the only
 * 6,800 item on TikoHub is the Papers Call ticket, which is a different
 * thing. Create the standard pass before 15 September, or the site will be
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
 * after it. Quoting 5,800 on 16 September would advertise a price that has
 * expired, which is worse than any alternative here.
 *
 * BUT: this site is a static export, so the line below runs at BUILD time,
 * not in the visitor's browser. The deployed HTML carries whatever was true
 * when it was built. Passing the deadline does NOT change a page already on
 * the CDN — only a rebuild does.
 *
 * So unlike the countdown and the early-bird bar, which are client-side and
 * genuinely need nothing done on the day, THIS NEEDS A REDEPLOY ON OR AFTER
 * 16 SEPTEMBER. Any push to main does it; there is nothing to edit. Until then
 * every ticket button still reads 5,800.
 *
 * Making it client-side instead was the alternative and was rejected: it
 * would put JavaScript on ten static buttons and let the most important
 * price on the site visibly change after paint.
 */
export const EARLY_BIRD_ACTIVE = Date.now() < new Date(EARLY_BIRD_ENDS).getTime();

/** The tier the site should be quoting right now. */
export const ACTIVE_TICKET = EARLY_BIRD_ACTIVE ? TICKETS[0] : TICKETS[1];

/** "KES 5,800" — the currently correct price, for prose. */
export const TICKET_PRICE = `${ACTIVE_TICKET.currency} ${ACTIVE_TICKET.price}`;

/** "5800" — digits only, for the schema.org offer. */
export const TICKET_PRICE_PLAIN = ACTIVE_TICKET.price.replace(/,/g, "");

/**
 * "Grab a ticket — KES 5,800". The label on every ticket button on the site.
 *
 * One string in one place, because a landing page whose ticket button says
 * one price in the hero and another in the footer stops being believed.
 *
 * Changed from "Get a ticket" to "Grab a ticket" 18 September 2026 as part
 * of a punchier copy pass — a more active verb, and one that reads
 * consistently with the "sold out" framing the early-bird messaging now
 * uses elsewhere on the site.
 */
export const TICKET_CTA = `Grab a ticket — ${TICKET_PRICE}`;

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
    slug: "michael-maddy",
    name: "Mr. Michael Maddy",
    role: "CEO and Co-Founder",
    org: "Fleet Planner",
    /* Moved from Market access & Cross-border trade to this track on the
       speaker's own correction (title and focus both updated at the same
       time) — confirmed with I Choose Life – Africa communications,
       16 September 2026. */
    topic: "Adopting AI and Technology",
    draft: false,
    bio: [
      "Michael Maddy is Chief Executive Officer and Co-Founder of Fleet Planner, a Kenya-based logistics technology company using AI to transform fleet management and supply chain operations across East Africa. The platform improves fleet efficiency, real-time logistics visibility, and operational optimization. In his role, Michael leads revenue growth, market expansion, and customer adoption across a diverse portfolio of logistics and transport clients.",
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
    topic: "Kenya Entrepreneurship Ecosystem strengthening",
    draft: false,
    bio: [
      "Salome Ayugi serves as Associate Director of Special Projects and Kenya Operations at Sinapis, where she leads strategic partnerships, manages multi-country initiatives, and oversees operations across Kenya. She brings over 9 years of experience supporting startup growth, investment readiness, and business acceleration programs, including her prior role as Sinapis's Kenya Country Manager, where she managed large-scale entrepreneurship programs and drove regional strategy.",
      "Salome holds a Bachelor's degree in Communication and Media Technology from Maseno University, with project management and leadership training from the Kenya Institute of Project Management and Strathmore Business School. She contributes to the startup ecosystem through mentorship, governance, and leadership, currently serving as Board Vice Chairperson of the Association of Startup and SME Enablers of Kenya (ASSEK).",
    ],
  },
  /* Thirteen speakers added 16 September 2026, confirmed by name, role, org
     and track by I Choose Life – Africa communications, one at a time.
     Every bio below is a single factual sentence built only from the name,
     role and org supplied — no biography beyond that has been signed off,
     so every entry here is `draft: true` per the rule above. Replace with
     the speaker's own words, and flip to `draft: false`, once supplied. */
  {
    slug: "mercyline-binsari",
    name: "Mercyline Binsari",
    role: "Finance Manager",
    org: "I Choose Life – Africa",
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: ["Mercyline Binsari is Finance Manager at I Choose Life – Africa."],
  },
  {
    slug: "thomas-ondigi",
    name: "Thomas Ondigi",
    role: "Managing Partner",
    org: "Nolands Kenya",
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: ["Thomas Ondigi is Managing Partner at Nolands Kenya."],
  },
  {
    slug: "wanjau-nduba",
    name: "Wanjau Nduba",
    role: "Chairperson",
    org: "Child's Mission Africa",
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: ["Wanjau Nduba is Chairperson of Child's Mission Africa."],
  },
  {
    slug: "nils-lindh",
    name: "Nils Lindh",
    role: "Founder",
    org: "Naventure Nordic",
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: ["Nils Lindh is Founder of Naventure Nordic."],
  },
  {
    slug: "jonathan-asena",
    name: "Jonathan Asena",
    role: "Marketing Manager",
    org: "Kimisitu DT Sacco",
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: ["Jonathan Asena is Marketing Manager at Kimisitu DT Sacco."],
  },
  {
    slug: "daniel-huba",
    name: "Daniel Huba",
    role: "Head of Markets and Partnership Execution for Growth Segments",
    org: "Mastercard",
    topic: "Industry and Academia collaboration",
    draft: true,
    bio: ["Daniel Huba is Head of Markets and Partnership Execution for Growth Segments at Mastercard."],
  },
  {
    slug: "duncan-levisohn",
    name: "Duncan Levisohn",
    role: "Associate Professor, Sustainable Enterprise",
    org: "Jönköping International Business School, Jönköping University, Sweden",
    topic: "Industry and Academia collaboration",
    draft: true,
    bio: ["Duncan Levisohn is Associate Professor in Sustainable Enterprise at Jönköping International Business School, Jönköping University, Sweden."],
  },
  {
    slug: "eric-nyamwaro",
    name: "Mr. Eric Nyamwaro",
    role: "Partnerships Advisor",
    org: "STEM Impact Center",
    topic: "Industry and Academia collaboration",
    draft: true,
    bio: ["Eric Nyamwaro is Partnerships Advisor at STEM Impact Center."],
  },
  {
    slug: "ruth-mawia",
    name: "Ruth Mawia",
    role: "CEO",
    org: "Koola Waters",
    topic: "Industry and Academia collaboration",
    draft: true,
    bio: ["Ruth Mawia is CEO of Koola Waters."],
  },
  {
    slug: "kelvin-karobio",
    name: "Kelvin Karobio",
    role: "Director",
    org: "Biztimam Ventures Limited",
    topic: "Industry and Academia collaboration",
    draft: true,
    bio: ["Kelvin Karobio is Director of Biztimam Ventures Limited."],
  },
  {
    slug: "jacqueline-tsuma",
    name: "Ms. Jacqueline Tsuma",
    role: "Chief Innovation Officer",
    org: "Timbuktoo Foundation (UNDP)",
    topic: "Adopting AI and Technology",
    draft: true,
    bio: ["Jacqueline Tsuma is Chief Innovation Officer at Timbuktoo Foundation (UNDP)."],
  },
  {
    slug: "njeri-ngaruiya",
    name: "Dr. Njeri Ngaruiya",
    role: "Lecturer, School of Computing and Engineering Science",
    org: "Strathmore University",
    topic: "Adopting AI and Technology",
    draft: true,
    bio: ["Dr. Njeri Ngaruiya is a Lecturer in the School of Computing and Engineering Science at Strathmore University."],
  },
  {
    slug: "esther-mwangi",
    name: "Esther Mwangi",
    role: "Director of Research & Innovation",
    org: "Zetech University",
    topic: "Adopting AI and Technology",
    draft: true,
    bio: ["Esther Mwangi is Director of Research & Innovation at Zetech University."],
  },
  {
    slug: "catherine-odhiambo",
    name: "CPA Catherine Odhiambo",
    role: "Acting Chief Executive Officer",
    org: "Kimisitu DT Sacco",
    /* Added 24 September 2026 at ICL's request, placed at the end of the
       array next to Esther Mwangi (no track order was specified). Topic
       set to Finance, Capital & Investment as the closest fit to a SACCO/
       banking background — same track as Susan Ndungu — but this is an
       inference, not an organiser-confirmed placement; correct it once one
       is given. bio is drafted from public reporting (Kimisitu Sacco's own
       leadership page, Co-op News, ZoomInfo), not her own submitted words
       — hence draft: true, per the rule at the top of this array: nothing
       here may be presented as her approved biography until she has
       signed off on it. */
    topic: "Finance, Capital & Investment",
    draft: true,
    bio: [
      "Catherine Odhiambo is the Acting Chief Executive Officer of Kimisitu DT Sacco, appointed by the board in October 2025 to steer the organisation following the departure of the previous CEO. She brings more than 20 years of experience in Kenya's co-operative movement, including eleven years at Vest Sacco, before returning to Kimisitu Sacco as Credit Manager overseeing its credit operations.",
      "She holds a Bachelor's degree in Business Administration (Finance) from Kenya Methodist University and a Diploma in Co-operative Management from the Co-operative College of Kenya, and is a Certified Public Accountant (CPA-K).",
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
  "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
  "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
  "twenty",
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

/**
 * The six tracks, and what each one is for.
 *
 * `name` is the linking key: a speaker's `topic` matches it exactly, which is
 * how /tracks lists who is on each track without a second copy of that
 * mapping. Change a name here and change the matching topics with it.
 *
 * `who` / `outcomes` / `format` come from the supplied track copy. Anything
 * that copy marked unconfirmed is simply absent rather than shown as a
 * placeholder — no half-questions in front of a delegate. That is why track
 * 02 carries none of them: its copy described cross-border trade, which is a
 * different subject from the name the running order gives it, so publishing
 * those outcomes here would have described the wrong session.
 *
 * The doc also asked for a "preview this track" webinar link on each. None
 * exist yet, so none are rendered.
 */
export const TRACKS = [
  {
    n: "01", slug: "finance-capital-investment",
    name: "Finance, Capital & Investment",
    line: "Where the money actually is, and what lenders need to see from you.",
    who: "Business owners ready to raise capital, or fix the finances they already have.",
    format: "Panel discussion + Q&A",
    outcomes: [
      "A clear map of Kenya's financing options today — grants, debt, equity, and digital lending — and which one actually fits your stage",
      "What investors and lenders are really evaluating before they say yes",
      "The financing mistakes that quietly stall growth-stage businesses, and how to avoid them",
    ],
  },
  {
    /* Renamed back to its original name on 31 August 2026, and this is the
       fourth name it has carried. The order was: "Market access &
       Cross-border trade", then "Market Acquisition, retention & growth"
       from the 14 August programme, then a reading of "acquisition" as
       acquiring MARKETS that let the programme's name sit over cross-border
       copy — and now the plain name again.

       The copy never moved. Every version of it has been about AfCFTA, EAC,
       export documentation and distributor networks, which is what the name
       now says on its face. Nothing else in this entry changed.

       If it moves a fifth time: the two speaker `topic` values below have to
       move with it or /tracks silently lists nobody on this track, and the
       press release paragraph names it too. */
    n: "02", slug: "market-access-cross-border-trade",
    name: "Market access & Cross-border trade",
    line: "Getting your product past the county line and across the border, and building the partners to keep it there.",
    who: "Businesses ready to expand beyond their local market, especially within the East African region.",
    format: "Panel discussion + Q&A",
    outcomes: [
      "Opportunities and requirements under AfCFTA and EAC trade frameworks",
      "Export documentation, compliance, and logistics essentials",
      "Case studies of Kenyan SMEs that successfully scaled cross-border",
      "Building distributor and partner networks abroad",
    ],
  },
  {
    n: "03", slug: "talent-human-resource-safeguarding",
    name: "Talent management & Human resource acquisition",
    line: "Hiring well, and the safeguarding duties that come with it.",
    who: "Owners and HR leads building a team faster than their systems can keep up.",
    format: "Workshop",
    outcomes: [
      "Recruitment and retention strategies built for growing businesses, not established ones",
      "How to embed safeguarding into HR policy from day one — not bolt it on later",
      "How to hire fast without compromising protection for staff and vulnerable stakeholders",
      "What a values-driven workplace culture actually looks like in practice, not on paper",
    ],
  },
  {
    n: "04", slug: "adopting-ai-technology",
    name: "Adopting AI and Technology",
    line: "What is worth adopting this year for growth and efficiency, and what is noise.",
    who: "MSMEs that want AI to save them time and money — not another buzzword.",
    format: "Demo + panel",
    outcomes: [
      "Four specific AI use cases you can try before you leave the room — not theory",
      "A live demo of at least one tool built for the Kenyan MSME context",
      "Three questions to run any new tool through, so you stop chasing hype and only adopt tools that pay for themselves",
      "The data protection basics you need before adopting any new tech",
    ],
  },
  {
    n: "05", slug: "industry-academia-collaboration",
    name: "Industry and Academia collaboration",
    line: "Putting a university research team on a problem in your business.",
    who: "Entrepreneurs, researchers, and institutions ready to turn research into revenue.",
    format: "Panel discussion",
    outcomes: [
      "How MSMEs can tap into university research, talent pipelines, and innovation hubs",
      "Concrete examples of industry-academia partnerships that have worked in Kenya",
      "Where the real doors are — internships, incubation, applied-research partnerships",
      "Confirmed academic partners: Mount Kenya University",
    ],
  },
  {
    n: "06", slug: "entrepreneurship-ecosystem-strengthening",
    name: "Kenya Entrepreneurship Ecosystem strengthening",
    line: "The policy, the funds, and the institutions you should know by name.",
    who: "MSMEs and stakeholders who want a seat at the table where policy gets made.",
    format: "Panel discussion",
    outcomes: [
      "Who's actually shaping MSME policy right now, and how to reach them",
      "The real gaps in Kenya's support ecosystem, and what's being done to close them",
      "How to engage the policy processes that affect your business, instead of just reacting to them",
      "Where government, private sector, and development partners are — and aren't — coordinating",
    ],
  },
] as const;

/**
 * Three buyers, three reasons. The old page spoke to one.
 *
 * Regrouped 19 September 2026 at ICL's request: the original three were
 * "Corporates & county" / "Universities" / "Business owners", which put two
 * quite different audiences — corporates and county government — in one
 * card and split "business owner" and "corporate" (both really the SME
 * sector, from opposite sides of it) into different ones. Now it's SMEs and
 * the corporates who serve them together in one card, county government
 * broken out into its own (it is a distinct audience with its own reasons
 * to attend — MSMEs registered in their jurisdiction, not a market to
 * exhibit to), and universities unchanged in the middle. Array order IS
 * display order, and the middle card keeps the dark treatment regardless of
 * which audience sits there (see the i === 1 check in app/page.tsx).
 */
export const PATHS = [
  {
    who: "SMEs & corporates",
    lead: "You run an SME, or you serve one",
    body: "Meet the person who runs SME banking at NCBA. Put a university research team on a problem in your business, exhibit, speak, or sponsor a track — and meet enterprises already screened through the ICL programme, whichever side of that table you're on.",
    points: ["Capital and market access", "Research support at no cost to you", "Exhibition and speaking slots", "Profile to 10,000+ across ICL platforms"],
  },
  {
    who: "Universities",
    lead: "You teach or research",
    body: "Submit a paper through the call. Place your students on live enterprise problems that count towards their qualification. Join 13 universities already in the programme.",
    points: ["Papers call and publishing", "Student placement into real businesses", "Industry partners for ongoing research"],
  },
  {
    who: "County government",
    lead: "You govern where they operate",
    body: "Nairobi, Machakos, Laikipia and Uasin Gishu county governments are all in the room — a direct line to the MSMEs registered in your jurisdiction, and to the corporates who procure from them.",
    points: ["Direct access to registered MSMEs", "Buyers, banks and business owners in one room", "Policy conversations grounded in real businesses"],
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

/**
 * The Guest of Honour, filling the running order's Welcome Remarks slot
 * below (08:50 in the confirmed programme).
 *
 * A separate export rather than a SPEAKERS entry on purpose: he is not
 * speaking on a track, so folding him into SPEAKERS would either invent a
 * `topic` that puts him on a track he isn't on, or leave `topic` untyped as
 * an exception every other entry has to special-case around. Declared here,
 * above AGENDA, so the agenda note below can read his name and title from one
 * place rather than typing them a second time.
 *
 * Corrected 19 September 2026 against the confirmed programme: the
 * placeholder running order had him in an invented 10:45 "Guest of Honour"
 * slot with no such title in the real programme. The confirmed programme
 * has him opening the day with Welcome Remarks at 08:50, and again on the
 * University Vice Chancellors and Industry Roundtable at midday — both
 * read from this export in AGENDA below, so this stays the one place his
 * facts live.
 *
 * `bio` added 18 September 2026, drafted from his University of Nairobi
 * profile page (see the source CV linked from profiles.uonbi.ac.ke) rather
 * than supplied directly, unlike the speakers in KEYNOTES/SPEAKERS whose
 * bios come from the person themselves — flag for review if a fuller,
 * speaker-supplied version becomes available.
 */
export const GUEST_OF_HONOUR = {
  name: "Prof. Eng. Ayub Gitau",
  role: "Vice Chancellor",
  org: "University of Nairobi",
  photo: "/img/guest-ayub-gitau.jpg",
  bio: [
    "Prof. Ayub Gitau is a professor of Agricultural and Biosystems Engineering at the University of Nairobi, where he has built his career across both academic and administrative roles before becoming Vice-Chancellor. He holds a PhD in Agricultural Engineering from the University of Nairobi and has been involved in significant research projects and institutional initiatives throughout his tenure there, combining academic depth with practical engineering experience.",
  ],
} as const;

/**
 * The keynote speakers, shown above the panel roster on the homepage and
 * /speakers — promoted out of the panel grid on 18 September 2026 at ICL's
 * request, so visitors meet the summit's biggest names before the panel
 * wall rather than finding them mixed into it.
 *
 * Gitau is spread from GUEST_OF_HONOUR rather than repeated, so his facts
 * stay declared in one place (he still fills the running order's Welcome
 * Remarks slot via that export — corrected 19 September 2026 from an
 * earlier, invented 10:45 "Guest of Honour" slot; see AGENDA and the note
 * on GUEST_OF_HONOUR above). Mike Mutungi moved here FROM `SPEAKERS` on
 * the same date — he is no longer a panel speaker and no longer appears on
 * the Kenya Entrepreneurship Ecosystem strengthening track page, which now
 * lists Salome Ayugi alone. His photo path (`/img/speaker-2.jpg`) is
 * unchanged; only which array points at it moved.
 *
 * Njenga Munene is new as of 18 September 2026: his bio is supplied (from I
 * Choose Life – Africa communications), his photo is a small source image
 * (264×270) upscaled to the site's 800×1000 headshot convention — ask for a
 * higher-resolution original if one becomes available, same as the two
 * softer panel photos flagged in PHOTOS above.
 *
 * Evaleen Mitei is new as of 21 September 2026, added at ICL's request from
 * a photo and biographical detail ICL supplied. She already had a
 * standalone session in AGENDA ("Transforming education through technology"
 * at 10:00) before this addition — her name and title here are kept
 * spelled exactly as AGENDA already had them (transcribed from the
 * confirmed summit programme), which ICL confirmed over a differently
 * spelled/titled version from a secondary source. Her photo, like Munene's,
 * is a small source image (265×265) upscaled to the 800×1000 convention.
 *
 * Display order is Gitau, then Mutungi, then Munene, then Mitei, then
 * Nyalita (Munene/Mitei set 19–21 September 2026 at ICL's request — UoN's
 * VC, the convener, Zetech's VC, then TSC's CEO; Nyalita added 24 September
 * 2026, appended last as the newest addition — Nairobi County's CECM for
 * Business and Hustler Opportunities. Bio supplied by ICL communications;
 * her photo is a supplied portrait (506×605) cropped and upscaled to the
 * site's 800×1000 headshot convention, same treatment as Munene's and
 * Mitei's smaller source photos above). Array order IS display order on both the
 * homepage and /speakers, so reordering this array is the only thing
 * needed to change it. Whenever this array's length changes, KEYNOTE_COUNT
 * below and the hardcoded speaker-count copy on the homepage and /speakers
 * need a look — see the comment there.
 */
export const KEYNOTES = [
  {
    slug: "ayub-gitau",
    ...GUEST_OF_HONOUR,
    // Was "Guest of Honour · 10:45" — that slot doesn't exist in the
    // confirmed programme. He opens the day; corrected 19 September 2026.
    label: "Welcome remarks · 8:50",
  },
  {
    slug: "mike-mutungi",
    name: "Eng. Mike Mutungi",
    role: "Founder & CEO",
    org: "I Choose Life – Africa",
    photo: "/img/speaker-2.jpg",
    label: "Keynote speaker",
    bio: [
      "Eng. Mike Mutungi is Founder and CEO of I Choose Life – Africa (ICL) and Chairman of the Association of Startup and SME Enablers of Kenya (ASSEK). He holds a Bachelor of Science in Geospatial and Space Technology from the University of Nairobi and a Master of Divinity from NIST.",
      "For over 20 years, Mike has designed programs spanning health, education, economic empowerment, leadership and governance, and institutional strengthening. He currently chairs the NGOs Network (HENNET) and sits on the boards of several organizations, including Planning Interiors and Jiinue Microcredit. He has overseen the development of strategic plans for programs and organizations across Africa, Europe, and the Middle East, and is the author of Kenya Mpya: Selecting and Holding Leaders to Account.",
    ],
  },
  {
    slug: "njenga-munene",
    name: "Prof. Njenga Munene",
    role: "Vice-Chancellor",
    org: "Zetech University",
    photo: "/img/keynote-njenga-munene.jpg",
    label: "Keynote speaker",
    bio: [
      "Prof. Njenga Munene is Vice-Chancellor of Zetech University and a Professor of Clinical Veterinary Medicine. Before joining Zetech, he spent many years at Egerton University in teaching and administration, including a full five-year term as Deputy Vice-Chancellor for Administration and Finance, a period marked by significant improvement in the university's physical facilities and webometric ranking. He also served as Dean of the Faculty of Veterinary Medicine at the University of Nairobi.",
      "He is a Kenya Veterinary Board–registered veterinary surgeon and a trustee of the Kenya Veterinary Association. Over his career he has chaired numerous university committees and the Joint Negotiation Committee of the Inter-Public Universities Council Consultative Forum, and has authored more than 50 scientific publications. He holds a PhD and MSc in Clinical Studies and a Bachelor's degree in Veterinary Medicine from the University of Nairobi, with advanced studies in protozoan diseases at Obihiro University in Japan.",
    ],
  },
  {
    slug: "evaleen-mitei",
    name: "Evaleen Mitei",
    role: "Chief Executive Officer",
    org: "Teachers Service Commission",
    photo: "/img/keynote-evaleen-mitei.jpg",
    label: "Keynote speaker",
    bio: [
      "Evaleen Mitei is Chief Executive Officer of the Teachers Service Commission (TSC), the constitutional body responsible for registering, employing, deploying and managing the conduct of Kenya's teaching service. She has spent 31 years at the Commission, rising through senior leadership including Senior Deputy Director and Deputy Director in TSC's Human Resource Directorate.",
      "She has also served at the Ministry of Public Service, where she worked on the implementation of national public service reforms — institutional reform experience she now brings to managing and supporting Kenya's teachers.",
    ],
  },
  {
    slug: "anastasia-nyalita",
    name: "Dr. Anastasia Mutethya Nyalita",
    role: "County Executive Committee Member, Business and Hustler Opportunities",
    org: "Nairobi City County Government",
    photo: "/img/keynote-anastasia-nyalita.jpg",
    label: "Keynote speaker",
    bio: [
      "Dr. Anastasia Mutethya Nyalita is a distinguished Kenyan pharmacist, healthcare specialist, and public administrator who serves as the Nairobi City County Government's County Executive Committee Member (CECM) for Business and Hustler Opportunities. With over 20 years of senior leadership experience spanning multinational corporations, trade associations, and public service, she has built a reputation as a highly efficient, action-oriented corporate governance expert.",
    ],
  },
] as const;

/**
 * Written-out keynote count, same "derive, don't retype" reasoning as
 * SPEAKER_COUNT above: the homepage and /speakers both say how many
 * keynote speakers there are in prose ("Two Vice-Chancellors and the
 * summit's own convener…", "Three keynote speakers…"), and that copy is
 * hardcoded English rather than a template around this — a fourth keynote
 * (Evaleen Mitei, 21 September 2026) already forced both files open to fix
 * the sentences by hand. Use these two exports for the *count* going
 * forward; the *description* of who they are still needs a human sentence,
 * since "two Vice-Chancellors, the convener and the TSC CEO" isn't
 * something `countWord` can write.
 */
export const KEYNOTE_COUNT = countWord(KEYNOTES.length);
export const KEYNOTE_COUNT_CAP = countWordCap(KEYNOTES.length);

/**
 * A slot in the running order.
 *
 * Most slots are one activity and one facilitator line (`note`). A few —
 * the 10:30 launches and the two blocks of concurrent tracks — are several
 * things happening under one shared time, which `sessions` exists for
 * rather than flattening them into separate top-level rows at the same
 * time (that would break `AGENDA.map`'s one-row-per-time assumption and
 * duplicate the time label). `quiet` marks logistics — arrivals, breaks,
 * prayers, the photo session — so the page can render them smaller and
 * dimmer than the actual programme content, which is what "hour by hour"
 * should read as busy with.
 */
type AgendaSession = { title: string; note: string };
type AgendaSlot = {
  time: string;
  title: string;
  note?: string;
  sessions?: readonly AgendaSession[];
  quiet?: true;
};

/**
 * The confirmed running order, transcribed from the programme I Choose Life
 * – Africa published 16 September 2026 ("AFRICA_SME_SUMMIT_2026_Program_
 * 16.09.2026"). Replaces the 14 August indicative draft this array held
 * before — see AGENDA_SOURCE below for what changed and how sure this is.
 */
export const AGENDA: readonly AgendaSlot[] = [
  { time: "07:30", title: "Arrival and registration", note: "Allan Manthi, Master SEAL, I Choose Life – Africa", quiet: true },
  { time: "08:30", title: "National & East Africa anthem", note: "Led by the Master of Ceremony, Ian Muiga, Program Manager, I Choose Life – Africa", quiet: true },
  { time: "08:35", title: "Opening prayer", quiet: true },
  { time: "08:40", title: "Introductions and acknowledgements", note: "Master of Ceremony, Ian Muiga, Program Manager, I Choose Life – Africa", quiet: true },
  { time: "08:50", title: "Welcome remarks", note: `${GUEST_OF_HONOUR.name}, ${GUEST_OF_HONOUR.role}, ${GUEST_OF_HONOUR.org}` },
  { time: "09:00", title: "Industry – academia collaboration: the Juapath and Zetech University collaboration case study", note: "Victor Sila, Founder, Juapath & Walmart, and Esther Njuguna, Zetech University" },
  { time: "09:30", title: "Strengthening Kenya's entrepreneurship ecosystem for MSME growth, investment and job creation — a Nairobi County case study", note: "Dr. Anastasia Nyalita, County Executive Committee Member — Business and Hustler Opportunities, Nairobi City County Government" },
  { time: "09:40", title: "The money exists. The problem is the meeting.", note: "Eng. Mike Mutungi, Chief Executive Officer, I Choose Life – Africa" },
  { time: "10:00", title: "Transforming education through technology: reimagining teacher management and service delivery", note: "Evaleen Mitei, CEO, Teachers Service Commission" },
  { time: "10:10", title: "Competency Based Curriculum (CBE), from classroom to economy: building future-ready skills for employability, entrepreneurship and economic growth", note: "John Lekakeny Ololtuaa, CBS, Principal Secretary, State Department for Basic Education, Ministry of Education" },
  { time: "10:20", title: "From innovation to enterprise: unlocking capital and markets for Africa's next generation of innovators", note: "Prof. Abdulrazak Shaukat, Principal Secretary, State Department for Science, Research & Innovation, Kenya" },
  {
    time: "10:30",
    title: "Launches",
    sessions: [
      { title: "Juapath Research study", note: "Prof. Njenga Munene, Vice Chancellor, Zetech University" },
      { title: "Jiinue Business Accelerator platform", note: "Prof. Abdulrazak Shaukat, Principal Secretary, State Department for Science, Research & Innovation, Kenya" },
      { title: "SLP Project", note: "Tom Owour, Mission Leader, Children's Mission Africa" },
      { title: "Africa SME Summit 2027 — accelerating sustainable business growth and cross-border trade through AI and technology adoption", note: "Jenny Jakobsson, Co-Founder, Sustainable World Corporation" },
    ],
  },
  { time: "11:20", title: "Photo session", note: "All", quiet: true },
  { time: "11:30", title: "Tea break", quiet: true },
  {
    time: "12:00",
    title: "Parallel sessions — five tracks",
    sessions: [
      { title: "Finance, Capital & Investment", note: "Susan Ndungu, Head of MSME Banking, NCBA, with Prof. Kellen Kiambati (Karatina University), Dr. Eric Wamuya (Machakos University), Wanjau Nduba, Nils Lindh and Barbara Lutomia (the Swarm Initiative), and Patrick Maina (Intellect Illumini Advisory, MSEA)" },
      { title: "Talent management", note: "Dr. James Nyamu, Tharaka University, and Prof. Kellen Kiambati, Karatina University" },
      { title: "Industry and academia collaboration", note: "Dr. Henry Yatich, Principal, Graduate Studies and Research, Mount Kenya University; Dr. Faith Yator, Kabarak University; Jenny Jakobsson, Co-Founder, Sustainable World Corporation" },
      { title: "Paper presentations", note: "Dr. Hilda Muteshi, Expert Design Inclusive Business Model Consultant" },
      { title: "University Vice Chancellors and Industry Roundtable", note: `${GUEST_OF_HONOUR.name}, ${GUEST_OF_HONOUR.role}, ${GUEST_OF_HONOUR.org}` },
    ],
  },
  { time: "12:45", title: "SEALS commissioning", note: "Ian Muiga, Program Manager, I Choose Life – Africa" },
  { time: "13:15", title: "Lunch", quiet: true },
  {
    time: "14:15",
    title: "Parallel sessions — three tracks",
    sessions: [
      { title: "Adopting AI and technology for business growth and efficiency", note: "Victor Sila, Juapath Founder & Walmart, with Esther Mwangi (Zetech University), Dr. Njeri Ngaruya (Strathmore University), and Newton (South Sudan)" },
      { title: "Market access and cross-border trade", note: "Dr. Hilda Muteshi, Expert Design Inclusive Business Model Consultant, with Dr. Susan Chege (Daystar University), Dr. Faith Yator (Kabarak University), and Nabitnu (Congo DRC)" },
      { title: "Kenya entrepreneurship ecosystem strengthening", note: "Mercy Kimalat, CEO, ASSEK, with Dr. Anastasia Nyalita (CECM, MSMEs, Nairobi City County), Phillip Kabii (Regional Coordinator, Children's Mission Africa), Prof. Stephen Muathe (Kenyatta University), Dr. Ruth Ruhiu (Technical University of Kenya), Henry Rithea (MSEA) and Anne Lawi" },
    ],
  },
  { time: "15:15", title: "Networking, deal making, pitching, exhibition & poster presentations", note: "Track business clinics" },
  { time: "16:00", title: "Africa SME Award 2026 winners ceremony", note: "Eng. Mike Mutungi, Chief Executive Officer, I Choose Life – Africa" },
  { time: "17:00", title: "Closing remarks", note: "Ian Muiga, Program Manager, I Choose Life – Africa" },
  { time: "17:30", title: "Closing prayers & departure", quiet: true },
] as const;

/**
 * Where the running order came from, and how sure it is.
 *
 * Rendered under the agenda. Replaces the 14 August indicative draft: this
 * one is transcribed from a programme I Choose Life – Africa itself
 * published and dated, "AFRICA_SME_SUMMIT_2026_Program_16.09.2026", not
 * the placeholder running order it replaced. Still worth a source line
 * rather than silence — a programme this detailed, with facilitators named
 * against every slot, is the kind of thing that gets a late substitution.
 */
export const AGENDA_SOURCE = "Confirmed programme, published 16 September 2026.";

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

/** Full ISO timestamp for the summit's own countdown (see Countdown.tsx),
 *  built from DATE_ISO and the agenda's own opening time rather than a
 *  second typed date — registration opens at AGENDA_START, so that is the
 *  moment the homepage counts down to. */
export const SUMMIT_STARTS = `${DATE_ISO}T${AGENDA_START}:00+03:00`;

export const FAQ = [
  { q: "Is lunch included?", a: "Yes. Every ticket includes lunch and refreshments through the day." },
  { q: "Can I send a colleague instead?", a: "Yes. Tickets are transferable up to 48 hours before the summit — send us both names on the contact page." },
  /* Times here derive from AGENDA rather than being typed: registration opens
     at its first entry, and the answer used to say "before the opening
     keynote", which the real programme does not contain. */
  { q: "Is there parking at Ole Sereni?", a: `Yes, on-site parking is available for delegates. Registration opens at ${AGENDA_START}, and spaces fill through the morning — come early.` },
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

     1 is extracted from the printed flyer — adequate but not ideal, ask the
     speaker for the original if a sharper result turns up. 3 and 4 were
     replaced 16 September 2026 with supplied originals (Michael Maddy,
     Henry Yatich); 5, 6 and 7 are already supplied originals. 8-20 are
     the thirteen speakers added the same day. Every one of 3-20 is cropped
     to 4:5, face-anchored, by hand — never automatically — following the
     convention `scripts/build-speaker-headshots.py` set out. Two of them
     (Henry Yatich, now at index 2, and Eric Nyamwaro, now at index 13) come
     from a small supplied photo and are visibly softer once enlarged to
     800x1000; ask each for a higher-resolution original when one is
     available.

     21 (Catherine Odhiambo, added 24 September 2026) is the same situation
     as Anastasia Nyalita in KEYNOTES: a supplied 500x500 photo, centre-
     cropped to 4:5 (400x500) and upscaled to 800x1000 rather than the
     original-pixels crop the rest of this comment describes — there was no
     source large enough for a no-resampling crop.

     speaker-2.jpg (Mike Mutungi) is deliberately absent from this array —
     he moved to KEYNOTES on 18 September 2026 and is no longer one of the
     panel speakers this array backs. The file itself was not deleted or
     renumbered; KEYNOTES below points at it directly by its existing path.

     floor.jpg is still a placeholder — it sits behind the closing section at
     25% opacity. Replace it with photography from last year's conference
     under the same filename and no code changes.

     For a quick comp while you wait for the real photo, swap the value for a
     seeded Picsum URL, e.g.
       floor: "https://picsum.photos/seed/asm-floor/1600/900"                */
  speakers: [
    "/img/speaker-1.jpg",
    "/img/speaker-3.jpg",
    "/img/speaker-4.jpg",
    "/img/speaker-5.jpg",
    "/img/speaker-6.jpg",
    "/img/speaker-7.jpg",
    "/img/speaker-8.jpg",
    "/img/speaker-9.jpg",
    "/img/speaker-10.jpg",
    "/img/speaker-11.jpg",
    "/img/speaker-12.jpg",
    "/img/speaker-13.jpg",
    "/img/speaker-14.jpg",
    "/img/speaker-15.jpg",
    "/img/speaker-16.jpg",
    "/img/speaker-17.jpg",
    "/img/speaker-18.jpg",
    "/img/speaker-19.jpg",
    "/img/speaker-20.jpg",
    "/img/speaker-21.jpg",
  ],
  floor: "/img/floor.jpg",

  /* Venue photography, added 24 September 2026 at ICL's request for the
     homepage header's new venue button (see VenueHoverButton.tsx and the
     "Inside Ole Sereni" gallery section on /press) — nine photos supplied
     by ICL: the building from outside, the entrance, the lobby, and five
     of the function spaces the summit will actually use. Resized to a
     1400px long edge and re-encoded as WEBP (quality 82), the same
     treatment as the /press flyer image, since these are full photographs
     rather than face-cropped headshots and don't need the speakers'
     800x1000 convention.

     The header's hover preview uses `PHOTOS.venue.slice(0, 5)` — the
     first five entries below — as a quick orientation lap; the /press
     gallery renders the full array, same order.

     `venueLogo` (added 25 September 2026) is Emara Ole Sereni's own
     roundel — the ostrich-and-sun mark, cropped square from the supplied
     logo file with its wordmark dropped (illegible at the ~18px it renders
     at in the homepage header's "Venue" segment) and padded back to a
     square on white. It is a brand mark, not a photo, so it stays out of
     the `venue` gallery array below and is referenced on its own. */
  venueLogo: "/img/venue/venue-logo.webp",
  venue: [
    /* First five are also the header hover-preview's set, in this exact
       order — a quick orientation lap (outside, in, hall, view), not the
       whole tour. Keep any newly curated preview photos in the first five
       slots if this array is ever reordered. */
    { src: "/img/venue/venue-exterior.webp", alt: "Aerial view of the Ole Sereni hotel on Mombasa Road, its red entrance tower rising above open grassland" },
    { src: "/img/venue/venue-entrance.webp", alt: "Ole Sereni's red-and-cream entrance tower and covered driveway" },
    { src: "/img/venue/venue-lobby.webp", alt: "Ole Sereni's reception desk beneath woven pendant lights" },
    { src: "/img/venue/venue-hall.webp", alt: "Ole Sereni's Pride Hall laid out banquet-style with round tables for a conference" },
    { src: "/img/venue/venue-terrace.webp", alt: "Ole Sereni's rooftop terrace, dining tables looking out over the plains" },
    { src: "/img/venue/venue-stairs.webp", alt: "A seating area overlooking Ole Sereni's double-height lobby, lit by a chandelier" },
    { src: "/img/venue/venue-boardroom.webp", alt: "A long boardroom table set for a meeting, overlooking Ole Sereni's gardens" },
    { src: "/img/venue/venue-buffet-1.webp", alt: "A buffet spread at Ole Sereni, chafing dishes of roasted vegetables" },
    { src: "/img/venue/venue-buffet-2.webp", alt: "A buffet spread at Ole Sereni, rice and vegetable dishes" },
  ],
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
 * Meta Pixel.
 *
 * The id is config, not content, but it lives here for the same reason
 * everything else does: one file to look in. Empty string disables the pixel
 * entirely — `components/MetaPixel.tsx` renders nothing without it, which is
 * how you turn tracking off for a preview deploy without deleting code.
 *
 * NOTE: this is the first third-party request the site makes. /privacy tells
 * visitors the site runs no tracking; that claim does not survive this and
 * has to be rewritten before launch. See docs/privacy-review-notes.md.
 */
export const META_PIXEL_ID = "1700326121192587";

/**
 * LinkedIn Insight Tag partner id, from Campaign Manager → Analytics →
 * Insight Tag.
 *
 * Blank disables the tag entirely — `components/LinkedInInsight.tsx` renders
 * nothing and the site makes no LinkedIn request — which is how a preview
 * deploy runs without it.
 *
 * Never guess this value. A wrong partner id sends this site's traffic into
 * somebody else's advertising account, and nothing here would look broken.
 */
export const LINKEDIN_PARTNER_ID = "9923012";

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
 * The partnership proposal PDF, downloadable from /partner — the actual
 * rate card SPONSOR_TIERS below is now sourced from (see that comment).
 * Same static-asset pattern as BROCHURE_URL and PROGRAMME_URL: no server,
 * no download-tracking beyond whatever the host provides.
 *
 * This is a different document from BROCHURE_URL — that one is the general
 * summit overview (date, tracks, speakers); this one is specifically the
 * sponsorship rate card and the two signature opportunities below. Both
 * stay downloadable from /partner; neither replaces the other.
 */
export const PARTNERSHIP_PROPOSAL_URL = "/partnership/africa-sme-summit-2026-partnership-proposal.pdf";

/**
 * Sponsorship packages, sourced 21 September 2026 from the actual
 * partnership proposal document (PARTNERSHIP_PROPOSAL_URL above) — not
 * drafted, not TikoHub's name-and-price-only listing. Tier names and
 * prices still match TikoHub to the shilling; `title`, `limit`, `cta` and
 * every `includes` bullet now come from the signed-off proposal.
 *
 * `title` is the proposal's own name for the tier ("Associate Partner" for
 * Bronze, and so on) — shown alongside the metal name on /partner, not in
 * place of it, since both appear on the proposal.
 *
 * `cta` is the proposal's own button copy per tier, and it is not uniform
 * on purpose: Bronze/Silver/Gold are a direct booking ("Secure", "Claim a
 * track"), Platinum is not — the proposal calls it a negotiated enquiry,
 * not a checkout, so its button points at the enquiry form on this page
 * rather than BOOKING_URL. See the tier === "Platinum" check on /partner.
 *
 * ORDER IS ASCENDING (Bronze → Platinum) AND IS LOAD-BEARING. Each tier's
 * `includes` should only ever list what is genuinely NEW at that tier,
 * never repeat what a lower tier already grants — /partner derives the
 * full cumulative list a tier actually gets by flattening `includes` from
 * every tier up to and including it (`SPONSOR_TIERS.slice(0, i + 1)`),
 * rather than retyping each tier's complete bullet list here. Reordering
 * this array changes what /partner claims every tier includes, not just
 * the order they're drawn in.
 *
 * Platinum's "Premium exhibition booth" is the one bullet that is not a
 * new grant so much as an upgrade of Silver's plain "Exhibition booth" —
 * the proposal's own table shows it the same way (the Platinum column
 * reads "Premium" in the row every other tier just ticks). Left as its own
 * bullet rather than modelled as a real upgrade mechanism — one word of
 * difference did not justify a second field.
 */
export const SPONSOR_TIERS = [
  {
    tier: "Bronze", title: "Associate Partner", price: "125,000", currency: "KES",
    limit: "Open", cta: "Secure Associate", featured: false,
    includes: [
      "Logo on the website and the delegate pack",
      "Two delegate passes",
      "Materials in the delegate bag",
      "Named in the post-summit report",
    ],
  },
  {
    tier: "Silver", title: "Platform Partner", price: "250,000", currency: "KES",
    limit: "Open", cta: "Secure Platform", featured: false,
    includes: [
      "Panel or speaking slot",
      "Exhibition booth",
      "Four delegate passes",
      "Logo on the printed programme",
    ],
  },
  {
    tier: "Gold", title: "Track Partner", price: "500,000", currency: "KES",
    limit: "6 — one per track", cta: "Claim a track", featured: false,
    includes: [
      "Your name on one of the six tracks",
      "Chair or co-chair that track's sessions",
      "Six delegate passes",
    ],
  },
  {
    tier: "Platinum", title: "Convening Partner", price: "1,000,000", currency: "KES",
    limit: "1 only", cta: "Enquire", featured: true,
    includes: [
      "Named alongside the summit on all materials",
      "Opening address from your leadership",
      "Premium exhibition booth",
      "Ten delegate passes",
      "Logo on stage, badges and the delegate pack",
      "Profile across ICL platforms reaching 10,000+",
    ],
  },
] as const;

/**
 * Two opportunities the proposal keeps outside the four tiers entirely —
 * each goes to a single partner, by application, negotiated directly with
 * the convener rather than booked off a price list. Added to /partner
 * 21 September 2026, as its own section after the tier grid, so they read
 * as a different kind of offer rather than a fifth row bolted onto the
 * table above.
 */
export const SIGNATURE_OPPORTUNITIES = [
  {
    time: "16:00",
    moment: "The peak of the day",
    name: "The Africa SME Award 2026",
    body: "The winners are announced from the stage in front of the entire summit, at the emotional high point of the programme. Naming rights place a partner's brand permanently against Kenyan enterprise achievement — the most photographed, most reported moment of the day.",
  },
  {
    time: "10:30",
    moment: "The platform launch",
    name: "The Jiinue Business Accelerator",
    body: "Kenya's new enterprise assessment and investor-matching platform launches from this stage, introduced by the Principal Secretary for Science, Research & Innovation. Association with the launch positions a partner at the origin of national infrastructure, not merely at an event.",
  },
] as const;

/**
 * The proposal's own deadline: a partner confirmed by this date appears in
 * the printed programme, on delegate badges and across the remaining
 * campaign; one confirmed after it still gets everything their tier
 * promises, just not in print — materials have already gone. Derived
 * label, never typed elsewhere, same rule as every other date in this file.
 */
export const PARTNER_PRINT_DEADLINE = "2026-10-01T23:59:00+03:00";
export const PARTNER_PRINT_LABEL = new Date(PARTNER_PRINT_DEADLINE).toLocaleDateString(
  "en-GB", { weekday: "long", day: "numeric", month: "long" }
);

/**
 * Press release, issued 12 August 2026.
 *
 * DO NOT TEMPLATE LIVE VALUES INTO THIS. Everywhere else on the site, a
 * price or a date must derive from the constants above — that rule exists so
 * the site cannot contradict itself. Here it is inverted: a press release is
 * a dated document that went out to journalists. If `EARLY_BIRD_LABEL` were
 * interpolated into the body, the release would silently rewrite itself on
 * 16 September and no longer match the copy anyone was sent.
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
 *
 * Changed 20 September 2026: /press no longer renders this release — the
 * page is now the SUMMIT_UPDATES feed below. PRESS_RELEASE stays here,
 * unrendered, because it is still the correct thing to paste into an email
 * or hand a journalist directly; it just isn't the page anymore.
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
    "The summit is organized around four constituencies — industry, academia, capital, and enterprise — meeting across six tracks: finance and investment, market access and cross-border trade, talent and human resources, AI and technology adoption, industry-academia collaboration, and strengthening Kenya's entrepreneurship ecosystem.",
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

/** Media contact. The phone is EVENT.phone[0] in international form. Still
 *  shown on /press, in a smaller form, below the updates feed — a working
 *  journalist should still find it there even though the page's main job
 *  has changed. */
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
 * Detail that belongs to one track rather than all six.
 *
 * Kept out of TRACKS on purpose. `who`, `outcomes` and `format` are things
 * every track has — track 02's were simply unknown for a while. A named list
 * of tools is not: it exists because of how this particular session is being
 * run. Giving the other five an empty `useCases` array to keep the shape
 * uniform would be inventing a field they do not have.
 *
 * The tools are named by the speaker and reproduced as supplied. They are
 * claims about third-party products on a public page, so change them only
 * with whoever is presenting.
 */
type TrackExtra = {
  intro: string;
  useCases: { n: string; name: string; fixes: string; tools: string }[];
  note: { lead: string; body: string; who: string };
};

export const TRACK_EXTRAS: Record<string, TrackExtra> = {
  "adopting-ai-technology": {
    intro: "Four use cases, with named tools",
    useCases: [
      {
        n: "01",
        name: "Customer response",
        fixes: "Orders and questions lost in an unread WhatsApp inbox",
        tools: "WhatsApp Business (free) + Meta AI catalog tools draft replies to common questions — you still review and hit send",
      },
      {
        n: "02",
        name: "Marketing content",
        fixes: "No time or budget for an agency",
        tools: "Canva AI design tools turn one product photo into a shot, poster, and social post; ChatGPT or Claude (free tier) write captions and descriptions from a one-line product description",
      },
      {
        n: "03",
        name: "Financial records",
        fixes: "Cash problems discovered only after they're a crisis",
        tools: "Google Sheets + your own M-Pesa/bank statement export, reviewed for 15 minutes a week, turns transaction history into a simple cash-in/cash-out picture",
      },
      {
        n: "04",
        name: "Access to finance",
        fixes: "Cash-only income is invisible to lenders",
        tools: "A clean, consistent digital transaction trail (M-Pesa/bank + formal registration) is increasingly what lenders and investors score first — this is the same data investor-matching tracks are built to reward",
      },
    ],
    note: {
      lead: "Before you adopt anything",
      body: "A simple three-question filter, walked through live — the kind of thing that sounds obvious once you hear it, and saves most businesses from buying tools they didn't need.",
      who: "Victor Sila",
    },
  },
};

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
/**
 * Pride Hall, Ole Sereni — replaced 25 September 2026 when the venue moved
 * from the old two-floor plan above (6th/5th floor, 10 corporate + 21
 * startup spots) to this single hall. Source: "ceo_ready_summit_floor_plan.pdf",
 * a one-page rendered floor plan with no PDF text layer, so
 * scripts/build-floorplan.py's bbox-extraction approach does not apply here
 * — coordinates below were read off the rendered page with OCR (tesseract)
 * plus manual verification (markers overlaid on the image and checked
 * against every label) rather than pulled from real vector text boxes.
 * Re-derive by the same means if this plan changes; do not eyeball it fresh.
 * Legend was 9 corporate (EB1-EB9) + 9 startup (T1-T9) = 18 spots total.
 */
export const FLOOR_PLAN = [
  {
    slug: "pride-hall", name: "Pride Hall",
    image: "/img/floorplan/pride-hall.webp", w: 1900, h: 1386,
    spots: [
      { id: "EB1", kind: "corporate", x: 22.4, y: 60.5 },
      { id: "EB2", kind: "corporate", x: 26.9, y: 60.4 },
      { id: "EB3", kind: "corporate", x: 41.0, y: 60.5 },
      { id: "EB4", kind: "corporate", x: 84.9, y: 24.4 },
      { id: "EB5", kind: "corporate", x: 84.9, y: 30.8 },
      { id: "EB6", kind: "corporate", x: 84.9, y: 37.2 },
      { id: "EB7", kind: "corporate", x: 85.0, y: 43.7 },
      { id: "EB8", kind: "corporate", x: 85.1, y: 50.5 },
      { id: "EB9", kind: "corporate", x: 85.0, y: 57.1 },
      { id: "T1", kind: "startup", x: 82.7, y: 10.7 },
      { id: "T2", kind: "startup", x: 91.3, y: 10.7 },
      { id: "T3", kind: "startup", x: 91.1, y: 17.5 },
      { id: "T4", kind: "startup", x: 91.3, y: 24.9 },
      { id: "T5", kind: "startup", x: 91.3, y: 33.0 },
      { id: "T6", kind: "startup", x: 91.3, y: 41.2 },
      { id: "T7", kind: "startup", x: 91.3, y: 49.3 },
      { id: "T8", kind: "startup", x: 91.3, y: 57.4 },
      { id: "T9", kind: "startup", x: 91.3, y: 65.1 },
    ],
  },
] as const;

/** The papers call has its own ticket on TikoHub. */
export const PAPERS_TICKET = { price: "6,800", currency: "KES" } as const;

/**
 * Call-for-papers submission window.
 *
 * Extended 20 September 2026 at ICL's request. Originally supplied 18
 * September, after the fact, as already-closed: submissions due 14
 * September 23:59 EAT, notifications 21 September 23:59 EAT. The window is
 * now reopened instead — submissions extended to 21 September 23:59 EAT
 * (midnight at the end of the day after this change was made), and
 * notifications pushed back a week to match, 28 September 23:59 EAT.
 *
 * This is the first time PAPERS_SUBMISSION_DEADLINE has been in the
 * future rather than the past, so /papers (and its STEPS list) now
 * actually branches on PAPERS_SUBMISSIONS_OPEN below instead of assuming
 * "closed" unconditionally the way it could get away with before.
 */
/* Extended again 21 September 2026 at ICL's request: submissions now run
   to 30 September. The notify date moves with it — it was 28 September,
   which the extension would otherwise have left BEFORE the new submission
   deadline (notifying people before the window that decides who gets
   notified has even closed). Kept the same 7-day review gap the previous
   dates used (21→28) rather than inventing a new one: 30 September + 7
   days = 7 October. */
export const PAPERS_SUBMISSION_DEADLINE = "2026-09-30T23:59:00+03:00";
export const PAPERS_NOTIFY_DATE = "2026-10-07T23:59:00+03:00";

/** Build-time flags, same mechanism as EARLY_BIRD_ACTIVE above — true only
 *  if the site is rebuilt before the date in question. A redeploy on or
 *  after 22 September flips PAPERS_SUBMISSIONS_OPEN to false; one on or
 *  after 29 September flips PAPERS_NOTIFY_PENDING to false. Nothing to
 *  edit by hand when either day comes — only if a deadline moves again. */
export const PAPERS_SUBMISSIONS_OPEN =
  Date.now() < new Date(PAPERS_SUBMISSION_DEADLINE).getTime();
export const PAPERS_NOTIFY_PENDING =
  Date.now() < new Date(PAPERS_NOTIFY_DATE).getTime();

/** Derived labels — never type either date anywhere else. */
export const PAPERS_SUBMISSION_LABEL = new Date(PAPERS_SUBMISSION_DEADLINE).toLocaleDateString(
  "en-GB", { day: "numeric", month: "long", timeZone: "Africa/Nairobi" }
);
export const PAPERS_NOTIFY_LABEL = new Date(PAPERS_NOTIFY_DATE).toLocaleDateString(
  "en-GB", { day: "numeric", month: "long", timeZone: "Africa/Nairobi" }
);

/**
 * SUMMIT_UPDATES — added 20 September 2026, replacing the single press
 * release as the content of /press. Rather than one static document, the
 * page is now a running feed of what is actually happening on the way to
 * the summit: papers reopening, new partners, speakers confirmed, ticket
 * milestones — the things that build anticipation between now and
 * October 15. Add a new entry at the TOP of the array as things happen;
 * nothing else on the page needs to change.
 *
 * Declared down here, after PAPERS_SUBMISSION_LABEL / PAPERS_NOTIFY_LABEL,
 * because the first entry below quotes them — module-level consts can only
 * reference what has already been declared above them in the file.
 *
 * `date` is an ISO date; the page derives its display label from it at
 * render time (same "derive, don't retype" rule as EARLY_BIRD_LABEL and
 * PAPERS_SUBMISSION_LABEL above) — never add a separate display string.
 *
 * `tag` drives the card's accent colour and deliberately reuses the site's
 * existing four-colour system (see AGENDA_ACCENT_BG / the /tracks page)
 * rather than inventing a fifth: marigold = Speakers (the spotlight
 * colour, same as the ticket action), clay = Tickets (urgency and
 * deadlines), indigo = Partners (capital and institutions), palm = Papers
 * (growth — universities and research). A future fifth category should be
 * folded into whichever of these four it resembles rather than getting a
 * new colour of its own.
 *
 * No entries below are placeholders any more as of 21 September 2026 — the
 * last one ("[Placeholder] Another name is added to the stage") was
 * replaced with the real keynote-lineup teaser. If a new placeholder is
 * ever added for a not-yet-confirmed announcement, mark it "[Placeholder]"
 * in the title the same way and swap it for the real thing before it goes
 * live; do not publish a placeholder as-is.
 *
 * `link` is a plain underlined text link by default — right for "read
 * more" style references to another page. Give it `style: "button"` when
 * the update itself IS the call to action (a ticket push, a booking
 * deadline) and it should render as the site's one shared gold, glowing
 * button (components/Btn.tsx) instead — added 21 September 2026 for the
 * early-bird-sold-out update below, at ICL's request ("a button linking to
 * TikoHub, gold in colour and glowing"), rather than inventing a one-off
 * button style just for this card.
 *
 * `media` is optional — a text-only update is fine — but when a card has a
 * photo or clip from the activity, it goes here rather than inline in
 * `body`. Three shapes, all rooted in the same two drop-zones, so nobody
 * has to guess a path:
 *   - One photo → public/img/updates/, referenced as "/img/updates/<file>.webp"
 *     (or .jpg). Always give real `alt` text — it is the only description
 *     a screen reader gets. Defaults to filling the card's fixed 16:9 box
 *     edge-to-edge (`object-cover`, cropping whatever overflows) like every
 *     other card's media — right for a photo. Set `fit: "contain"` instead
 *     for a designed graphic that has to be seen whole and uncropped (a
 *     flyer, a poster) — added 21 September 2026 for the early-bird-sold-out
 *     flyer below, at ICL's request ("display fully, not just half of it").
 *     `contain` letterboxes into the box's own bg-raise background rather
 *     than stretching or cropping, so use it for graphics, not photos.
 *   - Several photos from the same activity → `gallery`, same folder and
 *     naming rule, rendered in-card as a slow auto-advancing slideshow
 *     (components/UpdateGallery.tsx) rather than four separate cards for
 *     one event. Every image still needs its own real `alt` text — the
 *     gallery does not fall back to a shared caption. Each image can also
 *     carry its own `caption`, shown as a bottom scrim bar that crossfades
 *     in lockstep with its photo (added 21 September 2026 for the keynote
 *     lineup card below, so the name on screen always matches the face) —
 *     omit it for a gallery where the images don't need individual labels,
 *     like the Zetech MoU photos below. Like the single-image case, a
 *     gallery defaults to filling the card's fixed portrait frame
 *     (`object-cover`) — fine for photos shot to roughly match it, but a
 *     landscape event photo cropped into that frame can lose a third of
 *     its width. Set `fit: "contain"` on the gallery itself (not per
 *     image) to letterbox every photo in the set uncropped instead —
 *     added 25 September 2026 for the Zetech MoU gallery below, at ICL's
 *     request ("they need to be visible for this post").
 *   - Clips → public/video/updates/, referenced as "/video/updates/<file>.mp4",
 *     with a `poster` still frame from the same folder so the card never
 *     shows a black box before someone presses play.
 * See public/img/updates/README.md and public/video/updates/README.md for
 * the exact format/size guidance.
 */
export type SummitUpdate = {
  date: string; // ISO, e.g. "2026-09-20"
  tag: "Speakers" | "Papers" | "Partners" | "Tickets";
  title: string;
  body: string;
  /** True for the one card that should carry the clay-red urgency glow —
   *  currently just the early-bird-sold-out update. Not tied to `tag`: a
   *  future Tickets update ("tickets now open", say) should not glow, so
   *  this is its own explicit flag rather than inferred from the tag.
   *  Added 23 September 2026, alongside the same glow on the ticket tile,
   *  the sticky bar and the floating ticker — everywhere the site already
   *  says the early bird is gone. */
  urgent?: boolean;
  link?: { href: string; text: string; style?: "button" };
  media?:
    | { type: "image"; src: string; alt: string; fit?: "cover" | "contain" }
    | { type: "video"; src: string; poster: string }
    | { type: "gallery"; images: readonly { src: string; alt: string; caption?: string }[]; fit?: "cover" | "contain" };
};

export const SUMMIT_UPDATES: readonly SummitUpdate[] = [
  {
    date: "2026-09-21",
    tag: "Tickets",
    urgent: true,
    title: "Early bird sold out. The room is filling fast.",
    body: `The first release is gone — thank you for showing up for this the way you did. Standard tickets are live now at ${TICKET_PRICE}, and if the early bird's pace is anything to go by, this batch won't last long either. 7.4 million Kenyan SMEs are represented in that room on October 15 — don't be the one still deciding when it sells out again.`,
    link: { href: EVENT.ticketUrl, text: TICKET_CTA, style: "button" },
    media: {
      type: "image",
      src: "/img/updates/early-bird-sold-out.webp",
      alt: "Africa SME Summit 2026 flyer: the early bird ticket pass is sold out, with standard tickets available at africasmesummit.com for KES 6,800.",
      fit: "contain",
    },
  },
  {
    date: "2026-09-20",
    tag: "Papers",
    title: "The call for papers is open again",
    body: `Submissions reopened and now run until ${PAPERS_SUBMISSION_LABEL}, with every submitter hearing back by ${PAPERS_NOTIFY_LABEL}. If you already sent an abstract before the original deadline, it's still in — no need to resend.`,
    link: { href: "/papers", text: "Read the call for papers" },
  },
  {
    date: "2026-09-16",
    tag: "Partners",
    title: "From partnership to action: Zetech University signs on",
    body: "Eng. Mike Mutungi, CEO of I Choose Life – Africa, and Prof. Njenga Munene, Vice Chancellor of Zetech University, have signed an MoU bringing academia and industry together on the road to the summit. It opens the door to student internships and placements, collaborative research and innovation, and two-way knowledge and resource sharing — starting with a joint research focus on artificial intelligence in education technology, alongside Victor Sila, founder of JuaPath, an AI tutor piloting in Kenya with a reach of 12.6 million learners.",
    link: { href: "/partner", text: "See partnership packages" },
    media: {
      type: "gallery",
      fit: "contain",
      images: [
        {
          src: "/img/updates/zetech-mou-handshake-document.webp",
          alt: "Eng. Mike Mutungi and Prof. Njenga Munene shake hands while holding the signed memorandum of understanding between I Choose Life – Africa and Zetech University.",
        },
        {
          src: "/img/updates/zetech-mou-signing-closeup.webp",
          alt: "Eng. Mike Mutungi and Prof. Njenga Munene each hold open folders containing the signed MoU in front of the Zetech University event backdrop.",
        },
        {
          src: "/img/updates/zetech-mou-group-photo.webp",
          alt: "Leaders from I Choose Life – Africa, Zetech University and JuaPath gather together after the MoU signing, including Victor Sila in a red JuaPath cap.",
        },
        {
          src: "/img/updates/zetech-mou-working-session.webp",
          alt: "Delegates from I Choose Life – Africa, Zetech University and JuaPath in a working session around the table, with the Zetech University banner in the background.",
        },
      ],
    },
  },
  {
    date: "2026-09-21",
    tag: "Speakers",
    title: "Four names taking the stage before the tracks open",
    body: "Two Vice-Chancellors, the summit's own convener, and the CEO of Kenya's Teachers Service Commission — the keynote lineup is confirmed, and it sets the tone for everything that follows. This is the room you'll be walking into on October 15.",
    link: { href: "/speakers", text: "Meet the full keynote lineup" },
    // Images and alt text pulled straight from KEYNOTES rather than
    // retyped — added 21 September 2026 at ICL's request, replacing the
    // last "[Placeholder]" card with a teaser of the confirmed keynote
    // portraits instead of one more named announcement. Because this
    // derives from KEYNOTES, it stays correct on its own if a fifth
    // keynote is ever added or the order changes — nothing here needs a
    // hand edit the way the other cards' media does.
    media: {
      type: "gallery",
      images: KEYNOTES.map((k) => ({
        src: k.photo,
        alt: `${k.name}, ${k.role}, ${k.org}`,
        // Shown as the crossfading caption under the portrait — kept short
        // (name + role/org, not the full bio) since it has to fit a
        // two-line scrim bar on a phone-width card. Same derive-don't-
        // retype reasoning as `alt` above.
        caption: `${k.name} — ${k.role}, ${k.org}`,
      })),
    },
  },
] as const;


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
