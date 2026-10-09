import { chromium } from "playwright";
import fs from "node:fs";

const A = "http://localhost:3122"; // no delivery env
const W = "http://localhost:3124"; // CONTACT_WEBHOOK_URL -> mock on 3199
const results = [];
const check = (name, ok, info = "") => { results.push(ok); console.log(`${ok ? "PASS" : "FAIL"} ${name}${info ? "  " + info : ""}`); };

const browser = await chromium.launch();
const page = await browser.newPage();

async function open(base, qs = "") {
  await page.goto(`${base}/contact${qs}#contact-form`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
}
async function fill(opts = {}) {
  await page.fill("#cf-name", "Test Person");
  await page.fill("#cf-email", opts.email ?? "test@example.com");
  await page.fill("#cf-phone", "+44 20 7946 0000");
  await page.selectOption("#cf-type", "general");
  await page.fill("#cf-subject", "Hello there");
  await page.fill("#cf-message", "This is a test message that is long enough.");
  await page.check('input[name="consent"]');
}

// 1. empty submit
await open(A);
await page.click(".cf-submit");
const errs = await page.$$eval(".cf-error", (els) => els.map((e) => e.id));
check("empty submit shows errors", ["cf-name-err", "cf-email-err", "cf-type-err", "cf-subject-err", "cf-message-err", "cf-consent-err"].every((id) => errs.includes(id)), errs.join(","));
const desc = await page.getAttribute("#cf-name", "aria-describedby");
check("aria-describedby links error", desc?.includes("cf-name-err"), desc);
check("focus moves to first invalid field", (await page.evaluate(() => document.activeElement?.id)) === "cf-name");

// 2. invalid email
await open(A);
await fill({ email: "not-an-email" });
await page.click(".cf-submit");
check("invalid email error", (await page.textContent("#cf-email-err").catch(() => ""))?.includes("valid email"));

// 3. preselection
await open(A, "?type=vendor");
check("?type=vendor", (await page.inputValue("#cf-type")) === "vendor");
await open(A, "?type=publish");
check("?type=publish", (await page.inputValue("#cf-type")) === "publish");
await open(A, "?type=sales&product=hrmagix");
check("?type=sales&product=hrmagix", (await page.inputValue("#cf-type")) === "sales" && (await page.isChecked('input[value="hrmagix"]')));
await open(A, "?type=bogus&product=nope");
check("unknown params ignored", (await page.inputValue("#cf-type")) === "" && (await page.$$eval('input[name="products"]:checked', (e) => e.length)) === 0);
await open(A, "?topic=careers&role=Prompt%20Engineer");
check("careers role prefills subject", (await page.inputValue("#cf-subject")) === "Application: Prompt Engineer" && (await page.inputValue("#cf-type")) === "general");
await open(A, "?topic=media");
check("media topic", (await page.inputValue("#cf-subject")) === "Media enquiry");
await open(A, "?topic=vendor");
check("topic=vendor", (await page.inputValue("#cf-type")) === "vendor");

// 4. no env -> failure message
await open(A);
await fill();
await page.waitForTimeout(3200);
const [resA] = await Promise.all([page.waitForResponse("**/api/contact"), page.click(".cf-submit")]);
await page.waitForSelector(".cf-status--error, .cf-status--success");
const bodyA = await resA.json();
check("no env -> 503 not_configured + error message", resA.status() === 503 && bodyA.error === "not_configured" && (await page.$(".cf-status--error")) && !(await page.$(".cf-status--success")));

// 5. webhook configured -> success
fs.rmSync("scripts/_tmp_contact/received.jsonl", { force: true });
await open(W, "?type=sales&product=hrmagix");
await fill();
await page.selectOption("#cf-type", "sales");
await page.waitForTimeout(3200);
const [resW] = await Promise.all([page.waitForResponse("**/api/contact"), page.click(".cf-submit")]);
await page.waitForSelector(".cf-status--success, .cf-status--error");
const received = fs.existsSync("scripts/_tmp_contact/received.jsonl") ? fs.readFileSync("scripts/_tmp_contact/received.jsonl", "utf8").trim() : "";
let payload = {}; try { payload = JSON.parse(received.split("\n")[0]); } catch {}
check("webhook success shown", resW.status() === 200 && !!(await page.$(".cf-status--success")));
check("mock received payload", payload.email === "test@example.com" && payload.type === "sales" && payload.products?.includes("hrmagix"), received.slice(0, 160));
check("form reset after success", (await page.inputValue("#cf-name")) === "");

// 6. honeypot + timing + server validation via API
const base = { name: "Bot", email: "b@example.com", type: "general", subject: "Hi there", message: "x".repeat(30), consent: true, products: [] };
const post = (b) => fetch(`${W}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 200)}` }, body: JSON.stringify(b) });
let r = await post({ ...base, website: "http://spam", startedAt: Date.now() - 10000 });
check("honeypot rejected", r.status === 400 && (await r.json()).error === "spam_detected");
r = await post({ ...base, startedAt: Date.now() });
check("too-fast submit rejected", r.status === 400);
r = await post({ ...base, startedAt: Date.now() - 10000, products: ["not-a-product"], type: "nope" });
const j = await r.json();
check("server validation (bad product/type)", r.status === 422 && j.fields?.products && j.fields?.type);
// rate limit: same IP, 6 requests
let last;
for (let i = 0; i < 6; i++) last = await fetch(`${A}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": "10.9.9.9" }, body: "{}" });
check("rate limit 429 after 5", last.status === 429);

// 7. screenshots 375/1440 light/dark + overflow
for (const scheme of ["light", "dark"]) for (const width of [375, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto(`${A}/contact?type=sales&product=hrmagix#contact-form`, { waitUntil: "networkidle" });
  await p.click(".cf-submit");
  const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const theme = await p.evaluate(() => document.documentElement.dataset.theme ?? getComputedStyle(document.body).backgroundColor);
  await p.locator("#contact-form").screenshot({ path: `scripts/_tmp_contact/shot-${scheme}-${width}.png` });
  check(`no overflow ${scheme} ${width}`, over <= 0, `theme=${theme}`);
  await ctx.close();
}

await browser.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
