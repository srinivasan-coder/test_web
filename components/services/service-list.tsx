import { Container } from "@/components/ui/container";
import type { Service } from "@/types";
import { ServiceCard } from "./service-card";
import { ServiceNav } from "./service-nav";

interface ServiceListProps {
  services: Service[];
}

/**
 * Stack of luxury service product blocks with jump navigation.
 */
export function ServiceList({ services }: ServiceListProps) {
  return (
    <section className="section-y pt-10 md:pt-14">
      <Container>
        <ServiceNav services={services} className="mb-12 md:mb-16" />

        <div className="flex flex-col gap-10 lg:gap-14">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              reverse={index % 2 === 1}
              priority={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
