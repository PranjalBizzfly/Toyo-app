import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { LogoMark } from "@/components/layout/Logo";
import { brandPalette } from "@/content/company";
import { site } from "@/content/site";
import { getCatalogTree } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { monogram, productAccent } from "@/lib/tint";
import "@/app/company-zoho.css";
import "@/app/company-pages.css";

export const metadata = buildMetadata({
  title: "Press Kit",
  description: "ToyoApps press kit: company overview, brand description, logo files, colour palette and boilerplate descriptions for every product.",
  path: routes.pressKit(),
});

export default function PressKitPage() {
  const tree = getCatalogTree();
  const total = tree.reduce((n, t) => n + t.products.length, 0);
  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Company", href: routes.company() }, { name: "Press kit", href: routes.pressKit() }]} />
          <p className="co-hero__label">Press kit</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">ToyoApps press kit</h1>
          <p className="co-hero__lead co-hero__lead--max">Approved descriptions, logo files, brand colours and product boilerplates for writing about ToyoApps.</p>
          <div className="co-btns co-btns--hero">
            <a className="co-btn co-btn--invert" href="/press/toyoapps-logo.svg" download>Download logo (SVG)</a>
          </div>
          <ImageSlot src="/images/company/press-kit-hero.webp" alt="Brand identity designer reviewing color palettes, logo geometry, and typography specifications" width={1200} height={420} priority className="co-hero__art" />
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="cp-prose">
            <p className="co-eyebrow">Company overview</p>
            <h2>About {site.name}</h2>
            <blockquote className="cp-quote">{site.description}</blockquote>
            <dl className="cp-dl">
              <dt>Name</dt>
              <dd>{site.name} (legal name: {site.legalName})</dd>
              <dt>Tagline</dt>
              <dd>{site.tagline}</dd>
              <dt>Website</dt>
              <dd><a className="co-link" href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a></dd>
              <dt>Catalog</dt>
              <dd>{total} products across {tree.length} business areas</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="cp-prose">
            <p className="co-eyebrow">Brand description</p>
            <h2>How to describe ToyoApps</h2>
            <p>
              ToyoApps is a SaaS marketplace: the place where founders and teams launch their SaaS products, reach paying customers and earn from every sale, without building a storefront, billing system or distribution channel from scratch.
            </p>
            <p>
              For businesses, ToyoApps is one home for business software. Products are organised by business function, so buyers start from the job they need done, compare plans and buy through one account.
            </p>
            <p>Please write the name as &ldquo;ToyoApps&rdquo; or &ldquo;Toyo Apps&rdquo;.</p>
          </div>
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Product ecosystem</p>
            <h2 className="co-h2">{total} products, {tree.length} business areas</h2>
          </div>
          <ul className="cp-grid">
            {tree.map(({ category, products }) => (
              <li key={category.slug} className="cp-card">
                <h3><Link href={routes.category(category.slug)}>{category.name}</Link></h3>
                <p>{category.tagline}</p>
                <p className="cp-card__meta">{products.map((p) => p.name).join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Logo</p>
            <h2 className="co-h2">Official logo assets</h2>
            <p>The Toyo Apps mark as a scalable SVG. Please don&apos;t recolour, stretch or redraw it.</p>
          </div>
          <div className="cp-logos">
            <div className="cp-logo">
              <div className="cp-logo__stage cp-logo__stage--light"><LogoMark className="cp-logo__svg" /></div>
              <div className="cp-logo__body">
                <h3>Logo mark on a light background</h3>
                <p>Vector SVG, scales to any size.</p>
                <a className="co-link" href="/press/toyoapps-logo.svg" download>Download SVG ›</a>
              </div>
            </div>
            <div className="cp-logo">
              <div className="cp-logo__stage cp-logo__stage--dark"><LogoMark className="cp-logo__svg" /></div>
              <div className="cp-logo__body">
                <h3>Logo mark on a dark background</h3>
                <p>The same file works on dark backgrounds thanks to its white outline.</p>
                <a className="co-link" href="/press/toyoapps-logo.svg" download>Download SVG ›</a>
              </div>
            </div>
            <div className="cp-logo">
              <div className="cp-logo__stage cp-logo__stage--light">
                {/* eslint-disable-next-line @next/next/no-img-element -- static brand file */}
                <img src="/icon.svg" alt="Toyo Apps app icon" width={120} height={132} />
              </div>
              <div className="cp-logo__body">
                <h3>App icon</h3>
                <p>The site icon version of the mark, with a soft drop shadow.</p>
                <a className="co-link" href="/icon.svg" download="toyoapps-icon.svg">Download SVG ›</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Colour palette</p>
            <h2 className="co-h2">Brand colours</h2>
            <p>Taken from the logo and the site&apos;s design tokens.</p>
          </div>
          <ul className="cp-swatches">
            {brandPalette.map((c) => (
              <li key={c.hex} className="cp-swatch">
                <div className="cp-swatch__chip" style={{ background: c.hex }} />
                <div className="cp-swatch__body">
                  <h3>{c.name}</h3>
                  <p><code>{c.hex}</code></p>
                  <p>{c.use}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Boilerplates</p>
            <h2 className="co-h2">Product descriptions</h2>
            <p>One-line descriptions for each product, taken from the product&apos;s own pages.</p>
          </div>
          <ul className="cp-grid">
            {tree.flatMap(({ category, products }) =>
              products.map((p) => (
                <li key={p.slug} className="cp-card">
                  <div className="cp-card__head">
                    <span className="cp-dot" style={{ background: productAccent(p) }} aria-hidden="true">{monogram(p.name)}</span>
                    <div>
                      <p className="cp-card__meta">{category.name}</p>
                      <h3><Link href={routes.product(p.slug)}>{p.name}</Link></h3>
                    </div>
                  </div>
                  {p.tagline && <p><strong>{p.tagline}</strong></p>}
                  <p>{p.shortDescription}</p>
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Media contact</h2>
          <p>
            {site.contactEmail
              ? `Email ${site.contactEmail} with press and media enquiries.`
              : "For interviews, quotes or anything not covered here, contact the ToyoApps team and mention your enquiry is from the media."}
          </p>
          <div className="co-btns">
            <Link className="co-btn" href={routes.contactForm({ topic: "media" })}>Contact the team</Link>
            <Link className="co-btn co-btn--ghost" href={routes.media()}>Media page</Link>
          </div>
        </div>
      </section>
      <PageFaqs faqs={getSiteFaqs("press-kit")} />
    </>
  );
}
