# ZUZU: verification of UNSUPPORTED rows

Re-verified on 2026-10-08 against the live site.

**Official domain:** https://usezuzu.com/. The footer says "A product of Bizzfly Business Automation". Support contact: support@bizzfly.com. The site is a JavaScript single-page app (SPA), so it was rendered with Playwright (Chromium, `document.body.innerText`).

**Other official presence checked:**
- api.usezuzu.com returns only `{"message":"usezuzu unified backend running"}`.
- blog.usezuzu.com is a WordPress install with one post, "Hello world!", and one "Sample Page". It has no content.
- app., help., docs. and www. subdomains do not resolve.
- No Play Store or App Store link exists. The product is Windows-only (`ZUZU-Windows-latest-Setup.exe`).
- zuzu-website.vercel.app is a different product and is not used here.

**Evidence labels:**
- **browser-verified** means the text appears in the rendered public page.
- **snippet-only (app bundle)** means the string appears only in the logged-in portal UI compiled into `/assets/index-BJLpoPGL.js`. It is not public marketing copy, so those rows are marked NEEDS MANUAL REVIEW and not SUPPORTED.

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|---|
| ZUZU | Business Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Browser-verified: "Time tracking, activity monitoring and AI reporting for teams that work on Windows desktops." | Workforce monitoring only |
| ZUZU | Business Automation | UNSUPPORTED | PARTIALLY SUPPORTED | https://usezuzu.com/#reporting | Browser-verified: "Reports are generated on a schedule, not on a button" and "Delivered, not fetched" | Automated report delivery only. Put it as a section inside the AI daily reports page. Not a general automation module |
| ZUZU | Workflow Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | No workflow feature in nav, capabilities, FAQ or footer | |
| ZUZU | Task Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not on the public site. The bundle has only an "off-task" screenshot flag | |
| ZUZU | Customer Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | No CRM anywhere | |
| ZUZU | Contact Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | No CRM anywhere | |
| ZUZU | Lead Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | No CRM anywhere | |
| ZUZU | Sales Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | No CRM anywhere | |
| ZUZU | Process Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | The bundle's "Process-list snapshot" refers to OS processes, not business processes |
| ZUZU | Document Management | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Communication | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Only report emails and digests. No messaging tools | |
| ZUZU | Collaboration | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Approvals | UNSUPPORTED | NEEDS MANUAL REVIEW | https://usezuzu.com/#reporting | Browser-verified: "Managers confirm or correct what the engine concluded." Snippet-only (app bundle): an Away Time claims queue with tabs "Needs Review / Approved / Rejected" and the hint "Approve fewer minutes than claimed" | The public site describes only report review. Someone with portal access should confirm the away-time approval flow before a page is built. If it is confirmed, it fits as a section of ai-daily-reports |
| ZUZU | Reminders | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | No reminder feature on the public site or in the bundle | |
| ZUZU | Search | UNSUPPORTED | PARTIALLY SUPPORTED | https://usezuzu.com/#reporting | Browser-verified: "Insights carries a question box for the workforce record" | Section inside workforce-insights |
| ZUZU | Customization | UNSUPPORTED | PARTIALLY SUPPORTED | https://usezuzu.com/#capabilities | Browser-verified: screenshot cadence "1 to 15 minutes, or a custom interval", "Retention you decide", "organisation policy". Snippet-only: admin nav items "Branding" and "Email Templates" | Policy settings section inside on-device-privacy-redaction. Branding needs manual review |
| ZUZU | Templates | UNSUPPORTED | NEEDS MANUAL REVIEW | https://usezuzu.com/ | Snippet-only (app bundle): "Email Templates", subtitle "The wording of the emails your organisation sends" | Not on the public site |
| ZUZU | Automation Rules | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Business Workflows | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Team Workflows | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Customer Workflows | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Sales Workflows | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | The bundle has a bare "Sales" label with no context. Not counted |
| ZUZU | Operational Workflows | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ | Not offered | |
| ZUZU | Efficiency | UNSUPPORTED | PARTIALLY SUPPORTED | https://usezuzu.com/apply | Browser-verified: "AI Productivity Reports" (/apply), "AVG FOCUS", and "where the working day actually goes" | Productivity/focus section inside workforce-insights. No standalone efficiency material |
| ZUZU | Industry Solutions | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/trial | Browser-verified: the signup "Type" dropdown lists Technology, Healthcare, Finance and others. /apply says "PERFECT FOR Startups, Remote Teams, Agencies, Enterprises" | These are form options and audience labels, not industry content |
| ZUZU | Integrations | UNSUPPORTED | PARTIALLY SUPPORTED | https://usezuzu.com/#workflow | Browser-verified: "There is no integration project". Snippet-only: "Enter it in HRMagix under Settings → Integrations → usezuzu" and "Attendance from HRMagix, beside tracked time" | HRMagix connection only. Keep it as a section of the existing product-connection content |
| ZUZU | Resources | UNSUPPORTED | NOT SUPPORTED | https://usezuzu.com/ , https://blog.usezuzu.com/ | The blog contains only "Hello world!". "Help & Resources" exists only in the logged-in nav | |

## URLs and searches checked
- Rendered with Playwright: https://usezuzu.com/ , /trial , /apply
- curl: /robots.txt ("User-agent: * Disallow:"). /sitemap.xml, /features, /pricing, /about, /faq, /help, /docs, /blog, /support, /contact and /how-it-works all return the same 2,345-byte SPA shell, so none of them is a real page.
- Subdomains: app., help., docs. and www. do not resolve. blog.usezuzu.com returned WP REST posts and pages (Hello world plus Sample Page). api.usezuzu.com was also checked.
- Bundle: https://usezuzu.com/assets/index-BJLpoPGL.js, grepped for: task, workflow, approv, remind, search, customi, template, automat, integrat, industr, resource, document, chat, messag, collaborat, CRM, lead, customer, sales, efficien, process, attendance, project
- Local dump: scripts/.research/zuzu.md (read-only reference)
- WebSearch: `site:usezuzu.com OR site:zorfly.com OR site:fantomapps.com` returned nothing from the domain (it is not indexed). An app-store search found no official listing.

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 27 | 0 | 0 | 5 | 20 | 2 |
