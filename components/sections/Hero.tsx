import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-gold-300">
            Luxury Asian Event Styling
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.95] text-ivory sm:text-6xl lg:text-7xl">
            Kyra Events
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-mist sm:text-xl">{site.tagline}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/book-a-call">
              Book a Consultation
              <ArrowRight aria-hidden className="ml-3" size={17} />
            </Button>
            <Button href="/portfolio" variant="secondary">
              View Portfolio
            </Button>
          </div>
        </div>
        <HeroCarousel />
      </Container>
    </section>
  );
}
