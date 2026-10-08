import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";

export const metadata = buildMetadata({
  title: "About ToyoApps",
  description: "ToyoApps is building one home for business software — where businesses discover and buy SaaS, and makers publish and sell it.",
  path: routes.company(),
});

const pillars = [
  { title: "Discover", text: "Products are grouped by business function — sales and marketing, HR, operations and IT, finance and compliance, insights and research — so you start from the job, not the vendor." },
  { title: "Buy", text: "Each product has its own pages for features, pricing and support, so you can compare plans and buy the software you choose through one account." },
  { title: "Publish", text: "Software makers publish their products, reach customers and get paid without building their own storefront or billing." },
];

export default function CompanyPage() {
  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Company", href: routes.company() }]} />
          <p className="co-hero__label">About ToyoApps</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">ToyoApps brings SaaS products together in one ecosystem.</h1>
        </div>
      </section>

      <section className="co-statement">
        <div className="co-wrap">
          <p>{site.description}</p>
          <span className="co-statement__big">One home for business software.</span>
        </div>
      </section>

      <ImageSlot
        src="/images/company/about-team.webp"
        alt="ToyoApps platform architecture, verified catalog registry and SaaS ecosystem infrastructure"
        width={1440}
        height={720}
        className="co-img co-img--full"
      />

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">What we do</p>
            <h2 className="co-h2">{site.tagline}</h2>
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
          {/* TODO(content): team, story, mission and verified company facts. */}
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Talk to the ToyoApps team</h2>
          <p>Whether you&apos;re comparing products for your team or want to list and sell your own SaaS on ToyoApps, tell us what you need and we&apos;ll point you to the right place.</p>
          <div className="co-btns">
            <Link className="co-btn" href={routes.contact()}>Contact us</Link>
            <Link className="co-btn co-btn--ghost" href={routes.products()}>Explore products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
