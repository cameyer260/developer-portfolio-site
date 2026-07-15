import type { Metadata } from "next";
import { FreelanceHero } from "@/components/freelance/freelance-hero";
import { Testimonials } from "@/components/freelance/testimonials";
import { Pricing } from "@/components/freelance/pricing";
import { Faq } from "@/components/freelance/faq";
import { FreelanceContact } from "@/components/freelance/freelance-contact";

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
    images: [{ url: "/freelance-og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer in Edwardsville, IL | Christopher Meyer",
    description:
      "Custom websites and software for local businesses in Edwardsville and the St. Louis area.",
    images: ["/freelance-og-image.png"],
  },
};

export default function FreelancePage() {
  return (
    <main>
      <FreelanceHero />
      <Testimonials />
      <Pricing />
      <Faq />
      <FreelanceContact />
    </main>
  );
}
