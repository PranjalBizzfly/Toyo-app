import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=["https://theprojectchecker.com/"];
while(q.length && seen.size<15){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
try{await p.goto(u,{waitUntil:"networkidle",timeout:45000});}catch(e){console.log("ERR",u);continue;}
const t=await p.evaluate(()=>document.body.innerText);
const links=await p.evaluate(()=>[...document.querySelectorAll("a")].map(a=>a.href));
const colors=await p.evaluate(()=>[...document.querySelectorAll("button,a,h1")].slice(0,15).map(e=>getComputedStyle(e).backgroundColor+"|"+getComputedStyle(e).color));
console.log("=====",u,"\n",t.slice(0,6000),"\nLINKS",[...new Set(links)].join(" "),"\nCOL",[...new Set(colors)].join(" "));
for(const l of links){const c=l.split("#")[0]; if(c.startsWith("https://theprojectchecker.com")&&!seen.has(c))q.push(c);}}
await b.close();
