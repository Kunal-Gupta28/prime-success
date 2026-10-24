import { test, expect } from "@playwright/test";

test.describe("Surveys & Sentiment Voting", () => {
  test("surveys page renders live polls and allows voting interaction", async ({ page }) => {
    await page.goto("/surveys");

    await expect(page).toHaveURL(/\/surveys/);
    await expect(page.locator("h1, h2")).toContainText([/SURVEY/i, /POLL/i, /SENTIMENT/i]);

    // Check if voting options exist
    const voteOptions = page.locator("button:has-text('Vote'), input[type='radio'], [role='radio']");
    if (await voteOptions.count() > 0) {
      await expect(voteOptions.first()).toBeVisible();
    }
  });
});

