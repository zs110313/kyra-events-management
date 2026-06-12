import { expect, type Page, type Response, test } from "@playwright/test";

const keyPages = ["/", "/services", "/portfolio", "/book-a-call", "/contact"];
const routeExpectations = [
  { href: "/", label: "Home", heading: "Kyra Events" },
  { href: "/services", label: "Services", heading: /Luxury event stages/ },
  { href: "/portfolio", label: "Portfolio", heading: /A gallery of elegant event settings/ },
  { href: "/book-a-call", label: "Book a Call", heading: /Plan your stage/ },
  { href: "/contact", label: "Contact", heading: /Tell us about your event/ }
];

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}

function expectSuccessfulDocumentResponse(response: Response | null) {
  expect(response, "Expected a document response").not.toBeNull();
  expect(response?.status(), `Expected ${response?.url()} to load successfully`).toBeLessThan(400);
}

async function expectPortfolioImagesLoaded(page: Page) {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { name: /A gallery of elegant event settings/ })).toBeVisible();

  const portfolioImages = page.getByRole("img").filter({ hasNot: page.getByAltText("Kyra Events logo") });
  const imageCount = await portfolioImages.count();

  expect(imageCount).toBeGreaterThanOrEqual(4);

  for (let index = 0; index < imageCount; index += 1) {
    const image = portfolioImages.nth(index);
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
}

test.describe("performance and compatibility smoke checks", () => {
  test("homepage loads successfully across desktop, tablet and mobile", async ({ page }) => {
    const response = await page.goto("/");

    expectSuccessfulDocumentResponse(response);
    await expect(page.getByRole("heading", { name: "Kyra Events" })).toBeVisible();
    await expect(page.getByRole("img", { name: /wedding|nikkah|mehndi/i }).first()).toBeVisible();
  });

  test("portfolio page loads with usable images", async ({ page }) => {
    await expectPortfolioImagesLoaded(page);
  });

  test("main navigation works across viewport sizes", async ({ page }, testInfo) => {
    await page.goto("/");

    const navigation = page.getByRole("navigation", {
      name: testInfo.project.name === "chromium-mobile" ? "Mobile navigation" : "Main navigation"
    });

    for (const route of routeExpectations.filter((route) => route.href !== "/")) {
      if (testInfo.project.name === "chromium-mobile") {
        await page.getByRole("button", { name: "Open navigation" }).click();
      }

      await navigation.getByRole("link", { name: route.label }).click();
      await expect(page).toHaveURL(new RegExp(`${route.href}$`));
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
    }
  });

  test("critical pages do not emit obvious console errors", async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page);

    for (const path of keyPages) {
      const response = await page.goto(path);

      expectSuccessfulDocumentResponse(response);
      await page.waitForLoadState("domcontentloaded");
    }

    expect(consoleErrors).toEqual([]);
  });

  test("key pages do not expose broken internal links", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Internal link crawling runs once to keep the suite light.");

    const checkedLinks = new Set<string>();

    for (const path of keyPages) {
      await page.goto(path);

      const internalLinks = await page.locator("a[href^='/']").evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href"))
          .filter((href): href is string => Boolean(href))
          .map((href) => href.split("#")[0])
          .filter((href) => href.length > 0)
      );

      for (const href of internalLinks) {
        checkedLinks.add(href);
      }
    }

    for (const href of checkedLinks) {
      const response = await page.request.get(href);
      expect(response.status(), `Expected internal link ${href} to resolve`).toBeLessThan(400);
    }
  });
});
