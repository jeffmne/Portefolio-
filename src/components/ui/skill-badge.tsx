import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  label: string;
  className?: string;
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground',
        className,
      )}
    >
      {label}
    </span>
  );
}
