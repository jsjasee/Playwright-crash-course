import { test, expect } from "@playwright/test";

// Use getAttribute() if the text you want to extract is not visible, like src, or alt etc.
test("extract link href", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  const getStartedLink = page
    .getByRole("link", {
      name: "Get started",
    })
    .first();

  await expect(getStartedLink).toBeVisible();

  const href = await getStartedLink.getAttribute("href");

  if (href === null) {
    throw new Error("Href attribute was null");
  }

  console.log(href);
});

test("get fairprice search box placeholder", async ({ page }) => {
  await page.goto("https://www.fairprice.com.sg/"); // goes to fairprice website

  const searchBox = page.locator("#search-input-bar"); // finds the button that says search

  // to make the pop-up disappear, we need to click somewhere else.
  const randomHeader = page.getByRole("heading", {
    name: "Vouchers available",
  });

  await randomHeader.click();

  const placeholder = await searchBox.getAttribute("placeholder");

  if (placeholder === null) {
    throw new Error("No placeholder found");
  }

  console.log(placeholder.trim());
});
