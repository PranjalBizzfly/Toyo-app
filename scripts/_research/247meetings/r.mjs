import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const json=[];
p.on("response", async r=>{try{if((r.headers()["content-type"]||"").includes("json")){json.push(r.url()+" "+(await r.text()).slice(0,1500))}}catch{}});
const seen=new Set(); const q=[process.argv[2]||"https://247meetings.com"];
while(q.length && seen.size<12){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
 try{await p.goto(u,{waitUntil:"networkidle",timeout:45000});}catch(e){console.log("ERR",u,e.message);continue}
 for(let i=0;i<8;i++){await p.mouse.wheel(0,1500);await p.waitForTimeout(300)}
 const t=await p.evaluate(()=>document.body.innerText);
 const l=await p.evaluate(()=>[...document.querySelectorAll("a")].map(a=>a.href));
 const meta=await p.evaluate(()=>[document.title,document.querySelector('meta[name=description]')?.content,document.querySelector('meta[name=theme-color]')?.content,getComputedStyle(document.querySelector('button')||document.body).backgroundColor].join(" | "));
 console.log("=== "+u+"\n"+meta+"\n"+t.slice(0,6000)+"\nLINKS:"+[...new Set(l)].join(" "));
 for(const h of l) if(h.startsWith("https://247meetings.com")&&!h.includes("#")) q.push(h.replace(/\/$/,""));
}
console.log("JSON:\n"+json.join("\n").slice(0,5000)); await b.close();
