import { CtaBand, PageHero, Section } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About ToyoApps",
  description: "ToyoApps is building one home for business software — where businesses discover and buy SaaS, and makers publish and sell it.",
  path: routes.company(),
});

export default function CompanyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Company", href: routes.company() }]}
        eyebrow="Company"
        title="One home for business software"
        lead={site.tagline}
      />
      <Section>
        <div className="prose">
          <p>
            ToyoApps brings SaaS products together in one ecosystem. Businesses discover software organised by what they
            need to get done and buy it through one account. Software makers publish their products, reach customers and
            get paid without building their own storefront or billing.
          </p>
          {/* TODO(content): team, story, mission and verified company facts. */}
        </div>
      </Section>
      <CtaBand
        title="Talk to the ToyoApps team"
        primary={{ label: "Contact us", href: routes.contact() }}
        secondary={{ label: "Explore products", href: routes.products() }}
      />
    </>
  );
}
