import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const corePages = [
  { path: "/", heading: "Kyra Events" },
  { path: "/services", heading: /Luxury event stages/ },
  { path: "/portfolio", heading: /A gallery of elegant event settings/ },
  { path: "/contact", heading: /Tell us about your event/ },
  { path: "/book-a-call", heading: /Plan your stage/ }
];

async function expectNoCriticalAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const seriousOrCritical = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? "")
  );

  expect(seriousOrCritical).toEqual([]);
}

test.describe("accessibility and usability smoke checks", () => {
  test("core pages have sensible headings and no serious automated axe violations", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Axe smoke checks run once on desktop to keep E2E fast.");

    for (const corePage of corePages) {
      await page.goto(corePage.path);

      await expect(page.getByRole("heading", { name: corePage.heading })).toBeVisible();
      await expectNoCriticalAxeViolations(page);
    }
  });

  test("visible images expose useful alternative text", async ({ page }) => {
    await page.goto("/portfolio");

    const images = page.getByRole("img");
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThan(0);

    for (let index = 0; index < imageCount; index += 1) {
      const image = images.nth(index);

      if (await image.isVisible()) {
        const alt = await image.getAttribute("alt");
        expect(alt?.trim().length).toBeGreaterThan(8);
      }
    }
  });

  test("contact form fields are labelled and required fields use native validation", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByLabel("Name")).toBeEditable();
    await expect(page.getByLabel("Email")).toBeEditable();
    await expect(page.getByLabel("Phone")).toBeEditable();
    await expect(page.getByLabel("Event Type")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeEditable();

    await expect(page.getByLabel("Name")).toHaveAttribute("required", "");
    await expect(page.getByLabel("Email")).toHaveAttribute("required", "");
    await expect(page.getByLabel("Message")).toHaveAttribute("required", "");
  });

  test("primary buttons and links have accessible names", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Kyra Events logo" })).toHaveAttribute("href", "/");
    await expect(page.getByRole("link", { name: "View Portfolio" })).toHaveAttribute("href", "/portfolio");
    await expect(page.getByRole("link", { name: "View Weddings portfolio" })).toHaveAttribute(
      "href",
      "/portfolio?category=weddings"
    );
    await expect(page.getByRole("button", { name: "Show Weddings slide" })).toBeVisible();
  });

  test("hero carousel links and controls are keyboard reachable and named", async ({ page }, testInfo) => {
    await page.goto("/");

    const weddingsSlide = page.getByRole("link", { name: "View Weddings portfolio" });
    await weddingsSlide.focus();
    await expect(weddingsSlide).toBeFocused();

    await page.getByRole("button", { name: "Show Nikkahs slide" }).focus();
    await expect(page.getByRole("button", { name: "Show Nikkahs slide" })).toBeFocused();

    if (testInfo.project.name === "chromium-desktop") {
      await expect(page.getByRole("button", { name: "Previous hero image" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Next hero image" })).toBeVisible();
    }
  });

  test("mobile navigation supports keyboard and click usage", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Mobile navigation is only visible in the mobile project.");

    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open navigation" });
    await menuButton.focus();
    await page.keyboard.press("Enter");

    const closeButton = page.getByRole("button", { name: "Close navigation" });
    await expect(closeButton).toHaveAttribute("aria-expanded", "true");

    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNavigation.getByRole("link", { name: "Services" })).toBeVisible();

    await mobileNavigation.getByRole("link", { name: "Book a Call" }).click();
    await expect(page).toHaveURL(/\/book-a-call$/);
    await expect(page.getByRole("heading", { name: /Plan your stage/ })).toBeVisible();
  });
});
