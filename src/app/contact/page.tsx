import { ButtonLink, PageHero, Section } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact sales",
  description: "Talk to the ToyoApps team about choosing software, buying, or publishing your SaaS.",
  path: routes.contact(),
});

const reasons = [
  { title: "Choosing software", text: "Tell us your business type, team size and the problem you need to solve — we'll recommend products." },
  { title: "Sales & buying", text: "Questions about plans, billing or buying for your team." },
  { title: "Publishing", text: "List and sell your own SaaS product on ToyoApps." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contact", href: routes.contact() }]}
        eyebrow="Contact"
        title="Talk to the ToyoApps team"
        lead="Whether you're choosing software or publishing your own, we're here to help."
      />
      <Section tight>
        <div className="grid">
          {reasons.map((r) => (
            <article key={r.title} className="card">
              <h2 className="card__title">{r.title}</h2>
              <p className="text-muted">{r.text}</p>
              {site.contactEmail && (
                <div className="card__foot">
                  <ButtonLink href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(r.title)}`} variant="secondary" size="sm">
                    Email us
                  </ButtonLink>
                </div>
              )}
            </article>
          ))}
        </div>
        {/* TODO(content): connect a contact form to the CRM/email backend, or set site.contactEmail. */}
      </Section>
    </>
  );
}
