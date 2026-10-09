import { notFound } from "next/navigation";
import { FeaturePageTemplate } from "@/components/templates/FeaturePageTemplate";
import { featureHasPage, getFeature, getFeatures, getProduct, getProducts, isIndexable } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ product: string; feature: string }> };

export const dynamicParams = false;

/** Only features with real page content get a route. */
export function generateStaticParams() {
  return getProducts().flatMap((p) =>
    getFeatures(p)
      .filter(featureHasPage)
      .map((f) => ({ product: p.slug, feature: f.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { product: ps, feature: fs } = await params;
  const product = getProduct(ps);
  const feature = product && getFeature(product, fs);
  if (!product || !feature) return {};
  return buildMetadata({
    ...feature,
    title: `${feature.name} | ${product.name}`,
    description: feature.summary,
    path: routes.feature(product.slug, feature.slug),
    // Noindex if either the product or the feature isn't published.
    status: isIndexable(product.status) ? feature.status : product.status,
  });
}

export default async function FeaturePage({ params }: Props) {
  const { product: ps, feature: fs } = await params;
  const product = getProduct(ps);
  const feature = product && getFeature(product, fs);
  if (!product || !feature) notFound();
  return <FeaturePageTemplate product={product} feature={feature} />;
}
