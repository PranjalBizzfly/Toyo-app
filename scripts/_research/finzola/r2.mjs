import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("https://finzola.com/",{waitUntil:"networkidle"});
console.log(await p.title(), await p.evaluate(()=>document.querySelector('meta[name=description]')?.content));
for (const n of ["Register Organization","Sign In"]) { await p.goto("https://finzola.com/",{waitUntil:"networkidle"}); await p.getByText(n).first().click(); await p.waitForLoadState("networkidle"); console.log(n,p.url(), (await p.evaluate(()=>document.body.innerText)).slice(0,1500)); }
await b.close();
