import { useState } from 'react';
import { ARTICLE } from '../../../../data/article.js';
import thumbUp from '../../../../assets/article/icon-thumb-up.png';
import thumbDown from '../../../../assets/article/icon-thumb-down.png';
import './ArticleFeedback.css';

/* "Was this helpful?" bar. The vote is kept on the page only — no feedback endpoint exists yet. */
export default function ArticleFeedback() {
  const { feedback, hashtags } = ARTICLE;
  const [vote, setVote] = useState(null);
  const toggle = (value) => setVote((current) => (current === value ? null : value));

  return (
    <section className="article-feedback" data-qa="article-feedback" aria-label="Article feedback">
      <div className="article-feedback__vote" role="group" aria-labelledby="article-feedback-q">
        <p id="article-feedback-q" className="article-feedback__question">
          {feedback.question}
        </p>
        <button type="button" className="article-feedback__btn" aria-pressed={vote === 'yes'} onClick={() => toggle('yes')}>
          <img src={thumbUp} alt="" width="16" height="16" />
          {feedback.yes}
        </button>
        <button type="button" className="article-feedback__btn" aria-pressed={vote === 'no'} onClick={() => toggle('no')}>
          <img src={thumbDown} alt="" width="16" height="16" />
          {feedback.no}
        </button>
      </div>
      <ul className="article-feedback__tags" aria-label="Tags">
        {hashtags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </section>
  );
}
