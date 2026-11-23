import { chromium } from 'playwright';

// Functional regression checks. Start the dev server first, then: npm run qa [baseUrl]
const BASE = process.argv[2] || 'http://localhost:5191';
const b = await chromium.launch();
const errors = [];
const results = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  -- ' + extra : ''}`);
const overflows = (pg) => pg.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

// Desktop
const p = await b.newPage({ viewport: { width: 1280, height: 816 } });
p.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
p.on('pageerror', (e) => errors.push(e.message));
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
const links = await p.$$eval('a', (as) => as.map((a) => `${a.textContent.trim()} -> ${a.getAttribute('href')}`));
console.log(links.join('\n'));
ok('no empty or "#" hrefs', links.every((l) => !l.endsWith('-> #') && !l.endsWith('-> null') && !l.endsWith('-> ')));
ok('exactly one h1', (await p.$$('h1')).length === 1);
ok('hamburger hidden on desktop', !(await p.isVisible('.site-header__toggle')));
await p.click('.site-header__link >> text=Pricing');
ok('nav click updates URL hash', p.url().endsWith('#pricing'), p.url());
await p.click('.site-header .brand');
ok('logo link returns home', new URL(p.url()).pathname === '/');
await p.hover('.site-header__link >> nth=0');
await p.waitForTimeout(250);
const c = await p.$eval('.site-header__link', (e) => getComputedStyle(e).color);
ok('nav hover colour = primary', c === 'rgb(18, 111, 186)', c);
await p.hover('.hero__demo');
await p.waitForTimeout(250);
const bg = await p.$eval('.hero__demo', (e) => getComputedStyle(e).backgroundColor);
ok('Book a Demo hover = pressed blue #005695', bg === 'rgb(0, 86, 149)', bg);
await p.click('.hero__demo');
ok('Book a Demo -> #contact', p.url().endsWith('#contact'));
await p.click('text=See Pricing');
ok('See Pricing -> #pricing', p.url().endsWith('#pricing'));
await p.click('.hero__note');
ok('Rules-driven link -> #governance', p.url().endsWith('#governance'));
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
const order = [];
for (let i = 0; i < 10; i += 1) {
  await p.keyboard.press('Tab');
  order.push(await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 12)));
}
ok('keyboard Tab order: brand > nav x5 > CTA > hero actions', order.join('|') === 'Round Robin |About RRD|Features|Pricing|Support|Insights|Contact Us|Book a Demo|See Pricing|Rules-driven', order.join('|'));
ok('focus ring visible', (await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)) === 'solid');
ok('no horizontal overflow @1280', !(await overflows(p)));

// Mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
m.on('pageerror', (e) => errors.push(e.message));
await m.goto(BASE + '/', { waitUntil: 'networkidle' });
ok('mobile nav hidden initially', !(await m.isVisible('#site-nav')));
await m.click('.site-header__toggle');
ok('menu opens, aria-expanded=true', (await m.isVisible('#site-nav')) && (await m.getAttribute('.site-header__toggle', 'aria-expanded')) === 'true');
await m.keyboard.press('Escape');
ok('Escape closes menu', !(await m.isVisible('#site-nav')));
await m.click('.site-header__toggle');
await m.click('#site-nav >> text=Pricing');
ok('menu link closes menu + sets hash', !(await m.isVisible('#site-nav')) && m.url().endsWith('#pricing'));
await m.click('.site-header__toggle');
await m.setViewportSize({ width: 1280, height: 816 });
await m.waitForTimeout(150);
ok('resize to desktop resets menu state', (await m.getAttribute('.site-header__toggle', 'aria-expanded')) === 'false');
for (const w of [320, 390, 768, 1024, 1280, 1440, 1920]) {
  await m.setViewportSize({ width: w, height: 900 });
  await m.waitForTimeout(50);
  ok(`no horizontal overflow @${w}`, !(await overflows(m)));
}

const settle = (pg) =>
  pg.evaluate(
    () =>
      new Promise((resolve) => {
        let last = -1;
        let still = 0;
        const tick = () => {
          still = window.scrollY === last ? still + 1 : 0;
          last = window.scrollY;
          if (still >= 6) resolve();
          else requestAnimationFrame(tick);
        };
        tick();
      }),
  );

/* Anchor targets must land just below the sticky header (plus the element's own scroll-margin).
   Returns the offset in px from that line: 0 = exact. */
const landed = (page, sel) => page.$eval(sel, (el) => {
  const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.round(el.getBoundingClientRect().top - header - margin);
});

// Full homepage
const h = await b.newPage({ viewport: { width: 1280, height: 900 } });
h.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
h.on('pageerror', (e) => errors.push(e.message));
await h.goto(BASE + '/', { waitUntil: 'networkidle' });

const sectionOrder = await h.$$eval('main > section', (s) => s.map((el) => el.className.split(' ')[0]).join(','));
ok('section order matches Figma', sectionOrder === 'hero,trust,problems,pillars,comparison,governance,heritage,steps,ratings,pricing,insights,contact', sectionOrder);
ok('footer rendered', await h.isVisible('footer.site-footer'));
ok('exactly one h1 on homepage', (await h.$$('h1')).length === 1);

const hashes = await h.$$eval('a[href*="#"]', (as) => [...new Set(as.map((a) => a.getAttribute('href').split('#')[1]))]);
const missing = await h.evaluate((ids) => ids.filter((id) => !document.getElementById(id)), hashes);
ok(`all ${hashes.length} in-page anchors resolve`, missing.length === 0, missing.join(', '));
ok('no href="#" or empty hrefs anywhere', await h.$$eval('a', (as) => as.every((a) => a.getAttribute('href') && a.getAttribute('href') !== '#')));

for (const [label, id] of [['Features', 'features'], ['Pricing', 'pricing']]) {
  await h.click(`.site-header__link >> text=${label}`);
  await settle(h);
  const off = await landed(h, `#${id}`);
  ok(`nav "${label}" scrolls to #${id} (below sticky header)`, Math.abs(off) <= 2, `offset=${off}`);
}
await h.click('.governance__band-cta');
await settle(h);
ok('"See How RRD Works" scrolls to #how-it-works', Math.abs(await landed(h, '#how-it-works')) <= 2);
await h.click('.site-footer >> text=RRD vs. Native Tools');
await settle(h);
ok('footer "RRD vs. Native Tools" scrolls to #comparison', Math.abs(await landed(h, '#comparison')) <= 2);

const pending = await h.$$eval('.is-pending', (els) => els.map((el) => ({ t: el.textContent.trim(), href: el.getAttribute('href'), d: el.getAttribute('aria-disabled') })));
ok(`unconfigured destinations marked unavailable (${pending.length})`, pending.length > 0 && pending.every((p) => p.href === null && p.d === 'true'), pending.map((p) => p.t).join(' | '));
const plays = await h.$$eval('.ratings__play', (bs) => bs.map((b) => b.disabled));
ok('video buttons disabled until URLs are supplied', plays.length === 3 && plays.every(Boolean));
ok('video dialog closed by default', !(await h.$eval('dialog.video-modal', (d) => d.open)));

// Inquiry form
await h.click('.inquiry__submit');
const invalid = await h.$$eval('.inquiry [aria-invalid="true"]', (els) => els.map((el) => el.dataset.field));
ok('empty submit flags all 6 required fields', invalid.length === 6, invalid.join(','));
ok('focus moves to first invalid field', (await h.evaluate(() => document.activeElement.dataset.field)) === 'first_name');
ok('error messages rendered', (await h.$$('.inquiry__field .inquiry__error')).length === 6);
const fill = { first_name: 'Jane', last_name: 'Doe', email: 'not-an-email', mobile: '+1 (555) 000-0000', company: 'Acme', company_secondary: 'Acme' };
for (const [field, value] of Object.entries(fill)) await h.fill(`.inquiry [data-field="${field}"]`, value);
await h.click('.inquiry__submit');
ok('invalid email rejected', (await h.$$eval('.inquiry [aria-invalid="true"]', (els) => els.map((el) => el.dataset.field))).join() === 'email');
await h.fill('.inquiry [data-field="email"]', 'jane.doe@company.com');
await h.fill('.inquiry [data-field="description"]', 'Team of 20 reps');
ok('form posts to Salesforce Web-to-Lead', (await h.getAttribute('form.inquiry', 'action')).startsWith('https://webto.salesforce.com/servlet/servlet.WebToLead')
  && (await h.getAttribute('form.inquiry', 'method')).toUpperCase() === 'POST');
const posted = await h.$$eval('form.inquiry [name]', (els) => els.map((el) => el.name).join(','));
ok('Web-to-Lead field names + hidden fields', posted.startsWith('captcha_settings,oid,retURL,lead_source,first_name,last_name,email,mobile,company,description'), posted);
ok('hidden values match the Salesforce snippet', (await h.getAttribute('form.inquiry [name=oid]', 'value')) === '00Dd0000000hivg'
  && (await h.getAttribute('form.inquiry [name=lead_source]', 'value')) === 'Web'
  && JSON.parse(await h.inputValue('form.inquiry [name=captcha_settings]')).keyname === 'roundrobindistributor');
await h.waitForSelector('.inquiry__captcha iframe', { timeout: 10000 }).catch(() => {});
const captchaLoaded = (await h.$$('.inquiry__captcha iframe')).length > 0;
await h.click('.inquiry__submit');
ok('valid fields clear errors', (await h.$$('.inquiry [aria-invalid="true"]')).length === 0);
ok('reCAPTCHA renders and an unticked captcha blocks the POST', captchaLoaded && new URL(h.url()).origin === new URL(BASE).origin
  && ((await h.textContent('.inquiry__captcha')) || '').includes('not a robot'));
const settingsNow = await h.inputValue('form.inquiry [name=captcha_settings]');
ok('captcha_settings timestamp refreshed', JSON.parse(settingsNow).ts !== '', settingsNow);
ok('reCAPTCHA adds g-recaptcha-response to the POST', (await h.$$('form.inquiry [name=g-recaptcha-response]')).length === 1);

// About page
const a = await b.newPage({ viewport: { width: 1280, height: 900 } });
a.on('console', (msg) => msg.type() === 'error' && errors.push('[about] ' + msg.text()));
a.on('pageerror', (e) => errors.push('[about] ' + e.message));
await a.goto(BASE + '/', { waitUntil: 'networkidle' });
await a.click('.site-header__link >> text=About RRD');
await a.waitForURL('**/about-us');
await a.waitForSelector('.about-hero');
ok('nav "About RRD" opens /about-us', new URL(a.url()).pathname === '/about-us');
ok('About page scrolls to top on navigation', (await a.evaluate(() => window.scrollY)) === 0);
ok('About h1', (await a.textContent('h1')).startsWith('Assignment Should Be Fair.'));
ok('About document title', (await a.title()).includes('About Us'));
const aboutOrder = await a.$$eval('main > section', (s) => s.map((el) => el.dataset.qa || el.className.split(' ')[0]).join(','));
ok('About section order matches Figma', aboutOrder === 'about-hero,who,ecosystem,solutions,team,contact', aboutOrder);
await a.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
  await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
});
const broken = await a.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
ok(`all About images load (${await a.$$eval('img', (i) => i.length)})`, broken.length === 0, broken.join(', '));
ok('About: no href="#" or empty hrefs', await a.$$eval('a', (as) => as.every((x) => x.getAttribute('href') && x.getAttribute('href') !== '#')));
ok('"Explore Mirketa" marked unavailable until URL supplied', (await a.getAttribute('.team__explore', 'aria-disabled')) === 'true');
await a.click('.about-hero__secondary');
await settle(a);
ok('"Contact Our Team" scrolls to the inquiry form', Math.abs(await landed(a, '#contact')) <= 2);
await a.click('.about-hero__primary');
await a.waitForSelector('#features');
await settle(a);
ok('"Explore Our Solution" opens Home features', Math.abs(await landed(a, '#features')) <= 2);
await a.goto(BASE + '/about-us', { waitUntil: 'networkidle' });
await a.click('.breadcrumb__home');
ok('breadcrumb "Home" returns to /', new URL(a.url()).pathname === '/');
await a.goto(BASE + '/about-us', { waitUntil: 'networkidle' });
for (const w of [320, 390, 768, 1024, 1280, 1440]) {
  await a.setViewportSize({ width: w, height: 900 });
  await a.waitForTimeout(50);
  ok(`About: no horizontal overflow @${w}`, !(await overflows(a)));
}

// Contact Us page
const cp = await b.newPage({ viewport: { width: 1280, height: 900 } });
cp.on('console', (msg) => msg.type() === 'error' && errors.push('[contact] ' + msg.text()));
cp.on('pageerror', (e) => errors.push('[contact] ' + e.message));
await cp.goto(BASE + '/', { waitUntil: 'networkidle' });
await cp.click('.site-header__cta');
await cp.waitForURL('**/contact-us');
await cp.waitForSelector('.contact-hero');
ok('header "Contact Us" opens /contact-us', new URL(cp.url()).pathname === '/contact-us');
ok('Contact h1', (await cp.textContent('h1')).replace(/\s+/g, ' ').trim() === 'Get in Touch with the Round Robin Team');
ok('Contact document title', (await cp.title()).includes('Contact Us'));
const contactOrder = await cp.$$eval('main > section', (s) => s.map((el) => el.dataset.qa).join(','));
ok('Contact section order matches Figma', contactOrder === 'contact-hero,consult,faq', contactOrder);
await cp.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
  await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
});
const brokenC = await cp.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
ok(`all Contact images load (${await cp.$$eval('img', (i) => i.length)})`, brokenC.length === 0, brokenC.join(', '));
const mailtos = await cp.$$eval('.contact-hero__email', (as) => as.map((x) => x.getAttribute('href')));
ok('channel emails are mailto links', mailtos.join() === 'mailto:sales@roundrobindistributor.com,mailto:support@mirketa.com,mailto:partners@roundrobindistributor.com', mailtos.join());
ok('Contact: no href="#" or empty hrefs', await cp.$$eval('a', (as) => as.every((x) => x.getAttribute('href') && x.getAttribute('href') !== '#')));
ok('"Explore AppExchange Listing" marked unavailable until URL supplied', (await cp.getAttribute('.consult__sandbox-cta', 'aria-disabled')) === 'true');
const triggers = cp.locator('.faq__trigger');
ok('FAQ: 6 questions, 2 open as designed', (await triggers.count()) === 6 && (await cp.$$('.faq__trigger[aria-expanded="true"]')).length === 2);
await triggers.nth(0).click();
ok('FAQ: open item collapses on click', (await triggers.nth(0).getAttribute('aria-expanded')) === 'false' && !(await cp.isVisible('.faq__answer >> nth=0')));
await triggers.nth(0).press('Enter');
ok('FAQ: re-opens with keyboard', (await triggers.nth(0).getAttribute('aria-expanded')) === 'true' && (await cp.isVisible('.faq__answer >> nth=0')));
await triggers.nth(1).click({ force: true }); // aria-disabled: verify the click does nothing
ok('FAQ: items without a supplied answer stay closed (aria-disabled)', (await triggers.nth(1).getAttribute('aria-expanded')) === 'false' && (await triggers.nth(1).getAttribute('aria-disabled')) === 'true');
await cp.click('.consult .inquiry__submit');
ok('Contact form validates (6 required fields flagged)', (await cp.$$('.consult [aria-invalid="true"]')).length === 6);
await cp.click('.breadcrumb__home');
ok('Contact breadcrumb "Home" returns to /', new URL(cp.url()).pathname === '/');
await cp.goto(BASE + '/contact-us', { waitUntil: 'networkidle' });
for (const w of [320, 390, 768, 1024, 1280, 1440]) {
  await cp.setViewportSize({ width: w, height: 900 });
  await cp.waitForTimeout(50);
  ok(`Contact: no horizontal overflow @${w}`, !(await overflows(cp)));
}

// Insights page
const ip = await b.newPage({ viewport: { width: 1280, height: 900 } });
ip.on('console', (msg) => msg.type() === 'error' && errors.push('[insights] ' + msg.text()));
ip.on('pageerror', (e) => errors.push('[insights] ' + e.message));
await ip.goto(BASE + '/', { waitUntil: 'networkidle' });
await ip.click('.site-header__link >> text=Insights');
await ip.waitForURL('**/insights');
await ip.waitForSelector('.insights-hero');
ok('nav "Insights" opens /insights', new URL(ip.url()).pathname === '/insights');
ok('Insights h1', (await ip.textContent('h1')).replace(/\s+/g, ' ').trim() === 'Insights for Better Salesforce Assignment.');
ok('Insights document title', (await ip.title()).includes('Insights'));
const insightsOrder = await ip.$$eval('main > section', (s) => s.map((el) => el.dataset.qa).join(','));
ok('Insights section order matches Figma', insightsOrder === 'insights-hero,insights-list', insightsOrder);
await ip.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
  await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  window.scrollTo(0, 0);
});
const brokenI = await ip.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
ok(`all Insights images load (${await ip.$$eval('img', (i) => i.length)})`, brokenI.length === 0, brokenI.join(', '));
const cardCount = () => ip.$$eval('.insights-list .article-card', (els) => els.length);
ok('6 cards and "All Insights 18" as designed', (await cardCount()) === 6 && (await ip.textContent('.insights-chip__count')) === '18');
ok('pagination 1 2 3 … 12, page 1 current, others disabled', (await ip.$$eval('.pager__page', (els) => els.map((e) => e.textContent).join())) === '1,2,3,12'
  && (await ip.getAttribute('.pager__page.is-current', 'aria-current')) === 'page'
  && (await ip.$$eval('.pager__page[aria-disabled="true"]', (els) => els.length)) === 3);
await ip.click('.insights-chip >> text=Workload & Rep Balancing');
ok('chip filters cards (Workload → 2)', (await cardCount()) === 2 && (await ip.getAttribute('.insights-chip >> text=Workload & Rep Balancing', 'aria-pressed')) === 'true');
ok('pagination hidden while filtering', !(await ip.isVisible('.pager')));
await ip.click('.insights-chip >> text=Speed-to-Lead & SLA');
ok('chip with no articles shows empty state', (await cardCount()) === 0 && (await ip.isVisible('.insights-list__empty')));
await ip.click('.insights-chip >> text=All Insights');
await ip.keyboard.press('Control+k');
ok('Ctrl+K focuses search', await ip.evaluate(() => document.activeElement?.classList.contains('insights-filter__input')));
await ip.keyboard.type('omni');
ok('search filters cards ("omni" → 2)', (await cardCount()) === 2);
await ip.fill('.insights-filter__input', '');
ok('clearing search restores 6 cards + pagination', (await cardCount()) === 6 && (await ip.isVisible('.pager')));
ok('Insights: no href="#" or empty hrefs', await ip.$$eval('a', (as) => as.every((x) => x.getAttribute('href') && x.getAttribute('href') !== '#')));
await ip.click('.breadcrumb__home');
ok('Insights breadcrumb "Home" returns to /', new URL(ip.url()).pathname === '/');
await ip.waitForSelector('.insights__all');
await ip.click('.insights__all');
await ip.waitForURL('**/insights');
ok('Home "See all insights" opens /insights', new URL(ip.url()).pathname === '/insights');
for (const w of [320, 390, 768, 1024, 1280, 1440]) {
  await ip.setViewportSize({ width: w, height: 900 });
  await ip.waitForTimeout(50);
  ok(`Insights: no horizontal overflow @${w}`, !(await overflows(ip)));
}

// Article detail page
const ARTICLE_URL = '/insights/lead-assignment-rules-vs-round-robin-distributor';
const ap = await b.newPage({ viewport: { width: 1280, height: 900 } });
ap.on('console', (msg) => msg.type() === 'error' && errors.push('[article] ' + msg.text()));
ap.on('pageerror', (e) => errors.push('[article] ' + e.message));
await ap.goto(BASE + ARTICLE_URL, { waitUntil: 'networkidle' });
await ap.waitForSelector('.article-head__title');
ok('Article h1', (await ap.textContent('h1')).replace(/\s+/g, ' ').trim() === 'Lead Assignment Rules vs. Round Robin Distributor: 7 Critical Gaps in Native Salesforce Setup');
ok('Article document title + canonical', (await ap.title()).includes('7 Critical Gaps') && (await ap.getAttribute('link[rel=canonical]', 'href'))?.endsWith(ARTICLE_URL));
const articleOrder = await ap.$$eval('main > [data-qa]', (s) => s.map((el) => el.dataset.qa).join(','));
ok('Article section order matches Figma', articleOrder === 'article-main,faq', articleOrder);
ok('Article: 4 numbered gaps, 1 figure, 1 h2', (await ap.$$('.article-gap')).length === 4 && (await ap.$$('.article-figure')).length === 1 && (await ap.$$('.article-body__h2')).length === 1);
await ap.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
  await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  window.scrollTo(0, 0);
});
const brokenA = await ap.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
ok(`all Article images load (${await ap.$$eval('img', (i) => i.length)})`, brokenA.length === 0, brokenA.join(', '));
ok('Article: no href="#" or empty hrefs', await ap.$$eval('a', (as) => as.every((x) => x.getAttribute('href') && x.getAttribute('href') !== '#')));
await ap.click('.article-action--save');
ok('Save toggles (aria-pressed)', (await ap.getAttribute('.article-action--save', 'aria-pressed')) === 'true');
await ap.click('.article-feedback__btn >> text=Yes');
ok('feedback "Yes" toggles pressed state', (await ap.getAttribute('.article-feedback__btn >> text=Yes', 'aria-pressed')) === 'true'
  && (await ap.getAttribute('.article-feedback__btn >> text=No', 'aria-pressed')) === 'false');
await ap.click('.article-feedback__btn >> text=No');
ok('feedback "No" replaces "Yes"', (await ap.getAttribute('.article-feedback__btn >> text=Yes', 'aria-pressed')) === 'false'
  && (await ap.getAttribute('.article-feedback__btn >> text=No', 'aria-pressed')) === 'true');
ok('Latest Blogs: featured + 5 items; blog links pending (aria-disabled)', (await ap.$$('.latest-item')).length === 5
  && (await ap.$$('.latest-item__title[aria-disabled="true"]')).length === 5 && (await ap.getAttribute('.latest-featured__link', 'aria-disabled')) === 'true');
ok('sidebar form: 6th field is "Salesforce Edition" (optional)', (await ap.$$eval('.aside-inquiry .inquiry__label', (l) => l.map((x) => x.textContent).join('|'))).includes('Salesforce Edition|')
  && (await ap.getAttribute('.aside-inquiry input[data-field=salesforce_edition]', 'required')) === null);
await ap.click('.aside-inquiry .inquiry__submit');
ok('sidebar form validates (5 required fields flagged)', (await ap.$$('.aside-inquiry [aria-invalid="true"]')).length === 5);
ok('sidebar "Explore AppExchange Listing" unavailable until URL supplied', (await ap.getAttribute('.aside-sandbox__cta', 'aria-disabled')) === 'true');
ok('Article FAQ: 6 questions, 2 open', (await ap.$$('.faq__trigger')).length === 6 && (await ap.$$('.faq__trigger[aria-expanded="true"]')).length === 2);
await ap.click('.latest__all');
await ap.waitForURL('**/insights');
ok('Latest Blogs "View all" opens /insights', new URL(ap.url()).pathname === '/insights');
await ap.goto(BASE + ARTICLE_URL, { waitUntil: 'networkidle' });
await ap.click('.breadcrumb__current-link');
await ap.waitForURL('**/insights');
ok('Article breadcrumb "Insights" opens /insights', new URL(ap.url()).pathname === '/insights');
await ap.goto(BASE + '/insights/unknown-article', { waitUntil: 'networkidle' });
ok('unknown article slug renders 404', (await ap.textContent('h1')) === 'Page not found');
await ap.goto(BASE + ARTICLE_URL, { waitUntil: 'networkidle' });
for (const w of [320, 390, 768, 1024, 1280, 1440]) {
  await ap.setViewportSize({ width: w, height: 900 });
  await ap.waitForTimeout(50);
  ok(`Article: no horizontal overflow @${w}`, !(await overflows(ap)));
}

// Privacy Policy & T&C page
const lp = await b.newPage({ viewport: { width: 1280, height: 900 } });
lp.on('console', (msg) => msg.type() === 'error' && errors.push('[legal] ' + msg.text()));
lp.on('pageerror', (e) => errors.push('[legal] ' + e.message));
await lp.goto(BASE + '/', { waitUntil: 'networkidle' });
await lp.click('.site-footer >> text=Privacy Policy and T&C');
await lp.waitForURL('**/privacy-policy-and-terms');
await lp.waitForSelector('.legal-hero');
ok('footer "Privacy Policy and T&C" opens /privacy-policy-and-terms', new URL(lp.url()).pathname === '/privacy-policy-and-terms');
ok('Legal h1 + document title', (await lp.textContent('h1')).trim() === 'Legal Agreements & Compliance Center' && (await lp.title()).includes('Privacy Policy'));
const legalOrder = await lp.$$eval('main > *', (s) => s.map((el) => el.dataset.qa || el.className.split(' ')[0]).join(','));
ok('Legal section order matches Figma', legalOrder === 'legal-main,contact', legalOrder);
ok('Legal: 2 parts, 7 sections as drawn', (await lp.$$('.legal-part')).length === 2 && (await lp.$$('.legal-section')).length === 7);
await lp.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
  await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  window.scrollTo(0, 0);
});
const brokenL = await lp.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
ok(`all Legal images load (${await lp.$$eval('img', (i) => i.length)})`, brokenL.length === 0, brokenL.join(', '));
ok('Legal: no href="#" or empty hrefs', await lp.$$eval('a', (as) => as.every((x) => x.getAttribute('href') && x.getAttribute('href') !== '#')));
ok('index: 3 linked entries, 9 pending (aria-disabled)', (await lp.$$('a.legal-index__link')).length === 3 && (await lp.$$('.legal-index__link[aria-disabled="true"]')).length === 9);
await lp.click('a.legal-index__link >> text=02. The Absolute Zero-Egress Guarantee');
await lp.waitForTimeout(900);
ok('index link scrolls to its section and sets the hash', new URL(lp.url()).hash === '#privacy-2'
  && Math.abs(await landed(lp, '#privacy-2')) <= 2);
await lp.fill('.legal-index__input', 'gdpr');
ok('index search filters entries ("gdpr" → 1)', (await lp.$$('.legal-index__list li')).length === 1);
await lp.fill('.legal-index__input', 'zzz');
ok('index search with no match shows empty state', await lp.isVisible('.legal-index__empty'));
await lp.fill('.legal-index__input', '');
ok('clearing index search restores 12 entries', (await lp.$$('.legal-index__list li')).length === 12);
await lp.click('.legal-page .contact .inquiry__submit');
ok('Legal contact form validates (6 required fields flagged)', (await lp.$$('.legal-page .contact [aria-invalid="true"]')).length === 6);
await lp.click('.breadcrumb__home');
ok('Legal breadcrumb "Home" returns to /', new URL(lp.url()).pathname === '/');
await lp.goto(BASE + '/privacy-policy-and-terms', { waitUntil: 'networkidle' });
for (const w of [320, 390, 768, 1024, 1280, 1440]) {
  await lp.setViewportSize({ width: w, height: 900 });
  await lp.waitForTimeout(50);
  ok(`Legal: no horizontal overflow @${w}`, !(await overflows(lp)));
}

// Support page (reached by URL for now: header/footer "Support" still go to Home #contact per the client)
const sp = await b.newPage({ viewport: { width: 1280, height: 900 } });
sp.on('console', (msg) => msg.type() === 'error' && errors.push('[support] ' + msg.text()));
sp.on('pageerror', (e) => errors.push('[support] ' + e.message));
await sp.goto(BASE + '/support', { waitUntil: 'networkidle' });
await sp.waitForSelector('.support-hero');
ok('Support h1 + document title', (await sp.textContent('h1')).replace(/\s+/g, ' ').trim() === 'We’re Here to Help You Get More from RRD.' && (await sp.title()).includes('Support'));
const supportOrder = await sp.$$eval('main > section', (s) => s.map((el) => el.dataset.qa || el.className.split(' ')[0]).join(','));
ok('Support section order matches Figma', supportOrder === 'support-hero,support-topics,contact', supportOrder);
const brokenS = await sp.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
ok(`all Support images load (${await sp.$$eval('img', (i) => i.length)})`, brokenS.length === 0, brokenS.join(', '));
ok('Support: no href="#" or empty hrefs', await sp.$$eval('a', (as) => as.every((x) => x.getAttribute('href') && x.getAttribute('href') !== '#')));
const sq = sp.locator('.support-q__trigger');
ok('Support: 12 questions, 1 open, 11 pending (aria-disabled)', (await sq.count()) === 12
  && (await sp.$$('.support-q__trigger[aria-expanded="true"]')).length === 1 && (await sp.$$('.support-q__trigger[aria-disabled="true"]')).length === 11);
await sq.nth(0).click();
ok('Support: open answer collapses on click', (await sq.nth(0).getAttribute('aria-expanded')) === 'false' && !(await sp.isVisible('.support-q__answer')));
await sq.nth(0).press('Enter');
ok('Support: re-opens with keyboard', (await sq.nth(0).getAttribute('aria-expanded')) === 'true' && (await sp.isVisible('.support-q__answer')));
await sq.nth(1).click({ force: true });
ok('Support: questions without answers stay closed', (await sq.nth(1).getAttribute('aria-expanded')) === 'false');
await sp.click('.support-card__link >> text=Resolve Routing Issues');
await sp.waitForTimeout(900);
ok('card link scrolls to its category and sets the hash', new URL(sp.url()).hash === '#support-troubleshooting'
  && Math.abs(await landed(sp, '#support-troubleshooting')) <= 2);
await sp.click('.contact .inquiry__submit');
ok('Support contact form validates (6 required fields flagged)', (await sp.$$('.contact [aria-invalid="true"]')).length === 6);
await sp.click('.breadcrumb__home');
ok('Support breadcrumb "Home" returns to /', new URL(sp.url()).pathname === '/');
await sp.goto(BASE + '/support', { waitUntil: 'networkidle' });
for (const w of [320, 390, 768, 1024, 1280, 1440]) {
  await sp.setViewportSize({ width: w, height: 900 });
  await sp.waitForTimeout(50);
  ok(`Support: no horizontal overflow @${w}`, !(await overflows(sp)));
}

// 404
await m.goto(BASE + '/does-not-exist', { waitUntil: 'networkidle' });
ok('unknown route renders 404', (await m.textContent('h1')) === 'Page not found');
ok('404 is noindex', (await m.getAttribute('meta[name=robots]', 'content')).includes('noindex'));
ok('no console errors', errors.length === 0, errors.join(' | '));

console.log('\n' + results.join('\n'));
await b.close();
if (results.some((r) => r.startsWith('FAIL'))) process.exit(1);
