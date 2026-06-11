import { expect, test } from "@playwright/test";

test.describe("critical journeys", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Kyra Events/);
    await expect(page.getByRole("heading", { name: "Kyra Events" })).toBeVisible();
    const consultationLinks = page.getByRole("link", { name: "Book a Consultation" });
    const consultationLinkCount = await consultationLinks.count();
    let hasVisibleBookCallLink = false;

    for (let index = 0; index < consultationLinkCount; index += 1) {
      const link = consultationLinks.nth(index);
      if ((await link.isVisible()) && (await link.getAttribute("href")) === "/book-a-call") {
        hasVisibleBookCallLink = true;
        break;
      }
    }

    expect(hasVisibleBookCallLink).toBe(true);
    await expect(page.getByRole("link", { name: "View Portfolio" })).toHaveAttribute("href", "/portfolio");
  });

  test("desktop navigation reaches core pages", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "chromium-mobile", "Mobile navigation is covered separately.");

    await page.goto("/");
    const navigation = page.getByRole("navigation", { name: "Main navigation" });

    await navigation.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole("heading", { name: /Luxury event stages/ })).toBeVisible();

    await navigation.getByRole("link", { name: "Portfolio" }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
    await expect(page.getByRole("heading", { name: /A gallery of elegant event settings/ })).toBeVisible();

    await navigation.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { name: /Tell us about your event/ })).toBeVisible();

    await navigation.getByRole("link", { name: "Book a Call" }).click();
    await expect(page).toHaveURL(/\/book-a-call$/);
    await expect(page.getByRole("heading", { name: /Plan your stage/ })).toBeVisible();
  });

  test("hero carousel image links open the matching portfolio category", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "View Weddings portfolio" }).click();
    await expect(page).toHaveURL(/\/portfolio\?category=weddings$/);
    await expect(page.getByRole("tab", { name: "Weddings" })).toHaveAttribute("aria-selected", "true");

    await page.goto("/");
    await page.getByRole("button", { name: "Show Nikkahs slide" }).click();
    await page.getByRole("link", { name: "View Nikkahs portfolio" }).click();
    await expect(page).toHaveURL(/\/portfolio\?category=nikkahs$/);
    await expect(page.getByRole("tab", { name: "Nikkahs" })).toHaveAttribute("aria-selected", "true");

    await page.goto("/");
    await page.getByRole("button", { name: "Show Mehndis slide" }).click();
    await page.getByRole("link", { name: "View Mehndis portfolio" }).click();
    await expect(page).toHaveURL(/\/portfolio\?category=mehndis$/);
    await expect(page.getByRole("tab", { name: "Mehndis" })).toHaveAttribute("aria-selected", "true");
  });

  test("portfolio filters update visible items and URL", async ({ page }) => {
    await page.goto("/portfolio");

    await expect(page.getByText("Grand Wedding Stage")).toBeVisible();
    await page.getByRole("tab", { name: "Nikkahs" }).click();
    await expect(page).toHaveURL(/\/portfolio\?category=nikkahs$/);
    await expect(page.getByText("Intimate Nikkah Setup")).toBeVisible();
    await expect(page.getByText("Grand Wedding Stage")).toBeHidden();

    await page.getByRole("tab", { name: "All" }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
    await expect(page.getByText("Grand Wedding Stage")).toBeVisible();
  });

  test("mobile navigation opens and links work", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Mobile navigation is covered in the mobile viewport.");

    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();

    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNavigation.getByRole("link", { name: "Services" })).toBeVisible();
    await mobileNavigation.getByRole("link", { name: "Contact" }).click();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { name: /Tell us about your event/ })).toBeVisible();
  });
});
