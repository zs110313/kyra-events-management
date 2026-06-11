import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { ROUTES } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gold-300">
          <Image
            src="/brand/logo.svg"
            alt={`${site.name} logo`}
            width={132}
            height={52}
            priority
            className="h-12 w-auto"
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-medium text-mist transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300"
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}
