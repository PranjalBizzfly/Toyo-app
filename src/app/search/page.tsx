import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import "../catalog-zoho.css";
import "./search.css";
import { SearchClient, type SearchBrowse } from "@/components/SearchClient";
import { getCategories, getFeaturedProducts, getIndustries, getIntegrations, getProducts, getProductsByCategory, getSolutions, groupFeatures } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildSearchIndex } from "@/lib/search-index";
import { rank } from "@/lib/search-score";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Search ToyoApps: products, features, solutions and more",
    description:
      "One search across every ToyoApps product, feature, solution, industry, integration, resource and FAQ. Browse by category or type what your business needs.",
    path: "/search",
  }),
  // Result pages are a utility, not content; the page stays crawlable for its links.
  robots: { index: false, follow: true },
};

/**
 * Popular searches: topics taken from the products' feature-group names, kept
 * only when the query returns results from at least two products, ranked by
 * how many products it reaches. Every term is checked against the real index.
 */
function popularSearches(index: ReturnType<typeof buildSearchIndex>): string[] {
  const topics = new Set<string>();
  for (const p of getProducts())
    for (const g of groupFeatures(p))
      for (const part of g.group.name.split(/\s*(?:&|,|\band\b)\s*/i)) {
        const t = part.trim();
        if (t && t.split(/\s+/).length <= 2) topics.add(t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
      }
  return [...topics]
    .map((t) => {
      const { results, mode } = rank(index, t);
      return { t, n: results.length, reach: mode === "all" ? new Set(results.map((r) => r.e.productSlug).filter(Boolean)).size : 0 };
    })
    .filter((x) => x.reach >= 2)
    .sort((a, b) => b.reach - a.reach || b.n - a.n || a.t.localeCompare(b.t))
    .slice(0, 8)
    .map((x) => x.t);
}

export default function SearchPage() {
  // The full index is fetched from /search/index.json on the client; here it only feeds counts and checks.
  const index = buildSearchIndex();
  const products = getProducts();
  const browse: SearchBrowse = {
    categories: getCategories()
      .map((c) => ({ slug: c.slug, name: c.name, tagline: c.tagline, icon: c.icon, href: routes.category(c.slug), count: getProductsByCategory(c.slug).length }))
      .filter((c) => c.count > 0),
    products: products.map((p) => ({ slug: p.slug, name: p.name })),
    featured: [
      ...getFeaturedProducts(4).map((p) => ({ label: p.name, href: routes.product(p.slug), note: p.primaryUseCase ?? p.tagline, kind: "Product" })),
      ...getSolutions()
        .slice(0, 2)
        .map((s) => ({ label: s.name, href: routes.solution(s.slug), note: s.summary, kind: "Solution" })),
    ],
    popular: popularSearches(index),
    solutions: getSolutions().map((s) => ({ slug: s.slug, name: s.name })),
    industries: getIndustries().map((i) => ({ slug: i.slug, name: i.name })),
    integrations: getIntegrations().map((i) => ({ slug: i.slug, name: i.name })),
    total: index.length,
  };

  return (
    <>
      <SearchClient browse={browse} />
      <PageFaqs faqs={getSiteFaqs("search")} />
    </>
  );
}
