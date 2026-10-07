import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { getIndustries } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const items = () => getIndustries().map((s) => ({ name: s.name, summary: s.summary, href: routes.industry(s.slug) }));

export const metadata = buildMetadata({
  title: "Software by industry",
  description: "ToyoApps products matched to how your industry works.",
  path: routes.industries(),
  status: items().length ? "live" : "draft",
});

export default function IndustriesPage() {
  return (
    <HubPageTemplate
      crumbs={[{ name: "Industries", href: routes.industries() }]}
      eyebrow="Industries"
      title="Software matched to how your industry works"
      lead="Find the ToyoApps products that fit the way your sector operates."
      items={items()}
      emptyTitle="Industry pages are on the way"
      emptyText="We're validating which ToyoApps products fit each industry. Browse products by category in the meantime."
    />
  );
}
