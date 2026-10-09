import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { BlogHubFilter } from "@/components/company/BlogHubFilter";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getCategories, getResources } from "@/lib/catalog";
import { getLearningItems } from "@/lib/learning";
import { resourceTypes, routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";
import "@/app/company-pages.css";

/**
 * Canonical blog hub. /resources/blog permanently redirects here
 * (next.config.ts). Posts come only from the `blog` resources registry; until
 * real articles exist, the hub lists the guides and support topics already in
 * product data, linked to their existing pages.
 */
export const metadata = buildMetadata({
  title: "Blog",
  description: "The ToyoApps blog: guides and support topics for every ToyoApps product, grouped by product and business category.",
  path: routes.blog(),
});

export default function BlogPage() {
  const posts = getResources("blog");
  const items = getLearningItems();
  const used = new Set(items.map((i) => i.categorySlug));
  const categories = getCategories()
    .filter((c) => used.has(c.slug))
    .map((c) => ({ slug: c.slug, name: c.name }));
  const productCount = new Set(items.map((i) => i.productSlug)).size;

  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Company", href: routes.company() }, { name: "Blog", href: routes.blog() }]} />
          <p className="co-hero__label">Blog</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">The ToyoApps blog</h1>
          <p className="co-hero__lead co-hero__lead--max">
            Guides and how-tos across the ToyoApps ecosystem: {items.length} guides and support topics for {productCount} products, organised by product and business category.
          </p>
          <ImageSlot src="/images/company/blog-hero.webp" alt="Guides and articles from across the ToyoApps ecosystem" width={1200} height={420} priority className="co-hero__art" />
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="co-band">
          <div className="co-wrap">
            <div className="co-band__head">
              <p className="co-eyebrow">Articles</p>
              <h2 className="co-h2">Latest posts</h2>
            </div>
            <ul className="cp-grid">
              {posts.map((r) => (
                <li key={r.slug} className="cp-card">
                  <p className="cp-card__meta">{new Date(r.publishedAt).toLocaleDateString("en", { dateStyle: "medium" })}</p>
                  <h3><Link href={routes.resource(r.type, r.slug)}>{r.name}</Link></h3>
                  <p>{r.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="co-band">
          <div className="co-wrap co-split">
            <div>
              <p className="co-eyebrow">Articles</p>
              <h2>Articles coming soon</h2>
              <p>
                The ToyoApps team hasn&apos;t published blog articles yet. Until then, this hub collects the real guides and support topics from each product&apos;s pages, so you can find setup help and answers in one place.
              </p>
            </div>
            <div className="cp-card">
              <h3>Categories</h3>
              <ul className="cp-list">
                {resourceTypes
                  .filter((t) => t.type !== "blog")
                  .map((t) => (
                    <li key={t.type}>
                      <strong>{t.label}</strong> <span className="blog-topic__desc">{t.description}</span>
                    </li>
                  ))}
              </ul>
              <div className="cp-card__foot">
                <Link className="co-link" href={routes.resources()}>Resource centre ›</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Guides &amp; support topics</p>
            <h2 className="co-h2">Browse by product and category</h2>
            <p>Search or pick a business category. Each item opens its existing page on the product&apos;s site section.</p>
          </div>
          <BlogHubFilter items={items} categories={categories} />
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Can&apos;t find what you need?</h2>
          <p>Each product has its own support page, and the ToyoApps team can point you in the right direction.</p>
          <div className="co-btns">
            <Link className="co-btn" href={routes.support()}>Help &amp; support</Link>
            <Link className="co-btn co-btn--ghost" href={routes.contactForm()}>Contact us</Link>
          </div>
        </div>
      </section>
      <PageFaqs faqs={getSiteFaqs("blog")} />
    </>
  );
}
