// Research crawler: renders each product's official site and saves the visible
// text of every public page to scripts/.research/<slug>.md (git-ignored).
// Usage: PLAYWRIGHT_BROWSERS_PATH=./.pw-browsers node scripts/research-crawl.mjs [slug ...]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const SITES = {
  cardizo: ["https://cardizo.com/", "https://cardizo.com/pricing"],
  getbenj: ["https://getbenj.com/"],
  sibu: ["https://getsibu.com/", "https://getsibu.com/features", "https://getsibu.com/pricing", "https://getsibu.com/about"],
  hrmagix: ["https://hrmagix.com/"],
  zuzu: ["https://usezuzu.com/"],
  zorfly: ["https://zorfly.com/", "https://zorfly.com/pricing", "https://zorfly.com/signup"],
  zapbuzzer: ["https://zapbuzzer.com/", "https://zapbuzzer.com/privacy"],
  sigchanger: ["https://sigchanger.com/", "https://sigchanger.com/features", "https://sigchanger.com/pricing", "https://sigchanger.com/about-us"],
  fantom: ["https://fantomapps.com/"],
  trackysuite: ["https://trackysuite.com/", "https://trackysuite.com/about", "https://trackysuite.com/privacy"],
  sizoru: ["https://sizoru.com/", "https://sizoru.com/methodology"],
  oda7: ["https://oda7.com/", "https://oda7.com/sign-up", "https://oda7.com/sign-in"],
  taskmagic: ["https://taskmagic.com/", "https://taskmagic.com/cloud", "https://taskmagic.com/dashboards", "https://taskmagic.com/white-label", "https://taskmagic.com/scrapers"],
  fleetras: ["https://fleetras.com/", "https://fleetras.com/privacy"],
  meetingmind: ["https://meeting.oxo1.com/"],
  tracksuit: ["https://www.gotracksuit.com/"],
  "hrmagix-site": ["https://hrmagix-website.vercel.app/"],
  "sibu-site": ["https://sibu-website.vercel.app/"],
  "zapbuzzer-site": ["https://zapbuzzer-website.vercel.app/"],
};
const MAX_PAGES = 80;
const SKIP = /(sign-?in|log-?in|forgot|reset|register|signup|sign-up|cdn-cgi|\.pdf$|\.png$|\.jpg$|mailto:|tel:|\/api\/)/i;

const only = process.argv.slice(2);
mkdirSync("scripts/.research", { recursive: true });
const browser = await chromium.launch();

for (const [slug, starts] of Object.entries(SITES)) {
  if (only.length && !only.includes(slug)) continue;
  const host = new URL(starts[0]).hostname.replace(/^www\./, "");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" });
  const page = await ctx.newPage();
  const queue = [...starts];
  const seen = new Set();
  let out = `# Research dump: ${slug}\nCrawled ${new Date().toISOString()} — rendered visible text of official public pages.\n`;
  // Sitemap URLs, if any
  try {
    const sm = await (await fetch(`https://${host}/sitemap.xml`)).text();
    for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) queue.push(m[1].trim());
  } catch {}
  while (queue.length && seen.size < MAX_PAGES) {
    const url = queue.shift().split("#")[0];
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(1500);
      // expand accordions / FAQ details so their answers are captured
      await page.evaluate(() => {
        document.querySelectorAll("details").forEach((d) => (d.open = true));
        document.querySelectorAll('[aria-expanded="false"]').forEach((b) => b instanceof HTMLElement && b.click());
      });
      await page.waitForTimeout(500);
      const data = await page.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        text: document.body?.innerText ?? "",
        links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
      }));
      out += `\n\n=============================================================\nURL: ${url}\nFINAL: ${page.url()} [${res?.status()}]\nTITLE: ${data.title}\nDESC: ${data.desc}\n-------------------------------------------------------------\n${data.text.replace(/\n{3,}/g, "\n\n")}\n`;
      for (const l of data.links) {
        try {
          const u = new URL(l);
          if (u.hostname.replace(/^www\./, "") === host && !SKIP.test(u.pathname)) queue.push(u.origin + u.pathname);
        } catch {}
      }
    } catch (e) {
      out += `\n\n=============================================================\nURL: ${url}\nFAILED: ${e.message}\n`;
    }
  }
  writeFileSync(`scripts/.research/${slug}.md`, out);
  console.log(`${slug}: ${seen.size} pages, ${out.length} chars`);
  await ctx.close();
}
await browser.close();
