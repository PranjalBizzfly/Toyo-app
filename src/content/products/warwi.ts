import type { Product } from "@/content/types";

const HOME = "https://warwi.com/";
const PLANS_API = "https://api.warwi.com/api/dashboard/plans?public=true";
const TERMS = "https://warwi.com/terms-of-service";
const PRIVACY = "https://warwi.com/privacy-policy";
const SIGNUP = "https://app.warwi.com/register";

/**
 * Warwi's site is JS-rendered. Copy is from the rendered home page, its public
 * plans API and the legal pages. Headline stats (10,000+ statuses, 500+ teams,
 * 99.9% uptime) and the named testimonials are not used, as they cannot be
 * verified. The "Internal" plan is an admin-only account type and is skipped.
 * Plan prices show a "$" on the page, but the terms say all payments are in INR.
 */
export const warwi: Product = {
  id: "warwi",
  slug: "warwi",
  name: "Warwi",
  shortDescription:
    "Schedule and auto-publish WhatsApp status updates for your whole team from one dashboard.",
  longDescription:
    "Warwi is a web platform that automates WhatsApp status updates for teams. You upload images, videos or text once, set a time and assign team members. Warwi then posts the status to each person's WhatsApp automatically.\n\nPosts can be one-time or recurring, daily, weekly or on custom intervals. Related statuses can be grouped into campaigns for launches, promotions or seasonal events.\n\nEvery posted status is logged with timestamps and delivery confirmations, and failed posts are retried automatically. Admins have full control, while team members see their own schedules in a portal. Every plan starts with a 14-day free trial, with no credit card required.",
  tagline: "Your WhatsApp Status, Fully Automated",
  category: "sales-marketing",
  subcategory: "marketing-planning",
  primaryUseCase: "WhatsApp status scheduling for teams",
  audience: ["Businesses and brands", "Marketing teams", "Agencies and freelancers", "Creators and entrepreneurs"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: {
    relationship: "pending",
    publicSale: "confirmed",
    notes: "Public pricing page and self-serve sign-up. Plan prices are shown with a $ sign but the terms state billing in INR.",
  },
  websiteUrl: HOME,
  appUrl: SIGNUP,
  accent: "#25D366",
  featureCategories: [
    { slug: "publishing", name: "Publishing", description: "Plan statuses once and let Warwi post them on time." },
    { slug: "team-and-tracking", name: "Team and tracking", description: "Manage who posts what and see what was delivered." },
  ],
  features: [
    {
      slug: "full-automation",
      name: "Full Automation",
      summary: "Scheduled statuses are posted automatically at the exact time you choose.",
      category: "publishing",
      body: [
        "Once a status is scheduled, Warwi posts it to each assigned team member's WhatsApp at the chosen time. No reminders or manual posting are needed.",
        "Team members do a one-time setup, which Warwi says takes about two minutes. After that they do not need to do anything for posting.",
      ],
      howItWorks: [
        "Upload the image, video or text for the status.",
        "Pick a time and assign team members.",
        "Warwi publishes the status to each member's WhatsApp when it is due.",
      ],
      capabilities: [
        "Posts scheduled statuses automatically at the set time.",
        "Publishes to every assigned team member's WhatsApp.",
        "Supports images, short videos and text statuses with an optional caption.",
      ],
      problem: "Team members forgetting to post, or posting the wrong content, when statuses are shared by hand.",
      benefits: ["Statuses go out on time without anyone remembering to post.", "Every assigned member posts the same content."],
      integrations: ["whatsapp"],
      faqs: [
        { question: "Do team members need to post anything themselves?", answer: "No. After a one-time setup of about two minutes, Warwi posts scheduled content to their WhatsApp automatically." },
        { question: "What can I post?", answer: "Images, short videos and text statuses, the same types WhatsApp Status supports, with an optional caption." },
      ],
      relatedFeatures: ["smart-scheduling", "reliable-delivery"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "smart-scheduling",
      name: "Smart Scheduling",
      summary: "Plan weeks ahead with one-time posts or recurring daily, weekly or custom schedules.",
      category: "publishing",
      body: [
        "Warwi lets you plan your status calendar weeks in advance. A post can run once or repeat daily, weekly or on a custom interval.",
        "Recurring statuses suit ongoing promotions, daily business updates and regular team announcements.",
      ],
      capabilities: [
        "Schedules one-time statuses.",
        "Repeats statuses daily, weekly or on custom intervals.",
        "Lets you plan content weeks in advance.",
      ],
      benefits: ["Regular updates do not need to be recreated each time."],
      faqs: [
        { question: "Can I schedule recurring statuses?", answer: "Yes. Statuses can repeat daily, weekly or on custom intervals." },
      ],
      relatedFeatures: ["full-automation", "campaign-management"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "campaign-management",
      name: "Campaign Management",
      summary: "Group related statuses into campaigns and track each campaign's performance.",
      category: "publishing",
      body: [
        "Related statuses can be grouped into a campaign, such as a product launch, a promotion or a seasonal event. Each campaign's performance can be tracked, which keeps messaging coordinated.",
        "Agencies can organise team members by client and run separate campaigns for each.",
      ],
      capabilities: [
        "Groups related statuses into campaigns.",
        "Tracks each campaign's performance.",
        "Lets agencies organise members by client with separate campaigns.",
      ],
      faqs: [
        { question: "Can I use Warwi for multiple clients?", answer: "Yes. You can organise team members by client, run separate campaigns and track performance independently from one dashboard." },
      ],
      relatedFeatures: ["smart-scheduling", "history-and-reporting"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "multi-user-management",
      name: "Multi-User Management",
      summary: "Add members, assign content and control who posts what, without sharing passwords.",
      category: "team-and-tracking",
      body: [
        "Warwi manages WhatsApp statuses for a whole team from one place. Admins add members, assign content and control who posts what, without sharing passwords.",
        "Access is split into Admin and Team Member roles. Team members can log in to a portal to see upcoming schedules and past posts.",
      ],
      capabilities: [
        "Adds team members to one account.",
        "Assigns a single status to as many members as you want.",
        "Separates Admin and Team Member roles.",
        "Gives team members a portal to see their schedules and past posts.",
      ],
      faqs: [
        { question: "How many team members can I add?", answer: "It depends on the plan. Gold supports up to 5, Platinum up to 20 and Diamond is unlimited." },
      ],
      relatedFeatures: ["full-automation", "history-and-reporting"],
      sources: [HOME, TERMS],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "history-and-reporting",
      name: "History & Reporting",
      summary: "Every posted status is logged with timestamps and delivery confirmations, with exportable reports.",
      category: "team-and-tracking",
      body: [
        "Warwi logs every posted status with a timestamp and delivery confirmation. You can review what was posted, when and by whom, and export reports.",
        "How long history is kept depends on the plan, from 7 days on the free trial to unlimited on Platinum and Diamond.",
      ],
      capabilities: [
        "Logs each posted status with a timestamp.",
        "Records delivery confirmations.",
        "Shows what was posted, when and by whom.",
        "Offers exportable reports.",
      ],
      relatedFeatures: ["reliable-delivery", "campaign-management"],
      sources: [HOME, PLANS_API],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "reliable-delivery",
      name: "Reliable Delivery",
      summary: "Built-in smart retry posts the status again automatically if a post fails.",
      category: "team-and-tracking",
      body: [
        "If a status fails to post, for example because of a temporary connection issue, Warwi retries it automatically several times. The outcome is shown in the dashboard, so you always know whether it was delivered.",
      ],
      capabilities: [
        "Retries failed posts automatically.",
        "Shows each delivery outcome in the dashboard.",
      ],
      faqs: [
        { question: "What happens if a status fails to post?", answer: "Warwi retries it automatically several times, and the status shows in your dashboard so you know the delivery outcome." },
      ],
      relatedFeatures: ["history-and-reporting", "full-automation"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
  ],
  benefits: [
    { title: "Save time", description: "Automate repetitive posting so your team can focus on strategy." },
    { title: "Reliable and consistent", description: "Statuses post on time, and smart retry covers failed attempts." },
    { title: "Scales with the team", description: "Warwi says it works from 5 to 500 team members." },
    { title: "One dashboard", description: "Manage content, schedules, delivery and team activity in one place." },
  ],
  howItWorks: [
    { title: "Create your account", description: "Sign up and open your dashboard. Admins get full control, and team members see only what they need." },
    { title: "Add your content", description: "Upload images, videos or text, and create it once for the whole team." },
    { title: "Schedule and assign", description: "Set a one-time or recurring schedule and assign it to team members." },
    { title: "Auto-publish", description: "At the set time, Warwi posts the status to each assigned member's WhatsApp." },
    { title: "Monitor", description: "Track delivery, view reports and measure campaign performance." },
  ],
  security: [
    { title: "No access to chats", description: "Warwi states it does not read personal chats, contacts or message history, and only uses the status feature." },
    { title: "Encryption", description: "Traffic uses TLS/SSL. Sensitive credentials are encrypted at rest with AES-256, according to the privacy policy." },
    { title: "Isolated sessions", description: "WhatsApp session data is stored in isolated, encrypted environments and is not shared across accounts." },
    { title: "Revocable connection", description: "You can revoke the WhatsApp connection at any time." },
  ],
  integrations: ["whatsapp"],
  useCases: [
    { title: "Businesses and brands", description: "Schedule product announcements, offers and company news across the whole team." },
    { title: "Marketing teams", description: "Plan status calendars, assign statuses to members and keep the brand consistent." },
    { title: "Agencies and freelancers", description: "Run several client campaigns from one dashboard." },
    { title: "Creators and entrepreneurs", description: "Keep several WhatsApp accounts updated for personal branding or side projects." },
  ],
  pricing: {
    currency: "INR",
    unit: "month",
    trial: "14-day free trial, no credit card required",
    note: "Prices are shown for your region on warwi.com. Taxes are extra.",
    asOf: "2026-10-10",
    sourceUrl: "https://warwi.com/pricing",
    plans: [
      { name: "Free Trial", price: "Free", period: "month", description: "Try Warwi for 14 days", features: ["2 employees", "10 statuses per day", "1 campaign", "Basic scheduling", "Email support", "7 days of status history"], cta: { label: "Start free trial", href: SIGNUP } },
      { name: "Gold", price: "See warwi.com", period: "month", description: "For small teams starting with automated status posting", features: ["5 employees", "50 statuses per day", "1 campaign", "Basic scheduling", "Email support", "30 days of status history"], cta: { label: "Get started", href: SIGNUP } },
      { name: "Platinum", price: "See warwi.com", period: "month", description: "Campaign tools, analytics and priority support for growing teams", features: ["20 employees", "200 statuses per day", "25 campaigns", "Campaign management", "Recurring schedules", "Analytics dashboard", "Team groups", "Unlimited history", "Priority support"], cta: { label: "Get started", href: SIGNUP }, recommended: true },
      { name: "Diamond", price: "See warwi.com", period: "month", description: "Unlimited capacity and a dedicated account manager for larger teams", features: ["Unlimited employees, statuses and campaigns", "Advanced automation", "Analytics dashboard", "Multi-brand support", "Custom workflows", "White-label option", "SLA guarantee", "Dedicated support"], cta: { label: "Get started", href: SIGNUP } },
    ],
  },
  faqs: [
    { question: "What does Warwi do?", answer: "Warwi schedules and automatically posts WhatsApp status updates for your whole team. You upload content, set a time and assign members, and Warwi publishes each status when it is due." },
    { question: "Is my WhatsApp account safe?", answer: "Warwi states it does not access personal messages, contacts or chats, only the status feature. It says data is encrypted and WhatsApp credentials are not stored." },
    { question: "Can I post one status for many people?", answer: "Yes. Create one status and assign it to as many members as you want. Each one posts it at the scheduled time." },
    { question: "Is there a free trial?", answer: "Yes. Every plan has a 14-day free trial with no credit card required." },
    { question: "How is billing handled?", answer: "Plans are billed monthly in advance through a third-party payment provider. Upgrades are prorated and downgrades apply from the next cycle." },
  ],
  sources: [HOME, PLANS_API, PRIVACY, TERMS, "https://warwi.com/refund-policy", SIGNUP],
  lastVerified: "2026-10-10",
};
