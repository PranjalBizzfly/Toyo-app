import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("https://dizola.com/",{waitUntil:"networkidle"});
const t=await p.innerText("body"); console.log(t.slice(t.indexOf("ABOUT DIZOLA")));
console.log(await p.evaluate(()=>[...document.querySelectorAll("a,button")].slice(0,12).map(e=>e.textContent.trim().slice(0,20)+"|"+getComputedStyle(e).backgroundColor+"|"+getComputedStyle(e).backgroundImage.slice(0,90)).join("\n")));
await b.close();
