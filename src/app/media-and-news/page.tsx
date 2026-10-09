import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site } from "@/content/site";
import { getCatalogTree } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { monogram, productAccent } from "@/lib/tint";
import "@/app/company-zoho.css";
import "@/app/company-pages.css";

export const metadata = buildMetadata({
  title: "Media and News",
  description: "ToyoApps company and product updates, media contact details, and links to the press kit and blog.",
  path: routes.media(),
});

export default function MediaPage() {
  const tree = getCatalogTree();
  const total = tree.reduce((n, t) => n + t.products.length, 0);
  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Company", href: routes.company() }, { name: "Media", href: routes.media() }]} />
          <p className="co-hero__label">Media</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">ToyoApps news and media resources</h1>
          <p className="co-hero__lead co-hero__lead--max">Company and product updates from ToyoApps, plus everything journalists and partners need to write about us.</p>
          <div className="co-btns co-btns--hero">
            <Link className="co-btn co-btn--invert" href={routes.pressKit()}>Get the press kit</Link>
          </div>
          <ImageSlot src="/images/company/media-hero.webp" alt="ToyoApps company and product updates" width={1200} height={420} priority className="co-hero__art" />
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Latest announcements</p>
            <h2 className="co-h2">Company and product updates</h2>
            <p>The products currently in the ToyoApps catalog: {total} in all, across {tree.length} business areas. Each links to its product page.</p>
          </div>
          {tree.map(({ category, products }) => (
            <div key={category.slug} className="cp-group">
              <div className="cp-group__head">
                <h3>
                  <Link className="co-link" href={routes.category(category.slug)}>{category.name}</Link>
                </h3>
                <span>{products.length} {products.length === 1 ? "product" : "products"} in the catalog</span>
              </div>
              <ul className="cp-grid">
                {products.map((p) => (
                  <li key={p.slug} className="cp-card">
                    <div className="cp-card__head">
                      <span className="cp-dot" style={{ background: productAccent(p) }} aria-hidden="true">{monogram(p.name)}</span>
                      <div>
                        <p className="cp-card__meta">Product update</p>
                        <h4>
                          <Link href={routes.product(p.slug)}>{p.name} is in the ToyoApps catalog</Link>
                        </h4>
                      </div>
                    </div>
                    <p>{p.tagline ?? p.shortDescription}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap co-split">
          <div>
            <p className="co-eyebrow">Media contact</p>
            <h2>Talk to the ToyoApps team</h2>
            <p>For interviews, company information or product questions, contact the team and mention that your enquiry is from the media.</p>
            <Link className="co-btn" href={routes.contactForm({ topic: "media" })}>Media enquiry</Link>
          </div>
          <ul className="cp-grid">
            <li className="cp-card">
              <h3>Press kit</h3>
              <p>Company overview, logo files, brand colours and product boilerplates.</p>
              <div className="cp-card__foot"><Link className="co-link" href={routes.pressKit()}>Open press kit ›</Link></div>
            </li>
            <li className="cp-card">
              <h3>Blog</h3>
              <p>Guides and support topics across ToyoApps products.</p>
              <div className="cp-card__foot"><Link className="co-link" href={routes.blog()}>Visit the blog ›</Link></div>
            </li>
            <li className="cp-card">
              <h3>Products</h3>
              <p>Every product in the catalog, organised by business function.</p>
              <div className="cp-card__foot"><Link className="co-link" href={routes.products()}>Browse products ›</Link></div>
            </li>
          </ul>
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Writing about ToyoApps?</h2>
          <p>Start with the press kit, then get in touch with any questions.</p>
          <div className="co-btns">
            <Link className="co-btn" href={routes.pressKit()}>Press kit</Link>
            <Link className="co-btn co-btn--ghost" href={routes.contactForm({ topic: "media" })}>Contact us</Link>
          </div>
        </div>
      </section>
      <PageFaqs faqs={getSiteFaqs("media")} />
    </>
  );
}
