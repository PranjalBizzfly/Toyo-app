# ODA7 – verification of UNSUPPORTED rows (re-checked 2026-10-08, browser-rendered)

Browser source "site dump" = scripts/.research/oda7-site.md (Playwright render of https://oda7-website.vercel.app/).

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Verification | Notes |
|---|---|---|---|---|---|---|---|
| ODA7 | Sales Productivity | UNSUPPORTED | NOT SUPPORTED | https://oda7-website.vercel.app/ | Nearest text: "Sales Operations & Rep Velocity", "My Queue" and "Sales reps waste up to 45% of their working hours cherry-picking lists and toggling tabs." No productivity module. | Browser-verified (site dump) | My Queue is already covered by the leads/queue page. |
| ODA7 | Workflow Management | UNSUPPORTED | NOT SUPPORTED | https://oda7-website.vercel.app/ | "workflow" appears only descriptively, e.g. "Illustrative ODA7 workflow" and "Agent state, queues and manager workflows remain visible in the same operating model." There is no workflow engine or builder. | Browser-verified (site dump) | |
| ODA7 | Attendance Workflows | UNSUPPORTED | PARTIALLY SUPPORTED (as a section in the existing attendance page) | https://oda7-website.vercel.app/ | "ODA7 ties telephony calling directly to agent availability, records verified shift attendance"; "Agent Geolocation Shift Punch = Verified Live Floor Roster". | Browser-verified (site dump) | |
| ODA7 | Payroll Workflows | UNSUPPORTED | PARTIALLY SUPPORTED (as a section in the existing payroll page) | https://oda7-website.vercel.app/ | "End-of-Month Payroll Run = 1-Click Itemized PDF Payslip Dispatch"; "Closed-won activity can flow into incentives, payroll preparation and performance review." | Browser-verified (site dump) | |
| ODA7 | Incentive Workflows | UNSUPPORTED | PARTIALLY SUPPORTED (as a section in the existing incentives/commission page) | https://oda7-website.vercel.app/ | "Opportunity Deal Closed-Won = Instant Commission Tier Calculation"; "Closed-Won Opportunity = Instant Commission Wallet Credit". | Browser-verified (site dump) | |
| ODA7 | Attendance Reports | UNSUPPORTED | NOT SUPPORTED | https://oda7-website.vercel.app/ | No attendance report is mentioned. "reporting requirements" appears only generically in the FAQ. | Browser-verified (site dump) | |
| ODA7 | Payroll Reports | UNSUPPORTED | NOT SUPPORTED | https://oda7-website.vercel.app/ | Only a "PDF Payslip Dispatch" is mentioned. A payslip is not a report. | Browser-verified (site dump) | |
| ODA7 | Incentive Reports | UNSUPPORTED | NOT SUPPORTED | https://oda7-website.vercel.app/ | "Incentives, contests and analytics" is the nearest text. No incentive report is described. | Browser-verified (site dump) | |
| ODA7 | Multi-Product Operations | UNSUPPORTED | PARTIALLY SUPPORTED (as a section in features/product-catalog) | https://oda7.com/sign-in | "One floor, a thousand agents, a hundred products — orchestrated." (oda7.com sign-in page) and "Product Catalog" in the vercel site's capability list. | Browser-verified (scripts/.research/oda7.md and oda7-site.md) | This is a tagline plus the catalog feature, so it stays partial. |

## URLs and searches checked
- Grep of scripts/.research/oda7-site.md and oda7.md for: attendance, payroll, incentive, report, productivity, workflow, multi, products, catalog
- Playwright: oda7-website.vercel.app home (link list), plus /features, /solutions, /analytics, /managers and /about. Each of the last five returns 404 when loaded directly (client-side routes). /robots.txt returns 404.
- WebFetch: https://oda7.com/, https://oda7-website.vercel.app/, https://oda7-website.vercel.app/sitemap.xml (404)
- WebSearch (oda7.com, oda7-website.vercel.app): "oda7 attendance payroll incentive reports workflow" (no results)
- The JS bundle text was not re-read in this pass.

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 9 | 0 | 0 | 4 | 5 | 0 |
