# Setup — start to live

About 45 minutes of work, plus DNS propagation. Do the steps in order; each
depends on the one before it.

---

## Before you start

**Do I need Supabase?** No. The site stores nothing and reads nothing — no
accounts, no sessions, no database. It is nine pages of HTML built once and
served from a CDN. Tickets go to TikoHub, forms go to Formspree, and content
lives in one TypeScript file that is baked in at build time.

**What you need to hand:**

- Node 18 or newer (`node -v`)
- A GitHub account
- A Vercel account
- Access to DNS for `africasmesummit.com`

---

## Step 1 — Run it locally

```bash
cd ~/code                       # wherever you keep projects
# copy the africasmesummit folder here, then:
cd africasmesummit

npm install
npm run dev
```

Open **http://localhost:3000**.

Click through all nine routes and confirm each loads:

`/` · `/speakers` · `/partner` · `/exhibit` · `/papers` · `/contact` ·
`/privacy` · and a made-up URL like `/nonsense` for the 404.

Two things to check specifically:

- **The floating ticker** appears bottom-right after about 1.5 seconds on
  desktop. Dismiss it, reload — it should stay gone. To bring it back, clear
  `asm-ticker-dismissed` in DevTools → Application → Local Storage.
- **At phone width** (DevTools responsive mode, 390px) the ticker is gone
  and a gold bar sits at the top instead.

---

## Step 2 — Check the production build

```bash
npm run build
```

Writes static HTML to `out/`. **Never push without running this.** If it
fails locally it will fail on Vercel, and you would rather see the error in
your terminal than in a deploy log.

---

## Step 3 — Forms

The only external service. Without it, forms fall back to opening a
pre-filled email. Nothing breaks, but you lose roughly half the people who
would have submitted and you get no record of who tried.

1. Go to **formspree.io**, create an account
2. New form, name it "Africa SME Summit"
3. Set the notification email to whoever actually reads enquiries
4. Copy the endpoint — it looks like `https://formspree.io/f/xayzabcd`
5. Paste it into `lib/event.ts`:

```ts
export const FORM_ENDPOINT = "https://formspree.io/f/xayzabcd";
```

6. `npm run dev`, submit the contact form, confirm it arrives

Free tier is 50 submissions a month, too few for a conference push. Paid is
around $10/month — worth it for the months either side.

---

## Step 4 — Git and GitHub

```bash
git init
git add .
git commit -m "Africa SME Summit site"
```

Create an **empty private repo** on GitHub named `africasmesummit` — no
README, no .gitignore, no licence, since the project already has them.

```bash
git remote add origin https://github.com/YOUR-USERNAME/africasmesummit.git
git branch -M main
git push -u origin main
```

---

## Step 5 — Vercel

1. **vercel.com** → Add New → Project → import `africasmesummit`
2. Framework preset: **Next.js** (detected automatically)
3. Build command and output directory: leave as detected
4. Environment variables: **none**
5. Deploy

You get a `.vercel.app` URL in about a minute. Open every page on it,
including on an actual phone rather than a resized browser window.

From here every push to `main` deploys automatically, and every pull request
gets its own preview URL — useful for showing Mike a change before it goes
live.

---

## Step 6 — Domain

Vercel → Project → Settings → Domains → add `africasmesummit.com`.

Vercel shows the exact records to create. At your registrar you will add
something like:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

**Use the values Vercel shows you, not this table** — they do change.

Add **`africasmeconference.com`** in the same screen as a redirect to the
primary. You own it; point it somewhere.

DNS takes ten minutes to a few hours. HTTPS is automatic once it resolves.

---

## Step 7 — Email on the domain

The site tells people to write to `info@africasmesummit.com`. That address
has to exist before launch.

Google Workspace is about $6/user/month. A free forwarding rule at your
registrar sending `info@` to an inbox someone already reads is fine to start.

---

## Step 8 — Redirect the old page

On launch day, 301 `ichooselife.global/sustainable-business-summit` to
`africasmesummit.com`.

Without it you have two live pages disagreeing about the event, and the old
one has more search history — so it will outrank you for your own name.

---

## Before you announce it

**Blocking — these need someone other than you:**

- [ ] **Create the Standard Delegate Pass on TikoHub.** The flyer and this
      site both promise KES 6,800 from 1 September. The only 6,800 item on
      TikoHub is the Papers Call ticket, a different product. As things
      stand, anyone arriving on 1 September has nothing to buy.
- [x] **Speaker bios approved.** Done. All seven `bio` entries in
      `lib/event.ts` are now the speakers' own words, supplied via
      `Marketing/speaker-bios-cleaned.md` and marked `draft: false`. A
      speaker added later with a bio drafted from a job title must be marked
      `draft: true` and approved before launch.
- [ ] **Sponsorship inclusions confirmed with Mike.** Tier names and prices
      are verified against the TikoHub listing and correct; what each tier
      *includes* is a draft. The TikoHub listing carries no inclusions for
      any package, so it cannot settle them — the sponsorship deck is what
      is needed. `/partner` marks the bullets indicative via
      `SPONSOR_INCLUDES_NOTE` in the meantime; delete that note once the
      real inclusions land. Someone paying KES 1,000,000 will expect every
      line.
- [ ] **Exhibition booth inclusions confirmed.** Same problem as the
      sponsorship tiers and not previously flagged: `STAND_OPTIONS` prices
      match TikoHub, the bullets are not from any rate card.
- [ ] **How many delegate passes an exhibitor gets.** The FAQ says the
      exhibitor package includes two; the Corporate booth says four. One of
      them is wrong.
- [ ] **Privacy page reviewed by ICL.** It makes claims about data handling
      that need to be true.

**Dated — 1 September, and two separate things land on it:**

- [ ] **Redeploy the site on or after 00:00, 1 September.** Not optional, and
      not the same as the countdown.

      Which ticket tier the site quotes — every "Get a ticket" button, the
      search-result description and the structured data Google reads — is
      decided when the site is **built**, not when someone visits it. This is
      a static export: `npm run build` writes finished HTML and that HTML is
      what sits on the CDN. The early-bird deadline passing does not reach
      into a file that was written in August. Nothing changes on its own.

      So on 1 September, with no redeploy, every ticket button on the site
      still reads **KES 5,800** — a price that expired at midnight — and will
      keep reading it until someone builds the site again.

      The fix is not an edit. Push anything to `main` and Vercel rebuilds,
      the build sees the deadline has passed, and every one of those places
      switches to KES 6,800 together. An empty commit is enough:

      ```bash
      git commit --allow-empty -m "Rebuild for standard rate" && git push
      ```

      Then load the site and confirm a ticket button reads KES 6,800.

      (The countdown and the early-bird bar are different — those run in the
      visitor's browser and genuinely do remove themselves at the deadline
      with nothing deployed. That is why this one is easy to miss.)

- [ ] **The Standard Delegate Pass must exist on TikoHub by the same
      moment.** See the first blocking item above. These two collide: the
      redeploy makes every button advertise KES 6,800, and if that ticket
      still does not exist on TikoHub, the site now sends people to a
      checkout with nothing at that price. Doing one without the other is
      worse than doing neither. Create the pass first, then redeploy.

**Yours:**

- [ ] `FORM_ENDPOINT` set, test submission received
- [ ] `info@africasmesummit.com` receiving mail
- [ ] Every page opened on a real phone
- [ ] 301 from the old ICL page
- [ ] Sitemap submitted in Google Search Console

**Not blocking:**

- [ ] Sharper speaker headshots for five of the seven. `speaker-1` to
      `speaker-5` are extracted from the printed flyer: adequate, not sharp.
      Ask those five for the original and drop it into `public/img/` with the
      same filename. `speaker-6` and `speaker-7` are supplied originals and
      need nothing.
- [ ] Photography from a previous ICL conference to replace the stock hero
      images in `public/img/hero/`
- [ ] Confirmed agenda — `AGENDA` is marked indicative on the page

---

## Changing things later

**Almost everything lives in `lib/event.ts`** — dates, prices, speakers,
tracks, agenda, FAQ, partners.

```bash
# edit lib/event.ts
git add . && git commit -m "Update agenda" && git push
```

Live in about 60 seconds.

**Dates especially:** `EARLY_BIRD_ENDS` is the only place the deadline is
written. Every label, both countdowns and the schema.org offer derive from
it. When it passes on 31 August the ticker and the bar remove themselves —
nothing to deploy on the day.

**The brand:** `public/logo/` holds every logo variant, and
`public/logo/BRAND.md` has the palette, the type rules and the spacing rules.
Read it before making anything new.

The generator scripts live in `scripts/`, not beside their output — anything
under `public/` is copied to `out/` and served, so while they sat there they
were downloadable from the live domain. `docs/logo.md` explains what each one
draws and how to run it.
