import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { portfolioItems } from "@/data/portfolio";
import { services } from "@/data/services";
import { site } from "@/data/site";

const publicDir = path.join(process.cwd(), "public");
const serviceSlugs = new Set(services.map((service) => service.slug));

function expectNonBlank(value: string, fieldName: string) {
  expect(value, fieldName).toEqual(expect.any(String));
  expect(value.trim(), fieldName).not.toBe("");
}

function expectValidPublicImagePath(imagePath: string) {
  expect(imagePath.startsWith("/images/"), `${imagePath} should start with /images/`).toBe(true);
  expect(imagePath.includes(".."), `${imagePath} should not include parent directory segments`).toBe(false);
  expect(/\.(avif|gif|jpe?g|png|svg|webp)$/i.test(imagePath), `${imagePath} should use an image extension`).toBe(true);

  const localPath = path.join(publicDir, imagePath);
  expect(existsSync(localPath), `${imagePath} should exist under public/`).toBe(true);
}

describe("portfolio data", () => {
  it("has complete entries with valid categories and existing public images", () => {
    expect(portfolioItems.length).toBeGreaterThan(0);

    for (const item of portfolioItems) {
      expectNonBlank(item.title, "portfolio title");
      expectNonBlank(item.category, `portfolio category for ${item.title}`);
      expectNonBlank(item.image, `portfolio image for ${item.title}`);
      expectNonBlank(item.alt, `portfolio alt text for ${item.title}`);
      expect(serviceSlugs.has(item.category), `${item.title} should use an existing service slug`).toBe(true);
      expectValidPublicImagePath(item.image);
    }
  });
});

describe("service data", () => {
  it("has complete service entries with unique slugs and existing public images", () => {
    expect(services.length).toBeGreaterThan(0);
    expect(serviceSlugs.size).toBe(services.length);

    for (const service of services) {
      expectNonBlank(service.title, "service title");
      expectNonBlank(service.slug, `service slug for ${service.title}`);
      expectNonBlank(service.image, `service image for ${service.title}`);
      expectNonBlank(service.intro, `service intro for ${service.title}`);
      expectNonBlank(service.description, `service description for ${service.title}`);
      expectValidPublicImagePath(service.image);
    }
  });
});

describe("site data", () => {
  it("has the core public contact and booking content", () => {
    expectNonBlank(site.name, "site name");
    expectNonBlank(site.tagline, "site tagline");
    expectNonBlank(site.description, "site description");
    expectNonBlank(site.phone, "site phone");
    expectNonBlank(site.email, "site email");
    expectNonBlank(site.address, "site address");
    expect(site.email).toContain("@");
    expect(site.linktree.startsWith("https://"), "Linktree should be an absolute URL").toBe(true);
    expect(site.calendly.startsWith("https://"), "Calendly should be an absolute URL").toBe(true);
  });
});
