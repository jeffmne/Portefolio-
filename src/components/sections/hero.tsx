import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { hero, siteConfig } from '@/lib/data';

/** Cascade d'apparition au chargement, en millisecondes. */
const STEP = 90;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* Motif technique d'arriere-plan, volontairement tres discret */}
      <div
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] motion-safe:animate-fade-in"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl motion-safe:animate-fade-in"
      />

      <div className="container relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <p
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-[11px] text-muted-foreground motion-safe:animate-fade-in-up sm:text-xs"
            style={{ animationDelay: `${STEP}ms` }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary motion-safe:animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {hero.eyebrow}
          </p>

          <h1
            className="mt-6 text-[clamp(1.95rem,6.2vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-foreground motion-safe:animate-fade-in-up"
            style={{ animationDelay: `${STEP * 2}ms` }}
          >
            {hero.heading}
          </h1>

          <p
            className="mt-4 text-[clamp(1.05rem,2.7vw,1.5rem)] font-medium text-primary motion-safe:animate-fade-in-up"
            style={{ animationDelay: `${STEP * 3}ms` }}
          >
            {hero.subheading}
          </p>

          <p
            className="mt-6 max-w-2xl text-[clamp(0.95rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground motion-safe:animate-fade-in-up"
            style={{ animationDelay: `${STEP * 4}ms` }}
          >
            {hero.paragraph}
          </p>

          <div
            className="mt-9 flex flex-col gap-3 motion-safe:animate-fade-in-up sm:flex-row"
            style={{ animationDelay: `${STEP * 5}ms` }}
          >
            <Button asChild size="lg" className="group shadow-sm hover:shadow-md">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group">
              <a href={hero.secondaryCta.href} download>
                <Download
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                {hero.secondaryCta.label}
              </a>
            </Button>
          </div>

          <p
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground motion-safe:animate-fade-in-up"
            style={{ animationDelay: `${STEP * 6}ms` }}
          >
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            Gabon — missions sur site et à distance
          </p>
        </div>

        <ul
          className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border motion-safe:animate-fade-in-up sm:mt-14 sm:grid-cols-3"
          style={{ animationDelay: `${STEP * 7}ms` }}
        >
          {hero.highlights.map((highlight) => (
            <li
              key={highlight.id}
              className="group bg-background p-5 transition-colors duration-300 hover:bg-muted/40"
            >
              <p className="font-mono text-sm font-medium uppercase tracking-wider text-primary">
                {highlight.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{highlight.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <span className="sr-only">{siteConfig.description}</span>
    </section>
  );
}
