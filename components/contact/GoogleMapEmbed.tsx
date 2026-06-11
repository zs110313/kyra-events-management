import { site } from "@/data/site";

export function GoogleMapEmbed() {
  const query = encodeURIComponent(site.address);

  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
      <iframe
        title="Kyra Events office location map"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="h-[380px] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
