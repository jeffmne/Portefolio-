import { CalendarClock, ExternalLink, Linkedin, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/ui/contact-form';
import { SectionHeading } from '@/components/ui/section-heading';
import { contactChannels, contactSection } from '@/lib/data';

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
};

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title={contactSection.heading}
          description={contactSection.paragraph}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Décrivez votre besoin</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-5">
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
                          className="group flex items-center gap-3 rounded-md border border-border p-3 ring-offset-background transition-colors duration-200 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

            <Card className="border-primary/30 bg-muted/30">
              <CardContent className="flex items-start gap-3 p-5">
                <CalendarClock
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">Disponibilité</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {contactSection.availability}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
