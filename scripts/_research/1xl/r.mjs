import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=["https://cp.infra.1xl.com/"];
while(q.length && seen.size<12){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
try{await p.goto(u,{waitUntil:"networkidle",timeout:45000});}catch(e){console.log("ERR",u);continue;}
console.log("=== "+u+" | "+await p.title()); console.log((await p.innerText("body")).slice(0,5000));
const links=await p.$$eval("a",a=>a.map(x=>x.href)); for(const l of links) if(l.startsWith("https://cp.infra.1xl.com")&&!seen.has(l.split("#")[0])) q.push(l.split("#")[0]);
console.log("LINKS",[...new Set(links)].join(" "));
const c=await p.evaluate(()=>[...document.querySelectorAll("button,a,header")].slice(0,10).map(e=>getComputedStyle(e).backgroundColor+"/"+getComputedStyle(e).color).join(" ")); console.log("COLORS",c);}
await b.close();
