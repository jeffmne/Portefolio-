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
    <Reveal className={cn('max-w-5xl space-y-5', className)}>
      <p className="section-kicker">/{eyebrow}</p>
      <h2 className="section-title text-foreground">
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
        <p className="max-w-2xl text-[clamp(0.95rem,1.6vw,1.08rem)] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

