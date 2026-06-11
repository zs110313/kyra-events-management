import { ContactCta } from "@/components/sections/ContactCta";
import { FeaturedCarousel } from "@/components/sections/FeaturedCarousel";
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCarousel />
      <IntroSection />
      <ServicesPreview />
      <ContactCta />
    </>
  );
}
