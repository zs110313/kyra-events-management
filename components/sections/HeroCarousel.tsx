"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    title: "Weddings",
    label: "Wedding Stages",
    href: "/portfolio?category=weddings",
    image: "/images/portfolio/weddings/hero-stage.webp",
    alt: "Luxury South Asian wedding stage with gold lighting and floral decor"
  },
  {
    title: "Nikkahs",
    label: "Nikkah Setups",
    href: "/portfolio?category=nikkahs",
    image: "/images/portfolio/nikkahs/nikkah-stage.webp",
    alt: "Elegant Nikkah ceremony stage with ivory draping and gold accents"
  },
  {
    title: "Mehndis",
    label: "Mehndi Styling",
    href: "/portfolio?category=mehndis",
    image: "/images/portfolio/mehndis/mehndi-stage.webp",
    alt: "Luxury Mehndi stage with vibrant florals and jewel-toned textiles"
  }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = heroSlides[index];

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => window.clearInterval(id);
  }, [paused]);

  function goToPrevious() {
    setIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }

  function goToNext() {
    setIndex((current) => (current + 1) % heroSlides.length);
  }

  return (
    <div
      className="relative aspect-[4/5] max-h-[58vh] min-h-[360px] overflow-hidden rounded-sm border border-white/10 shadow-gold sm:aspect-[16/11] sm:max-h-[560px] lg:h-[min(64vh,620px)] lg:min-h-[460px] lg:max-h-[620px]"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((slide, slideIndex) => (
        <Link
          key={slide.image}
          href={slide.href}
          aria-label={`View ${slide.title} portfolio`}
          className={cn(
            "absolute inset-0 transition duration-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold-300",
            slideIndex === index ? "z-10 opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={slideIndex === 0}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </Link>
      ))}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 z-30 flex items-end justify-between gap-4 border-l border-gold-400/70 bg-ink/72 p-5 backdrop-blur">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-gold-300">{active.label}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mist">Tap to view portfolio</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous hero image"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300"
            onClick={goToPrevious}
          >
            <ChevronLeft aria-hidden size={16} />
          </button>
          <button
            type="button"
            aria-label="Next hero image"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300"
            onClick={goToNext}
          >
            <ChevronRight aria-hidden size={16} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-5 z-30 flex gap-2 sm:bottom-24">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show ${slide.title} slide`}
            className={cn(
              "h-1.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-gold-300",
              slideIndex === index ? "w-8 bg-gold-300" : "w-3 bg-white/40 hover:bg-gold-300/70"
            )}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
}
