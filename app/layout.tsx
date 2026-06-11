import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kyraevents.co.uk"),
  title: {
    default: "Kyra Events | Luxury Asian Wedding Stage Decoration",
    template: "%s | Kyra Events"
  },
  description: site.description,
  openGraph: {
    title: "Kyra Events",
    description: site.description,
    url: "https://kyraevents.co.uk",
    siteName: "Kyra Events",
    images: [
      {
        url: "/images/hero/hero-stage.webp",
        width: 1200,
        height: 800,
        alt: "Luxury Asian wedding stage decoration by Kyra Events"
      }
    ],
    locale: "en_GB",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={cormorant.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
