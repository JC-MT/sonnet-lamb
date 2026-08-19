import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:4321/admin";
const out = process.argv[3] ?? "screenshots/pdf-content";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1123, height: 794 }, // A4 landscape @ 96dpi
  deviceScaleFactor: 2,
});

try {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const target = page.locator("[pdf-content]");
  await target.waitFor({ state: "visible" });
  await target.screenshot({ path: `${out}.png` });

  // Isolate [pdf-content] as the only thing on the page so the PDF is
  // exactly one A4 landscape sheet of that element and nothing else.
  await page.evaluate(() => {
    const el = document.querySelector("[pdf-content]");
    document.body.replaceChildren(el);
    const style = document.createElement("style");
    style.textContent = `
      @page { size: 297mm 210mm; margin: 0; }
      html, body { margin: 0; padding: 0; background: #fff; }
      [pdf-content] { width: 297mm; height: 210mm; box-shadow: none; }
    `;
    document.head.append(style);
  });

  await page.emulateMedia({ media: "screen" });
  await page.pdf({
    path: `${out}.pdf`,
    width: "297mm",
    height: "210mm",
    printBackground: true,
    pageRanges: "1",
  });

  console.log(`Saved ${out}.pdf and ${out}.png`);
} catch (error) {
  console.error(`Failed to capture ${url}\n${error.message}`);
  console.error("Is the dev server running? Try: pnpm dev");
  process.exitCode = 1;
} finally {
  await browser.close();
}
