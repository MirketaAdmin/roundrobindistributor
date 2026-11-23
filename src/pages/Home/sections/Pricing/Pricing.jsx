import Button from '../../../../components/Button/Button.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { EXTERNAL_LINKS, SECTION_IDS, sectionHref } from '../../../../config/links.js';
import { PRICING } from '../../../../data/home.js';
import './Pricing.css';

export default function Pricing() {
  return (
    <section id={SECTION_IDS.pricing} className="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeading
          id="pricing-title"
          eyebrow={PRICING.eyebrow}
          title={PRICING.title}
          subtitle={PRICING.subtitle}
          align="center"
          className="pricing__heading"
        />

        <ul className="pricing__plans">
          {PRICING.plans.map((plan) => (
            <li key={plan.title} className={`pricing__plan${plan.featured ? ' pricing__plan--featured' : ''}`}>
              {plan.featured && <span className="pricing__badge">Most Popular</span>}
              <p className="pricing__eyebrow">{plan.eyebrow}</p>
              <h3 className="pricing__name">{plan.title}</h3>
              {plan.price ? (
                <>
                  <p className="pricing__price">
                    <span className="pricing__amount">{plan.price}</span>
                    <span className="pricing__period">{plan.period}</span>
                  </p>
                  <p className="pricing__highlight">{plan.highlight}</p>
                  <div className="pricing__foot pricing__foot--action">
                    <Button to={sectionHref('contact')} className="pricing__cta">
                      {plan.cta}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="pricing__body">{plan.body}</p>
                  <p className="pricing__foot">{plan.footer}</p>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="pricing__actions">
          {/* Destination not supplied yet (it used to scroll to this same section) — disabled until set */}
          <Button href={EXTERNAL_LINKS.pricingDetails} size="lg">
            {PRICING.primaryCta}
          </Button>
          <Button to={sectionHref('contact')} size="lg" variant="white" className="pricing__talk">
            {PRICING.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
