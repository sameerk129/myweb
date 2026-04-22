import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("renders hero, sections, and footer", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /backend systems that/i }),
    ).toBeVisible();

    for (const id of [
      "highlights",
      "experience",
      "skills",
      "mindset",
      "projects",
      "travel",
      "testimonials",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("opens the command palette via ⌘K", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Meta+K");
    await expect(page.getByRole("dialog", { name: /command palette/i })).toBeVisible();
  });

  test("contact form blocks invalid submission", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/please enter your full name/i)).toBeVisible();
  });
});
