import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo.svg"
            alt={`${site.name} logo`}
            width={150}
            height={60}
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-7 text-mist">{site.description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold-300">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ivory">Contact</h2>
          <div className="mt-5 grid gap-3 text-sm text-mist">
            <a className="inline-flex items-center gap-3 hover:text-gold-300" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <Phone aria-hidden size={16} /> {site.phone}
            </a>
            <a className="inline-flex items-center gap-3 hover:text-gold-300" href={`mailto:${site.email}`}>
              <Mail aria-hidden size={16} /> {site.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-1 shrink-0" size={16} /> {site.address}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ivory">Social</h2>
          <div className="mt-5 flex gap-3">
            <a
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-gold-400 hover:text-gold-300"
              href={site.instagram}
              rel="noreferrer"
              target="_blank"
            >
              <Instagram aria-hidden size={18} />
            </a>
            <a
              aria-label="TikTok"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition hover:border-gold-400 hover:text-gold-300"
              href={site.tiktok}
              rel="noreferrer"
              target="_blank"
            >
              <Send aria-hidden size={18} />
            </a>
          </div>
          <Link className="mt-6 inline-block text-sm text-gold-300 hover:text-gold-400" href="/book-a-call">
            Book a consultation
          </Link>
        </div>
      </Container>
    </footer>
  );
}
