import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/ui/skill-badge';
import type { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card className="group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
      <CardHeader className="gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/60 text-primary transition-colors duration-200 group-hover:border-primary/40">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
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
