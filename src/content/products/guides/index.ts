import type { ProductResource } from "@/content/types";

/**
 * ToyoApps-written guides per product slug (author: "toyoapps"), merged into each
 * product's productResources by the product registry. One file per product in this
 * folder; register it here. Guides give general practice for the product's field and
 * never attribute features to the product beyond what its official sources state.
 */
export const productGuides: Record<string, ProductResource[]> = {};
