"use client";

import { usePathname } from "next/navigation";

/**
 * One page, one footer. Product pages (/products/{slug} and everything under
 * it) mount their own ProductFooter from the product layout, so the global
 * footer is not mounted there at all. Every other route gets the global footer.
 */
export function FooterResolver({ productSlugs, children }: { productSlugs: string[]; children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const [, root, slug] = pathname.split("/");
  const isProductPage = root === "products" && !!slug && productSlugs.includes(slug);
  return isProductPage ? null : <>{children}</>;
}
