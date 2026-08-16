import { ProjectCard } from '@/components/ui/project-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <section id="projets" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Projets & études de cas"
          title="Des problèmes réels, des solutions livrées"
          description="Deux réalisations représentatives : une plateforme métier déployée en production et un laboratoire d'infrastructure servant de banc d'essai aux architectures sécurisées."
        />

        <div className="mt-12 space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
