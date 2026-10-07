import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { getComparisons } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const items = () => getComparisons().map((s) => ({ name: s.name, summary: s.summary, href: routes.comparison(s.slug) }));

export const metadata = buildMetadata({
  title: "Compare products",
  description: "Side-by-side comparisons to help you choose the right ToyoApps product.",
  path: routes.compare(),
  status: items().length ? "live" : "draft",
});

export default function ComparePage() {
  return (
    <HubPageTemplate
      crumbs={[{ name: "Compare", href: routes.compare() }]}
      eyebrow="Compare"
      title="Which ToyoApps product is right for you?"
      lead="Side-by-side comparisons based on real product capabilities."
      items={items()}
      emptyTitle="Comparisons are coming"
      emptyText="Need help choosing now? Contact our team and we'll recommend the right products."
    />
  );
}
