import Link from 'next/link';
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { ColorRevealPortrait } from '@/components/ui/color-reveal-portrait';
import { Marquee } from '@/components/ui/marquee';
import { contactChannels, hero, siteConfig, socialLinks } from '@/lib/data';

const email = contactChannels.find((channel) => channel.id === 'email')?.href ?? '#contact';

const socials = [
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
  { label: 'GitHub', href: socialLinks.github, icon: Github },
  { label: 'Email', href: email, icon: Mail },
] as const;

export function Hero() {
  return (
    <section id="top" className="px-3 pt-3 md:px-6 md:pt-6">
      <div className="hero-frame relative mx-auto flex min-h-[calc(100svh-24px)] max-w-[1440px] flex-col overflow-hidden rounded-[18px] bg-white md:min-h-[calc(100svh-48px)]">
        <Header />

        <h1 className="hero-name relative z-0 mt-12 select-none whitespace-nowrap text-center font-display font-bold uppercase leading-[0.82] tracking-[0.01em] md:mt-16">
          <span className="hero-name-outline">MENIE</span>
          <span className="inline-block w-[0.18em]" />
          <span>ROD</span>
        </h1>

        <div className="absolute bottom-0 left-1/2 z-10 h-[70%] w-[min(92vw,560px)] -translate-x-1/2 md:h-[74%] lg:h-[78%]">
          <ColorRevealPortrait
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            width={hero.portrait.width}
            height={hero.portrait.height}
            className="h-full w-full"
          />
        </div>

        <div className="relative z-20 mt-auto bg-[linear-gradient(to_top,white_58%,transparent)] px-6 pb-8 pt-32 md:absolute md:bottom-12 md:left-10 md:max-w-md md:bg-none md:px-0 md:pb-0 md:pt-0 lg:bottom-16 lg:left-20">
          <p className="mb-3 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block">
            <MapPin className="mr-2 inline h-3.5 w-3.5" aria-hidden="true" />
            {hero.location}
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-[-0.035em]">
            {hero.heading}
          </h2>
          <p className="mt-3 max-w-[28rem] text-[15px] leading-relaxed text-muted-foreground max-md:hidden">
            {hero.paragraph}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn-dark group px-6 py-3 text-sm font-semibold">
              Collaborons
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
            <a href={hero.secondaryCta.href} download className="pill px-4 py-3 text-sm font-semibold">
              <Download className="h-4 w-4" aria-hidden="true" />
              CV
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 right-10 z-20 hidden flex-col items-end gap-3 md:flex lg:bottom-16 lg:right-20">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="pill group px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[#151515] hover:bg-[#151515] hover:text-white"
              >
                <Icon className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] bg-white px-3 pb-3 pt-8 md:px-0 md:pb-0">
        <Marquee items={hero.marquee} className="border-x-0 border-y border-[#e8e8e6] bg-white" />
      </div>

      <span className="sr-only">{siteConfig.description}</span>
    </section>
  );
}

