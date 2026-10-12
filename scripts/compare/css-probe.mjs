// Lists failed requests and stylesheet count on a page, and the hero's key classes/styles.
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:5960";
const b = await chromium.launch();
for (const u of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const failed = [];
  p.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().replace(base, "")}`); });
  p.on("requestfailed", (r) => failed.push(`FAILED ${r.url().replace(base, "")}`));
  await p.goto(base + "/" + u.replace(/^\/+/, ""), { waitUntil: "networkidle" });
  const info = await p.evaluate(() => {
    const h = document.querySelector("main header, main .zs-hero");
    const cs = h ? getComputedStyle(h) : null;
    return { sheets: document.styleSheets.length, cssLinks: [...document.querySelectorAll('link[rel="stylesheet"]')].length, hero: h?.className, heroPad: cs?.paddingTop, heroBg: cs?.backgroundImage?.slice(0, 40), wrap: document.querySelector("main > div")?.className };
  });
  console.log(u, JSON.stringify(info));
  for (const f of failed) console.log("   " + f);
  await p.close();
}
await b.close();
