import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { FooterResolver } from "@/components/layout/FooterResolver";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Motion } from "@/components/layout/Motion";
import { ScrollToggle } from "@/components/layout/ScrollToggle";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import { getProducts } from "@/lib/catalog";
import { jsonLd } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import { titleCaseScript } from "@/lib/title-case";
import "./globals.css";
import "./layout-zoho.css";
import "./motion.css";
import "./title-case.css";
import "./contrast-fixes.css";
import "./contrast-fixes-2.css";
import "./story-inner.css";
import "./mocks.css";
import "./branch-timeline.css";
import "./polish.css";
import "./headings.css";

// Same typefaces as the original toyoapps.com: Inter for text, Space Grotesk for the wordmark and headings.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Business software, one ecosystem`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#07121d" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  sameAs: site.social.map((s) => s.href).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint — prevents a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <FooterResolver productSlugs={getProducts().map((p) => p.slug)}>
          <SiteFooter />
        </FooterResolver>
        {/* Marks 100+ word paragraphs so they stay in sentence case (see title-case.css). */}
        <script dangerouslySetInnerHTML={{ __html: titleCaseScript }} />
        <ScrollToggle />
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
      </body>
    </html>
  );
}
