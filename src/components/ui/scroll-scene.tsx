'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Distance de défilement, en fraction de la hauteur du viewport, sur
   * laquelle la progression passe de 0 à 1.
   */
  span?: number;
}

/**
 * Expose la progression du défilement de la scène dans la variable CSS `--p`
 * (0 en haut de page, 1 une fois la scène parcourue). Les enfants s'en
 * servent pour composer parallaxe et mise à l'échelle.
 *
 * La lecture est faite dans une frame d'animation et n'écrit qu'une variable
 * CSS : aucun recalcul de mise en page n'est déclenché pendant le défilement.
 */
export function ScrollScene({ children, className, span = 0.85 }: ScrollSceneProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    /**
     * Sous 1024 px le hero occupe presque tout l'écran : y décaler les
     * couches ferait chevaucher le portrait et le texte. La scène reste donc
     * figée sur les petits écrans.
     */
    const wide = window.matchMedia('(min-width: 1024px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduced.matches || !wide.matches) {
        node.style.setProperty('--p', '0');
        return;
      }
      const distance = Math.max(window.innerHeight * span, 1);
      const progress = Math.min(Math.max(window.scrollY / distance, 0), 1);
      node.style.setProperty('--p', progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reduced.addEventListener('change', update);
    wide.addEventListener('change', update);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduced.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, [span]);

  return (
    <div ref={ref} className={cn('[--p:0]', className)}>
      {children}
    </div>
  );
}
