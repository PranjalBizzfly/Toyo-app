import type { Product } from "@/content/types";

const HOME = "https://dizola.com/";
const PRIVACY = "https://dizola.com/privacy-policy";
const TERMS = "https://dizola.com/terms-of-service";
const REFUND = "https://dizola.com/refund-policy";
const LOGIN = "https://app.dizola.com/login";
const REGISTER = "https://app.dizola.com/register";

/**
 * Dizola's public site is a single landing page plus legal pages. Its
 * testimonials, usage stats (500+ organisations, 1M+ documents, 70% faster
 * workflows) are not used: they could not be confirmed and look like template
 * copy. The only exception is the version control page, which says plainly
 * that the site mentions it only in a customer quote. The integration list is
 * used only as the FAQ states it. The SOC 2 claim in the privacy policy is
 * left out until confirmed.
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
  category: "operations-and-it",
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
      slug: "documents",
      name: "Documents",
      description: "Upload, file and protect documents in one central place.",
      body: [
        "Dizola keeps an organisation's documents on one platform instead of across emails, drives and desks. Files are uploaded by drag and drop and filed in custom folders with tags and categories.",
        "Some document tools sit on higher plans. Basic document management and folder organisation are on every plan from Free, while document watermarking is listed on the Professional and Enterprise plans.",
      ],
    },
    {
      slug: "expiry-and-notifications",
      name: "Expiry and notifications",
      description: "Expiry dates, reminders and alerts so documents do not lapse unnoticed.",
      body: [
        "Each document can carry an expiry date and automated reminders. Dizola sends email and in-app alerts before a document expires, so there is time to renew, archive or escalate it.",
        "Notifications also cover document updates, approvals and team activity. Email notifications are on every plan, and expiry and renewal tracking starts on the Starter plan.",
      ],
    },
    {
      slug: "signing-and-approvals",
      name: "Signing and approvals",
      description: "Collect signatures, route approvals and share documents with the team.",
      body: [
        "Dizola has a built-in e-signature tool. Documents go to internal or external signers through a secure link, and each signature comes with an audit trail.",
        "Documents can also be shared with team members to collect feedback and approvals. Approval workflows are listed on the Enterprise plan.",
      ],
    },
    {
      slug: "security-and-access",
      name: "Security and access",
      description: "Roles, sign-in protection, encryption and backups.",
      body: [
        "Dizola controls who can view, edit or manage documents with viewer, editor and admin roles set at folder or document level. Data is encrypted at rest and in transit, and backups run daily.",
        "Further controls depend on the plan. Advanced roles and permissions and 2FA security are listed on Professional, while SSO integration and an on-premise option are listed on Enterprise.",
      ],
    },
    {
      slug: "reports",
      name: "Reports",
      description: "Dashboards, audit logs and lifecycle history.",
      body: [
        "Dizola reports on document activity, compliance status and team productivity through dashboards. Each document also keeps an audit trail from creation to completion.",
        "Audit logs are listed on the Professional and Enterprise plans. Reports and analytics are listed on the Enterprise plan.",
      ],
    },
    {
      slug: "integrations",
      name: "Integrations",
      description: "Connections to other tools and a REST API.",
      body: [
        "Dizola's FAQ says it integrates with popular tools like Google Workspace, Microsoft 365, Slack, and more. It also provides a REST API for custom integrations.",
        "The site does not describe how each connection works. Custom integrations through the API are listed on the Enterprise plan.",
      ],
    },
    {
      slug: "account",
      name: "Account",
      description: "Signing up, signing in and your data after an account ends.",
      body: [
        "An organisation registers in two steps: its details, then a plan. Users sign in with Google, and anyone who cannot get into an account can report the issue to support from the registration page.",
        "Dizola's privacy policy also covers what happens to data. Documents are kept for 30 days after an account ends so they can be recovered, and users can ask for their data in a machine-readable format.",
      ],
    },
    {
      slug: "support-and-service",
      name: "Support and service",
      description: "Support levels and service commitments by plan.",
      body: [
        "Every Dizola plan includes email support. Higher plans add faster or more personal help, and the Enterprise plan adds a service level agreement.",
        "Dizola's pricing table lists priority support on Starter, a dedicated account manager on Professional, and 24/7 dedicated support and an SLA agreement on Enterprise.",
      ],
    },
  ],
  features: [
    {
      slug: "document-management",
      name: "Document Management",
      summary: "Upload, store and organise all your documents in one secure place with folders and tags.",
      category: "documents",
      highlight: true,
      hasPage: true,
      body: [
        "Document management is the core of Dizola. Teams upload, store and organise all their documents in one secure, central location with folder structures, instead of keeping files across emails, drives and desks.",
        "Basic document management is included on every plan, starting with the Free plan for up to 5 users and 10 GB of storage.",
      ],
      problem: "Files scattered across emails, drives and desks are hard to find and keep track of.",
      capabilities: ["Drag-and-drop upload", "All major file formats supported", "Custom folders, tags and categories"],
      howItWorks: ["Upload documents by drag and drop or directly.", "File them in custom folders with tags and categories."],
      relatedFeatures: ["drag-and-drop-upload", "folder-organisation", "tags-and-categories"],
      sources: [HOME],
    },
    {
      slug: "expiry-tracking",
      name: "Expiry Tracking",
      summary: "Get automatic alerts before documents expire, then renew, archive or escalate them.",
      category: "expiry-and-notifications",
      highlight: true,
      hasPage: true,
      body: [
        "Expiry tracking watches the expiry date on each document. Dizola tracks these dates automatically and alerts you before a document lapses, so you can renew, archive or escalate it in time.",
        "Expiry and renewal tracking is listed on the Starter plan and above.",
      ],
      problem: "Contracts, policies and compliance documents can lapse without anyone noticing.",
      capabilities: [
        "Expiry dates and automated reminders on each document",
        "Email and in-app alerts before a document expires",
        "Renew, archive or escalate before a document lapses",
      ],
      relatedFeatures: ["automated-expiry-reminders", "smart-notifications"],
      sources: [HOME],
    },
    {
      slug: "e-signatures",
      name: "E-Signatures",
      summary: "Collect electronic signatures from anywhere, with built-in signing in approval workflows.",
      category: "signing-and-approvals",
      highlight: true,
      hasPage: true,
      body: [
        "Dizola has a built-in e-signature tool. You send a document for signing to internal or external parties, and recipients review it and sign electronically.",
        "Dizola states that all signatures are legally binding and come with a full audit trail for compliance. E-signatures are listed on the Starter plan and above.",
      ],
      capabilities: [
        "Send documents for signing to internal or external parties",
        "Recipients sign through a secure link",
        "Full audit trail for each signature",
      ],
      howItWorks: ["Send the document to the signers.", "Each recipient gets a secure link.", "They review the document and sign electronically."],
      relatedFeatures: ["approval-workflows"],
      sources: [HOME],
    },
    {
      slug: "role-based-access",
      name: "Role-Based Access",
      summary: "Control who can view, edit or manage documents with role-based permissions.",
      category: "security-and-access",
      highlight: true,
      hasPage: true,
      body: [
        "Role-based access decides who can view, edit or manage each document. Dizola describes it as granular role-based access control, so only authorised team members reach sensitive documents.",
        "Role-based access is listed on the Starter plan and above.",
      ],
      capabilities: [
        "Viewer, editor and admin roles",
        "Permissions set at folder or document level",
        "Only authorised members can view, edit or manage sensitive documents",
      ],
      relatedFeatures: ["advanced-roles-and-permissions", "folders"],
      sources: [HOME],
    },
    {
      slug: "smart-notifications",
      name: "Smart Notifications",
      summary: "Real-time notifications for document updates, approvals, expirations and team activity.",
      category: "expiry-and-notifications",
      hasPage: true,
      body: [
        "Smart notifications keep people informed in real time about what happens to their documents. Dizola sends them by email and as in-app alerts.",
      ],
      capabilities: ["Document updates", "Approvals", "Expirations", "Team activities"],
      relatedFeatures: ["email-notifications", "expiry-reminders"],
      sources: [HOME],
    },
    {
      slug: "reports-and-analytics",
      name: "Reports and Analytics",
      summary: "Dashboards on document activity, compliance status and team productivity.",
      category: "reports",
      hasPage: true,
      body: [
        "Reports and analytics give insight into how documents are handled across the organisation, through detailed dashboards.",
        "Reports and analytics are listed on the Enterprise plan.",
      ],
      capabilities: ["Document activity", "Compliance status", "Team productivity"],
      relatedFeatures: ["audit-logs", "document-lifecycle-tracking"],
      sources: [HOME],
    },

    /* Documents */
    {
      slug: "drag-and-drop-upload",
      name: "Drag-and-drop upload",
      summary: "Drag documents into Dizola or upload them directly, in any major file format.",
      category: "documents",
      hasPage: true,
      evidence: "listed",
      body: [
        "Drag-and-drop upload lets people add files by dragging them from their computer into the browser, instead of browsing through a file picker. It makes moving a batch of existing documents into a new system quicker.",
        "Dizola's site says you can drag and drop your documents or upload them directly, and that all major file formats are supported. It does not list formats or size limits.",
      ],
      capabilities: ["Drag and drop or direct upload", "All major file formats supported"],
      relatedFeatures: ["document-management"],
      sources: [HOME],
    },
    {
      slug: "folder-organisation",
      name: "Folder organisation",
      summary: "Build structured filing with custom folders, and set access at folder level.",
      category: "documents",
      hasPage: true,
      body: [
        "Folders give Dizola's documents a structure. You create custom folders to build your own filing, so each team can find its contracts, records and policies in a known place.",
        "Folder organisation is included on every plan, starting with Free.",
      ],
      capabilities: [
        "Custom folders for structured filing",
        "Folders work alongside tags and categories",
        "Viewer, editor and admin roles can be set at folder level",
      ],
      relatedFeatures: ["tags-and-categories", "role-based-access"],
      sources: [HOME],
    },
    {
      slug: "tags-and-categories",
      name: "Tags and categories",
      summary: "Label documents with custom tags and categories as part of your filing.",
      category: "documents",
      hasPage: true,
      evidence: "listed",
      body: [
        "Tags and categories are labels added to documents so related files can be grouped even when they sit in different folders. Teams use them to mark document types, owners or projects.",
        "Dizola's site says you can create structured filing with custom folders, tags and categories. Its privacy policy confirms it stores the tags and folders you assign. It does not describe how tags are used further.",
      ],
      capabilities: ["Custom tags and categories", "Stored with the document's organisational data"],
      relatedFeatures: ["folders"],
      sources: [HOME, PRIVACY],
    },
    {
      slug: "version-control",
      name: "Version control",
      summary: "Dizola's site mentions version control in a customer quote.",
      category: "documents",
      // No page: the only mention is inside a customer testimonial, which is not used as evidence.
      hasPage: false,
      evidence: "listed",
      body: [
        "Version control keeps earlier copies of a document when it changes, so teams can see what changed and go back to a previous version if needed. Legal and compliance teams rely on it to show a document's history.",
        "Dizola's homepage mentions version control only in a customer quote, alongside full audit history and role-based access. The site does not describe how versions are kept or which plans include it.",
      ],
      capabilities: ["Mentioned on the Dizola homepage"],
      sources: [HOME],
    },
    {
      slug: "document-watermarking",
      name: "Document watermarking",
      summary: "Document watermarking is listed on Dizola's Professional and Enterprise plans.",
      category: "documents",
      hasPage: true,
      evidence: "listed",
      body: [
        "Document watermarking places a visible mark on a file, such as a company name or a label, so copies can be identified and are harder to pass off as originals.",
        "Dizola lists document watermarking on its Professional and Enterprise plans. The site gives no further detail.",
      ],
      capabilities: ["Listed on the Professional plan", "Listed on the Enterprise plan"],
      sources: [HOME],
    },

    /* Expiry and notifications */
    {
      slug: "automated-expiry-reminders",
      name: "Automated expiry reminders",
      summary: "Assign expiry dates and automated reminders so nothing slips through.",
      category: "expiry-and-notifications",
      hasPage: true,
      body: [
        "When a document is uploaded, you can give it an expiry date and set automated reminders. Setting these is one of Dizola's five steps to streamlined documents.",
        "Reminders arrive well before the date, which gives time to renew, review or take other action.",
      ],
      capabilities: [
        "Expiry date assigned to each document",
        "Automated reminders",
        "Email and in-app alerts well before a document expires",
      ],
      relatedFeatures: ["expiry-tracking", "email-notifications"],
      sources: [HOME],
    },
    {
      slug: "email-notifications",
      name: "Email notifications",
      summary: "Email notifications are included on every Dizola plan.",
      category: "expiry-and-notifications",
      hasPage: true,
      evidence: "listed",
      body: [
        "Email notifications send updates about documents straight to a person's inbox, so they hear about changes and deadlines without logging in.",
        "Dizola lists email notifications on its Free plan and above. Its FAQ says expiry alerts arrive via email and in-app alerts.",
      ],
      capabilities: ["Listed on every plan from Free", "Used for expiry alerts"],
      relatedFeatures: ["smart-notifications"],
      sources: [HOME],
    },

    /* Signing and approvals */
    {
      slug: "approval-workflows",
      name: "Approval workflows",
      summary: "Approval workflows are listed on Dizola's Enterprise plan.",
      category: "signing-and-approvals",
      hasPage: true,
      evidence: "listed",
      body: [
        "An approval workflow sends a document to the right people in turn, so it is reviewed and signed off before anyone acts on it. It replaces chasing approvals by email.",
        "Dizola lists approval workflows on its Enterprise plan. Its how it works section says you route documents for review, collect approvals and gather e-signatures.",
      ],
      capabilities: ["Listed on the Enterprise plan", "Route documents for review and collect approvals"],
      relatedFeatures: ["e-signatures"],
      sources: [HOME],
    },
    {
      slug: "real-time-collaboration",
      name: "Real-time collaboration",
      summary: "Share documents with team members, collect feedback and track approvals in real time.",
      category: "signing-and-approvals",
      hasPage: true,
      body: [
        "Dizola lets teams work on documents together. You share a document with team members, gather their feedback and follow approvals as they happen, so everyone stays on the same page.",
      ],
      capabilities: ["Share documents with team members", "Collect feedback", "Track approvals in real time"],
      relatedFeatures: ["approval-workflows", "smart-notifications"],
      sources: [HOME],
    },

    /* Security and access */
    {
      slug: "advanced-roles-and-permissions",
      name: "Advanced roles and permissions",
      summary: "Advanced roles and permissions are listed on Dizola's Professional and Enterprise plans.",
      category: "security-and-access",
      hasPage: true,
      evidence: "listed",
      body: [
        "Advanced roles and permissions go beyond a few fixed roles, giving administrators finer control over who can do what with each document.",
        "Dizola lists advanced roles and permissions on its Professional and Enterprise plans. The site does not say which roles or settings this adds.",
      ],
      capabilities: ["Listed on the Professional plan", "Listed on the Enterprise plan"],
      relatedFeatures: ["role-based-access"],
      sources: [HOME],
    },
    {
      slug: "two-factor-authentication",
      name: "Two-factor authentication",
      summary: "2FA security is listed on Dizola's Professional and Enterprise plans.",
      category: "security-and-access",
      hasPage: true,
      evidence: "listed",
      body: [
        "Two-factor authentication asks for a second proof of identity, such as a code, as well as a password. It stops someone with a stolen password from getting in.",
        "Dizola lists 2FA security on its Professional and Enterprise plans, and its FAQ names two-factor authentication among its security measures.",
      ],
      capabilities: ["Listed as 2FA Security on Professional and Enterprise"],
      sources: [HOME, PRIVACY],
    },
    {
      slug: "sso-integration",
      name: "SSO integration",
      summary: "SSO integration is listed on Dizola's Enterprise plan.",
      category: "security-and-access",
      hasPage: true,
      evidence: "listed",
      body: [
        "Single sign-on lets staff use one company login for many tools, so IT can manage access in one place and people have fewer passwords.",
        "Dizola lists SSO integration on its Enterprise plan. The site does not name supported identity providers.",
      ],
      capabilities: ["Listed on the Enterprise plan"],
      sources: [HOME],
    },
    {
      slug: "encryption-at-rest-and-in-transit",
      name: "Encryption at rest and in transit",
      summary: "256-bit AES encryption for stored data and TLS 1.3 for data in transit.",
      category: "security-and-access",
      hasPage: true,
      evidence: "listed",
      body: [
        "Encryption scrambles data so only authorised systems can read it. Encryption at rest protects stored files, and encryption in transit protects data moving between a browser and the service.",
        "Dizola states that it uses 256-bit AES encryption for data at rest and TLS 1.3 for data in transit.",
      ],
      capabilities: ["256-bit AES encryption for data at rest", "TLS 1.3 for data in transit"],
      sources: [HOME, PRIVACY],
    },
    {
      slug: "daily-backups-and-disaster-recovery",
      name: "Daily backups and disaster recovery",
      summary: "Automated daily backups with disaster recovery procedures.",
      category: "security-and-access",
      hasPage: true,
      evidence: "listed",
      body: [
        "Backups keep copies of data so it can be restored after a failure, and disaster recovery procedures set out how a service gets back up and running.",
        "Dizola's privacy policy lists automated daily backups with disaster recovery procedures. It does not give backup retention or recovery times.",
      ],
      capabilities: ["Automated daily backups", "Disaster recovery procedures"],
      sources: [PRIVACY],
    },
    {
      slug: "on-premise-option",
      name: "On-premise option",
      summary: "An on-premise option is listed on Dizola's Enterprise plan.",
      category: "security-and-access",
      hasPage: true,
      evidence: "listed",
      body: [
        "An on-premise option runs the software on an organisation's own servers instead of the vendor's cloud. Organisations choose it when rules or policy require them to keep documents in house.",
        "Dizola lists an on-premise option on its Enterprise plan. The site gives no further detail.",
      ],
      capabilities: ["Listed on the Enterprise plan"],
      sources: [HOME],
    },

    /* Reports */
    {
      slug: "audit-logs",
      name: "Audit logs",
      summary: "Audit logs are listed on Dizola's Professional and Enterprise plans.",
      category: "reports",
      hasPage: true,
      evidence: "listed",
      body: [
        "Audit logs record who did what and when in a system. Compliance teams use them to answer questions about a document's history and to show controls are working.",
        "Dizola lists audit logs on its Professional and Enterprise plans, and its FAQ names audit logs among its security measures.",
      ],
      capabilities: ["Listed on the Professional and Enterprise plans"],
      relatedFeatures: ["document-lifecycle-tracking"],
      sources: [HOME],
    },
    {
      slug: "document-lifecycle-tracking",
      name: "Document lifecycle tracking",
      summary: "Monitor every document from creation to completion with a full audit trail.",
      category: "reports",
      hasPage: true,
      body: [
        "Tracking the lifecycle is the last of Dizola's five steps. Every document is monitored from creation to completion with a full audit trail.",
        "Dizola's FAQ describes the platform as covering the whole document lifecycle, from creation to archival.",
      ],
      capabilities: [
        "Full audit trail for each document",
        "Covers the lifecycle from creation to archival",
        "Dashboard preview shows statuses such as signed, pending, expiring and approved",
      ],
      relatedFeatures: ["audit-logs", "reports-analytics"],
      sources: [HOME],
    },

    /* Integrations */
    {
      slug: "rest-api-and-custom-integrations",
      name: "REST API and custom integrations",
      summary: "A REST API for custom integrations, listed on the Enterprise plan.",
      category: "integrations",
      hasPage: true,
      evidence: "listed",
      body: [
        "A REST API lets developers connect a product to other systems with their own code, for example to push documents in or pull status out.",
        "Dizola's FAQ says it provides a REST API for custom integrations. Custom integrations (API) are listed on its Enterprise plan. No public API documentation is linked from the site.",
      ],
      capabilities: ["REST API for custom integrations", "Listed on the Enterprise plan"],
      sources: [HOME],
    },
    {
      slug: "google-workspace-integration",
      name: "Google Workspace integration",
      summary: "Dizola's FAQ names Google Workspace among the tools it integrates with.",
      category: "integrations",
      hasPage: true,
      evidence: "listed",
      body: [
        "A Google Workspace integration connects a tool with Google's office apps, such as Gmail and Drive, so documents and updates can move between them.",
        "Dizola's FAQ states: \"Dizola integrates with popular tools like Google Workspace, Microsoft 365, Slack, and more.\"",
      ],
      capabilities: ["Named in Dizola's FAQ"],
      sources: [HOME],
    },
    {
      slug: "microsoft-365-integration",
      name: "Microsoft 365 integration",
      summary: "Dizola's FAQ names Microsoft 365 among the tools it integrates with.",
      category: "integrations",
      hasPage: true,
      evidence: "listed",
      body: [
        "A Microsoft 365 integration connects a tool with Microsoft's office apps, such as Outlook, Word and OneDrive, so teams can work across both.",
        "Dizola's FAQ states: \"Dizola integrates with popular tools like Google Workspace, Microsoft 365, Slack, and more.\"",
      ],
      capabilities: ["Named in Dizola's FAQ"],
      sources: [HOME],
    },
    {
      slug: "slack-integration",
      name: "Slack integration",
      summary: "Dizola's FAQ names Slack among the tools it integrates with.",
      category: "integrations",
      hasPage: true,
      evidence: "listed",
      body: [
        "A Slack integration brings updates from another tool into Slack, where many teams already talk, so people see changes without switching apps.",
        "Dizola's FAQ states: \"Dizola integrates with popular tools like Google Workspace, Microsoft 365, Slack, and more.\"",
      ],
      capabilities: ["Named in Dizola's FAQ"],
      sources: [HOME],
    },

    /* Account */
    {
      slug: "google-sign-in",
      name: "Google sign-in",
      summary: "Sign in to Dizola with a Google account.",
      category: "account",
      hasPage: true,
      evidence: "listed",
      body: [
        "Google sign-in lets people log in with their existing Google account instead of creating a separate password.",
        "Dizola's login page at app.dizola.com/login opens a Sign in with Google screen to continue to dizola.com. The site does not describe other sign-in methods.",
      ],
      capabilities: ["Login page opens Sign in with Google"],
      sources: [LOGIN],
    },
    {
      slug: "organisation-registration-and-plan-selection",
      name: "Organisation registration and plan selection",
      summary: "Register your organisation, then choose a plan, in two steps.",
      category: "account",
      hasPage: true,
      body: [
        "Dizola accounts are set up per organisation. The registration page walks through two steps: organisation details, then choosing a plan.",
        "Every plan starts with a 14-day free trial and no credit card.",
      ],
      howItWorks: ["Enter organisation details.", "Continue to plan selection and choose a plan."],
      capabilities: [
        "Required: organisation name, first name, last name and email ID",
        "Optional: contact number and referral code",
      ],
      relatedFeatures: ["google-sign-in"],
      sources: [REGISTER, HOME],
    },
    {
      slug: "account-issue-reporting",
      name: "Account issue reporting",
      summary: "Can't access your account? Report the issue and support replies by email.",
      category: "account",
      hasPage: true,
      body: [
        "The registration page has a Report an Issue form for anyone who cannot access their account. You tell the support team what went wrong and they get back to you by email.",
      ],
      howItWorks: [
        "Choose Report an Issue on the registration page.",
        "Enter your name and email ID.",
        "Pick what you need help with, such as \"I can't create an account\".",
        "Describe what happened in up to 3,000 characters and send the report.",
      ],
      sources: [REGISTER],
    },
    {
      slug: "30-day-data-recovery-after-termination",
      name: "30-day data recovery after termination",
      summary: "Documents are kept for 30 days after an account ends so they can be recovered.",
      category: "account",
      hasPage: true,
      body: [
        "Dizola's privacy policy sets out what happens to documents when an account is terminated. They are not deleted straight away, which leaves a window to recover them.",
      ],
      capabilities: [
        "Documents and data retained for 30 days to allow recovery",
        "Permanently deleted from Dizola's servers after 30 days",
        "Some records may be kept longer for legal, tax or regulatory compliance",
      ],
      relatedFeatures: ["data-export"],
      sources: [PRIVACY],
    },
    {
      slug: "data-export-portability",
      name: "Data export (portability)",
      summary: "Request your data in a structured, machine-readable format.",
      category: "account",
      hasPage: true,
      evidence: "listed",
      body: [
        "Data portability means getting your data back in a format another system can read, so you are not locked in to one provider.",
        "Dizola's privacy policy lists portability as a right: you can request your data in a structured, machine-readable format through the contact form on its website. It does not name the file formats.",
      ],
      capabilities: ["Request data in a structured, machine-readable format", "Requests go through the website contact form"],
      sources: [PRIVACY],
    },

    /* Support and service */
    {
      slug: "priority-support",
      name: "Priority support",
      summary: "Priority support is listed on Dizola's Starter plan and above.",
      category: "support-and-service",
      hasPage: true,
      evidence: "listed",
      body: [
        "Priority support moves a customer's requests ahead in the queue, so problems are looked at sooner than on a basic plan.",
        "Dizola's pricing table lists priority support on the Starter and Enterprise plans. The site gives no response times.",
      ],
      capabilities: ["Listed on the Starter plan", "Listed on the Enterprise plan"],
      sources: [HOME],
    },
    {
      slug: "dedicated-account-manager",
      name: "Dedicated account manager",
      summary: "A dedicated account manager is listed on Dizola's Professional and Enterprise plans.",
      category: "support-and-service",
      hasPage: true,
      evidence: "listed",
      body: [
        "A dedicated account manager is a named contact at the vendor who knows the customer's setup and helps with questions, rollout and renewals.",
        "Dizola's pricing table lists a dedicated account manager on the Professional and Enterprise plans.",
      ],
      capabilities: ["Listed on the Professional and Enterprise plans"],
      sources: [HOME],
    },
    {
      slug: "24-7-dedicated-support",
      name: "24/7 dedicated support",
      summary: "24/7 dedicated support is listed on Dizola's Enterprise plan.",
      category: "support-and-service",
      hasPage: true,
      evidence: "listed",
      body: [
        "Round-the-clock support means help is available at any hour, which matters for organisations working across time zones or with urgent deadlines.",
        "Dizola lists 24/7 dedicated support on its Enterprise plan.",
      ],
      capabilities: ["Listed on the Enterprise plan"],
      sources: [HOME],
    },
    {
      slug: "sla-agreement",
      name: "SLA agreement",
      summary: "An SLA agreement is listed on Dizola's Enterprise plan.",
      category: "support-and-service",
      hasPage: true,
      evidence: "listed",
      body: [
        "A service level agreement is a written commitment from a vendor on things like availability and response times, with agreed remedies if they are missed.",
        "Dizola lists an SLA agreement on its Enterprise plan. The site does not publish its terms.",
      ],
      capabilities: ["Listed on the Enterprise plan"],
      sources: [HOME],
    },
  ],
  supportTopics: [
    {
      slug: "free-trial",
      name: "Free trial",
      summary: "All plans include a 14-day free trial, no credit card required.",
      body: [
        "Dizola offers a 14-day free trial for all new accounts. You can explore the platform, invite team members and test workflows before you commit.",
        "The trial expires automatically after 14 days unless you upgrade.",
      ],
      keyPoints: [
        "You have access to all features of your selected plan",
        "No payment information is required to start the trial",
        "The trial automatically expires after 14 days unless you upgrade",
        "No charges are incurred during the trial period",
      ],
      sources: [REFUND, HOME],
    },
    {
      slug: "getting-started-with-dizola",
      name: "Getting started with Dizola",
      summary: "Five simple steps to streamlined documents, from upload to tracking.",
      body: [
        "Dizola describes getting started in five steps that take a document from upload to completion. Register your organisation first, then follow the steps below.",
      ],
      steps: [
        "Upload documents: drag and drop or upload directly. All major file formats are supported.",
        "Organise with folders and tags: create structured filing with custom folders, tags and categories.",
        "Set expiry and reminders: assign expiry dates and automated reminders.",
        "Share, approve and sign: route documents for review, collect approvals and gather e-signatures.",
        "Track the lifecycle: monitor every document from creation to completion with a full audit trail.",
      ],
      features: ["document-management", "folder-organisation", "automated-expiry-reminders", "e-signatures", "document-lifecycle-tracking"],
      sources: [HOME, REGISTER],
    },
    {
      slug: "dizola-faqs",
      name: "Dizola FAQs",
      summary: "Official answers on the free trial, expiry alerts, integrations, security, e-signatures and access.",
      body: ["These answers come from the FAQ on Dizola's website."],
      faqs: [
        {
          question: "What is Dizola and how does it work?",
          answer: "Dizola is a central document management platform for uploading, organising, tracking and signing documents, from creation to archival.",
        },
        {
          question: "Can I try Dizola for free before purchasing?",
          answer: "Yes. There is a 14-day free trial with no credit card required. You can invite team members and test workflows first.",
        },
        {
          question: "What happens when a document is about to expire?",
          answer: "Dizola tracks expiry dates and sends email and in-app alerts well before a document expires.",
        },
        {
          question: "Does Dizola integrate with other tools?",
          answer: "Dizola integrates with popular tools like Google Workspace, Microsoft 365, Slack, and more. It also provides a REST API for custom integrations.",
        },
        {
          question: "Is my data secure with Dizola?",
          answer: "Dizola uses 256-bit AES encryption at rest and TLS 1.3 in transit, with role-based access, audit logs, two-factor authentication and regular security audits.",
        },
        {
          question: "How does the e-signature feature work?",
          answer: "Recipients get a secure link, review the document and sign electronically. Signatures come with a full audit trail.",
        },
        {
          question: "Can I control who accesses specific documents?",
          answer: "Yes. You can assign viewer, editor or admin roles at folder or document level.",
        },
        {
          question: "What kind of support do you offer?",
          answer: "Email support is included on all plans. Dizola says its help center includes guides, video tutorials and a community forum.",
        },
      ],
      sources: [HOME],
    },
    {
      slug: "cancellations-refunds-and-downgrades",
      name: "Cancellations, refunds and downgrades",
      summary: "How cancelling, refunds and plan downgrades work under Dizola's refund policy.",
      body: [
        "You can cancel a Dizola subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period, and access continues until then.",
        "Monthly plans get no prorated refunds for partial months. Annual plans get a full refund if cancelled within the first 30 days of purchase or renewal, and no refund after that. All prices and refunds are in US dollars.",
      ],
      keyPoints: [
        "Full refund for unauthorised or erroneous charges and for duplicate payments",
        "Prorated credit if Dizola has downtime of more than 24 consecutive hours that materially affects your use",
        "Not refundable: add-ons once activated, setup fees, services already rendered and accounts terminated for breaking the terms",
        "Downgrades take effect at the start of the next billing cycle, with no refund for the price difference",
        "Features exclusive to the higher plan are disabled on downgrade",
      ],
      steps: [
        "Use the contact form on Dizola's website with the subject \"Refund Request\".",
        "Include your account email, subscription plan and reason for the request.",
        "Dizola reviews the request within 3 to 5 business days and confirms by email.",
        "Approved refunds go to the original payment method: card refunds typically within 5 to 10 business days, bank transfers up to 15.",
      ],
      sources: [REFUND, TERMS],
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
