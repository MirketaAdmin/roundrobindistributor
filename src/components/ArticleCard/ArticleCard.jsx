import Icon from '../Icon/Icon.jsx';
import SmartLink from '../SmartLink/SmartLink.jsx';
import { ARTICLE_LINKS } from '../../config/links.js';
import imgOmni from '../../assets/images/article-omni-channel-alternative.webp';
import imgLead from '../../assets/images/article-lead-distribution.webp';
import imgPractices from '../../assets/images/article-round-robin-best-practices.webp';
import './ArticleCard.css';

const ARTICLE_IMAGES = {
  'omni-channel-alternative': imgOmni,
  'lead-distribution': imgLead,
  'round-robin-best-practices': imgPractices,
};

/** Insight article card (Home Insights section and the Insights page). Rendered inside an `.article-grid` list. */
export default function ArticleCard({ article }) {
  return (
    <li className="article-card">
      <article className="article-card__inner">
        <img
          src={ARTICLE_IMAGES[article.id]}
          alt=""
          width="340"
          height="214"
          loading="lazy"
          className="article-card__image"
        />
        <div className="article-card__meta">
          <span className="article-card__time">
            <Icon name="Clock" className="article-card__time-icon" />
            {article.readTime}
          </span>
          <span className="article-card__category">{article.category}</span>
        </div>
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__excerpt">{article.excerpt}</p>
        <footer className="article-card__footer">
          <span className="article-card__author">
            <span className={`article-card__avatar article-card__avatar--${article.author.tone}`} aria-hidden="true">
              {article.author.initials}
            </span>
            <span>
              <span className="article-card__name">{article.author.name}</span>
              <span className="article-card__role">{article.author.role}</span>
            </span>
          </span>
          <SmartLink
            href={ARTICLE_LINKS[article.id]}
            className="article-card__read"
            aria-label={`Read more: ${article.title}`}
          >
            Read more
            <Icon name="ArrowRight" className="article-card__read-icon" />
          </SmartLink>
        </footer>
      </article>
    </li>
  );
}
