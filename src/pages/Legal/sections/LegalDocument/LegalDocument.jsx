import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DOCUMENT_INDEX, LEGAL_PARTS } from '../../../../data/legal.js';
import { scrollToId } from '../../../../utils/scroll.js';
import searchIcon from '../../../../assets/legal/icon-search.png';
import shieldIcon from '../../../../assets/legal/icon-shield.png';
import './LegalDocument.css';

const ARTICLE_COUNT = LEGAL_PARTS.reduce((n, part) => n + part.sections.length, 0);

/** Paragraph built from inline runs: string | { bold } | { link, to } (internal route). */
function Rich({ runs }) {
  return runs.map((run, i) => {
    if (typeof run === 'string') return run;
    if (run.link) {
      return (
        <Link key={i} to={run.to} className="legal-section__link">
          {run.link}
        </Link>
      );
    }
    return <strong key={i}>{run.bold}</strong>;
  });
}

function DocumentIndex() {
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return DOCUMENT_INDEX.items.filter((item) => terms.every((t) => item.label.toLowerCase().includes(t)));
  }, [query]);

  const jump = (event, target) => {
    event.preventDefault();
    scrollToId(target);
    window.history.replaceState(null, '', `#${target}`);
  };

  return (
    <nav className="legal-index" aria-labelledby="legal-index-title">
      <div className="legal-index__head">
        <h2 id="legal-index-title" className="legal-index__title">
          {DOCUMENT_INDEX.title}
        </h2>
        {/* Figma shows "24 Articles"; the badge counts the sections actually on the page */}
        <span className="legal-index__count">{ARTICLE_COUNT} Articles</span>
      </div>
      <label className="legal-index__search">
        <img src={searchIcon} alt="" width="17" height="17" />
        <span className="visually-hidden">Search the document index</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={DOCUMENT_INDEX.searchPlaceholder}
          className="legal-index__input"
        />
      </label>
      <p className="legal-index__group">
        <img src={shieldIcon} alt="" width="14" height="17" />
        {DOCUMENT_INDEX.group}
      </p>
      {items.length > 0 ? (
        <ul className="legal-index__list">
          {items.map((item) => (
            <li key={item.label}>
              {item.target ? (
                <a href={`#${item.target}`} className="legal-index__link" onClick={(event) => jump(event, item.target)}>
                  {item.label}
                </a>
              ) : (
                <span className="legal-index__link" aria-disabled="true" title="Section text not supplied yet">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="legal-index__empty" role="status">
          {DOCUMENT_INDEX.emptyText}
        </p>
      )}
    </nav>
  );
}

function LegalSection({ section }) {
  return (
    <article id={section.id} className="legal-card legal-section" aria-labelledby={`${section.id}-title`}>
      <header className="legal-section__head">
        <h3 id={`${section.id}-title`} className="legal-section__title">
          {section.title}
        </h3>
        <span className="legal-section__code">{section.code}</span>
      </header>
      {section.paragraphs.map((runs, i) => (
        <p key={i} className="legal-section__body">
          <Rich runs={runs} />
        </p>
      ))}




      {section.licenses && (
        <ul className="legal-licenses">
          {section.licenses.map((item) => (
            <li key={item.title} className="legal-tile legal-license">
              <h4 className="legal-tile__title">{item.title}</h4>
              <p className="legal-tile__body">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function LegalDocument() {
  return (
    <div className="legal-doc" data-qa="legal-document">
      <div className="container legal-doc__inner">
        <aside className="legal-doc__aside">
          <DocumentIndex />
        </aside>
        <div className="legal-doc__content">
          {LEGAL_PARTS.map((part) => (
            <section key={part.id} id={part.id} className={`legal-part${part.flow ? ' legal-part--flow' : ''}`} aria-labelledby={`${part.id}-title`}>
              <header className="legal-card legal-part__intro">
                <p className="legal-part__eyebrow">
                  <span className={`legal-part__pill legal-part__pill--${part.tone}`}>{part.pill}</span>
                  {part.label}
                </p>
                <h2 id={`${part.id}-title`} className="legal-part__title">
                  {part.title}
                </h2>
                <p className="legal-part__body">{part.body}</p>
              </header>
              {part.sections.map((section) => (
                <LegalSection key={section.id} section={section} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
