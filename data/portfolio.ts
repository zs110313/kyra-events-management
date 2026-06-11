import type { Service } from "./services";

export type PortfolioCategory = "all" | Service["slug"];

export type PortfolioItem = {
  // Short display name shown on the portfolio card and in the lightbox.
  title: string;
  // Must match the folder the image lives in:
  // "weddings" -> public/images/portfolio/weddings
  // "nikkahs" -> public/images/portfolio/nikkahs
  // "mehndis" -> public/images/portfolio/mehndis
  category: Service["slug"];
  // Start paths with /images/portfolio because everything in public/ is served from the site root.
  // Example: public/images/portfolio/weddings/my-stage.webp
  // becomes: "/images/portfolio/weddings/my-stage.webp"
  image: string;
  // Describe the image for accessibility and SEO.
  alt: string;
};

/*
  How to add a new portfolio image:

  1. Drop the image into the matching folder:
     public/images/portfolio/weddings
     public/images/portfolio/nikkahs
     public/images/portfolio/mehndis

  2. Add one object to portfolioItems below.

  Example:
  {
    title: "Walima Floral Stage",
    category: "weddings",
    image: "/images/portfolio/weddings/walima-floral-stage.webp",
    alt: "Luxury wedding stage with ivory florals and gold seating"
  }
*/
export const portfolioItems: PortfolioItem[] = [
  {
    title: "Grand Wedding Stage",
    category: "weddings",
    image: "/images/portfolio/weddings/hero-stage.webp",
    alt: "Luxury South Asian wedding stage with gold lighting and floral decor"
  },
  {
    title: "Reception Stage",
    category: "weddings",
    image: "/images/portfolio/weddings/wedding-stage.webp",
    alt: "Elegant wedding reception stage with draping, florals and candlelight"
  },
  {
    title: "Intimate Nikkah Setup",
    category: "nikkahs",
    image: "/images/portfolio/nikkahs/nikkah-stage.webp",
    alt: "Elegant Nikkah ceremony stage with ivory draping and gold accents"
  },
  {
    title: "Mehndi Celebration",
    category: "mehndis",
    image: "/images/portfolio/mehndis/mehndi-stage.webp",
    alt: "Luxury Mehndi stage with vibrant florals and jewel-toned textiles"
  }
];
