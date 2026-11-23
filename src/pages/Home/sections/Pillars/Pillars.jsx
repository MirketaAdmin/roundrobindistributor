import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { SECTION_IDS } from '../../../../config/links.js';
import { PILLARS } from '../../../../data/home.js';
import './Pillars.css';

export default function Pillars() {
  return (
    <section id={SECTION_IDS.features} className="pillars" aria-labelledby="pillars-title">
      <div className="container">
        <SectionHeading id="pillars-title" title={PILLARS.title} subtitle={PILLARS.subtitle} />
        <div className="pillars__grid">
          {PILLARS.columns.map((column) => (
            <div key={column.label} className={`pillars__column pillars__column--${column.tone}`}>
              <div className="pillars__head">
                <p className="pillars__label">{column.label}</p>
                <h3 className="pillars__title">{column.title}</h3>
              </div>
              <ul className="pillars__list">
                {column.items.map((item) => (
                  <li key={item.title} className="pillars__card">
                    <h4 className="pillars__card-title">{item.title}</h4>
                    <p className="pillars__card-body">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
