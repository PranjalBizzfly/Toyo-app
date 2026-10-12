import type { Product } from "@/content/types";

/**
 * GrowBizz' site is a single landing page branded GrowBizz, plus sign-in and
 * sign-up pages. Its stats (4.9 rating, 500+ businesses, 12k+ reviews),
 * and testimonials look like placeholder data and are deliberately not used.
 * The "services" (workflow automation, chatbots, outreach, content) are only
 * named on the home page, so they appear as listed-only features. Plans are named but no
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
  category: "sales-and-marketing",
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
    {
      slug: "ai-services",
      name: "AI services",
      description: "AI services GrowBizz names on its home page, beyond review collection.",
      body: [
        "Besides review collection, the GrowBizz home page has a services section titled \"GrowBizz AI Solutions\". It names four services: AI workflow automation, smart chatbots, AI-powered personalised outreach and AI content for business growth.",
        "The site gives one short description for each and no plan, price or setup details, so each page below states only what is listed.",
      ],
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
      relatedFeatures: ["easy-share-links", "qr-codes"],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "easy-share-links",
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
      slug: "qr-code-generation",
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
      evidence: "listed",
      body: [
        "A printable flyer puts a review QR code in front of customers who are not online at that moment, for example at a counter, on a table or in a shop window. It saves the business designing its own artwork around the code.",
        "GrowBizz says you can download professional PDF flyers with QR codes for offline marketing and customer engagement. It lists PDF downloads on its Pro and Enterprise plans.",
      ],
      capabilities: [
        "Downloads PDF flyers that include the business QR code.",
        "Listed on the Pro and Enterprise plans, not the free plan.",
      ],
      relatedFeatures: ["qr-codes"],
      sources: [HOME],
      hasPage: true,
    },
    {
      slug: "multi-business-management",
      name: "Multi-Business Management",
      summary: "Add and manage several businesses from one dashboard.",
      category: "business-management",
      body: ["Add and manage unlimited businesses from a single dashboard, which suits agencies, franchises and owners with several locations. This is part of the Pro and Enterprise plans; the free plan covers one business."],
      capabilities: [
        "Adds unlimited businesses on the Pro and Enterprise plans.",
        "Manages every business from a single dashboard.",
        "Limits the free plan to one business.",
      ],
      problem: "Agencies and franchises that need review collection for many locations at once.",
      relatedFeatures: ["bizsync-extension", "share-links"],
      sources: [HOME],
      hasPage: true,
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
    {
      slug: "reviewer-experience",
      name: "Reviewer Experience",
      summary: "A simple flow for customers: fill a short form and get AI-written reviews ready to submit.",
      category: "review-collection",
      body: [
        "GrowBizz is built so the customer does very little work. They see your business details, answer a short form about their visit and get reviews ready to submit.",
        "They do not write anything from scratch. After copying a review they are redirected to Google's review submission page to paste it.",
      ],
      howItWorks: [
        "The customer opens your link or scans your QR code and sees your business info.",
        "They fill a short form about their experience.",
        "They get three AI-generated reviews and copy the one they prefer.",
        "They are redirected to Google's review page to paste and submit it.",
      ],
      relatedFeatures: ["ai-review-generation", "share-links"],
      sources: [HOME],
      hasPage: true,
    },
    {
      slug: "ai-workflow-automation",
      name: "AI Workflow Automation",
      summary: "GrowBizz lists a service that analyses business processes and adds AI workflows to automate tasks.",
      category: "ai-services",
      evidence: "listed",
      body: [
        "Workflow automation uses software to carry out repeated steps in a business process, such as moving data or sending routine messages. Teams use it to cut manual work and errors.",
        "GrowBizz lists AI workflow automation as a service: it says it analyses your business processes and implements AI-powered workflows that automate tasks and improve operational efficiency.",
      ],
      capabilities: ["Listed as a GrowBizz service on the home page."],
      sources: [HOME],
      hasPage: true,
    },
    {
      slug: "smart-chatbots",
      name: "Smart Chatbots",
      summary: "GrowBizz lists AI chatbots built to understand customers and help them.",
      category: "ai-services",
      evidence: "listed",
      body: [
        "A chatbot answers customer questions in a chat window without a person typing each reply. Businesses use one to respond at any hour and handle common questions.",
        "GrowBizz lists smart chatbots as a service and says it creates AI chatbots that understand your customers and provide smooth, helpful interactions.",
      ],
      capabilities: ["Listed as a GrowBizz service on the home page."],
      sources: [HOME],
      hasPage: true,
    },
    {
      slug: "ai-powered-personalized-outreach",
      name: "AI-Powered Personalized Outreach",
      summary: "GrowBizz lists a service that uses customer data to write personalised outreach messages.",
      category: "ai-services",
      evidence: "listed",
      body: [
        "Personalised outreach means tailoring each message to the person who receives it, instead of sending the same text to everyone. It tends to get more replies than generic messages.",
        "GrowBizz lists this as a service and says it analyses customer data to create highly personalised outreach messages that drive better responses and higher conversions.",
      ],
      capabilities: ["Listed as a GrowBizz service on the home page."],
      sources: [HOME],
      hasPage: true,
    },
    {
      slug: "ai-content-for-business-growth",
      name: "AI Content for Business Growth",
      summary: "GrowBizz lists a service that produces customised content with AI and audience insights.",
      category: "ai-services",
      evidence: "listed",
      body: [
        "AI content tools help a business draft posts, pages and other marketing copy faster. Good results depend on knowing who the audience is.",
        "GrowBizz lists this as a service and says it combines audience insights with advanced AI to produce high-quality, customised content that aligns with your business objectives.",
      ],
      capabilities: ["Listed as a GrowBizz service on the home page."],
      sources: [HOME],
      hasPage: true,
    },
  ],
  productIntegrations: [
    {
      slug: "growbizz-google-business-profile-integration",
      name: "Google Business Profile",
      summary: "GrowBizz links customers to your Google review page and syncs your verified locations through BizSync.",
      connects: "GrowBizz connects to Google in two places: the review page your customers post on, and the Google Business Profile locations you own.",
      body: [
        "GrowBizz generates a direct link to your Google review page. When a customer copies an AI-generated review, they are redirected to Google's review submission page to paste and submit it.",
        "The BizSync browser extension uses your Google Business Profile to confirm ownership. Signed in with the same Google account, it securely syncs your locations, and GrowBizz lets you register only those verified businesses.",
      ],
      setup: [
        "Download the BizSync extension from the GrowBizz landing page.",
        "Sign in with the same Google account you use for GrowBizz.",
        "Let it sync the locations from your Google Business Profile.",
      ],
      workflow: [
        "Register one of the synced, verified businesses.",
        "Add its Google review link so GrowBizz can build your review link.",
        "Customers are sent to Google's review page to paste and submit their review.",
      ],
      features: ["bizsync-extension", "share-links"],
      sources: [HOME],
    },
  ],
  supportTopics: [
    {
      slug: "getting-started-with-growbizz",
      name: "Getting started with GrowBizz",
      summary: "Set up a business, share your review link or QR code and see how customers post a review.",
      body: [
        "GrowBizz lets business owners add their business details and Google review link, then share a custom review link or QR code with customers. You can start on the free plan with no credit card.",
      ],
      steps: [
        "Sign up for a free GrowBizz account.",
        "Add your business details and your Google review link.",
        "Share your custom review link, or show customers your QR code.",
        "Customers fill a short form and receive three AI-generated reviews.",
        "They copy the best one and are redirected to Google to submit it.",
      ],
      features: ["easy-share-links", "qr-code-generation", "ai-review-generation"],
      links: [{ label: "Sign up", href: SIGN_UP }],
      sources: [HOME, SIGN_UP],
    },
    {
      slug: "plans-and-billing",
      name: "Plans and billing",
      summary: "What the free plan includes and what the Pro and Enterprise plans add.",
      body: [
        "GrowBizz offers a free plan and two paid plans, Pro and Enterprise. The site does not publish prices for the paid plans.",
      ],
      keyPoints: [
        "The free plan includes 1 business.",
        "The free plan includes AI review generation and basic QR codes.",
        "No credit card is required to start.",
        "Pro and Enterprise add unlimited businesses, PDF downloads and priority support.",
      ],
      features: ["multi-business-management", "pdf-downloads"],
      sources: [HOME],
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
