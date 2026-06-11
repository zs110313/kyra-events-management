import type { Service } from "./services";

export type PortfolioCategory = "all" | Service["slug"];

export type PortfolioItem = {
  title: string;
  category: Service["slug"];
  image: string;
  alt: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Grand Wedding Stage",
    category: "weddings",
    image: "/images/portfolio/hero-stage.webp",
    alt: "Luxury South Asian wedding stage with gold lighting and floral decor"
  },
  {
    title: "Reception Stage",
    category: "weddings",
    image: "/images/portfolio/wedding-stage.webp",
    alt: "Elegant wedding reception stage with draping, florals and candlelight"
  },
  {
    title: "Intimate Nikkah Setup",
    category: "nikkahs",
    image: "/images/portfolio/nikkah-stage.webp",
    alt: "Elegant Nikkah ceremony stage with ivory draping and gold accents"
  },
  {
    title: "Mehndi Celebration",
    category: "mehndis",
    image: "/images/portfolio/mehndi-stage.webp",
    alt: "Luxury Mehndi stage with vibrant florals and jewel-toned textiles"
  }
];
