import { useState } from 'react';
import { ARTICLE } from '../../../../data/article.js';
import heroImage from '../../../../assets/article/article-hero.webp';
import figureImage from '../../../../assets/article/figure-availability.webp';
import authorImage from '../../../../assets/article/author-anchal-gupta.webp';
import clockIcon from '../../../../assets/article/icon-clock.png';
import bookmarkIcon from '../../../../assets/article/icon-bookmark.png';
import shareIcon from '../../../../assets/article/icon-share.png';
import './ArticleContent.css';

/** Paragraph built from inline runs: string | { bold } | { italic }. */
function Rich({ runs }) {
  return runs.map((run, i) => {
    if (typeof run === 'string') return run;
    if (run.bold) return <strong key={i}>{run.bold}</strong>;
    return <em key={i}>{run.italic}</em>;
  });
}

async function shareArticle(setNote) {
  const data = { title: document.title, url: window.location.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(data.url);
    setNote('Link copied to clipboard.');
  } catch (error) {
    if (error?.name !== 'AbortError') setNote('Copy this page’s address to share it.');
  }
}

export default function ArticleContent() {
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState('');
  const { title, author } = ARTICLE;

  return (
    <article className="article-card-main" data-qa="article-content" aria-labelledby="article-title">
      <header className="article-head">
        <div className="article-head__meta">
          <ul className="article-head__tags" aria-label="Topics">
            {ARTICLE.tags.map((tag) => (
              <li key={tag.label} className={`article-tag article-tag--${tag.tone}`}>
                {tag.label}
              </li>
            ))}
          </ul>
          <span className="article-head__time">
            <img src={clockIcon} alt="" width="16" height="16" />
            {ARTICLE.readTime}
          </span>
        </div>

        <h1 id="article-title" className="article-head__title">
          {title.lead}
          <span className="article-head__accent">{title.accent}</span>
          {title.tail}
        </h1>

        <img
          src={heroImage}
          alt={ARTICLE.heroAlt}
          width="695"
          height="449"
          fetchPriority="high"
          className="article-head__image"
        />

        <div className="article-author">
          <img src={authorImage} alt="" width="52" height="52" className="article-author__avatar" />
          <p className="article-author__text">
            <span className="article-author__name">{author.name}</span>
            <span className="article-author__role">
              {author.role} • {author.updated}
            </span>
          </p>
          <div className="article-author__actions">
            <button
              type="button"
              className="article-action article-action--save"
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
            >
              <img src={bookmarkIcon} alt="" width="16" height="16" />
              Save
            </button>
            <button
              type="button"
              className="article-action article-action--share"
              aria-label="Share this article"
              onClick={() => shareArticle(setNote)}
            >
              <img src={shareIcon} alt="" width="16" height="17" />
            </button>
          </div>
          <p className="article-author__note" role="status" aria-live="polite">
            {note}
          </p>
        </div>
      </header>

      <div className="article-body">
        <p className="article-body__intro">{ARTICLE.intro}</p>

        <h2 className="article-body__h2">{ARTICLE.sectionTitle}</h2>
        {ARTICLE.sectionBody.map((runs, i) => (
          <p key={i} className="article-body__p">
            <Rich runs={runs} />
          </p>
        ))}

        <ol className="article-gaps">
          {ARTICLE.gaps.map((gap, n) => (
            <li key={gap.title} className={`article-gap${gap.dividerAfter ? ' article-gap--divided' : ''}`}>
              <h3 className="article-gap__title">
                <span className="article-gap__badge" aria-hidden="true">
                  {n + 1}
                </span>
                <span className="article-gap__text">{gap.title}</span>
              </h3>
              {gap.body.map((runs, i) => (
                <p key={i} className="article-body__p">
                  <Rich runs={runs} />
                </p>
              ))}
              {gap.figure && (
                <figure className="article-figure">
                  <img src={figureImage} alt={gap.figure.alt} width="693" height="293" loading="lazy" />
                  <figcaption className="article-figure__caption">
                    <span>{gap.figure.caption}</span>
                    <span className="article-figure__label">{gap.figure.label}</span>
                  </figcaption>
                </figure>
              )}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
