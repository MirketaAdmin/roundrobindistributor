import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb.jsx';
import Icon from '../../../../components/Icon/Icon.jsx';
import { SUPPORT_CATEGORIES, SUPPORT_HERO } from '../../../../data/support.js';
import { scrollToId } from '../../../../utils/scroll.js';
import { TILE_ICONS } from '../../supportIcons.js';
import './SupportHero.css';

/* Card links jump to their category further down this page. */
function jump(event, id) {
  event.preventDefault();
  scrollToId(id);
  window.history.replaceState(null, '', `#${id}`);
}

export default function SupportHero() {
  return (
    <section className="support-hero" data-qa="support-hero" aria-labelledby="support-title">
      <div className="container">
        <Breadcrumb current={SUPPORT_HERO.breadcrumb} />
        <h1 id="support-title" className="support-hero__title">
          {SUPPORT_HERO.title}
        </h1>
        <p className="support-hero__subtitle">{SUPPORT_HERO.subtitle}</p>

        <ul className="support-cards">
          {SUPPORT_CATEGORIES.map((item) => (
            <li key={item.id} className="support-card">
              <div className="support-card__top">
                <span className="support-card__tile">
                  <img src={TILE_ICONS[item.icon]} alt="" className="support-card__glyph" />
                </span>
                <span className={`support-card__tag support-card__tag--${item.tag.tone}`}>{item.tag.label}</span>
              </div>
              <h2 className="support-card__title">{item.cardTitle}</h2>
              <p className="support-card__body">{item.cardBody}</p>
              <a href={`#${item.id}`} className="support-card__link" onClick={(event) => jump(event, item.id)}>
                {item.cta}
                <Icon name="ArrowRight" className="support-card__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
