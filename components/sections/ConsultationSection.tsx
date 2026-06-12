"use client";

import { ExternalLink } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function ConsultationSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Book a Call"
            title="Plan your stage with a focused consultation."
            copy="Use the calendar to choose a convenient time, or visit Linktree for all current contact and social links."
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Button href={site.linktree} target="_blank" rel="noopener noreferrer">
              Open Linktree
              <ExternalLink aria-hidden className="ml-3" size={17} />
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Details
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] p-2 shadow-gold">
          <div
            className="calendly-inline-widget min-w-[320px]"
            data-url={site.calendly}
            style={{ height: "700px" }}
          />
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>
      </Container>
    </section>
  );
}
