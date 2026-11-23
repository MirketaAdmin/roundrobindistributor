import { Link } from 'react-router-dom';
import Button from '../../../../components/Button/Button.jsx';
import SmartLink from '../../../../components/SmartLink/SmartLink.jsx';
import InquiryForm from '../../../../components/ContactSection/InquiryForm.jsx';
import { ARTICLE_LINKS, EXTERNAL_LINKS } from '../../../../config/links.js';
import { ARTICLES } from '../../../../data/articles.js';
import { CONTACT } from '../../../../data/home.js';
import { CONSULT } from '../../../../data/contact.js';
import { LATEST_BLOGS, SIDEBAR_INQUIRY } from '../../../../data/article.js';
import featuredImage from '../../../../assets/article/latest-featured.webp';
import thumb1 from '../../../../assets/article/latest-thumb-1.webp';
import thumb2 from '../../../../assets/article/latest-thumb-2.webp';
import thumb3 from '../../../../assets/article/latest-thumb-3.webp';
import bookIcon from '../../../../assets/article/icon-book.png';
import chevronRight from '../../../../assets/article/icon-chevron-right.png';
import clockFeatured from '../../../../assets/article/icon-clock-featured.png';
import externalLink from '../../../../assets/contact/icon-external-link.png';
import './ArticleSidebar.css';

const THUMBS = { 1: thumb1, 2: thumb2, 3: thumb3 };
const FEATURED = ARTICLES.find((article) => article.id === LATEST_BLOGS.featuredId);
// Contact form fields, with the sixth drawn as "Salesforce Edition" in this sidebar.
const SIDEBAR_FIELDS = [...CONTACT.fields.slice(0, 5), SIDEBAR_INQUIRY.editionField];
// Same copy as the Contact page card; this card wraps the body naturally (no hard break).
const SANDBOX_BODY = CONSULT.sandbox.body.replace('\n', ' ');

export default function ArticleSidebar() {
  return (
    <aside className="article-aside" data-qa="article-sidebar" aria-label="More from Round Robin Distributor">
      <section className="latest" aria-labelledby="latest-title">
        <div className="latest__head">
          <h2 id="latest-title" className="latest__title">
            <img src={bookIcon} alt="" width="20" height="20" />
            {LATEST_BLOGS.title}
          </h2>
          <Link to={LATEST_BLOGS.viewAll.to} className="latest__all">
            {LATEST_BLOGS.viewAll.label}
            <img src={chevronRight} alt="" width="8" height="12" />
          </Link>
        </div>

        <article className="latest-featured">
          <img src={featuredImage} alt="" width="309" height="215" loading="lazy" className="latest-featured__image" />
          <div className="latest-featured__meta">
            <span className="latest-featured__time">
              <img src={clockFeatured} alt="" width="16" height="16" />
              {FEATURED.readTime}
            </span>
            <span className="latest-featured__category">{FEATURED.category}</span>
          </div>
          <h3 className="latest-featured__title">
            <SmartLink href={ARTICLE_LINKS[FEATURED.id]} className="latest-featured__link">
              {FEATURED.title}
            </SmartLink>
          </h3>
        </article>

        <ul className="latest__list">
          {LATEST_BLOGS.items.map((item) => (
            <li key={item.id} className="latest-item">
              <span className="latest-item__thumb">
                {item.thumb && <img src={THUMBS[item.thumb]} alt="" width="48" height="48" loading="lazy" />}
              </span>
              <span className="latest-item__text">
                {/* Blog URLs pending from client */}
                <SmartLink href={null} className="latest-item__title">
                  {item.title}
                </SmartLink>
                <span className="latest-item__meta">
                  {item.readTime}
                  <span aria-hidden="true" className="latest-item__dot">
                    •
                  </span>
                  {item.date}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="aside-inquiry" aria-labelledby="aside-inquiry-title">
        <h2 id="aside-inquiry-title" className="aside-inquiry__title">
          {SIDEBAR_INQUIRY.title}
        </h2>
        <p className="aside-inquiry__subtitle">{SIDEBAR_INQUIRY.subtitle}</p>
        <InquiryForm fields={SIDEBAR_FIELDS} className="inquiry--compact" />
      </section>

      <section className="aside-sandbox" aria-labelledby="aside-sandbox-title">
        <h2 id="aside-sandbox-title" className="aside-sandbox__title">
          {CONSULT.sandbox.title}
        </h2>
        <p className="aside-sandbox__body">{SANDBOX_BODY}</p>
        {/* AppExchange URL pending from client — renders disabled until supplied */}
        <Button
          href={EXTERNAL_LINKS.appExchange}
          variant="white"
          className="aside-sandbox__cta"
          iconEnd={<img src={externalLink} alt="" width="20" height="20" />}
        >
          {CONSULT.sandbox.cta}
        </Button>
      </section>
    </aside>
  );
}
