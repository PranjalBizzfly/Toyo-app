import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("https://theprojectchecker.com/faq",{waitUntil:"networkidle"});
const btns=await p.$$("button"); 
for(const el of btns){try{const t=(await el.innerText()).trim(); if(!t.includes("?"))continue; await el.click({timeout:2000});await p.waitForTimeout(500);
const body=await p.evaluate(()=>document.body.innerText.split("08\nDo you offer on-premise deployment?")[1]||"");
const all=await p.evaluate(()=>document.body.innerText); const i=all.indexOf(t.split("\n").pop()); console.log("Q:",t.replace(/\n/g," "),"\nA:",all.slice(i,i+600).split("\n").slice(1,4).join(" "));}catch(e){}}
await b.close();
