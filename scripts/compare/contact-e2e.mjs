// End-to-end contact form test against a local mock webhook (no real delivery).
// 1) starts a mock receiver on :5998, 2) fills and submits /contact-us in a real browser,
// 3) checks the success message and the payload the receiver got; also checks validation errors.
import http from "node:http";
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:5995";
const received = [];
const mock = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => { try { received.push(JSON.parse(body)); } catch { received.push(body); } res.writeHead(200, { "Content-Type": "application/json" }); res.end('{"ok":true}'); });
}).listen(5998);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(base + "/contact-us?type=product&product=warwi", { waitUntil: "networkidle" });

// a) empty submit → validation messages, nothing delivered
await p.click('form button[type="submit"]');
await p.waitForTimeout(800);
const errs = await p.$$eval('[aria-invalid="true"]', (e) => e.map((x) => x.name || x.id));
console.log("empty submit → invalid fields:", errs.join(", ") || "none", "| delivered:", received.length);

// b) valid submit
await p.waitForTimeout(3200); // the form must be open ≥3s (spam guard)
const fill = async (sel, v) => { const el = await p.$(sel); if (el) await el.fill(v); return !!el; };
await fill('input[name="name"]', "Form Check");
await fill('input[name="email"]', "form-check@example.com");
await fill('input[name="phone"]', "+971 50 000 0000");
await fill('input[name="company"]', "ToyoApps QA");
await fill('input[name="subject"]', "Contact form end-to-end check");
await fill('textarea[name="message"]', "This is an automated end-to-end check of the contact form. Please ignore.");
const consent = await p.$('input[name="consent"]'); if (consent) await consent.check();
await p.click('form button[type="submit"]');
await p.waitForTimeout(2500);
const status = await p.$eval('[role="status"], [role="alert"], .contact-form__status, form [aria-live]', (e) => e.textContent.trim()).catch(() => "(no status element)");
console.log("valid submit → page says:", status);
console.log("delivered payloads:", received.length);
if (received[0]) { const d = received[0]; console.log("payload:", JSON.stringify({ name: d.name, email: d.email, phone: d.phone, company: d.company, type: d.type, typeLabel: d.typeLabel, products: d.products, subject: d.subject, message: d.message?.slice(0, 40) + "…", source: d.source })); }
await b.close();
mock.close();
