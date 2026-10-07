"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ProductNavItem {
  label: string;
  href: string;
}

/**
 * Product-specific secondary navigation. Sits under the global header and
 * lists only the sections this product actually has.
 */
export function ProductNav({
  brand,
  items,
  cta,
}: {
  brand: React.ReactNode;
  items: ProductNavItem[];
  cta: ProductNavItem;
}) {
  const pathname = usePathname();
  const isCurrent = (href: string, i: number) =>
    i === 0 ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="product-nav" aria-label="Product">
      <div className="container product-nav__bar">
        {brand}
        <div className="product-nav__links">
          {items.map((item, i) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href, i) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link href={cta.href} className="btn btn--primary btn--sm">
          {cta.label}
        </Link>
      </div>
    </nav>
  );
}
