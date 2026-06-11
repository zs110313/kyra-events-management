import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/ContactCta";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Luxury stage decoration for Asian weddings, Nikkahs and Mehndis."
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-white/10 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Luxury event stages for weddings, Nikkahs and Mehndis."
            copy="Each setup is designed around your venue, colour palette, traditions and desired atmosphere."
            align="center"
          />
        </Container>
      </section>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-16 sm:gap-24">
          {services.map((service, index) => (
            <ServiceDetail key={service.slug} service={service} reverse={index % 2 === 1} />
          ))}
        </Container>
      </section>
      <ContactCta />
    </>
  );
}
