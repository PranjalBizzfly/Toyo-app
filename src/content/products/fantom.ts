import type { Product } from "@/content/types";

/**
 * Fantom's public copy is read from its landing-content API. Its stats,
 * testimonials, contact details and plan prices look like placeholder/test
 * data and are deliberately not used (see the source map).
 */
const FANTOM_LANDING = "https://api.fantomapps.com/api/landing-content/public";
const FANTOM_COMPARE = "https://api.fantomapps.com/api/subscriptions/compare";

export const fantom: Product = {
  id: "fantom",
  slug: "fantom",
  name: "Fantom",
  shortDescription:
    "Manage every company SIM card in one place: recharges, call logs and messaging-app status for the whole inventory.",
  longDescription:
    "Fantom is a cloud platform for businesses that issue SIM cards to staff. Its site brands it SIM Manager. It brings the whole SIM inventory, recharges, call logs and messaging-app status into one dashboard.\n\nEach SIM is recorded with its operator, circle (telecom service region), status and assignee. Fantom reminds you before recharges expire, keeps the recharge history with analytics, and alerts you about due dates, inactive SIMs and subscription expiry by email or SMS.\n\nAn Android app installed on company phones syncs call logs automatically once the number is verified with a one-time password (OTP), and the dashboard analyses call patterns, durations and contact frequency. Fantom also shows which SIMs have WhatsApp or Telegram active and when they were last used.\n\nAdmins manage everything while users sync call logs, with access set by role, secure JWT sign-in and encrypted data. Every plan starts with a 14-day free trial and no credit card.",
  tagline: "Manage All Your SIM Cards in One Place",
  category: "operations-and-it",
  subcategory: "telecom-devices",
  primaryUseCase: "Company SIM-card management",
  audience: ["Operations managers", "IT administrators", "Business owners"],
  platforms: ["web", "android"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://fantomapps.com/",
  appUrl: "https://fantomapps.com/register",
  // Fantom's site is short. Documented pages use the home page's stated detail;
  // plan-table items (WiFi Monitor, SMS Logs, CCTV, Call Automation and others) are
  // named without description, so their pages are marked as listed only.
  featureCategories: [
    {
      slug: "features",
      name: "Features",
      description: "Tools that make managing SIM cards easier for businesses of any size.",
      body: [
        "Fantom groups its core tools under one heading: tools that make managing SIM cards easier for businesses of any size. They cover the SIM inventory, recharges, call logs, alerts, user access and security.",
        "This group also includes the items Fantom's plan comparison names, such as CCTV Monitoring, WiFi Monitor, SMS Logs and API Access. Those pages state only what the plan table confirms.",
      ],
    },
    { slug: "messaging-apps", name: "Messaging apps", description: "Monitor WhatsApp and Telegram status for your managed SIMs." },
  ],
  features: [
    {
      slug: "sim-management",
      name: "SIM Management",
      summary: "All your SIM cards in one place, with operators, circles, status and assignments tracked.",
      category: "features",
      body: [
        "Fantom keeps a company's whole SIM inventory in one cloud dashboard. Each SIM carries its operator, circle (the telecom service region), status and the person it is assigned to.",
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
      "Status tracking drives the inactive-SIM alerts, so unused numbers get noticed."
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
      "Sends automatic alerts for recharge due dates through Smart Notifications."
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
        "answer": "Yes. Fantom sends reminders before expiry and automatic alerts for recharge due dates."
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
      "Verify the number with an OTP (one-time password) and allow access to call logs.",
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
        "answer": "Install Fantom's Android app on the phone, verify the number with a one-time password (OTP) and allow access to call logs. The app then syncs call logs from that device to your dashboard automatically."
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
      summary: "Automatic alerts for recharge due dates, inactive SIMs and subscription expiry.",
      category: "features",
      body: [
        "Fantom sends automatic alerts so the team hears about problems before a number lapses: recharges coming due, SIMs that have gone inactive and subscriptions that are about to expire.",
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
      "When one needs attention, it sends an automatic alert.",
      "The alert reaches the team by email or SMS."
    ],
    benefits: [
      "Problems show up before a number lapses or a subscription runs out.",
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
      "Controls what each person can do based on their role.",
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
      summary: "Secure JWT sign-in, industry-standard encryption, access set by role and cloud storage with regular backups.",
      category: "features",
      highlight: true,
      hasPage: true,
      body: [
        "Fantom describes its security as enterprise-grade. Sign-in uses JWT authentication (secure login tokens), data is protected with industry-standard encryption, and each person's role limits what they can do.",
        "Data is stored in the cloud with regular backups, and the site states 256-bit SSL (an encrypted connection between your browser and the site).",
      ],
      capabilities: [
        "Authenticates access with JWT (JSON Web Tokens).",
        "Encrypts data using industry-standard encryption.",
        "Uses role-based access, keeping admins and users separate.",
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
      summary: "See which SIMs have WhatsApp active and when they were last used, with alerts when status changes and bulk status updates.",
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
      summary: "See whether Telegram is active on each SIM and when it was last used, with bulk status updates.",
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
    {
      slug: "advanced-reports",
      name: "Advanced Reports",
      summary: "Advanced reports, listed on the Gold and Enterprise plans but not on the Starter trial.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "Advanced reporting goes beyond the standard dashboard views, giving managers deeper summaries of the data a tool already holds, such as usage across many SIMs or users.",
        "Fantom's plan comparison lists Advanced Reports on the Gold and Enterprise plans. It is not included on the 14-day Starter trial, although basic reports are.",
      ],
      capabilities: ["Listed on Gold and Enterprise.", "Not included on the Starter trial."],
      relatedFeatures: ["call-log-analytics", "excel-export"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "sim-import",
      name: "SIM import",
      summary: "Bring existing SIM cards into Fantom by importing them or adding them by hand.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "Importing records lets a business move an existing list, such as a spreadsheet of company numbers, into a new tool in one go instead of retyping each entry.",
        "Fantom names \"Add SIMs\" as the second step of its setup: \"Import or manually add your SIM cards\". Each plan sets how many SIMs an account can hold.",
      ],
      capabilities: ["SIMs can be imported or added manually.", "The number of SIMs is limited by plan."],
      relatedFeatures: ["sim-management", "excel-export"],
      sources: [FANTOM_LANDING, FANTOM_COMPARE],
    },
    {
      slug: "cctv-monitoring",
      name: "CCTV Monitoring",
      summary: "CCTV monitoring, listed on every plan with camera and snapshot limits set by plan.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "CCTV monitoring connects security cameras to a dashboard so footage or snapshots from a site can be checked remotely, without someone watching each camera in person.",
        "Fantom's plan comparison lists CCTV Monitoring on every plan. Starter and Gold allow up to 5 cameras with snapshots kept for 30 days; Enterprise allows up to 50 cameras with snapshots kept for 365 days.",
      ],
      capabilities: ["Starter and Gold: up to 5 cameras, 30 days of snapshots.", "Enterprise: up to 50 cameras, 365 days of snapshots."],
      relatedFeatures: ["wifi-monitor"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "wifi-monitor",
      name: "WiFi Monitor",
      summary: "WiFi monitoring, listed on every Fantom plan.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "WiFi monitoring keeps an eye on wireless networks or the devices connected to them, so an administrator can see connection status without visiting each location.",
        "Fantom's plan comparison lists WiFi Monitor on the Starter, Gold and Enterprise plans. Fantom publishes no further detail on what it monitors.",
      ],
      capabilities: ["Listed on Starter, Gold and Enterprise."],
      relatedFeatures: ["cctv-monitoring"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "call-automation",
      name: "Call Automation",
      summary: "Call automation, listed on every Fantom plan.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "Call automation handles routine calling tasks by rule rather than by hand, which saves time for teams that make or manage many calls on company numbers.",
        "Fantom's plan comparison lists Call Automation on the Starter, Gold and Enterprise plans. Fantom publishes no further detail on how it works.",
      ],
      capabilities: ["Listed on Starter, Gold and Enterprise."],
      relatedFeatures: ["call-log-analytics", "sms-logs"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "sms-logs",
      name: "SMS Logs",
      summary: "SMS logs, listed on every Fantom plan alongside call log sync.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "An SMS log is a record of text messages sent and received on a number. For company SIMs it gives managers a record of messaging activity alongside calls.",
        "Fantom's plan comparison lists SMS Logs on the Starter, Gold and Enterprise plans, next to Call Log Sync.",
      ],
      capabilities: ["Listed on Starter, Gold and Enterprise."],
      relatedFeatures: ["call-log-analytics", "call-automation"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "excel-export",
      name: "Excel Export",
      summary: "Export Fantom data to Excel, listed on every plan.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "Exporting to Excel lets a team take data out of a tool for its own spreadsheets, audits or reports to people who do not use the tool.",
        "Fantom's plan comparison lists Excel Export on the Starter, Gold and Enterprise plans.",
      ],
      capabilities: ["Listed on Starter, Gold and Enterprise."],
      relatedFeatures: ["sim-management", "advanced-reports"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "api-access",
      name: "API Access",
      summary: "API access, listed on the Gold and Enterprise plans.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "API access lets a company's own systems read or send data to a tool programmatically, so information can flow between systems without manual copying.",
        "Fantom's plan comparison lists API Access on the Gold and Enterprise plans. It is not included on the Starter trial.",
      ],
      capabilities: ["Listed on Gold and Enterprise.", "Not included on the Starter trial."],
      relatedFeatures: ["excel-export"],
      sources: [FANTOM_COMPARE],
    },
    {
      slug: "priority-support",
      name: "Priority Support",
      summary: "Priority support, listed on the Gold and Enterprise plans.",
      category: "features",
      evidence: "listed",
      hasPage: true,
      body: [
        "Priority support means a customer's requests are handled ahead of the general queue, which matters when a business depends on a tool day to day.",
        "Fantom's plan comparison lists Priority Support on the Gold and Enterprise plans. It is not included on the Starter trial.",
      ],
      capabilities: ["Listed on Gold and Enterprise.", "Not included on the Starter trial."],
      relatedFeatures: ["secure-and-reliable"],
      sources: [FANTOM_COMPARE],
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
    { title: "Install app", description: "Install the Android app on company phones, verify each number with a one-time password (OTP) and allow access to call logs." },
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
    { question: "How are call logs collected?", answer: "Through Fantom's Android app. You install it on the company phone, verify the number with a one-time password (OTP) and allow access to call logs. Call logs then sync to the dashboard automatically." },
    { question: "Is my data secure?", answer: "Fantom states that it uses industry-standard encryption, JWT authentication and role-based access control. Data is stored in the cloud with regular backups." },
    { question: "Can I track WhatsApp and Telegram status?", answer: "Yes. Fantom shows which SIMs have WhatsApp or Telegram active and their last active time, supports bulk status updates, and alerts you when WhatsApp status changes." },
    { question: "Is there a free trial?", answer: "Yes. Every plan comes with a 14-day free trial, and no credit card is required to start." },
    { question: "How can I pay?", answer: "Payments go through Razorpay, which accepts credit and debit cards, UPI, net banking and wallets." },
    { question: "Can I export my data?", answer: "Yes. Excel export is listed on Fantom's plans." },
    { question: "Can I cancel?", answer: "Fantom's pricing section says you can cancel at any time, with monthly and yearly billing available." },
  ],
  supportTopics: [
    {
      slug: "getting-started-with-fantom",
      name: "Getting started with Fantom",
      summary: "The four steps from sign-up to tracking your SIMs, starting with a 14-day free trial.",
      body: [
        "Fantom describes setup as a simple four-step process. Every plan starts with a 14-day free trial, and no credit card is required to start.",
      ],
      steps: [
        "Sign up: create your company account and choose a plan.",
        "Add SIMs: import your SIM cards or add them manually.",
        "Install the app: download the Android app on company phones for call log sync.",
        "Track and manage: monitor recharges, call logs and messaging status from the dashboard.",
      ],
      keyPoints: [
        "The Starter plan is a free 14-day trial.",
        "Each plan sets limits on SIMs, users and recharges.",
      ],
      links: [{ label: "Start free trial", href: "https://fantomapps.com/register" }],
      features: ["sim-import", "sim-management", "call-log-analytics"],
      sources: [FANTOM_LANDING, FANTOM_COMPARE, "https://fantomapps.com/register"],
    },
    {
      slug: "creating-your-account-and-resetting-your-password",
      name: "Creating your account and resetting your password",
      summary: "The details Fantom asks for at registration, its password rules and how to reset a password by OTP.",
      body: [
        "Registering creates the company account on the plan you selected. A forgotten password is reset with a verification code sent to the admin email.",
      ],
      steps: [
        "Choose a plan on the registration page, monthly or yearly.",
        "Enter your full name (2 to 50 characters), email ID and company name (2 to 100 characters).",
        "Optionally add a contact number and company address.",
        "Set a password and confirm it, then register.",
        "To reset a password, select \"Forgot Password?\", enter your admin email and select \"Send OTP\".",
      ],
      keyPoints: [
        "Passwords must be 8 to 15 characters with an uppercase letter, a lowercase letter, a number and a special character.",
        "Fantom's terms make you responsible for keeping your account credentials secure and for all activity under your account.",
      ],
      links: [
        { label: "Register", href: "https://fantomapps.com/register" },
        { label: "Forgot password", href: "https://fantomapps.com/forgot-password" },
      ],
      sources: ["https://fantomapps.com/register", "https://fantomapps.com/forgot-password", "https://fantomapps.com/terms-of-service"],
    },
    {
      slug: "setting-up-the-android-app-for-call-log-sync",
      name: "Setting up the Android app for call-log sync",
      summary: "How to install Fantom's Android app on a company phone so its call logs sync to the dashboard.",
      body: [
        "Call logs reach Fantom through its Android app, which syncs them automatically from registered devices to the dashboard. Users sync call logs through the app, while admins manage everything else.",
      ],
      steps: [
        "Install Fantom's Android app on the company phone.",
        "Verify the phone number with the one-time password (OTP).",
        "Grant the app permission to read call logs.",
        "Call logs then sync to the dashboard automatically.",
      ],
      keyPoints: [
        "Fantom only mentions an Android app.",
        "Call Log Sync is listed on every plan.",
      ],
      features: ["call-log-analytics", "multi-user-access"],
      sources: [FANTOM_LANDING, FANTOM_COMPARE],
    },
    {
      slug: "plans-payments-and-renewals",
      name: "Plans, payments and renewals",
      summary: "How Fantom bills: payment methods, billing cycles and what its terms say about fees.",
      body: [
        "Fantom runs on a subscription. You need an active subscription to use the service, and payments go through Razorpay.",
      ],
      keyPoints: [
        "Accepted methods: credit and debit cards, UPI, net banking and wallets, through Razorpay.",
        "Paid plans bill on a 28-day monthly cycle or a 336-day yearly cycle.",
        "The Starter plan is a 14-day free trial with no credit card required.",
        "Subscription fees are non-refundable except as stated in the terms.",
        "You agree to give accurate billing information and to tell Fantom when it changes.",
      ],
      sources: [FANTOM_LANDING, FANTOM_COMPARE, "https://fantomapps.com/terms-of-service"],
    },
    {
      slug: "your-data-and-privacy",
      name: "Your data and privacy",
      summary: "What personal data Fantom's privacy policy says it collects and how it uses it.",
      body: [
        "Fantom's privacy policy (last updated 17 June 2026) groups the personal data it collects into four categories and lists the purposes it uses that data for.",
        "It states that appropriate security measures are in place to prevent personal data from being lost, used or accessed without authorisation, altered or disclosed.",
      ],
      keyPoints: [
        "Identity data: first name, last name, username or similar identifier.",
        "Contact data: email ID and telephone numbers.",
        "Technical data: IP address, browser type and version, time zone setting and location.",
        "Usage data: how you use the website and services.",
      ],
      steps: [
        "To provide and maintain the service.",
        "To notify you about changes to the service.",
        "To provide customer support.",
        "To analyse and improve the service, and to monitor its usage.",
      ],
      links: [{ label: "Privacy policy", href: "https://fantomapps.com/privacy-policy" }],
      sources: ["https://fantomapps.com/privacy-policy", "https://api.fantomapps.com/api/pages/privacy-policy"],
    },
  ],
  solutions: ["run-a-well-organised-office"],
  sources: ["https://fantomapps.com/", "https://api.fantomapps.com/api/landing-content/public"],
  lastVerified: "2026-10-08",
};
