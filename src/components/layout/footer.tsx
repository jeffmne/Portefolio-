import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

import { contactChannels, footer, siteConfig, socialLinks } from '@/lib/data';

const email = contactChannels.find((channel) => channel.id === 'email')?.href ?? '#contact';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{siteConfig.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{siteConfig.role}</p>
        </div>

        <nav aria-label="Liens rapides">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-2 text-sm text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground ring-offset-background transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground ring-offset-background transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={email}
              aria-label="Envoyer un email"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground ring-offset-background transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-border">
        <div className="container py-5">
          <p className="text-xs text-muted-foreground">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
