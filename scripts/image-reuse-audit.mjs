// Counts how often each <img> file is used across every sitemap page (CSS backgrounds excluded).
// Usage: node scripts/image-reuse-audit.mjs [baseUrl]
import { chromium } from "playwright";
import fs from "node:fs";

const base = (process.argv[2] || "http://localhost:3178").replace(/\/$/, "");
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const uses = {}; // src -> { total, pages: Set }
for (const u of urls) {
  try { await p.goto(base + u, { waitUntil: "domcontentloaded", timeout: 30000 }); } catch { continue; }
  const srcs = await p.evaluate(() =>
    [...document.querySelectorAll("img")]
      .filter((i) => !i.closest("header, footer, nav") && !i.classList.contains("product-card__logo"))
      .map((i) => {
        const s = i.getAttribute("src") || "";
        // Next image URLs wrap the real path in ?url=
        const m = s.match(/[?&]url=([^&]+)/);
        return decodeURIComponent(m ? m[1] : s).split("?")[0];
      })
      .filter((s) => s && !s.startsWith("data:") && !s.endsWith(".svg")));
  for (const s of srcs) {
    const e = (uses[s] ||= { total: 0, pages: new Set() });
    e.total++;
    e.pages.add(u);
  }
}
await b.close();
const rows = Object.entries(uses).map(([src, e]) => ({ src, total: e.total, pages: e.pages.size, example: [...e.pages].slice(0, 3) }))
  .sort((a, b) => b.total - a.total);
const repeated = rows.filter((r) => r.total > 1);
fs.writeFileSync("scripts/.compare/image-reuse.json", JSON.stringify(rows, null, 1));
console.log(`${urls.length} pages scanned, ${rows.length} distinct images, ${repeated.length} used more than once\n`);
console.log("uses  pages  image");
for (const r of repeated) console.log(`${String(r.total).padStart(4)}  ${String(r.pages).padStart(5)}  ${r.src}   e.g. ${r.example.join(", ")}`);
