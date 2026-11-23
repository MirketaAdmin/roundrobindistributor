import SEO from '../../components/SEO/SEO.jsx';
import ContactSection from '../../components/ContactSection/ContactSection.jsx';
import { ROUTES } from '../../config/links.js';
import LegalHero from './sections/LegalHero/LegalHero.jsx';
import LegalDocument from './sections/LegalDocument/LegalDocument.jsx';
import './Legal.css';

// Section order follows the Privacy Policy & T&C Figma frame.
export default function Legal() {
  return (
    <main id="main" className="legal-page">
      <SEO
        title="Privacy Policy and Terms & Conditions"
        description="Round Robin Distributor privacy standards, zero-egress architecture guarantees, software licensing terms and subscription commitments for Salesforce."
        slug={ROUTES.legal}
      />
      <div className="legal-page__main" data-qa="legal-main">
        <LegalHero />
        <LegalDocument />
      </div>
      <ContactSection />
    </main>
  );
}
