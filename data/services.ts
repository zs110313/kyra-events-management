export type Service = {
  title: string;
  slug: "weddings" | "nikkahs" | "mehndis";
  image: string;
  intro: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Weddings",
    slug: "weddings",
    image: "/images/services/weddings.webp",
    intro: "Statement stages for refined celebrations.",
    description:
      "Layered florals, elegant seating, dramatic backdrops and warm lighting designed around your venue, palette and family traditions."
  },
  {
    title: "Nikkahs",
    slug: "nikkahs",
    image: "/images/services/nikkahs.webp",
    intro: "Serene, graceful settings for meaningful ceremonies.",
    description:
      "Soft draping, floral arches, lanterns and considered details that create a calm, beautiful focal point for your Nikkah."
  },
  {
    title: "Mehndis",
    slug: "mehndis",
    image: "/images/services/mehndis.webp",
    intro: "Vibrant styling with a luxury finish.",
    description:
      "Colour-rich stages, festive florals, traditional accents and polished layouts that feel joyful without losing sophistication."
  }
];
