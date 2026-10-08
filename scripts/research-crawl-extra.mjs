// Crawls additional official sources (help centres, new product sites).
// Accepts single-page-app routes that render real content despite a 404 status.
// Usage: PLAYWRIGHT_BROWSERS_PATH=./.pw-browsers node scripts/research-crawl-extra.mjs [key ...]
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const SITES = {
  "taskmagic-help": { start: "https://help.taskmagic.com/", host: "help.taskmagic.com", max: 320 },
  "tracksuit-help": { start: "https://help.gotracksuit.com/en/", host: "help.gotracksuit.com", max: 100 },
  "oda7-site": { start: "https://oda7-website.vercel.app/", host: "oda7-website.vercel.app", alias: "oda7.com", max: 80 },
};
const SKIP = /(sign-?in|log-?in|signup|register|\.(png|jpe?g|svg|pdf|zip)$)/i;

const only = process.argv.slice(2);
mkdirSync("scripts/.research", { recursive: true });
const browser = await chromium.launch();
for (const [key, cfg] of Object.entries(SITES)) {
  if (only.length && !only.includes(key)) continue;
  const local = (u) => {
    try {
      const x = new URL(u);
      const h = x.hostname.replace(/^www\./, "");
      if (h !== cfg.host && h !== cfg.alias) return null;
      if (SKIP.test(x.pathname)) return null;
      return `https://${cfg.host}${x.pathname.replace(/\/$/, "") || "/"}`;
    } catch {
      return null;
    }
  };
  const found = new Set([cfg.start.replace(/\/$/, "") || cfg.start]);
  try {
    const sm = await (await fetch(`https://${cfg.host}/sitemap.xml`)).text();
    for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const l = local(m[1].trim());
      if (l) found.add(l);
    }
  } catch {}
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const seen = new Set();
  let out = `# Extra official source: ${key} (${cfg.host})\nCrawled ${new Date().toISOString()}.\n`;
  let kept = 0;
  let url;
  while (seen.size < cfg.max && (url = [...found].find((u) => !seen.has(u)))) {
    seen.add(url);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
      const d = await page.evaluate(() => ({
        title: document.title,
        text: (document.querySelector("main, article") ?? document.body).innerText,
        links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
      }));
      for (const l of d.links) {
        const x = local(l);
        if (x) found.add(x);
      }
      // Keep any page that renders real content (SPA routes may report 404 status).
      if (d.text.trim().length < 200 || /404|not found/i.test(d.title)) continue;
      kept++;
      out += `\n\n=============================================================\nURL: ${url}\nTITLE: ${d.title}\n-------------------------------------------------------------\n${d.text.replace(/\n{3,}/g, "\n\n")}\n`;
    } catch (e) {
      out += `\n\nURL: ${url}\nFAILED: ${e.message}\n`;
    }
  }
  writeFileSync(`scripts/.research/${key}.md`, out);
  console.log(`${key}: ${seen.size} visited, ${kept} with content, ${found.size} discovered, ${out.length} chars`);
  await page.close();
}
await browser.close();
