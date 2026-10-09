import { chromium } from 'playwright';
// usage: node shot.mjs url selector width theme out
let [u,sel,w,theme,out]=process.argv.slice(2); if(u==='home')u='/';
const br=await chromium.launch();const ctx=await br.newContext({viewport:{width:+w,height:1000},colorScheme:theme==='dark'?'dark':'light'});
const page=await ctx.newPage();
await page.addInitScript(t=>{try{localStorage.setItem('theme',t)}catch(e){}},theme);
await page.goto((process.env.B||'http://localhost:3120')+u,{waitUntil:'networkidle'});
await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}});
const el=page.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
await el.screenshot({path:out});
await br.close();
