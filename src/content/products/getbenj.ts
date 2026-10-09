import type { Feature, FeatureCategory, Product } from "@/content/types";

const HOME = "https://getbenj.com/";

const featureCategories: FeatureCategory[] = [
  {
    slug: "capabilities",
    name: "Capabilities",
    description: "The sections Benj generates for every marketing plan.",
    body: [
      "Benj turns a few details about a product into a complete, ready-to-launch marketing plan: “a whole marketing team, in one plan”. Every plan is based on real-world data: live venue data from OpenStreetMap (a free, public world map) and real ads and media collected from across the web.",
      "The plan comes back in the formats teams already use: a clean PDF, creatives ready to paste, and a report to share with a team or client.",
    ],
  },
];

const f = (x: Omit<Feature, "category" | "sources" | "hasPage">): Feature => ({
  category: "capabilities",
  sources: [HOME],
  hasPage: true,
  ...x,
});

const features: Feature[] = [
  f({
    slug: "ai-buyer-persona",
    name: "AI Buyer Persona",
    summary: "Works out who is most likely to buy your product, from just your product details.",
    highlight: true,
    body: [
      "Benj works out who buys your product most, using only the product details you enter. The result is a clear ideal customer profile (ICP: a description of your best-fit buyer) made for your product, so you start from a defined buyer instead of a blank form.",
      "The persona covers the buyer's demographics, their pain points and the channels that reach them, and it shapes the rest of the plan.",
    ],
    capabilities: [
      "Works out the likely buyer's age, gender and income from the product details you enter.",
      "Lists the pain points that buyer has, so messaging can speak to them.",
      "Names the channels that reach that buyer, which then shape the channel ranking and budget.",
      "Produces an ideal customer profile (ICP) made for your product, instead of a blank persona form.",
      "Needs no audience research from you: the only input is the product name, category, pitch and differentiator."
    ],
    problem: "Starting a launch plan from a blank persona template, with no clear idea of who buys the product.",
    howItWorks: [
      "Enter the product name, category, a one-line pitch and what makes it different.",
      "Benj works out who is most likely to buy it.",
      "It sets out that buyer's age, gender, income, pain points and channels.",
      "The persona shapes the market, technique, creative and budget sections of the plan."
    ],
    benefits: [
      "You start the plan from a defined buyer rather than a guess.",
      "Every later section (markets, channels, creatives) is aimed at the same persona."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "What do I need to enter for the persona?",
        "answer": "Only your product details: its name, category, a one-line pitch and what makes it different. Benj works out the buyer from those."
      },
      {
        "question": "What does the persona include?",
        "answer": "The buyer's age, gender and income, their pain points and the channels that reach them, presented as an ideal customer profile."
      }
    ],
    relatedFeatures: ["best-market-detection", "profit-ranked-techniques"],
  }),
  f({
    slug: "best-market-detection",
    name: "Best-Market Detection",
    summary: "Finds the country and top regions to win first: India's Tier 1, 2 and 3 cities or global.",
    highlight: true,
    body: [
      "Benj chooses the country and the top regions where your product should launch first, across India's Tier 1, 2 and 3 markets (from the largest metros to smaller towns) or globally, and passes them straight into the neighbourhood-level plan.",
      "Your goal, budget and tone are also set by the AI from the product, and every one of these inputs can be edited.",
    ],
    capabilities: [
      "Recommends the country where the product should launch first.",
      "Ranks the top regions to win first, covering India's Tier 1, 2 and 3 markets or global markets.",
      "Passes the chosen regions straight into the hyperlocal (neighbourhood-level) ad map.",
      "Sets the plan's goal, budget and tone from the product automatically.",
      "Keeps every AI-set input editable, so you can override the market, budget or tone."
    ],
    problem: "Spreading a launch budget across every region at once instead of winning a few markets first.",
    howItWorks: [
      "Benj reads the product details and the likely buyer it has identified.",
      "It picks the country and ranks the top regions to target first.",
      "It proposes a goal, budget and tone for the plan.",
      "You review and edit any of these inputs before the plan is generated."
    ],
    benefits: [
      "Launch effort goes where the product is most likely to sell first.",
      "The chosen regions carry straight into targeting individual venues."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "Does Benj only plan for India?",
        "answer": "No. It is built for India and covers Tier 1, 2 and 3 markets, but it can also recommend markets globally."
      },
      {
        "question": "Can I change the budget or tone it picks?",
        "answer": "Yes. The goal, budget and tone are AI-generated from the product, and all of them can be edited."
      }
    ],
    relatedFeatures: ["hyperlocal-ad-map", "ai-buyer-persona"],
  }),
  f({
    slug: "profit-ranked-techniques",
    name: "Profit-Ranked Techniques",
    summary: "Marketing techniques chosen and ranked by profitability for your product, price and margins.",
    highlight: true,
    body: [
      "Benj picks marketing techniques the way an experienced strategist would: ranked by how profitable they are likely to be for your exact product, its price and its margins.",
      "The reasoning behind each technique is shown, so the plan follows clear logic rather than a generic checklist or random picks.",
    ],
    capabilities: [
      "Selects marketing techniques for the product automatically.",
      "Ranks techniques by likely profitability for the product's exact price and margins.",
      "Shows the reasoning behind every technique, so you can judge each recommendation.",
      "Uses the ranking to split the budget across channels."
    ],
    problem: "Generic marketing checklists, or picks made at random, that ignore what a product costs and earns.",
    howItWorks: [
      "Benj takes the product, its price and its margins into account.",
      "It selects candidate marketing techniques.",
      "It ranks them by profitability for that product.",
      "Each technique is shown with the reasoning behind its rank."
    ],
    benefits: [
      "Spend goes first to the techniques most likely to pay back for your margins.",
      "Visible reasoning makes the plan easy to explain to a team or a client."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "How are techniques ranked?",
        "answer": "By profitability for your exact product, price and margins. Benj shows the reasoning for each technique, so you can see why it ranks where it does."
      }
    ],
    relatedFeatures: ["exact-budget-split", "ai-buyer-persona"],
  }),
  f({
    slug: "hyperlocal-ad-map",
    name: "Hyperlocal Ad Map",
    summary: "Narrows down from state to city, locality and venue, and the ad type that pays back most there.",
    highlight: true,
    body: [
      "Where most tools stop at “run some Instagram ads”, Benj narrows down through country, state, city and locality to individual venues, and recommends the type of ad that pays back most at each one.",
      "At a bus stand that might be an audio announcement and a hoarding; at a mall, pamphlets and a free-sample stall. Every locality is checked against live OpenStreetMap data (a public world map), so the plan points at real places rather than guesses.",
    ],
    problem: "Generic advice such as “run some Instagram ads” that never says where, or with which ad.",
    howItWorks: [
      "Start from the market and regions chosen for the product.",
      "Narrow down state → city → locality.",
      "Pick specific venues in each locality, verified against live OpenStreetMap data.",
      "Recommend the ad types that pay back most at each venue.",
    ],
    capabilities: [
      "Narrows targeting from country to state, city, locality and finally individual venues.",
      "Recommends the ad type that pays back most at each venue: for example an audio announcement and a hoarding at a bus stand, or pamphlets and a free-sample stall at a mall.",
      "Checks every locality against live OpenStreetMap data, so the plan points to places that exist.",
      "Starts from the markets and regions chosen by Best-Market Detection.",
      "Is included in the exported PDF as the geographic ad map."
    ],
    benefits: [
      "For offline and local spending, you get a clear list of where to advertise and with what.",
      "Checking against OpenStreetMap keeps the plan tied to real places rather than invented ones."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    useCases: [
      {
        "title": "A city launch",
        "description": "A brand launching in one city gets localities and venues within it, each with the ad type recommended for that spot."
      }
    ],
    faqs: [
      {
        "question": "How does Benj know the venues are real?",
        "answer": "Every locality in the map is verified against live OpenStreetMap data."
      },
      {
        "question": "Does it only cover online ads?",
        "answer": "No. The ad map recommends formats such as hoardings, audio announcements, pamphlets and free-sample stalls at specific venues."
      }
    ],
    relatedFeatures: ["best-market-detection", "clean-pdf-report"],
  }),
  f({
    slug: "real-past-ads",
    name: "Real Past Ads",
    summary: "Actual ads that worked for your product, competitors and category, each with a takeaway and source link.",
    body: [
      "Benj shows real advertisements that have already worked for your product, your competitors and your category. They are collected live from the web rather than generated.",
      "Each ad comes with a one-line takeaway and a link to the original, so you can learn from ads that already bring in customers.",
    ],
    problem: "Generic AI suggestions that are not grounded in ads that actually ran.",
    capabilities: [
      "Finds real advertisements that worked for your product, your competitors and your category.",
      "Collects them live from the web rather than generating examples.",
      "Adds a one-line takeaway to each ad, summarising what to learn from it.",
      "Links to the original of every ad so you can check it yourself."
    ],
    howItWorks: [
      "Benj looks at your product, its competitors and its category.",
      "It collects ads that have run for them from across the web.",
      "Each ad is listed with a one-line takeaway and a link to the original."
    ],
    benefits: [
      "Creative decisions start from ads that already ran, not from guesses.",
      "Source links let you verify every example."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "Are the past ads generated by AI?",
        "answer": "No. Benj says they are real ads collected live from the web, each with a link to the original."
      }
    ],
    relatedFeatures: ["ready-to-use-creatives", "real-media-outlets"],
  }),
  f({
    slug: "real-media-outlets",
    name: "Real Media Outlets",
    summary: "The specific TV channels, podcasts, radio stations and YouTube channels your buyers watch and listen to.",
    body: [
      "Instead of advice like “try podcasts”, Benj names the specific outlets your buyers actually follow: TV channels, podcasts, radio stations and YouTube channels.",
      "Every outlet is named and comes with a link you can use to verify it.",
    ],
    problem: "Vague channel advice that never says which podcast or which channel.",
    capabilities: [
      "Names the specific TV channels your buyers watch.",
      "Names the podcasts and radio stations they listen to.",
      "Names the YouTube channels they follow.",
      "Adds a link to every outlet so you can check it.",
      "Bases the list on the buyer persona built for the product."
    ],
    howItWorks: [
      "Benj takes the buyer persona for your product.",
      "It finds the TV, podcast, radio and YouTube outlets that buyer watches or listens to.",
      "Each outlet is listed by name with a link to verify it."
    ],
    benefits: [
      "Media planning starts with a named shortlist instead of a channel category.",
      "Links let you check each outlet before you approach it."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "Which kinds of outlets are covered?",
        "answer": "TV channels, podcasts, radio stations and YouTube channels, each named and linked so you can verify it."
      }
    ],
    relatedFeatures: ["ai-buyer-persona", "real-past-ads"],
  }),
  f({
    slug: "ready-to-use-creatives",
    name: "Ready-to-use Creatives",
    summary: "Taglines, ad copy, banners and TV/radio scripts written in your brand's tone, ready to paste.",
    body: [
      "Each plan includes creatives written to launch rather than to be rewritten: taglines, ad copy, banners and scripts for TV and radio.",
      "They are written in your brand's tone and can be pasted straight into your campaigns.",
    ],
    capabilities: [
      "Writes taglines for the product.",
      "Writes ad copy ready to paste into campaigns.",
      "Produces banners.",
      "Writes scripts for TV and radio spots.",
      "Writes every creative in the brand tone set in the brief."
    ],
    howItWorks: [
      "Set or accept the brand tone in the brief.",
      "Generate the plan.",
      "Copy the taglines, ad copy, banners and scripts straight into your campaigns."
    ],
    benefits: [
      "Creatives arrive ready to use rather than as drafts to rewrite.",
      "The same tone runs through every format."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "Can I regenerate the creatives?",
        "answer": "The Pro and Agency packs include section regenerate, which lets you regenerate individual sections of a plan."
      }
    ],
    relatedFeatures: ["real-past-ads", "clean-pdf-report"],
  }),
  f({
    slug: "exact-budget-split",
    name: "Exact Budget Split",
    summary: "Your budget split across channels in rupees, with the reasoning behind it.",
    body: [
      "Benj divides your budget across channels in rupees and explains why, so you spend according to a plan based on what works for your category instead of guessing percentages.",
    ],
    capabilities: [
      "Splits your budget across the plan's channels.",
      "States each allocation as an amount in rupees rather than a percentage.",
      "Gives the reasoning behind every allocation.",
      "Bases the split on what works for the product's category."
    ],
    problem: "Guessing what percentage of a launch budget each channel should get.",
    howItWorks: [
      "The brief sets a budget, which you can edit.",
      "Benj divides it across channels using the profit-ranked techniques.",
      "Each line is shown in rupees with its reasoning."
    ],
    benefits: [
      "You know exactly how much to spend where before the campaign starts.",
      "The reasoning makes the split easy to defend with a team or client."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "Is the budget in rupees?",
        "answer": "Yes. Benj allocates the budget across channels in rupees, with the reasoning for each allocation."
      }
    ],
    relatedFeatures: ["profit-ranked-techniques", "best-market-detection"],
  }),
  f({
    slug: "clean-pdf-report",
    name: "Clean PDF Report",
    summary: "Every plan exports to a neat PDF, ready to share with your team or client.",
    body: [
      "Every Benj plan exports in one click to a polished PDF that is ready to share with a team or a client.",
      "The document brings the whole plan together (persona, channels, media outlets, the geographic ad map, creatives and budget) so it can be acted on the same day.",
    ],
    capabilities: [
      "Exports any plan to PDF in one click.",
      "Gathers the persona, channels, media outlets, geographic ad map, creatives and budget into one document.",
      "Produces a neat file ready to share with a team or a client.",
      "PDF export is included in every pack: Lite, Pro and Agency."
    ],
    howItWorks: [
      "Generate the plan from your product.",
      "Export it to PDF in one click.",
      "Share the document with your team or client."
    ],
    benefits: [
      "The whole plan travels as one file that people can act on the same day.",
      "Agencies can hand a client a finished document rather than a link to a tool."
    ],
    audience: [
      "D2C founders",
      "Marketing agencies",
      "Growth teams"
    ],
    faqs: [
      {
        "question": "What is in the PDF?",
        "answer": "The full plan: buyer persona, channels, media outlets, the geographic ad map, creatives and the budget split."
      },
      {
        "question": "Is PDF export included on the cheapest pack?",
        "answer": "Yes. The Lite pack (one report) includes PDF export and all sections."
      }
    ],
    relatedFeatures: ["hyperlocal-ad-map", "ready-to-use-creatives", "exact-budget-split"],
  }),
];

export const getbenj: Product = {
  id: "benj",
  slug: "benj",
  name: "Benj",
  shortDescription:
    "Describe a product and get a complete AI-built marketing plan as a PDF: buyer persona, best markets, channels, ad map and budget split.",
  longDescription:
    "Benj turns a short product description into a complete AI marketing plan in about 60 seconds. It is built for Indian D2C (direct-to-consumer) brands and the agencies that serve them, from a founder's first launch to an agency's hundredth.\n\nYou type only the product name, category, a one-line pitch and what makes it different. Benj then works out the buyer persona, the best country and regions, the goal, budget and tone, and profit-ranked techniques, every one of them editable.\n\nThe plan is based on real data: localities and venues are checked against live OpenStreetMap data, and past ads and media outlets are collected from the web with links to the originals. It also includes ready-to-paste creatives and a budget split in rupees.\n\nEverything exports as a PDF ready to share. Pricing is per report or by pack, with no subscription and no credit card needed to start.",
  tagline: "One product in. A complete plan out.",
  category: "sales-marketing",
  secondaryCategories: ["insights-research"],
  subcategory: "marketing-planning",
  primaryUseCase: "Marketing plans for product launches",
  audience: ["D2C founders", "Marketing agencies", "Growth teams"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://getbenj.com/",
  appUrl: "https://getbenj.com/signup",
  publisher: { name: "Benj Inc." },
  featureCategories,
  features,
  benefits: [
    { title: "A plan without a marketing team", description: "Four short steps, mostly done by AI, turn a few product details into a ready-to-launch plan. The only typing is describing the product." },
    { title: "Specific down to the venue and rupee", description: "Recommendations name the locality, the venue, the outlet and the amount to spend. You get places and numbers instead of generic channel advice." },
    { title: "Based on real-world data", description: "Venues are verified against live OpenStreetMap data, and past ads and media outlets come from the web with source links. Nothing in those sections is invented." },
    { title: "Editable at every step", description: "Market, regions, goal, budget, tone and techniques are AI-generated but can all be changed. Pro and Agency packs can also regenerate individual sections." },
    { title: "Pay only for the plans you need", description: "Reports are bought one at a time or in packs of 5 and 20, with no subscription." },
  ],
  howItWorks: [
    { title: "Add your product", description: "Name, category, a one-line pitch and what makes it different: the only typing you do." },
    { title: "AI detects your buyer", description: "Your ideal customer's age, income, pain points and channels, worked out from the product." },
    { title: "AI builds the brief", description: "Best market and regions, budget, tone and profit-ranked techniques, all generated, all editable." },
    { title: "Generate & export", description: "Creatives, real media outlets, a hyperlocal ad map and past ads, as a clean PDF." },
  ],
  productSolutions: [
    {
      slug: "d2c-product-launch",
      name: "Launch plans for D2C products",
      summary: "Go from a product description to a full launch plan covering buyer, markets, channels, ads and budget.",
      body: [
        "Benj is aimed at Indian D2C (direct-to-consumer) brands, from a founder's first launch onwards. Instead of hiring a marketing team or starting from a blank brief, a founder enters a few product details and receives a complete plan in about a minute.",
        "The plan is based on real-world data: venues checked against live OpenStreetMap data, and past ads and media outlets collected from the web.",
      ],
      workflow: [
        "Enter the product name, category, a one-line pitch and what makes it different.",
        "Benj works out the likely buyer and the best country and regions to launch in first.",
        "It builds an editable brief with goal, budget, tone and profit-ranked techniques.",
        "It generates creatives, media outlets, a hyperlocal ad map and past ads, exported as a PDF.",
      ],
      benefits: [
        "Planning without a marketing team",
        "Recommendations named down to the venue, outlet and rupee",
        "Every AI-generated input can be edited",
      ],
      audience: ["D2C founders", "Growth teams"],
      features: ["ai-buyer-persona", "best-market-detection", "profit-ranked-techniques", "hyperlocal-ad-map", "exact-budget-split", "clean-pdf-report"],
      sources: [HOME],
    },
    {
      slug: "agency-client-plans",
      name: "Client plans for marketing agencies",
      summary: "Agencies create marketing plans ready to share with clients, with packs sized for repeat use.",
      body: [
        "Benj is made for agencies as well as founders, from a first launch up to an agency's hundredth. Each plan exports as a PDF that can be shared with a client, and creatives come ready to paste into campaigns.",
      ],
      benefits: [
        "The Agency pack covers 20 reports and includes all Pro features",
        "Agency adds a team company and email support",
        "Pro features include priority generation and regenerating individual sections",
        "Plans export as PDFs ready to share with a team or client",
        "Pay per report or by pack, with no subscription",
      ],
      audience: ["Marketing agencies"],
      features: ["clean-pdf-report", "ready-to-use-creatives", "real-past-ads", "real-media-outlets"],
      sources: [HOME],
    },
  ],
  supportTopics: [
    {
      slug: "getting-started",
      name: "Getting started with Benj",
      summary: "How to create your first Benj plan, from signing up to exporting the PDF.",
      body: [
        "You can start free with no credit card, and you pay per report or buy a pack rather than subscribing. The only typing you do is describing your product; the rest of the brief is generated and can be edited.",
      ],
      steps: [
        "Sign up. No credit card is needed.",
        "Add your product: name, category, a one-line pitch and what makes it different.",
        "Review the buyer persona Benj works out from the product.",
        "Check and edit the generated brief: market and regions, budget, tone and techniques.",
        "Generate the plan and export it as a PDF.",
      ],
      features: ["ai-buyer-persona", "best-market-detection", "clean-pdf-report"],
      sources: [HOME],
    },
  ],
  pricing: {
    currency: "INR",
    unit: "report",
    note: "Pay per report or buy a pack; no subscriptions. USD prices: Lite $6, Pro $24, Agency $72.",
    asOf: "2026-10-08",
    sourceUrl: "https://getbenj.com/#pricing",
    plans: [
      { name: "Lite", price: "₹499", description: "One full report. Suits a founder planning a single launch", features: ["1 report", "PDF export", "All sections"], cta: { label: "Get started", href: "https://getbenj.com/signup" } },
      { name: "Pro", price: "₹1,999", description: "5 reports. Save 20%. Suits brands planning several products or launches", features: ["5 reports", "PDF export", "Priority generation", "Section regenerate"], cta: { label: "Choose Pro", href: "https://getbenj.com/signup" }, recommended: true },
      { name: "Agency", price: "₹5,999", description: "20 reports. Save 40%. Suits agencies producing plans for many clients", features: ["20 reports", "All Pro features", "Team company", "Email support"], cta: { label: "Choose Agency", href: "https://getbenj.com/signup" } },
    ],
  },
  useCases: [
    { title: "Launching a new D2C product", description: "Start from a product description and get a plan covering who to target, where, through which channels and with what budget." },
    { title: "Agencies planning for clients", description: "Create ready-to-share plans for several clients from one account; the Agency pack covers 20 reports." },
    { title: "Planning local and offline promotion", description: "Use the hyperlocal ad map to decide which localities and venues to target and which ad type (such as hoardings or sample stalls) to use at each." },
    { title: "Choosing media to buy", description: "Get a named list of TV channels, podcasts, radio stations and YouTube channels your buyers follow, each with a link to check it." },
  ],
  faqs: [
    { question: "Is Benj a subscription?", answer: "No. You pay per report or buy a pack of 5 or 20 reports, and no credit card is needed to get started." },
    { question: "What does a plan include?", answer: "A buyer persona, best markets, profit-ranked techniques, a hyperlocal ad map, real past ads, media outlets, creatives and a budget split, exported as a PDF." },
    { question: "Which channels does it plan for?", answer: "Google, Instagram, WhatsApp, Facebook, YouTube and LinkedIn." },
    { question: "How long does a plan take?", answer: "Benj says it goes from a product to a full plan in about 60 seconds." },
    { question: "What do I need to type?", answer: "Only the product name, category, a one-line pitch and what makes it different. The buyer, markets, budget, tone and techniques are then generated, and you can edit all of them." },
    { question: "How much does it cost?", answer: "Lite is ₹499 (USD $6) for one report, Pro ₹1,999 (USD $24) for five reports, and Agency ₹5,999 (USD $72) for 20 reports. Pro saves 20% and Agency 40% against single reports." },
    { question: "What do Pro and Agency add?", answer: "Pro adds priority generation and section regenerate on top of PDF export. Agency includes all Pro features plus a team company and email support." },
    { question: "Where does the data come from?", answer: "Localities and venues are verified against live OpenStreetMap data, and past ads and media outlets are collected from the web, each with a link to the original." },
    { question: "Is it only for India?", answer: "Benj is built for Indian direct-to-consumer (D2C) brands and plans for India's Tier 1, 2 and 3 markets, but Best-Market Detection can also recommend markets globally." },
  ],
  solutions: ["prepare-for-launch-and-fundraising"],
  industries: ["startups-and-investors", "media-creative-agencies"],
  sources: [HOME],
  lastVerified: "2026-10-08",
};
