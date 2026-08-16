import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  label: string;
  className?: string;
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted hover:text-foreground sm:text-xs',
        className,
      )}
    >
      {label}
    </span>
  );
}
