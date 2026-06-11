import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Kyra Events wedding, Nikkah and Mehndi stage decoration work."
};

export default function PortfolioPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="A gallery of elegant event settings."
          copy="Browse luxury stage decoration concepts for weddings, Nikkahs and Mehndis."
          align="center"
        />
        <div className="mt-12">
          <PortfolioGallery />
        </div>
      </Container>
    </section>
  );
}
