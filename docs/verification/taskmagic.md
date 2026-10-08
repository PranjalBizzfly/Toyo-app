# TaskMagic – verification of UNSUPPORTED rows (re-checked 2026-10-08, browser-rendered)

| Product | Requested Page | Previous Status | New Status | Official URL | Evidence | Verification | Notes |
|---|---|---|---|---|---|---|---|
| TaskMagic | Run History | UNSUPPORTED | NEEDS MANUAL REVIEW | https://help-v1.taskmagic.com/help-center/s5FiF82Lv6xeJADe7k8pss/understanding-traffic-control-in-automation/7LUwKWscof4ALaw5SWKUoo | Search-index snippet only: Traffic Control "showcases the automation runs and their status"; filter by active, completed, failed or queued runs. In a Playwright render, the article URL redirects to the help home on both help.taskmagic.com and help-v1.taskmagic.com. The current help dump (scripts/.research/taskmagic-help.md) has no "traffic control", "task history" or "run history". | Snippet-only; live page not reachable | The earlier snippet-based PARTIAL is withdrawn. The article may be retired or need login. |
| TaskMagic | Logs And Monitoring | UNSUPPORTED | NEEDS MANUAL REVIEW | https://help-v1.taskmagic.com/help-center/s5FiF82Lv6xeJADe7k8pss/my-cloud-run-isnt-working/wwPdV7miXqRmqv3vEz24ms | Search-index snippet only: "navigate to the task history and click on 'show logs'". In a Playwright render, the URL redirects to the help home. No "show logs" in the current help dump. | Snippet-only | The earlier EQUIVALENT is withdrawn. The current help dump has "Get Address Logs", but that is a blockchain app action and not run logs. |
| TaskMagic | Error Handling | UNSUPPORTED | NEEDS MANUAL REVIEW | https://help-v1.taskmagic.com/help-center/s5FiF82Lv6xeJADe7k8pss/what-is-allow-error-and-how-does-it-work/xwUrYv8XHj1Bs1AEjcjsb5 | Article title "What is Allow Error and How Does it Work" exists in the search index. In a Playwright render, the URL redirects to the help home. No "allow error" in the current help dump. | Snippet-only | |
| TaskMagic | Salesforce Automation | UNSUPPORTED | NOT SUPPORTED | https://help.taskmagic.com/apps/salesforce | "Salesforce is available in Apps Builder as a trigger or action." The page lists "Actions (1)" (the only action is "Custom API Call") and 0 triggers. | Browser-verified (help dump) | A single generic API-call action. The homepage mentions Salesforce only in the "Trusted by teams at" list. |
| TaskMagic | Operations Automation | UNSUPPORTED | NOT SUPPORTED | https://taskmagic.com/sitemap.xml | The sitemap's only pages are /, /cloud, /dashboards, /scrapers/*, /white-label and the legal pages. None is about operations. | Browser-verified | |
| TaskMagic | Resources | UNSUPPORTED | NOT SUPPORTED | https://taskmagic.com/sitemap.xml | The sitemap has no blog or resources URLs. The footer has Community, Help, Web Scrapers, Terms, Privacy and Fair Use. | Browser-verified | Help is already mapped to support. |

## URLs and searches checked
- Playwright: help.taskmagic.com Traffic Control, Allow Error and My Cloud Run articles (all redirect to the help home); the same three on help-v1.taskmagic.com (all redirect); taskmagic.com/sitemap.xml; taskmagic.com/robots.txt; /dashboards; /cloud
- Grep of scripts/.research/taskmagic-help.md for: traffic control, task history, run history, logs, allow error, error, history, salesforce
- WebFetch: https://taskmagic.com/
- WebSearch (site taskmagic.com, help.taskmagic.com): "taskmagic run history logs errors", "taskmagic salesforce"

## Summary
| Previously unsupported | Supported | Equivalent | Partial | Not supported | Manual review |
|---|---|---|---|---|---|
| 6 | 0 | 0 | 0 | 3 | 3 |
