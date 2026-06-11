import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IntroSection() {
  return (
    <section className="border-y border-white/10 bg-charcoal/55 py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <SectionHeading
          eyebrow="About Kyra Events"
          title="Elegant setups shaped around your celebration."
        />
        <div className="grid gap-6 text-base leading-8 text-mist sm:grid-cols-2">
          <p>
            Kyra Events creates refined wedding and event stage decoration for Asian celebrations,
            balancing cultural richness with a clean luxury finish.
          </p>
          <p>
            From first consultation to final styling, every backdrop, floral layer and seating
            detail is chosen to feel considered, photogenic and effortless on the day.
          </p>
        </div>
      </Container>
    </section>
  );
}
