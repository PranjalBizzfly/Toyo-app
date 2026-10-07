import { notFound } from "next/navigation";
import { ResourcePageTemplate } from "@/components/templates/EntityTemplates";
import { getResources } from "@/lib/catalog";
import { resourceTypes, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ type: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => getResources().map((r) => ({ type: r.type, slug: r.slug }));

async function find(params: Props["params"]) {
  const { type, slug } = await params;
  return getResources().find((r) => r.type === type && r.slug === slug);
}

export async function generateMetadata({ params }: Props) {
  const r = await find(params);
  return r
    ? buildMetadata({ ...r, title: r.name, description: r.summary, path: routes.resource(r.type, r.slug), type: "article" })
    : {};
}

export default async function ResourcePage({ params }: Props) {
  const r = await find(params);
  if (!r) notFound();
  const typeLabel = resourceTypes.find((t) => t.type === r.type)?.label ?? r.type;
  return <ResourcePageTemplate resource={r} typeLabel={typeLabel} />;
}
