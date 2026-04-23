import { test, expect } from "@playwright/test";
// test is like a set of actions we want to run for that page, 'testing' our automation
// expect is just waiting for that action to happen i guess?

test("homepage has the right title", async ({ page }) => {
  await page.goto("https://playwright.dev/"); // like selenium's driver.get()
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link opens installation page", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Get started" }).click();
  // how we locate things, can be buttons or checkbox etc. https://playwright.dev/docs/locators#locate-by-role
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
