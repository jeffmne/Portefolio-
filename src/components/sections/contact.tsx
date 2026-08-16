import { ExternalLink, Linkedin, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/ui/contact-form';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { contactChannels, contactSection } from '@/lib/data';

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
};

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title={contactSection.heading}
          description={contactSection.paragraph}
        />

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Décrivez votre besoin</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="space-y-5" delay={100}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Coordonnées directes</CardTitle>
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
                          className="group flex items-center gap-3 rounded-md border border-border p-3 ring-offset-background transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
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
                              className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
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
