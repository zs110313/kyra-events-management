import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React, { type AnchorHTMLAttributes, type ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", { alt, ...props })
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", { href: String(href), ...props }, children)
}));
