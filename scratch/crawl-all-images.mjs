import { chromium } from "playwright";
import fs from "node:fs";

process.env.PLAYWRIGHT_BROWSERS_PATH = "./.pw-browsers";

const base = "http://localhost:3000";

// Define the comprehensive list of inner pages to audit
const routesToAudit = [
  // Company & info
  "/about-toyoapps",
  "/become-a-toyoapps-vendor",
  "/publish-and-sell-your-saas",
  "/support",
  "/blog",
  "/careers",
  "/media-and-news",
  "/press-kit",
  
  // Catalog & Categories
  "/products",
  "/compare-products",
  "/products/category/sales-marketing",
  "/products/category/operations-it",
  "/products/category/hr-people",
  "/products/category/finance-compliance",
  "/products/category/insights-research",

  // Solutions
  "/solutions",
  "/solutions/streamline-daily-business-operations",
  "/solutions/manage-your-people-from-hire-to-growth",
  "/solutions/prepare-for-launch-and-fundraising",

  // Industries
  "/industries",
  "/industries/accounting-tax-practices",
  "/industries/media-creative-agencies",
  "/industries/startups-and-investors",

  // Integrations
  "/integrations",
  "/integrations/google-workspace",
  "/integrations/whatsapp",
  "/integrations/google-contacts",
  "/integrations/google-drive",

  // Products
  "/products/hrmagix",
  "/products/sibu",
  "/products/taskmagic",
  "/products/cardizo",
  "/products/sizoru",
  "/products/fleetras",
  "/products/trackysuite",
  "/products/sigchanger",
  "/products/meetingmind",
  "/products/fantom",
  "/products/oda7",
  "/products/benj",
  "/products/zapbuzzer",
  "/products/zorfly",
  "/products/zuzu",
  "/products/tracksuit",

  // Feature Hubs & Feature Pages
  "/products/hrmagix/features",
  "/products/sibu/features",
  "/products/trackysuite/features",
  "/products/hrmagix/features/group/payroll",
  "/products/sibu/features/group/collaboration",
  "/products/cardizo/features/ai-card-scanning",
  "/products/sibu/features/visual-tagging-search"
];

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const results = [];

  for (const path of routesToAudit) {
    try {
      const url = base + path;
      const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      if (!resp || resp.status() >= 400) {
        console.log(`[SKIP ${resp ? resp.status() : 'ERR'}] ${path}`);
        continue;
      }

      const pageTitle = await page.title();
      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs.map((img) => {
          // Find closest section or header
          const section = img.closest("section, header, article, div[class*='sec'], div[class*='hero']");
          const heading = section ? section.querySelector("h1, h2, h3")?.innerText : "";
          const pText = section ? section.querySelector("p")?.innerText : "";
          return {
            src: img.getAttribute("src"),
            currentSrc: img.currentSrc,
            alt: img.getAttribute("alt"),
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            visible: img.offsetWidth > 0 && img.offsetHeight > 0,
            heading: heading || "",
            context: (pText || "").slice(0, 100),
            className: img.className
          };
        });
      });

      console.log(`Audited ${path} - found ${images.length} images`);
      results.push({ path, pageTitle, images });
    } catch (err) {
      console.error(`Error on ${path}:`, err.message);
    }
  }

  await browser.close();

  fs.writeFileSync("scratch/audit-results.json", JSON.stringify(results, null, 2));
  console.log(`Saved results to scratch/audit-results.json`);
}

run();
