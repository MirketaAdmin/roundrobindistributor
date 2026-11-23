import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink } from '../HashLink/HashLink.jsx';
import Button from '../Button/Button.jsx';
import Brand from '../Brand/Brand.jsx';
import { PRIMARY_NAV, HEADER_CTA } from '../../data/navigation.js';
import './Header.css';

const DESKTOP_QUERY = '(min-width: 1024px)';

/** Sticky site header. A hairline shadow appears once the page scrolls under it. */
export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => e.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${open ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Brand subtitle={['Native Salesforce App', 'A Mirketa Product']} onClick={close} />

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="site-header__toggle-bar" />
          <span className="site-header__toggle-bar" />
          <span className="site-header__toggle-bar" />
        </button>

        <nav id="site-nav" className="site-header__nav" aria-label="Primary">
          <ul className="site-header__links">
            {PRIMARY_NAV.map((item) => (
              <li key={item.label}>
                {/* No active-page styling in any design frame: current page is exposed to assistive tech only */}
                <HashLink
                  to={item.to}
                  className="site-header__link"
                  aria-current={!item.to.includes('#') && item.to === pathname ? 'page' : undefined}
                  onClick={close}
                >
                  {item.label}
                </HashLink>
              </li>
            ))}
          </ul>
          <Button
            to={HEADER_CTA.to}
            size="md"
            className="site-header__cta"
            aria-current={HEADER_CTA.to === pathname ? 'page' : undefined}
            onClick={close}
          >
            {HEADER_CTA.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
