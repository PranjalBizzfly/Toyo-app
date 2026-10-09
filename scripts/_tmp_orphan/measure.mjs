import { chromium } from 'playwright';
const B=process.env.B||'http://localhost:3120';
const prods=['sibu','oda7','taskmagic','cardizo','meetingmind','hrmagix','zapbuzzer','tracksuit'];
let urls=['/','/products','/products/category/sales-marketing','/solutions','/solutions/run-a-well-organised-office','/industries','/industries/accounting-tax-practices','/integrations','/resources','/blog','/careers','/vendors','/media','/press-kit','/publish','/company','/contact','/support','/compare'];
const only=process.argv[2]?process.argv[2].split(','):null;
const widths=(process.argv[3]||'1920,1440,1024,768').split(',').map(Number);
const br=await chromium.launch();
const page=await br.newPage();
if(!only){
for(const p of prods){
  const base='/products/'+p;
  urls.push(base, base+'/pricing', base+'/features', base+'/security');
  try{ await page.goto(B+base+'/features',{waitUntil:'domcontentloaded'});
    const hrefs=await page.$$eval('a[href]',as=>as.map(a=>a.getAttribute('href')));
    const f=hrefs.find(h=>h&&h.startsWith(base+'/features/')&&!h.includes('/group/')); if(f) urls.push(f.split('#')[0]);
    await page.goto(B+base,{waitUntil:'domcontentloaded'});
    const h2=await page.$$eval('a[href]',as=>as.map(a=>a.getAttribute('href')));
    const it=h2.find(h=>h&&new RegExp('^'+base+'/(?!features|pricing|security)[^/#?]+/[^/#?]+$').test(h)); if(it) urls.push(it);
  }catch(e){}
}}
if(only) urls=only;
const out=[];
for(const w of widths){
  await page.setViewportSize({width:w,height:1000});
  for(const u of urls){
    const r=await page.goto(B+u,{waitUntil:'networkidle'}).catch(()=>null);
    if(!r||r.status()>=400){out.push(`${w} ${u} STATUS ${r&&r.status()}`);continue;}
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
    await page.waitForTimeout(500);
    const flags=await page.evaluate(()=>{
      const res=[];
      const skip=el=>el.closest('header,footer,nav,[class*=marquee],[class*=ticker],[class*=scroll]');
      for(const el of document.querySelectorAll('body *')){
        const cs=getComputedStyle(el);
        const isGrid=cs.display.includes('grid'); const isFlexW=cs.display.includes('flex')&&cs.flexWrap==='wrap';
        if(!isGrid&&!isFlexW) continue;
        if(skip(el)) continue;
        const cls=(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className)||'';
        if(/chip|tag|pill|badge|crumb|links|actions|btn|meta/i.test(cls)) continue;
        const kids=[...el.children].filter(c=>{const r=c.getBoundingClientRect();const s=getComputedStyle(c);return r.width>0&&r.height>0&&s.position!=='absolute'&&s.position!=='fixed'});
        if(kids.length<3||kids.length>8) continue;
        const rows=[];
        for(const k of kids){const r=k.getBoundingClientRect();let row=rows.find(x=>Math.abs(x.top-r.top)<4);if(!row){row={top:r.top,w:[]};rows.push(row);}row.w.push(Math.round(r.width));}
        if(rows.length<2) continue;
        rows.sort((a,b)=>a.top-b.top);
        const L=rows[rows.length-1], n=rows[0].w.length;
        if(n===1) continue; // single column
        const fewer=L.w.length<n && (L.w.length===1 || L.w.length/n<=0.5);
        const ow=rows[0].w[0]; const stretched=L.w.some(x=>Math.abs(x-ow)>6);
        if(fewer||stretched){
          const sec=el.closest('section'); 
          res.push(`${el.tagName.toLowerCase()}.${String(cls).trim().split(/\s+/).join('.')} [${rows.map(r=>r.w.length).join('+')}] w=${ow}/${L.w.join(',')}${stretched?' STRETCH':''} sec=${sec?(sec.className||sec.id):''}`);
        }
      }
      for(const el of document.querySelectorAll('body *')){
        const cs=getComputedStyle(el);
        if(!(cs.display.includes('grid')||(cs.display.includes('flex')&&cs.flexWrap==='wrap'))) continue;
        if(skip(el)) continue;
        const cls=(typeof el.className==='string'?el.className:'');
        const kids=[...el.children].filter(c=>{const r=c.getBoundingClientRect();return r.width>120&&r.height>60});
        if(kids.length<2||kids.length>40) continue;
        const rows=[];
        for(const k of kids){const r=k.getBoundingClientRect();let row=rows.find(x=>Math.abs(x.top-r.top)<4);if(!row){row={top:r.top,k:[]};rows.push(row);}row.k.push(k);}
        const bad=new Set();
        for(const row of rows){ if(row.k.length<2) continue;
          const maps=row.k.map(card=>{const m={};let root=card; if(root.children.length===1&&root.firstElementChild.children.length>1) root=root.firstElementChild;
            for(const c of root.children){const cn=(typeof c.className==='string'&&c.className.trim().split(/\s+/)[0])||c.tagName.toLowerCase(); const r=c.getBoundingClientRect(); if(r.height===0||getComputedStyle(c).position==='absolute') continue; if(!(cn in m)) m[cn]=r.top-card.getBoundingClientRect().top;}
            return m;});
          if(maps.some(m=>Object.keys(m).length<3)) continue;
          const keys=Object.keys(maps[0]).filter(k=>maps.every(m=>k in m));
          for(const k of keys){const v=maps.map(m=>m[k]); if(Math.max(...v)-Math.min(...v)>4) bad.add(k+'('+Math.round(Math.max(...v)-Math.min(...v))+')');}
        }
        if(bad.size) res.push(`ALIGN ${el.tagName.toLowerCase()}.${cls.trim().split(/\s+/).join('.')} card=${(typeof kids[0].className==='string'?kids[0].className:'').split(' ')[0]} :: ${[...bad].join(' ')}`);
      }
      return res;
    });
    for(const f of flags) out.push(`${w} ${u} :: ${f}`);
  }
}
console.log(urls.join(' '));
console.log(out.join('\n'));
await br.close();
