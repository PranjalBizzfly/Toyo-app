// Full check of one product: every page under /products/<slug> (from the sitemap + product nav),
// status, indexing, sitemap, search, console errors, overflow at 375/1440 in light/dark.
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:5700";
const slug = process.argv[2];
const name = process.argv[3] ?? slug;
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const fromMap = [...sitemap.matchAll(/<loc>[^<]*?(\/products\/[^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u === `/products/${slug}` || u.startsWith(`/products/${slug}/`));
const b = await chromium.launch({ args: ["--disable-gpu"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${base}/products/${slug}`, { waitUntil: "networkidle" });
const robots = await p.$eval('meta[name="robots"]', (m) => m.content).catch(() => "index, follow");
const navLinks = await p.$$eval(".product-nav a[href], main a[href]", (as) => as.map((a) => a.getAttribute("href")));
const urls = [...new Set([`/products/${slug}`, ...fromMap, ...navLinks.filter((h) => h && (h === `/products/${slug}` || h.startsWith(`/products/${slug}/`))).map((h) => h.split("#")[0])])];
const issues = [];
for (const u of urls) {
  const errs = [];
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  pg.on("pageerror", (e) => errs.push(e.message.slice(0, 100)));
  const r = await pg.goto(base + u, { waitUntil: "networkidle" });
  if (r.status() !== 200) issues.push(`${u} status ${r.status()}`);
  const text = await pg.evaluate(() => document.querySelector("main")?.innerText ?? "");
  if (/[–—]/.test(text)) issues.push(`${u} has a dash`);
  for (const [w, t] of [[375, "light"], [375, "dark"], [1440, "light"], [1440, "dark"]]) {
    await pg.setViewportSize({ width: w, height: 900 });
    await pg.evaluate((th) => { document.documentElement.dataset.theme = th; }, t);
    await pg.waitForTimeout(120);
    const ow = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ow > 1) issues.push(`${u} overflow ${w}/${t} +${ow}px`);
  }
  for (const e of errs) issues.push(`${u} js error: ${e}`);
  await pg.close();
}
await p.goto(`${base}/search?q=${encodeURIComponent(name)}`, { waitUntil: "networkidle" });
const found = await p.evaluate((n) => document.querySelector("main").innerText.toLowerCase().includes(n.toLowerCase()), name);
const hub = (await (await fetch(base + "/products")).text()).includes(`/products/${slug}"`);
await b.close();
console.log(`pages tested: ${urls.length} | in sitemap: ${fromMap.length} | robots: ${robots} | search: ${found ? "found" : "NOT FOUND"} | products hub: ${hub ? "listed" : "MISSING"}`);
console.log(issues.length ? "ISSUES:\n  " + issues.join("\n  ") : "issues: 0");
