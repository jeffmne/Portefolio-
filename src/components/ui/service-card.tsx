import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/ui/skill-badge';
import type { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Voile d'accent revele au survol */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <CardHeader className="relative gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/60 text-primary transition-[transform,border-color,background-color] duration-300 group-hover:scale-105 group-hover:border-primary/40 group-hover:bg-muted">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative mt-auto">
        <ul className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li key={tag}>
              <SkillBadge label={tag} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
