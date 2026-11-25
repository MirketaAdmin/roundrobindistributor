/* Thank You page copy, transcribed verbatim from the Thank You Figma frame (1280px).
   "\n" marks a drawn line break. */
import { ROUTES } from '../config/links.js';

export const THANK_YOU = {
  eyebrow: 'Request Confirmed • 1 Business Day SLA',
  title: 'Thank You! Your Request Has\nBeen Received.',
  body: 'A certified Salesforce Solutions Architect from Mirketa will review your routing\nrequirements and reach out within one business day.',
  actions: [
    { label: 'Return to Homepage', to: ROUTES.home, icon: 'home', variant: 'primary' },
    { label: 'Go to Insights', to: ROUTES.insights, icon: 'book', variant: 'white' },
  ],
};
