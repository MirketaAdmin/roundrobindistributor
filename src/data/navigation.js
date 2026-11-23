import { ROUTES, sectionHref } from '../config/links.js';

// Order and labels from the homepage Figma header.
export const PRIMARY_NAV = [
  { label: 'About RRD', to: ROUTES.about },
  { label: 'Features', to: sectionHref('features') },
  { label: 'Pricing', to: sectionHref('pricing') },
  // Client-confirmed: Support routes to the inquiry form for now.
  { label: 'Support', to: sectionHref('contact') },
  { label: 'Insights', to: ROUTES.insights },
];

export const HEADER_CTA = { label: 'Contact Us', to: ROUTES.contact };
