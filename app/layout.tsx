import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const SITE_URL = "https://www.christophermeyer.dev";
const DESCRIPTION =
  "Christopher Meyer — software engineer building AI agents and full-stack products. CS student at SIUE, open to Summer 2027 internships and freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Christopher Meyer | Software Engineer",
    template: "%s | Christopher Meyer",
  },
  description: DESCRIPTION,
  applicationName: "Christopher Meyer",
  authors: [{ name: "Christopher Meyer", url: SITE_URL }],
  creator: "Christopher Meyer",
  keywords: [
    "Christopher Meyer",
    "software engineer",
    "AI engineer",
    "full-stack developer",
    "AI agents",
    "Next.js",
    "TypeScript",
    "Edwardsville",
    "St. Louis",
    "SIUE",
  ],
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Christopher Meyer",
    title: "Christopher Meyer | Software Engineer",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Meyer | Software Engineer",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Christopher Meyer",
      url: SITE_URL,
      image: `${SITE_URL}/christopher-meyer.webp`,
      email: "cameyer06@gmail.com",
      telephone: "+1-314-529-1949",
      jobTitle: "Software Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Edwardsville",
        addressRegion: "IL",
        addressCountry: "US",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Southern Illinois University Edwardsville",
      },
      sameAs: [
        "https://www.linkedin.com/in/cameyer06/",
        "https://github.com/cameyer260",
      ],
      knowsAbout: [
        "Software Engineering",
        "AI Agents",
        "Full-Stack Development",
        "Next.js",
        "TypeScript",
        "Retrieval-Augmented Generation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Christopher Meyer Freelance Development",
      url: `${SITE_URL}/freelance`,
      image: `${SITE_URL}/og-image.png`,
      description:
        "Freelance software developer building fast, modern, SEO-friendly websites for local businesses in the Edwardsville and St. Louis area.",
      email: "cameyer06@gmail.com",
      telephone: "+1-314-529-1949",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Edwardsville",
        addressRegion: "IL",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Edwardsville" },
        { "@type": "City", name: "St. Louis" },
        { "@type": "AdministrativeArea", name: "Metro East" },
      ],
      provider: { "@id": `${SITE_URL}/#person` },
      sameAs: [
        "https://www.linkedin.com/in/cameyer06/",
        "https://github.com/cameyer260",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
        <Nav />
        {children}
        <Footer />
        <Analytics />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
