import { ArrowUpRight, Linkedin, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ContactForm } from '@/components/ui/contact-form';
import { Reveal } from '@/components/ui/reveal';
import { contactChannels, contactSection } from '@/lib/data';

const channelIcons: Record<string, LucideIcon> = { email: Mail, phone: Phone, linkedin: Linkedin };

export function Contact() {
  return (
    <section id="contact" className="bg-white px-3 pb-3 pt-6 md:px-6 md:pb-6">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[22px] bg-[#151515] px-6 py-16 text-white md:px-12 md:py-24 lg:px-20">
        <Reveal>
          <p className="section-kicker">/Contact</p>
          <h2 className="mt-5 max-w-6xl font-display text-[clamp(3rem,10vw,9rem)] font-semibold uppercase leading-[0.86] tracking-[-0.065em]">
            Un projet en tête&nbsp;?
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {contactSection.paragraph}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-8">
              <h3 className="mb-6 text-xl font-semibold">Décrivez votre besoin</h3>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h3 className="text-xl font-semibold">Coordonnées directes</h3>
              <ul className="mt-6 divide-y divide-white/10">
                {contactChannels.map((channel) => {
                  const Icon = channelIcons[channel.id] ?? Mail;
                  return (
                    <li key={channel.id}>
                      <a href={channel.href} target={channel.external ? '_blank' : undefined} rel={channel.external ? 'noopener noreferrer' : undefined} className="group flex items-center gap-4 py-5">
                        <span className="grid size-11 place-items-center rounded-full border border-white/15 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">{channel.label}</span>
                          <span className="mt-1 block truncate text-sm text-white/80">{channel.value}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/35 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                Libreville · Gabon · Disponible à distance
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

