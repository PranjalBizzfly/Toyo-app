// FAQ audit: node scripts/faq-audit.mjs <base> <routesFile> <out.json>
// For every route: rendered FAQ items in the dedicated FAQ list (.faq-set details),
// duplicates, short answers, and whether FAQPage JSON-LD matches the visible items.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const [base, file, out = "scripts/.ref/faq-audit.json"] = process.argv.slice(2);
const routes = readFileSync(file, "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
const b = await chromium.launch();
const ctx = await b.newContext();
const results = [];
const CONC = 6;
let next = 0;
async function worker() {
  const p = await ctx.newPage();
  while (next < routes.length) {
    const r = routes[next++];
    try {
      await p.goto(base + r, { waitUntil: "domcontentloaded", timeout: 90000 });
      const d = await p.evaluate(() => {
        const sets = [...document.querySelectorAll("main .accordion")];
        const items = sets.flatMap((s) => [...s.querySelectorAll(":scope > details")]).map((x) => ({
          q: x.querySelector("summary")?.textContent.trim() ?? "",
          a: x.querySelector(".accordion__body")?.textContent.trim() ?? "",
        }));
        const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map((s) => { try { return JSON.parse(s.textContent); } catch { return null; } })
          .filter((j) => j && j["@type"] === "FAQPage");
        const ldQs = ld.flatMap((j) => j.mainEntity.map((m) => m.name));
        return { sets: sets.length, items, ldCount: ld.length, ldQs };
      });
      const qs = d.items.map((i) => i.q.toLowerCase());
      const dup = qs.length - new Set(qs).size;
      const short = d.items.filter((i) => i.a.split(/\s+/).length < 12).length;
      const ldMatch = d.ldCount === 1 && d.ldQs.length === d.items.length && d.ldQs.every((q) => d.items.some((i) => i.q === q));
      results.push({ route: r, count: d.items.length, sets: d.sets, dup, short, ldMatch, questions: d.items.map((i) => i.q), shortItems: d.items.filter((i) => i.a.split(/\s+/).length < 12).map((i) => `${i.q} => ${i.a}`) });
    } catch (e) {
      results.push({ route: r, error: e.message.slice(0, 80) });
    }
  }
  await p.close();
}
await Promise.all(Array.from({ length: CONC }, worker));
await b.close();
results.sort((a, z) => a.route.localeCompare(z.route));
writeFileSync(out, JSON.stringify(results, null, 1));
const ok = results.filter((x) => x.count === 8 && !x.dup && x.sets === 1 && x.ldMatch && !x.short);
const dist = {};
for (const x of results) dist[x.count ?? "err"] = (dist[x.count ?? "err"] ?? 0) + 1;
console.log("routes", results.length, "pass", ok.length, "count distribution", JSON.stringify(dist));
console.log("dups", results.filter((x) => x.dup).length, "multi-set", results.filter((x) => x.sets > 1).length, "ld-mismatch", results.filter((x) => x.count && !x.ldMatch).length, "short-answers", results.filter((x) => x.short).length, "errors", results.filter((x) => x.error).length);
