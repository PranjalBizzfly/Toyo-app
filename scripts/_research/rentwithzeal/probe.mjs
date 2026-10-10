import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
for (const u of ["https://cp.rentwithzeal.com","http://cp.rentwithzeal.com","https://rentwithzeal.com","https://www.rentwithzeal.com"]) {
  try { await p.goto(u,{timeout:20000}); console.log("OK",u,p.url(),await p.title()); console.log((await p.innerText("body")).slice(0,1500)); }
  catch(e){ console.log("FAIL",u,e.message.split("\n")[0]); }
}
await b.close();
