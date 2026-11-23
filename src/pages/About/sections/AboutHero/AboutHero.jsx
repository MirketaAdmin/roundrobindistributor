import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb.jsx';
import Button from '../../../../components/Button/Button.jsx';
import Icon from '../../../../components/Icon/Icon.jsx';
import { HashLink } from '../../../../components/HashLink/HashLink.jsx';
import { SECTION_IDS, sectionHref } from '../../../../config/links.js';
import { ABOUT_HERO } from '../../../../data/about.js';
import './AboutHero.css';

export default function AboutHero() {
  const { pathname } = useLocation();

  return (
    <section className="about-hero" data-qa="about-hero" aria-labelledby="about-hero-title">
      <div className="container">
        <Breadcrumb current={ABOUT_HERO.breadcrumb} />
        <h1 id="about-hero-title" className="about-hero__title">
          {ABOUT_HERO.titleLead} <span className="about-hero__accent">{ABOUT_HERO.titleAccent}</span>
        </h1>
        <p className="about-hero__body">{ABOUT_HERO.body}</p>
        <div className="about-hero__actions">
          <Button
            to={sectionHref('features')}
            size="lg"
            className="about-hero__primary"
            iconEnd={<Icon name="ArrowRight" className="about-hero__btn-icon" />}
          >
            {ABOUT_HERO.primaryCta}
          </Button>
          <Button to={`${pathname}#${SECTION_IDS.contact}`} variant="secondary" size="lg" className="about-hero__secondary">
            {ABOUT_HERO.secondaryCta}
          </Button>
        </div>
        <HashLink to={sectionHref('governance')} className="about-hero__note">
          {ABOUT_HERO.note}
          <Icon name="ArrowRight" className="about-hero__note-icon" />
        </HashLink>
      </div>
      <div
        className="about-hero__media"
        role="img"
        aria-label="Three colleagues reviewing assignment rules on a monitor"
      />
    </section>
  );
}
