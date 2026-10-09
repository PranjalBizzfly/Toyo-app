import { chromium } from 'playwright';
const br=await chromium.launch();const page=await br.newPage({viewport:{width:768,height:900}});
await page.goto('http://localhost:3120/products/sibu');
console.log(await page.evaluate(()=>{const c=document.querySelector('.pz-related > .product-card');
 const out=[c.matches('html body main :is(.grid,.pz-related,.zc-grid)>.product-card'), !!c.closest('main'), [...document.styleSheets].map(s=>s.href).join(' ')];
 for(const ss of document.styleSheets){try{for(const r of ss.cssRules){ if(r.selectorText&&c.matches(r.selectorText)&&/display/.test(r.cssText)) out.push(r.cssText.slice(0,200)); if(r.cssRules) for(const r2 of r.cssRules){ if(r2.selectorText&&c.matches(r2.selectorText)&&/display/.test(r2.cssText)&&matchMedia(r.conditionText||r.media?.mediaText||'all').matches) out.push('@'+(r.conditionText)+' '+r2.cssText.slice(0,200));}}}catch(e){}}
 return out.join('\n');}));
await br.close();
