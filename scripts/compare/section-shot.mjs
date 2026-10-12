// Screenshot one section (by CSS selector) at given widths and themes.
// Usage: node section-shot.mjs <path> <selector> [widths…]
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:5991";
const [path, sel, ...ws] = process.argv.slice(2);
const widths = ws.length ? ws.map(Number) : [1440, 375];
const b = await chromium.launch();
for (const w of widths) for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: theme });
  const p = await ctx.newPage();
  await p.goto(base + "/" + path.replace(/^\/+/, ""), { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")));
  await p.waitForTimeout(1600);
  const el = await p.$(sel);
  const out = `scripts/.compare/section-${w}-${theme}.png`;
  await el.screenshot({ path: out });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(out, "page overflow", overflow);
  await ctx.close();
}
await b.close();
