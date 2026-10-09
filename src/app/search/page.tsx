import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import "../catalog-zoho.css";
import "./search.css";
import { SearchClient, type SearchBrowse } from "@/components/SearchClient";
import { getCategories, getFeaturedProducts, getIndustries, getIntegrations, getProducts, getProductsByCategory, getSolutions } from "@/lib/catalog";
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
 * Popular searches: the categories' topic tags (subcategory names), or their
 * parts when the full tag finds nothing. Each term is run against the real
 * index and kept only when every word matches at least one result.
 */
function popularSearches(index: ReturnType<typeof buildSearchIndex>): string[] {
  const works = (t: string) => {
    const { results, mode } = rank(index, t);
    return mode === "all" && results.length > 0;
  };
  const out: string[] = [];
  for (const c of getCategories())
    for (const s of c.subcategories ?? []) {
      const term = works(s.name) ? s.name : s.name.split(/\s*&\s*/).find((p) => p.split(/\s+/).length <= 2 && works(p));
      if (term && !out.some((o) => o.toLowerCase() === term.toLowerCase())) out.push(term.charAt(0).toUpperCase() + term.slice(1));
    }
  return out.slice(0, 10);
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
