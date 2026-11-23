import Icon from '../../../../components/Icon/Icon.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import SmartLink from '../../../../components/SmartLink/SmartLink.jsx';
import { EXTERNAL_LINKS } from '../../../../config/links.js';
import { TEAM } from '../../../../data/about.js';
import rajeev from '../../../../assets/about/team-rajeev-kumar.webp';
import maureen from '../../../../assets/about/team-maureen-kumar.webp';
import mirketaLogo from '../../../../assets/about/logo-mirketa-tile.png';
import rrdLogo from '../../../../assets/about/logo-rrd-tile.png';
import buildingIcon from '../../../../assets/about/icon-building.png';
import verifiedIcon from '../../../../assets/about/icon-verified.png';
import swapIcon from '../../../../assets/about/icon-swap.png';
import checkIcon from '../../../../assets/about/icon-check-circle.png';
import './Team.css';

const PHOTOS = { rajeev, maureen };

export default function Team() {
  const { connection } = TEAM;

  return (
    <section className="team" data-qa="team" aria-labelledby="team-title">
      <div className="container team__inner">
        <div className="team__people">
          <SectionHeading id="team-title" eyebrow={TEAM.eyebrow} title={TEAM.title} className="team__heading" />
          <p className="team__body">{TEAM.body}</p>
          <ul className="team__cards">
            {TEAM.people.map((person) => (
              <li key={person.name} className="team__card">
                {/* The role pill is part of the portrait in the design */}
                <img
                  src={PHOTOS[person.photo]}
                  alt={`${person.name}, ${person.badge}`}
                  width="258"
                  height="260"
                  loading="lazy"
                  className="team__photo"
                />
                <h3 className="team__name">{person.name}</h3>
                <p className="team__role">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="team__connection">
          <SectionHeading eyebrow={connection.eyebrow} title={connection.title} className="team__connection-heading" />
          <p className="team__connection-body">{connection.body}</p>

          <div className="team__entity team__entity--mirketa">
            <img src={mirketaLogo} alt="Mirketa logo" width="49" height="50" className="team__entity-logo" />
            <span className="team__entity-text">
              <span className="team__entity-name">{connection.mirketa.name}</span>
              <span className="team__entity-desc">{connection.mirketa.description}</span>
            </span>
            <img src={buildingIcon} alt="" width="24" height="24" className="team__entity-icon" />
          </div>

          <div className="team__link-row" aria-hidden="true">
            <span className="team__dash" />
            <img src={swapIcon} alt="" width="24" height="24" />
            <span className="team__dash" />
          </div>

          <div className="team__entity team__entity--rrd">
            <img src={rrdLogo} alt="Round Robin Distributor logo" width="51" height="51" className="team__entity-logo" />
            <span className="team__entity-text">
              <span className="team__entity-name">{connection.rrd.name}</span>
              <span className="team__entity-desc">{connection.rrd.description}</span>
            </span>
            <img src={verifiedIcon} alt="" width="24" height="24" className="team__entity-icon" />
          </div>

          <ul className="team__points">
            {connection.points.map((point) => (
              <li key={point} className="team__point">
                <img src={checkIcon} alt="" width="18" height="18" />
                {point}
              </li>
            ))}
          </ul>

          {/* Mirketa URL pending from client — see EXTERNAL_LINKS.mirketa */}
          <SmartLink href={EXTERNAL_LINKS.mirketa} className="team__explore">
            {connection.link}
            <Icon name="ArrowRight" className="team__explore-icon" />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
