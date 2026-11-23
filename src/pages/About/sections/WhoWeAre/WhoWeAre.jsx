import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { WHO_WE_ARE } from '../../../../data/about.js';
import mockup from '../../../../assets/about/who-we-are-mockup.webp';
import './WhoWeAre.css';

export default function WhoWeAre() {
  return (
    <section className="who" data-qa="who" aria-labelledby="who-title">
      <div className="container who__inner">
        <img
          src={mockup}
          alt="Round Robin Distributor assignment rules: lead, case, opportunity and custom object distribution, all active"
          width="570"
          height="412"
          loading="lazy"
          className="who__image"
        />
        <div className="who__copy">
          <SectionHeading id="who-title" eyebrow={WHO_WE_ARE.eyebrow} title={WHO_WE_ARE.title} className="who__heading" />
          {WHO_WE_ARE.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="who__text">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
