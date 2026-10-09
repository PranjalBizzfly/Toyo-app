import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import "../catalog-zoho.css";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Breadcrumbs, CtaBand } from "@/components/ui/primitives";
import { getCatalogTree, getComparisons } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compare products",
  description: "Side-by-side comparisons to help you choose the right ToyoApps product.",
  path: routes.compare(),
  status: getComparisons().length ? "live" : "draft",
});

/**
 * Comparison index, laid out like Zoho's compare hub: light intro, a blue band
 * with the comparison cards in a raised white panel, then the full A–Z list.
 * With no comparisons yet, the band shows the catalog by category instead.
 */
export default function ComparePage() {
  const comparisons = getComparisons();
  const tree = getCatalogTree();

  return (
    <>
      <header className="zc-intro">
        <div className="container">
          <Breadcrumbs items={[{ name: "Compare", href: routes.compare() }]} />
          <p className="zc-intro__pre">Got a business need?</p>
          <h1>Which ToyoApps product is right for you?</h1>
          <hr className="zc-rule zc-rule--accent" />
          <p className="zc-intro__lead">Side-by-side comparisons based on real product capabilities.</p>
          <ImageSlot src="/images/catalog/compare-hero.webp" alt="Choosing between ToyoApps products" width={840} height={370} priority className="zc-intro__art" />
        </div>
      </header>

      <section className="zc-band">
        <div className="container">
          <h2 className="zc-band__title">{comparisons.length ? "Explore how our products are different" : "Comparisons are coming"}</h2>
          <hr className="zc-rule" />
          <p className="zc-band__kicker">{comparisons.length ? "Product comparisons" : "Need help choosing now? Browse by category or contact our team."}</p>
          <div className="zc-panel">
            {comparisons.length
              ? comparisons.slice(0, 3).map((c) => (
                  <Link key={c.slug} href={routes.comparison(c.slug)} className="zc-vs">
                    <span className="zc-vs__subject">{c.subjects[0]}</span>
                    <span className="zc-vs__sep" aria-hidden>
                      <span>VS</span>
                    </span>
                    <span className="zc-vs__subject">{c.subjects.slice(1).join(" · ")}</span>
                    <span className="zc-vs__desc">{c.summary}</span>
                  </Link>
                ))
              : tree.slice(0, 3).map(({ category, products }) => (
                  <Link key={category.slug} href={routes.category(category.slug)} className="zc-vs">
                    <span className="zc-vs__subject">{category.name}</span>
                    <span className="zc-vs__sep" aria-hidden>
                      <span>{products.length}</span>
                    </span>
                    <span className="zc-vs__desc">{products.map((p) => p.name).join(" · ")}</span>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      <section className="zc-all">
        <div className="container">
          <h2 className="zc-all__title">{comparisons.length ? "All comparisons" : "Browse by category"}</h2>
          <ul className="zc-all__list">
            {comparisons.length
              ? comparisons.map((c) => (
                  <li key={c.slug}>
                    <Link href={routes.comparison(c.slug)}>
                      <strong>{c.name}</strong>
                      <span>{c.summary}</span>
                    </Link>
                  </li>
                ))
              : tree.map(({ category, products }) => (
                  <li key={category.slug}>
                    <Link href={routes.category(category.slug)}>
                      <strong>{category.name}</strong>
                      <span>
                        {products.length} {products.length === 1 ? "product" : "products"} · {category.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </section>
      <PageFaqs faqs={getSiteFaqs("compare")} />

      <CtaBand
        title="Find the right software for your business."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact sales", href: routes.contact() }}
      />
    </>
  );
}
