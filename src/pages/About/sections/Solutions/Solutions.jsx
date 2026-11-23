import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { SOLUTIONS } from '../../../../data/about.js';
import startups from '../../../../assets/about/solution-startups.webp';
import nonprofit from '../../../../assets/about/solution-nonprofit.webp';
import enterprise from '../../../../assets/about/solution-enterprise.webp';
import './Solutions.css';

const IMAGES = { startups, nonprofit, enterprise };

export default function Solutions() {
  return (
    <section className="solutions" data-qa="solutions" aria-labelledby="solutions-title">
      <div className="container solutions__inner">
        <div className="solutions__intro">
          <SectionHeading id="solutions-title" eyebrow={SOLUTIONS.eyebrow} title={SOLUTIONS.title} className="solutions__heading" />
          <p className="solutions__body">{SOLUTIONS.body}</p>
        </div>
        <ul className="solutions__cards">
          {SOLUTIONS.cards.map((card) => (
            <li key={card.title} className="solutions__card">
              <img src={IMAGES[card.image]} alt="" width="243" height="177" loading="lazy" className="solutions__image" />
              <div className="solutions__content">
                <h3 className="solutions__title">{card.title}</h3>
                <p className="solutions__text">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
