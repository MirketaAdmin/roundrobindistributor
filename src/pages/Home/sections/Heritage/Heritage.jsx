import Icon from '../../../../components/Icon/Icon.jsx';
import { SECTION_IDS } from '../../../../config/links.js';
import { HERITAGE } from '../../../../data/home.js';
import logoLarge from '../../../../assets/logos/rrd-logo-large.png';
import './Heritage.css';

export default function Heritage() {
  return (
    <section id={SECTION_IDS.about} className="heritage" aria-labelledby="heritage-title">
      <div className="container heritage__inner">
        <div className="heritage__copy">
          <h2 id="heritage-title" className="heritage__title">
            {HERITAGE.title}
          </h2>
          <p className="heritage__lead">{HERITAGE.lead}</p>
          <p className="heritage__body">{HERITAGE.body}</p>
          <ul className="heritage__points">
            {HERITAGE.points.map((point) => (
              <li key={point} className="heritage__point">
                <Icon name="BadgeCheck" className="heritage__point-icon" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="heritage__card">
          <img
            src={logoLarge}
            alt="Round Robin Distributor logo"
            width="128"
            height="105"
            loading="lazy"
            className="heritage__logo"
          />
          <h3 className="heritage__card-title">{HERITAGE.card.title}</h3>
          <p className="heritage__card-body">{HERITAGE.card.body}</p>
        </div>
      </div>
    </section>
  );
}
