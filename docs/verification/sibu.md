# Sibu – official-site verification (2026-10-08)

Sources: https://sibu-website.vercel.app/sitemap.xml (370 locs, canonical host getsibu.com); curl text of home, /features, /integrations, /developers, /security and /features/ai-features; browser-rendered dump scripts/.research/sibu-site.md. No docs subdomain resolves. Data file: src/content/products/sibu.ts. Many official URLs are SEO variants of one capability; where an existing page already covers them, they are marked EQUIVALENT TERMINOLOGY.
Verification mode: sitemap, snippet-only (curl or WebFetch) or browser-verified (rendered dump). No live Playwright run was made, because this task forbids writing under scripts/.

## Official topics with no page yet

| Product | Topic | Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|
| Sibu | AI variants (24 URLs: ai-ocr, ai-semantic-search, ai-duplicate-detection, ai-tag-approval/override/confidence, ai-vision-analysis, AI image/video/document discovery, ai-asset-recommendations, ...) | SUPPORTED – EQUIVALENT TERMINOLOGY | https://getsibu.com/features/ai-features | /features/ai-* | sitemap. ai-tag-confidence, ai-tag-override and ai-asset-recommendations are new claims |
| Sibu | Review/collaboration variants (client-review, campaign-review, frame-accurate-review, creative-approval-workflow, review-status, team-feedback, shared-creative-views, team-asset-sharing, remote/agency/brand/production collaboration) | SUPPORTED – EQUIVALENT TERMINOLOGY | https://getsibu.com/features/collaborative-asset-review | /features/* | sitemap. shared-creative-views and team-asset-sharing are new |
| Sibu | Versioning variants (image/video/document/campaign versions, file-version-history, asset-replacement, asset-recovery, asset-deletion) | SUPPORTED – EQUIVALENT TERMINOLOGY | https://getsibu.com/features/file-version-history | /features/* | sitemap. asset-recovery and asset-deletion are new |
| Sibu | Searchable image/video/audio/document libraries, natural-language search, OCR search | SUPPORTED – EQUIVALENT TERMINOLOGY | https://getsibu.com/features/searchable-audio-library | /features/* | sitemap. Audio library has no page |
| Sibu | Storage/ingestion (24: chunked, parallel and resumable uploads, drag-and-drop, watch-folder ingestion, thumbnail generation, AI processing queue, upload progress, storage-growth analytics) | SUPPORTED | https://getsibu.com/storage-and-ingestion | /storage/* | sitemap. Watch-folder ingestion and thumbnail generation have no page |
| Sibu | Permissions (30: folder-level, department, editor/manager/individual permissions, hierarchies, access-history, permission-auditing, per-client AI keys/auth/storage, white-label, secure sharing) | SUPPORTED | https://getsibu.com/permissions-and-multi-tenancy | /permissions/* | sitemap. per-client-ai-keys, per-client-storage and white-label are notable gaps |
| Sibu | Security: secret-encryption, tenant-isolation, default-deny, MFA, audit-logs | SUPPORTED – EQUIVALENT TERMINOLOGY | https://getsibu.com/security | /security/*; the dump mentions "encryption, authentication, access control, tenant..." | browser-verified. secret-encryption has no page |
| Sibu | Developers: approval-api, asset-comments-api, webhook-events, api-security, api-tenant-isolation, developer-automation | SUPPORTED | https://getsibu.com/developers | /developers/* | sitemap |
| Sibu | Migration: strategy, planning, migration-without-downtime, implementation, support | SUPPORTED – EQUIVALENT TERMINOLOGY | https://getsibu.com/migrate-to-sibu | /migration/* | sitemap. migration-without-downtime is a new claim |
| Sibu | Analytics (31 reports) | PARTIALLY SUPPORTED | https://getsibu.com/analytics | /analytics/* | sitemap. We have 7 |
| Sibu | Architecture (20 pages: CDN, edge caching, observability, stateless API, ...) | SUPPORTED | https://getsibu.com/architecture | /architecture/* | sitemap |
| Sibu | Business value (13 pages) | SUPPORTED | https://getsibu.com/business-value | /business-value/* | sitemap |
| Sibu | Use cases: advertising agencies, brand consultancies, content creators, corporate/internal comms, creative studios, documentary teams, in-house creative, media companies, PR teams, social media teams, video agencies, global brands | SUPPORTED | https://getsibu.com/use-cases | /use-cases/* | sitemap. Newsrooms, retail, e-commerce, education, events, photography and post-production match our existing industry pages |
| Sibu | Pricing: for agencies, creative teams, enterprise cost | SUPPORTED | https://getsibu.com/pricing | /pricing/* | sitemap |
| Sibu | FAQ (9) and resources ("what is" and "future of" articles) | SUPPORTED | https://getsibu.com/faqs | /faq/*, /resources/* | sitemap |
| Sibu | Get-started (9) and platform (8) landing pages | NEEDS MANUAL REVIEW | https://getsibu.com/get-started/bring-your-creative-assets-together | sitemap | Marketing; scope choice |

## Existing pages whose claims were not found on the official site

| Product | Topic | Status | Official URL | Evidence | Notes |
|---|---|---|---|---|---|
| Sibu | sdks | NEEDS MANUAL REVIEW | – | "SDK" appears in neither the curl text nor the dump, and there is no URL (/developers/sdks returns 404) | browser-verified as absent. Likely unsupported |
| Sibu | cli-and-api-playground | NEEDS MANUAL REVIEW | – | "playground" appears nowhere | browser-verified as absent. Likely unsupported |
| Sibu | sso-and-scim | PARTIALLY SUPPORTED | https://getsibu.com/security | "SSO" appears in the curl text; "SCIM" appears in neither source | browser-verified. Drop SCIM |
| Sibu | ai-mood-detection, ai-colour-detection, scene-detection | SUPPORTED | https://getsibu.com/features/ai-features | Dump: "vision analysis, object, mood and colour detection, OCR..."; "Tagging, Scene Identification, OCR Extraction" | browser-verified |
| Sibu | face-grouping | NEEDS MANUAL REVIEW | – | No URL; no "face grouping" or "faces" text in the dump | browser-verified as absent. Likely unsupported |
| Sibu | google-drive, dropbox, aws-s3 | PARTIALLY SUPPORTED | https://getsibu.com/integrations | The sitemap has only /integrations and /integrations/custom-integrations. "Dropbox" and "S3" have a few hits in the curl text; "Google Drive" has none in either source | snippet-only. Official wording is "connected drives / connected storage" |
| Sibu | aes-256-at-rest, backup-redundancy, onboarding-included | NEEDS MANUAL REVIEW | https://getsibu.com/security | "AES" has no hits in the dump; "backup/redundancy" has 3; there is a /migration/onboarding URL | browser-verified. The AES-256 claim is unconfirmed |
