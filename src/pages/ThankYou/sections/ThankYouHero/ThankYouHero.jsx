import Button from '../../../../components/Button/Button.jsx';
import { THANK_YOU } from '../../../../data/thankYou.js';
import badgeCheck from '../../../../assets/thank-you/badge-check.webp';
import badgeVerified from '../../../../assets/thank-you/badge-verified.webp';
import homeIcon from '../../../../assets/thank-you/icon-home.png';
import bookIcon from '../../../../assets/thank-you/icon-book.png';
import './ThankYouHero.css';

const ICONS = { home: [homeIcon, 16, 17], book: [bookIcon, 21, 16] };

export default function ThankYouHero() {
  return (
    <section className="thanks-hero" data-qa="thanks-hero" aria-labelledby="thanks-title">
      <div className="container thanks-hero__inner">
        <div className="thanks-badge" aria-hidden="true">
          <img src={badgeCheck} alt="" width="56" height="56" className="thanks-badge__check" />
          <img src={badgeVerified} alt="" width="28" height="28" className="thanks-badge__verified" />
        </div>

        <p className="thanks-hero__eyebrow">{THANK_YOU.eyebrow}</p>
        <h1 id="thanks-title" className="thanks-hero__title">
          {THANK_YOU.title}
        </h1>
        <p className="thanks-hero__body">{THANK_YOU.body}</p>

        <div className="thanks-hero__actions">
          {THANK_YOU.actions.map((action) => {
            const [src, w, h] = ICONS[action.icon];
            return (
              <Button
                key={action.label}
                to={action.to}
                size="lg"
                variant={action.variant}
                className={`thanks-hero__btn thanks-hero__btn--${action.icon}`}
                iconStart={<img src={src} alt="" width={w} height={h} />}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
