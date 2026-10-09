// Clicks the second tab of every tablist and checks that exactly the selected
// panel is visible afterwards. Usage: node scripts/tabs-audit.mjs [baseUrl]
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:3140").replace(/\/$/, "");
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const seen = new Set();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((u) => {
  const parts = u.split("/").filter(Boolean);
  if (parts[0] === "products" && parts.length <= 3) return true;
  const key = parts.map((p, i) => (i === 0 ? p : "*")).join("/");
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const problems = {};
let lists = 0;
for (const u of urls) {
  try { await page.goto(base + u, { waitUntil: "networkidle", timeout: 30000 }); } catch { continue; }
  const n = await page.locator('[role="tablist"]').count();
  for (let i = 0; i < n; i++) {
    const tabs = page.locator('[role="tablist"]').nth(i).locator('[role="tab"]');
    if ((await tabs.count()) < 2 || !(await tabs.nth(1).isVisible())) continue;
    lists++;
    try { await tabs.nth(1).click({ timeout: 3000 }); } catch { (problems["unclickable tab"] ||= new Set()).add(u); continue; }
    await page.waitForTimeout(100);
    const r = await tabs.nth(1).evaluate((t) => {
      const list = t.closest('[role="tablist"]');
      const all = [...list.querySelectorAll('[role="tab"]')];
      const panels = all.map((x) => document.getElementById(x.getAttribute("aria-controls"))).filter(Boolean);
      const shown = panels.filter((p) => getComputedStyle(p).display !== "none" && p.getBoundingClientRect().height > 0);
      const name = String(list.className || list.parentElement.className).split(/\s+/)[0];
      if (t.getAttribute("aria-selected") !== "true") return name + ": tab not selected after click";
      if (!panels.length) return null; // tabs without panels (filters, scroll tabs)
      if (shown.length !== 1) return `${name}: ${shown.length} panels visible`;
      if (shown[0] !== document.getElementById(t.getAttribute("aria-controls"))) return name + ": wrong panel shown";
      return null;
    });
    if (r) (problems[r] ||= new Set()).add(u);
  }
}
await browser.close();
console.log(`${urls.length} pages, ${lists} tab sets clicked, ${Object.keys(problems).length} problem types`);
for (const [k, v] of Object.entries(problems)) console.log(`${k}\n   ${v.size} pages, e.g. ${[...v].slice(0, 4).join(", ")}`);
