import ArticleCard from '../../../../components/ArticleCard/ArticleCard.jsx';
import Icon from '../../../../components/Icon/Icon.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import SmartLink from '../../../../components/SmartLink/SmartLink.jsx';
import { ROUTES, SECTION_IDS } from '../../../../config/links.js';
import { INSIGHTS } from '../../../../data/home.js';
import './Insights.css';

export default function Insights() {
  return (
    <section id={SECTION_IDS.insights} className="insights" aria-labelledby="insights-title">
      <div className="container">
        <div className="insights__head">
          <SectionHeading
            id="insights-title"
            eyebrow={INSIGHTS.eyebrow}
            title={INSIGHTS.title}
            className="insights__heading"
          />
          <SmartLink to={ROUTES.insights} className="insights__all">
            {INSIGHTS.seeAll}
            <Icon name="ArrowRight" className="insights__all-icon" />
          </SmartLink>
        </div>

        <ul className="article-grid insights__grid">
          {INSIGHTS.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ul>
      </div>
    </section>
  );
}
