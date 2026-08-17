import { ArrowUpRight } from 'lucide-react';

import type { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
}

/**
 * Une ligne de service : filet de séparation, flèche circulaire, et un aplat
 * accent qui monte depuis le bas au survol.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <a
      href="#contact"
      className="group relative flex items-center justify-between gap-5 overflow-hidden border-b border-border px-2 py-6 ring-offset-background transition-[padding,color] duration-500 ease-smooth hover:px-5 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 translate-y-full bg-primary transition-transform duration-500 ease-smooth group-hover:translate-y-0"
      />

      <span className="relative z-10 flex min-w-0 items-start gap-4">
        <span className="mt-0.5 shrink-0 text-primary transition-colors duration-500 ease-smooth group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-bold tracking-tight sm:text-xl">{service.title}</span>
          <span className="mt-1.5 block max-w-[52ch] text-sm leading-relaxed text-muted-foreground transition-colors duration-500 ease-smooth group-hover:text-primary-foreground/80">
            {service.description}
          </span>
          <span className="mt-2.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors duration-500 ease-smooth group-hover:text-primary-foreground/70">
            {service.tags.join(' · ')}
          </span>
        </span>
      </span>

      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-[background-color,color,transform] duration-500 ease-smooth group-hover:translate-x-1 group-hover:bg-card group-hover:text-primary">
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </span>
    </a>
  );
}
