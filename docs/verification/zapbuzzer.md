# ZapBuzzer – official-site verification (2026-10-08)

Sources: https://zapbuzzer-website.vercel.app/sitemap.xml (269 URLs, canonical host zapbuzzer.com); server-rendered text (curl) of home, /features, /integrations, /pricing and /resource-hub/faq; browser-rendered dump scripts/.research/zapbuzzer-site.md. No help/docs subdomain resolves (help.zapbuzzer.com did not respond). Data file: src/content/products/zapbuzzer.ts.
Verification mode: "sitemap" means the URL is listed in the official sitemap. "snippet-only" means it was checked against curl or WebFetch text. "browser-verified" means it was grepped in the rendered dump. No live Playwright run was made, because this task forbids writing under scripts/.

## Official topics with no page yet

| Product | Topic | Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|
| ZapBuzzer | Notifications hub: email, mobile push, notification routing, escalation, preferences, workflow | SUPPORTED | https://zapbuzzer.com/notifications | 9 /notifications/* URLs in the sitemap | sitemap. We have telegram, whatsapp and multi-channel only |
| ZapBuzzer | SLA sub-topics: sla-timers, sla-tracking, sla-breach-detection, automatic-escalation, manager-escalation, overdue-requests, sla-reporting, sla-analytics | SUPPORTED – EQUIVALENT TERMINOLOGY | https://zapbuzzer.com/sla-and-escalation | /sla-and-escalation/* | sitemap. Partly covered by sla-and-escalation and escalation-chains |
| ZapBuzzer | Analytics sub-topics: request, staff, team performance, response/acceptance/delivery time, on-time, rating, office activity | PARTIALLY SUPPORTED | https://zapbuzzer.com/analytics | 9 /analytics/* URLs | sitemap. Covered generally by analytics-plus-scorecard and request-reports |
| ZapBuzzer | Owner, staff, employee and manager dashboards; staff assignment; audit logs | SUPPORTED – EQUIVALENT TERMINOLOGY | https://zapbuzzer.com/administration | /administration/* | sitemap. We have admin-dashboard and roles-and-audit-log |
| ZapBuzzer | Mobile sub-pages: android-app, mobile requests, notifications, acceptance, delivery tracking, ratings, staff workflow, office management | PARTIALLY SUPPORTED | https://zapbuzzer.com/mobile-app | 10 /mobile-app/* URLs | sitemap. We have mobile-app and install-android-app |
| ZapBuzzer | Enterprise: rollout, security, administration, analytics, user management, permissions, audit logs, reporting, support | SUPPORTED | https://zapbuzzer.com/enterprise | 10 /enterprise/* URLs | sitemap. We have no Enterprise or Security page (multi-location only) |
| ZapBuzzer | Developers: api-documentation, api-authentication, api-requests, webhook-events | SUPPORTED | https://zapbuzzer.com/developers/api-documentation | /developers/* | sitemap. We have rest-api and webhooks |
| ZapBuzzer | Pantry: coffee, tea and snacks requests; ordering workflow; staff management; request tracking | SUPPORTED | https://zapbuzzer.com/solutions/pantry | /solutions/pantry/* | sitemap |
| ZapBuzzer | Print room: print-requests, pdf-print-requests, request tracking, staff workflow, print SLA, print analytics | SUPPORTED | https://zapbuzzer.com/solutions/print-room | /solutions/print-room/* | sitemap |
| ZapBuzzer | IT: it-request-management, it-ticket-routing, it-sla-management, it-support-analytics | SUPPORTED | https://zapbuzzer.com/solutions/it-support | /solutions/it-support/* | sitemap |
| ZapBuzzer | Facilities: facilities-requests, routing, escalation, SLA, analytics | SUPPORTED | https://zapbuzzer.com/solutions/facilities | /solutions/facilities/* | sitemap |
| ZapBuzzer | Courier: mailroom requests, delivery requests, incoming/outgoing courier workflow, courier tracking, reception workflow, mailroom analytics | SUPPORTED – EQUIVALENT TERMINOLOGY | https://zapbuzzer.com/solutions/courier-and-reception | /solutions/courier-and-reception/* | sitemap. outgoing-dispatch and internal-deliveries match outgoing-courier-workflow and delivery-requests |
| ZapBuzzer | Use cases by role: ceo, founder, office-manager, hr-team, admin-team, it-manager, facilities-manager, reception-team, sales-team, operations-team | PARTIALLY SUPPORTED | https://zapbuzzer.com/use-cases/ceo | /use-cases/* | sitemap. We have 4 grouped audiences |
| ZapBuzzer | Use cases by outcome: stop-chase-calls, reduce-whatsapp-requests, reduce-phone-calls, prevent-lost-requests, improve-response-time, track-office-requests, staff-accountability, sla-compliance, better pantry/facilities operations | SUPPORTED | https://zapbuzzer.com/use-cases/stop-chase-calls | /use-cases/* | sitemap |
| ZapBuzzer | Workflows: coffee, print, IT support, AC issue, projector, HDMI, courier pickup, lunch, emergency-summon | SUPPORTED | https://zapbuzzer.com/workflows | /workflows/* | sitemap. emergency-summon has no equivalent page |
| ZapBuzzer | Pricing plans: free, pro, enterprise | SUPPORTED | https://zapbuzzer.com/pricing | /pricing/* | sitemap. We have billing-and-seats only |
| ZapBuzzer | Resource hub: product tour, FAQ, glossary, 5 guides | SUPPORTED | https://zapbuzzer.com/resource-hub | /resource-hub/* | sitemap |
| ZapBuzzer | Comparisons: vs manual requests, WhatsApp, phone calls, helpdesk | SUPPORTED | https://zapbuzzer.com/feature-comparison | /feature-comparison/* | sitemap |
| ZapBuzzer | Blog (8 posts), customer stories, clients, how-it-works, why-zapbuzzer, vendors-and-partners | NEEDS MANUAL REVIEW | https://zapbuzzer.com/blog | sitemap | Editorial and company pages; deciding whether to include them is a scope choice |

## Existing pages whose claims were not found on the official site

| Product | Topic | Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|
| ZapBuzzer | ai-assistant | NEEDS MANUAL REVIEW | – | No sitemap URL. No "AI assistant" text in the curl text of home, /features, /pricing or the FAQ, or in the rendered dump (the only "assistant" hits mean "office assistant") | browser-verified as absent. Probably unsupported |
| ZapBuzzer | outgoing-dispatch, internal-deliveries | SUPPORTED – EQUIVALENT TERMINOLOGY | https://zapbuzzer.com/solutions/courier-and-reception/outgoing-courier-workflow | "dispatch" and "internal delivery" appear in neither the curl text nor the dump | snippet-only. Consider using the official slugs |
| ZapBuzzer | delete-account, getting-started | NEEDS MANUAL REVIEW | https://zapbuzzer.com/delete-account | Neither is in the sitemap or the dump | delete-account is linked from the data file, so the URL may exist without being listed |
