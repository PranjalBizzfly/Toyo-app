import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=["https://finzola.com/"]; const out=[];
while(q.length && seen.size<12){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
 try{await p.goto(u,{waitUntil:"networkidle",timeout:45000});
 for(let i=0;i<8;i++){await p.mouse.wheel(0,2000);await p.waitForTimeout(300);}
 const t=await p.evaluate(()=>document.body.innerText);
 const links=await p.evaluate(()=>[...document.querySelectorAll("a")].map(a=>a.href));
 const colors=await p.evaluate(()=>[...document.querySelectorAll("button,a")].slice(0,40).map(e=>getComputedStyle(e).backgroundColor).filter(c=>c!=="rgba(0, 0, 0, 0)"));
 out.push(`=== ${u}\n${t}\nLINKS:${[...new Set(links)].join(" ")}\nCOLORS:${[...new Set(colors)].join(" ")}`);
 for(const l of links){ if(l.startsWith("https://finzola.com")&&!l.includes("#")) q.push(l.split("?")[0]); }
 }catch(e){out.push(`=== ${u} ERR ${e.message}`);} }
console.log(out.join("\n\n")); await b.close();
