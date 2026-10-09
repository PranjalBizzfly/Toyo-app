// Finds visible text blocks that are drawn on top of each other.
// Usage: node scripts/overlap-audit.mjs [baseUrl] [--all] [--width=1440]
import { chromium } from "playwright";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3146").replace(/\/$/, "");
const width = Number((args.find((a) => a.startsWith("--width=")) || "--width=1440").split("=")[1]);
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!args.includes("--all")) {
  const seen = new Set();
  urls = urls.filter((u) => {
    const parts = u.split("/").filter(Boolean);
    if (parts[0] === "products" && parts.length <= 3) return true;
    const key = parts.map((p, i) => (i === 0 ? p : "*")).join("/");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
const found = {};
for (const u of urls) {
  try { await page.goto(base + u, { waitUntil: "networkidle", timeout: 30000 }); } catch { continue; }
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-in")));
  const res = await page.evaluate(() => {
    const desc = (e) => e.tagName.toLowerCase() + "." + String(e.className).trim().split(/\s+/).slice(0, 2).join(".");
    const vis = (e) => { const s = getComputedStyle(e); return s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0.1; };
    // text-bearing leaf blocks
    const els = [...document.querySelectorAll("main :is(h1,h2,h3,h4,p,li,a,span,strong,b,small)")].filter((e) =>
      vis(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2) && !e.closest("[aria-hidden='true'], [hidden], .sr-only, .visually-hidden, details:not([open]) > :not(summary)"));
    const rects = els.map((e) => ({ e, r: e.getBoundingClientRect() })).filter((x) => x.r.width > 4 && x.r.height > 4);
    const out = new Set();
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w <= 0 || h <= 0) continue;
      const small = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if ((w * h) / small > 0.35 && h > 8) out.add(`${desc(a.e.parentElement)}>${desc(a.e)}  ×  ${desc(b.e.parentElement)}>${desc(b.e)}`);
    }
    return [...out];
  });
  for (const r of res) (found[r] ||= []).push(u);
}
await browser.close();
const rows = Object.entries(found).sort((a, b) => b[1].length - a[1].length);
console.log(`${urls.length} pages, ${rows.length} overlapping text pairs`);
for (const [k, v] of rows.slice(0, 40)) console.log(`${k}\n   ${v.length} pages, e.g. ${v.slice(0, 3).join(", ")}`);
