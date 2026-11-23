import Button from '../../../../components/Button/Button.jsx';
import Icon from '../../../../components/Icon/Icon.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { SECTION_IDS, sectionHref } from '../../../../config/links.js';
import { GOVERNANCE } from '../../../../data/home.js';
import illustration from '../../../../assets/images/governance-illustration.webp';
import './Governance.css';

export default function Governance() {
  return (
    <section id={SECTION_IDS.governance} className="governance" aria-labelledby="governance-title">
      <div className="container">
        <SectionHeading
          id="governance-title"
          eyebrow={GOVERNANCE.eyebrow}
          eyebrowStyle="pill-dark"
          title={GOVERNANCE.title}
          subtitle={GOVERNANCE.body}
          theme="dark"
          className="governance__heading"
        />

        <div className="governance__grid">
          <div className="governance__panel">
            <img
              src={illustration}
              alt="Deterministic business rules compared with a probabilistic AI black box"
              width="536"
              height="400"
              loading="lazy"
              className="governance__image"
            />
          </div>
          <ul className="governance__cards">
            {GOVERNANCE.cards.map((card) => (
              <li key={card.title} className="governance__card">
                <Icon name={card.icon} className="governance__icon" />
                <h3 className="governance__card-title">{card.title}</h3>
                <p className="governance__card-body">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="governance__band">
          <p className="governance__band-text">{GOVERNANCE.band}</p>
          <Button
            to={sectionHref('howItWorks')}
            size="lg"
            className="governance__band-cta"
            iconEnd={<Icon name="ArrowRight" className="governance__band-icon" />}
          >
            {GOVERNANCE.bandCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
