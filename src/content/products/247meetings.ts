import type { Product } from "@/content/types";

/**
 * 247Meetings' public site is a sign-in screen plus Terms and Privacy pages.
 * Everything here comes from the sign-in and register screens and the two
 * legal pages. No pricing, plans or customer numbers are published.
 */
const SITE = "https://247meetings.com";

export const meetings247: Product = {
  id: "247meetings",
  slug: "247meetings",
  name: "247Meetings",
  shortDescription:
    "An AI sales assistant that sends outreach from your own Google account, sorts the replies and books discovery calls on your calendar.",
  longDescription:
    "247Meetings is an AI sales assistant. Its site calls it your AI SDR (sales development rep), named Nova. It runs personalised email outreach from your own Gmail or Google Workspace account.\n\n" +
    "Nova reads replies and classifies them, for example as interested, out of office, unsubscribe or bounce. People who ask to opt out stop getting messages. When a lead is ready, it books a discovery call on your Google Calendar and checks your free and busy times so slots do not clash.\n\n" +
    "You create a workspace, connect a mailbox, and Nova starts writing, sending, replying and booking, around the clock. Messages are drafted and replies classified with OpenAI's API, and 247Meetings states that its AI provider may not train on your data.",
  tagline: "Book discovery calls while you sleep.",
  category: "sales-marketing",
  primaryUseCase: "AI email outreach and meeting booking",
  platforms: ["web"],
  status: "pending",
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes:
      "Public site is only a sign-in screen and legal pages. No pricing or plans published. Terms mention fees only if a plan includes them.",
  },
  accent: "#8B83FF",
  websiteUrl: `${SITE}/`,
  appUrl: `${SITE}/register`,
  integrations: ["google-workspace"],
  featureCategories: [
    { slug: "outreach", name: "Outreach", description: "Personalised email campaigns sent from your own Google account." },
    { slug: "replies-booking", name: "Replies and booking", description: "Reply handling and meetings booked on your calendar." },
  ],
  features: [
    {
      slug: "email-outreach",
      name: "Email outreach from your Google account",
      summary: "Personalised outreach sent from your own connected Gmail or Google Workspace mailbox.",
      category: "outreach",
      body: [
        "247Meetings runs email campaigns from your own connected Gmail or Google Workspace account. It sends the outreach and reply messages you compose or approve.",
        "You import your leads and contacts and set up campaigns and sequences. Messages are drafted with AI.",
      ],
      capabilities: [
        "Sends email from your own connected Gmail or Google Workspace mailbox.",
        "Runs campaigns and sequences for the leads you import.",
        "Drafts messages with AI, using OpenAI's API.",
        "Sends messages you compose or approve.",
      ],
      integrations: ["google-workspace"],
      relatedFeatures: ["reply-classification"],
      sources: [`${SITE}/`, `${SITE}/privacy`, `${SITE}/terms`],
      highlight: true,
    },
    {
      slug: "reply-classification",
      name: "Reply classification",
      summary: "Reads replies and sorts them, such as interested, out of office, unsubscribe or bounce.",
      category: "replies-booking",
      body: [
        "247Meetings reads replies to your campaigns and classifies them, for example as interested, out of office, unsubscribe or bounce. This routes each response and stops messages to people who ask to opt out.",
      ],
      capabilities: [
        "Detects replies to your campaigns.",
        "Classifies replies as interested, out of office, unsubscribe or bounce.",
        "Stops messaging people who ask to opt out.",
      ],
      relatedFeatures: ["email-outreach", "meeting-booking"],
      sources: [`${SITE}/`, `${SITE}/privacy`],
      highlight: true,
    },
    {
      slug: "meeting-booking",
      name: "Meeting booking",
      summary: "Books discovery calls on your Google Calendar without clashing with your schedule.",
      category: "replies-booking",
      body: [
        "247Meetings books discovery calls on your calendar. It creates and updates the booking events that come from your outreach.",
        "It reads your free and busy times, so proposed meeting slots do not conflict with your schedule.",
      ],
      capabilities: [
        "Creates and updates meeting events on Google Calendar.",
        "Checks free and busy times before proposing slots.",
        "Uses the booking settings you configure.",
      ],
      integrations: ["google-workspace"],
      relatedFeatures: ["reply-classification"],
      sources: [`${SITE}/`, `${SITE}/privacy`],
      highlight: true,
    },
  ],
  benefits: [
    { title: "Meetings booked around the clock", description: "Nova writes, sends, replies and books 24/7, so discovery calls land on your calendar while you sleep." },
    { title: "Sent from your own mailbox", description: "Outreach goes out from your own Gmail or Google Workspace account, not a shared sender." },
    { title: "Opt-outs honoured", description: "Replies are classified, and people who ask to unsubscribe stop getting messages." },
    { title: "No double bookings", description: "Free and busy times are checked so proposed slots fit your schedule." },
  ],
  howItWorks: [
    { title: "Create your workspace", description: "Sign up with Google or a work email and name your company workspace." },
    { title: "Connect a mailbox", description: "Connect your Gmail or Google Workspace account and Google Calendar." },
    { title: "Nova gets to work", description: "Nova writes and sends outreach, reads and classifies replies, and books meetings, 24/7." },
  ],
  useCases: [
    { title: "Booking discovery calls", description: "Run outreach to your leads and get discovery calls booked on your calendar automatically." },
    { title: "Handling replies at scale", description: "Let replies be sorted as interested, out of office, unsubscribe or bounce, instead of reading each one." },
  ],
  security: [
    { title: "Encryption", description: "247Meetings states that data is encrypted in transit and at rest, and OAuth tokens are stored encrypted." },
    { title: "Tenant isolation", description: "Each workspace's data is isolated with row-level security." },
    { title: "Limited Google access", description: "Only the Gmail and Calendar scopes needed are requested, and Google data is not sold or used for advertising." },
    { title: "No AI training on your data", description: "Its AI provider is not permitted to train on your data, and credentials and tokens are never sent to it." },
  ],
  faqs: [
    { question: "What is 247Meetings?", answer: "An AI sales assistant that runs email outreach from your Google account, classifies replies and books discovery calls on your calendar." },
    { question: "Who is Nova?", answer: "Nova is the name 247Meetings gives its AI SDR, the assistant that writes, sends, replies and books meetings." },
    { question: "Which accounts does it work with?", answer: "Gmail or Google Workspace for email, and Google Calendar for meetings." },
    { question: "Does it use AI on my emails?", answer: "Yes. It uses OpenAI's API to draft messages and classify replies. 247Meetings states that the provider may not train on your data." },
    { question: "Can I remove my data?", answer: "You can disconnect Google or delete your account at any time. Associated Google data is deleted or de-identified within 30 days, except where law requires retention." },
  ],
  sources: [`${SITE}/`, `${SITE}/register`, `${SITE}/privacy`, `${SITE}/terms`],
  lastVerified: "2026-10-10",
};
