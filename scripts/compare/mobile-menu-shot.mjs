// Opens the mobile menu at phone width (light and dark) and saves screenshots + the panel's size.
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:3000";
const b = await chromium.launch();
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(base + "/products/warwi", { waitUntil: "networkidle" });
  await p.click('button[aria-controls="mobile-nav"]');
  await p.waitForTimeout(400);
  const box = await p.$eval("#mobile-nav", (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; });
  console.log(theme, "panel", JSON.stringify(box), "viewport 390x844");
  await p.screenshot({ path: `scripts/.compare/mobile-menu-${theme}.png` });
  await ctx.close();
}
await b.close();
