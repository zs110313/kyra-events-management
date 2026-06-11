import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

type ServiceDetailProps = {
  service: Service;
  reverse?: boolean;
};

export function ServiceDetail({ service, reverse = false }: ServiceDetailProps) {
  return (
    <article className={cn("grid gap-8 lg:grid-cols-2 lg:items-center", reverse && "lg:[&>*:first-child]:order-2")}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 sm:aspect-[16/11]">
        <Image
          src={service.image}
          alt={`${service.title} stage decoration by Kyra Events`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{service.intro}</p>
        <h2 className="mt-4 font-serif text-4xl font-semibold text-ivory sm:text-5xl">{service.title}</h2>
        <p className="mt-6 max-w-xl text-base leading-8 text-mist">{service.description}</p>
        <Button href="/book-a-call" className="mt-8">
          Discuss {service.title}
          <ArrowRight aria-hidden className="ml-3" size={17} />
        </Button>
      </div>
    </article>
  );
}
