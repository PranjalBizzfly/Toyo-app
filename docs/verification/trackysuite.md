# TrackySuite – verification of UNSUPPORTED rows (live check 2026-10-08)

Official domain: https://trackysuite.com/ (from src/content/products/trackysuite.ts)

Evidence tags: **[browser-verified]** means the page was rendered live with Playwright on 2026-10-08. **[snippet-only]** means the evidence came from WebFetch only.

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|---|
| TrackySuite | Reviewer Queues | UNSUPPORTED | PARTIALLY SUPPORTED | https://trackysuite.com/about | [browser-verified] About: "A four-stage review pipeline where the person who prepared a return cannot be the person who signs it off"; Home: "Prepare → review → file, with owners at every stage.", "2 awaiting review", Practice Dashboard "Due, in review, filed, overdue" | There is a real review pipeline, but no "queue" feature is named. Add as a section in the task/workflow page |
| TrackySuite | Invoicing | UNSUPPORTED | NEEDS MANUAL REVIEW | https://trackysuite.com/login | [snippet-only] Login: "...compliance, tasks, documents, billing, and client portal in one system."; [browser-verified] Terms "4. Subscriptions and billing" covers only TrackySuite's own subscription billing | Client invoicing is never described. The product owner should confirm whether a billing module exists |
| TrackySuite | Excel Export | UNSUPPORTED | NOT SUPPORTED | https://trackysuite.com/ | [browser-verified] Excel is mentioned only for client import ("Bring an Excel file — up to 500 clients at once"). The trial FAQ says data is handed over on request, and the privacy policy says "Firms may request export or deletion of their data" | No Excel export feature |
| TrackySuite | PDF Export | UNSUPPORTED | NOT SUPPORTED | https://trackysuite.com/ | [browser-verified] PDFs appear only as sample uploaded documents (e.g. "GSTR-3B-Apr.pdf"); clients can "download what you've filed for them" | No PDF export or report feature |
| TrackySuite | Multi-Office Management | UNSUPPORTED | PARTIALLY SUPPORTED | https://trackysuite.com/#pricing | [browser-verified] Firm plan: "Multi-office firms running a full compliance calendar"; Multi-Partner: "For 6 to 10 Partners" | Plan taglines only, with no branch or office feature. Add as a section in the pricing page |

## URLs and searches checked
- https://trackysuite.com/ (WebFetch and live Playwright render, including pricing and FAQ)
- https://trackysuite.com/about and https://trackysuite.com/terms (live Playwright render)
- https://trackysuite.com/login (WebFetch)
- https://trackysuite.com/sitemap.xml lists only /, /about, /contact, /signup, /login, /privacy and /terms
- scripts/.research/trackysuite.md (earlier dump, grepped for invoic/billing/export/excel/pdf)
- WebSearch `site:trackysuite.com invoice OR export OR branch` found no indexed pages from the domain
- The FAQ mentions an in-app "help library", but it is not publicly linked

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 5 | 0 | 0 | 2 | 2 | 1 |
