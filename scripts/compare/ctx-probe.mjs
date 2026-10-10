// For a page + text, prints the element's ancestor chain (classes, data attrs, colours).
import { chromium } from "playwright";
const [base, path, text, theme = "light"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(base + "/" + path.replace(/^\/+/, ""), { waitUntil: "networkidle" });
await p.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
const out = await p.evaluate((text) => {
  const el = [...document.querySelectorAll("main *")].find((e) => e.children.length === 0 && e.textContent.trim().startsWith(text));
  if (!el) return "not found";
  const rows = [];
  for (let e = el; e && e !== document.body; e = e.parentElement) {
    const cs = getComputedStyle(e);
    const data = [...e.attributes].filter((a) => a.name.startsWith("data-")).map((a) => `${a.name}=${a.value}`).join(" ");
    rows.push(`${e.tagName.toLowerCase()}.${[...e.classList].join(".")} ${data} | color ${cs.color} | bg ${cs.backgroundColor} ${cs.backgroundImage !== "none" ? "img" : ""}`);
  }
  return rows.slice(0, 9).join("\n");
}, text);
console.log(out);
await b.close();
