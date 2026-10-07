import type { Metadata } from "next";
import { site } from "@/content/site";
import type { ContentStatus, SeoFields } from "@/content/types";
import { isIndexable } from "./catalog";

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

interface BuildMetadataInput extends SeoFields {
  /** Fallback title when `seoTitle` is not set. "| ToyoApps" is appended by the layout template. */
  title: string;
  description: string;
  path: string;
  status?: ContentStatus;
  type?: "website" | "article";
}

/**
 * The one way pages produce metadata: unique title + description, canonical,
 * Open Graph/Twitter, and noindex for anything that isn't real published content.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = input.seoTitle ?? input.title;
  const description = input.seoDescription ?? input.description;
  const canonical = input.canonicalUrl ?? absoluteUrl(input.path);
  const indexable = isIndexable(input.status);
  return {
    title,
    description,
    keywords: input.seoKeywords,
    alternates: { canonical },
    robots: indexable ? undefined : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type: input.type ?? "website",
      images: input.ogImage ? [{ url: absoluteUrl(input.ogImage) }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
