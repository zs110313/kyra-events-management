import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { site } from "@/data/site";

export function ContactDetails() {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <h2 className="font-serif text-3xl font-semibold text-ivory">Contact Details</h2>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-mist">
        <a className="flex items-center gap-3 hover:text-gold-300" href={`tel:${site.phone.replace(/\s/g, "")}`}>
          <Phone aria-hidden size={17} /> {site.phone}
        </a>
        <a className="flex items-center gap-3 hover:text-gold-300" href={`mailto:${site.email}`}>
          <Mail aria-hidden size={17} /> {site.email}
        </a>
        <p className="flex items-start gap-3">
          <MapPin aria-hidden className="mt-1 shrink-0" size={17} /> {site.address}
        </p>
      </div>
      <div className="mt-8">
        <WhatsAppButton />
      </div>
    </div>
  );
}
