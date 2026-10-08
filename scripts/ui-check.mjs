// Browser checks for global UI: `PLAYWRIGHT_BROWSERS_PATH=./.pw-browsers node scripts/ui-check.mjs [baseUrl]`
// Overflow at many widths in both themes, system preference, persistence, scroll toggle, mobile menu.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const widths = [320, 375, 390, 414, 768, 1024, 1080, 1280, 1440];
const pages = ["/", "/products", "/products/sibu", "/products/trackysuite/pricing", "/integrations"];
const shots = "scripts/.ui-shots";
mkdirSync(shots, { recursive: true });

const browser = await chromium.launch();
let failed = 0;
const fail = (m) => {
  failed++;
  console.log("FAIL", m);
};

// 1. Overflow + header fit, both themes
for (const theme of ["light", "dark"]) {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 }, colorScheme: theme });
    const page = await ctx.newPage();
    for (const path of pages) {
      await page.goto(base + path, { waitUntil: "networkidle" });
      const r = await page.evaluate(() => {
        const bar = document.querySelector(".site-header__bar");
        return {
          theme: document.documentElement.dataset.theme,
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          headerClip: bar ? bar.scrollWidth - bar.clientWidth : 0,
        };
      });
      if (r.theme !== theme) fail(`${theme} ${width} ${path}: system preference gave ${r.theme}`);
      if (r.overflow > 0) fail(`${theme} ${width} ${path}: horizontal overflow ${r.overflow}px`);
      if (r.headerClip > 0) fail(`${theme} ${width} ${path}: header clipped by ${r.headerClip}px`);
    }
    if ([390, 1440].includes(width)) await page.goto(base + "/", { waitUntil: "networkidle" }), await page.screenshot({ path: `${shots}/home-${theme}-${width}.png`, fullPage: false });
    await ctx.close();
  }
}
console.log("overflow/header checks done");

// 2. Persistence: choose dark on a light system, reload, still dark (and set before paint)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.click(".theme-toggle");
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== "dark") fail("toggle did not switch to dark");
  await page.reload({ waitUntil: "commit" });
  const early = await page.evaluate(() => document.documentElement.dataset.theme);
  if (early !== "dark") fail(`theme not persisted before paint (got ${early})`);
  const label = await page.getAttribute(".theme-toggle", "aria-label");
  console.log("persistence ok, toggle label:", label);
  await page.goto(base + "/products/sibu", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${shots}/product-dark-1280.png` });
  await ctx.close();
}

// 3. Scroll toggle: goes to bottom, flips, goes to top
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const btn = page.locator(".scroll-toggle");
  if ((await btn.getAttribute("data-direction")) !== "down") fail("scroll toggle should start as down");
  await btn.click();
  await page.waitForFunction(() => window.scrollY + innerHeight >= document.documentElement.scrollHeight - 4, null, { timeout: 5000 });
  await page.waitForFunction(() => document.querySelector(".scroll-toggle")?.getAttribute("data-direction") === "up");
  await btn.click();
  await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 5000 });
  console.log("scroll toggle ok (down → bottom, up → top)");
  // short page: no control (tall viewport so the 404 page doesn't scroll past the threshold)
  await page.setViewportSize({ width: 1440, height: 2600 });
  await page.goto(base + "/does-not-exist", { waitUntil: "networkidle" });
  if (await page.locator(".scroll-toggle").count()) fail("scroll toggle shown on a short page");
  await page.setViewportSize({ width: 390, height: 800 });

  // 4. Mobile menu: Home present, opens without overflow
  await page.goto(base + "/products", { waitUntil: "networkidle" });
  await page.click(".menu-toggle");
  if (!(await page.locator(".mobile-nav__home").isVisible())) fail("Home missing in mobile menu");
  const navBox = await page.locator(".mobile-nav").boundingBox();
  if (!navBox || navBox.height < 600) fail(`mobile menu overlay too short (${navBox?.height}px)`);
  await page.screenshot({ path: `${shots}/mobile-menu-390.png` });
  await page.click(".mobile-nav__home");
  await page.waitForURL(base + "/");
  console.log("mobile menu Home ok");
  await ctx.close();
}

await browser.close();
console.log(failed ? `\n${failed} problem(s)` : "\nall passed");
process.exit(failed ? 1 : 0);
