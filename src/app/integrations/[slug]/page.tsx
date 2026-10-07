import { notFound } from "next/navigation";
import { IntegrationPageTemplate } from "@/components/templates/EntityTemplates";
import { getIntegrations, integrationHasPage } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
// Only integrations with written content get a page.
export const generateStaticParams = () => getIntegrations().filter(integrationHasPage).map((s) => ({ slug: s.slug }));
const find = async (p: Props["params"]) => {
  const { slug } = await p;
  return getIntegrations().find((s) => s.slug === slug && integrationHasPage(s));
};

export async function generateMetadata({ params }: Props) {
  const s = await find(params);
  return s ? buildMetadata({ ...s, title: `${s.name} integration`, description: s.summary, path: routes.integration(s.slug) }) : {};
}

export default async function IntegrationPage({ params }: Props) {
  const s = await find(params);
  if (!s) notFound();
  return <IntegrationPageTemplate integration={s} />;
}
