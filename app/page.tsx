import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { FeaturedWork } from "@/components/home/featured-work";
import { Experience } from "@/components/home/experience";
import { Skills } from "@/components/home/skills";
import { EducationResume } from "@/components/home/education-resume";
import { BeyondTheCode } from "@/components/home/beyond-the-code";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About />
      <FeaturedWork />
      <Experience />
      <Skills />
      <EducationResume />
      <BeyondTheCode />
      <Contact />
    </main>
  );
}
