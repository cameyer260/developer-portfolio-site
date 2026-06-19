import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { FeaturedWork } from "@/components/home/featured-work";
import { Experience } from "@/components/home/experience";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedWork />
      <Experience />
    </main>
  );
}
