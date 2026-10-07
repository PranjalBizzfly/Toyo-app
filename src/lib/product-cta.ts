import type { Cta, Product } from "@/content/types";

/**
 * CTA hierarchy for a product (Zoho study §26, adapted):
 * 1. explicit `primaryCta`
 * 2. sign-up on the product's own site (`appUrl`)
 * 3. the product's official website
 * The secondary CTA is always the official website unless it is already primary.
 */
export function getProductCtas(product: Product): { primary: Cta; secondary?: Cta } {
  const website: Cta = { label: `Visit ${product.name}`, href: product.websiteUrl };
  if (product.primaryCta) return { primary: product.primaryCta, secondary: website };
  if (product.appUrl) return { primary: { label: "Get started", href: product.appUrl }, secondary: website };
  return { primary: website };
}

export const platformLabels: Record<string, string> = {
  web: "Web",
  android: "Android",
  ios: "iOS",
  windows: "Windows",
  mac: "macOS",
  chrome: "Chrome",
};
