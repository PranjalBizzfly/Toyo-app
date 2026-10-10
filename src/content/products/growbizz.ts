import type { Product } from "@/content/types";

/**
 * GrowBizz' site is a single landing page branded GrowBizz, plus sign-in and
 * sign-up pages. Its stats (4.9 rating, 500+ businesses, 12k+ reviews),
 * testimonials and generic "services" copy (chatbots, outreach, content) look
 * like placeholder data and are deliberately not used. Plans are named but no
 * prices are published, so no pricing block is given.
 */
const HOME = "https://snaaps.com/";
const SIGN_UP = "https://snaaps.com/sign-up";
const SIGN_IN = "https://snaaps.com/sign-in";

export const snaaps: Product = {
  id: "growbizz",
  slug: "growbizz",
  name: "GrowBizz",
  shortDescription:
    "Help customers write and post Google reviews: share a review link or QR code, and AI drafts the review for them.",
  longDescription:
    "GrowBizz is an AI tool that helps local businesses collect more Google reviews.\n\nA business owner adds their business details and Google review link. GrowBizz then gives them a custom review link and a QR code to share with customers. A customer who opens the link fills a short form about their visit and gets three AI-written review drafts. They copy the one they like and are sent to Google's review page to paste and submit it.\n\nQR codes can be printed on receipts and flyers, and paid plans add PDF flyers with the QR code ready to print. A browser extension called BizSync confirms that you own each business by syncing the locations from your Google Business Profile, so only verified businesses can be registered.\n\nThere is a free plan with one business, AI review generation and basic QR codes, and no credit card is needed to start. Pro and Enterprise plans add unlimited businesses, PDF downloads and priority support.",
  tagline: "Grow Your Business Reviews Faster Using AI",
  category: "sales-marketing",
  primaryUseCase: "Collecting Google reviews",
  audience: ["Local business owners", "Agencies", "Franchises", "Businesses with several locations"],
  platforms: ["web", "chrome"],
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  sources: [HOME, SIGN_IN, SIGN_UP],
  lastVerified: "2026-10-10",
  accent: "#6D7AFF",
  websiteUrl: HOME,
  appUrl: SIGN_UP,
  featureCategories: [
    {
      slug: "review-collection",
      name: "Review collection",
      description: "Tools that help businesses get more Google reviews from their customers.",
    },
    {
      slug: "business-management",
      name: "Business management",
      description: "Add, verify and manage the businesses you collect reviews for.",
    },
  ],
  features: [
    {
      slug: "ai-review-generation",
      name: "AI Review Generation",
      summary: "Three unique AI-written review drafts based on what the customer says about their visit.",
      category: "review-collection",
      body: [
        "When a customer opens your review link, they fill a short form about their experience. GrowBizz then writes three unique review drafts from their answers.",
        "The drafts are tailored to your type of business and the customer's own experience. The customer picks the best one, copies it and posts it on Google.",
      ],
      howItWorks: [
        "The customer opens your review link or scans your QR code.",
        "They fill a short form about their experience.",
        "GrowBizz writes three review drafts from their answers.",
        "They copy the draft they like best.",
        "They are sent to your Google review page to paste and submit it.",
      ],
      capabilities: [
        "Writes three unique review drafts for each customer.",
        "Bases each draft on the customer's own inputs.",
        "Tailors drafts to the business type.",
        "Lets the customer copy a draft in one step.",
      ],
      problem: "Happy customers who mean to leave a review but never find the words or the time.",
      benefits: [
        "Customers can leave a review in seconds.",
        "The review still reflects what the customer said about their visit.",
      ],
      relatedFeatures: ["share-links", "qr-codes"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "share-links",
      name: "Easy Share Links",
      summary: "A custom review link for each business that guides customers through the review.",
      category: "review-collection",
      body: [
        "Each business gets a custom review link to share with customers. Customers who open it see your business details and are guided through the review step by step.",
        "GrowBizz builds the link from the Google review link you add, so the last step goes straight to your Google review page.",
      ],
      capabilities: [
        "Creates a custom review link for each business.",
        "Shows customers your business details on the review page.",
        "Guides customers through a short form to the AI drafts.",
        "Redirects customers to your Google review page to submit.",
      ],
      relatedFeatures: ["ai-review-generation", "qr-codes"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "qr-codes",
      name: "QR Code Generation",
      summary: "A unique QR code for each business to print on receipts, flyers or display in store.",
      category: "review-collection",
      body: [
        "GrowBizz creates a unique QR code for each business. Customers scan it to open the review flow without typing a link.",
        "You can print the code on receipts or flyers, or display it at your location. Paid plans can also download a PDF flyer with the QR code.",
      ],
      capabilities: [
        "Creates a unique QR code for each business.",
        "Works on receipts, flyers and in-store displays.",
        "Includes basic QR codes on the free plan.",
        "Offers PDF flyers with the QR code on Pro and Enterprise plans.",
      ],
      relatedFeatures: ["pdf-downloads", "share-links"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "pdf-downloads",
      name: "PDF Downloads",
      summary: "Professional PDF flyers with your QR code for offline marketing.",
      category: "review-collection",
      body: ["Download professional PDF flyers that carry your QR code, ready for offline marketing. PDF downloads are part of the Pro and Enterprise plans."],
      sources: [HOME],
    },
    {
      slug: "multi-business-management",
      name: "Multi-Business Management",
      summary: "Add and manage several businesses from one dashboard.",
      category: "business-management",
      body: ["Add and manage unlimited businesses from a single dashboard, which suits agencies, franchises and owners with several locations. This is part of the Pro and Enterprise plans; the free plan covers one business."],
      sources: [HOME],
    },
    {
      slug: "bizsync-extension",
      name: "BizSync Extension",
      summary: "A browser extension that confirms you own the businesses you register.",
      category: "business-management",
      body: [
        "BizSync is a browser extension that checks you really own the businesses you add. It syncs the locations from your Google Business Profile, and GrowBizz then lets you register only those verified businesses.",
        "This means no manual entry, and nobody can claim a business that is not theirs.",
      ],
      howItWorks: [
        "Download the extension from the GrowBizz home page.",
        "Sign in with the same Google account you use for GrowBizz.",
        "The extension syncs the locations from your Google Business Profile.",
        "Register any of those verified businesses in GrowBizz.",
      ],
      relatedFeatures: ["multi-business-management"],
      sources: [HOME],
      hasPage: true,
    },
  ],
  howItWorks: [
    { title: "Add your business", description: "Enter your business details and your Google review link." },
    { title: "Share a link or QR code", description: "Send customers your custom review link or show them your QR code." },
    { title: "Customers get AI drafts", description: "They fill a short form and get three AI-written review drafts." },
    { title: "Post on Google", description: "They copy the best draft and are sent to Google to paste and submit it." },
  ],
  benefits: [
    { title: "Reviews in seconds", description: "Customers do not have to write a review from scratch." },
    { title: "Online and offline", description: "Share a link by message, or print the QR code on receipts and flyers." },
    { title: "Verified ownership", description: "The BizSync extension makes sure only real owners can register a business." },
    { title: "Free to start", description: "A free plan covers one business, and no credit card is needed." },
  ],
  useCases: [
    { title: "Shops, salons and clinics", description: "Display a QR code at the counter so customers can review before they leave." },
    { title: "Agencies and franchises", description: "Manage review collection for many businesses from one dashboard on a paid plan." },
  ],
  security: [
    { title: "Encryption", description: "GrowBizz says it uses industry-standard encryption to protect business information." },
    { title: "No third-party sharing", description: "GrowBizz says your data is never shared with third parties." },
    { title: "Account deletion", description: "You can delete your account and data at any time." },
  ],
  faqs: [
    {
      question: "How does GrowBizz work?",
      answer: "You add your business details and Google review link, then share a custom review link or QR code. Customers fill a short form, get three AI-written reviews, copy the best one and are sent to Google to submit it.",
    },
    {
      question: "Is GrowBizz free to use?",
      answer: "Yes. The free plan includes one business, AI review generation and basic QR codes. Pro and Enterprise plans add unlimited businesses, PDF downloads and priority support. Prices are not published on the site.",
    },
    {
      question: "Does GrowBizz integrate with Google?",
      answer: "It creates a direct link to your Google review page. After copying a review, the customer is redirected there to paste and submit it.",
    },
    {
      question: "Why do I need the BizSync extension?",
      answer: "It confirms you own the businesses you register by syncing the locations from your Google Business Profile. Sign in with the same Google account you use for GrowBizz.",
    },
    {
      question: "Can I manage several businesses?",
      answer: "Yes, on the Pro and Enterprise plans, from a single dashboard.",
    },
  ],
};
