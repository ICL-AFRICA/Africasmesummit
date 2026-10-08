/**
 * Builds the downloadable Jiinue Business Accelerator syllabus:
 *   public/programme/jiinue-business-accelerator-syllabus.pdf
 *
 * Three A4 pages, one per month. The content is read straight from
 * ACCELERATOR_MONTHS in lib/event.ts, so the PDF and the /accelerator page
 * can never disagree — edit the curriculum there, then re-run this script.
 *
 *   node scripts/build-accelerator-syllabus.mjs
 *
 * Needs Node 22.18+ (imports the .ts file directly) and Playwright with a
 * Chromium it can launch. Playwright is not a dependency of the site; point
 * at an install with PLAYWRIGHT_MODULE=/path/to/node_modules/playwright and,
 * if its bundled browser isn't present, CHROMIUM_PATH=/path/to/chromium.
 */
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const { ACCELERATOR, ACCELERATOR_MONTHS, ACCELERATOR_SYLLABUS, EVENT } =
  await import(pathToFileURL(path.join(root, "lib/event.ts")).href);

const out = path.join(root, "public", ACCELERATOR_SYLLABUS.url);

/* Brand colours from CLAUDE.md, rotated per month exactly as /accelerator does. */
const ACCENT = ["#E3A428", "#3F6FA8", "#4F9367"];
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const total = ACCELERATOR_MONTHS.reduce((n, m) => n + m.sessions.length, 0);

const page = (m, i) => `
  <section class="page" style="--accent:${ACCENT[i % ACCENT.length]}">
    <header>
      <p class="eyebrow">${esc(ACCELERATOR.name)} · Syllabus</p>
      <p class="month">Month ${m.month} of ${ACCELERATOR_MONTHS.length}</p>
      <h1>${esc(m.title)}</h1>
      ${i === 0 ? `<p class="cover">${total} sessions across ${ACCELERATOR_MONTHS.length} months, from a baseline diagnostic to a final pitching competition and graduation.</p>` : ""}
    </header>
    <div class="grid">
      ${m.sessions.map((s) => `
        <article>
          <p class="num">Session ${String(s.number).padStart(2, "0")}</p>
          <h2>${esc(s.title)}</h2>
          ${s.subtitle ? `<p class="sub">${esc(s.subtitle)}</p>` : ""}
          <h3>Learning objective</h3>
          <p>${esc(s.objective)}</p>
          <h3>Key deliverables</h3>
          <ul>${s.deliverables.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        </article>`).join("")}
    </div>
    <footer>
      <p>Start today at <a href="${ACCELERATOR.url}">${ACCELERATOR.url.replace("https://", "")}</a></p>
      <p>Introduced at the ${esc(EVENT.name)} ${EVENT.year} · africasmesummit.com/accelerator</p>
    </footer>
  </section>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 0 }
  * { box-sizing: border-box; margin: 0 }
  body { font-family: 'DejaVu Sans', Arial, sans-serif; color: #191539; background: #FBF8F3 }
  .page { width: 210mm; height: 297mm; position: relative; page-break-after: always; overflow: hidden }
  header { background: #191539; color: #fff; padding: 13mm 15mm 10mm; border-bottom: 2.4mm solid var(--accent) }
  .eyebrow { font-size: 8.5pt; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); font-weight: 700 }
  .month { font-size: 11pt; margin-top: 7mm; color: var(--accent); font-weight: 700 }
  h1 { font-size: 22pt; line-height: 1.15; margin-top: 2mm }
  .cover { font-size: 10.5pt; line-height: 1.5; margin-top: 4mm; max-width: 150mm }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; padding: 9mm 15mm 0 }
  article { background: #fff; border: 1px solid #e4dfd5; border-top: 1.6mm solid var(--accent); border-radius: 2mm; padding: 5mm 5.5mm 5mm; min-height: 94mm }
  .num { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; font-weight: 700; color: #6E6884 }
  h2 { font-size: 13.5pt; line-height: 1.25; margin-top: 2mm }
  .sub { font-size: 10.5pt; margin-top: 1mm; color: #6E6884 }
  h3 { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; margin-top: 4mm; color: #3F6FA8 }
  article p:not(.num):not(.sub) { font-size: 10.5pt; line-height: 1.5; margin-top: 1.2mm }
  ul { list-style: none; padding: 0; margin-top: 1.4mm }
  li { font-size: 10.5pt; line-height: 1.45; margin-top: 1.4mm; padding-left: 4.5mm; position: relative }
  li::before { content: "✓"; position: absolute; left: 0; color: var(--accent); font-weight: 700 }
  footer { position: absolute; left: 0; right: 0; bottom: 0; background: #191539; color: #fff; padding: 6mm 15mm; font-size: 9pt; line-height: 1.6 }
  footer a { color: var(--accent); font-weight: 700; text-decoration: none }
</style></head><body>${ACCELERATOR_MONTHS.map(page).join("")}</body></html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const p = await browser.newPage();
await p.setContent(html);
await p.pdf({ path: out, format: "A4", printBackground: true });
await browser.close();
console.log("wrote", path.relative(root, out));
