import { chromium } from "playwright";

// note: for a standalone scraper script, we are creating the page ourselves, instead of a 'test' which provides us that 'page' object.

async function main() {
  // TODO 1: Read URL from command-line argument
  // eg. npx tsx scraper.ts https://www.fairprice.com.sg/ h1
  // Example: process.argv[2]
  const website = process.argv[2];
  console.log(website);
  // TODO 2: Read selector from command-line argument
  // Example: process.argv[3]
  const selector = process.argv[3];
  console.log(selector);
  // TODO 3: If URL or selector is missing, print usage instructions and exit with code 1
  if (!website || !selector) {
    console.error(
      "Please specify a URL AND SELECTOR: npx tsx scraper.ts <URL> <selector>",
    );
    process.exit(1);
  }

  // TODO 4: Launch Chromium
  const browser = await chromium.launch(); // browser is launched in headless mode.
  const context = await browser.newContext();

  // Start a trace
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  // TODO 5: Create a new page (from the context, not the browser, if you want this is show on the trace, otherwise usually we use brower.newPage())
  const page = await context.newPage();

  try {
    // TODO 6: Navigate to the URL
    await page.goto(website);
    // TODO 7: Locate the element using the selector
    const element = page.locator(selector);
    // TODO 8: Extract the element text
    const elementText = await element.textContent();
    // TODO 9: If text is null, throw an error
    if (elementText === null) {
      throw new Error("Element text was null");
    }
    // TODO 10: Log the trimmed text
    console.log(elementText.trim());
  } finally {
    await context.tracing.stop({ path: "trace.zip" });
    await browser.close();
  }
  // note, we dont need a catch here because we are using await, and there's already a .catch (see below) to handle the errors for us!
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
