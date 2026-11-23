import SEO from '../../components/SEO/SEO.jsx';
import Hero from './sections/Hero/Hero.jsx';
import TrustBar from './sections/TrustBar/TrustBar.jsx';
import Problems from './sections/Problems/Problems.jsx';
import Pillars from './sections/Pillars/Pillars.jsx';
import Comparison from './sections/Comparison/Comparison.jsx';
import Governance from './sections/Governance/Governance.jsx';
import Heritage from './sections/Heritage/Heritage.jsx';
import Steps from './sections/Steps/Steps.jsx';
import Ratings from './sections/Ratings/Ratings.jsx';
import Pricing from './sections/Pricing/Pricing.jsx';
import Insights from './sections/Insights/Insights.jsx';
import ContactSection from '../../components/ContactSection/ContactSection.jsx';

// Section order follows the homepage Figma frame.
export default function Home() {
  return (
    <main id="main">
      <SEO
        title="Round Robin Distributor | Native Salesforce Assignment App"
        description="Native Salesforce assignment for leads, cases, opportunities, and any custom object. Balanced by workload, caps, schedules, and time zones."
        slug="/"
      />
      <Hero />
      <TrustBar />
      <Problems />
      <Pillars />
      <Comparison />
      <Governance />
      <Heritage />
      <Steps />
      <Ratings />
      <Pricing />
      <Insights />
      <ContactSection />
    </main>
  );
}
