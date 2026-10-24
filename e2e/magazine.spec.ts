import { test, expect } from "@playwright/test";

test.describe("Magazine Archive & Editorial Articles", () => {
  test("magazine archive lists issues and cover stories", async ({ page }) => {
    await page.goto("/magazine");

    await expect(page).toHaveTitle(/Magazine|Prime Success/i);
    // Should display editorial issue covers or articles
    const articleCards = page.locator("article, a[href*='/magazine/']");
    expect(await articleCards.count()).toBeGreaterThan(0);
  });

  test("can open an article detail page and verify content", async ({ page }) => {
    await page.goto("/magazine/the-architects-of-tomorrow");

    await expect(page).toHaveURL(/\/magazine\/the-architects-of-tomorrow/);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /RETURN TO MAGAZINE/i })).toBeVisible();
  });
});

