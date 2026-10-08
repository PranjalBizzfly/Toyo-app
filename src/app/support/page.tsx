import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { getProducts } from "@/lib/catalog";
import { getAvailableSections } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";
import { ImageSlot } from "@/components/ui/ImageSlot";

export const metadata = buildMetadata({
  title: "Support",
  description: "Get help with ToyoApps and ToyoApps products.",
  path: routes.support(),
});

export default function SupportPage() {
  const withSupport = getProducts().filter((p) => getAvailableSections(p).includes("support"));
  return (
    <>
      <section className={`co-hero co-hero--center${withSupport.length ? " co-hero--overlap" : ""}`}>
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Support", href: routes.support() }]} />
          <h1 className="co-hero__title">How can we help?</h1>
          <p className="co-hero__lead">Each ToyoApps product has its own support page with setup guidance and answers to common questions. Pick your product below, or contact the ToyoApps team.</p>
          <hr className="co-hero__rule" />
          <ImageSlot src="/images/company/support-hero.svg" alt="ToyoApps support team" width={840} height={320} priority className="co-hero__art" />
        </div>
      </section>
      {withSupport.length > 0 && (
        <section className="co-overlap">
          <div className="co-wrap">
            <div className="co-panel co-panel--3">
              {withSupport.map((p) => (
                <Link key={p.slug} href={routes.productSection(p.slug, "support")} className="co-panel__cell">
                  <span className="co-panel__icon" aria-hidden="true">{p.name.charAt(0)}</span>
                  <h2>{p.name} support</h2>
                  <p>{p.shortDescription}</p>
                  <div className="co-panel__foot"><span className="co-link">Get help ›</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="co-cta">
        <div className="co-wrap">
          <h2>Still need help?</h2>
          <p>If your question isn't answered on a product's support page — or it's about buying, billing or publishing on ToyoApps — contact the team.</p>
          <div className="co-btns"><Link className="co-btn" href={routes.contact()}>Contact us</Link></div>
        </div>
      </section>
    </>
  );
}
