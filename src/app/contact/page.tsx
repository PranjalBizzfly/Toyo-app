import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import { getProducts } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";
import "@/app/contact/contact.css";

export const metadata = buildMetadata({
  title: "Contact us",
  description: "Ask ToyoApps about products, business requirements, sales, support, vendor listings or publishing your software.",
  path: routes.contact(),
});

const more = [
  { tag: "Help", title: "Support", text: "Answers about accounts, billing and using ToyoApps products.", href: routes.support(), cta: "Visit support" },
  { tag: "Read", title: "Blog", text: "Ideas, guides and news from the ToyoApps team.", href: routes.blog(), cta: "Read the blog" },
  { tag: "Media", title: "Press kit", text: "Logos, company facts and brand assets for press and partners.", href: routes.pressKit(), cta: "Open the press kit" },
];

export default function ContactPage() {
  const products = getProducts().map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <section className="co-hero co-hero--center">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Contact", href: routes.contact() }]} />
          <h1 className="co-hero__title">How Can We Help You?</h1>
          <p className="co-hero__lead">
            Product questions, business requirements, product enquiries or anything else: send us a message and the ToyoApps team will reply by email.
          </p>
          <hr className="co-hero__rule" />
        </div>
      </section>

      <section id="contact-form" className="co-band cf-section" aria-labelledby="cf-title">
        <div className="co-narrow">
          <h2 id="cf-title" className="cf-title">Send us a message</h2>
          <p className="cf-lead">Tell us what you need and which products you&apos;re interested in, and we&apos;ll route it to the right team.</p>
          <ContactForm products={products} privacyHref={routes.legal("privacy")} />
        </div>
      </section>

      <section className="co-band co-band--tint" aria-labelledby="cf-more">
        <div className="co-wrap">
          <div className="co-band__head">
            <h2 id="cf-more">Other ways to find answers</h2>
            {site.contactEmail && (
              <p>
                Email: <a className="co-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </p>
            )}
          </div>
          <div className="co-panel co-panel--3">
            {more.map((m) => (
              <Link key={m.title} href={m.href} className="co-panel__cell">
                <span className="co-tag">{m.tag}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <div className="co-panel__foot">
                  <span className="co-link">{m.cta} <span aria-hidden="true">›</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageFaqs faqs={getSiteFaqs("contact")} />
    </>
  );
}
