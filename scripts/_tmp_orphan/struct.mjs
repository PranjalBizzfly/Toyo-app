import { chromium } from 'playwright';
const br=await chromium.launch();const page=await br.newPage({viewport:{width:+(process.env.W||1440),height:900}});
const jobs=JSON.parse(process.argv[2]);
for(const [u,s] of jobs){await page.goto((process.env.B||'http://localhost:3120')+u);
 const r=await page.evaluate(s=>{const els=[...document.querySelectorAll(s)];if(!els.length)return 'none';return els.slice(0,3).map(el=>{const cs=getComputedStyle(el);
 const sk=(n,d)=>{if(d>1)return'';return '<'+n.tagName.toLowerCase()+(n.className&&typeof n.className==='string'?'.'+n.className.trim().split(/\s+/).join('.'):'')+' '+getComputedStyle(n).display+(getComputedStyle(n).position==='absolute'?' ABS':'')+'>'+[...n.children].map(c=>sk(c,d+1)).join('')+'</>'};
 return cs.display+' gtc='+cs.gridTemplateColumns+' n='+el.children.length+' kids='+[...el.children].map(c=>c.tagName+'.'+(typeof c.className==='string'?c.className.split(' ')[0]:'')).join(',')+'\n   FIRST '+(el.children[0]?sk(el.children[0],0):"")}).join('\n  ')},s);
 console.log(u,s,r.slice(0,1500));}
await br.close();
