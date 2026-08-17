import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';

import { AccentWord } from '@/components/ui/accent-word';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/ui/marquee';
import { hero, siteConfig } from '@/lib/data';

/** Cascade d'apparition au chargement, en millisecondes. */
const STEP = 110;

export function Hero() {
  return (
    <section id="top" className="pt-6 sm:pt-8">
      <div className="container">
        <div className="grain relative overflow-hidden rounded-lg bg-block-blue px-6 py-14 text-on-block shadow-2xl shadow-block-blue/25 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          {/* Dégradés organiques : dessinés en CSS, aucune image importée. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1/3 -left-[18%] z-0 aspect-square w-[62%] rounded-[58%_42%_47%_53%/50%_56%_44%_50%] bg-[radial-gradient(circle_at_30%_30%,hsl(var(--block-rose)),transparent_62%),radial-gradient(circle_at_70%_70%,#5b34c4,transparent_60%)] opacity-70 blur-[6px] motion-safe:animate-drift"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[12%] -top-[26%] z-0 aspect-[1.2] w-[48%] rounded-[44%_56%_52%_48%/48%_44%_56%_52%] bg-gradient-to-br from-peach to-block-rose opacity-60 blur-[6px] motion-safe:animate-drift-slow"
          />

          <div className="relative z-10 grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <p
                className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11px] backdrop-blur-sm motion-safe:animate-fade-in-up sm:text-xs"
                style={{ animationDelay: `${STEP}ms` }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white motion-safe:animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {hero.eyebrow}
              </p>

              <p
                className="mt-7 text-lg font-semibold motion-safe:animate-fade-in-up sm:text-xl"
                style={{ animationDelay: `${STEP * 1.4}ms` }}
              >
                {hero.greeting}
              </p>

              <h1 className="mt-1 text-[clamp(2.1rem,5.6vw,3.9rem)] font-extrabold leading-[1.03] tracking-[-0.03em]">
                {hero.headingLines.map((line, index) => (
                  <span key={line} className="mask-line">
                    <span
                      className="block motion-safe:animate-rise-line"
                      style={{ animationDelay: `${STEP * (2 + index * 0.55)}ms` }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
                <span className="mask-line">
                  <span
                    className="block motion-safe:animate-rise-line"
                    style={{ animationDelay: `${STEP * 3.1}ms` }}
                  >
                    <AccentWord delay={700}>{hero.headingAccent}</AccentWord>
                  </span>
                </span>
              </h1>

              <p
                className="mt-6 max-w-[30ch] text-lg font-semibold text-white/90 motion-safe:animate-fade-in-up sm:text-xl"
                style={{ animationDelay: `${STEP * 4}ms` }}
              >
                {hero.subheading}
              </p>

              <p
                className="mt-4 max-w-[46ch] leading-relaxed text-white/80 motion-safe:animate-fade-in-up"
                style={{ animationDelay: `${STEP * 4.6}ms` }}
              >
                {hero.paragraph}
              </p>

              <div
                className="mt-9 flex flex-col gap-3 motion-safe:animate-fade-in-up sm:flex-row"
                style={{ animationDelay: `${STEP * 5.2}ms` }}
              >
                <Button asChild size="lg" variant="cream" className="group">
                  <Link href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="group bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 hover:shadow-none"
                >
                  <a href={hero.secondaryCta.href} download>
                    <Download
                      className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                    {hero.secondaryCta.label}
                  </a>
                </Button>
              </div>

              <p
                className="mt-7 flex items-center gap-2 text-sm text-white/75 motion-safe:animate-fade-in-up"
                style={{ animationDelay: `${STEP * 5.8}ms` }}
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Gabon — missions sur site et à distance
              </p>
            </div>

            {/**
             * Incrustation. En dessous de lg le portrait est entièrement
             * visible, dimensionné par sa hauteur. À partir de lg il repose
             * sur le bord inférieur du bloc (marge négative compensant le
             * rembourrage), ce qui lui donne du relief.
             */}
            <div
              className="motion-safe:animate-fade-in-up lg:col-span-5 lg:-mb-20"
              style={{ animationDelay: `${STEP * 2.6}ms` }}
            >
              <div className="relative mx-auto flex w-fit items-end justify-center lg:ml-auto lg:mr-0 lg:w-full">
                {/* Disque centré sur le buste, décalé à 43 % comme la silhouette. */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-[8%] left-[43%] aspect-square w-[135%] -translate-x-1/2 rounded-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-[1px] lg:w-[92%]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-[14%] left-[43%] aspect-square w-[112%] -translate-x-1/2 rounded-full border border-white/25 lg:w-[76%]"
                />
                <Image
                  src={hero.portrait.src}
                  alt={hero.portrait.alt}
                  width={hero.portrait.width}
                  height={hero.portrait.height}
                  priority
                  sizes="(max-width: 1024px) 260px, 420px"
                  /* En dessous de lg, un fondu dissout la coupe nette du
                     cadrage d'origine ; au-delà, le bord du bloc s'en charge. */
                  className="relative h-[19rem] w-auto drop-shadow-[0_26px_40px_rgba(0,0,0,0.4)] [-webkit-mask-image:linear-gradient(to_bottom,#000_84%,transparent_99%)] [mask-image:linear-gradient(to_bottom,#000_84%,transparent_99%)] sm:h-[23rem] lg:h-auto lg:w-full lg:[-webkit-mask-image:none] lg:[mask-image:none]"
                />
              </div>
            </div>
          </div>
        </div>

        <Marquee items={hero.marquee} className="mt-10 border-x-0" />
      </div>

      <span className="sr-only">{siteConfig.description}</span>
    </section>
  );
}
