import { notFound } from "next/navigation";
import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { getResources } from "@/lib/catalog";
import { resourceTypes, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ type: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => resourceTypes.map((r) => ({ type: r.type }));
const find = async (p: Props["params"]) => {
  const { type } = await p;
  return resourceTypes.find((r) => r.type === type);
};

export async function generateMetadata({ params }: Props) {
  const t = await find(params);
  if (!t) return {};
  return buildMetadata({
    title: `${t.label} — ToyoApps resources`,
    description: t.description,
    path: routes.resourceType(t.type),
    status: getResources(t.type).length ? "live" : "draft",
  });
}

export default async function ResourceTypePage({ params }: Props) {
  const t = await find(params);
  if (!t) notFound();
  return (
    <HubPageTemplate
      crumbs={[
        { name: "Resources", href: routes.resources() },
        { name: t.label, href: routes.resourceType(t.type) },
      ]}
      eyebrow="Resources"
      title={t.label}
      lead={t.description}
      items={getResources(t.type).map((r) => ({ name: r.name, summary: r.summary, href: routes.resource(r.type, r.slug) }))}
      emptyTitle={`No ${t.label.toLowerCase()} yet`}
      emptyText="New content will appear here as it's published."
    />
  );
}
