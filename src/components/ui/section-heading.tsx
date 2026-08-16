import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl space-y-3', className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.5rem,3.6vw,1.875rem)] font-bold leading-tight tracking-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="text-[clamp(0.95rem,1.6vw,1rem)] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
