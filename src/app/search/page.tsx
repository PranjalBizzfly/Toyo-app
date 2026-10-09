import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import "../catalog-zoho.css";
import "./search.css";
import { SearchClient, type SearchBrowse } from "@/components/SearchClient";
import { getCategories, getFeaturedProducts, getIndustries, getIntegrations, getProducts, getProductsByCategory, getSolutions } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildSearchIndex } from "@/lib/search-index";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Search the ToyoApps ecosystem — products, features, solutions and more",
    description:
      "One search across every ToyoApps product, feature, solution, industry, integration, resource and FAQ. Browse by category or type what your business needs.",
    path: "/search",
  }),
  // Result pages are a utility, not content; the page stays crawlable for its links.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  // Counts only; the full index is fetched from /search/index.json on the client.
  const index = buildSearchIndex();
  const products = getProducts();
  const browse: SearchBrowse = {
    categories: getCategories().map((c) => ({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline,
      icon: c.icon,
      href: routes.category(c.slug),
      count: getProductsByCategory(c.slug).length,
    })),
    products: products.map((p) => ({ slug: p.slug, name: p.name })),
    featured: getFeaturedProducts(6).map((p) => ({ label: p.name, href: routes.product(p.slug), note: p.primaryUseCase ?? p.tagline })),
    solutions: getSolutions().map((s) => ({ slug: s.slug, name: s.name, href: routes.solution(s.slug) })),
    industries: getIndustries().map((i) => ({ slug: i.slug, name: i.name, href: routes.industry(i.slug) })),
    integrations: getIntegrations().map((i) => ({ slug: i.slug, name: i.name })),
    counts: {
      products: products.length,
      features: index.filter((e) => e.type === "Feature").length,
      faqs: index.filter((e) => e.type === "FAQ").length,
      integrations: getIntegrations().length,
    },
  };

  return (
    <>
      <SearchClient browse={browse} />
      <PageFaqs faqs={getSiteFaqs("search")} />
    </>
  );
}
