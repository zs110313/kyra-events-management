import type { Metadata } from "next";
import { ConsultationSection } from "@/components/sections/ConsultationSection";

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Book a consultation with Kyra Events to discuss your wedding or event stage setup."
};

export default function BookCallPage() {
  return <ConsultationSection />;
}
