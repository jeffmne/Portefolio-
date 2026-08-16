import { Award, GraduationCap, Sparkles } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { certifications, timeline, valuePropositions } from '@/lib/data';

export function Education() {
  return (
    <section id="formation" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Formation & certifications"
          title="Un parcours d'ingénieur, complété en continu"
          description="Une formation scientifique exigeante, prolongée par des certifications ciblées sur l'administration système, la sécurité offensive et l'ingénierie assistée par IA."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Timeline verticale */}
          <ol className="relative space-y-8 border-l border-border pl-8">
            {timeline.map((entry) => (
              <li key={entry.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.3rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
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
              </li>
            ))}
          </ol>

          {/* Formations continues */}
          <div>
            <h3 className="text-base font-semibold text-foreground">Formations continues</h3>
            <ul className="mt-5 space-y-3">
              {certifications.map((certification) => (
                <li
                  key={certification.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors duration-200 hover:border-primary/40"
                >
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{certification.title}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {certification.issuer}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Encadre "Pourquoi moi ?" */}
        <Card className="mt-14 border-primary/30 bg-muted/30">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-background text-primary">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <CardTitle className="text-xl">Pourquoi moi ?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-6 md:grid-cols-2">
              {valuePropositions.map((proposition) => (
                <li key={proposition.id}>
                  <h4 className="text-sm font-semibold text-foreground">{proposition.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {proposition.description}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
