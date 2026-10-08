// Crawls the three reference product websites hosted on Vercel previews.
// Their sitemaps/links point at the future production domains (which 404 today),
// so URLs are rewritten back to the preview host. Product pages are prioritised;
// editorial pages (guides, blog, glossary, careers, press) are skipped.
// Usage: PLAYWRIGHT_BROWSERS_PATH=./.pw-browsers node scripts/research-crawl-ref.mjs [hrmagix|sibu|zapbuzzer]
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const SITES = {
  hrmagix: { host: "hrmagix-website.vercel.app", alias: "hrmagix.com" },
  sibu: { host: "sibu-website.vercel.app", alias: "getsibu.com" },
  zapbuzzer: { host: "zapbuzzer-website.vercel.app", alias: "zapbuzzer.com" },
  oda7: { host: "oda7-website.vercel.app", alias: "oda7.com" },
};
const MAX = 160;
const SKIP = /(hr-guides|glossary|\/blog|insights|careers|press|media-room|white-papers|calculator|policy-library|sign-?in|log-?in|signup|register|book-a-demo|contact|free-trial|explore-all-pages|\/hr\/topics)/i;
const PRIORITY = [/\/features?(\/|$)/, /\/modules?(\/|$)/, /\/solutions?(\/|$)/, /pricing/, /security|trust|privacy/, /integrations?/, /how-|overview|why-/, /industr/, /faq|questions/, /mobile|enterprise|developers|api/];
const score = (p) => {
  const i = PRIORITY.findIndex((re) => re.test(p));
  return i === -1 ? 99 : i;
};

const only = process.argv.slice(2);
mkdirSync("scripts/.research", { recursive: true });
const browser = await chromium.launch();
for (const [slug, { host, alias }] of Object.entries(SITES)) {
  if (only.length && !only.includes(slug)) continue;
  const toLocal = (u) => {
    try {
      const x = new URL(u);
      const h = x.hostname.replace(/^www\./, "");
      if (h !== host && h !== alias) return null;
      return `https://${host}${x.pathname.replace(/\/$/, "") || "/"}`;
    } catch {
      return null;
    }
  };
  const found = new Set([`https://${host}/`]);
  try {
    const sm = await (await fetch(`https://${host}/sitemap.xml`)).text();
    for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const l = toLocal(m[1].trim());
      if (l && !SKIP.test(new URL(l).pathname)) found.add(l);
    }
  } catch {}
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const seen = new Set();
  let out = `# Reference site dump: ${slug} (${host})\nCrawled ${new Date().toISOString()}. Product pages prioritised; editorial pages skipped.\n`;
  const next = () => [...found].filter((u) => !seen.has(u)).sort((a, b) => score(new URL(a).pathname) - score(new URL(b).pathname))[0];
  let url;
  while (seen.size < MAX && (url = next())) {
    seen.add(url);
    try {
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
      const d = await page.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        text: document.querySelector("main")?.innerText ?? document.body.innerText,
        links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
      }));
      if (res?.status() !== 200) continue;
      out += `\n\n=============================================================\nURL: ${url}\nTITLE: ${d.title}\nDESC: ${d.desc}\n-------------------------------------------------------------\n${d.text.replace(/\n{3,}/g, "\n\n")}\n`;
      for (const l of d.links) {
        const local = toLocal(l);
        if (local && !SKIP.test(new URL(local).pathname)) found.add(local);
      }
    } catch (e) {
      out += `\n\nURL: ${url}\nFAILED: ${e.message}\n`;
    }
  }
  writeFileSync(`scripts/.research/${slug}-site.md`, out);
  console.log(`${slug}: ${seen.size} pages crawled of ${found.size} discovered, ${out.length} chars`);
  await page.close();
}
await browser.close();
