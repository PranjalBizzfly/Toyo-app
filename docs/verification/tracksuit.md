# Tracksuit – verification of UNSUPPORTED rows (re-checked 2026-10-08, browser-rendered)

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Verification | Notes |
|---|---|---|---|---|---|---|---|
| Tracksuit | Data Weighting | UNSUPPORTED | PARTIALLY SUPPORTED (as a section in the data collection/methodology page) | help.gotracksuit.com, article "Why your API numbers may differ from the dashboard" (section "How weighting works") | "The API returns weighted results, not raw responses. Every result is weighted before it reaches you. Weighting adjusts for demographics that are over- or under-represented in the survey sample, so the results better reflect the real population." Also: "Because we calculate weights based on the exact filters you select, the same respondent can carry a different weight in one slice than in another." | Browser-verified (scripts/.research/tracksuit-help.md, lines 9967-9977) | Substantive, but it is framed around the API rather than a standalone feature. |
| Tracksuit | Rebranding Insights | UNSUPPORTED | PARTIALLY SUPPORTED (as a use-case section in the overview/use-cases page) | https://www.gotracksuit.com/blog/posts/tracking-a-rebrand-with-bepure | "Tracksuit is the BePure team's tool of choice to track the impact of this rebrand in real time, as they can monitor whether they're growing their top-of-funnel brand metrics, if they're growing specific segments of consumers that have been underserved, and whether consumer sentiment is changing as a result of campaign activity out in market." | Browser-verified (live Playwright render) | An official case study. There is no dedicated product feature for rebrands. |

## URLs and searches checked
- Playwright: https://www.gotracksuit.com/blog/tracking-a-rebrand-with-bepure (redirects to /blog/posts/...); https://www.gotracksuit.com/robots.txt; https://www.gotracksuit.com/sitemap.xml (no rebrand or weighting product page; reports and blog topics only)
- Grep of scripts/.research/tracksuit-help.md for: weight, rebrand
- WebSearch (gotracksuit.com, help.gotracksuit.com): "gotracksuit weighting rebrand", "tracksuit methodology weighting census"

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 2 | 0 | 0 | 2 | 0 | 0 |
