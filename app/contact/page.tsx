import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { GoogleMapEmbed } from "@/components/contact/GoogleMapEmbed";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kyra Events by phone, WhatsApp, email or enquiry form."
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Tell us about your event."
          copy="Share your venue, date and styling direction, and Kyra Events will help shape the stage around your celebration."
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />
          <ContactDetails />
        </div>
        <div className="mt-6">
          <GoogleMapEmbed />
        </div>
      </Container>
    </section>
  );
}
