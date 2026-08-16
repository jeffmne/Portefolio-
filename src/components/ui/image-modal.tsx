'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ProjectImage } from '@/lib/data';

interface ImageModalProps {
  images: ProjectImage[];
  className?: string;
}

/**
 * Galerie de captures d'ecran avec lightbox plein ecran.
 *
 * Le piegeage du focus, la fermeture par la touche Echap et le clic sur
 * l'arriere-plan sont assures par la primitive Dialog de Radix ; la navigation
 * gauche/droite au clavier est ajoutee ici.
 */
export function ImageModal({ images, className }: ImageModalProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const activeImage = activeIndex === null ? undefined : images[activeIndex];

  const goTo = React.useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        if (current === null || images.length === 0) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (images.length < 2) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(-1);
    }
  };

  if (images.length === 0) return null;

  return (
    <>
      <ul className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Agrandir l'image : ${image.caption}`}
              className="group relative block w-full overflow-hidden rounded-md border border-border bg-muted/40 ring-offset-background transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="relative block aspect-[16/10]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-5 w-5 text-foreground" aria-hidden="true" />
                </span>
              </span>
              <span className="block border-t border-border px-3 py-2 text-left font-mono text-[11px] text-muted-foreground transition-colors duration-200 group-hover:text-foreground sm:text-xs">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={isOpen} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={handleKeyDown}
          className="max-w-6xl border-none bg-transparent p-0 shadow-none focus:outline-none"
        >
          {activeImage ? (
            <figure className="flex flex-col gap-3">
              {/* Le ratio fixe reserve la place de l'image pendant son
                  chargement : la modale ne saute pas a l'ouverture. */}
              <div className="relative mx-auto aspect-[16/10] max-h-[80vh] w-full overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="90vw"
                  // La modale ne s'ouvre qu'a la demande : on charge sans
                  // attendre l'observateur d'intersection.
                  priority
                  className="object-contain"
                />
              </div>
              <figcaption className="text-center">
                <DialogTitle className="font-mono text-sm font-normal text-muted-foreground">
                  {activeImage.caption}
                  {images.length > 1 ? (
                    <span className="ml-2 text-muted-foreground/70">
                      {(activeIndex ?? 0) + 1} / {images.length}
                    </span>
                  ) : null}
                </DialogTitle>
              </figcaption>
            </figure>
          ) : null}

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          ) : null}

          <DialogClose
            aria-label="Fermer la galerie"
            className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:-top-12 sm:right-0"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
