import { ExternalLink, Linkedin, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { AccentWord } from '@/components/ui/accent-word';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/ui/contact-form';
import { Reveal } from '@/components/ui/reveal';
import { contactChannels, contactSection } from '@/lib/data';

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
};

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28">
      <div className="container">
        {/* Bloc d'appel : l'aplat framboise, contrepoint du hero bleu. */}
        <Reveal>
          <div className="grain relative overflow-hidden rounded-lg bg-block-rose px-6 py-14 text-center text-on-block sm:px-10 sm:py-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1/2 -left-[16%] z-0 aspect-square w-[52%] rounded-[58%_42%_47%_53%/50%_56%_44%_50%] bg-[radial-gradient(circle_at_35%_35%,hsl(var(--block-blue)),transparent_65%)] opacity-80 blur-[6px] motion-safe:animate-drift"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-[10%] -top-[35%] z-0 aspect-square w-[38%] rounded-[46%_54%_50%_50%/52%_46%_54%_48%] bg-peach/50 blur-[6px] motion-safe:animate-drift-slow"
            />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-[20ch] text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.14] tracking-[-0.02em]">
                Un projet, une question, ou l&apos;envie <AccentWord>d&apos;en discuter</AccentWord>{' '}
                ?
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] leading-relaxed text-on-block/85">
                {contactSection.paragraph}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-extrabold tracking-tight">
                  Décrivez votre besoin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-bold">Coordonnées directes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {contactChannels.map((channel) => {
                    const Icon = CHANNEL_ICONS[channel.id] ?? Mail;
                    return (
                      <li key={channel.id}>
                        <a
                          href={channel.href}
                          {...(channel.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="group flex items-center gap-3 rounded-md border border-border p-3.5 ring-offset-background transition-[transform,border-color,background-color] duration-300 ease-smooth hover:-translate-y-0.5 hover:border-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-300 ease-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs text-muted-foreground">
                              {channel.label}
                            </span>
                            <span className="block truncate font-mono text-sm text-foreground">
                              {channel.value}
                            </span>
                          </span>
                          {channel.external ? (
                            <ExternalLink
                              className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                              aria-hidden="true"
                            />
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
