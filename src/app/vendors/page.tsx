import Link from "next/link";
import { Breadcrumbs, FaqList } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { publisherSteps } from "@/content/site";
import { getCatalogTree } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";
import "@/app/company-pages.css";

export const metadata = buildMetadata({
  title: "Become a ToyoApps vendor",
  description:
    "How the vendor relationship works on ToyoApps: who can list, how listings go live in the marketplace, the onboarding steps and what to prepare.",
  path: routes.vendors(),
});

const who = [
  { title: "SaaS founders", text: "Founders who want to launch a product and reach paying customers without building a storefront, billing system or distribution channel from scratch." },
  { title: "Software teams", text: "Teams with an existing SaaS product that fits one of the business functions buyers browse on ToyoApps." },
  { title: "Independent makers", text: "Indie developers who want their product hosted with its pricing, demo, screenshots and docs in one marketplace listing." },
];

const how = [
  { title: "You own the product", text: "As a vendor you build and run your software. ToyoApps hosts the listing — pricing, demo, screenshots and docs — so there's no storefront to build." },
  { title: "ToyoApps runs the marketplace", text: "Your product appears in the marketplace and search, where businesses browse a curated catalog by business function." },
  { title: "Billing is handled", text: "Subscriptions and one-time sales are billed through ToyoApps, with payouts to you." },
];

const requirements = [
  "A working SaaS product that businesses can buy and use",
  "Pricing for your plans — subscription, one-time, or both",
  "A demo link and screenshots of the product",
  "Product documentation buyers can read before and after purchase",
  "A clear description of what the product does and who it's for",
];

const faqs = [
  { question: "What's the difference between Vendors and Publish?", answer: "The Publish page explains the product side — how to list and sell your SaaS on ToyoApps. This page covers the vendor relationship: who vendors are, what each side does and how onboarding works." },
  { question: "Do I need to build a storefront or payment system?", answer: "No. Your listing hosts pricing, demo, screenshots and docs, and subscriptions and one-time sales are billed through ToyoApps." },
  { question: "Where will my product appear?", answer: "In the ToyoApps marketplace and search, where buyers browse software organised by business function." },
  { question: "Where can I find commercial terms?", answer: "Commercial terms aren't published on this page. Contact the ToyoApps team to discuss your product and the details of listing it." },
];

export default function VendorsPage() {
  const tree = getCatalogTree();
  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Company", href: routes.company() }, { name: "Vendors", href: routes.vendors() }]} />
          <p className="co-hero__label">For vendors</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">Become a vendor on the ToyoApps marketplace</h1>
          <p className="co-hero__lead co-hero__lead--max">
            ToyoApps is the marketplace where founders and teams launch SaaS products, reach customers and earn from every sale. Here&apos;s how the vendor relationship works.
          </p>
          <div className="co-btns co-btns--hero">
            <Link className="co-btn co-btn--invert" href={`${routes.contact()}?topic=vendor`}>Make a vendor enquiry</Link>
          </div>
          <ImageSlot src="/images/company/vendors-hero.webp" alt="A vendor's SaaS product listed in the ToyoApps marketplace" width={1200} height={420} priority className="co-hero__art" />
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Who can become a vendor</p>
            <h2 className="co-h2">Built for people who make SaaS</h2>
          </div>
          <ul className="co-cols">
            {who.map((w, i) => (
              <li key={w.title} className="co-col">
                <span className="co-col__num">0{i + 1}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">How it works</p>
            <h2 className="co-h2">What each side does</h2>
            <p>
              Buyers find products by business function — today that means {tree.map((t) => t.category.name).join(", ")}.
            </p>
          </div>
          <ul className="cp-grid">
            {how.map((h) => (
              <li key={h.title} className="cp-card">
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Onboarding</p>
            <h2 className="co-h2">From listing to growth</h2>
          </div>
          <ol className="co-steps">
            {publisherSteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap co-split">
          <div>
            <p className="co-eyebrow">Requirements</p>
            <h2>What to prepare</h2>
            <p>A listing is built from what you already have. Before you get in touch, it helps to have:</p>
          </div>
          <ul className="cp-list">
            {requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap co-split">
          <div>
            <p className="co-eyebrow">Publishing a product?</p>
            <h2>Looking for how to list your SaaS?</h2>
            <p>The Publish page walks through listing and selling a product on ToyoApps — what a listing includes and how sales and payouts work.</p>
            <Link className="co-btn" href={routes.publish()}>Publish your software <span aria-hidden="true">›</span></Link>
          </div>
          <div className="cp-card">
            <h3>Vendors vs. Publish</h3>
            <p><strong>Vendors</strong> (this page): the relationship — who vendors are, who does what, onboarding and what to prepare.</p>
            <p><strong>Publish</strong>: the product listing — how to put your SaaS in front of buyers and sell it.</p>
          </div>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-narrow">
          <div className="co-band__head">
            <p className="co-eyebrow">FAQ</p>
            <h2 className="co-h2">Vendor questions</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Talk to us about becoming a vendor</h2>
          <p>Tell us what your product does, who it&apos;s for and how you price it.</p>
          <div className="co-btns">
            <Link className="co-btn" href={`${routes.contact()}?topic=vendor`}>Make a vendor enquiry</Link>
            <Link className="co-btn co-btn--ghost" href={routes.publish()}>Publish your software</Link>
          </div>
        </div>
      </section>
    </>
  );
}
