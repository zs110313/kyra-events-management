import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Designed for the moments your guests remember."
          copy="Luxury stage decoration and styling for the core events around your wedding journey."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href="/services"
              className="group overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-300"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={service.image}
                  alt={`${service.title} stage decoration by Kyra Events`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-3xl font-semibold text-ivory">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{service.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
