import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb.jsx';
import { CONTACT_HERO } from '../../../../data/contact.js';
import trendingUp from '../../../../assets/contact/icon-trending-up.png';
import terminal from '../../../../assets/contact/icon-terminal.png';
import hub from '../../../../assets/contact/icon-hub.png';
import arrow from '../../../../assets/contact/icon-card-arrow.png';
import './ContactHero.css';

const ICONS = { 'trending-up': trendingUp, terminal, hub };

export default function ContactHero() {
  return (
    <section className="contact-hero" data-qa="contact-hero" aria-labelledby="contact-hero-title">
      <div className="container">
        <Breadcrumb current={CONTACT_HERO.breadcrumb} />
        <h1 id="contact-hero-title" className="contact-hero__title">
          {CONTACT_HERO.titleLead} <span className="contact-hero__accent">{CONTACT_HERO.titleAccent}</span>{' '}
          {CONTACT_HERO.titleTail}
        </h1>
        <p className="contact-hero__body">{CONTACT_HERO.body}</p>

        <ul className="contact-hero__channels">
          {CONTACT_HERO.channels.map((channel) => (
            <li key={channel.email} className="contact-hero__channel">
              <span className="contact-hero__tile">
                <img src={ICONS[channel.icon]} alt="" width="44" height="44" />
              </span>
              <h2 className="contact-hero__channel-title">{channel.title}</h2>
              <p className="contact-hero__channel-body">{channel.body}</p>
              <a href={`mailto:${channel.email}`} className="contact-hero__email">
                {channel.email}
                <img src={arrow} alt="" width="16" height="16" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
