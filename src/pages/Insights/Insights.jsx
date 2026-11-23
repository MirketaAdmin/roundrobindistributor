import { useMemo, useState } from 'react';
import SEO from '../../components/SEO/SEO.jsx';
import { ROUTES } from '../../config/links.js';
import { ARTICLES } from '../../data/articles.js';
import { ARTICLE_TOPICS, LISTING } from '../../data/insights.js';
import InsightsHero from './sections/InsightsHero/InsightsHero.jsx';
import InsightsList from './sections/InsightsList/InsightsList.jsx';

const BY_ID = Object.fromEntries(ARTICLES.map((article) => [article.id, article]));

function matches(article, query) {
  if (!query) return true;
  const haystack = [article.title, article.excerpt, article.category, article.author.name].join(' ').toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

// Section order follows the Insights Figma frame.
export default function Insights() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('recent');

  const cards = useMemo(
    () =>
      LISTING.cards
        .map((id) => BY_ID[id])
        .filter((article) => category === 'all' || ARTICLE_TOPICS[article.id]?.includes(category))
        .filter((article) => matches(article, query.trim())),
    // "Recent" is the only sort in the design; the placeholder listing is already in that order.
    [query, category],
  );

  const filtered = category !== 'all' || query.trim() !== '';
  const totalCount = LISTING.placeholder ? LISTING.designTotalCount : ARTICLES.length;
  const totalPages = LISTING.placeholder ? LISTING.designTotalPages : Math.ceil(ARTICLES.length / LISTING.pageSize);

  return (
    <main id="main">
      <SEO
        title="Insights"
        description="Explore practical insights, expert tips, and proven strategies to simplify Salesforce assignment and balance team workloads."
        slug={ROUTES.insights}
      />
      <InsightsHero
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
        totalCount={totalCount}
      />
      <InsightsList cards={cards} showPagination={!filtered} totalPages={totalPages} />
    </main>
  );
}
