import type { Metadata } from "next";
import { FreelanceHero } from "@/components/freelance/freelance-hero";
import { Pricing } from "@/components/freelance/pricing";

export const metadata: Metadata = {
  title: "Freelance Web Developer in Edwardsville, IL",
  description:
    "Freelance software developer building fast, modern, SEO-friendly websites for local businesses in Edwardsville and the St. Louis area. Services and pricing.",
  alternates: {
    canonical: "https://www.christophermeyer.dev/freelance",
  },
  openGraph: {
    title: "Freelance Web Developer in Edwardsville, IL | Christopher Meyer",
    description:
      "Custom websites and software for local businesses in Edwardsville and the St. Louis area.",
    url: "https://www.christophermeyer.dev/freelance",
    type: "website",
  },
};

export default function FreelancePage() {
  return (
    <main>
      <FreelanceHero />
      <Pricing />
    </main>
  );
}
