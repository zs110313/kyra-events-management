"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import type { PortfolioItem } from "@/data/portfolio";

type LightboxProps = {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function Lightbox({ items, index, onClose, onNext, onPrevious }: LightboxProps) {
  const item = items[index];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrevious]);

  if (!item) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 backdrop-blur"
      role="dialog"
    >
      <button
        aria-label="Close image viewer"
        className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300"
        type="button"
        onClick={onClose}
      >
        <X aria-hidden size={20} />
      </button>
      <button
        aria-label="Previous image"
        className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300 sm:inline-flex"
        type="button"
        onClick={onPrevious}
      >
        <ChevronLeft aria-hidden size={22} />
      </button>
      <div className="w-full max-w-5xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 sm:aspect-[16/10]">
          <Image src={item.image} alt={item.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <p className="mt-4 text-center font-serif text-3xl font-semibold text-ivory">{item.title}</p>
      </div>
      <button
        aria-label="Next image"
        className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-ivory transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300 sm:inline-flex"
        type="button"
        onClick={onNext}
      >
        <ChevronRight aria-hidden size={22} />
      </button>
    </div>
  );
}
