import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { ArchitectureMindset } from "@/components/sections/architecture-mindset";
import { Projects } from "@/components/sections/projects";
import { Travel } from "@/components/sections/travel";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Experience />
      <Skills />
      <ArchitectureMindset />
      <Projects />
      <Travel />
      <Testimonials />
      <Contact />
    </>
  );
}
