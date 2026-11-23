import { ArrowRight, Clock, Gauge, Scale, Zap } from 'lucide-react';
import Button from '../../../../components/Button/Button.jsx';
import Pill from '../../../../components/Pill/Pill.jsx';
import { HashLink } from '../../../../components/HashLink/HashLink.jsx';
import { EXTERNAL_LINKS, SECTION_IDS } from '../../../../config/links.js';
import './Hero.css';

// Copy verbatim from the homepage Figma frame.
// Icon colours sampled from the frame.
const CHIPS = [
  { label: 'Speed-to-Lead Reassignment', Icon: Zap, tone: 'pressed' },
  { label: 'Fair, Quota-Friendly Distribution', Icon: Scale, tone: 'success' },
  { label: 'Time-Zone & PTO Aware', Icon: Clock, tone: 'slate' },
  { label: 'Workload-Based Assignment', Icon: Gauge, tone: 'primary' },
];

export default function Hero() {
  const demoProps = EXTERNAL_LINKS.bookDemo
    ? { href: EXTERNAL_LINKS.bookDemo }
    : { to: `/#${SECTION_IDS.contact}` };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            Every Lead and Case to the Right Person, Fast,{' '}
            <span className="hero__title-accent">by Rules You Control.</span>
          </h1>
          <p className="hero__lead">
            Native Salesforce assignment for leads, cases, opportunities, and any custom object. Balanced by
            workload, caps, schedules, and time zones. Predictable, auditable, and priced per org, not per user.
          </p>

          <ul className="hero__chips">
            {CHIPS.map(({ label, Icon, tone }) => (
              <Pill
                key={label}
                as="li"
                variant="chip"
                icon={<Icon className={`hero__chip-icon hero__chip-icon--${tone}`} aria-hidden="true" />}
              >
                {label}
              </Pill>
            ))}
          </ul>

          <div className="hero__actions">
            <Button
              {...demoProps}
              size="lg"
              className="hero__demo"
              iconEnd={<ArrowRight className="hero__demo-icon" aria-hidden="true" />}
            >
              Book a Demo
            </Button>
            <Button to={`/#${SECTION_IDS.pricing}`} variant="secondary" size="lg">
              See Pricing
            </Button>
          </div>

          <HashLink to={`/#${SECTION_IDS.governance}`} className="hero__note">
            Rules-driven execution. AI where it pays.
            <ArrowRight className="hero__note-icon" aria-hidden="true" />
          </HashLink>
        </div>
      </div>
      {/* Photo + shapes come from the hero background image; below 1200px it is shown under the copy. */}
      <div className="hero__media" role="img" aria-label="Two colleagues reviewing Round Robin Distributor on a laptop" />
    </section>
  );
}
