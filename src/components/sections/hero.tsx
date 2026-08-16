import Image from 'next/image';
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

      <div className="container relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
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
              className="mt-6 text-[clamp(1.95rem,5.4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-foreground motion-safe:animate-fade-in-up"
              style={{ animationDelay: `${STEP * 2}ms` }}
            >
              {hero.heading}
            </h1>

            <p
              className="mt-4 text-[clamp(1.05rem,2.4vw,1.375rem)] font-medium text-primary motion-safe:animate-fade-in-up"
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
              <Button asChild size="lg" className="group">
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

          <div
            className="motion-safe:animate-fade-in-up lg:col-span-5"
            style={{ animationDelay: `${STEP * 3}ms` }}
          >
            <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:ml-auto lg:mr-0 lg:max-w-none">
              <Image
                src={hero.portrait.src}
                alt={hero.portrait.alt}
                width={hero.portrait.width}
                height={hero.portrait.height}
                priority
                sizes="(max-width: 640px) 272px, (max-width: 1024px) 320px, 400px"
                className="w-full rounded-xl border border-border object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">{siteConfig.description}</span>
    </section>
  );
}
