import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skillCategories } from '@/lib/data';

export function Skills() {
  return (
    <section id="competences" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Compétences"
          title="La matrice technique"
          description="Les technologies que j'administre, développe et audite au quotidien."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <li key={category.id}>
                <Card className="h-full transition-colors duration-200 hover:border-primary/40">
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-base">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <SkillBadge label={skill} />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
