import { ResourcesHubTemplate } from "@/components/templates/EntityTemplates";
import { getResources } from "@/lib/catalog";
import { resourceTypes, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const label = (t: string) => resourceTypes.find((r) => r.type === t)?.label ?? t;
const fmt = (d: string) => new Date(d).toLocaleDateString("en", { dateStyle: "medium" });
const items = () =>
  getResources()
    .slice(0, 12)
    .map((r) => ({
      name: r.name,
      summary: r.summary,
      href: routes.resource(r.type, r.slug),
      meta: label(r.type),
      date: fmt(r.publishedAt),
      author: r.author,
    }));

export const metadata = buildMetadata({
  title: "Resource centre",
  description: "Guides, tutorials, case studies, reports and product updates from ToyoApps.",
  path: routes.resources(),
  status: getResources().length ? "live" : "draft",
});

export default function ResourcesPage() {
  return (
    <ResourcesHubTemplate
      crumbs={[{ name: "Resources", href: routes.resources() }]}
      title="Learn, compare and get more from your software"
      lead="Guides, tutorials, case studies, reports and product updates across the ToyoApps ecosystem, organised by type so you can find setup help or background reading quickly."
      items={items()}
      categories={resourceTypes.map((r) => ({ label: r.label, href: routes.resourceType(r.type), description: r.description }))}
      emptyTitle="First articles coming soon"
      emptyText="We're preparing guides and tutorials for ToyoApps products. Until then, each product's own support and feature pages explain how it works."
    />
  );
}
