/*
  External destinations. Each stays null until the client supplies the real URL.
  While a value is null the element renders visually but is marked unavailable
  (aria-disabled, no href) — never href="#".
*/
export const EXTERNAL_LINKS = {
  appExchange: null,
  bookDemo: null, // until set, "Book a Demo" scrolls to the inquiry form
  mirketa: null, // About page "Explore Mirketa"
  pricingDetails: null, // Home Pricing "See Pricing" (detailed pricing page / AppExchange pricing tab)
};

/* Site routes */
export const ROUTES = {
  home: '/',
  about: '/about-us',
  contact: '/contact-us',
  insights: '/insights',
  article: '/insights/:slug',
  legal: '/privacy-policy-and-terms',
  support: '/support',
};

/* Article detail URL for a slug (src/data/article.js). */
export const articlePath = (slug) => `${ROUTES.insights}/${slug}`;

/* Article URLs, keyed by the article id in src/data/home.js */
export const ARTICLE_LINKS = {
  'omni-channel-alternative': null,
  'lead-distribution': null,
  'round-robin-best-practices': null,
};

/* Video URLs (YouTube/Vimeo embed URL or .mp4), keyed by the video id in src/data/home.js */
export const VIDEO_LINKS = {
  'customer-testimonial': null,
  'product-walkthrough': null,
  'queue-routing-demo': null,
};

/* Inquiry form → Salesforce Web-to-Lead (client-supplied form, 2026-11-23). The form posts as plain HTML;
   Salesforce redirects to `retURL` afterwards. reCAPTCHA v2 is required by the org (`captcha_settings`). */
export const WEB_TO_LEAD = {
  action: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dd0000000hivg',
  oid: '00Dd0000000hivg',
  retURL: 'http://roundrobindistributor.com/thank-you/',
  leadSource: 'Web',
  captchaSettings: { keyname: 'roundrobindistributor', fallback: 'true', orgId: '00Dd0000000hivg', ts: '' },
  recaptchaSiteKey: '6Lc-Ei4uAAAAAI_0LQW8LNmWOrHuiiEpUOo6KCZ4',
};

/* Homepage section anchors. */
export const SECTION_IDS = {
  features: 'features',
  comparison: 'comparison',
  governance: 'governance',
  about: 'about',
  howItWorks: 'how-it-works',
  pricing: 'pricing',
  insights: 'insights',
  contact: 'contact',
};

export const sectionHref = (key) => `/#${SECTION_IDS[key]}`;
