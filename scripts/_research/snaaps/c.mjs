import { chromium } from "playwright";
const b=await chromium.launch(); const p=await b.newPage(); await p.goto("https://snaaps.com/",{waitUntil:"networkidle"});
console.log(await p.evaluate(()=>{const r=new RegExp("Free|Get Started");return [...document.querySelectorAll("a,button")].filter(e=>r.test(e.innerText)).map(e=>{const s=getComputedStyle(e);return e.innerText+"|"+s.backgroundColor+"|"+s.backgroundImage+"|"+s.color})}));
await b.close();
