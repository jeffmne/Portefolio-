import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';

import { AccentWord } from '@/components/ui/accent-word';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/ui/marquee';
import { ScrollScene } from '@/components/ui/scroll-scene';
import { hero, siteConfig } from '@/lib/data';

/** Cascade d'apparition au chargement, en millisecondes. */
const STEP = 110;

export function Hero() {
  return (
    <section id="top" className="pt-6 sm:pt-8">
      <ScrollScene className="container">
        {/* Le bloc recule et s'efface a mesure qu'on defile : c'est lui qui
            donne la profondeur, les couches internes se decalent dessus. */}
        <div
          className="grain relative overflow-hidden rounded-lg bg-block-blue px-6 py-14 text-on-block shadow-2xl shadow-block-blue/25 will-change-transform sm:px-10 sm:py-16 lg:px-14 lg:py-20"
          style={{
            transformOrigin: 'top center',
            transform: 'scale(calc(1 - var(--p) * 0.06)) translateY(calc(var(--p) * 18px))',
            opacity: 'calc(1 - var(--p) * 0.28)',
          }}
        >
          {/* Aplat décoratif : il porte désormais les formes, les blobs CSS
              n'ont plus lieu d'être. Il dérive plus lentement que le contenu. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              transform: 'translateY(calc(var(--p) * 56px)) scale(calc(1 + var(--p) * 0.06))',
            }}
          >
            <Image
              src={hero.background.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div
              className="lg:col-span-7"
              style={{ transform: 'translateY(calc(var(--p) * -26px))' }}
            >
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
              style={{
                animationDelay: `${STEP * 2.6}ms`,
                transform: 'translateY(calc(var(--p) * -54px))',
              }}
            >
              <div className="relative mx-auto flex w-fit items-end justify-center lg:ml-auto lg:mr-0 lg:w-full">
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
      </ScrollScene>

      <span className="sr-only">{siteConfig.description}</span>
    </section>
  );
}
