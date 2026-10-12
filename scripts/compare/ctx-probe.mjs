// For a page + text, prints the element's ancestor chain (classes, data attrs, colours),
// using the same theme mechanism as contrast-audit.mjs (prefers-color-scheme).
import { chromium } from "playwright";
const [base, path, text, theme = "light"] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
const p = await ctx.newPage();
await p.goto(base + "/" + path.replace(/^\/+/, ""), { waitUntil: "networkidle" });
await p.evaluate(() => document.querySelectorAll("[data-reveal],[data-stage]").forEach((e) => e.classList.add("is-in")));
await p.waitForTimeout(1500);
const out = await p.evaluate((text) => {
  const els = [...document.querySelectorAll("main *")].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().startsWith(text)));
  if (!els.length) return "not found";
  return els.slice(0, 2).map((el) => {
    const rows = [`rect ${JSON.stringify(el.getBoundingClientRect().toJSON()).slice(0, 80)}`];
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      const data = [...e.attributes].filter((a) => a.name.startsWith("data-") || a.name === "open").map((a) => `${a.name}=${a.value}`).join(" ");
      rows.push(`${e.tagName.toLowerCase()}.${[...e.classList].join(".")} ${data} | color ${cs.color} | bg ${cs.backgroundColor}${cs.backgroundImage !== "none" ? " +img" : ""} | op ${cs.opacity}`);
    }
    return rows.slice(0, 10).join("\n");
  }).join("\n---\n");
}, text);
console.log(out);
await b.close();
