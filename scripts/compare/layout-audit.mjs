// Layout audit: staircase lists, leftover default list indents, content overflowing
// its card, clipped text, and uneven sibling cards. Desktop 1440 + mobile 390.
import { chromium } from "playwright";
import fs from "node:fs";
const base = "http://localhost:3100";
const PAGES = [
  "/", "/products", "/solutions", "/industries", "/integrations", "/search?q=pay", "/company", "/publish", "/support", "/vendors", "/careers",
  ...["zuzu", "sibu", "oda7", "trackysuite", "hrmagix", "cardizo", "fantom", "getbenj", "taskmagic", "sigchanger", "sizoru", "tracksuit", "zapbuzzer", "zorfly", "meetingmind", "fleetras"].map((s) => `/products/${s}`),
  "/products/oda7/features", "/products/sibu/features/search-by-anything", "/products/oda7/resources/leads-workflow", "/products/oda7/solutions/for-sales-managers", "/products/sibu/pricing",
];
const b = await chromium.launch({ args: ["--disable-gpu"] });
const issues = {};
const add = (kind, key, page, detail) => { const k = `${kind} | ${key}`; (issues[k] ??= { pages: new Set(), detail }).pages.add(page); };
for (const vw of [1440, 390]) {
  for (const path of PAGES) {
    const p = await b.newPage({ viewport: { width: vw, height: 900 } });
    const r = await p.goto(base + path, { waitUntil: "networkidle", timeout: 60000 }).catch(() => null);
    if (!r || r.status() >= 400) { add("unverifiable", path, path, String(r?.status())); await p.close(); continue; }
    for (let y = 0; y < 20000; y += 800) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(40); }
    await p.evaluate(() => { scrollTo(0, 0); document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")); });
    await p.waitForTimeout(1500);
    const found = await p.evaluate(() => {
      const out = [];
      const sig = (e) => { const c = typeof e.className === "string" ? e.className.split(/\s+/).filter(Boolean)[0] : ""; return c ? `${e.tagName.toLowerCase()}.${c}` : `${e.tagName.toLowerCase()} in ${(e.parentElement && typeof e.parentElement.className === "string" && e.parentElement.className.split(/\s+/)[0]) || e.parentElement?.tagName.toLowerCase()}`; };
      const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
      const main = document.querySelector("main") || document.body;
      // 1) Staircase: list items whose left edges differ (vertical lists only).
      for (const list of main.querySelectorAll("ol, ul")) {
        if (!vis(list) || list.closest("nav, header, footer, .rk-car__track, [role=tablist]")) continue;
        const items = [...list.children].filter(vis);
        if (items.length < 3) continue;
        const rs = items.map((i) => i.getBoundingClientRect());
        const vertical = rs.every((r, k) => k === 0 || r.top >= rs[k - 1].bottom - 2);
        if (!vertical) continue;
        const firstInner = items.map((i) => { const c = i.firstElementChild && vis(i.firstElementChild) ? i.firstElementChild : i; return c.getBoundingClientRect().left; });
        const spread = Math.max(...firstInner) - Math.min(...firstInner);
        const increasing = firstInner.every((x, k) => k === 0 || x >= firstInner[k - 1] + 6);
        if (increasing && spread > 20) out.push(["staircase list", sig(list), `items step right by ${Math.round(spread)}px`]);
      }
      // 2) Default list indent left on a styled list inside a card/panel (heading above at a different left).
      for (const list of main.querySelectorAll("ol, ul")) {
        if (!vis(list) || list.closest("nav, header, footer, .prose, article p")) continue;
        const cs = getComputedStyle(list);
        const pad = parseFloat(cs.paddingLeft);
        if (pad < 30 || cs.listStyleType !== "none" || list.querySelector("[class*=spine], [class*=dot]") || list.parentElement.querySelector("[class*=spine]")) continue;
        const prev = list.previousElementSibling;
        if (!prev || !vis(prev)) continue;
        const dx = list.getBoundingClientRect().left + pad - prev.getBoundingClientRect().left;
        if (dx > 24) out.push(["leftover list indent", sig(list), `list content sits ${Math.round(dx)}px right of the heading above`]);
      }
      // 3) Children overflowing a bordered/rounded card (not scroll containers).
      for (const card of main.querySelectorAll("article, li, figure, [class*=card], [class*=panel], [class*=tile]")) {
        if (!vis(card)) continue;
        const cs = getComputedStyle(card);
        if (/(auto|scroll)/.test(cs.overflowX + cs.overflowY)) continue;
        const boxed = parseFloat(cs.borderTopLeftRadius) > 4 || parseFloat(cs.borderLeftWidth) > 0 || cs.backgroundColor !== "rgba(0, 0, 0, 0)";
        if (!boxed) continue;
        const cr = card.getBoundingClientRect();
        for (const kid of card.querySelectorAll("*")) {
          if (!vis(kid) || kid.closest("[aria-hidden=true], svg") || getComputedStyle(kid).position === "absolute") continue;
          const kr = kid.getBoundingClientRect();
          if (kr.right > cr.right + 3 || kr.left < cr.left - 3) { out.push(["overflows its card", sig(card), `${sig(kid)} sticks out by ${Math.round(Math.max(kr.right - cr.right, cr.left - kr.left))}px`]); break; }
        }
      }
      // 4) Clipped text: text element whose content is wider/taller than its box while overflow hides it.
      for (const el of main.querySelectorAll("h1,h2,h3,h4,p,span,strong,a,li,button,small")) {
        if (!vis(el) || !el.textContent.trim() || el.children.length > 2 || el.closest(".sr-only")) continue;
        const cs = getComputedStyle(el);
        if (cs.webkitLineClamp && cs.webkitLineClamp !== "none") continue;
        if (cs.textOverflow === "ellipsis") continue;
        const clipsX = /(hidden|clip)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 2;
        const clipsY = /(hidden|clip)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 3;
        if (clipsX || clipsY) out.push(["clipped text", sig(el), `"${el.textContent.trim().slice(0, 40)}"`]);
      }
      // 5) Uneven sibling cards in a grid row (heights differ > 40%).
      for (const grid of main.querySelectorAll("*")) {
        const cs = getComputedStyle(grid);
        if (cs.display !== "grid" || !vis(grid)) continue;
        const kids = [...grid.children].filter((k) => vis(k) && getComputedStyle(k).position !== "absolute" && k.tagName !== "DETAILS" && !k.querySelector(":scope > details"));
        if (kids.length < 3 || grid.classList.contains("accordion") || grid.matches("a, button")) continue;
        const rows = {};
        for (const k of kids) { const r = k.getBoundingClientRect(); (rows[Math.round(r.top / 4)] ??= []).push(r.height); }
        for (const hs of Object.values(rows)) {
          if (hs.length < 2) continue;
          const mx = Math.max(...hs), mn = Math.min(...hs);
          const boxed = kids.some((k) => { const s = getComputedStyle(k); return s.backgroundColor !== "rgba(0, 0, 0, 0)" || parseFloat(s.borderTopWidth) > 0; });
          if (boxed && mn > 40 && mx / mn > 1.4) { out.push(["uneven cards in a row", sig(grid), `heights ${Math.round(mn)} to ${Math.round(mx)}px`]); break; }
        }
      }
      // 6) Card footers misaligned across a row (last child bottoms differ).
      for (const grid of main.querySelectorAll("*")) {
        const gs = getComputedStyle(grid);
        if (!/grid|flex/.test(gs.display) || !vis(grid)) continue;
        const kids = [...grid.children].filter((k) => vis(k) && getComputedStyle(k).position !== "absolute" && k.children.length >= 3);
        if (kids.length < 3) continue;
        const rows = {};
        for (const k of kids) { const r = k.getBoundingClientRect(); (rows[Math.round(r.top / 6)] ??= []).push(k); }
        for (const row of Object.values(rows)) {
          if (row.length < 2) continue;
          const card = (k) => k.matches("li") && k.firstElementChild ? k.firstElementChild : k;
          const gaps = row.map((k) => { const c = card(k); const last = c.lastElementChild; if (!last || !vis(last) || !last.matches("a, button, small, em, footer, [class*=link], [class*=more], [class*=meta], [class*=cta], [class*=btn], [class*=foot]")) return null; return c.getBoundingClientRect().bottom - last.getBoundingClientRect().bottom; }).filter((x) => x !== null);
          if (gaps.length < 2) continue;
          if (Math.max(...gaps) - Math.min(...gaps) > 14) { out.push(["card footer misaligned", sig(grid), `last lines differ by ${Math.round(Math.max(...gaps) - Math.min(...gaps))}px`]); break; }
        }
      }
      return out;
    });
    for (const [kind, key, detail] of found) add(`${kind} @${vw}`, key, path, detail);
    await p.close();
  }
}
await b.close();
const rows = Object.entries(issues).sort((a, b) => b[1].pages.size - a[1].pages.size);
const lines = rows.map(([k, v]) => `${String(v.pages.size).padStart(3)}  ${k}  — ${v.detail}  [${[...v.pages].slice(0, 3).join(", ")}${v.pages.size > 3 ? ` +${v.pages.size - 3}` : ""}]`);
fs.writeFileSync("scripts/.compare/layout-report.txt", lines.join("\n"));
console.log(`issue groups: ${rows.length}`);
console.log(lines.join("\n"));
