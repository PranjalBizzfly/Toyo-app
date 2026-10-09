import { getResourceTypeFaqs } from "@/lib/faqs";
import { notFound } from "next/navigation";
import { ResourcesHubTemplate } from "@/components/templates/EntityTemplates";
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
    <ResourcesHubTemplate
      faqs={getResourceTypeFaqs(t.type, t.label)}
      crumbs={[
        { name: "Resources", href: routes.resources() },
        { name: t.label, href: routes.resourceType(t.type) },
      ]}
      title={t.label}
      lead={t.description}
      activeCategory={t.label}
      items={getResources(t.type).map((r) => ({
        name: r.name,
        summary: r.summary,
        href: routes.resource(r.type, r.slug),
        meta: t.label,
        date: new Date(r.publishedAt).toLocaleDateString("en", { dateStyle: "medium" }),
        author: r.author,
      }))}
      categories={resourceTypes.map((r) => ({ label: r.label, href: routes.resourceType(r.type), description: r.description }))}
      emptyTitle={`No ${t.label.toLowerCase()} yet`}
      emptyText="New content will appear here as it's published."
    />
  );
}
