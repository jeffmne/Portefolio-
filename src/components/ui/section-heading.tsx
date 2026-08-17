import { AccentWord } from '@/components/ui/accent-word';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /**
   * Fragment du titre à mettre en valeur en serif italique souligné.
   * Doit apparaître tel quel dans `title` ; sinon il est ignoré.
   */
  accent?: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  className,
}: SectionHeadingProps) {
  const parts = accent && title.includes(accent) ? title.split(accent) : null;

  return (
    <Reveal className={cn('max-w-2xl space-y-4', className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.6rem,3.8vw,2.35rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-foreground">
        {parts ? (
          <>
            {parts[0]}
            <AccentWord>{accent}</AccentWord>
            {parts.slice(1).join(accent)}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p className="text-[clamp(0.95rem,1.6vw,1.05rem)] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
