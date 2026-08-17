'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface AccentWordProps {
  children: React.ReactNode;
  className?: string;
  /** Attente avant que le trait ne se trace, en millisecondes. */
  delay?: number;
}

/**
 * Mot mis en valeur en serif italique, souligné d'un trait qui se trace
 * lorsque le mot entre dans le viewport. Le style vit dans `globals.css`
 * (`.accent-word`) ; ce composant ne pilote que le déclenchement.
 */
export function AccentWord({ children, className, delay = 0 }: AccentWordProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [drawn, setDrawn] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setDrawn(true), delay);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={cn('accent-word', drawn && 'is-drawn', className)}>
      {children}
    </span>
  );
}
