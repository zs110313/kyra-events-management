import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactCta() {
  return (
    <section className="border-t border-white/10 bg-charcoal/60 py-16 sm:py-24">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">Start Planning</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
            Ready to create a setting that feels unmistakably yours?
          </h2>
        </div>
        <Button href="/book-a-call" className="shrink-0">
          Book a Consultation
          <ArrowRight aria-hidden className="ml-3" size={17} />
        </Button>
      </Container>
    </section>
  );
}
