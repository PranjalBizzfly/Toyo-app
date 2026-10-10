import type { Product } from "@/content/types";

/**
 * Social Magix's site is a single JS-rendered landing page (brand: Crawl
 * Companion) plus privacy and terms pages. The only published plan is named
 * "Testing" and looks like test data, so no pricing is recorded. Marketing
 * stats (1M+ profiles, 99.9% uptime, 10x faster) are not used.
 */
export const socialmagix: Product = {
  id: "social-magix",
  slug: "social-magix",
  name: "Social Magix",
  shortDescription:
    "Monitor social media profiles across 8+ platforms with scheduled crawls, inactivity alerts and analytics in one dashboard.",
  longDescription:
    "Social Magix is a social media monitoring platform. It tracks social profiles across Facebook, Instagram, X, LinkedIn, YouTube, Pinterest, Threads and Quora from a single dashboard.\n\nYou add profile URLs one by one or in bulk from a CSV file, and the platform is detected automatically. Crawls run on a schedule you set, from one time to monthly, with automatic retry on failure. Distributed crawler nodes do the work and can be added as you grow.\n\nWhen a profile goes silent beyond your threshold, Social Magix sends an inactivity alert. Timezone-aware posting reminders help you hit posting windows. Analytics show trend lines, platform breakdowns and comparisons, with CSV exports and scheduled email reports for stakeholders.\n\nAccess is split across five roles with multi-tenant isolation, so each organization's data stays separate. The site states a free tier and no credit card to start.",
  tagline: "Monitor, Crawl & Analyze Social Profiles",
  category: "sales-marketing",
  primaryUseCase: "Social media profile monitoring",
  audience: ["Social media teams", "Marketing teams", "Analysts", "Agencies managing many profiles"],
  platforms: ["web"],
  status: "live",
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes: "Only published plan is named Testing (USD 49/mo), which looks like test data. Site also brands itself Crawl Companion.",
  },
  accent: "#7C3AED",
  websiteUrl: "https://socialmagix.com/",
  appUrl: "https://socialmagix.com/login",
  featureCategories: [
    { slug: "monitoring", name: "Monitoring", description: "Add profiles, schedule crawls and get alerted when something changes." },
    { slug: "analytics-reporting", name: "Analytics and reporting", description: "Turn crawl data into charts, exports and email reports." },
    { slug: "team-scale", name: "Team and scale", description: "Roles, tenant isolation and crawler capacity for growing teams." },
  ],
  features: [
    {
      slug: "multi-platform-support",
      name: "8+ Platform Support",
      summary: "Track profiles on Facebook, Instagram, X, LinkedIn, YouTube, Pinterest, Threads and Quora with one tool.",
      category: "monitoring",
      body: [
        "Social Magix monitors social profiles across eight platforms from one dashboard: Facebook, Instagram, X (Twitter), LinkedIn, YouTube, Pinterest, Threads and Quora.",
        "When you paste a profile URL, the platform is detected automatically.",
      ],
      capabilities: [
        "Supports Facebook, Instagram, X, LinkedIn, YouTube, Pinterest, Threads and Quora.",
        "Detects the platform automatically from a profile URL.",
        "Shows all monitored profiles in one unified dashboard.",
      ],
      problem: "Teams juggling a different tool for each social network.",
      benefits: ["One tool replaces separate checks on each network."],
      relatedFeatures: ["csv-bulk-import", "scheduled-crawls"],
      sources: ["https://socialmagix.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "scheduled-crawls",
      name: "Scheduled Crawls",
      summary: "Run crawls one time, daily, weekly or monthly, with automatic retry on failure.",
      category: "monitoring",
      body: [
        "Each profile gets its own crawl frequency. Crawls can run once, daily, weekly or monthly, and a failed crawl is retried automatically.",
        "Distributed crawlers execute the schedule, so nobody has to check profiles by hand.",
      ],
      howItWorks: [
        "Add a profile.",
        "Set its crawl frequency.",
        "Crawlers run on schedule and retry on failure.",
      ],
      capabilities: [
        "Offers one-time, daily, weekly and monthly crawl frequencies.",
        "Sets frequency per profile.",
        "Retries failed crawls automatically.",
      ],
      problem: "Manual checking of social profiles that eats hours each week.",
      relatedFeatures: ["distributed-crawlers", "inactivity-alerts"],
      sources: ["https://socialmagix.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "inactivity-alerts",
      name: "Inactivity Alerts",
      summary: "Get notified when a profile goes silent beyond your threshold.",
      category: "monitoring",
      body: [
        "You set an inactivity threshold per profile. When a profile has not posted within it, Social Magix sends an alert.",
        "Alerts also cover crawl failures, and the site describes inactivity detection as running 24/7.",
      ],
      capabilities: [
        "Sets an inactivity threshold per profile.",
        "Alerts when a profile goes silent beyond that threshold.",
        "Alerts when a crawl fails.",
      ],
      problem: "Profiles that quietly stop posting without anyone noticing.",
      relatedFeatures: ["posting-reminders", "scheduled-crawls"],
      sources: ["https://socialmagix.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "posting-reminders",
      name: "Posting Reminders",
      summary: "Timezone-aware reminders so you never miss a posting window.",
      category: "monitoring",
      sources: ["https://socialmagix.com/"],
    },
    {
      slug: "csv-bulk-import",
      name: "CSV Bulk Import",
      summary: "Upload hundreds of profile URLs at once.",
      category: "monitoring",
      sources: ["https://socialmagix.com/"],
    },
    {
      slug: "multi-platform-analytics",
      name: "Multi-Platform Analytics",
      summary: "Trend lines, donut breakdowns and performance comparisons across all platforms.",
      category: "analytics-reporting",
      highlight: true,
      sources: ["https://socialmagix.com/"],
    },
    {
      slug: "automated-email-reports",
      name: "Automated Email Reports",
      summary: "Send branded performance reports to stakeholders daily, weekly or on demand.",
      category: "analytics-reporting",
      body: [
        "Social Magix can schedule branded performance reports and email them to stakeholders daily, weekly or on demand.",
        "Each report gives a snapshot of crawl activity, inactivity alerts and platform analytics, so recipients do not need to log in.",
      ],
      capabilities: [
        "Schedules reports daily, weekly or on demand.",
        "Delivers branded reports by email.",
        "Covers crawl activity, inactivity alerts and platform analytics.",
      ],
      relatedFeatures: ["multi-platform-analytics"],
      sources: ["https://socialmagix.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "role-based-access",
      name: "Role-Based Access",
      summary: "Five roles with granular permissions, multi-tenant isolation and organization-level data segregation.",
      category: "team-scale",
      body: [
        "Social Magix has five roles: SuperAdmin, Developer, Organization, PC/Crawler and Analyst. Each role has its own permissions.",
        "Multi-tenant isolation keeps each organization's data separate.",
      ],
      capabilities: [
        "Provides five role tiers with granular permissions.",
        "Isolates tenants from each other.",
        "Segregates data at the organization level.",
      ],
      relatedFeatures: ["distributed-crawlers"],
      sources: ["https://socialmagix.com/", "https://socialmagix.com/terms"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "distributed-crawlers",
      name: "Distributed Crawlers",
      summary: "Scale horizontally with a fleet of crawler nodes.",
      category: "team-scale",
      sources: ["https://socialmagix.com/"],
    },
  ],
  benefits: [
    { title: "Save hours weekly", description: "Automated crawls replace manual checking of each profile." },
    { title: "Never miss an alert", description: "Inactivity detection and posting reminders keep profiles active." },
    { title: "One tool, all platforms", description: "Eight social networks are monitored from one dashboard." },
    { title: "Team-ready permissions", description: "Five role tiers give each person the right level of access." },
  ],
  howItWorks: [
    { title: "Add profiles", description: "Paste social media URLs or bulk-import them via CSV. The platform is detected automatically." },
    { title: "Configure and schedule", description: "Set crawl frequency, inactivity thresholds and posting reminder timezones per profile." },
    { title: "Monitor and alert", description: "Distributed crawlers run on schedule. You get alerts for inactivity or failures." },
    { title: "Analyze and report", description: "Dashboards, CSV exports and automated email reports turn the data into action." },
  ],
  security: [
    { title: "Encryption", description: "The privacy policy states encryption in transit (TLS/SSL) and at rest for sensitive data." },
    { title: "Role-based access", description: "Role-based access control with multi-tenant isolation." },
    { title: "Audits and monitoring", description: "The privacy policy states regular security audits, penetration testing and monitoring for unauthorized access." },
  ],
  useCases: [
    { title: "Watching many brand profiles", description: "Track profiles across eight networks and get alerted when one goes quiet." },
    { title: "Keeping stakeholders informed", description: "Send scheduled email reports on crawl activity and platform analytics." },
    { title: "Hitting posting windows", description: "Use timezone-aware reminders to post on time." },
  ],
  faqs: [
    { question: "What is Social Magix?", answer: "Social Magix is a platform that monitors social media profiles. It runs scheduled crawls, sends inactivity alerts and shows analytics in one dashboard." },
    { question: "Which platforms does it support?", answer: "Facebook, Instagram, X (Twitter), LinkedIn, YouTube, Pinterest, Threads and Quora." },
    { question: "How often can crawls run?", answer: "One time, daily, weekly or monthly, set per profile, with automatic retry on failure." },
    { question: "Can I add many profiles at once?", answer: "Yes. You can upload hundreds of profile URLs at once with CSV bulk import." },
    { question: "What data does it collect?", answer: "Its privacy policy says crawlers collect publicly available data as directed by users, including profile information, post content, engagement metrics and posting activity." },
    { question: "Is there a free option?", answer: "The site states a free tier is available and no credit card is required." },
  ],
  sources: ["https://socialmagix.com/", "https://socialmagix.com/privacy", "https://socialmagix.com/terms", "https://admin.socialmagix.com/api/v1/packages"],
  lastVerified: "2026-10-10",
};
