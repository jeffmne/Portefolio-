import { SectionHeading } from '@/components/ui/section-heading';
import { ServiceCard } from '@/components/ui/service-card';
import { services } from '@/lib/data';

export function Services() {
  return (
    <section id="services" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Ce que je livre à mes clients"
          description="Cinq domaines d'intervention complémentaires, de la couche réseau jusqu'à l'application métier — pour des prestations ponctuelles ou des accompagnements au long cours."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
