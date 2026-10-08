import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";

export const metadata = buildMetadata({
  title: "Contact sales",
  description: "Talk to the ToyoApps team about choosing software, buying, or publishing your SaaS.",
  path: routes.contact(),
});

const reasons = [
  { tag: "New here", tone: "", icon: "?", title: "Choosing software", text: "Tell us your business type, team size and the problem you need to solve — we'll recommend products." },
  { tag: "Buying", tone: "co-tag--blue", icon: "$", title: "Sales & buying", text: "Questions about a product's plans, how billing works, or buying for several people on your team." },
  { tag: "Software makers", tone: "co-tag--warn", icon: "+", title: "Publishing", text: "List and sell your own SaaS product on ToyoApps, with subscription and one-time billing and payouts handled for you." },
];

export default function ContactPage() {
  return (
    <>
      <section className="co-hero co-hero--center co-hero--overlap">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Contact", href: routes.contact() }]} />
          <h1 className="co-hero__title">Talk to the ToyoApps team</h1>
          <p className="co-hero__lead">Choosing software, buying for your team or publishing your own product — pick the topic closest to your question below.</p>
          <hr className="co-hero__rule" />
        </div>
      </section>

      <section className="co-overlap">
        <div className="co-wrap">
          <div className="co-panel co-panel--3">
            {reasons.map((r) => (
              <article key={r.title} className="co-panel__cell">
                <span className={`co-tag ${r.tone}`}>{r.tag}</span>
                <span className="co-panel__icon" aria-hidden="true">{r.icon}</span>
                <h2>{r.title}</h2>
                <p>{r.text}</p>
                {site.contactEmail && (
                  <div className="co-panel__foot">
                    <a className="co-link" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(r.title)}`}>
                      {site.contactEmail}
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
          {/* TODO(content): connect a contact form to the CRM/email backend, or set site.contactEmail. */}
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap co-split">
          <ImageSlot
            src="/images/company/contact-publish.svg"
            alt="A software maker publishing a product on ToyoApps"
            width={380}
            height={340}
            className="co-img co-img--split"
          />
          <div>
            <p className="co-eyebrow">Software makers</p>
            <h2>Publish and sell your SaaS on ToyoApps</h2>
            <p>Create a listing with pricing, demos and screenshots, go live in the marketplace, and get paid through built-in subscription and one-time billing — without building a storefront or payment infrastructure.</p>
            <Link className="co-btn" href={routes.publish()}>Learn more <span aria-hidden="true">›</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
