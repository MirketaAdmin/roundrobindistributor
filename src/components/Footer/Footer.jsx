import Brand from '../Brand/Brand.jsx';
import SmartLink from '../SmartLink/SmartLink.jsx';
import { EXTERNAL_LINKS } from '../../config/links.js';
import { FOOTER } from '../../data/home.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__about">
            <Brand subtitle={FOOTER.subtitle} surface="lavender" />
            <p className="site-footer__description">{FOOTER.description}</p>
            <ul className="site-footer__badges">
              {FOOTER.badges.map((badge) => (
                <li key={badge} className="site-footer__badge">
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.title} className="site-footer__column" aria-label={column.title}>
              <h2 className="site-footer__heading">{column.title}</h2>
              <ul className="site-footer__links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      to={link.to}
                      href={link.external ? EXTERNAL_LINKS[link.external] : undefined}
                      className="site-footer__link"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p>{FOOTER.copyright}</p>
          <p className="site-footer__tagline">{FOOTER.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
