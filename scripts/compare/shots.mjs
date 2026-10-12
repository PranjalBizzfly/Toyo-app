// Full-height screenshots (top 2400px) of a few pages at given widths, for a visual check.
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:5960";
const jobs = [[768, "/products/taskmagix/pricing"], [375, "/products/dizola"]];
const b = await chromium.launch();
for (const [w, u] of jobs) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(base + u, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")));
  await p.waitForTimeout(400);
  const f = `scripts/.compare/responsive/view-${w}-${u.replace(/[^a-z0-9]+/gi, "_") || "home"}.png`;
  await p.screenshot({ path: f, clip: { x: 0, y: 0, width: w, height: 2400 }, fullPage: true });
  console.log(f);
  await p.close();
}
await b.close();
