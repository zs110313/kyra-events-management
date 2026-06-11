import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("renders the heading and supporting copy", () => {
    render(
      <SectionHeading
        eyebrow="Portfolio"
        title="A gallery of elegant event settings."
        copy="Browse luxury stage decoration concepts."
      />
    );

    expect(screen.getByRole("heading", { name: "A gallery of elegant event settings." })).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Browse luxury stage decoration concepts.")).toBeInTheDocument();
  });
});
