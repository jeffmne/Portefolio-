import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

/**
 * Bandeau défilant, purement décoratif : la liste est dupliquée pour que la
 * translation de 50 % boucle sans couture. Masqué aux lecteurs d'écran, les
 * technologies étant déjà listées dans la section Compétences.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('group overflow-hidden border-y border-border py-4', className)}
    >
      <div className="flex w-max gap-10 group-hover:[animation-play-state:paused] motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-10">
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
              >
                {item}
                <span className="text-accent">&#9670;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
