import { test, expect } from "@playwright/test";

test.describe("Admin Authentication & Protected Routes", () => {
  test("unauthenticated access to /admin redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin");

    // Next.js middleware should redirect to /admin/login
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.locator("input[type='text'], input[name='username']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });

  test("invalid credentials show error message", async ({ page }) => {
    await page.goto("/admin/login");

    await page.fill("input[name='username'], input[type='text']", "wrong_user");
    await page.fill("input[name='password'], input[type='password']", "wrong_pass");
    await page.click("button[type='submit']");

    // Should display error response / alert
    await expect(page.locator("text=/invalid|error|failed/i")).toBeVisible();
  });
});

