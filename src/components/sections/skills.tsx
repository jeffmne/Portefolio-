import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skillCategories } from '@/lib/data';

export function Skills() {
  return (
    <section id="competences" className="border-b border-border py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Compétences"
          title="La matrice technique"
          description="Les technologies que j'administre, développe et audite au quotidien."
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <li key={category.id}>
                {/* Le defilement seul sequence les rangees ; le decalage ne
                    sert qu'a departager les deux colonnes d'une meme rangee,
                    qui franchissent la ligne de declenchement ensemble. */}
                <Reveal className="h-full" delay={(index % 2) * 90} rootMargin="0px 0px -18% 0px">
                  <Card className="group h-full transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                    <CardHeader className="flex-row items-center gap-3 space-y-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-primary transition-colors duration-300 group-hover:border-primary/40">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <CardTitle className="text-base">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Les badges entrent un a un une fois la carte revelee. */}
                      <ul className="flex flex-wrap gap-2 [--stagger:40ms]">
                        {category.skills.map((skill, position) => (
                          <li
                            key={skill}
                            data-reveal-item=""
                            style={{ '--i': position } as React.CSSProperties}
                          >
                            <SkillBadge label={skill} />
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
