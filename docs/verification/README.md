# Part 1: Re-verification of "Unsupported" pages

Every page previously marked UNSUPPORTED in `docs/page-plan/` was re-checked against each product's live official web presence: rendered in a browser, sitemaps, subdomains and site searches. The per-row evidence (official URL, exact quote, and whether it was seen in a browser or only in a search snippet) is in `docs/verification/<product>.md`.

No website code or content was changed in Part 1.

## Summary

| Product | Previously unsupported | Supported | Equivalent terminology | Partially supported | Still not supported | Manual review |
|---|--:|--:|--:|--:|--:|--:|
| TaskMagic | 6 | 0 | 0 | 0 | 3 | 3 |
| ODA7 | 9 | 0 | 0 | 4 | 5 | 0 |
| SigChanger | 2 | 0 | 0 | 0 | 2 | 0 |
| ZUZU | 27 | 0 | 0 | 5 | 20 | 2 |
| Sizoru | 6 | 0 | 0 | 4 | 2 | 0 |
| TrackySuite | 5 | 0 | 0 | 2 | 2 | 1 |
| Fleetras | 17 | 0 | 0 | 6 | 11 | 0 |
| GetBenj | 36 | 0 | 0 | 0 | 35 | 1 |
| Cardizo | 35 | 0 | 0 | 2 | 33 | 0 |
| Zorfly | 24 | 0 | 1 | 3 | 14 | 6 |
| Fantom | 25 | 0 | 0 | 3 | 14 | 8 |
| MeetingMind | 35 | 1 | 1 | 7 | 25 | 1 |
| **Total** | **229** | **1** | **2** | **38** | **166** | **22** |

ZapBuzzer, HRMagix and Sibu had no target plans. For those three, `zapbuzzer.md`, `hrmagix.md` and `sibu.md` list:
- official topics that have no page yet;
- existing pages whose claims were not found on the official site.

## Decisions needed before Part 2

1. **App-only evidence (Fantom, Zorfly, ZUZU).** The public JavaScript bundles contain the logged-in app's text, and that text shows real features: Fantom Wi-Fi/SSID monitoring and call filters, Zorfly learning paths and certificates, and the ZUZU approval queue. These are not public marketing pages. Should they count as official sources?
2. **MeetingMind pricing.** Free $0 / Pro $19 / Premium $49 is published, but the page says "set by your operator". Publish it or not?
3. **TaskMagic logs, run history and error handling.** The help articles behind these now redirect to the help home page. The only evidence left is search snippets.
4. **TrackySuite invoicing.** "Billing" appears only as a module name.
5. **Existing claims not found on official sites:**
   - ZapBuzzer: AI assistant.
   - Sibu: SDKs, CLI/API playground, face grouping, SCIM, the Google Drive integration and AES-256 encryption at rest.
   These should be re-checked and removed if they are unconfirmed.
6. **Placeholder contact details (Fantom, GetBenj).** Keep them unpublished.
