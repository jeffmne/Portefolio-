import { Contact } from '@/components/sections/contact';
import { Education } from '@/components/sections/education';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { Skills } from '@/components/sections/skills';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
