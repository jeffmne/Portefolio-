import { ProjectSlider } from '@/components/ui/project-slider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <section id="projets" className="py-16 sm:py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Projets & études de cas"
          title="Des problèmes réels, des solutions livrées"
          accent="livrées"
          description="Deux réalisations représentatives : une plateforme métier déployée en production et un laboratoire d'infrastructure servant de banc d'essai aux architectures sécurisées."
        />

        <Reveal className="mt-12">
          <ProjectSlider projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
