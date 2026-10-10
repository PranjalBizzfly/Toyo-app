import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=[process.argv[2]||"https://socialmagix.com/"];
const json=[];
p.on("response", async r=>{try{if((r.headers()["content-type"]||"").includes("json")){json.push(r.url()+" "+(await r.text()).slice(0,800))}}catch{}});
while(q.length&&seen.size<12){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
try{await p.goto(u,{waitUntil:"networkidle",timeout:45000});}catch(e){console.log("ERR",u);continue}
for(let i=0;i<10;i++){await p.mouse.wheel(0,1500);await p.waitForTimeout(300);}
const t=await p.evaluate(()=>document.body.innerText);
const links=await p.evaluate(()=>[...document.querySelectorAll("a")].map(a=>a.href));
const css=await p.evaluate(()=>getComputedStyle(document.querySelector("button")||document.body).backgroundColor);
console.log("\n=====",u,p.url(),await p.title(),css,"\n",t.slice(0,6000));console.log("LINKS",[...new Set(links)].join(" "));
for(const l of links){try{const x=new URL(l);if(x.hostname.endsWith("socialmagix.com")&&!x.hash){q.push(x.origin+x.pathname)}}catch{}}}
console.log("JSON",json.join("\n").slice(0,4000));await b.close();
