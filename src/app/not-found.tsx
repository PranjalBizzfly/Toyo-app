import { ButtonLink, Section } from "@/components/ui/primitives";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <Section>
      <div className="stack" style={{ ["--stack" as string]: "20px", maxWidth: 560 }}>
        <p className="eyebrow">404</p>
        <h1 className="h2">This page doesn&apos;t exist yet</h1>
        <p className="lead">It may have moved, or the content hasn&apos;t been published.</p>
        <div className="btn-row">
          <ButtonLink href={routes.products()} arrow>
            Explore products
          </ButtonLink>
          <ButtonLink href={routes.home()} variant="secondary">
            Home
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
