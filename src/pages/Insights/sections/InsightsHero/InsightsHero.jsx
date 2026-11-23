import { useEffect, useRef } from 'react';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb.jsx';
import { CATEGORIES, INSIGHTS_HERO } from '../../../../data/insights.js';
import searchIcon from '../../../../assets/insights/icon-search.png';
import chevron from '../../../../assets/insights/icon-select-chevron.png';
import kbdHint from '../../../../assets/insights/kbd-cmd-k.png';
import './InsightsHero.css';

export default function InsightsHero({ query, onQuery, category, onCategory, sort, onSort, totalCount }) {
  const searchRef = useRef(null);

  // ⌘K / Ctrl+K focuses search, as the hint in the design suggests.
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="insights-hero" data-qa="insights-hero" aria-labelledby="insights-hero-title">
      <div className="container">
        <Breadcrumb current={INSIGHTS_HERO.breadcrumb} />
        <h1 id="insights-hero-title" className="insights-hero__title">
          {INSIGHTS_HERO.titleLead} <span className="insights-hero__accent">{INSIGHTS_HERO.titleAccent}</span>
        </h1>
        <p className="insights-hero__subtitle">{INSIGHTS_HERO.subtitle}</p>

        <div className="insights-filter" role="search">
          <div className="insights-filter__row">
            <label className="insights-filter__search">
              <span className="visually-hidden">Search insights</span>
              <img src={searchIcon} alt="" width="20" height="20" className="insights-filter__search-icon" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder={INSIGHTS_HERO.searchPlaceholder}
                className="insights-filter__input"
              />
              <img src={kbdHint} alt="" width="40" height="28" className="insights-filter__kbd" />
            </label>
            <label className="insights-filter__sort">
              <span className="insights-filter__sort-label">{INSIGHTS_HERO.sortLabel}</span>
              <span className="insights-filter__select-wrap">
                <select value={sort} onChange={(event) => onSort(event.target.value)} className="insights-filter__select">
                  {INSIGHTS_HERO.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <img src={chevron} alt="" width="18" height="16" className="insights-filter__chevron" />
              </span>
            </label>
          </div>

          <div className="insights-filter__chips" role="group" aria-label="Filter by topic">
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`insights-chip${category === item.id ? ' is-active' : ''}`}
                aria-pressed={category === item.id}
                onClick={() => onCategory(item.id)}
              >
                {item.glyph && <img src={item.glyph} alt="" width={item.glyphWidth} height="21" className="insights-chip__glyph" />}
                {item.label}
                {item.id === 'all' && <span className="insights-chip__count">{totalCount}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
