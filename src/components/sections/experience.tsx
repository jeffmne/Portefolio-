import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { experiences } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="bg-white px-3 py-3 md:px-6 md:py-6">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[22px] bg-[#0f0f10] px-6 py-16 text-white md:px-12 md:py-24 lg:px-20">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">/Expérience</p>
              <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em]">
                Le terrain avant la théorie
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
              {experiences.length} expériences
            </p>
          </div>
        </Reveal>

        <ol className="mt-3 divide-y divide-white/10">
          {experiences.map((experience, index) => (
            <li key={experience.id}>
              <Reveal rootMargin="0px 0px -12% 0px">
                <article className="group grid gap-5 py-8 transition-colors duration-500 hover:bg-white/[0.035] md:grid-cols-[3.5rem_1.2fr_1fr_auto] md:items-start md:px-4">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{experience.role}</h3>
                    <p className="mt-2 text-sm text-white/55">
                      {experience.organisation}
                      {experience.group ? ` · ${experience.group}` : ''}
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm leading-relaxed text-white/55">
                    {experience.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 md:justify-end">
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-white/45">{experience.period}</span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

