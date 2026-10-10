import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=["https://dizola.com/"];
while(q.length && seen.size<15){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
 try{await p.goto(u,{waitUntil:"networkidle",timeout:30000});}catch(e){console.log("ERR",u);continue;}
 console.log("\n=====",u,"\n",(await p.innerText("body")).slice(0,6000));
 const links=await p.$$eval("a",a=>a.map(x=>x.href)); for(const l of links){const c=l.split("#")[0]; if(c.startsWith("https://dizola.com")&&!seen.has(c))q.push(c);} 
 if(u==="https://dizola.com/") console.log("LINKS",[...new Set(links)].join(" "), "COLORS", await p.evaluate(()=>getComputedStyle(document.querySelector("a,button")).backgroundColor));
}
await b.close();
