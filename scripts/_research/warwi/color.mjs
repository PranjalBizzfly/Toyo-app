import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("https://warwi.com",{waitUntil:"networkidle"});
console.log(await p.evaluate(()=>[...document.querySelectorAll("a,button")].slice(0,15).map(e=>e.innerText.trim().slice(0,20)+" "+getComputedStyle(e).backgroundColor+" "+getComputedStyle(e).backgroundImage.slice(0,90)).join("\n")));
await b.close();
