import SEO from '../../components/SEO/SEO.jsx';
import { ROUTES } from '../../config/links.js';
import ContactHero from './sections/ContactHero/ContactHero.jsx';
import Consult from './sections/Consult/Consult.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import './Contact.css';

// Section order follows the Contact Figma frame.
export default function Contact() {
  return (
    <main id="main" className="contact-page">
      <SEO
        title="Contact Us"
        description="Talk to the Round Robin Distributor team about Salesforce routing, custom enterprise architecture, or partner and AppExchange inquiries."
        slug={ROUTES.contact}
      />
      <ContactHero />
      <Consult />
      <Faq />
    </main>
  );
}
