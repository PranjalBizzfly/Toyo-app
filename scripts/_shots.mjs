// Review screenshots of our pages: node scripts/_shots.mjs <baseUrl> <path> [theme] [width] [name]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
// Path is given without a leading slash ("" or "home" = homepage).
const [base = "http://localhost:3107", rawPath = "", theme = "light", width = "1440", name = "page"] = process.argv.slice(2);
const path = "/" + (rawPath === "home" ? "" : rawPath);
mkdirSync("scripts/.ui-shots", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, colorScheme: theme });
await page.goto(base + path, { waitUntil: "networkidle" });
if (process.env.MEGA) {
  await page.click(".primary-nav__trigger[aria-controls='mega-products']");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `scripts/.ui-shots/${name}-mega.png` });
}
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let i = 0, y = 0; y < h && i < 9; i++, y += 1000) {
  await page.screenshot({ path: `scripts/.ui-shots/${name}-${i}.png`, clip: { x: 0, y, width: Number(width), height: Math.min(1000, h - y) }, fullPage: true });
}
console.log(name, h, "overflow:", await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
await browser.close();
