import { notFound } from "next/navigation";
import { ProductPageTemplate } from "@/components/templates/ProductPageTemplate";
import { getProduct } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ product: string }> };

export async function generateMetadata({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) return {};
  return buildMetadata({
    ...product,
    title: product.primaryUseCase ? `${product.name}: ${product.primaryUseCase}` : product.name,
    description: product.shortDescription,
    path: routes.product(product.slug),
    ogImage: product.ogImage ?? product.heroImage?.src,
  });
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();
  return <ProductPageTemplate product={product} />;
}
