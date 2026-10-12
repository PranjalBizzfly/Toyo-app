// Screenshot the area around the element whose own text starts with <text> (same theme mechanism as the audit).
import { chromium } from "playwright";
const [base, path, text, theme = "light", out = "scripts/.compare/shot-at.png"] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
const p = await ctx.newPage();
await p.goto(base + "/" + path.replace(/^\/+/, ""), { waitUntil: "networkidle" });
await p.evaluate(() => document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")));
const box = await p.evaluate((text) => {
  const el = [...document.querySelectorAll("main *")].find((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().startsWith(text)));
  
  const d = el.closest("details"); const r = el.getBoundingClientRect();
  return { y: r.top + scrollY, el: r.toJSON(), details: d?.getBoundingClientRect().toJSON(), open: d?.open };
}, text);
await p.waitForTimeout(1200);
console.log(JSON.stringify(box));
await p.screenshot({ path: out, fullPage: true, clip: { x: 0, y: Math.max(0, box.y - 300), width: 1440, height: 700 } });
await b.close();
