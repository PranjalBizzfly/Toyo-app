import { chromium } from 'playwright';
const br=await chromium.launch();const page=await br.newPage({viewport:{width:768,height:900}});
await page.goto('http://localhost:3120/products/sibu');
console.log(await page.evaluate(()=>{const out=[];for(const ss of document.styleSheets){ if(!ss.href.includes('11pczn')) continue; out.push('rules '+ss.cssRules.length); for(const r of ss.cssRules){ if(/subgrid|720px|grid-balance|bal\)/.test(r.cssText)) out.push(r.cssText.slice(0,160)); }} return out.join('\n');}));
console.log(await page.evaluate(()=>getComputedStyle(document.querySelector('.pz-related > .product-card')).display + ' ' + navigator.userAgent));
await br.close();
