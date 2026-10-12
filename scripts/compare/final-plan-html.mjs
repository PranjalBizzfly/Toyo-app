// Builds the reviewed expansion plan from scripts/_plan/<slug>.final.json → scripts/.compare/final-plan.html
import fs from "node:fs";
const ORDER = ["sigchanger", "sizoru", "zuzu", "trackysuite", "fleetras", "benj", "zorfly", "fantom", "cardizo", "theprojectchecker", "warwi", "meetingmind", "social-magix", "sopgalaxy", "growbizz", "taskmagix", "247meetings", "dizola", "channel-partner-portal", "finzola", "speechwright"];
const REF = { sigchanger: "Zoho Mail", sizoru: "Zoho DataPrep", zuzu: "Zoho Shifts", trackysuite: "Zoho Contracts", fleetras: "Zoho Inventory", benj: "Zoho Marketing Automation", zorfly: "Zoho Connect", fantom: "Zoho Directory", cardizo: "Zoho Campaigns", warwi: "Zoho SalesIQ", theprojectchecker: "Zoho BugTracker", sopgalaxy: "Zoho People", "social-magix": "Zoho PageSense", meetingmind: "Zoho Show", growbizz: "Zoho Forms", taskmagix: "Zoho Projects", dizola: "Zoho Sign", "247meetings": "Zoho Bookings", "channel-partner-portal": "Zoho Commerce", speechwright: "Zoho Backstage", finzola: "Zoho Finance Plus" };
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const host = (u) => { try { const x = new URL(u); return x.hostname.replace(/^www\./, "") + (x.pathname === "/" ? "" : x.pathname); } catch { return u; } };
const ORIGIN = { "user-kept": "Your topic", "user-renamed": "Your topic, renamed", "verified-feature": "Added: verified feature", "verified-other": "Added: verified page" };
const plans = ORDER.map((s) => { const f = `scripts/_plan/${s}.final.json`; return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null; }).filter(Boolean);
const statusCls = (p) => (p.projected >= 60 ? "s60" : p.projected >= 50 ? "s50" : "slow");
const sections = plans.map((p) => {
  const kept = p.pages.filter((x) => /^user/.test(x.origin)).length;
  const rows = p.pages.map((x) => `<tr><td class="n">${esc(x.n)}</td><td><span class="nm">${esc(x.name)}</span><span class="bs">${esc(x.description)}</span><span class="tag o-${esc(x.origin)}">${esc(ORIGIN[x.origin] ?? x.origin)}</span></td><td class="u"><code>${esc(x.slug)}</code></td><td class="t">${esc(x.type)}</td><td class="src">${x.source ? `<a href="${esc(x.source)}" rel="noopener">${esc(host(x.source))}</a>` : ""}${x.quote ? `<q>${esc(String(x.quote).slice(0, 160))}</q>` : ""}</td></tr>`).join("");
  const rej = (p.rejected ?? []).map((r) => `<li><b>${esc(r.userNo ?? "")}</b> ${esc(r.name)} <span>${esc(r.reason)}</span></li>`).join("");
  return `<section class="prod" id="${esc(p.slug)}"><header class="ph"><h2>${esc(p.name)}</h2>
<dl class="meta"><div><dt>Current</dt><dd>${p.current}</dd></div><div><dt>New</dt><dd>${p.pages.length}</dd></div><div><dt>Projected</dt><dd class="${statusCls(p)}">${p.projected}</dd></div><div><dt>Design reference</dt><dd>${esc(REF[p.slug] ?? "")}</dd></div></dl></header>
<p class="sum">Pages ${p.current + 1} to ${p.projected}. ${kept} of your topics kept, ${(p.rejected ?? []).length} left out. <span class="${statusCls(p)}">${esc(p.status)}</span></p>
${p.pages.length ? `<div class="tw"><table><thead><tr><th>#</th><th>Page</th><th>URL</th><th>Type</th><th>Official source</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="none">No new page is supported by the official site.</p>`}
${rej ? `<details><summary>Your topics left out (${(p.rejected ?? []).length})</summary><ul class="rej">${rej}</ul></details>` : ""}</section>`;
}).join("\n");
const sumRows = plans.map((p) => `<tr><td><a href="#${esc(p.slug)}">${esc(p.name)}</a></td><td class="num">${p.current}</td><td class="num">${p.pages.length}</td><td class="num ${statusCls(p)}">${p.projected}</td><td>${esc(p.status)}</td></tr>`).join("");
const T = plans.reduce((a, p) => ({ c: a.c + p.current, n: a.n + p.pages.length }), { c: 0, n: 0 });
const nav = plans.map((p) => `<a href="#${esc(p.slug)}"><span>${esc(p.name.replace(/ \(.*\)/, ""))}</span><b class="${statusCls(p)}">${p.current}→${p.projected}</b></a>`).join("");
const html = `<title>ToyoApps Expansion Plan</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,600&display=swap">
<style>
/* Layout: product index on the left, one numbered page ledger per product, summary table last; stacks on phones. */
:root { --bg:#f6f7f4; --panel:#fff; --fg:#1d2522; --mute:#5c6863; --line:#dfe3dd; --accent:#1f6b52; --ok:#1f6b52; --mid:#8a5a00; --low:#a63d2f; --tagbg:#e8efe9;
  --display:"Fraunces", Georgia, serif; --body:"IBM Plex Sans", system-ui, sans-serif; --mono:"IBM Plex Mono", ui-monospace, monospace; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#121614; --panel:#1a201d; --fg:#e4e9e5; --mute:#a3b0a9; --line:#2c3531; --accent:#6cc6a0; --ok:#6cc6a0; --mid:#e2a650; --low:#ef8a7a; --tagbg:#23302a; color-scheme: dark; } }
:root[data-theme="dark"] { --bg:#121614; --panel:#1a201d; --fg:#e4e9e5; --mute:#a3b0a9; --line:#2c3531; --accent:#6cc6a0; --ok:#6cc6a0; --mid:#e2a650; --low:#ef8a7a; --tagbg:#23302a; color-scheme: dark; }
body { background:var(--bg); color:var(--fg); font:15px/1.55 var(--body); }
.wrap { max-width:1320px; margin:0 auto; padding-inline:20px; padding-block:28px 64px; display:grid; grid-template-columns:250px minmax(0,1fr); gap:32px; }
.top { grid-column:1/-1; } h1 { font:600 clamp(26px,3.2vw,36px)/1.15 var(--display); margin:0 0 8px; text-wrap:balance; }
.lede { color:var(--mute); max-width:75ch; margin:0 0 14px; }
.totals { display:flex; flex-wrap:wrap; gap:10px 28px; font-variant-numeric:tabular-nums; } .totals b { font:600 22px var(--display); display:block; }
.totals span { font-size:12px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); }
nav.idx { position:sticky; top:calc(env(safe-area-inset-top,0px) + 16px); align-self:start; max-height:calc(100vh - 32px); overflow:auto; display:grid; gap:2px; }
nav.idx a { display:flex; justify-content:space-between; gap:8px; padding:7px 10px; border-radius:6px; color:var(--fg); text-decoration:none; font-size:14px; }
nav.idx a:hover, nav.idx a:focus-visible { background:var(--panel); outline:none; box-shadow:inset 2px 0 0 var(--accent); }
nav.idx b { font:500 12.5px var(--mono); font-variant-numeric:tabular-nums; }
main { display:grid; gap:44px; min-width:0; } .prod { min-width:0; scroll-margin-top:16px; }
.ph { display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:8px 24px; border-bottom:1px solid var(--line); padding-bottom:10px; }
.ph h2 { font:600 24px/1.2 var(--display); margin:0; }
.meta { display:flex; flex-wrap:wrap; gap:6px 20px; margin:0; font-variant-numeric:tabular-nums; } .meta div { display:flex; gap:6px; align-items:baseline; }
.meta dt { font-size:11.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); } .meta dd { margin:0; font-weight:600; }
.s60 { color:var(--ok); } .s50 { color:var(--mid); } .slow { color:var(--low); }
.sum { color:var(--mute); margin:10px 0 12px; } .sum span { font-weight:600; }
.tw { overflow-x:auto; background:var(--panel); border:1px solid var(--line); border-radius:8px; }
table { width:100%; border-collapse:collapse; font-size:14px; }
th { text-align:left; font-size:11.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); padding:10px 12px; border-bottom:1px solid var(--line); white-space:nowrap; }
td { padding:9px 12px; border-top:1px solid var(--line); vertical-align:top; }
td.n { width:40px; font:500 13px var(--mono); color:var(--mute); font-variant-numeric:tabular-nums; }
td.u code { font:12.5px var(--mono); color:var(--mute); word-break:break-all; } td.t { white-space:nowrap; font-size:13px; color:var(--mute); }
td.src { font-size:12.5px; max-width:260px; } td.src a { color:var(--accent); word-break:break-all; } td.src q { display:block; color:var(--mute); margin-top:3px; }
.nm { display:block; font-weight:500; } .bs { display:block; font-size:13px; color:var(--mute); margin-top:2px; }
.tag { display:inline-block; margin-top:5px; font-size:11px; letter-spacing:.04em; text-transform:uppercase; padding:1px 7px; border-radius:4px; background:var(--tagbg); color:var(--fg); }
details { margin-top:12px; } summary { cursor:pointer; color:var(--mute); font-size:14px; }
summary:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.rej { columns:2 320px; margin:10px 0 0; padding-left:18px; font-size:13.5px; } .rej li { break-inside:avoid; margin-bottom:5px; } .rej span { display:block; color:var(--mute); font-size:12.5px; }
.none { color:var(--mute); font-style:italic; }
.summary h2 { font:600 24px var(--display); margin:0 0 12px; } td.num { font-variant-numeric:tabular-nums; text-align:right; } .summary a { color:var(--fg); }
@media (max-width:860px) { .wrap { grid-template-columns:minmax(0,1fr); } nav.idx { position:static; max-height:none; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); } }
@media (prefers-reduced-motion:no-preference) { html { scroll-behavior:smooth; } }
</style>
<div class="wrap"><div class="top"><h1>ToyoApps expansion plan</h1>
<p class="lede">New pages for every product under 50 pages, numbered from each product's current count. Each of your proposed topics was checked against the product's official website: kept topics cite their source; unsupported, duplicate or wrong-product topics are listed as left out, and verified features from the official site fill the gaps. Nothing has been built yet.</p>
<div class="totals"><div><b>${plans.length}</b><span>Products</span></div><div><b>${T.c}</b><span>Pages today</span></div><div><b>${T.n}</b><span>New pages</span></div><div><b>${T.c + T.n}</b><span>Projected total</span></div></div></div>
<nav class="idx" aria-label="Products">${nav}<a href="#summary"><span>Summary table</span></a></nav>
<main>${sections}
<section class="prod summary" id="summary"><h2>Summary</h2><div class="tw"><table><thead><tr><th>Product</th><th>Current pages</th><th>New pages proposed</th><th>Projected total</th><th>Official verification status</th></tr></thead><tbody>${sumRows}</tbody></table></div></section>
</main></div>`;
fs.writeFileSync("scripts/.compare/final-plan.html", html);
console.log("plans", plans.length, "current", T.c, "new", T.n, "projected", T.c + T.n);
