import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui/primitives";
import { getProducts } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support",
  description: "Get help with ToyoApps and ToyoApps products.",
  path: routes.support(),
});

export default function SupportPage() {
  const withSupport = getProducts().filter((p) => p.supportUrl || p.docsUrl || p.faqs?.length);
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Support", href: routes.support() }]}
        eyebrow="Support"
        title="How can we help?"
        lead="Find help for a specific product, or contact the ToyoApps team."
      />
      {withSupport.length > 0 && (
        <Section tight>
          <div className="grid">
            {withSupport.map((p) => (
              <Link key={p.slug} href={routes.productSection(p.slug, "support")} className="card">
                <h2 className="card__title">{p.name} support</h2>
                <p className="text-muted">{p.shortDescription}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
      <CtaBand title="Still need help?" primary={{ label: "Contact us", href: routes.contact() }} />
    </>
  );
}
