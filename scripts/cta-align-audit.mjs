// Finds rows of side-by-side cards whose final button/link doesn't line up.
// Usage: node scripts/cta-align-audit.mjs [baseUrl] [--all] [--width=1440]
import { chromium } from "playwright";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3142").replace(/\/$/, "");
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
    const out = [];
    // a container whose children are cards laid out in a row
    for (const parent of document.querySelectorAll("main *")) {
      const kids = [...parent.children].filter((k) => { const r = k.getBoundingClientRect(); return r.width > 120 && r.height > 80; });
      if (kids.length < 2) continue;
      // group children by row (same top)
      const rows = {};
      for (const k of kids) { const t = Math.round(k.getBoundingClientRect().top / 4); (rows[t] ||= []).push(k); }
      for (const row of Object.values(rows)) {
        if (row.length < 2) continue;
        // card = row item that ends with an action: its last visible link/button
        const acts = row.map((k) => {
          const a = [...k.querySelectorAll("a, button")].filter((x) => { const r = x.getBoundingClientRect(); return r.height > 0 && getComputedStyle(x).visibility !== "hidden"; });
          if (!a.length || a.length > 4) return null;
          const last = a[a.length - 1];
          if (last === k) return null;
          const kr = k.getBoundingClientRect(), lr = last.getBoundingClientRect();
          // the action must be the bottom-most thing in the card
          return kr.bottom - lr.bottom < 120 ? { top: lr.top, card: kr.height, sel: desc(last) } : null;
        });
        if (acts.some((a) => !a)) continue;
        const tops = acts.map((a) => a.top);
        const spread = Math.max(...tops) - Math.min(...tops);
        const cardsEqual = Math.max(...acts.map((a) => a.card)) - Math.min(...acts.map((a) => a.card)) < 4;
        if (spread > 6 && cardsEqual) out.push(`${desc(row[0])} > ${acts[0].sel}  (off by ${Math.round(spread)}px)`);
      }
    }
    return [...new Set(out)];
  });
  for (const r of res) (found[r.replace(/\(off by \d+px\)/, "")] ||= []).push(u + " " + (r.match(/\d+px/) || [""])[0]);
}
await browser.close();
const rows = Object.entries(found).sort((a, b) => b[1].length - a[1].length);
console.log(`${urls.length} pages, ${rows.length} misaligned card patterns`);
for (const [k, v] of rows) console.log(`${k}\n   ${v.length} pages, e.g. ${v.slice(0, 4).join(", ")}`);
