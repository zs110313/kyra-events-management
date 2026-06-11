"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ivory transition hover:border-gold-400/70 focus:outline-none focus:ring-2 focus:ring-gold-300"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </button>
      <div
        id="mobile-navigation"
        className={cn(
          "absolute left-5 right-5 top-20 overflow-hidden rounded-sm border border-white/10 bg-charcoal/98 shadow-gold backdrop-blur transition-all duration-300",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile navigation" className="grid p-2">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "rounded-sm px-4 py-3 text-sm font-medium text-mist transition hover:bg-white/[0.04] hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300",
                pathname === route.href && "text-gold-300"
              )}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
