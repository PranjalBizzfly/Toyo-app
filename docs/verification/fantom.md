# Fantom: verification of UNSUPPORTED rows

Re-verified on 2026-10-08.

**Official domain:** https://fantomapps.com/. The page brands itself "SIM Manager". The legal pages say "SIM Trackr" and give support@simtrackr.com. It is a JavaScript single-page app (SPA): every path returns a 1,930-byte shell, including /robots.txt and /sitemap.xml. Public content comes from https://api.fantomapps.com/api/landing-content/public. Pages were rendered with Playwright.

**Other presence:**
- The footer links "Integrations" and "Mobile App" both point to `#`.
- The FAQ mentions an Android app ("Our mobile app (Android) automatically syncs call logs"), but no Play Store link exists and no listing was found.
- blog.fantomapps.com is WordPress with only "Hello world!".
- app., help., docs. and www. do not resolve. api. root returns 404.
- fantom-website.vercel.app is a different product and is excluded.

**Evidence labels:** snippet-only means a string from the logged-in app inside `/assets/index-BA94tDso.js`. That includes an in-app guide with "Troubleshooting", "Glossary" and workflow screens. None of it is public marketing copy, so those rows are NEEDS MANUAL REVIEW.

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|---|
| Fantom | Device Monitoring | UNSUPPORTED | NEEDS MANUAL REVIEW | https://fantomapps.com/ | Public: "CCTV Monitoring" (plan line only). Snippet-only: "Add Device", "Active (Device can send metrics)", "Assign Device to WiFi" | |
| Fantom | Network Monitoring | UNSUPPORTED | NEEDS MANUAL REVIEW | https://fantomapps.com/#pricing | Public: "WiFi Monitor" (plan line). Snippet-only: "Device Runs Periodic Speed Tests", "All WiFi Networks" | |
| Fantom | Wi-Fi Logs | UNSUPPORTED | NEEDS MANUAL REVIEW | https://fantomapps.com/#pricing | Public: "WiFi Monitor" plan line only. Snippet-only: speed-test results per network | |
| Fantom | Wi-Fi Performance | UNSUPPORTED | NEEDS MANUAL REVIEW | — | Snippet-only: "add your WiFi network with name, SSID, BSSID, expected speed, and alert threshold"; "speed test results start appearing automatically" | The strongest app-only evidence among the Wi-Fi rows |
| Fantom | SSID Tracking | UNSUPPORTED | NEEDS MANUAL REVIEW | — | Snippet-only: "SSID (and ideally BSSID) matches what you registered"; "BSSID (Router MAC)" | |
| Fantom | Connection Status | UNSUPPORTED | NOT SUPPORTED | https://fantomapps.com/ | Nothing public. The bundle's "Online/Offline" belongs to CCTV cameras | |
| Fantom | Network Strength | UNSUPPORTED | NOT SUPPORTED | — | Nothing public. No signal-strength strings in the bundle | |
| Fantom | Network Timestamps | UNSUPPORTED | NOT SUPPORTED | — | Nothing found | |
| Fantom | Incoming/Outgoing/Missed Calls | UNSUPPORTED | NEEDS MANUAL REVIEW | https://fantomapps.com/#features | Public: "analyze call patterns, durations, and contact frequency". Snippet-only: "Incoming", "Outgoing", "Missed Calls" call-type filter | Public copy does not name call types |
| Fantom | SMS Logs | UNSUPPORTED | PARTIALLY SUPPORTED | https://fantomapps.com/#pricing | Browser-verified plan line "SMS Logs". Snippet-only: "The app automatically syncs your call and SMS history" | Section inside the call-log page |
| Fantom | Sent/Received SMS Events | UNSUPPORTED | NOT SUPPORTED | — | Nothing public. The bundle's "Sent"/"Received" belong to other screens (payments, counters) | |
| Fantom | Network Codes | UNSUPPORTED | NOT SUPPORTED | https://fantomapps.com/#features | Only "Track operators, circles". No MCC/MNC codes | |
| Fantom | Device Analytics | UNSUPPORTED | NOT SUPPORTED | — | Analytics are for calls and recharges only | |
| Fantom | Software Version | UNSUPPORTED | NOT SUPPORTED | — | Nothing found | |
| Fantom | Performance Metrics | UNSUPPORTED | NOT SUPPORTED | — | Nothing public. Speed tests are covered under Wi-Fi Performance | |
| Fantom | Crash Diagnostics | UNSUPPORTED | NOT SUPPORTED | — | No crash strings on the public site or in the bundle | |
| Fantom | Activity Logs | UNSUPPORTED | NEEDS MANUAL REVIEW | — | Snippet-only: an "Activity Log" panel heading | Context unclear |
| Fantom | Device Usage | UNSUPPORTED | NOT SUPPORTED | — | Nothing found | |
| Fantom | Diagnostics | UNSUPPORTED | NOT SUPPORTED | — | Nothing found ("Diagnos" has no match) | |
| Fantom | Device/Network/Performance Insights | UNSUPPORTED | NOT SUPPORTED | — | Nothing public | |
| Fantom | Troubleshooting | UNSUPPORTED | NEEDS MANUAL REVIEW | — | Snippet-only: in-app guide sections "Troubleshooting", "Glossary", "How modules connect", with entries like "An employee's calls or SMS aren't showing up" | In-app help, not public |
| Fantom | Device Diagnostics | UNSUPPORTED | NOT SUPPORTED | — | Nothing found | |
| Fantom | Network Diagnostics | UNSUPPORTED | NOT SUPPORTED | — | Nothing found | Speed tests are not presented as diagnostics |
| Fantom | Support | UNSUPPORTED | PARTIALLY SUPPORTED | https://fantomapps.com/#pricing | Browser-verified: plan line "Priority Support". Privacy policy: "To provide customer support … support@simtrackr.com" | The email is on another domain. Mention it inside the pricing page only |
| Fantom | Contact | UNSUPPORTED | PARTIALLY SUPPORTED | https://fantomapps.com/ | Browser-verified: "Get In Touch" form (Name, Email, Phone, Company, Message), "contact@fantom.com", "+91 9876543210" | The form is real. The email and phone look like placeholders, so do not publish them. A section on the home/support page |

## URLs and searches checked
- Rendered with Playwright: https://fantomapps.com/ , /register , /privacy-policy , /terms-of-service
- API: https://api.fantomapps.com/api/landing-content/public (features, how-it-works, FAQ answers)
- curl: /robots.txt, /sitemap.xml, /features, /pricing, /about, /faq, /help, /docs, /blog, /support, /contact, /how-it-works all return the SPA shell
- Subdomains: blog. (WP REST: Hello world only). app., help., docs. and www. do not resolve. api. root returns 404.
- Bundle /assets/index-BA94tDso.js, grepped for: SSID, signal, wifi, incoming, missed, outgoing, SMS, crash, battery, device, network, app version, MCC/MNC, diagnos, troubleshoot, play.google, speed test, activity log
- Local dump: scripts/.research/fantom.md
- WebSearch: the combined site: query found nothing indexed. A Play/App Store search found no Fantom or SIM Manager listing from this publisher.

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 25 | 0 | 0 | 3 | 14 | 8 |
