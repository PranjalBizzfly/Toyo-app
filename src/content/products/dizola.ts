import type { Product } from "@/content/types";

const HOME = "https://dizola.com/";
const PRIVACY = "https://dizola.com/privacy-policy";
const TERMS = "https://dizola.com/terms-of-service";

/**
 * Dizola's public site is a single landing page plus legal pages. Its
 * testimonials, usage stats (500+ organisations, 1M+ documents, 70% faster
 * workflows) and the integration list in the FAQ are not used: they could not
 * be confirmed and look like template copy. The SOC 2 claim in the privacy
 * policy is also left out until confirmed.
 */
export const dizola: Product = {
  id: "dizola",
  slug: "dizola",
  name: "Dizola",
  shortDescription:
    "Upload, organise, track and e-sign office documents in one place, with expiry alerts and role-based access.",
  longDescription:
    "Dizola is a cloud document management platform for organisations. Its site calls it an Office Document Management System. Teams upload documents, file them in folders with tags, and keep them in one central place instead of across emails, drives and desks.\n\nEach document can carry an expiry date and reminders, so Dizola alerts you by email and in-app before it lapses. Documents can be routed for review and approval and sent out for electronic signature to people inside or outside the organisation.\n\nAccess is set by role, such as viewer, editor or admin, at folder or document level. Reports show document activity and compliance status. Every plan starts with a 14-day free trial and no credit card.",
  tagline: "Document Management Simplified",
  category: "operations-it",
  subcategory: "workplace-operations",
  primaryUseCase: "Office document management and e-signing",
  audience: ["HR teams", "Managers", "Legal and compliance teams", "SMBs and enterprises"],
  platforms: ["web"],
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  sources: [HOME, PRIVACY, TERMS],
  lastVerified: "2026-10-10",
  accent: "#4F46E5",
  websiteUrl: HOME,
  appUrl: "https://app.dizola.com/register",
  featureCategories: [
    {
      slug: "features",
      name: "Features",
      description: "Tools for every step of the document lifecycle, from upload to signing.",
    },
  ],
  features: [
    {
      slug: "document-management",
      name: "Document Management",
      summary: "Upload, store and organise all your documents in one secure place with folders and tags.",
      category: "features",
      highlight: true,
      capabilities: ["Drag-and-drop upload", "All major file formats supported", "Custom folders, tags and categories"],
      sources: [HOME],
    },
    {
      slug: "expiry-tracking",
      name: "Expiry Tracking",
      summary: "Get automatic alerts before documents expire, then renew, archive or escalate them.",
      category: "features",
      highlight: true,
      capabilities: [
        "Expiry dates and automated reminders on each document",
        "Email and in-app alerts before a document expires",
        "Renew, archive or escalate before a document lapses",
      ],
      sources: [HOME],
    },
    {
      slug: "e-signatures",
      name: "E-Signatures",
      summary: "Collect electronic signatures from anywhere, with built-in signing in approval workflows.",
      category: "features",
      highlight: true,
      capabilities: [
        "Send documents for signing to internal or external parties",
        "Recipients sign through a secure link",
        "Full audit trail for each signature",
      ],
      sources: [HOME],
    },
    {
      slug: "role-based-access",
      name: "Role-Based Access",
      summary: "Control who can view, edit or manage documents with role-based permissions.",
      category: "features",
      highlight: true,
      capabilities: ["Viewer, editor and admin roles", "Permissions set at folder or document level"],
      sources: [HOME],
    },
    {
      slug: "smart-notifications",
      name: "Smart Notifications",
      summary: "Real-time notifications for document updates, approvals, expirations and team activity.",
      category: "features",
      sources: [HOME],
    },
    {
      slug: "reports-analytics",
      name: "Reports and Analytics",
      summary: "Dashboards on document activity, compliance status and team productivity.",
      category: "features",
      sources: [HOME],
    },
  ],
  benefits: [
    {
      title: "Secure and reliable",
      description: "Encryption and daily backups keep documents safe. Role-based access means people only see what they should.",
    },
    { title: "Saves time", description: "Reminders, approvals and filing are automated, so less time goes on paperwork." },
    { title: "Easy collaboration", description: "Share documents with your team, collect feedback and track approvals in real time." },
    {
      title: "One central system",
      description: "No more files scattered across emails, drives and desks. Every document lives on one platform.",
    },
  ],
  howItWorks: [
    { title: "Upload documents", description: "Drag and drop documents or upload them directly. All major file formats are supported." },
    { title: "Organise with folders and tags", description: "Build structured filing with custom folders, tags and categories." },
    { title: "Set expiry and reminders", description: "Assign expiry dates and automated reminders so nothing slips through." },
    { title: "Share, approve and sign", description: "Route documents for review, collect approvals and gather e-signatures." },
    { title: "Track the lifecycle", description: "Follow every document from creation to completion with a full audit trail." },
  ],
  useCases: [
    { title: "HR teams", description: "Keep employee records, contracts and compliance documents in one place." },
    { title: "Managers", description: "Handle approvals, reporting and oversight of team documents." },
    { title: "Legal and compliance", description: "Manage regulatory documents, NDAs and audit trails." },
    { title: "Growing organisations", description: "SMBs and enterprises that manage a high volume of documents." },
  ],
  security: [
    { title: "Encryption", description: "256-bit AES encryption for data at rest and TLS 1.3 for data in transit." },
    { title: "Access controls", description: "Role-based access controls and multi-factor authentication." },
    { title: "Backups", description: "Automated daily backups with disaster recovery procedures." },
    {
      title: "Data retention",
      description: "After an account ends, documents are kept for 30 days for recovery and then permanently deleted.",
    },
  ],
  pricing: {
    currency: "USD",
    trial: "14-day free trial on all plans, no credit card required",
    note: "Yearly billing saves 20%.",
    asOf: "2026-10-10",
    sourceUrl: "https://dizola.com/#pricing",
    plans: [
      {
        name: "Free",
        price: "Free",
        description: "For individuals or small teams getting started.",
        features: ["Up to 5 users", "10 GB storage", "Basic document management", "Folder organisation", "Email notifications", "Email support"],
        cta: { label: "Get started free", href: "https://app.dizola.com/register" },
      },
      {
        name: "Starter",
        price: "$12",
        period: "month",
        description: "For growing teams that need more collaboration. $10 per month billed yearly.",
        features: ["Up to 25 users", "50 GB storage", "E-signatures", "Expiry and renewal tracking", "Role-based access", "Priority support"],
        cta: { label: "Start free trial", href: "https://app.dizola.com/register" },
      },
      {
        name: "Professional",
        price: "$35",
        period: "month",
        description: "For organisations that need full control and compliance. $28 per month billed yearly.",
        features: [
          "Up to 100 users",
          "200 GB storage",
          "Everything in Starter",
          "Advanced roles and permissions",
          "Audit logs",
          "2FA security",
          "Document watermarking",
          "Dedicated account manager",
        ],
        cta: { label: "Start free trial", href: "https://app.dizola.com/register" },
        recommended: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Custom solutions for large organisations.",
        features: [
          "Unlimited users",
          "Unlimited storage",
          "Approval workflows",
          "SSO integration",
          "Custom integrations (API)",
          "SLA agreement",
          "On-premise option",
          "24/7 dedicated support",
        ],
        cta: { label: "Contact sales", href: "https://dizola.com/#contact" },
      },
    ],
  },
  faqs: [
    {
      question: "What is Dizola?",
      answer: "Dizola is a central platform for uploading, organising, tracking and signing documents. It covers folder management, expiry tracking, e-signatures and role-based access.",
    },
    {
      question: "Can I try Dizola for free?",
      answer: "Yes. There is a 14-day free trial with no credit card required. You can invite team members and test workflows before you buy.",
    },
    {
      question: "What happens when a document is about to expire?",
      answer: "Dizola tracks expiry dates and sends email and in-app alerts before a document expires, so you have time to renew, review or act.",
    },
    {
      question: "How does e-signing work?",
      answer: "You send a document to internal or external signers. They get a secure link, review the document and sign electronically. Each signature comes with an audit trail.",
    },
    {
      question: "Can I control who sees specific documents?",
      answer: "Yes. You can give people viewer, editor or admin roles at folder or document level.",
    },
    {
      question: "Can I cancel at any time?",
      answer: "Yes. You can cancel in your account settings. Cancellation takes effect at the end of the current billing period.",
    },
  ],
};
