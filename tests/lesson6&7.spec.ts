import { test, expect } from "@playwright/test";

test("extract heading text", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  const heading = page.getByRole("heading", {
    name: /Playwright enables reliable web automation/i,
  });

  await expect(heading).toBeVisible();

  const headingText = await heading.textContent();

  if (headingText === null) {
    throw new Error("Heading text was null");
  }

  console.log(headingText.trim());
});

test("get fairprice results text content", async ({ page }) => {
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

  //   const resultsBoxText = await resultsBox.textContent();

  // textContent = raw DOM text, possibly hidden/weird spacing/null, that's why we need trim AND a null check; innerText = rendered visible text closer to what the user sees, no need null check.

  //   await expect(resultsBox).toContainText(/Marigold/i); // /i makes it case-insensitive

  // must check for null for textContent()
  //   if (resultsBoxText === null) {
  //     throw new Error("No results text found");
  //   }

  const resultsBoxText = await resultsBox.innerText();

  console.log(resultsBoxText.trim());
});
