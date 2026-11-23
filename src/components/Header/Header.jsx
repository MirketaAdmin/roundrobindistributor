import { useEffect, useState } from 'react';
import { HashLink } from '../HashLink/HashLink.jsx';
import Button from '../Button/Button.jsx';
import Brand from '../Brand/Brand.jsx';
import { PRIMARY_NAV, HEADER_CTA } from '../../data/navigation.js';
import './Header.css';

const DESKTOP_QUERY = '(min-width: 1024px)';

export default function Header() {
  const [open, setOpen] = useState(false);

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
    <header className={`site-header${open ? ' is-open' : ''}`}>
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
                <HashLink to={item.to} className="site-header__link" onClick={close}>
                  {item.label}
                </HashLink>
              </li>
            ))}
          </ul>
          <Button to={HEADER_CTA.to} size="md" className="site-header__cta" onClick={close}>
            {HEADER_CTA.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
