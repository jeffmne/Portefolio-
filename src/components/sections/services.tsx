import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ServiceCard } from '@/components/ui/service-card';
import { services } from '@/lib/data';

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Ce que je livre à mes clients"
          accent="mes clients"
          description="Cinq domaines d'intervention complémentaires, de la couche réseau jusqu'à l'application métier — pour des prestations ponctuelles ou des accompagnements au long cours."
        />

        <div className="mt-12 border-t border-border">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
