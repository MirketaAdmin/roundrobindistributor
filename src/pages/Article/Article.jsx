import { useParams } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import { ROUTES, articlePath } from '../../config/links.js';
import { ARTICLE } from '../../data/article.js';
import NotFound from '../NotFound/NotFound.jsx';
import ArticleContent from './sections/ArticleContent/ArticleContent.jsx';
import ArticleFeedback from './sections/ArticleFeedback/ArticleFeedback.jsx';
import ArticleSidebar from './sections/ArticleSidebar/ArticleSidebar.jsx';
import './Article.css';

const plainTitle = `${ARTICLE.title.lead}${ARTICLE.title.accent}${ARTICLE.title.tail}`;

// Section order follows the article Figma frame. Only the one drawn article exists so far.
export default function Article() {
  const { slug } = useParams();
  if (slug !== ARTICLE.slug) return <NotFound />;

  return (
    <main id="main" className="article-page">
      <SEO title={plainTitle} description={ARTICLE.seoDescription} slug={articlePath(ARTICLE.slug)} />
      <div className="article-page__main" data-qa="article-main">
        <div className="container">
          <Breadcrumb current="Insights" currentTo={ROUTES.insights} className="article-page__breadcrumb" />
          <div className="article-layout">
            <div className="article-layout__primary">
              <ArticleContent />
              <ArticleFeedback />
            </div>
            <ArticleSidebar />
          </div>
        </div>
      </div>
      <Faq className="faq--article" />
    </main>
  );
}
