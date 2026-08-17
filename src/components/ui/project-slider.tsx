'use client';

import * as React from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

import { ImageModal } from '@/components/ui/image-modal';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/data';

interface ProjectSliderProps {
  projects: Project[];
}

/** Un dégradé par slide, pris dans la palette. */
const SLIDE_BACKGROUNDS = [
  'bg-[linear-gradient(150deg,hsl(var(--block-blue)),hsl(var(--primary-deep)))]',
  'bg-[linear-gradient(150deg,hsl(var(--block-rose)),hsl(var(--block-ink)))]',
  'bg-[linear-gradient(150deg,hsl(var(--block-ink)),hsl(var(--block-blue)))]',
];

const SWIPE_THRESHOLD = 45;

export function ProjectSlider({ projects }: ProjectSliderProps) {
  const [index, setIndex] = React.useState(0);
  const startX = React.useRef<number | null>(null);
  const count = projects.length;

  const goTo = React.useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  if (count === 0) return null;

  return (
    <div className="relative">
      <div
        role="group"
        aria-roledescription="carrousel"
        aria-label="Projets et études de cas"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={(event) => {
          startX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (startX.current === null) return;
          const delta = event.clientX - startX.current;
          if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(index + (delta < 0 ? 1 : -1));
          startX.current = null;
        }}
        className="overflow-hidden rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        <div
          className="flex transition-transform duration-700 ease-smooth"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {projects.map((project, slide) => (
            <article
              key={project.id}
              aria-hidden={slide !== index}
              className={cn(
                'grain relative flex min-h-[26rem] w-full shrink-0 flex-col justify-end overflow-hidden p-7 text-white sm:min-h-[28rem] sm:p-10 lg:p-14',
                SLIDE_BACKGROUNDS[slide % SLIDE_BACKGROUNDS.length],
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-[10%] -top-[22%] z-0 aspect-square w-[42%] rounded-[56%_44%_48%_52%/52%_48%_52%_48%] bg-white/10 blur-[1px] motion-safe:animate-drift-slow"
              />

              <div className="relative z-10">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
                  <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {project.organisation ?? 'Projet personnel'}
                  {project.context ? (
                    <span className="text-white/55">· {project.context}</span>
                  ) : null}
                </p>

                <h3 className="mt-3 max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-[52ch] leading-relaxed text-white/85">{project.problem}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.slice(0, 6).map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] backdrop-blur-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <ImageModal images={project.images} variant="button" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Choisir un projet">
          {projects.map((project, slide) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={slide === index}
              aria-label={project.title}
              onClick={() => goTo(slide)}
              /* La barre reste fine ; le bouton, lui, garde une hauteur
                 confortable au doigt. */
              className="group flex h-11 items-center rounded-full px-0.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span
                className={cn(
                  'h-1.5 rounded-full transition-[width,background-color] duration-500 ease-smooth',
                  slide === index
                    ? 'w-12 bg-primary'
                    : 'w-7 bg-border group-hover:bg-muted-foreground/50',
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Projet précédent"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground ring-offset-background transition-[background-color,color,transform] duration-300 ease-smooth hover:scale-105 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Projet suivant"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground ring-offset-background transition-[background-color,color,transform] duration-300 ease-smooth hover:scale-105 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
