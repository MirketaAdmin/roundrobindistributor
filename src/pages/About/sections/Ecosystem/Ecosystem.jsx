import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { ECOSYSTEM } from '../../../../data/about.js';
import cloud from '../../../../assets/about/icon-cloud.png';
import hub from '../../../../assets/about/icon-hub.png';
import tune from '../../../../assets/about/icon-tune.png';
import './Ecosystem.css';

const ICONS = { cloud, hub, tune };

export default function Ecosystem() {
  return (
    <section className="ecosystem" data-qa="ecosystem" aria-labelledby="ecosystem-title">
      <div className="container">
        <SectionHeading
          id="ecosystem-title"
          eyebrow={ECOSYSTEM.eyebrow}
          title={ECOSYSTEM.title}
          subtitle={ECOSYSTEM.subtitle}
          className="ecosystem__heading"
        />
        <ul className="ecosystem__cards">
          {ECOSYSTEM.cards.map((card) => (
            <li key={card.title} className="ecosystem__card">
              <span className="ecosystem__tile">
                <img src={ICONS[card.icon]} alt="" width="48" height="49" className="ecosystem__icon" />
              </span>
              <h3 className="ecosystem__title">{card.title}</h3>
              <p className="ecosystem__body">{card.body}</p>
            </li>
          ))}
        </ul>
        <dl className="ecosystem__stats">
          {ECOSYSTEM.stats.map((stat) => (
            <div key={stat.label} className="ecosystem__stat">
              <dt className="ecosystem__label">{stat.label}</dt>
              <dd className="ecosystem__value">
                {stat.value}
                {stat.star && (
                  <span className="ecosystem__star" aria-label="out of 5 stars">
                    {' '}★
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
