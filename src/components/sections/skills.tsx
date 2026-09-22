import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { skillCategories } from '@/lib/data';

export function Skills() {
  return (
    <section id="competences" className="py-20 md:py-28">
      <div className="container max-w-[1280px]">
        <SectionHeading
          eyebrow="Compétences"
          title="Une stack entre infrastructure, sécurité et produit"
          accent="sécurité"
          description="Les outils que j'utilise pour concevoir, déployer, superviser et sécuriser des solutions complètes."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <li key={category.id} className="bg-white">
                <Reveal className="h-full" delay={(index % 2) * 80}>
                  <article className="group h-full p-7 transition-colors duration-500 hover:bg-[#f6f5f3] md:p-9">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-full border border-[#151515]/15 text-accent">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{category.title}</h3>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <li key={skill} className="rounded-full border border-[#151515]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors group-hover:border-accent/40">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

