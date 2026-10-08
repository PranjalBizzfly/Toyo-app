import { chromium } from "playwright";
const b = await chromium.launch();
for (const vw of [1440, 1100, 1024]) {
  const p = await b.newPage({ viewport: { width: vw, height: 640 } });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const has = await p.$('.primary-nav__trigger:has-text("Integrations")');
  if (!has || !(await has.isVisible())) { console.log(vw, "desktop nav hidden"); await p.close(); continue; }
  for (const l of ["Solutions", "Industries", "Integrations", "Company"]) {
    await p.click(`.primary-nav__trigger:has-text("${l}")`);
    await p.waitForTimeout(300);
    const info = await p.evaluate(() => { const r = document.querySelector(".drop").getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), viewport: innerWidth }; });
    console.log(vw, l, JSON.stringify(info));
    await p.keyboard.press("Escape");
  }
  await p.close();
}
await b.close();
