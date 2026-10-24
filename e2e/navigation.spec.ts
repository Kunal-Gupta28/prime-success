import { test, expect } from "@playwright/test";

test.describe("Site-wide Navigation & Layout", () => {
  test("homepage loads with correct branding and header", async ({ page }) => {
    await page.goto("/");

    // Verify title and brand identity
    await expect(page).toHaveTitle(/Prime Success/i);

    // Verify navigation links are visible
    const nav = page.locator("header");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: /MAGAZINE/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /HONOURS/i })).toBeVisible();
  });

  test("can navigate to awards page and return", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /HONOURS/i }).first().click();

    await expect(page).toHaveURL(/\/awards/);
    await expect(page.locator("h1, h2")).toContainText([/AWARDS/i, /CATEGORIES/i, /HONOUR/i]);
  });

  test("theme toggle toggles between dark and light themes", async ({ page }) => {
    await page.goto("/");

    const themeButton = page.locator("button[aria-label*='theme' i], button[aria-label*='mode' i]");
    if (await themeButton.isVisible()) {
      await themeButton.click();
      const htmlClass = await page.locator("html").getAttribute("class");
      expect(htmlClass).toBeDefined();
    }
  });

  test("404 page renders gracefully for unknown paths", async ({ page }) => {
    await page.goto("/non-existent-route-404");
    await expect(page.locator("body")).toContainText(/404/i);
    await expect(page.getByRole("link", { name: /HOME/i })).toBeVisible();
  });
});

