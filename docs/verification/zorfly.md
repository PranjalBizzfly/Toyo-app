# Zorfly: verification of UNSUPPORTED rows

Re-verified on 2026-10-08.

**Official domain:** https://zorfly.com/ (Next.js, server-rendered). Pages exist at `/`, `/pricing`, `/login`, `/signup`, `/legal/privacy` and `/legal/terms`. robots.txt and sitemap.xml return 404. Contact: hello@zorfly.com and billing@zorfly.com.

**Other presence:**
- blog.zorfly.com is WordPress with only "Hello world!".
- app.zorfly.com is a logged-in SPA. **It is not linked from zorfly.com**: the site's sign-in goes to zorfly.com/login. Its bundle is therefore listed only as snippet-only, and rows that rely on it are NEEDS MANUAL REVIEW.
- The app bundle also contains strings that are clearly unrelated to Zorfly, such as "Servexa" chat-integration text and a page-threshold monitor. This points to shared or template code, so it cannot be trusted as Zorfly evidence without someone confirming it.
- help., docs. and www. do not resolve. api. returns 404. No app-store listing was found.

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|---|
| Zorfly | How It Works | UNSUPPORTED | PARTIALLY SUPPORTED | https://zorfly.com/#level-up | Browser-verified: the nav item "How it works" anchors to "LEVEL UP YOUR COMMUNICATION — Training that earns its place in your day. Earn XP, unlock badges, and watch your weakness profile shrink session by session." The hero says "Complete one short mission a day" | No numbered steps. Use it as a short section on the overview page |
| Zorfly | Course Management | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/pricing | "Full canonical curriculum (8 domains)". The string "course" is not on the public site or in the app bundle | A curriculum is not course management |
| Zorfly | Content Management | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/signup | "Eight grammar domains, ~250 curated questions" means curated content, not a content-management feature | |
| Zorfly | Learner Profiles | UNSUPPORTED | PARTIALLY SUPPORTED | https://zorfly.com/ | Browser-verified: "watch your weakness profile shrink"; "Onboarding baseline diagnostic" (pricing) | Section inside the weakness-reports page |
| Zorfly | Instructor Profiles | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | No instructors. Coaching is AI ("AI coaching") | |
| Zorfly | Learning Paths | UNSUPPORTED | NEEDS MANUAL REVIEW | https://zorfly.com/pricing | Public: "Personalized recommendations". Snippet-only (app.zorfly.com): "Assign a learning path to employees, then their progress appears here." | The app domain is not linked from the site |
| Zorfly | Assignments | UNSUPPORTED | NEEDS MANUAL REVIEW | app.zorfly.com (unlinked) | Snippet-only: "assignments" counters ("assignmentsActive") | Not public |
| Zorfly | Certifications | UNSUPPORTED | NEEDS MANUAL REVIEW | app.zorfly.com (unlinked) | Snippet-only: "Certificate of Achievement", routes "/app/certificates" and "/certificates/mine", PDF download | The public site mentions badges only |
| Zorfly | Training Management | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Only "Team analytics" and "Monthly domain evaluations" exist. No management of training | |
| Zorfly | Collaboration | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Not mentioned | "invite your team" on the signup page is onboarding, not collaboration |
| Zorfly | Notifications | UNSUPPORTED | NEEDS MANUAL REVIEW | app.zorfly.com (unlinked) | Snippet-only: route "/app/notifications". Some notification strings ("recovery notification when the page returns below the threshold") look like foreign or template code | Not public |
| Zorfly | Reminders | UNSUPPORTED | NEEDS MANUAL REVIEW | app.zorfly.com (unlinked) | Snippet-only: "/companies/activity-reminders", "activityReminderAfterDays" | Not public |
| Zorfly | Scheduling | UNSUPPORTED | NEEDS MANUAL REVIEW | app.zorfly.com (unlinked) | Snippet-only: "/schedules", "schedulesActive" | Not public |
| Zorfly | Knowledge Management | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Not mentioned | |
| Zorfly | Resources | UNSUPPORTED | NOT SUPPORTED | https://blog.zorfly.com/ | The blog has only "Hello world!" | |
| Zorfly | Media Management | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Not mentioned | The bundle's upload code is generic |
| Zorfly | Search | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Not mentioned | The bundle has only generic filter state |
| Zorfly | Permissions | UNSUPPORTED | SUPPORTED – EQUIVALENT TERMINOLOGY | https://zorfly.com/pricing | Browser-verified (SSR HTML): "Owner / admin / member roles"; "SSO / SAML (on request)" | Thin. A short roles section is enough |
| Zorfly | Automation | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Not mentioned | |
| Zorfly | Workflows | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Not mentioned | |
| Zorfly | Productivity | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | Only "Five minutes a day". No productivity feature | |
| Zorfly | Training Programs | UNSUPPORTED | PARTIALLY SUPPORTED | https://zorfly.com/pricing | "Full canonical curriculum (8 domains)", "Monthly domain evaluations", "Per-role question variations" | Section inside the curriculum/lessons page |
| Zorfly | Industry Solutions | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/ | No industries named | |
| Zorfly | Integrations | UNSUPPORTED | NOT SUPPORTED | https://zorfly.com/legal/privacy | Privacy: "We use Anthropic Claude to generate AI feedback". That is a processor, not a user integration | The app bundle's "Servexa Integration" is unrelated or unverified |

## URLs and searches checked
- Rendered with Playwright: https://zorfly.com/
- curl (SSR text): /pricing, /login, /signup, /legal/privacy, /legal/terms
- 404: /robots.txt, /sitemap.xml, /features, /about, /faq, /help, /docs, /blog, /support, /contact, /how-it-works
- Subdomains: blog. (WP REST: Hello world only), app. (bundle /assets/index-BZ69I12-.js grepped for notification, reminder, certificate, assignment, course, instructor, learning path, schedule, search, upload, integration, slack, permission, invite, content), api. (404). help., docs. and www. do not resolve.
- Local dump: scripts/.research/zorfly.md
- WebSearch: the combined site: query found nothing indexed. No app-store listing.

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 24 | 0 | 1 | 3 | 14 | 6 |
