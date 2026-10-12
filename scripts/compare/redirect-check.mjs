// Every renamed URL: old → permanent redirect → new URL that returns 200.
// Every sitemap URL returns 200. Prints counts and any failures.
import fs from "node:fs";
const base = process.env.BASE ?? "http://localhost:6000";
const red = JSON.parse(fs.readFileSync("src/content/url-redirects.json", "utf8"));
red.push({ source: "/resources/updates", destination: "/resources/product-updates" });
const fails = [];
let ok = 0;
for (const { source, destination } of red) {
  const r = await fetch(base + source, { redirect: "manual" });
  const loc = r.headers.get("location") ?? "";
  const dest = loc.replace(/^https?:\/\/[^/]+/, "");
  if (![301, 307, 308].includes(r.status) || dest !== destination) { fails.push(`${source}: ${r.status} → ${dest || "(none)"} (expected ${destination})`); continue; }
  const n = await fetch(base + destination);
  if (n.status !== 200) { fails.push(`${destination}: ${n.status}`); continue; }
  ok++;
}
console.log(`redirects ok: ${ok}/${red.length}`);
const sm = await (await fetch(base + "/sitemap.xml")).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
let sOk = 0;
for (const u of urls) { const r = await fetch(base + u); if (r.status === 200) sOk++; else fails.push(`sitemap ${u}: ${r.status}`); }
console.log(`sitemap URLs ok: ${sOk}/${urls.length}`);
const oldInMap = urls.filter((u) => red.some((r) => r.source === u));
console.log(`old URLs still in sitemap: ${oldInMap.length}`);
for (const f of fails.slice(0, 20)) console.log("  FAIL " + f);
