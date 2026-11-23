import IconTile from '../../../../components/IconTile/IconTile.jsx';
import Pill from '../../../../components/Pill/Pill.jsx';
import { INDUSTRIES, TRUST_STATS } from '../../../../data/home.js';
import './TrustBar.css';

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Why teams trust Round Robin Distributor">
      <div className="container">
        <ul className="trust__stats">
          {TRUST_STATS.map((stat) => (
            <li key={stat.text} className="trust__stat">
              <IconTile
                icon={stat.icon}
                size={40}
                className={stat.icon === 'Star' ? 'trust__tile--star' : ''}
                iconProps={stat.icon === 'Star' ? { fill: 'currentColor' } : undefined}
              />
              <span className="trust__text">
                {stat.text}
                {stat.stars && (
                  <span className="trust__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="trust__industries">
          <p className="trust__label">Trusted across 13+ industries</p>
          <ul className="trust__pills">
            {INDUSTRIES.map((industry) => (
              <Pill key={industry} as="li">
                {industry}
              </Pill>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
