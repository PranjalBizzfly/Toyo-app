// Builds the page-plan review document from scripts/.compare/inventory.json and scripts/_plan/<slug>.json.
// Output: scripts/.compare/page-plan.html (self-contained; data embedded).
import fs from "node:fs";
const inv = JSON.parse(fs.readFileSync("scripts/.compare/inventory.json", "utf8"));
const REFS = {
  sigchanger: ["SigChanger", "Zoho Mail"], sizoru: ["Sizoru", "Zoho DataPrep"], zuzu: ["ZUZU", "Zoho Shifts"],
  trackysuite: ["TrackySuite", "Zoho Contracts"], fleetras: ["Fleetras", "Zoho Inventory"], benj: ["Benj", "Zoho Marketing Automation"],
  zorfly: ["Zorfly", "Zoho Connect"], fantom: ["Fantom", "Zoho Directory"], cardizo: ["Cardizo", "Zoho Campaigns"],
  warwi: ["Warwi", "Zoho SalesIQ"], theprojectchecker: ["TheProjectChecker", "Zoho BugTracker"], sopgalaxy: ["SOPGalaxy", "Zoho People"],
  "social-magix": ["Social Magix", "Zoho PageSense"], meetingmind: ["MeetingMind", "Zoho Show"], growbizz: ["GrowBizz", "Zoho Forms"],
  taskmagix: ["TaskMagix", "Zoho Projects"], dizola: ["Dizola", "Zoho Sign"], "247meetings": ["247Meetings", "Zoho Bookings"],
  "channel-partner-portal": ["Channel Partner Portal (1XL Infra)", "Zoho Commerce"], speechwright: ["Speechwright", "Zoho Backstage"], finzola: ["FINZOLA", "Zoho Finance Plus"],
};
const data = Object.entries(REFS).map(([slug, [name, ref]]) => {
  const fp = `scripts/_plan/${slug}.features.json`;
  const plan = fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, "utf8")) : { featurePages: [], newGroups: [], otherPages: [] };
  const existing = (inv[slug] ?? []).map((p) => ({ name: p.name, url: p.url, type: p.type }));
  const detailLabel = { rich: "explained on the site", brief: "one line on the site", "name-only": "named on the site" };
  const proposed = [
    ...(plan.featurePages ?? []).map((p) => ({ name: p.name, url: p.url, type: "Feature detail", basis: `${p.group ? p.group + " · " : ""}${detailLabel[p.detail] ?? p.detail}${p.sourceText ? ": “" + String(p.sourceText).slice(0, 140) + "”" : ""}` })),
    ...(plan.newGroups ?? []).map((g) => ({ name: g.name, url: g.url, type: "Feature group", basis: "" })),
  ];
  const guides = (plan.otherPages ?? []).map((p) => ({ name: p.name, url: p.url, type: p.type, basis: p.basis ?? "" }));
  const notes = (plan.shortfall ? `Short of 60 by ${plan.shortfall}. ` : "") + (plan.shortfallReason ?? "");
  return { slug, name, ref, existing, proposed, guides, notes };
});
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rows = (list, start, kind) => list.map((p, i) => `<tr class="k-${kind}"><td class="n">${start + i}</td><td><span class="nm">${esc(p.name)}</span>${p.basis ? `<span class="bs">${esc(p.basis)}</span>` : ""}</td><td class="u"><code>${esc(p.url)}</code></td><td class="t">${esc(p.type)}</td></tr>`).join("");
const total = (d) => d.existing.length + d.proposed.length + d.guides.length;
const sections = data.map((d) => {
  const a = d.existing.length, b = d.proposed.length, c = d.guides.length;
  return `<section class="prod" id="${d.slug}" aria-labelledby="h-${d.slug}">
  <header class="ph"><h2 id="h-${d.slug}">${esc(d.name)}</h2>
  <dl class="meta"><div><dt>Design reference</dt><dd>${esc(d.ref)}</dd></div><div><dt>Existing</dt><dd>${a}</dd></div><div><dt>New feature pages</dt><dd>${b}</dd></div><div><dt>Other new pages</dt><dd>${c}</dd></div><div><dt>Total</dt><dd class="${total(d) >= 60 ? "ok" : "short"}">${total(d)}</dd></div></dl></header>
  <div class="bar" role="img" aria-label="${a} existing, ${b} new product pages, ${c} guides"><span class="be" style="flex:${a}"></span><span class="bp" style="flex:${b || 0.0001}"></span><span class="bg" style="flex:${c || 0.0001}"></span></div>
  <div class="tw"><table><thead><tr><th>#</th><th>Page</th><th>URL</th><th>Type</th></tr></thead>
  <tbody><tr class="grp"><td colspan="4">Existing pages (${a}) · unchanged</td></tr>${rows(d.existing, 1, "e")}
  <tr class="grp"><td colspan="4">New feature pages (${b})</td></tr>${b ? rows(d.proposed, a + 1, "p") : `<tr><td></td><td colspan="3" class="none">None: the official site names no further features.</td></tr>`}
  <tr class="grp"><td colspan="4">Other new pages from the official site (${c})</td></tr>${rows(d.guides, a + b + 1, "g")}</tbody></table></div>
  ${d.notes ? `<p class="note"><b>Research note:</b> ${esc(d.notes)}</p>` : ""}
</section>`;
}).join("\n");
const sum = data.reduce((s, d) => ({ e: s.e + d.existing.length, p: s.p + d.proposed.length, g: s.g + d.guides.length }), { e: 0, p: 0, g: 0 });
const nav = data.map((d) => `<a href="#${d.slug}"><span>${esc(d.name.replace(/ \(.*\)$/, ""))}</span><b>${d.existing.length}→${total(d)}</b></a>`).join("");
const html = `<title>ToyoApps 60-Page Plan</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,600&display=swap">
<style>
/* Layout: sticky product index on the left, one long ledger per product on the right; stacks on phones. */
:root { --bg:#f6f7f4; --panel:#ffffff; --fg:#1d2522; --mute:#5c6863; --line:#dfe3dd; --accent:#1f6b52; --existing:#9aa8a1; --newp:#1f6b52; --guide:#c98a2b; --short:#a63d2f;
  --display:"Fraunces", Georgia, serif; --body:"IBM Plex Sans", system-ui, sans-serif; --mono:"IBM Plex Mono", ui-monospace, monospace; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#121614; --panel:#1a201d; --fg:#e4e9e5; --mute:#a3b0a9; --line:#2c3531; --accent:#6cc6a0; --existing:#5f6d66; --newp:#4fae86; --guide:#e2a650; --short:#ef8a7a; color-scheme: dark; } }
:root[data-theme="dark"] { --bg:#121614; --panel:#1a201d; --fg:#e4e9e5; --mute:#a3b0a9; --line:#2c3531; --accent:#6cc6a0; --existing:#5f6d66; --newp:#4fae86; --guide:#e2a650; --short:#ef8a7a; color-scheme: dark; }
body { background:var(--bg); color:var(--fg); font:15px/1.55 var(--body); }
.wrap { max-width:1280px; margin:0 auto; padding-inline:20px; padding-block:28px 64px; display:grid; grid-template-columns:240px minmax(0,1fr); gap:32px; }
h1 { font:600 clamp(26px,3.2vw,36px)/1.15 var(--display); margin:0 0 8px; text-wrap:balance; }
.lede { color:var(--mute); max-width:70ch; margin:0 0 18px; }
.top { grid-column:1/-1; }
.key { display:flex; flex-wrap:wrap; gap:16px 22px; font-size:13.5px; color:var(--mute); }
.key i { display:inline-block; width:12px; height:12px; border-radius:3px; vertical-align:-1px; margin-right:6px; }
.totals { display:flex; flex-wrap:wrap; gap:10px 28px; margin:14px 0 4px; font-variant-numeric:tabular-nums; }
.totals b { font:600 22px var(--display); display:block; }
.totals span { font-size:12px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); }
nav.idx { position:sticky; top:calc(env(safe-area-inset-top,0px) + 16px); align-self:start; max-height:calc(100vh - 32px); overflow:auto; display:grid; gap:2px; }
nav.idx a { display:flex; justify-content:space-between; gap:8px; padding:7px 10px; border-radius:6px; color:var(--fg); text-decoration:none; font-size:14px; }
nav.idx a:hover, nav.idx a:focus-visible { background:var(--panel); outline:none; box-shadow:inset 2px 0 0 var(--accent); }
nav.idx b { font:500 12.5px var(--mono); color:var(--mute); font-variant-numeric:tabular-nums; }
main { display:grid; gap:40px; min-width:0; }
.prod { min-width:0; scroll-margin-top:16px; }
.ph { display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:8px 24px; border-bottom:1px solid var(--line); padding-bottom:10px; }
.ph h2 { font:600 24px/1.2 var(--display); margin:0; }
.meta { display:flex; flex-wrap:wrap; gap:6px 20px; margin:0; font-variant-numeric:tabular-nums; }
.meta div { display:flex; gap:6px; align-items:baseline; }
.meta dt { font-size:11.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); }
.meta dd { margin:0; font-weight:600; }
.meta dd.ok { color:var(--accent); } .meta dd.short { color:var(--short); }
.bar { display:flex; height:8px; border-radius:4px; overflow:hidden; margin:12px 0 14px; background:var(--line); }
.be { background:var(--existing); } .bp { background:var(--newp); } .bg { background:var(--guide); }
.tw { overflow-x:auto; background:var(--panel); border:1px solid var(--line); border-radius:8px; }
table { width:100%; border-collapse:collapse; font-size:14px; }
th { text-align:left; font-size:11.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--mute); padding:10px 12px; border-bottom:1px solid var(--line); }
td { padding:8px 12px; border-top:1px solid var(--line); vertical-align:top; }
td.n { width:36px; font:500 13px var(--mono); color:var(--mute); font-variant-numeric:tabular-nums; }
td.u code { font:12.5px var(--mono); color:var(--mute); word-break:break-all; }
td.t { white-space:nowrap; font-size:13px; color:var(--mute); }
.nm { display:block; } .bs { display:block; font-size:12.5px; color:var(--mute); margin-top:2px; }
tr.grp td { background:var(--bg); font-size:12px; letter-spacing:.05em; text-transform:uppercase; font-weight:600; color:var(--fg); padding-block:9px; }
tr.k-e td.n { box-shadow:inset 3px 0 0 var(--existing); } tr.k-p td.n { box-shadow:inset 3px 0 0 var(--newp); } tr.k-g td.n { box-shadow:inset 3px 0 0 var(--guide); }
td.none { color:var(--mute); font-style:italic; }
.note { color:var(--mute); font-size:13.5px; max-width:80ch; margin:10px 0 0; }
@media (max-width:860px) { .wrap { grid-template-columns:minmax(0,1fr); } nav.idx { position:static; max-height:none; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); } td.u { display:none; } th:nth-child(3) { display:none; } }
@media (prefers-reduced-motion:no-preference) { html { scroll-behavior:smooth; } }
</style>
<div class="wrap">
<div class="top">
<h1>ToyoApps 60-page plan</h1>
<p class="lede">Every product under 50 pages, expanded toward 60 with one page per feature, including small features. Each new page explains its feature using only what the product's own website states. Where a site does not name enough features, the product stops short and the reason is given. Products with 50 or more pages are not touched.</p>
<div class="key"><span><i style="background:var(--existing)"></i>Existing page (unchanged)</span><span><i style="background:var(--newp)"></i>New feature page</span><span><i style="background:var(--guide)"></i>Other new page (solution, support, integration, hub)</span></div>
<div class="totals"><div><b>${data.length}</b><span>Products</span></div><div><b>${sum.e}</b><span>Existing pages</span></div><div><b>${sum.p}</b><span>New feature pages</span></div><div><b>${sum.g}</b><span>Other new pages</span></div><div><b>${sum.e + sum.p + sum.g}</b><span>Total after build</span></div></div>
</div>
<nav class="idx" aria-label="Products">${nav}</nav>
<main>${sections}</main>
</div>`;
fs.writeFileSync("scripts/.compare/page-plan.html", html);
console.log("products", data.length, "existing", sum.e, "proposed", sum.p, "guides", sum.g, "total", sum.e + sum.p + sum.g);
for (const d of data) if (total(d) !== 60) console.log("  not 60:", d.slug, total(d));
