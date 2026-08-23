/**
 * The social share card, with the date taken from lib/event.ts.
 *
 * og.jpg is what WhatsApp, LinkedIn and X show when the link is shared, and
 * it is a picture — so the derived date that fixed every page on the site
 * could not reach it. It still read "30 September 2026" for nine days after
 * the summit moved, which is the one place a stale date is hardest to spot:
 * nobody visits the share card, they only forward it.
 *
 * This repaints ONLY the date line and leaves the photography, the headline
 * and the map mark untouched, so re-running cannot drift the design. It is
 * idempotent: the regions it preserves are never the regions it writes, so
 * og.jpg can safely be both input and output.
 *
 * The patch is rendered in Chrome rather than drawn with a graphics library,
 * so the type is set with the same font stack the site itself resolves to.
 *
 *     node scripts/build-og.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OG = path.join(ROOT, "public/og.jpg");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/* Measured off the existing card, not guessed: the date line's glyphs run
   y 539-555 and start at x 65, in the brand grey used for muted text on
   paper. The patch covers a little more than the line so no antialiased
   edge of the old text survives, and stops well short of the map mark. */
const BOX = { x: 58, y: 528, w: 560, h: 44 };
/* Tuned by measuring the render back against the original: 24px gave a 19px
   cap height where the card had 17, and sat 2px high. */
const TEXT = { x: 65, baseline: 558, size: 21.5, colour: "#6E6884" };

const ev = readFileSync(path.join(ROOT, "lib/event.ts"), "utf8");
const iso = ev.match(/const DATE_ISO = "([\d-]+)"/)[1];
const venueDetail = ev.match(/venueDetail: "([^"]+)"/)[1];
const date = new Date(`${iso}T09:00:00+03:00`).toLocaleDateString("en-GB", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi",
});
/* The card says "University of Nairobi", not the full venueDetail — the
   campus qualifier does not fit the line and adds nothing at this size. */
const place = venueDetail.replace(/,.*$/, "");
const line = `${date}  ·  ${place}`;

const dir = mkdtempSync(path.join(tmpdir(), "og-"));
writeFileSync(path.join(dir, "card.html"), `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;width:1200px;height:630px;overflow:hidden}
  .card{position:relative;width:1200px;height:630px}
  .card img{display:block;width:1200px;height:630px}
  .patch{position:absolute;left:${BOX.x}px;top:${BOX.y}px;width:${BOX.w}px;height:${BOX.h}px;background:#FBF8F3}
  .line{position:absolute;left:${TEXT.x}px;top:${TEXT.baseline}px;transform:translateY(-100%);
        font-family:-apple-system,system-ui,"Helvetica Neue",Arial,sans-serif;
        font-size:${TEXT.size}px;line-height:1;color:${TEXT.colour};white-space:pre}
</style>
<div class="card"><img src="file://${OG}"><div class="patch"></div><div class="line">${line}</div></div>`);

execFileSync(CHROME, ["--headless", "--disable-gpu", "--hide-scrollbars",
  "--force-device-scale-factor=1", "--virtual-time-budget=4000",
  "--window-size=1200,630", `--screenshot=${path.join(dir, "og.png")}`,
  `file://${path.join(dir, "card.html")}`], { stdio: "ignore" });

execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "88",
  path.join(dir, "og.png"), "--out", OG], { stdio: "ignore" });

console.log(`og.jpg rebuilt — "${line}"`);
