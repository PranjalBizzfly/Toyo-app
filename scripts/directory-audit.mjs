// Audits the Industries and Integrations hubs and detail pages.
// Usage: node scripts/directory-audit.mjs [baseUrl]
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:3151").replace(/\/$/, "");
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((u) => /^\/(industries|integrations)(\/|$)/.test(u));

const viewports = [
  { name: "desktop", width: 1440 },
  { name: "tablet", width: 1024 },
  { name: "mobile", width: 390 },
];
const browser = await chromium.launch();
const problems = [];
const linkCache = new Map();
const checkLink = async (href) => {
  if (!linkCache.has(href)) {
    linkCache.set(href, fetch(base + href.split("#")[0], { redirect: "manual" }).then((r) => r.status).catch(() => 0));
  }
  return linkCache.get(href);
};

for (const vp of viewports) {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: 900 }, colorScheme: theme, reducedMotion: "reduce" });
    for (const u of pages) {
      await page.goto(base + u, { waitUntil: "networkidle" });
      await page.evaluate((t) => { document.documentElement.dataset.theme = t; document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-in")); }, theme);
      const r = await page.evaluate(() => {
        const main = document.querySelector("main") || document.body;
        const overflow = document.documentElement.scrollWidth - window.innerWidth;
        const faqs = main.querySelectorAll(":is(details.accordion__item, .accordion details, .faq details, [data-faq-item])").length || main.querySelectorAll("details").length;
        const links = [...main.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href"));
        const cards = [...main.querySelectorAll(".dx-groups [data-name]")].map((e) => `${e.dataset.name}|${e.dataset.products}`);
        const dupes = cards.filter((c, i) => cards.indexOf(c) !== i);
        // overlapping text blocks
        const els = [...main.querySelectorAll(":is(h1,h2,h3,p,li,a,span,dt,dd)")].filter((e) => {
          const s = getComputedStyle(e);
          return s.visibility !== "hidden" && s.display !== "none" && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2) && !e.closest("[hidden], .sr-only, details:not([open]) > :not(summary)");
        }).map((e) => ({ e, r: e.getBoundingClientRect() })).filter((x) => x.r.width > 4 && x.r.height > 4);
        let overlaps = 0;
        for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
          const a = els[i], b = els[j];
          if (a.e.contains(b.e) || b.e.contains(a.e) || getComputedStyle(a.e).display === "inline" || getComputedStyle(b.e).display === "inline") continue;
          const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
          const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
          if (w > 4 && h > 8 && (w * h) / Math.min(a.r.width * a.r.height, b.r.width * b.r.height) > 0.35) overlaps++;
        }
        return { overflow, faqs, links, dupes, overlaps };
      });
      const tag = `${vp.name}/${theme} ${u}`;
      if (r.overflow > 1) problems.push(`${tag}: horizontal overflow ${r.overflow}px`);
      if (r.faqs !== 8) problems.push(`${tag}: ${r.faqs} FAQs (expected 8)`);
      if (r.dupes.length) problems.push(`${tag}: duplicate cards ${r.dupes.join(", ")}`);
      if (r.overlaps) problems.push(`${tag}: ${r.overlaps} overlapping text pairs`);
      if (vp.name === "desktop" && theme === "light") {
        for (const h of new Set(r.links)) {
          const s = await checkLink(h);
          if (s !== 200 && s !== 308 && s !== 307) problems.push(`${u}: link ${h} → ${s}`);
        }
      }
    }
    await page.close();
  }
}

// Filters: search, category and product narrow the list; clear restores it.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [u, term, expectMin] of [["/integrations", "whatsapp", 1], ["/industries", "health", 1]]) {
  await page.goto(base + u, { waitUntil: "networkidle" });
  const total = await page.locator("#dx-directory [data-name]").count();
  await page.fill(".dx-search input", term);
  await page.waitForTimeout(150);
  const visible = await page.locator("#dx-directory [data-name]:not([hidden])").count();
  if (visible < expectMin || visible >= total) problems.push(`${u}: search "${term}" showed ${visible}/${total}`);
  await page.fill(".dx-search input", "");
  await page.locator(".dx-chips .dx-chip").nth(1).click();
  await page.waitForTimeout(150);
  const byCat = await page.locator("#dx-directory [data-name]:not([hidden])").count();
  if (!byCat || byCat >= total) problems.push(`${u}: category chip showed ${byCat}/${total}`);
  await page.locator(".dx-reset").first().click();
  await page.waitForTimeout(150);
  const reset = await page.locator("#dx-directory [data-name]:not([hidden])").count();
  if (reset !== total) problems.push(`${u}: clear filters showed ${reset}/${total}`);
  const opts = await page.locator(".dx-select select option").count();
  if (opts > 1) {
    await page.selectOption(".dx-select select", { index: 1 });
    await page.waitForTimeout(150);
    const byProd = await page.locator("#dx-directory [data-name]:not([hidden])").count();
    if (!byProd || byProd > total) problems.push(`${u}: product filter showed ${byProd}/${total}`);
  }
  console.log(`${u}: ${total} entries; search "${term}" → ${visible}; first category → ${byCat}; cleared → ${reset}`);
}
await browser.close();
console.log(`\n${pages.length} pages × ${viewports.length} viewports × 2 themes, ${linkCache.size} unique links checked`);
console.log(problems.length ? problems.join("\n") : "No problems found");
