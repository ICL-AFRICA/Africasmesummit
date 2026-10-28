/**
 * Lists every figure in lib/africa-data.ts with its source and age, and flags
 * the ones that need re-checking. Run before each release:
 *
 *     node scripts/check-figures.mjs
 *
 * A figure is flagged when it was PUBLISHED more than 2 years ago ("ageing"),
 * or last CHECKED more than 12 months ago ("unchecked"). Exit code is 0 either
 * way — this informs, it does not block a build. Pass --strict to make a
 * flagged figure exit 1 (for use in CI if you want it to).
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const src = readFileSync(path.join(ROOT, "lib/africa-data.ts"), "utf8");
const body = src.slice(src.indexOf("export const AFRICA_FIGURES"), src.indexOf("] as const;"));
const entries = body.split(/\n  \{\n/).slice(1).map((e) => "\n" + e);
const pick = (e, k) => (e.match(new RegExp(`\\n    ${k}: "((?:[^"\\\\]|\\\\.)*)"`)) || [])[1];

const today = new Date();
const months = (iso) => (today - new Date(iso)) / (1000 * 60 * 60 * 24 * 30.44);
let flagged = 0;

console.log(`Figures in lib/africa-data.ts — checked ${today.toISOString().slice(0, 10)}\n`);
for (const e of entries) {
  const id = pick(e, "id");
  const value = pick(e, "value");
  const scope = pick(e, "scope");
  const source = pick(e, "source");
  const published = pick(e, "publishedOn");
  const checked = pick(e, "checkedOn");
  const flags = [];
  if (months(published) > 24) flags.push(`ageing: published ${Math.floor(months(published) / 12)} yrs ago`);
  if (months(checked) > 12) flags.push("unchecked for over 12 months");
  if (flags.length) flagged++;
  console.log(`${flags.length ? "!" : "✓"} ${id.padEnd(12)} ${value.padEnd(16)} ${scope}`);
  console.log(`    ${source} · published ${published} · checked ${checked}`);
  for (const f of flags) console.log(`    → ${f}`);
}
console.log(`\n${flagged} of ${entries.length} figures need attention.`);
if (flagged && process.argv.includes("--strict")) process.exit(1);
