import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ServiceCard } from '@/components/ui/service-card';
import { services } from '@/lib/data';

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container max-w-[1280px]">
        <SectionHeading
          eyebrow="Services"
          title="De l'infrastructure au produit numérique"
          accent="produit numérique"
          description="Cinq domaines d'intervention complémentaires, de la couche réseau jusqu'à l'application métier."
        />

        {/* Aucun decalage : la liste est sur une seule colonne, c'est le
            defilement lui-meme qui fait entrer les lignes l'une apres
            l'autre. */}
        <div className="mt-12 border-t border-[#151515]/15">
          {services.map((service) => (
            <Reveal key={service.id} rootMargin="0px 0px -18% 0px">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

