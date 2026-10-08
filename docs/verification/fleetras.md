# Fleetras – verification of UNSUPPORTED rows (live check 2026-10-08)

Official domain: https://fleetras.com/ (from src/content/products/drafts.ts). The site is a single page. No help/docs/blog subdomain or app-store listing is linked; the site says the app "installs to the home screen on iPhone and Android" (a PWA).

Evidence tags: **[browser-verified]** means the page was rendered live with Playwright (document.body.innerText) on 2026-10-08. **[snippet-only]** means the evidence came from WebFetch or search only.

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|---|
| Fleetras | Fleet Dashboard | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] The word "dashboard" does not appear anywhere in the rendered page | The overview/features page already covers the office view |
| Fleetras | Maintenance Management | UNSUPPORTED | PARTIALLY SUPPORTED | https://fleetras.com/ | [browser-verified] Fleet registry: "Vehicles, drivers and passengers with insurance, registration, licence and service expiries."; Costing: "Vehicle allocations for maintenance, insurance, registration and depreciation, ready when you need them" | Covers service expiry plus maintenance cost allocation only. Add as a section in the Fleet registry and Trip costing pages |
| Fleetras | Service Scheduling | UNSUPPORTED | PARTIALLY SUPPORTED | https://fleetras.com/ | [browser-verified] "...licence and service expiries." | Expiry dates only, no scheduling. Add as a section in the Fleet registry page |
| Fleetras | Maintenance Records | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] No maintenance history or log is described. The only related claim is "Retired vehicles and inactive drivers keep their history" (trip history) | |
| Fleetras | Compliance Management | UNSUPPORTED | PARTIALLY SUPPORTED | https://fleetras.com/ | [browser-verified] "insurance, registration, licence and service expiries"; "Every change is written to an audit log; every sign-in is recorded with device and address." | Add as a section in the Fleet registry and Security pages |
| Fleetras | Reminders | UNSUPPORTED | PARTIALLY SUPPORTED | https://fleetras.com/ | [browser-verified] "Overspeed, harsh braking, SOS, offline and fence entry or exit alerts land in the notification feed."; "The driver is notified on the spot." | These are tracking alerts and dispatch notifications. The site does not say it sends expiry reminders. Add as a section in the Vehicle tracking page |
| Fleetras | Performance Tracking | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] No performance metrics or KPIs are described | |
| Fleetras | Operational Efficiency | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] Not mentioned | |
| Fleetras | Driver Performance | UNSUPPORTED | PARTIALLY SUPPORTED | https://fleetras.com/ | [browser-verified] Overspeed and harsh-braking alerts; "Monthly trends and cost by vehicle, driver and passenger" | Driving-event alerts and per-driver cost only, no scoring. Add as a section in the Vehicle tracking and Reports pages |
| Fleetras | Vehicle Utilization | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] Only "stops and idle time" in trip playback and per-vehicle cost | Too weak to count as utilization |
| Fleetras | Route Efficiency | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] "Route history for any day, with start and end points, stops and idle time alongside the trip record." | Playback only, with no optimisation |
| Fleetras | Productivity | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] Not mentioned | |
| Fleetras | Dashboard Analytics | UNSUPPORTED | PARTIALLY SUPPORTED | https://fleetras.com/ | [browser-verified] "Reports and exports – Monthly trends and cost by vehicle, driver and passenger. Filter, select and export to Excel or open a print-ready report." | Reports, not a dashboard. Add as a section in the Reports/Trip costing page |
| Fleetras | Logistics | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] The only market wording is "Fleet management, dispatch and trip cost tracking for Dubai city operations" | No logistics industry is stated |
| Fleetras | Pricing | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] The nav is Features, How it works, Costing, Tracking, Security, Sign in. No pricing link or prices; "Accounts are created by your administrator" | |
| Fleetras | Resources | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] The footer has only Features, Trip costing, Vehicle tracking, Sign in, Privacy Policy, Terms | |
| Fleetras | FAQ | UNSUPPORTED | NOT SUPPORTED | https://fleetras.com/ | [browser-verified] No FAQ section | |

## URLs and searches checked
- https://fleetras.com/ via WebFetch and via a live Playwright render (full innerText)
- https://fleetras.com/sitemap.xml returned the sign-in page, which only links /, /forgot, /privacy and /terms
- scripts/.research/fleetras.md (earlier browser dump, used for cross-checking only)
- WebSearch `site:fleetras.com` found no indexed pages from the domain
- No app., help., docs. or blog. subdomain and no app-store listing is linked from the site

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 17 | 0 | 0 | 6 | 11 | 0 |
