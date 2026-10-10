import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage();await p.goto("https://socialmagix.com/",{waitUntil:"networkidle"});
console.log(await p.evaluate(()=>{const o={};for(const e of document.querySelectorAll("a,button")){const s=getComputedStyle(e);o[e.innerText.trim().slice(0,20)]=s.backgroundColor+"|"+s.backgroundImage.slice(0,80)+"|"+s.color}return o}));
await p.getByText("Log in").first().click().catch(()=>{});await p.waitForTimeout(3000);console.log(p.url());await b.close();
