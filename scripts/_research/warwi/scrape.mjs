import { chromium } from "playwright";
const urls = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage();
const api = [];
p.on("response", async r => { const ct = r.headers()["content-type"]||""; if (ct.includes("json")) { try { api.push(r.url()+"\n"+(await r.text()).slice(0,4000)); } catch {} } });
for (const u of urls) {
  try { await p.goto(u, { waitUntil: "networkidle", timeout: 45000 }); } catch(e) { console.log("ERR", u, e.message); continue; }
  for (let i=0;i<30;i++){ await p.mouse.wheel(0,1500); await p.waitForTimeout(150); }
  await p.waitForTimeout(1000);
  console.log("=== "+u+" | "+await p.title());
  console.log(await p.evaluate(()=>document.body.innerText));
  console.log("LINKS:", [...new Set(await p.$$eval("a",a=>a.map(x=>x.href)))].join(" "));
  console.log("META:", await p.evaluate(()=>[...document.querySelectorAll('meta')].map(m=>(m.name||m.getAttribute('property'))+'='+m.content).join(' | ')));
}
console.log("=== JSON"); console.log(api.join("\n---\n"));
await b.close();
