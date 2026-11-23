import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb.jsx';
import { LEGAL_HERO } from '../../../../data/legal.js';
import calendar from '../../../../assets/legal/icon-calendar.png';
import verified from '../../../../assets/legal/icon-verified.png';
import history from '../../../../assets/legal/icon-history.png';
import native from '../../../../assets/legal/trust-native.png';
import soc2 from '../../../../assets/legal/trust-soc2.png';
import gdpr from '../../../../assets/legal/trust-gdpr.png';
import appexchange from '../../../../assets/legal/trust-appexchange.png';
import './LegalHero.css';

const META_ICONS = { calendar, verified, history };
const TRUST_ICONS = { native, soc2, gdpr, appexchange };

function Glyph({ src }) {
  return <img src={src} alt="" className="legal-glyph" />;
}

export default function LegalHero() {
  return (
    <section className="legal-hero" aria-labelledby="legal-title">
      <div className="container">
        <Breadcrumb current={LEGAL_HERO.breadcrumb} />
        <h1 id="legal-title" className="legal-hero__title">
          {LEGAL_HERO.title}
        </h1>
        <p className="legal-hero__subtitle">{LEGAL_HERO.subtitle}</p>

        <dl className="legal-meta">
          {LEGAL_HERO.meta.map((item) => (
            <div key={item.label} className="legal-meta__item">
              <Glyph src={META_ICONS[item.icon]} />
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="legal-trust">
          {LEGAL_HERO.trust.map((item) => (
            <li key={item.title} className="legal-trust__card">
              <span className="legal-trust__tile">
                <Glyph src={TRUST_ICONS[item.icon]} />
              </span>
              <span>
                <span className="legal-trust__title">{item.title}</span>
                <span className="legal-trust__subtitle">{item.subtitle}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
