import { Briefcase, CalendarDays } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { experiences } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Expérience professionnelle"
          title="Le terrain, avant la théorie"
          description="Des environnements de production réels : parc informatique d'entreprise, collecte de données à grande échelle et support utilisateur au quotidien."
        />

        <ol className="mt-10 space-y-5 lg:mt-12">
          {experiences.map((experience, index) => (
            <li key={experience.id}>
              <Reveal delay={index * 80}>
                <Card className="group transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-primary transition-colors duration-300 group-hover:border-primary/40">
                          <Briefcase className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-foreground">
                            {experience.role}
                          </h3>
                          <p className="mt-0.5 text-sm text-primary">{experience.organisation}</p>
                        </div>
                      </div>

                      <p className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:pt-2">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {experience.period}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2 sm:mt-5 sm:pl-[3.25rem]">
                      {experience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.55rem] h-1.5 w-1.5 rounded-full bg-primary/70"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
