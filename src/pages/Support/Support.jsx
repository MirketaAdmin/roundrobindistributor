import SEO from '../../components/SEO/SEO.jsx';
import ContactSection from '../../components/ContactSection/ContactSection.jsx';
import { ROUTES } from '../../config/links.js';
import SupportHero from './sections/SupportHero/SupportHero.jsx';
import SupportTopics from './sections/SupportTopics/SupportTopics.jsx';

// Section order follows the Support Figma frame.
export default function Support() {
  return (
    <main id="main">
      <SEO
        title="Support"
        description="Find answers, troubleshoot assignment issues, and learn how to manage your Round Robin Distributor configuration."
        slug={ROUTES.support}
      />
      <SupportHero />
      <SupportTopics />
      <ContactSection />
    </main>
  );
}
