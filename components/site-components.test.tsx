import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { portfolioItems } from "@/data/portfolio";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { ROUTES } from "@/lib/constants";

const replace = vi.fn();
let currentSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  usePathname: () => "/portfolio",
  useRouter: () => ({ replace }),
  useSearchParams: () => currentSearchParams
}));

afterEach(() => {
  replace.mockClear();
  currentSearchParams = new URLSearchParams();
});

describe("Header", () => {
  it("renders the main navigation links", () => {
    render(<Header />);

    const navigation = screen.getByRole("navigation", { name: "Main navigation" });

    for (const route of ROUTES) {
      expect(within(navigation).getByRole("link", { name: route.label })).toHaveAttribute("href", route.href);
    }
  });
});

describe("Footer", () => {
  it("renders contact and social links", () => {
    render(<Footer />);

    expect(screen.getByText(site.description)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.phone })).toHaveAttribute("href", "tel:+447745568193");
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
    expect(screen.getByText(site.address)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", site.instagram);
    expect(screen.getByRole("link", { name: "TikTok" })).toHaveAttribute("href", site.tiktok);
    expect(screen.getByRole("link", { name: "Book a consultation" })).toHaveAttribute("href", "/book-a-call");
  });
});

describe("Hero", () => {
  it("renders the primary CTA links", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { name: "Kyra Events" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Book a Consultation/ })).toHaveAttribute("href", "/book-a-call");
    expect(screen.getByRole("link", { name: "View Portfolio" })).toHaveAttribute("href", "/portfolio");
  });
});

describe("ServicesPreview", () => {
  it("renders the configured service data", () => {
    render(<ServicesPreview />);

    for (const service of services) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
      expect(screen.getByText(service.intro)).toBeInTheDocument();
      expect(screen.getByAltText(`${service.title} stage decoration by Kyra Events`)).toBeInTheDocument();
    }
  });
});

describe("PortfolioGallery", () => {
  it("renders configured portfolio items by default", () => {
    render(<PortfolioGallery />);

    for (const item of portfolioItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText(item.alt)).toBeInTheDocument();
    }
  });

  it("filters items from the category query string", () => {
    currentSearchParams = new URLSearchParams("category=nikkahs");

    render(<PortfolioGallery />);

    expect(screen.getByRole("tab", { name: "Nikkahs" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Intimate Nikkah Setup")).toBeInTheDocument();
    expect(screen.queryByText("Grand Wedding Stage")).not.toBeInTheDocument();
  });

  it("updates the URL when a category filter is selected", async () => {
    const user = userEvent.setup();
    render(<PortfolioGallery />);

    await user.click(screen.getByRole("tab", { name: "Mehndis" }));

    expect(replace).toHaveBeenCalledWith("/portfolio?category=mehndis", { scroll: false });
  });
});

describe("ContactForm", () => {
  it("renders accessible fields and required validation attributes", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Phone")).not.toBeRequired();
    expect(screen.getByLabelText("Event Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(screen.getByRole("button", { name: /Send Enquiry/ })).toBeInTheDocument();
  });

  it("prevents empty required form submission", () => {
    render(<ContactForm />);

    const form = screen.getByRole("button", { name: /Send Enquiry/ }).closest("form");
    expect(form).not.toBeNull();

    expect((form as HTMLFormElement).checkValidity()).toBe(false);
  });
});
