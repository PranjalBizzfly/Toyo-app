# Sizoru – verification of UNSUPPORTED rows (live check 2026-10-08)

Official domain: https://sizoru.com/ (from src/content/products/sizoru.ts). Sizoru is a Stolvix product.

Evidence tags: **[browser-verified]** means the page was rendered live with Playwright on 2026-10-08. **[snippet-only]** means the evidence came from WebFetch only.

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|---|
| Sizoru | Market Research | UNSUPPORTED | NOT SUPPORTED | https://sizoru.com/methodology | [snippet-only] "If you need a 200-respondent customer survey, you need a research firm."; [browser-verified] "We will never claim that downloading our .pdf is a substitute for understanding your market." | The product does market sizing only, and the sizing pages already cover that. The pipeline's "real-time web research" is part of sizing |
| Sizoru | Customer Segmentation | UNSUPPORTED | PARTIALLY SUPPORTED | https://sizoru.com/methodology | [browser-verified] "It's a segmentation lens, not a number-cruncher — but it changes the SAM by 40 – 70% in most cases."; "The SAM is filtered to that segment." | India 1/2/3 market segmentation inside sizing. Add as a section in the Methodology / India 1-2-3 page |
| Sizoru | Industry Analysis | UNSUPPORTED | NOT SUPPORTED | https://sizoru.com/ | [browser-verified] "industry" appears only as a brief input field and in the FAQ title "Do you actually understand my industry?" (answer collapsed and not rendered); the methodology cites "industry papers" as sources | Industry analysis is not offered as a capability |
| Sizoru | Consultants And Advisors | UNSUPPORTED | PARTIALLY SUPPORTED | https://sizoru.com/ | [browser-verified] "PERSONA · 02 Consultants & advisors — Strategy · banking · fundraising — Your time is worth ₹15K an hour. Spend it on insight, not calculation." | A persona card only. Keep it as a use-case section in the overview |
| Sizoru | VCs And Accelerators | UNSUPPORTED | PARTIALLY SUPPORTED | https://sizoru.com/ | [browser-verified] "PERSONA · 03 VCs & accelerators — Thesis & cohort sizing — Size 12 markets a month at ₹4,999 each." | A persona card only. Keep it as a use-case section in the overview |
| Sizoru | Contact | UNSUPPORTED | PARTIALLY SUPPORTED | https://sizoru.com/ | [browser-verified] The footer "CONTACT" block lists info@sizoru.com and +91 88051 55767 | There is no contact page or form. Add as a contact section in the support/overview page |

## URLs and searches checked
- https://sizoru.com/ (WebFetch and live Playwright render)
- https://sizoru.com/methodology (WebFetch and live Playwright render)
- https://sizoru.com/sitemap.xml has no real sitemap; it only links / and /sign-in?mode=signup
- scripts/.research/sizoru.md (earlier dump, used for cross-checking)
- No help, docs or blog subdomain and no app-store listing is linked

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 6 | 0 | 0 | 4 | 2 | 0 |
