import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { publisherSteps } from "@/content/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";
import { ImageSlot } from "@/components/ui/ImageSlot";

export const metadata = buildMetadata({
  title: "Publish and sell your SaaS",
  description: "List your SaaS product on ToyoApps, reach customers and get paid — with subscription and one-time billing handled for you.",
  path: routes.publish(),
});

const pillars = [
  { title: "Publish in minutes", text: "List your product with pricing, demos and screenshots — no infrastructure to set up." },
  { title: "Earn from every sale", text: "Integrated subscription and one-time billing, with automatic payouts." },
  { title: "Be discovered", text: "Appear in a curated marketplace where businesses browse software by business function, with room for your features, pricing and support information." },
];

export default function PublishPage() {
  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Publish your software", href: routes.publish() }]} />
          <p className="co-hero__label">For software makers</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">Launch your SaaS where businesses look for software</h1>
          <p className="co-hero__lead co-hero__lead--max">
            ToyoApps lets founders publish SaaS products, reach customers and get paid — without building a storefront or payment infrastructure.
          </p>
          <div className="co-btns co-btns--hero">
            <Link className="co-btn co-btn--invert" href={routes.contact()}>Get in touch</Link>
          </div>
          <ImageSlot src="/images/company/publish-hero.svg" alt="A SaaS product listed on ToyoApps" width={1200} height={420} priority className="co-hero__art" />
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Why ToyoApps</p>
            <h2 className="co-h2">Everything you need to sell software</h2>
          </div>
          <ul className="co-cols">
            {pillars.map((p, i) => (
              <li key={p.title} className="co-col">
                <span className="co-col__num">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">How it works</p>
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
          <ImageSlot src="/images/company/publish-steps.svg" alt="From listing to growth on ToyoApps" width={1200} height={360} className="co-band__art" />
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Ready to publish on ToyoApps?</h2>
          <p>Tell us what your product does, who it's for and how you price it, and we&apos;ll walk you through creating your listing.</p>
          <div className="co-btns"><Link className="co-btn" href={routes.contact()}>Get in touch</Link></div>
        </div>
      </section>
    </>
  );
}
