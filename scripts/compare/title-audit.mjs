// Audit Title Case across many pages: short text must render capitalised,
// paragraphs of 100+ words must stay in sentence case.
import { chromium } from "playwright";
const base = "http://localhost:3100";
const pages = [
  "/", "/products", "/products/category/sales-marketing", "/solutions", "/industries", "/integrations", "/search", "/company", "/contact", "/publish", "/support", "/legal/privacy",
  "/products/zuzu", "/products/sibu", "/products/oda7", "/products/trackysuite", "/products/hrmagix", "/products/cardizo", "/products/fantom", "/products/getbenj",
  "/products/oda7/features", "/products/sibu/pricing", "/products/oda7/resources/leads-workflow", "/products/oda7/solutions/for-sales-managers", "/products/zuzu/support",
];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
let totals = { short: 0, shortBad: 0, long: 0, longBad: 0 };
const samples = [];
for (const path of pages) {
  const r = await p.goto(base + path, { waitUntil: "networkidle" });
  await p.waitForTimeout(300);
  const res = await p.evaluate(() => {
    const out = { short: 0, shortBad: [], long: 0, longBad: [] };
    const els = [...document.querySelectorAll("h1,h2,h3,h4,p,li,a,button,label,summary,figcaption,dt,dd,td,th,small,strong")].filter((e) => e.offsetParent && e.children.length === 0 && (e.textContent || "").trim());
    for (const e of els) {
      const t = e.textContent.trim();
      const tf = getComputedStyle(e).textTransform;
      const block = e.closest("p,li,dd,blockquote,figcaption,td,[data-long]");
      const n = ((block ?? e).textContent.trim().match(/\S+/g) || []).length;
      if (n >= 100) { out.long++; if (tf === "capitalize") out.longBad.push(t.slice(0, 50)); }
      else if (!e.closest("code,pre,[data-tc-off]")) { out.short++; if (tf === "none" && /[a-z]/.test(t)) out.shortBad.push(t.slice(0, 50)); }
    }
    return out;
  });
  totals.short += res.short; totals.long += res.long; totals.shortBad += res.shortBad.length; totals.longBad += res.longBad.length;
  console.log(`${String(r.status()).padEnd(4)} ${path.padEnd(48)} short ${String(res.short).padStart(4)} (not cap ${res.shortBad.length})   long ${res.long} (wrongly cap ${res.longBad.length})`);
  if (res.shortBad.length) samples.push(`${path}: ${res.shortBad.slice(0, 3).join(" | ")}`);
}
console.log("\nTOTAL", JSON.stringify(totals));
if (samples.length) console.log("Uncapitalised samples:\n" + samples.join("\n"));
await p.goto(base + "/products/zuzu", { waitUntil: "networkidle" });
await p.screenshot({ path: "scripts/.compare/title-zuzu.png" });
await b.close();
