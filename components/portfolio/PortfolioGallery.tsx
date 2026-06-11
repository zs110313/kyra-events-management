"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { Lightbox } from "@/components/portfolio/Lightbox";
import { portfolioItems, type PortfolioCategory } from "@/data/portfolio";

export function PortfolioGallery() {
  const [active, setActive] = useState<PortfolioCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () => portfolioItems.filter((item) => active === "all" || item.category === active),
    [active]
  );

  return (
    <div>
      <PortfolioFilter active={active} onChange={setActive} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <button
            key={item.image}
            type="button"
            className="group overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] text-left transition hover:-translate-y-1 hover:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-300"
            onClick={() => setLightboxIndex(index)}
          >
            <span className="relative block aspect-[4/5]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              <span className="absolute bottom-0 left-0 right-0 p-5">
                <span className="block text-xs uppercase tracking-[0.24em] text-gold-300">{item.category}</span>
                <span className="mt-2 block font-serif text-2xl font-semibold text-ivory">{item.title}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
      {lightboxIndex !== null ? (
        <Lightbox
          items={filteredItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((current) => (current === null ? 0 : (current + 1) % filteredItems.length))}
          onPrevious={() =>
            setLightboxIndex((current) =>
              current === null ? 0 : (current - 1 + filteredItems.length) % filteredItems.length
            )
          }
        />
      ) : null}
    </div>
  );
}
