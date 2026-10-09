import { getSiteFaqs } from "@/lib/faqs";
import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { getIndustries, productsFor } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const items = () => getIndustries().map((s) => ({
    name: s.name,
    summary: s.summary,
    href: routes.industry(s.slug),
    icon: s.icon,
    meta: productsFor(s.products).map((p) => p.name).join(" · ") || undefined,
    points: s.challenges?.slice(0, 3),
  }));

export const metadata = buildMetadata({
  title: "Software by industry",
  description: "ToyoApps products matched to how your industry works.",
  path: routes.industries(),
  status: items().length ? "live" : "draft",
});

export default function IndustriesPage() {
  return (
    <HubPageTemplate
      faqs={getSiteFaqs("industries")}
      crumbs={[{ name: "Industries", href: routes.industries() }]}
      eyebrow="Industries"
      title="Software matched to how your industry works"
      lead="Some ToyoApps products are built for a specific sector — such as practice management for Indian CA, CS and tax firms. Each industry page lists the challenges it addresses and the products that fit."
      items={items()}
      listTitle="Industries"
      listLead="An industry is listed only where a product is built for it or explicitly serves it, according to the product's own published information."
      emptyTitle="Industry pages are on the way"
      emptyText="We're validating which ToyoApps products fit each industry. Browse products by category in the meantime."
    />
  );
}
