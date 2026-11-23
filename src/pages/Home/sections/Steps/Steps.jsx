import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { SECTION_IDS } from '../../../../config/links.js';
import { STEPS } from '../../../../data/home.js';
import './Steps.css';

export default function Steps() {
  return (
    <section id={SECTION_IDS.howItWorks} className="steps" aria-labelledby="steps-title">
      <div className="container">
        <SectionHeading
          id="steps-title"
          eyebrow={STEPS.eyebrow}
          eyebrowStyle="pill"
          title={STEPS.title}
          className="steps__heading"
        />
        <ol className="steps__grid">
          {STEPS.items.map((step, index) => (
            <li key={step.title} className="steps__card">
              <span className="steps__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="steps__title">{step.title}</h3>
              <p className="steps__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
