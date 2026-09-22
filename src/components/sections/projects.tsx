import Image from 'next/image';
import { ArrowUpRight, Building2 } from 'lucide-react';

import { ImageModal } from '@/components/ui/image-modal';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <section id="projets" className="py-20 md:py-28">
      <div className="container max-w-[1280px]">
        <SectionHeading
          eyebrow="Projets choisis"
          title="Des systèmes utiles, pensés pour le terrain"
          accent="le terrain"
          description="Deux réalisations où l'architecture, la sécurité et l'expérience utilisateur avancent ensemble."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const image = project.images[0];
            return (
              <Reveal key={project.id} delay={index * 90}>
                <article className="group overflow-hidden rounded-2xl border border-border bg-[#f6f5f3] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-35px_rgb(0_0_0/0.35)]">
                  {image ? (
                    <div className="relative aspect-[3/2] overflow-hidden bg-[#ececea]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
                        Projet réel
                      </span>
                      <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-[#151515] text-white transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  ) : null}

                  <div className="p-6 md:p-8">
                    <p className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.organisation ?? 'Projet personnel'}
                      {project.group ? <span>· {project.group}</span> : null}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold tracking-[-0.035em] md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((item) => (
                        <li key={item} className="rounded-full border border-[#151515]/15 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-wide">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <ImageModal images={project.images} variant="button" />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

