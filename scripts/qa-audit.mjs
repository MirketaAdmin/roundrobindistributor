import { chromium } from 'playwright';

/*
  Site-wide interaction audit (sticky header, CTAs, hover, motion, navigation history, layout shift,
  responsive widths). Start the dev server first, then: npm run qa:audit [baseUrl]
*/
const BASE = process.argv[2] || 'http://localhost:5191';
const ROUTES = ['/', '/about-us', '/contact-us', '/insights', '/insights/lead-assignment-rules-vs-round-robin-distributor', '/privacy-policy-and-terms', '/support', '/thank-you'];
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const b = await chromium.launch();
const errors = [];
const results = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  -- ' + extra : ''}`);
const watch = (pg, tag) => {
  pg.on('console', (m) => m.type() === 'error' && !THIRD_PARTY.test(m.text()) && errors.push(`[${tag}] ${m.text()}`));
  pg.on('pageerror', (e) => errors.push(`[${tag}] ${e.message}`));
};
const instantTop = (pg, y = 0) => pg.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
const landed = (pg, sel) => pg.$eval(sel, (el) => {
  const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.round(el.getBoundingClientRect().top - header - margin);
});
/* Wait until smooth scrolling has finished (scrollY unchanged for 250ms, max 6s). */
const settle = (pg) => pg.evaluate(() => new Promise((resolve) => {
  let last = -1;
  let still = 0;
  const started = Date.now();
  const tick = () => {
    still = window.scrollY === last ? still + 50 : 0;
    last = window.scrollY;
    if (still >= 250 || Date.now() - started > 6000) resolve();
    else setTimeout(tick, 50);
  };
  tick();
}));
/* Third-party noise we don't control: Chrome logs Google's own report-only CSP notice from the reCAPTCHA frame. */
const THIRD_PARTY = /Framing 'https:\/\/www\.google\.com\/' violates the following report-only/;
const style = (pg, sel, prop) => pg.$eval(sel, (el, p) => getComputedStyle(el)[p], prop);
const box = (pg, sel) => pg.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return [r.width, r.height].map(Math.round).join('x'); });

// ---------- 1. Sticky header (desktop) ----------
const d = await b.newPage({ viewport: { width: 1280, height: 900 } });
watch(d, 'desktop');
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
const heroTopBefore = await d.$eval('.hero', (el) => el.getBoundingClientRect().top + window.scrollY);
ok('header is position: sticky, top 0', (await style(d, '.site-header', 'position')) === 'sticky' && (await style(d, '.site-header', 'top')) === '0px');
ok('header keeps the Figma 101px height', (await box(d, '.site-header')).endsWith('x101'));
ok('no shadow at the top of the page', (await style(d, '.site-header', 'boxShadow')) === 'none');
await instantTop(d, 2500);
await d.waitForTimeout(350);
ok('header stays visible at y=0 after scrolling', (await d.$eval('.site-header', (el) => el.getBoundingClientRect().top)) === 0);
ok('subtle shadow appears once scrolled', (await d.getAttribute('.site-header', 'class')).includes('is-scrolled') && (await style(d, '.site-header', 'boxShadow')) !== 'none');
ok('header z-index above content (100)', (await style(d, '.site-header', 'zIndex')) === '100');
const heroTopAfter = await d.$eval('.hero', (el) => el.getBoundingClientRect().top + window.scrollY);
ok('sticky header causes no layout shift (hero offset unchanged)', heroTopBefore === heroTopAfter, `${heroTopBefore} → ${heroTopAfter}`);
const covering = await d.evaluate(() => {
  const el = document.elementFromPoint(640, 50);
  return Boolean(el?.closest('.site-header'));
});
ok('header is on top of scrolled content', covering);
await instantTop(d, 0);
await d.waitForTimeout(350);
ok('shadow removed back at the top', (await style(d, '.site-header', 'boxShadow')) === 'none');

// ---------- 2. CTAs ----------
// Every same-site hash target on every route must exist on its destination page.
for (const r of ROUTES) {
  await d.goto(BASE + r, { waitUntil: 'networkidle' });
  const targets = await d.$$eval('a[href*="#"]', (as) => as.map((a) => a.getAttribute('href')).filter((h) => !h.startsWith('mailto:')));
  const local = targets.filter((h) => h.startsWith('#') || h.split('#')[0] === r);
  const missing = await d.evaluate((hs) => hs.filter((h) => !document.getElementById(h.split('#')[1])), local);
  ok(`${r}: every in-page anchor has a target (${local.length})`, missing.length === 0, missing.join(', '));
  const dead = await d.$$eval('a', (as) => as.filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').length);
  ok(`${r}: no empty / "#" links`, dead === 0);
  const silent = await d.$$eval('main button:not([type="submit"]):not([disabled]):not([aria-disabled="true"])', (bs) =>
    bs.filter((bt) => !bt.getAttribute('aria-expanded') && !bt.getAttribute('aria-pressed') && !bt.getAttribute('aria-label')
      && !bt.closest('.insights-filter') && !bt.closest('.article-author__actions')).map((bt) => bt.textContent.trim()));
  ok(`${r}: no unexplained buttons`, silent.length === 0, silent.join(' | '));
}

// Home CTAs → correct section, below the header
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
for (const [sel, target] of [
  ['.hero__demo', '#contact'],
  ['.hero .btn--secondary', '#pricing'],
  ['.pricing__cta', '#contact'],
  ['.pricing__talk', '#contact'],
  ['.contact__demo', '#contact-form'],
]) {
  await instantTop(d, 0);
  await d.click(sel);
  await settle(d);
  const off = await landed(d, target);
  ok(`Home CTA ${sel} → ${target}`, Math.abs(off) <= 2, `offset=${off}`);
}
ok('Pricing "See Pricing" disabled until its destination is supplied', (await d.getAttribute('.pricing__actions .btn >> nth=0', 'aria-disabled')) === 'true');
await d.click('.insights__all');
await d.waitForURL('**/insights');
ok('"See all insights" opens /insights', new URL(d.url()).pathname === '/insights');

// Contact-section "Book a Demo" on an inner page stays on that page and scrolls to its own form
for (const r of ['/about-us', '/privacy-policy-and-terms', '/support']) {
  await d.goto(BASE + r, { waitUntil: 'networkidle' });
  await d.click('.contact__demo');
  await settle(d);
  ok(`${r}: "Book a Demo" scrolls to this page's form`, new URL(d.url()).pathname === r && Math.abs(await landed(d, '#contact-form')) <= 2);
}

// Logo on Home scrolls back to the top
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await instantTop(d, 3000);
await d.click('.site-header .brand');
await settle(d);
ok('logo on Home scrolls back to the top', (await d.evaluate(() => window.scrollY)) === 0);

// ---------- 3. Hover states ----------
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
async function hoverCheck(name, sel, prop, { expectChange = true } = {}) {
  await d.mouse.move(0, 0);
  await d.locator(sel).first().scrollIntoViewIfNeeded();
  const before = await d.locator(sel).first().evaluate((el, p) => getComputedStyle(el)[p], prop);
  const sizeBefore = await d.locator(sel).first().evaluate((el) => { const r = el.getBoundingClientRect(); return `${r.width}x${r.height}`; });
  await d.locator(sel).first().hover({ force: true });
  await d.waitForTimeout(300);
  const after = await d.locator(sel).first().evaluate((el, p) => getComputedStyle(el)[p], prop);
  const sizeAfter = await d.locator(sel).first().evaluate((el) => { const r = el.getBoundingClientRect(); return `${r.width}x${r.height}`; });
  ok(`hover: ${name} ${expectChange ? 'changes' : 'does not change'} ${prop}, size unchanged`, (before !== after) === expectChange && sizeBefore === sizeAfter, `${before} → ${after}`);
}
await hoverCheck('nav link', '.site-header__link', 'color');
await hoverCheck('header CTA', '.site-header__cta', 'backgroundColor');
await hoverCheck('hero "See Pricing"', '.hero .btn--secondary', 'boxShadow');
await hoverCheck('pricing plan card', '.pricing__plan:not(.pricing__plan--featured)', 'boxShadow');
await hoverCheck('insight card', '.insights .article-card__inner', 'boxShadow');
await hoverCheck('footer link', 'a.site-footer__link', 'color');
await hoverCheck('disabled "View on AppExchange" (pending URL)', '.contact__appexchange', 'backgroundColor', { expectChange: false });
await hoverCheck('disabled insight "Read more"', '.insights .article-card__read', 'color', { expectChange: false });
const durations = await d.$eval('.btn', (el) => getComputedStyle(el).transitionDuration);
ok('button transitions are 150–250ms', durations.split(',').every((t) => { const ms = parseFloat(t) * 1000; return ms >= 150 && ms <= 250; }), durations);
ok('disabled CTAs show a not-allowed cursor', (await style(d, '.contact__appexchange', 'cursor')) === 'not-allowed');
ok('disabled video buttons are real disabled buttons', await d.$$eval('.ratings__play', (bs) => bs.every((bt) => bt.disabled)));

// ---------- 4. Keyboard focus ----------
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await d.keyboard.press('Tab');
const firstFocus = await d.evaluate(() => document.activeElement.className);
ok('first Tab lands on the logo link', firstFocus.includes('brand'), firstFocus);
const ring = await d.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
ok('focus ring visible on keyboard focus', ring !== 'none', ring);

// ---------- 5. Reduced motion ----------
const rm = await b.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
watch(rm, 'reduced-motion');
await rm.goto(BASE + '/', { waitUntil: 'networkidle' });
ok('reduced motion: smooth scrolling off', (await rm.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)) === 'auto');
ok('reduced motion: transitions off', (await style(rm, '.btn', 'transitionDuration')).split(',').every((t) => parseFloat(t) === 0));
await rm.click('.site-header__link >> text=Pricing');
await rm.waitForTimeout(100);
ok('reduced motion: anchor jumps instantly to the section', Math.abs(await landed(rm, '#pricing')) <= 2);

// ---------- 6. History ----------
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await d.click('.site-header__link >> text=About RRD');
await d.waitForURL('**/about-us');
await d.click('.site-header__link >> text=Insights');
await d.waitForURL('**/insights');
await d.goBack();
await d.waitForURL('**/about-us');
ok('back: /insights → /about-us', new URL(d.url()).pathname === '/about-us' && (await d.isVisible('.about-hero')));
await d.goBack();
await d.waitForURL((u) => new URL(u).pathname === '/');
ok('back: /about-us → /', (await d.isVisible('.hero')));
await d.goForward();
await d.waitForURL('**/about-us');
ok('forward: / → /about-us', await d.isVisible('.about-hero'));
ok('aria-current marks the current page link (no visual change)', (await d.getAttribute('.site-header__link >> text=About RRD', 'aria-current')) === 'page');

// ---------- 7. Layout shift on load ----------
for (const r of ROUTES) {
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await pg.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => list.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
  });
  await pg.goto(BASE + r, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(1500);
  const cls = await pg.evaluate(() => window.__cls);
  ok(`${r}: cumulative layout shift < 0.1`, cls < 0.1, cls.toFixed(4));
  await pg.close();
}

// ---------- 8. Responsive widths × routes ----------
let rp;
for (const w of WIDTHS) {
  // fresh tab per width: dozens of back-to-back loads in one tab exhaust Chromium's request pool on the dev server
  rp = await b.newPage({ viewport: { width: w, height: 900 } });
  watch(rp, 'responsive');
  const issues = [];
  for (const r of ROUTES) {
    await rp.goto(BASE + r, { waitUntil: 'networkidle' });
    await rp.waitForSelector('.site-header');
    const res = await rp.evaluate(() => {
      const vw = window.innerWidth;
      const out = [];
      if (document.documentElement.scrollWidth > vw) out.push(`overflow ${document.documentElement.scrollWidth}`);
      // visible elements poking past the viewport (ignores clipped scrollers and the hidden mobile nav)
      for (const el of document.querySelectorAll('main *, .site-header *, .site-footer *')) {
        const r = el.getBoundingClientRect();
        if (!r.width || r.right <= vw + 1) continue;
        if (el.closest('.comparison__scroller, .site-header__nav, [hidden]')) continue;
        if (getComputedStyle(el).visibility === 'hidden') continue;
        out.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} right=${Math.round(r.right)}`);
        if (out.length > 3) break;
      }
      const header = document.querySelector('.site-header').getBoundingClientRect();
      const expected = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
      if (Math.round(header.height) !== expected) out.push(`header ${header.height}≠${expected}`);
      return out;
    });
    if (res.length) issues.push(`${r}: ${res.join('; ')}`);
  }
  ok(`@${w}px: all pages — no overflow, nothing past the viewport, header height correct`, issues.length === 0, issues.join(' || '));

  if (w < 1024) {
    await rp.goto(BASE + '/', { waitUntil: 'networkidle' });
    await instantTop(rp, 1800);
    await rp.click('.site-header__toggle');
    const menuOk = await rp.isVisible('.site-header__nav') && (await rp.$eval('.site-header__nav', (n) => n.getBoundingClientRect().bottom <= window.innerHeight + 1));
    await rp.click('.site-header__nav >> text=Pricing');
    await settle(rp);
    const off = await landed(rp, '#pricing');
    ok(`@${w}px: mobile menu opens while scrolled, fits the screen, closes and lands below the header`, menuOk && !(await rp.isVisible('.site-header__nav')) && Math.abs(off) <= 2, `offset=${off}`);
  }
  await rp.close();
}

ok('no console / JavaScript errors', errors.length === 0, errors.slice(0, 5).join(' | '));
console.log(results.join('\n'));
console.log(`\n${results.filter((r) => r.startsWith('PASS')).length} passed, ${results.filter((r) => r.startsWith('FAIL')).length} failed`);
await b.close();
if (results.some((r) => r.startsWith('FAIL'))) process.exit(1);
