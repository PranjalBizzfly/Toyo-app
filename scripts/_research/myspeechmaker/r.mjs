import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
const seen=new Set(); const q=[process.argv[2]];
while(q.length && seen.size<12){const u=q.shift(); if(seen.has(u))continue; seen.add(u);
 try{await p.goto(u,{waitUntil:"networkidle",timeout:30000});}catch(e){console.log("ERR",u);continue;}
 console.log("\n=== "+u+"\n"+(await p.innerText("body")).slice(0,5000));
 const links=await p.$$eval("a",as=>as.map(a=>a.href)); for(const l of links){const c=l.split("#")[0]; if(c.startsWith("https://myspeechmaker.com")&&!seen.has(c))q.push(c);} }
const css=await p.evaluate(()=>[...document.querySelectorAll("button,a")].slice(0,15).map(e=>getComputedStyle(e).backgroundColor+"|"+getComputedStyle(e).color).join(" "));
console.log("\nCOLORS",css, await p.title()); await b.close();
