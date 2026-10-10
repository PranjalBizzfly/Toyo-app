import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("https://rentwithzeal.com",{timeout:30000});
const links = await p.$$eval("a",as=>as.map(a=>a.innerText.trim().slice(0,40)+" | "+a.href));
console.log([...new Set(links)].join("\n"));
for (const t of ["Register as Channel Partner","About Us","Terms & Conditions"]) {
  const h = await p.$$eval("a",(as,t)=>as.find(a=>a.innerText.trim()===t)?.href,t);
  if(!h) continue; const q=await b.newPage();
  try{await q.goto(h,{timeout:30000});console.log("\n=== "+t+" "+q.url());console.log((await q.innerText("body")).slice(0,2500));}catch(e){console.log("FAIL",h,e.message.split("\n")[0]);}
}
await b.close();
