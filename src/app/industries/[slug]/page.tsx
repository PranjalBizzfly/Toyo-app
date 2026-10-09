import { notFound } from "next/navigation";
import { IndustryPageTemplate } from "@/components/templates/EntityTemplates";
import { getIndustries } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => getIndustries().map((s) => ({ slug: s.slug }));
const find = async (p: Props["params"]) => {
  const { slug } = await p;
  return getIndustries().find((s) => s.slug === slug);
};

export async function generateMetadata({ params }: Props) {
  const s = await find(params);
  return s ? buildMetadata({ ...s, title: s.name, description: s.summary, path: routes.industry(s.slug) }) : {};
}

export default async function IndustryPage({ params }: Props) {
  const s = await find(params);
  if (!s) notFound();
  return <IndustryPageTemplate industry={s} />;
}
