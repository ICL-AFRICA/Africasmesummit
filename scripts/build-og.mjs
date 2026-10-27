/**
 * The social share card (public/og.jpg), built from lib/event.ts.
 *
 * og.jpg is what WhatsApp, LinkedIn and X show when the link is shared. It is
 * a picture, so nothing derived in code can reach it — this script is how it
 * stays in step with NEXT_SUMMIT. Rewritten 19 October 2026 for the 2027
 * summit: the old version only repainted the date line over a 2026 card; the
 * 2027 card is composed from scratch every run (no input image to drift), so
 * the script is plainly idempotent.
 *
 * What it draws: the ink field, "Africa SME Summit 2027" (2027 in gold), the
 * tagline, and "<label> · <venue>, Nairobi", beside a photograph from the
 * 2026 summit cut to the shape of Africa (the outline is the clipPath in
 * public/logo/map-mark-tight.svg).
 *
 * Rendered in headless Chrome so the type uses the same system stack the
 * site does. On a Mac it finds Google Chrome and converts with `sips`; set
 * CHROME=/path/to/chrome to override (Linux: also needs ImageMagick `convert`).
 *
 *     node scripts/build-og.mjs
 *
 * After running, bump nothing by hand: app/layout.tsx keys the image URL on
 * NEXT_SUMMIT.label, so a changed label changes the URL and the platforms'
 * caches. If you rebuild without changing the label, the URL stays the same
 * and WhatsApp/LinkedIn may keep the old picture for a while.
 */
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OG = path.join(ROOT, "public/og.jpg");
const PHOTO = path.join(ROOT, "public/img/summit/8232.webp");
const MARK = readFileSync(path.join(ROOT, "public/logo/map-mark-tight.svg"), "utf8");
const MAC_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CHROME = process.env.CHROME || (existsSync(MAC_CHROME) ? MAC_CHROME : "google-chrome");

const ev = readFileSync(path.join(ROOT, "lib/event.ts"), "utf8");
const block = ev.match(/export const NEXT_SUMMIT = \{([\s\S]*?)\} as const;/)[1];
const get = (k) => block.match(new RegExp(`${k}:\\s*"([^"]+)"`))[1];
const NAME = ev.match(/export const EVENT = \{[\s\S]*?name:\s*"([^"]+)"/)[1];
const year = block.match(/year:\s*(\d{4})/)[1];
const label = get("label");
const venue = get("venue");
const tagline = get("tagline");

const d = MARK.match(/<clipPath[^>]*><path d="([^"]+)"/)[1];
const vb = MARK.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number); // x y w h

const MAP_H = 520;
const MAP_W = (MAP_H * vb[2]) / vb[3];

const dir = mkdtempSync(path.join(tmpdir(), "og-"));
writeFileSync(path.join(dir, "card.html"), `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;width:1200px;height:630px;overflow:hidden}
  .card{position:relative;width:1200px;height:630px;color:#fff;
        background:radial-gradient(900px 600px at 85% 40%,#2A2460 0%,#191539 60%,#12102B 100%);
        font-family:-apple-system,system-ui,"Helvetica Neue",Arial,sans-serif}
  .eyebrow{position:absolute;left:68px;top:74px;font-size:22px;letter-spacing:.18em;text-transform:uppercase;color:#E3A428;font-weight:600}
  h1{position:absolute;left:68px;top:128px;margin:0;width:600px;font-family:Georgia,"Times New Roman",serif;
     font-weight:700;font-size:92px;line-height:1.04;letter-spacing:-.01em}
  h1 span{color:#E3A428}
  .tag{position:absolute;left:68px;top:340px;width:540px;font-size:30px;line-height:1.3;color:#fff}
  .when{position:absolute;left:68px;bottom:66px;display:flex;align-items:center;gap:14px;font-size:28px;font-weight:600}
  .pill{background:#E3A428;color:#191539;border-radius:999px;padding:10px 22px}
  svg{position:absolute;right:56px;top:55px}
</style>
<div class="card">
  <div class="eyebrow">Nairobi · Kenya</div>
  <h1>Africa SME<br>Summit <span>${year}</span></h1>
  <div class="tag">${tagline}</div>
  <div class="when"><span class="pill">${label}</span><span>${venue}, Nairobi</span></div>
  <svg width="${MAP_W.toFixed(1)}" height="${MAP_H}" viewBox="${vb.join(" ")}">
    <defs><clipPath id="af"><path d="${d}"/></clipPath></defs>
    <g clip-path="url(#af)">
      <image href="file://${PHOTO}" x="${vb[0] - vb[2] * 0.55}" y="${vb[1]}" width="${vb[2] * 2.1}" height="${vb[3]}" preserveAspectRatio="xMidYMid slice"/>
    </g>
    <path d="${d}" fill="none" stroke="#E3A428" stroke-width="1.6" stroke-linejoin="round"/>
  </svg>
</div>`);

execFileSync(CHROME, ["--headless", "--no-sandbox", "--allow-file-access-from-files", "--disable-gpu", "--hide-scrollbars",
  "--force-device-scale-factor=1", "--virtual-time-budget=4000",
  "--window-size=1200,900", `--screenshot=${path.join(dir, "og.png")}`,
  `file://${path.join(dir, "card.html")}`], { stdio: "ignore" });

/* The window is rendered taller than the card (headless Chrome's viewport can
   come out shorter than --window-size on some builds, which left a white band
   at the bottom), then cropped to exactly 1200x630 from the top. */
if (process.platform === "darwin") {
  execFileSync("sips", ["-c", "630", "1200", "--cropOffset", "0", "0",
    path.join(dir, "og.png"), "--out", path.join(dir, "og-crop.png")], { stdio: "ignore" });
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "88",
    path.join(dir, "og-crop.png"), "--out", OG], { stdio: "ignore" });
} else {
  execFileSync("convert", [path.join(dir, "og.png"), "-crop", "1200x630+0+0", "+repage", "-quality", "88", OG], { stdio: "ignore" });
}

console.log(`og.jpg rebuilt — "${NAME} ${year} · ${label} · ${venue}"`);
