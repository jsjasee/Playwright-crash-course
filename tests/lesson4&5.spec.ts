import { test, expect } from "@playwright/test";

test("search docs with fill and press", async ({ page }) => {
  await page.goto("https://www.fairprice.com.sg/"); // goes to fairprice website

  const searchBox = page.locator("#search-input-bar"); // finds the button that says search

  // to make the pop-up disappear, we need to click somewhere else.
  const randomHeader = page.getByRole("heading", {
    name: "Vouchers available",
  });

  await randomHeader.click();

  await searchBox.fill("marigold milk"); // paste in some text

  await searchBox.press("Enter"); // press enter

  // await expect(page.getByText(/Results For/)).toBeVisible(); // just make sure the text 'Results For' is visible, and this is regex also
  // regex should NOT be wrapped in "", so "/Results For/" is WRONG, it's literally matching the slashes
  await expect(
    page.getByRole("heading", { name: /results for/i }),
  ).toContainText(/results for/i); // practicing text assertion instead of visibility assertion so we use .toContainText()

  // check if the results collection is visible.

  const resultsBox = page.locator("#productCollection");

  await expect(resultsBox).toContainText(/Marigold/i); // /i makes it case-insensitive
});
