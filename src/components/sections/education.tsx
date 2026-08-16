import { Award, GraduationCap, Sparkles } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { certifications, timeline, valuePropositions } from '@/lib/data';

export function Education() {
  return (
    <section id="formation" className="border-b border-border py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Formation & certifications"
          title="Un parcours d'ingénieur, complété en continu"
          description="Une formation scientifique exigeante, prolongée par des certifications ciblées sur l'administration système, la sécurité offensive et l'ingénierie assistée par IA."
        />

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          {/* Timeline verticale */}
          <ol className="relative space-y-8 border-l border-border pl-7 sm:pl-8">
            {timeline.map((entry, index) => (
              <li key={entry.id} className="relative">
                <Reveal delay={index * 90}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.05rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background sm:-left-[2.3rem]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-wider text-primary">
                    {entry.period}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{entry.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {entry.institution}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Formations continues */}
          <div>
            <Reveal>
              <h3 className="text-base font-semibold text-foreground">Formations continues</h3>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {certifications.map((certification, index) => (
                <li key={certification.id}>
                  <Reveal delay={index * 60}>
                    <div className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/30">
                      <Award
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{certification.title}</p>
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {certification.issuer}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Encadre "Pourquoi moi ?" */}
        <Reveal className="mt-12 sm:mt-14">
          <Card className="relative overflow-hidden border-primary/30 bg-muted/30">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            />
            <CardHeader className="relative flex-row items-center gap-3 space-y-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-background text-primary">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-lg sm:text-xl">Pourquoi moi ?</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <ul className="grid gap-6 md:grid-cols-2">
                {valuePropositions.map((proposition, index) => (
                  <li key={proposition.id}>
                    <Reveal delay={index * 80}>
                      <h4 className="text-sm font-semibold text-foreground">{proposition.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {proposition.description}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
