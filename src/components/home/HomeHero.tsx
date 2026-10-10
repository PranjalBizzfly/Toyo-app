import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Category, Integration, Product } from "@/content/types";
import { routes } from "@/lib/routes";
import { HeroScene } from "./HeroScene";

export function HomeHero({
  products = [],
  categories = [],
  integrations = [],
}: {
  siteName?: string;
  products?: Product[];
  categories?: { category: Category; products: Product[] }[];
  integrations?: Integration[];
  industriesCount?: number;
  featurePages?: number;
}) {
  return (
    <section className="hh" aria-labelledby="hero-title">
      <span className="hh__glow hh__glow--a" aria-hidden />
      <span className="hh__glow hh__glow--b" aria-hidden />

      <div className="container hh__grid">
        <div className="hh__copy">
          <p className="hh__eyebrow">
            <span className="hh__eyebrow-icon" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </span>
            THE TOYOAPPS ECOSYSTEM
          </p>

          <h1 id="hero-title" className="hh__title">
            The software your<br />
            business runs on,<br />
            <span className="hh__title-blue">in one place</span>
          </h1>

          <p className="hh__lead">
            ToyoApps brings together 25+ software products for running your business. Sales, marketing, HR, finance and operations, all in one ecosystem, so you can find the right tool fast.
          </p>

          <div className="hh__ctas">
            <Link href={routes.products()} className="hh-btn hh-btn--solid">
              Explore All Products <span aria-hidden className="hh-btn__arrow">→</span>
            </Link>
            <Link href={routes.solutions()} className="hh-btn hh-btn--line">
              Browse Solutions <span aria-hidden className="hh-btn__arrow">→</span>
            </Link>
          </div>

          <div className="hh__highlights" aria-label="Key highlights">
            <div className="hh__highlight">
              <span className="hh__highlight-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </span>
              <div className="hh__highlight-text">
                <strong>25+ Products</strong>
                <small>Complete business suite</small>
              </div>
            </div>

            <div className="hh__highlight">
              <span className="hh__highlight-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className="hh__highlight-text">
                <strong>Multiple Industries</strong>
                <small>Built for every sector</small>
              </div>
            </div>

            <div className="hh__highlight">
              <span className="hh__highlight-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className="hh__highlight-text">
                <strong>Secure &amp; Reliable</strong>
                <small>Your data, our priority</small>
              </div>
            </div>

            <div className="hh__highlight">
              <span className="hh__highlight-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </span>
              <div className="hh__highlight-text">
                <strong>24/7 Support</strong>
                <small>Always here for you</small>
              </div>
            </div>
          </div>
        </div>

        <div className="hh__art hh__art--exact">
          <HeroScene products={products} categories={categories} integrationsCount={integrations.length} />
        </div>
      </div>

      <div className="container">
        <div className="hh-strip">
          <div className="hh-strip__intro">
            <span className="hh-strip__eyebrow">TRUSTED BY BUSINESSES WORLDWIDE</span>
            <h2 className="hh-strip__title">Join thousands of teams<br />building better with ToyoApps.</h2>
          </div>

          <div className="hh-strip__stats">
            <div className="hh-strip__stat">
              <span className="hh-strip__icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className="hh-strip__stat-content">
                <b>25+</b>
                <small>Powerful Products</small>
              </div>
            </div>

            <div className="hh-strip__stat">
              <span className="hh-strip__icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M9 22v-4h6v4" />
                  <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                </svg>
              </span>
              <div className="hh-strip__stat-content">
                <b>10+</b>
                <small>Industries Served</small>
              </div>
            </div>

            <div className="hh-strip__stat">
              <span className="hh-strip__icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className="hh-strip__stat-content">
                <b>99.9%</b>
                <small>Platform Uptime</small>
              </div>
            </div>

            <div className="hh-strip__stat">
              <span className="hh-strip__icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </span>
              <div className="hh-strip__stat-content">
                <b>24/7</b>
                <small>Customer Support</small>
              </div>
            </div>
          </div>

          <div className="hh-strip__tools">
            <p className="hh-strip__tools-lead">
              Integrates with the tools<br />
              <Link href={routes.integrations()}>you already use</Link>
            </p>
            <div className="hh-strip__brand-logos">
              {/* Google */}
              <span className="hh-strip__logo-item" title="Google Workspace">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </span>
              {/* Microsoft 365 */}
              <span className="hh-strip__logo-item" title="Microsoft 365">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022"/>
                  <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00"/>
                  <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF"/>
                  <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/>
                </svg>
              </span>
              {/* Slack */}
              <span className="hh-strip__logo-item" title="Slack">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#E01E5A" d="M5.04 14.28a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52zm1.26 0a2.52 2.52 0 1 1 5.04 0v6.3a2.52 2.52 0 1 1-5.04 0v-6.3z"/>
                  <path fill="#36C5F0" d="M9.72 5.04a2.52 2.52 0 1 1-2.52-2.52v2.52h2.52zm0 1.26a2.52 2.52 0 1 1 0 5.04H3.42a2.52 2.52 0 1 1 0-5.04h6.3z"/>
                  <path fill="#2EB67D" d="M18.96 9.72a2.52 2.52 0 1 1 2.52 2.52h-2.52V9.72zm-1.26 0a2.52 2.52 0 1 1-5.04 0V3.42a2.52 2.52 0 1 1 5.04 0v6.3z"/>
                  <path fill="#ECB22E" d="M14.28 18.96a2.52 2.52 0 1 1 2.52 2.52h-2.52zm0-1.26a2.52 2.52 0 1 1 0-5.04h6.3a2.52 2.52 0 1 1 0 5.04h-6.3z"/>
                </svg>
              </span>
              {/* Zoom */}
              <span className="hh-strip__logo-item" title="Zoom">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2D8CFF">
                  <circle cx="12" cy="12" r="10"/>
                  <path fill="#FFFFFF" d="M7 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9zm9 1.5 2.5-1.5v6l-2.5-1.5v-3z"/>
                </svg>
              </span>
              {/* Salesforce */}
              <span className="hh-strip__logo-item" title="Salesforce">
                <svg width="22" height="15" viewBox="0 0 24 16" fill="#00A1E0">
                  <path d="M10 2.5a4.5 4.5 0 0 1 3.8 2.1 3.5 3.5 0 0 1 4.2 3.4 3 3 0 0 1 3 3 3 3 0 0 1-3 3H5a5 5 0 0 1-5-5 5 5 0 0 1 4.5-4.9A5 5 0 0 1 10 2.5z"/>
                </svg>
              </span>
              {/* + More */}
              <Link href={routes.integrations()} className="hh-strip__more-btn">
                + More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
