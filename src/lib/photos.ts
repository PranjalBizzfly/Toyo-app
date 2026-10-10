/**
 * Project-owned photos for inner pages, each with alt text that describes what
 * the photo actually shows (not the page topic). Every file lives in
 * public/images and is WebP. See docs/TOYOAPPS_IMAGE_AUDIT.md.
 */
import { getProduct } from "@/lib/catalog";
import { inActionPhoto } from "@/lib/in-action";

export type Photo = { src: string; alt: string };

/** Folder name under public/images/products when it differs from the product slug. */
const FOLDER: Record<string, string> = { getbenj: "benj" };

const CATEGORY: Record<string, string> = {
  "sales-marketing": "Indian sales manager guiding his team at their desks in a busy open-plan office",
  "hr-people": "HR manager walking a new hire through her onboarding papers and laptop",
  "operations-it": "IT operations team reviewing system monitors in a network operations room",
  "finance-compliance": "Chartered accountant and colleague reviewing client spreadsheets beside stacked case files",
  "insights-research": "Manager reviewing an end-of-day report on a tablet with an employee",
};

export function categoryPhoto(slug: string | undefined): Photo | undefined {
  return slug && CATEGORY[slug] ? { src: `/images/categories/${slug}.webp`, alt: CATEGORY[slug] } : undefined;
}

/** The product's own "in action" photo (people doing the job the product supports). */
export function productPhoto(slug: string): Photo | undefined {
  return inActionPhoto(FOLDER[slug] ?? slug) ?? inActionPhoto(slug);
}

/** Best photo for a product page: its own photo, else its category's photo. */
export function photoForProduct(slug: string): Photo | undefined {
  return productPhoto(slug) ?? categoryPhoto(getProduct(slug)?.category);
}
