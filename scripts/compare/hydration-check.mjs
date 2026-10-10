// Loads pages in the dev server and reports React hydration errors in the console.
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:3000";
const pages = ["/", "/products", "/products/sibu", "/products/benj/pricing", "/contact-us", "/industries", "/about-toyoapps"];
const b = await chromium.launch();
const p = await b.newPage();
let errs = [];
p.on("console", (m) => { if (m.type() === "error" && /hydrat|didn't match/i.test(m.text())) errs.push(m.text().slice(0, 160)); });
for (const u of pages) {
  errs = [];
  await p.goto(base + u, { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  const marked = await p.$$eval("[data-long]", (e) => e.length);
  console.log(u, errs.length ? `HYDRATION ERRORS: ${errs.length} ${errs[0]}` : "ok", `| long paragraphs marked: ${marked}`);
}
await b.close();
