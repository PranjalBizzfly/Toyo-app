// Regression check for the 11 new products: every product-nav page loads, no dashes,
// no horizontal overflow (375/1440, light/dark), sitemap + search + menus include them.
import { chromium } from "playwright";
import fs from "node:fs";
const base = process.env.BASE ?? "http://localhost:4100";
const NEW = ["growbizz", "speechwright", "1xl-infra-channel-partner-portal", "zeal-partner-program", "sopgalaxy", "theprojectchecker", "warwi", "dizola", "247meetings", "finzola", "social-magix"];
const OLD = ["sibu", "oda7", "benj", "hrmagix", "zuzu", "cardizo"];
const out = [];
const log = (s) => { out.push(s); console.log(s); };
const b = await chromium.launch({ args: ["--disable-gpu"] });
const shots = "scripts/.compare/new-products";
fs.mkdirSync(shots, { recursive: true });

const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const home = await (await fetch(base + "/")).text();
const productsHub = await (await fetch(base + "/products")).text();
let problems = 0;
for (const slug of [...NEW, ...OLD]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
  p.on("console", (m) => { if (m.type() === "error" && !/favicon|404|Failed to load resource/i.test(m.text())) errs.push(m.text().slice(0, 120)); });
  const r = await p.goto(`${base}/products/${slug}`, { waitUntil: "networkidle" });
  const robots = await p.$eval('meta[name="robots"]', (m) => m.content).catch(() => "index");
  const draft = /noindex/.test(robots);
  const nav = await p.$$eval(".product-nav a[href]", (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  const bad = [];
  for (const href of nav.filter((h) => h.startsWith("/"))) {
    const res = await fetch(base + href);
    const html = await res.text();
    if (res.status !== 200) bad.push(`${href} ${res.status}`);
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ");
    if (/[–—]/.test(text)) bad.push(`${href} has a dash`);
  }
  const overflow = [];
  for (const [w, theme] of [[375, "light"], [375, "dark"], [1440, "light"], [1440, "dark"]]) {
    await p.setViewportSize({ width: w, height: 900 });
    await p.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
    await p.waitForTimeout(150);
    const ow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ow > 1) overflow.push(`${w}/${theme} +${ow}px`);
    if (NEW.includes(slug)) await p.screenshot({ path: `${shots}/${slug}-${w}-${theme}.png` });
  }
  const inSitemap = sitemap.includes(`/products/${slug}<`);
  const inHub = productsHub.includes(`/products/${slug}"`);
  const flags = [
    r.status() !== 200 && `status ${r.status()}`,
    ...bad, ...overflow.map((o) => `overflow ${o}`),
    !draft && !inSitemap && "missing from sitemap",
    draft && inSitemap && "draft listed in sitemap",
    ...errs.map((e) => `console: ${e}`),
  ].filter(Boolean);
  problems += flags.length;
  log(`${NEW.includes(slug) ? "NEW" : "old"} ${slug.padEnd(34)} ${draft ? "draft" : "live "} pages:${String(nav.length).padStart(2)} hub:${inHub ? "y" : "n"} ${flags.length ? "ISSUES: " + flags.join("; ") : "ok"}`);
  await p.close();
}
// Search: each live new product is findable by name.
const sp = await b.newPage();
for (const q of ["GrowBizz", "Speechwright", "SOPGalaxy", "Dizola", "Warwi", "TheProjectChecker", "Social Magix", "FINZOLA", "Zeal Partner Program"]) {
  await sp.goto(`${base}/search?q=${encodeURIComponent(q)}`, { waitUntil: "networkidle" });
  const hit = await sp.evaluate((q) => document.querySelector("main").innerText.toLowerCase().includes(q.toLowerCase()), q);
  if (!hit) problems++;
  log(`search "${q}": ${hit ? "found" : "NOT FOUND"}`);
}
await b.close();
log(`home links new products: ${NEW.filter((s) => home.includes(`/products/${s}"`)).length}/${NEW.length}`);
log(`TOTAL ISSUES: ${problems}`);
fs.writeFileSync("scripts/.compare/new-products-report.txt", out.join("\n"));
