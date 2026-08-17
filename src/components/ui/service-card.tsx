import type { Service } from '@/lib/data';

interface ServiceCardProps {
  service: Service;
}

/**
 * Une ligne de service : filet de séparation et un aplat accent qui monte
 * depuis le bas au survol.
 *
 * Volontairement non cliquable — une flèche ou un lien y promettrait une
 * destination qui n'existe pas, et renvoyer vers le contact au moindre clic
 * arrachait le visiteur à sa lecture.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group relative flex items-start gap-4 overflow-hidden border-b border-border px-2 py-6 transition-[padding,color] delay-0 duration-500 ease-smooth hover:px-5 hover:text-primary-foreground hover:delay-150 sm:py-8">
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 translate-y-full bg-primary transition-transform delay-0 duration-500 ease-smooth group-hover-fine:translate-y-0 group-hover-fine:delay-150"
      />

      <span className="relative z-10 mt-0.5 shrink-0 text-primary transition-colors delay-0 duration-500 ease-smooth group-hover-fine:text-primary-foreground group-hover-fine:delay-150">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      {/* Titre, description puis tags entrent un a un une fois la ligne
          revelee. Le pas reste court : trois elements seulement. */}
      <div className="relative z-10 min-w-0 [--stagger:90ms]">
        <h3
          data-reveal-item=""
          style={{ '--i': 0 } as React.CSSProperties}
          className="text-lg font-bold tracking-tight sm:text-xl"
        >
          {service.title}
        </h3>
        <p
          data-reveal-item=""
          style={{ '--i': 1 } as React.CSSProperties}
          className="mt-1.5 max-w-[58ch] text-sm leading-relaxed text-muted-foreground transition-colors delay-0 duration-500 ease-smooth group-hover-fine:text-primary-foreground/80 group-hover-fine:delay-150"
        >
          {service.description}
        </p>
        <p
          data-reveal-item=""
          style={{ '--i': 2 } as React.CSSProperties}
          className="mt-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors delay-0 duration-500 ease-smooth group-hover-fine:text-primary-foreground/70 group-hover-fine:delay-150"
        >
          {service.tags.join(' · ')}
        </p>
      </div>
    </div>
  );
}
