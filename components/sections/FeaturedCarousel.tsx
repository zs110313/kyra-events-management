"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { portfolioItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function FeaturedCarousel() {
  const featured = useMemo(() => portfolioItems, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % featured.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [featured.length]);

  const active = featured[index];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">Featured Work</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-ivory">Atmospheric stage design</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              aria-label="Previous featured image"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300"
              type="button"
              onClick={() => setIndex((current) => (current - 1 + featured.length) % featured.length)}
            >
              <ChevronLeft aria-hidden size={18} />
            </button>
            <button
              aria-label="Next featured image"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300"
              type="button"
              onClick={() => setIndex((current) => (current + 1) % featured.length)}
            >
              <ChevronRight aria-hidden size={18} />
            </button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-charcoal sm:aspect-[16/9]">
          {featured.map((item, itemIndex) => (
            <Image
              key={item.image}
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className={cn(
                "object-cover transition duration-700",
                itemIndex === index ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{active.category}</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-ivory">{active.title}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
