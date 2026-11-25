# Round Robin Distributor — Website

React 19 + Vite 8 + React Router 7. Plain CSS with design tokens. The design reference is [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | oxlint |
| `npm run qa [baseUrl]` | Playwright functional checks against a running server (default `http://localhost:5191`) |
| `npm run qa:audit [baseUrl]` | Interaction audit: sticky header, CTA targets, hover states, reduced motion, history, layout shift, 9 widths × 7 pages. Run it against `npm run build && npx vite preview` (many back-to-back loads exhaust Chromium's request pool on the unbundled dev server) |
| `node scripts/capture.mjs <url> <out.png> [w] [h] [--full] [--click=sel]` | Screenshot for visual QA |
| `node scripts/capture-sections.mjs <url> <out.png> [w]` | Full-page screenshot plus per-section bounding boxes |
| `python -I scripts/extract-png-assets.py <homepage.png>` | Re-creates the Home raster assets cropped from the PNG design reference |
| `python -I scripts/extract-about-assets.py <about.png>` | Re-creates the About raster assets (`src/assets/about/`) |
| `python -I scripts/extract-contact-assets.py <contact.png>` | Re-creates the Contact icons (`src/assets/contact/`) |
| `python -I scripts/extract-insights-assets.py <insights.png>` | Re-creates the Insights glyphs (`src/assets/insights/`) |
| `python -I scripts/extract-article-assets.py <article.png>` | Re-creates the article images and glyphs (`src/assets/article/`) |
| `python -I scripts/extract-legal-assets.py <legal.png>` | Re-creates the Privacy Policy & T&C glyphs (`src/assets/legal/`) |
| `python -I scripts/extract-support-assets.py <support.png>` | Re-creates the Support glyphs (`src/assets/support/`) |
| `python -I scripts/extract-thank-you-assets.py <thank-you.png>` | Re-creates the Thank You badge discs and button glyphs (`src/assets/thank-you/`) |

## Structure

```
src/
  main.jsx, App.jsx          entry + routes (all pages render inside MainLayout)
  layouts/MainLayout/        Header + page outlet + Footer; scroll-to-top / scroll-to-#section on navigation
  pages/
    Home/                    `/` — one folder per section under sections/ (JSX + CSS)
    About/                   `/about-us` — sections/ AboutHero, WhoWeAre, Ecosystem, Solutions, Team
    Contact/                 `/contact-us` — sections/ ContactHero, Consult (copy + inquiry form); shared Faq
    Insights/                `/insights` — InsightsHero (search, sort, topic chips), InsightsList (cards + pagination)
    Article/                 `/insights/:slug` — ArticleContent, ArticleFeedback, ArticleSidebar (Latest Blogs,
                             inquiry form, sandbox card); shared Faq. Unknown slugs render the 404
    Legal/                   `/privacy-policy-and-terms` — LegalHero (meta strip, trust cards), LegalDocument
                             (searchable Document Index + Privacy / Terms cards); shared ContactSection
    Support/                 `/support` — SupportHero (category cards), SupportTopics (accordions); shared ContactSection
    ThankYou/                `/thank-you` — Web-to-Lead retURL; ThankYouHero + Home Insights section (noindex)
    NotFound/                404 (noindex)
  components/                shared UI, used by more than one section or page
    Header, Footer, Brand    site chrome and logo lockup
    Button                   primary | secondary | white | outline-light; md | lg; pending-link state
    SectionHeading           eyebrow (text | pill | pill-dark | pill-glass) + H2 + subtitle
    Pill                     default | compact | chip
    IconTile                 40 | 44px tinted icon tiles
    Icon                     approved lucide-react icons + raster icons recovered from the reference
    HashLink, SmartLink      in-page links / links whose URL may not be configured yet
    VideoModal               accessible <dialog> video player
    ContactSection           "See Round Robin Distributor in Action" + inquiry form (Home, About);
                             InquiryForm (+ InquiryForm.css) is also used on its own by the Contact page and the
                             article sidebar (`fields` / `className` props)
    Faq                      FAQ accordion (Contact page, article page); copy in data/contact.js
    Breadcrumb               "Home / Current page" trail on inner pages (`currentTo` links the last crumb)
    ArticleCard              insight article card + `.article-grid` (Home Insights, Insights page)
    SEO                      per-page <head> management
  styles/                    variables.css (design tokens), global.css (reset, container, base)
  data/                      page copy and navigation (all text lives here, not in components)
  config/links.js            external URLs (null until supplied), section ids, WEB_TO_LEAD form settings
  utils/                     scroll.js, validation.js, recaptcha.js (reCAPTCHA v2 loader for the inquiry form)
  assets/                    logos/, images/, icons/
scripts/                     QA capture, functional tests, asset extraction
qa/                          screenshots and comparison output
```

### Conventions

- **Design tokens:** colours, type, spacing, radius and layout come from `styles/variables.css`. Raw values in component CSS are measured, section-specific values from the design and carry a comment.
- **Components:** a component goes in `components/` only when it is reused. Section-only markup stays in its section folder.
- **Copy:** content goes in `data/`, never hard-coded in JSX.
- **Pending links:** an external destination stays `null` in `config/links.js` until it is supplied. Elements render as designed but are `aria-disabled`; there is never an `href="#"`.

### Persistence

No feature in the design needs a database: the site is static marketing content.

### Inquiry form → Salesforce Web-to-Lead

Every inquiry form is a plain HTML `<form method="POST">` that posts straight to Salesforce Web-to-Lead (settings in `WEB_TO_LEAD`, `src/config/links.js`; field names in `CONTACT.fields`, `src/data/home.js`). Salesforce redirects to `retURL` (`<current origin>/thank-you/`, the Thank You page) after a successful post; a valid submit locks the button so a double click cannot create two leads.

| Form field | Web-to-Lead field |
|---|---|
| First Name / Last Name | `first_name` (40) / `last_name` (80) |
| Work Email | `email` (80) |
| Phone | `mobile` (40) |
| Company | `company` (40) |
| Anything that will help us prepare | `description` |
| hidden | `oid`, `retURL`, `lead_source=Web`, `captcha_settings` (timestamp refreshed every 500ms), `g-recaptcha-response` |
| second "Company" (Home/Contact) and "Salesforce Edition" (article sidebar) | not submitted — no Web-to-Lead field yet |

Script only adds inline validation (the POST is blocked while a field is invalid or the reCAPTCHA is unticked) and renders the reCAPTCHA v2 checkbox (`utils/recaptcha.js`). The 304×78 widget is not in the Figma frames; it sits between the message field and the submit row and makes each form card 94px taller.
