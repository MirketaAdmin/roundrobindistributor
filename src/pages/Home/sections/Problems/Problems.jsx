import IconTile from '../../../../components/IconTile/IconTile.jsx';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading.jsx';
import { PROBLEMS } from '../../../../data/home.js';
import './Problems.css';

export default function Problems() {
  return (
    <section className="problems" aria-labelledby="problems-title">
      <div className="container">
        <SectionHeading
          id="problems-title"
          eyebrow={PROBLEMS.eyebrow}
          title={PROBLEMS.title}
          subtitle={PROBLEMS.subtitle}
        />
        <ul className="problems__grid">
          {PROBLEMS.items.map((item) => (
            <li key={item.title} className="problems__card">
              <IconTile icon={item.icon} size={44} tone={item.tone} />
              <h3 className="problems__title">{item.title}</h3>
              <p className="problems__body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
