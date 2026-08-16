'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  /** Decalage d'apparition, en millisecondes, pour les effets en cascade. */
  delay?: number;
  className?: string;
}

/**
 * Revele son contenu au premier passage dans le viewport (fondu + leger
 * deplacement vertical), puis cesse d'observer.
 *
 * L'etat masque n'est applique que via la variante `motion-safe` : si le
 * visiteur a demande la reduction des animations, le contenu est visible
 * immediatement, sans dependre de JavaScript.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // Marge en pixels plutot qu'en pourcentage : le declenchement reste
      // fiable sur les viewports courts (mobiles en paysage).
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform] duration-500 ease-out motion-safe:translate-y-3 motion-safe:opacity-0',
        visible && 'motion-safe:translate-y-0 motion-safe:opacity-100',
        className,
      )}
    >
      {children}
    </div>
  );
}
