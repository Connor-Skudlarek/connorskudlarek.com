import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Software Engineer in Portland, Oregon`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Connor Skudlarek",
    "software engineer",
    "Portland Oregon",
    "Next.js",
    "TypeScript",
    "React",
    "Lam Research",
    "Oregon Tech",
    "mechanical engineer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Software Engineer`,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Engineer`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  givenName: "Connor",
  familyName: "Skudlarek",
  jobTitle: "Software Engineer",
  email: `mailto:${site.email}`,
  url: site.url,
  image: `${site.url}/og.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Portland",
    addressRegion: "OR",
    addressCountry: "US",
  },
  worksFor: { "@type": "Organization", name: "Lam Research" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Oregon Institute of Technology",
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "PostgreSQL",
    "Semiconductor equipment",
    "Mechanical engineering",
  ],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
