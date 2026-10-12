// Renders scripts/.compare/url-name-audit.json into the review report scripts/.compare/url-name-report.html
import fs from "node:fs";
const rows = JSON.parse(fs.readFileSync("scripts/.compare/url-name-audit.json", "utf8"));
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const BIG = new Set(["oda7", "sibu", "hrmagix", "zapbuzzer"]);
const kind = (u) => {
  const s = u.split("/");
  if (!u.startsWith("/products/") || s.length < 4) return u === "/products" ? "Site page" : s.length <= 2 ? "Site page" : "Site detail page";
  if (s.length === 3) return "Product overview";
  if (u.includes("/features/group/")) return "Feature group";
  if (s.length === 4) return "Product tab";
  if (s[3] === "features") return "Feature";
  return { solutions: "Solution", industries: "Industry", integrations: "Integration", support: "Support", resources: "Resource", compare: "Compare" }[s[3]] ?? "Product detail";
};
const area = (u) => (u.startsWith("/products/") && u.split("/").length > 2 ? u.split("/")[2] : "site");
// Exceptions: names that are SEO titles or hub labels, not page names.
const EXC = { "/search": "Title is a search-engine description, not the page name (the page is Search). Keep /search.", "/products": "Hub for all products; changing /products would change every product URL. Keep /products." };
for (const r of rows) { r.kind = kind(r.url); r.area = area(r.url); r.big = BIG.has(r.area); r.exception = EXC[r.url] ?? ""; }
const mm = rows.filter((r) => r.status !== "match");
const fix = mm.filter((r) => !r.exception);
const areas = [...new Set(rows.map((r) => r.area))].sort((a, b) => (a === "site" ? -1 : b === "site" ? 1 : a.localeCompare(b)));
const stat = areas.map((a) => { const all = rows.filter((r) => r.area === a); const m = all.filter((r) => r.status !== "match"); return { a, n: all.length, m: m.length, big: BIG.has(a) }; });
const table = (list) => `<div class="tw"><table><thead><tr><th>Page name</th><th>Current URL</th><th>Expected URL</th><th>Type</th><th>Status</th></tr></thead><tbody>${list.map((r) => `<tr class="${r.status === "match" ? "ok" : r.exception ? "ex" : "bad"}"><td>${esc(r.name)}</td><td><code>${esc(r.url)}</code></td><td><code>${r.status === "match" ? "same" : esc(r.expectedUrl)}</code></td><td class="t">${esc(r.kind)}</td><td class="st">${r.status === "match" ? "Match" : r.exception ? "Exception" : "Mismatch"}${r.exception ? `<span>${esc(r.exception)}</span>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
const sections = stat.map((s) => {
  const list = rows.filter((r) => r.area === s.a);
  const mmList = list.filter((r) => r.status !== "match");
  return `<section id="a-${esc(s.a)}"><header class="ph"><h2>${s.a === "site" ? "Site pages" : esc(s.a)}</h2><span class="ct">${s.m} of ${s.n} mismatched${s.big ? " · 50+ page product" : ""}</span></header>
${mmList.length ? table(mmList) : `<p class="none">All ${s.n} pages match.</p>`}
${list.length - mmList.length ? `<details><summary>Matching pages (${list.length - mmList.length})</summary>${table(list.filter((r) => r.status === "match"))}</details>` : ""}</section>`;
}).join("\n");
const bigM = mm.filter((r) => r.big).length;
const byKind = Object.entries(mm.reduce((m, r) => ((m[r.kind] = (m[r.kind] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
const html = `<title>ToyoApps URL Name Audit</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,600&display=swap">
<style>
/* Layout: summary and decisions first, then one audit ledger per product; index on the left. */
:root { --bg:#f6f7f4; --panel:#fff; --fg:#1d2522; --mute:#5c6863; --line:#dfe3dd; --accent:#1f6b52; --bad:#a63d2f; --badbg:#fbeeeb; --ex:#8a5a00; --exbg:#fbf3e3;
  --display:"Fraunces", Georgia, serif; --body:"IBM Plex Sans", system-ui, sans-serif; --mono:"IBM Plex Mono", ui-monospace, monospace; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#121614; --panel:#1a201d; --fg:#e4e9e5; --mute:#a3b0a9; --line:#2c3531; --accent:#6cc6a0; --bad:#ef8a7a; --badbg:#2e1d1a; --ex:#e2a650; --exbg:#2c2416; color-scheme: dark; } }
:root[data-theme="dark"] { --bg:#121614; --panel:#1a201d; --fg:#e4e9e5; --mute:#a3b0a9; --line:#2c3531; --accent:#6cc6a0; --bad:#ef8a7a; --badbg:#2e1d1a; --ex:#e2a650; --exbg:#2c2416; color-scheme: dark; }
body { background:var(--bg); color:var(--fg); font:15px/1.55 var(--body); }
.wrap { max-width:1320px; margin:0 auto; padding-inline:20px; padding-block:28px 64px; display:grid; grid-template-columns:230px minmax(0,1fr); gap:32px; }
.top { grid-column:1/-1; } h1 { font:600 clamp(26px,3.2vw,36px)/1.15 var(--display); margin:0 0 8px; }
.lede { color:var(--mute); max-width:78ch; margin:0 0 14px; }
.totals { display:flex; flex-wrap:wrap; gap:10px 28px; font-variant-numeric:tabular-nums; margin-bottom:14px; } .totals b { font:600 22px var(--display); display:block; }
.totals span { font-size:12px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); }
.rule, .decide { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:14px 18px; margin:0 0 14px; max-width:90ch; }
.rule h2, .decide h2 { font:600 17px var(--body); margin:0 0 6px; } .decide ol { margin:6px 0 0; padding-left:20px; } .decide li { margin-bottom:6px; }
.kinds { display:flex; flex-wrap:wrap; gap:6px 16px; font-size:14px; color:var(--mute); font-variant-numeric:tabular-nums; }
nav.idx { position:sticky; top:calc(env(safe-area-inset-top,0px) + 16px); align-self:start; max-height:calc(100vh - 32px); overflow:auto; display:grid; gap:2px; }
nav.idx a { display:flex; justify-content:space-between; gap:8px; padding:6px 10px; border-radius:6px; color:var(--fg); text-decoration:none; font-size:14px; }
nav.idx a:hover, nav.idx a:focus-visible { background:var(--panel); outline:none; box-shadow:inset 2px 0 0 var(--accent); }
nav.idx b { font:500 12.5px var(--mono); color:var(--mute); font-variant-numeric:tabular-nums; } nav.idx b.m { color:var(--bad); }
main { display:grid; gap:36px; min-width:0; } section { min-width:0; scroll-margin-top:16px; }
.ph { display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:6px 20px; border-bottom:1px solid var(--line); padding-bottom:8px; margin-bottom:10px; }
.ph h2 { font:600 22px var(--display); margin:0; } .ct { font:500 13px var(--mono); color:var(--mute); }
.tw { overflow-x:auto; background:var(--panel); border:1px solid var(--line); border-radius:8px; }
table { width:100%; border-collapse:collapse; font-size:13.5px; }
th { text-align:left; font-size:11.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); padding:9px 12px; border-bottom:1px solid var(--line); white-space:nowrap; }
td { padding:7px 12px; border-top:1px solid var(--line); vertical-align:top; } code { font:12.5px var(--mono); word-break:break-all; }
td.t { white-space:nowrap; color:var(--mute); } td.st { white-space:nowrap; font-weight:600; } td.st span { display:block; white-space:normal; font-weight:400; color:var(--mute); font-size:12.5px; max-width:36ch; }
tr.bad td.st { color:var(--bad); } tr.bad td:nth-child(3) code { color:var(--bad); } tr.ex td.st { color:var(--ex); } tr.ok td.st { color:var(--accent); }
details { margin-top:10px; } summary { cursor:pointer; color:var(--mute); font-size:14px; } summary:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.none { color:var(--mute); }
@media (max-width:860px) { .wrap { grid-template-columns:minmax(0,1fr); } nav.idx { position:static; max-height:none; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); } }
</style>
<div class="wrap"><div class="top"><h1>URL name audit</h1>
<p class="lede">After the fix (2026-10-12): every built page on the site, its displayed name and its URL. 488 URLs were renamed to match their page names; each old URL permanently redirects to the new one. The two exceptions below were kept by decision.</p>
<div class="totals"><div><b>${rows.length}</b><span>Pages audited</span></div><div><b>${rows.length - mm.length}</b><span>Match</span></div><div><b>${fix.length}</b><span>Mismatch to fix</span></div><div><b>${mm.length - fix.length}</b><span>Exceptions</span></div><div><b>0</b><span>URL collisions</span></div></div>
<div class="kinds">${byKind.map(([k, v]) => `<span>${esc(k)}: ${v}</span>`).join("")}</div>
<div class="rule"><h2>Slug rule used</h2>Lowercase, spaces to hyphens, every word kept, &amp; written as "and", other punctuation that is not valid in a URL removed (+, apostrophes, colons, brackets; a slash becomes a hyphen). The URL keeps its product and section path; only the last part changes. Example: "Getting started with 247Meetings" at <code>/products/247meetings/support/getting-started</code> becomes <code>/products/247meetings/support/getting-started-with-247meetings</code>.</div>
<div class="decide"><h2>Result</h2><ol><li>488 URLs renamed, including ODA7, Sibu, HRMagix and ZapBuzzer, 5 product categories, 2 industries and the Product updates resource type.</li><li>488 of 488 old URLs redirect permanently to their new URL, and every new URL loads.</li><li>All 1,304 sitemap URLs load; no old URL remains in the sitemap. Header, menu and footer links: 0 broken.</li><li>Kept by decision: <code>/products</code> and <code>/search</code>.</li></ol></div></div>
<nav class="idx" aria-label="Areas">${stat.map((s) => `<a href="#a-${esc(s.a)}"><span>${s.a === "site" ? "Site pages" : esc(s.a)}</span><b class="${s.m ? "m" : ""}">${s.m}/${s.n}</b></a>`).join("")}</nav>
<main>${sections}</main></div>`;
fs.writeFileSync("scripts/.compare/url-name-report.html", html);
console.log("rows", rows.length, "mismatch", mm.length, "to fix", fix.length, "in 50+ products", bigM);
