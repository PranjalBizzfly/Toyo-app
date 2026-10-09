// Finds elements that carry the `hidden` attribute but are still displayed
// because a CSS `display` rule overrides it. Usage: node scripts/hidden-audit.mjs [baseUrl] [--all]
import { chromium } from "playwright";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3140").replace(/\/$/, "");
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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const found = {};
for (const u of urls) {
  try { await page.goto(base + u, { waitUntil: "domcontentloaded", timeout: 30000 }); } catch { continue; }
  const bad = await page.evaluate(() =>
    [...document.querySelectorAll("[hidden]")]
      .filter((e) => getComputedStyle(e).display !== "none" && !e.closest("template"))
      .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).trim().split(/\s+/).join(".")} → display:${getComputedStyle(e).display}`));
  for (const b of bad) (found[b] ||= new Set()).add(u);
}
await browser.close();
const rows = Object.entries(found);
console.log(`${urls.length} pages checked, ${rows.length} leaking selectors`);
for (const [k, v] of rows) console.log(`${k}\n   ${v.size} pages, e.g. ${[...v].slice(0, 4).join(", ")}`);
