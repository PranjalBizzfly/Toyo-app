import { chromium } from "playwright";
const base = "http://localhost:3121";
const browser = await chromium.launch();
let fails = 0;
const fail = (m) => { fails++; console.log("FAIL", m); };
const ok = (m) => console.log("ok  ", m);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
const rows = () => page.locator(".srch-list > li").count();
const count = async () => Number(await page.locator('[data-testid="result-count"]').textContent());
const loadAll = async () => { while (await page.locator(".srch-more").count()) await page.locator(".srch-more").click(); };
const allHrefs = new Set();

await page.goto(base + "/search", { waitUntil: "networkidle" });
const h1 = await page.locator("h1").allTextContents();
h1.length === 1 && h1[0] === "Find The Right Software For Your Business" ? ok("single H1") : fail("h1 " + h1);
const robots = await page.locator('meta[name="robots"]').getAttribute("content");
/noindex/.test(robots) && /follow/.test(robots) && !/nofollow/.test(robots) ? ok("robots " + robots) : fail("robots " + robots);
(await page.locator('link[rel="canonical"]').getAttribute("href"))?.endsWith("/search") ? ok("canonical") : fail("canonical");
(await page.locator(".srch-cat").count()) === 5 ? ok("5 categories") : fail("cats " + (await page.locator(".srch-cat").count()));
const featured = await page.locator(".srch-featured a").count();
featured > 0 ? ok("featured " + featured) : fail("featured");
const ph = await page.locator("input[role=combobox]").getAttribute("placeholder");
ph === "Search products, features, solutions, integrations..." ? ok("placeholder") : fail(ph);
const popular = (await page.locator(".srch-popular button").allTextContents()).map((s) => s.trim());
console.log("     popular:", popular.join(" | "));
for (const p of popular) {
  await page.goto(base + "/search?q=" + encodeURIComponent(p), { waitUntil: "networkidle" });
  if (!((await count()) >= 1)) fail("popular no results " + p);
}
ok("popular searches all return results");

for (const q of ["payroll", "signature", "whatsapp", "market sizing", "zzzz"]) {
  await page.goto(base + "/search", { waitUntil: "networkidle" });
  const input = page.locator("input[role=combobox]");
  await input.fill(q);
  await page.waitForTimeout(400);
  const groups = await page.locator(".srch-suggest__label").allTextContents();
  const opts = await page.locator("[role=option]").count();
  console.log(`     [${q}] suggestion groups: ${groups.join(", ") || "-"} (${opts} options)`);
  await input.press("Enter");
  await page.waitForTimeout(300);
  if (new URL(page.url()).searchParams.get("q") !== q) fail("url sync " + page.url());
  if (q === "zzzz") {
    const t = await page.locator(".srch-empty h2").textContent();
    t === "We Couldn’t Find An Exact Match" || t === "We Couldn't Find An Exact Match" ? ok("no results state") : fail("empty " + t);
    const links = await page.locator(".srch-empty__links a").allTextContents();
    links.length === 4 ? ok("no-result links: " + links.join(", ")) : fail("links " + links);
    continue;
  }
  const head = await page.locator("#srch-results-h").textContent();
  if (head !== `Search results for “${q}”`) fail("heading " + head);
  const n = await count();
  while (await page.locator(".srch-more").count()) {
    const before = await rows();
    await page.locator(".srch-more").click();
    const after = await rows();
    if (after - before > 20 || after <= before) fail("load more step " + before + "->" + after);
  }
  (await rows()) === n ? ok(`[${q}] ${n} results, rows match`) : fail(`[${q}] count ${n} rows ${await rows()}`);
  for (const h of await page.locator(".srch-row h3 a").evaluateAll((as) => as.map((a) => a.getAttribute("href")))) allHrefs.add(h);
  if (!((await page.locator(".srch-row mark").count()) > 0)) fail("no highlight " + q);
  if (q === "market sizing") console.log("     market sizing mode:", (await page.locator(".srch-note").count()) ? "any-word fallback" : "all words");
  const fs = page.locator(".srch-facet");
  const nf = await fs.count();
  const firstCounts = [];
  for (let i = 0; i < nf; i++) {
    const opt = fs.nth(i).locator(".srch-facet__opt").first();
    const expected = Number(await opt.locator("small").textContent());
    await opt.locator("input").check();
    await loadAll();
    const c = await count();
    const r = await rows();
    if (!(c === expected && r === c)) fail(`[${q}] facet ${i} expected ${expected} got ${c}/${r}`);
    firstCounts.push(c);
    await page.locator(".srch-filters__head button").click();
  }
  // Combine: pick a product option (or type), then another facet still on screen.
  await fs.nth(nf > 1 ? 1 : 0).locator(".srch-facet__opt input").first().check();
  const unchecked = page.locator(".srch-facet").filter({ hasNot: page.locator("input:checked") });
  if (nf >= 2 && (await unchecked.count()) > 0) {
    const exp = Number(await unchecked.first().locator(".srch-facet__opt small").first().textContent());
    await unchecked.first().locator(".srch-facet__opt input").first().check();
    await loadAll();
    const c = await count();
    c === exp && (await rows()) === c ? ok(`[${q}] ${nf} facets work alone; combined -> ${c}`) : fail(`[${q}] combined ${c} exp ${exp}`);
    if ((await page.locator(".srch-chips button").count()) !== 3) fail("chips");
    await page.locator(".srch-chips__clear").click();
    if ((await count()) !== n) fail("clear all");
  } else {
    ok(`[${q}] ${nf} facet(s); no second facet left to combine`);
    await page.locator(".srch-filters__head button").click();
  }
  await page.locator(".srch-sort select").selectOption("az");
  await loadAll();
  const titles = await page.locator(".srch-row h3 a").allTextContents();
  const sorted = [...titles].sort((a, b) => a.localeCompare(b));
  if (JSON.stringify(titles) !== JSON.stringify(sorted)) fail("az sort " + q);
}

await page.goto(base + "/search", { waitUntil: "networkidle" });
const input = page.locator("input[role=combobox]");
await input.fill("payroll");
await page.waitForTimeout(400);
if ((await input.getAttribute("aria-expanded")) !== "true") fail("not expanded");
await input.press("ArrowDown");
await input.press("ArrowDown");
await input.press("ArrowUp");
const act = await input.getAttribute("aria-activedescendant");
const sel = await page.locator('[role=option][aria-selected="true"]').getAttribute("id");
act && act === sel ? ok("arrow keys move active option") : fail(`active ${act} sel ${sel}`);
await input.press("Escape");
(await input.getAttribute("aria-expanded")) === "false" ? ok("Escape closes") : fail("escape");
await input.press("ArrowDown");
const target = await page.locator('[role=option][aria-selected="true"]').getAttribute("href");
await Promise.all([page.waitForURL((u) => u.pathname === target.split("#")[0]), input.press("Enter")]);
ok("Enter opens highlighted -> " + target);

await page.goto(base + "/search?q=payroll", { waitUntil: "networkidle" });
(await page.locator("input[role=combobox]").inputValue()) === "payroll" ? ok("?q= read after mount") : fail("q read");
await page.locator(".srch-box__clear").click();
(await page.locator(".srch-cat").count()) === 5 && !page.url().includes("q=") ? ok("clear resets") : fail("clear");

let bad = 0;
for (const h of allHrefs) {
  const r = await fetch(base + h.split("#")[0]);
  if (r.status !== 200) { bad++; fail("link " + r.status + " " + h); }
}
ok(`${allHrefs.size} result links checked, ${bad} bad`);

for (const scheme of ["light", "dark"])
  for (const width of [320, 375, 1440]) {
    const c = await browser.newContext({ viewport: { width, height: 800 }, colorScheme: scheme });
    const p = await c.newPage();
    for (const u of ["/search", "/search?q=payroll", "/search?q=zzzz"]) {
      await p.goto(base + u, { waitUntil: "networkidle" });
      if (u.includes("payroll") && width < 1024) await p.locator(".srch-filtertoggle").click();
      const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (o > 0) fail(`${scheme} ${width} ${u} overflow ${o}`);
      if (width !== 320) await p.screenshot({ path: `scripts/_tmp_search/${scheme}-${width}-${u.replace(/\W+/g, "_")}.png`, fullPage: true });
    }
    await p.goto(base + "/search?q=payroll", { waitUntil: "networkidle" });
    if (width < 1024) {
      const vis0 = await p.locator(".srch-filters").isVisible();
      await p.locator(".srch-filtertoggle").click();
      const vis1 = await p.locator(".srch-filters").isVisible();
      if (!(!vis0 && vis1)) fail("mobile panel toggle");
    } else if (!(await p.locator(".srch-filters").isVisible())) fail("desktop sidebar");
    ok(`${scheme} ${width}: no overflow, filter layout ok`);
    await c.close();
  }
errs.length ? fail("page errors: " + errs.join("; ")) : ok("no page errors");
await browser.close();
console.log(fails ? `${fails} FAILED` : "all passed");
process.exit(fails ? 1 : 0);
