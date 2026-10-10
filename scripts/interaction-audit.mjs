// Touch-size interaction checks: mobile menu, footer accordions, theme toggle,
// header search link, directory filters, tabs. Usage: node scripts/interaction-audit.mjs <baseUrl>
import { chromium, devices } from "playwright";

const base = (process.argv[2] || "http://localhost:3192").replace(/\/$/, "");
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
const p = await ctx.newPage();
const results = [];
const check = async (name, fn) => {
  try { results.push([name, (await fn()) ? "PASS" : "FAIL"]); } catch (e) { results.push([name, "ERROR " + e.message.split("\n")[0]]); }
};

await p.goto(base + "/", { waitUntil: "networkidle" });
await check("mobile menu opens on tap", async () => {
  await p.tap(".menu-toggle");
  await p.waitForTimeout(300);
  return p.evaluate(() => { const n = document.querySelector(".mobile-nav, [data-mobile-nav], #mobile-nav"); return !!n && getComputedStyle(n).display !== "none" && n.getBoundingClientRect().height > 100; });
});
await check("mobile menu closes on second tap", async () => {
  await p.tap(".menu-toggle");
  await p.waitForTimeout(300);
  return p.evaluate(() => { const n = document.querySelector(".mobile-nav, [data-mobile-nav], #mobile-nav"); return !n || getComputedStyle(n).display === "none" || n.getBoundingClientRect().height < 5 || n.hidden; });
});
await check("theme toggle switches to dark", async () => {
  const before = await p.evaluate(() => document.documentElement.dataset.theme);
  await p.tap("[aria-label*='theme' i], .theme-toggle");
  await p.waitForTimeout(200);
  const after = await p.evaluate(() => document.documentElement.dataset.theme);
  return before !== after;
});
await check("footer accordion opens on tap", async () => {
  const btn = p.locator("footer .fgroup__title button").first();
  await btn.scrollIntoViewIfNeeded();
  await btn.tap();
  await p.waitForTimeout(200);
  return p.evaluate(() => !!document.querySelector("footer .fgroup[data-open] .fgroup__body"));
});
await check("header search icon goes to /search", async () => {
  await p.goto(base + "/industries", { waitUntil: "networkidle" });
  await p.tap(".header-search-link, .header-search--link");
  await p.waitForURL("**/search**", { timeout: 5000 });
  return true;
});
await check("integrations search filter narrows list", async () => {
  await p.goto(base + "/integrations", { waitUntil: "networkidle" });
  const all = await p.locator("#dx-directory [data-name]:not([hidden])").count();
  await p.fill(".dx-search input", "slack");
  await p.waitForTimeout(200);
  const some = await p.locator("#dx-directory [data-name]:not([hidden])").count();
  return some > 0 && some < all;
});
await check("integrations category chip filters", async () => {
  await p.fill(".dx-search input", "");
  await p.locator(".dx-chip").nth(1).tap();
  await p.waitForTimeout(200);
  const n = await p.locator("#dx-directory [data-name]:not([hidden])").count();
  return n > 0 && n < 54;
});
await check("product story tabs switch on tap (ODA7)", async () => {
  await p.goto(base + "/products/oda7", { waitUntil: "networkidle" });
  const tabs = p.locator(".zs-sig-tabs [role='tab']");
  if ((await tabs.count()) < 2) return true;
  await tabs.nth(1).scrollIntoViewIfNeeded();
  await tabs.nth(1).tap();
  return (await tabs.nth(1).getAttribute("aria-selected")) === "true";
});
await check("FAQ accordion opens on tap", async () => {
  const s = p.locator("main details summary").first();
  await s.scrollIntoViewIfNeeded();
  await s.tap();
  return p.evaluate(() => !!document.querySelector("main details[open]"));
});
await check("no horizontal scroll on iPhone 13 home", async () => {
  await p.goto(base + "/", { waitUntil: "networkidle" });
  return p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
});
await b.close();
for (const [n, r] of results) console.log(r.padEnd(6), n);
