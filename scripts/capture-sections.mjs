/*
  Section QA capture: full-page screenshot + the bounding box of every top-level section.
  node scripts/capture-sections.mjs <url> <out.png> [width=1280]
  Writes <out>.json with [{name, top, height}] for header, each <main> section and footer.
*/
import fs from 'node:fs';
import { chromium } from 'playwright';

const [url, out, width = '1280'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await loadAllImages(page);

const boxes = await page.evaluate(() => {
  const nodes = [document.querySelector('header.site-header'), ...document.querySelectorAll('main > section, main > [data-qa]'), document.querySelector('footer.site-footer')];
  return nodes.map((el) => {
    const r = el.getBoundingClientRect();
    return { name: el.dataset.qa || el.className.split(' ')[0], top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
  });
});

await page.screenshot({ path: out, fullPage: true });
fs.writeFileSync(out.replace(/\.png$/, '.json'), JSON.stringify(boxes, null, 2));
await browser.close();
console.log(boxes.map((b) => `${b.name.padEnd(14)} top ${String(b.top).padStart(5)}  h ${b.height}`).join('\n'));

/* Lazy images only load near the viewport: scroll through the page, then wait for every image. */
async function loadAllImages(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    window.scrollTo(0, 0);
  });
}
