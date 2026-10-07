import { CtaBand, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { publisherSteps } from "@/content/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Publish and sell your SaaS",
  description: "List your SaaS product on ToyoApps, reach customers and get paid — with subscription and one-time billing handled for you.",
  path: routes.publish(),
});

const pillars = [
  { title: "Publish in minutes", text: "List your product with pricing, demos and screenshots — no infrastructure to set up." },
  { title: "Earn from every sale", text: "Integrated subscription and one-time billing, with automatic payouts." },
  { title: "Be discovered", text: "Appear in a curated marketplace where businesses come to find software." },
];

export default function PublishPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Publish your software", href: routes.publish() }]}
        eyebrow="For software makers"
        title="Launch your SaaS where businesses look for software"
        lead="ToyoApps lets founders publish SaaS products, reach customers and get paid — without building a storefront or payment infrastructure."
      />
      <Section>
        <div className="grid">
          {pillars.map((p) => (
            <article key={p.title} className="card">
              <h2 className="card__title">{p.title}</h2>
              <p className="text-muted">{p.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeader eyebrow="How it works" title="From listing to growth" />
        <ol className="steps">
          {publisherSteps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand
        title="Ready to publish on ToyoApps?"
        lead="Tell us about your product and we'll get you set up."
        primary={{ label: "Get in touch", href: routes.contact() }}
      />
    </>
  );
}
