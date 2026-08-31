# Privacy page — review notes for I Choose Life – Africa

**Page:** africasmesummit.com/privacy
**Status:** draft, and currently says so in public (see §4)
**Prepared for:** ICL review before launch

These notes are a technical audit of what the site actually does, set against
what the privacy page currently claims. They are not legal advice. Several
items need a decision from ICL as the data controller, and a few may need
whoever advises ICL on the Data Protection Act 2019.

Work through §4 first — those two are the only items that need fixing before
launch regardless of what else is decided.

---

## 1. What the site actually does — verified against the code

Check the page text against this list, not against memory of what was
intended.

**Forms.** Four forms, all submitting to **Formspree** (`formspree.io`), a
third-party service. Nothing is stored on the site itself — it is a static
site with no database and no server. What each form collects:

| Form | Fields |
|---|---|
| Contact | name, email, phone, topic, message |
| Partner | name, organisation, email, phone, tier of interest, message |
| Exhibit | name, business name, email, phone, booth choice, what you'll show |
| Papers | name, institution, email, track, paper title, abstract |

**Advertising tracking — two tags, added 26 and 31 August 2026.** The site
loads the **Meta Pixel** (id 1700326121192587) and the **LinkedIn Insight
Tag** (partner id 9923012) on every page. Meta requests
`connect.facebook.net`, sets its cookies, and reports a page view on first
load and again on each in-site navigation. LinkedIn requests
`snap.licdn.com` and beacons to `px.ads.linkedin.com`, and reports only the
page someone lands on — it has no documented way to report later navigations.
There is still no Google Analytics and **no consent-management script** — see
question 10.

Until this date the site made no third-party requests at all, and these notes
said so as their strongest finding. That is no longer true and the sections
below have been rewritten rather than annotated.

**Cookies.** Meta's pixel sets its own cookies (`_fbp`, and `_fbc` if someone
arrives from a Facebook ad) to recognise a returning browser. Separately, one
item is stored on the visitor's own device: a localStorage key
`asm-ticker-dismissed`, which remembers that someone closed the early-bird
banner. That one is functional only, carries no identifier and never leaves
the device.

**Fonts — resolved since these notes were first drafted.** The site used to
load three typefaces from `fonts.googleapis.com` and `fonts.gstatic.com`,
which sent every visitor's IP address and browser details to Google on every
page view. The one font actually in use is now downloaded at build time and
served from our own origin; the other two were never referenced by anything
and have been removed.

Verified in a browser with the network recorded: loading the homepage now
contacts **no external host at all**. Nothing to disclose, and nothing
transferred.

**Hosting.** The site is served by Vercel, which keeps standard server access
logs including IP addresses.

**Ticketing.** Handled entirely off-site by TikoHub. Payment details never
touch this site.

---

## 2. Section-by-section review

**"What we collect"** — currently says *"the name, email, phone number and
message you entered. We do not collect anything else from this website."*

- Incomplete. The forms also collect **organisation, business name,
  institution, paper title and abstract**, and the topic/tier/booth/track
  selections. Someone submitting an abstract is sending considerably more
  than a message.
- "We do not collect anything else from this website" is now nearly true.
  The font requests to Google are gone, so the only remaining item is
  Vercel's server access logs, which record IP addresses as any web server
  does.
- **Decide:** widen the list to match the forms, and add one line about
  hosting logs.

**"What we do with it"** — currently references *"the ticketing provider"*
without naming it.

- **Decide:** name TikoHub and link its terms, so a delegate can actually go
  and read them. As written, the reader has no way to find out who holds
  their payment data.
- The claim that ICL receives "name and contact details for the delegate
  list" needs confirming — is that what TikoHub actually passes to ICL?

**"What we do not do"** — *"we do not sell your information and we do not
pass it to sponsors, exhibitors or partners without asking you first."*

- This is a promise about future conduct. **Confirm ICL can keep it**,
  particularly the sponsor clause: sponsors at KES 1,000,000 may well expect
  a delegate list, and this sentence says they only get one with consent.
  Worth checking against what has been offered verbally to sponsors.

**"How long we keep it"** — *"Enquiry messages are kept for two years."*

- **Who enforces this?** Messages live in Formspree and in whichever inbox
  they are forwarded to. Two years is a claim about deletion that nothing
  currently performs. Either set retention in Formspree and diarise the
  inbox clear-out, or change the sentence to what will really happen.

**"Photography at the summit"** — opt-out by telling the registration desk.

- **Confirm the desk will actually have a mechanism** on the day — a list, a
  different lanyard colour, something. A published opt-out that registration
  staff have not been briefed on is worse than none.
- Consider whether a notice at the venue entrance is also wanted.

**"Getting in touch"** — points at `sharon@africasmesummit.com`.

- **Was broken, now needs one check.** The page originally named
  `info@africasmesummit.com`, which was never created, so the one route it
  offered for exercising data rights went nowhere. It has since moved twice
  and now points at `sharon@africasmesummit.com`. The domain has MX records
  and accepts mail — but **send a test to that exact address and confirm it
  arrives**, because this is the address a data subject is told to use.
- Still worth deciding *who inside ICL* monitors it for data requests — see
  question 7.

---

## 3. Gaps — present in most Kenyan privacy notices, absent here

None of these are drafting errors; they are decisions nobody has made yet.

- **Who the controller is.** The page never names I Choose Life – Africa as
  the organisation responsible, and gives no postal address. A reader cannot
  tell who holds their data.
- **ODPC registration.** Does ICL hold a registration with the Office of the
  Data Protection Commissioner, and should the number appear on the page?
- **Legal basis** for processing — consent, legitimate interest, or contract
  — is not stated for any of the three uses (replying, delegate list, summit
  organisation).
- **Cross-border transfer.** Formspree, Vercel and now **Meta** are all
  outside Kenya, and Meta is the one that matters most — it receives
  behavioural data, not just a form or a log line. The DPA has specific
  requirements for transfers abroad. `/privacy` now names all three; whether
  naming them is sufficient is the legal question.
- **Third parties are not named.** Formspree in particular processes every
  enquiry and is invisible in the current text.
- **Local storage** is not mentioned. Minor and functional, but disclosed by
  most notices.
- **How to complain.** No mention of the right to complain to the ODPC.
- **How rights are exercised in practice.** The page offers access,
  correction and deletion — who receives those requests, and who acts on
  them, within what time?

---

## 4. Two things to fix before launch, regardless

**~~The rights contact is a dead address.~~ Fixed.** The page pointed at
`info@africasmesummit.com`, which was never created — so the one route it
offered for exercising data rights went nowhere. The whole site now uses
`sharon@africasmesummit.com`. The domain accepts mail; confirm the alias
itself delivers. Left on the record because it was the most serious item in
these notes, and because the address has now changed twice.

**The page publicly labels itself a draft.** At the bottom it reads
*"Draft — to be reviewed by I Choose Life – Africa before launch."* That is
visible to every visitor. It is honest while the site is in preparation, but
it should come off once ICL signs off — a privacy notice that announces it is
provisional undermines the assurance it exists to give.

---

## 5. Questions for ICL

Answers to these are enough to finish the page.

1. Is ICL registered with the ODPC, and should the registration appear?
2. Which entity is the data controller, and what postal address should be
   published?
3. Is two years the real retention period, and who will action deletions?
4. What does TikoHub actually pass to ICL, and may we name and link them?
5. Can the "no sharing with sponsors without asking" promise be kept as
   written?
6. Has anyone sent a test message to `sharon@africasmesummit.com` and seen
   it arrive? The site now sends every enquiry and every data-rights request
   there.
7. Who inside ICL receives access/correction/deletion requests?
8. Will the registration desk have a workable photography opt-out?
9. ~~Does ICL want to keep loading fonts from Google?~~ **Done — fonts are
   now self-hosted and no visitor data goes to Google.** No decision needed;
   noted here so the change is on the record for the review.
10. **Both advertising tags fire on page load, for everyone, before anyone
    has agreed to anything.** Disclosure is now on `/privacy`. The open question
    is whether the DPA requires *consent* — a banner that holds the pixel
    until someone accepts — rather than disclosure after the fact. This is
    the one item on this list that changes what the site does, not just what
    it says, and it now covers two trackers rather than one. Nobody has been
    asked yet.

---

## 6. Worth saying out loud on the page

~~The site runs no analytics, no advertising pixels and no tracking cookies.~~

**This section is withdrawn.** It was the strongest thing this notice had to
say, and the Meta Pixel ended it on 26 August 2026. Left visible rather than
deleted so the review has an accurate history: for a period this site made no
third-party requests at all, that was verified in a browser, and it was given
up deliberately for advertising measurement. If the pixel is ever removed,
this is the claim that becomes available again.
