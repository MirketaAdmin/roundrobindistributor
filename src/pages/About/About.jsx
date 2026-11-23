import SEO from '../../components/SEO/SEO.jsx';
import ContactSection from '../../components/ContactSection/ContactSection.jsx';
import { ROUTES } from '../../config/links.js';
import AboutHero from './sections/AboutHero/AboutHero.jsx';
import WhoWeAre from './sections/WhoWeAre/WhoWeAre.jsx';
import Ecosystem from './sections/Ecosystem/Ecosystem.jsx';
import Solutions from './sections/Solutions/Solutions.jsx';
import Team from './sections/Team/Team.jsx';

// Section order follows the About Figma frame.
export default function About() {
  return (
    <main id="main">
      <SEO
        title="About Us"
        description="Round Robin Distributor helps Salesforce teams distribute leads, cases, opportunities, and other records to the right people using clear, configurable assignment rules."
        slug={ROUTES.about}
      />
      <AboutHero />
      <WhoWeAre />
      <Ecosystem />
      <Solutions />
      <Team />
      <ContactSection />
    </main>
  );
}
