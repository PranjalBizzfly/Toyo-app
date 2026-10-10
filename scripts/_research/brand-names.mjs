// Reads each new product's on-site brand: <title>, og:site_name, header/logo text, footer copyright.
import { chromium } from "playwright";
const sites = ["https://snaaps.com", "https://myspeechmaker.com", "https://cp.infra.1xl.com", "https://rentwithzeal.com/channel-partner/", "https://sopgalaxy.com", "https://theprojectchecker.com", "https://warwi.com", "https://dizola.com", "https://247meetings.com", "https://finzola.com", "https://socialmagix.com"];
const b = await chromium.launch();
const p = await b.newPage();
for (const u of sites) {
  try {
    await p.goto(u, { waitUntil: "networkidle", timeout: 45000 });
    const r = await p.evaluate(() => ({
      title: document.title,
      site: document.querySelector('meta[property="og:site_name"]')?.content ?? "",
      logo: [...document.querySelectorAll("header a, nav a, [class*=logo], [class*=brand]")].map((e) => e.textContent.trim() || e.querySelector("img")?.alt || "").filter(Boolean).slice(0, 3).join(" | ").slice(0, 120),
      copy: (document.body.innerText.match(/©[^\n]{0,80}/) || [""])[0],
    }));
    console.log(`${u}\n  title: ${r.title}\n  og: ${r.site}\n  logo: ${r.logo}\n  ©: ${r.copy}`);
  } catch (e) { console.log(`${u}\n  ERROR ${e.message.slice(0, 80)}`); }
}
await b.close();
