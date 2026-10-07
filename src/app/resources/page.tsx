import Link from "next/link";
import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/primitives";
import { getResources } from "@/lib/catalog";
import { resourceTypes, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const label = (t: string) => resourceTypes.find((r) => r.type === t)?.label ?? t;
const items = () =>
  getResources()
    .slice(0, 12)
    .map((r) => ({ name: r.name, summary: r.summary, href: routes.resource(r.type, r.slug), meta: label(r.type) }));

export const metadata = buildMetadata({
  title: "Resource centre",
  description: "Guides, tutorials, case studies, reports and product updates from ToyoApps.",
  path: routes.resources(),
  status: getResources().length ? "live" : "draft",
});

export default function ResourcesPage() {
  return (
    <HubPageTemplate
      crumbs={[{ name: "Resources", href: routes.resources() }]}
      eyebrow="Resources"
      title="Learn, compare and get more from your software"
      lead="Guides, tutorials, case studies and updates across the ToyoApps ecosystem."
      items={items()}
      emptyTitle="First articles coming soon"
      emptyText="We're preparing guides and tutorials for ToyoApps products."
    >
      <Section tight>
        <div className="grid" style={{ ["--min" as string]: "220px" }}>
          {resourceTypes.map((r) => (
            <Link key={r.type} href={routes.resourceType(r.type)} className="card">
              <h2 className="card__title">{r.label}</h2>
              <p className="text-muted">{r.description}</p>
              <span className="card__foot">
                Browse <Icon name="arrow-right" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </HubPageTemplate>
  );
}
