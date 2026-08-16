import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { hero, siteConfig } from '@/lib/data';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* Motif technique d'arriere-plan, volontairement tres discret */}
      <div
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.heading}
          </h1>

          <p className="mt-4 text-xl font-medium text-primary sm:text-2xl">{hero.subheading}</p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.paragraph}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href} download>
                <Download className="h-4 w-4" aria-hidden="true" />
                {hero.secondaryCta.label}
              </a>
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Gabon — missions sur site et à distance
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {hero.highlights.map((highlight) => (
            <li key={highlight.id} className="bg-background p-5">
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
