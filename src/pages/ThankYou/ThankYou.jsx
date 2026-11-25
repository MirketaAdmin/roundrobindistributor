import SEO from '../../components/SEO/SEO.jsx';
import { ROUTES } from '../../config/links.js';
import Insights from '../Home/sections/Insights/Insights.jsx';
import ThankYouHero from './sections/ThankYouHero/ThankYouHero.jsx';

/* Confirmation page Salesforce Web-to-Lead redirects to (retURL) after a successful inquiry.
   Section order follows the Thank You Figma frame: hero, then the Home Insights section unchanged. */
export default function ThankYou() {
  return (
    <main id="main">
      <SEO
        title="Thank You"
        description="Your Round Robin Distributor request has been received. A Salesforce Solutions Architect will reach out within one business day."
        slug={ROUTES.thankYou}
        robots="noindex, nofollow"
      />
      <ThankYouHero />
      <Insights />
    </main>
  );
}
