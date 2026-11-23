/*
  Visual QA capture: node scripts/capture.mjs <url> <out.png> [width=1280] [height=900] [--full] [--click=selector]
  Waits for web fonts before capturing so typography is comparable with Figma exports.
*/
import { chromium } from 'playwright';

const [url, out, width = '1280', height = '900', ...flags] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node scripts/capture.mjs <url> <out.png> [width] [height] [--full] [--click=selector]');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const errors = [];
page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
page.on('pageerror', (err) => errors.push(err.message));

await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await loadAllImages(page);

const click = flags.find((f) => f.startsWith('--click='));
if (click) {
  await page.click(click.slice('--click='.length));
  await page.waitForTimeout(300);
}

await page.screenshot({ path: out, fullPage: flags.includes('--full') });
await browser.close();

if (errors.length) {
  console.error('Console errors:\n' + errors.join('\n'));
  process.exit(2);
}
console.log(`saved ${out}`);

/* Lazy images only load near the viewport: scroll through the page, then wait for every image. */
async function loadAllImages(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    window.scrollTo({ top: 0, behavior: "instant" }); // instant: html has smooth scrolling + a sticky header
    await new Promise((r) => setTimeout(r, 300)); // let the header shadow transition settle
  });
}
