import ArticleCard from '../../../../components/ArticleCard/ArticleCard.jsx';
import { EMPTY_RESULTS } from '../../../../data/insights.js';
import prevIcon from '../../../../assets/insights/icon-pager-prev.png';
import nextIcon from '../../../../assets/insights/icon-pager-next.png';
import './InsightsList.css';

/* Page numbers as drawn: 1 2 3 … last. Pages other than the current one are disabled
   until the real article list exists (client decision). */
function pageItems(totalPages) {
  if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
  return [1, 2, 3, 'gap', totalPages];
}

export default function InsightsList({ cards, showPagination, totalPages }) {
  return (
    <section className="insights-list" data-qa="insights-list" aria-label="Insight articles">
      <div className="container">
        {cards.length > 0 ? (
          <ul className="article-grid insights-list__grid">
            {cards.map((article, index) => (
              <ArticleCard key={`${article.id}-${index}`} article={article} />
            ))}
          </ul>
        ) : (
          <p className="insights-list__empty" role="status">
            {EMPTY_RESULTS}
          </p>
        )}

        {showPagination && (
          <nav className="pager" aria-label="Insights pages">
            <span className="pager__step" aria-disabled="true" title="Previous page">
              <img src={prevIcon} alt="Previous page" width="18" height="18" />
            </span>
            {pageItems(totalPages).map((item) =>
              item === 'gap' ? (
                <span key="gap" className="pager__gap" aria-hidden="true">
                  …
                </span>
              ) : item === 1 ? (
                <span key={item} className="pager__page is-current" aria-current="page">
                  {item}
                </span>
              ) : (
                <span key={item} className="pager__page" aria-disabled="true" title="More articles coming soon">
                  {item}
                </span>
              ),
            )}
            <span className="pager__step" aria-disabled="true" title="Next page">
              <img src={nextIcon} alt="Next page" width="18" height="18" />
            </span>
          </nav>
        )}
      </div>
    </section>
  );
}
