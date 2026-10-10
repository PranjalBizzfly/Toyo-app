import { chromium } from "playwright"; import fs from "fs";
const b=await chromium.launch(); const p=await b.newPage();
const seen=new Set(); const q=["https://snaaps.com/"]; let out="";
while(q.length && seen.size<15){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
 try{await p.goto(u,{waitUntil:"networkidle",timeout:30000});}catch(e){out+=`\n## ${u} ERR ${e.message}\n`;continue;}
 const t=await p.evaluate(()=>document.body.innerText);
 const links=await p.evaluate(()=>[...document.querySelectorAll("a")].map(a=>a.href));
 const css=await p.evaluate(()=>[...new Set((document.documentElement.outerHTML.match(/#[0-9a-fA-F]{6}\b/g)||[]))].slice(0,30).join(" "));
 out+=`\n## ${u}\nTITLE: ${await p.title()}\nCOLORS: ${css}\nLINKS: ${[...new Set(links)].join(" ")}\n${t}\n`;
 for(const l of links){try{const x=new URL(l); if(x.hostname.endsWith("snaaps.com")&&!x.hash){x.search="";q.push(x.href)}}catch{}}}
fs.writeFileSync("scripts/_research/snaaps/text.txt",out); await b.close();
