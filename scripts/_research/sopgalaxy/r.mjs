import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=["https://sopgalaxy.com/"];
while(q.length && seen.size<1){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
try{await p.goto(u,{waitUntil:"networkidle",timeout:30000});}catch(e){console.log("ERR",u);continue;}
const t=await p.evaluate(()=>document.body.innerText); console.log("\n=====",u,"\n",t.slice(5800,16000));
const links=await p.evaluate(()=>[...document.querySelectorAll("a")].map(a=>a.href));
for(const l of links){const c=l.split("#")[0]; if(c.startsWith("https://sopgalaxy.com")&&!seen.has(c)) q.push(c);} if(seen.size===1) console.log("LINKS",[...new Set(links)].join(" "));}
const c=await p.evaluate(()=>getComputedStyle(document.querySelector("button, a[class*=btn], header a")||document.body).backgroundColor); console.log("COLOR",c);
await b.close();
