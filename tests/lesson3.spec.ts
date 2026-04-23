import { test, expect } from "@playwright/test";

test("common locator patterns", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  const headerGetStarted = page
    .locator("header") // this is css. it is looking for header tag. (css is not recommended but can be used to narrow down the locators, prioritise user-facing locators like .getByRole)
    .getByRole("link", { name: "Get started" });

  await expect(headerGetStarted).toBeVisible();

  await headerGetStarted.click();

  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();

  const configLink = page
    .getByRole("link", { name: "playwright.config" })
    .first(); // there are TWO matched links, click on the first.
  await expect(configLink).toBeVisible();

  await configLink.click();

  // this is not assertion, the .isVisible() returns a true or false value, both of which will pass the 'await' statement can cause the test to pass.
  // use 'expect' for assertion - check notion for more details.
  await expect(
    page.getByRole("heading", { name: "Advanced Configuration" }),
  ).toBeVisible();
});
