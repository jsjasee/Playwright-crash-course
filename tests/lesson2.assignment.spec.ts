import { test, expect } from "@playwright/test";

test("generating tests page shows a 'Introduction' header", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/docs/intro/");
  await page.getByRole("link", { name: "Generating tests" }).click(); // this link is found in the side bar panel of the page
  await expect(
    page.getByRole("heading", { name: "Introduction" }),
  ).toBeVisible();
});
