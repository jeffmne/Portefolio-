import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ServiceCard } from '@/components/ui/service-card';
import { services } from '@/lib/data';

export function Services() {
  return (
    <section id="services" className="border-b border-border py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Ce que je livre à mes clients"
          description="Cinq domaines d'intervention complémentaires, de la couche réseau jusqu'à l'application métier — pour des prestations ponctuelles ou des accompagnements au long cours."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal className="h-full" delay={index * 70}>
                <ServiceCard service={service} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
