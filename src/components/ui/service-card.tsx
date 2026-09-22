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
    <div className="group relative flex items-start gap-5 overflow-hidden border-b border-[#151515]/15 px-2 py-7 transition-[padding,color] delay-0 duration-500 ease-smooth hover:px-5 hover:text-primary-foreground hover:delay-150 sm:py-9">
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 translate-y-full bg-accent transition-transform delay-0 duration-500 ease-smooth group-hover-fine:translate-y-0 group-hover-fine:delay-150"
      />

      <span className="relative z-10 mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-[#151515]/15 text-accent transition-colors delay-0 duration-500 ease-smooth group-hover-fine:border-white/30 group-hover-fine:text-white group-hover-fine:delay-150">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      {/* Titre, description puis tags entrent un a un une fois la ligne
          revelee. Le pas reste court : trois elements seulement. */}
      <div className="relative z-10 min-w-0 [--stagger:90ms]">
        <h3
          data-reveal-item=""
          style={{ '--i': 0 } as React.CSSProperties}
          className="text-xl font-bold uppercase tracking-[-0.03em] sm:text-2xl"
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

