import type { Product } from "@/content/types";

/**
 * Fantom's public copy is read from its landing-content API. Its stats,
 * testimonials, contact details and plan prices look like placeholder/test
 * data and are deliberately not used (see the source map).
 */
export const fantom: Product = {
  id: "fantom",
  slug: "fantom",
  name: "Fantom",
  shortDescription:
    "Manage every company SIM card in one place — recharges, call logs and messaging-app status for the whole inventory.",
  longDescription:
    "Fantom is a cloud platform for businesses that issue SIM cards to staff. Its site brands it SIM Manager. It brings the whole SIM inventory, recharges, call logs and messaging-app status into one dashboard.\n\nEach SIM is recorded with its operator, circle, status and assignee. Fantom reminds you before recharges expire, keeps the recharge history with analytics, and alerts you about due dates, inactive SIMs and subscription expiry by email or SMS.\n\nAn Android app installed on company phones syncs call logs automatically after OTP verification, and the dashboard analyses call patterns, durations and contact frequency. Fantom also shows which SIMs have WhatsApp or Telegram active and when they were last used.\n\nAdmins manage everything while users sync call logs, under role-based access control with JWT authentication and encrypted data. Every plan starts with a 14-day free trial and no credit card.",
  tagline: "Manage All Your SIM Cards in One Place",
  category: "operations-it",
  subcategory: "telecom-devices",
  primaryUseCase: "Company SIM-card management",
  audience: ["Operations managers", "IT administrators", "Business owners"],
  platforms: ["web", "android"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://fantomapps.com/",
  appUrl: "https://fantomapps.com/register",
  // Fantom's site is short. Pages exist only where the home page gives enough
  // stated detail; plan-table items (WiFi Monitor, SMS Logs, CCTV, Call Automation)
  // are named without any description and get no page.
  featureCategories: [
    { slug: "features", name: "Features", description: "Features designed to simplify SIM management for businesses of all sizes." },
    { slug: "messaging-apps", name: "Messaging apps", description: "Monitor WhatsApp and Telegram status for your managed SIMs." },
  ],
  features: [
    {
      slug: "sim-management",
      name: "SIM Management",
      summary: "All your SIM cards in one place, with operators, circles, status and assignments tracked.",
      category: "features",
      body: [
        "Fantom keeps a company's whole SIM inventory in one cloud dashboard. Each SIM carries its operator, circle, status and the person it is assigned to.",
        "SIMs can be imported or added by hand when you set up, and each plan sets how many SIMs the account can manage.",
      ],
      howItWorks: [
        "Create your company account.",
        "Import your SIM cards or add them manually.",
        "Monitor every SIM from the dashboard.",
      ],
      capabilities: [
      "Keeps the company's whole SIM inventory in one cloud dashboard.",
      "Records each SIM's telecom operator and circle.",
      "Tracks each SIM's status, so inactive numbers stand out.",
      "Records who each SIM is assigned to.",
      "Lets you import SIMs in bulk or add them one by one.",
      "Exports data to Excel, which is listed on every plan."
    ],
      problem: "Company SIMs tracked in scattered spreadsheets, with no clear view of which number is with whom or on which operator.",
    benefits: [
      "Anyone with access can see every company number and its holder in one place.",
      "Status tracking feeds the inactive-SIM alerts, so dormant numbers are noticed."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    faqs: [
      {
        "question": "How do I get my SIMs into Fantom?",
        "answer": "After creating your account you can import your SIM cards or add them manually, then monitor them from the dashboard."
      },
      {
        "question": "What is recorded for each SIM?",
        "answer": "Its operator, circle, status and the person it is assigned to."
      }
    ],
    relatedFeatures: ["recharge-tracking", "smart-notifications", "multi-user-access"],
      sources: ["https://fantomapps.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "recharge-tracking",
      name: "Recharge Tracking",
      summary: "Reminders before expiry and a full recharge history with analytics.",
      category: "features",
      body: [
        "Recharge tracking is meant to stop company numbers lapsing. Fantom reminds you before a recharge expires and keeps the full recharge history for each SIM, with analytics on top.",
      ],
      capabilities: [
      "Sends reminders before a SIM's recharge expires.",
      "Keeps the full recharge history for each SIM.",
      "Adds detailed analytics on top of the recharge history.",
      "Raises automated alerts for recharge due dates through Smart Notifications."
    ],
      problem: "Company numbers lapsing because nobody noticed a recharge was due.",
    howItWorks: [
      "Add your SIMs to Fantom.",
      "Fantom tracks each SIM's recharges and their expiry.",
      "You get a reminder before a recharge expires.",
      "Review past recharges and their analytics from the dashboard."
    ],
    benefits: [
      "Recharges are renewed before numbers go out of service.",
      "The recharge history shows what has been spent on each SIM."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    faqs: [
      {
        "question": "Will Fantom remind me before a recharge runs out?",
        "answer": "Yes. Fantom sends reminders before expiry and automated alerts for recharge due dates."
      }
    ],
    relatedFeatures: ["smart-notifications", "sim-management"],
      sources: ["https://fantomapps.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "call-log-analytics",
      name: "Call Log Analytics",
      summary: "Call logs synced from mobile devices, with call patterns, durations and contact frequency.",
      category: "features",
      body: [
        "Fantom syncs call logs from the mobile devices that use your company SIMs into the dashboard, so calls across the business can be reviewed in one place.",
        "Users install Fantom's mobile app and sync call logs through it; the dashboard then analyses call patterns, durations and how often each contact is called.",
      ],
      howItWorks: [
      "Add the SIMs you manage.",
      "Install the Android app on the company phones.",
      "Verify the number with an OTP and grant call log permission.",
      "The app syncs call logs to the dashboard automatically.",
      "Review call patterns, durations and contact frequency from the dashboard."
    ],
      capabilities: [
      "Syncs call logs automatically from registered Android devices to the dashboard.",
      "Analyses call patterns across the synced numbers.",
      "Reports call durations.",
      "Shows how often each contact is called.",
      "Lists SMS Logs and Call Log Sync as plan features."
    ],
      problem: "Calls made on company SIMs that management cannot see or review in one place.",
    benefits: [
      "Calls across all company phones are visible in one dashboard.",
      "Duration and frequency data show how each number is actually used."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    faqs: [
      {
        "question": "How does call log sync work?",
        "answer": "Install Fantom's Android app on the phone, verify the number by OTP and grant call log permission. The app then syncs call logs from that device to your dashboard automatically."
      },
      {
        "question": "Is there an iPhone app?",
        "answer": "Fantom only mentions an Android app for call log sync."
      }
    ],
    relatedFeatures: ["multi-user-access", "sim-management"],
      sources: ["https://fantomapps.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "smart-notifications",
      name: "Smart Notifications",
      summary: "Automated alerts for recharge due dates, inactive SIMs and subscription expiry.",
      category: "features",
      body: [
        "Fantom sends automated alerts so the team hears about problems before they cause a lapse: recharges coming due, SIMs that have gone inactive and subscriptions that are about to expire.",
        "Fantom's plans list both email and SMS notifications.",
      ],
      capabilities: [
      "Alerts you when a SIM's recharge is coming due.",
      "Alerts you when a SIM has gone inactive.",
      "Alerts you before a subscription expires.",
      "Alerts you when a SIM's WhatsApp status changes.",
      "Delivers notifications by email and by SMS, both listed on every plan."
    ],
      howItWorks: [
      "Fantom watches recharge dates, SIM activity and subscription expiry.",
      "When one needs attention, it raises an automated alert.",
      "The alert reaches the team by email or SMS."
    ],
    benefits: [
      "Problems surface before a number lapses or a subscription runs out.",
      "Nobody has to check the dashboard daily to catch due dates."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    faqs: [
      {
        "question": "What does Fantom alert me about?",
        "answer": "Recharge due dates, inactive SIMs, subscription expiry and changes in a SIM's WhatsApp status."
      },
      {
        "question": "How are notifications delivered?",
        "answer": "Fantom's plans list both email notifications and SMS notifications."
      }
    ],
    relatedFeatures: ["recharge-tracking", "whatsapp-status-tracking"],
      sources: ["https://fantomapps.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "multi-user-access",
      name: "Multi-User Access",
      summary: "Role-based access: admins manage everything, users sync call logs via the mobile app.",
      category: "features",
      body: [
        "Fantom splits access by role. Admins manage everything in the dashboard, while users are the people who sync call logs from their phones through the mobile app.",
        "Each plan sets how many users an account can have.",
      ],
      capabilities: [
      "Gives admins control of everything in the dashboard.",
      "Lets users sync call logs from their phones through the mobile app.",
      "Applies role-based access control to what each person can do.",
      "Sets the number of users an account can have by plan."
    ],
      howItWorks: [
      "The admin creates the company account and adds SIMs.",
      "Staff are added as users.",
      "Users install the mobile app and sync their call logs.",
      "Admins manage SIMs, recharges and reports from the dashboard."
    ],
    benefits: [
      "Staff only handle call log sync, while admins keep control of the inventory.",
      "Several people can share one company account."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    faqs: [
      {
        "question": "What can a user do compared with an admin?",
        "answer": "Admins manage everything. Users sync call logs through the mobile app."
      }
    ],
    relatedFeatures: ["call-log-analytics", "secure-and-reliable"],
      sources: ["https://fantomapps.com/"],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "secure-and-reliable",
      name: "Secure & Reliable",
      summary: "JWT authentication, industry-standard encryption, role-based access control and cloud storage with regular backups.",
      category: "features",
      highlight: true,
      hasPage: true,
      body: [
        "Fantom describes its security as enterprise-grade. Sign-in uses JWT authentication, data is encrypted with industry-standard encryption, and role-based access control limits what each person can do.",
        "Data is stored in the cloud with regular backups, and the site states 256-bit SSL.",
      ],
      capabilities: [
        "Authenticates access with JWT (JSON Web Tokens).",
        "Encrypts data using industry-standard encryption.",
        "Applies role-based access control, separating admins from users.",
        "Stores data in the cloud with regular backups.",
        "Serves the site over 256-bit SSL.",
      ],
      audience: ["IT administrators", "Business owners"],
      faqs: [
        { question: "Is my data secure?", answer: "Fantom states that it uses industry-standard encryption, JWT authentication and role-based access control, and that data is stored in the cloud with regular backups." },
      ],
      relatedFeatures: ["multi-user-access", "sim-management"],
      sources: ["https://fantomapps.com/", "https://api.fantomapps.com/api/landing-content/public"],
    },
    {
      slug: "whatsapp-status-tracking",
      name: "WhatsApp status tracking",
      summary: "See which SIMs have WhatsApp active, their last active time, with alerts on status changes and bulk status updates.",
      category: "messaging-apps",
      body: [
        "For businesses that use company numbers on WhatsApp, Fantom shows which managed SIMs have WhatsApp active and when each was last active, and alerts you when that status changes.",
      ],
      capabilities: [
      "Shows which managed SIMs have WhatsApp active.",
      "Monitors when WhatsApp was last active on each SIM.",
      "Sends an alert when a SIM's WhatsApp status changes.",
      "Supports bulk status updates across many SIMs at once."
    ],
      integrations: ["whatsapp"],
      howItWorks: [
      "Add the SIMs you manage to Fantom.",
      "Fantom tracks WhatsApp status and last active time for each SIM.",
      "You are alerted when a status changes.",
      "Update statuses in bulk when needed."
    ],
    benefits: [
      "You can see which company numbers are live on WhatsApp without checking each phone.",
      "Status-change alerts flag numbers that drop off WhatsApp."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    faqs: [
      {
        "question": "Can I track WhatsApp status on company SIMs?",
        "answer": "Yes. Fantom shows which SIMs have WhatsApp active and their last active time, and alerts you when status changes."
      }
    ],
    relatedFeatures: ["telegram-status-tracking", "smart-notifications"],
      sources: ["https://fantomapps.com/"],
      hasPage: true,
    },
    {
      slug: "telegram-status-tracking",
      name: "Telegram status tracking",
      summary: "Telegram activation status and last active time across all SIMs, with bulk status updates.",
      category: "messaging-apps",
      body: [
        "Fantom tracks whether Telegram is activated on each managed SIM and keeps track of messaging activity, so Telegram use across company numbers can be seen in one place.",
      ],
      capabilities: [
      "Monitors whether Telegram is activated on each managed SIM.",
      "Tracks the last active time for Telegram on each SIM.",
      "Keeps track of messaging activity across all SIMs.",
      "Supports bulk status updates."
    ],
      integrations: ["telegram"],
      howItWorks: [
      "Add the SIMs you manage.",
      "Fantom monitors Telegram activation and last active time per SIM.",
      "Update statuses in bulk across your SIMs."
    ],
    benefits: [
      "Telegram use across company numbers is visible in one place."
    ],
    audience: [
      "Operations managers",
      "IT administrators",
      "Business owners"
    ],
    relatedFeatures: ["whatsapp-status-tracking"],
      sources: ["https://fantomapps.com/"],
      hasPage: true,
    },
  ],
  benefits: [
    { title: "No more lapsed numbers", description: "Reminders before expiry and alerts for recharge due dates keep company SIMs in service. The recharge history shows what each number has cost." },
    { title: "One inventory for every SIM", description: "Operator, circle, status and assignee are recorded for each SIM in one dashboard, instead of a spreadsheet nobody updates." },
    { title: "Calls visible across the company", description: "The Android app syncs call logs from each phone automatically. The dashboard then shows call patterns, durations and contact frequency." },
    { title: "Messaging status at a glance", description: "See which numbers have WhatsApp or Telegram active and when they were last used, with alerts when WhatsApp status changes." },
  ],
  security: [
    { title: "JWT authentication", description: "Fantom states that access is secured with JWT (JSON Web Token) authentication." },
    { title: "Encrypted data", description: "Fantom states that it uses industry-standard encryption for data." },
    { title: "Role-based permissions", description: "Admins manage everything; users are limited to syncing call logs via the mobile app." },
    { title: "SSL", description: "Fantom's site states 256-bit SSL." },
    { title: "Cloud storage with backups", description: "Fantom states that data is stored securely in the cloud with regular backups." },
  ],
  howItWorks: [
    { title: "Sign up", description: "Create your company account and start the 14-day free trial, with no credit card required." },
    { title: "Add SIMs", description: "Import your SIM cards or add them manually, with operator, circle and assignee." },
    { title: "Install app", description: "Install the Android app on company phones, verify each number by OTP and grant call log permission." },
    { title: "Track & manage", description: "Follow recharges, call logs and WhatsApp and Telegram status from the dashboard, with alerts by email or SMS." },
  ],
  integrations: ["whatsapp", "telegram"],
  useCases: [
    { title: "Teams issued company SIMs", description: "Keep every number, its recharge status and its call logs in one dashboard." },
    { title: "Messaging-heavy operations", description: "Track WhatsApp and Telegram status across company numbers." },
    { title: "Preventing recharge lapses", description: "Get reminders before recharges expire and alerts for due dates, so numbers used for business stay active." },
    { title: "Reviewing staff calling activity", description: "Sync call logs from company phones and review call patterns, durations and contact frequency in one dashboard." },
  ],
  faqs: [
    { question: "What is Fantom?", answer: "Fantom (branded SIM Manager on its site) is a cloud platform for businesses to manage their SIM cards. It tracks recharges, syncs call logs and monitors WhatsApp and Telegram status in one place." },
    { question: "How are call logs collected?", answer: "Through Fantom's Android app. You install it on the company phone, verify the number by OTP and grant call log permission. Call logs then sync to the dashboard automatically." },
    { question: "Is my data secure?", answer: "Fantom states that it uses industry-standard encryption, JWT authentication and role-based access control. Data is stored in the cloud with regular backups." },
    { question: "Can I track WhatsApp and Telegram status?", answer: "Yes. Fantom shows which SIMs have WhatsApp or Telegram active and their last active time, supports bulk status updates, and alerts you when WhatsApp status changes." },
    { question: "Is there a free trial?", answer: "Yes. Every plan comes with a 14-day free trial, and no credit card is required to start." },
    { question: "How can I pay?", answer: "Payments go through Razorpay, which accepts credit and debit cards, UPI, net banking and wallets." },
    { question: "Can I export my data?", answer: "Yes. Excel export is listed on Fantom's plans." },
    { question: "Can I cancel?", answer: "Fantom's pricing section says you can cancel at any time, with monthly and yearly billing available." },
  ],
  solutions: ["run-a-well-organised-office"],
  sources: ["https://fantomapps.com/", "https://api.fantomapps.com/api/landing-content/public"],
  lastVerified: "2026-10-08",
};
