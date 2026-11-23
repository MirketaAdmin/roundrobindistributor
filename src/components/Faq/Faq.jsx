import { useId, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import { FAQ } from '../../data/contact.js';
import chevronUp from '../../assets/contact/icon-chevron-up.png';
import chevronDown from '../../assets/contact/icon-chevron-down.png';
import './Faq.css';

function FaqItem({ item, id }) {
  const [open, setOpen] = useState(Boolean(item.open && item.answer));
  const hasAnswer = Boolean(item.answer);
  const panelId = `${id}-panel`;

  return (
    <li className={`faq__item${open ? ' is-open' : ''}`}>
      <h3 className="faq__question">
        <button
          type="button"
          className="faq__trigger"
          aria-expanded={open}
          aria-controls={hasAnswer ? panelId : undefined}
          aria-disabled={hasAnswer ? undefined : 'true'}
          title={hasAnswer ? undefined : 'Answer not supplied yet'}
          onClick={() => hasAnswer && setOpen((value) => !value)}
        >
          <span className="faq__question-text">{item.question}</span>
          <span className="faq__chevron" aria-hidden="true">
            <img src={open ? chevronUp : chevronDown} alt="" width="32" height="32" />
          </span>
        </button>
      </h3>
      {hasAnswer && (
        <div id={panelId} className="faq__answer" hidden={!open}>
          <p>{item.answer}</p>
        </div>
      )}
    </li>
  );
}

/** FAQ accordion (Contact Us page, article pages). Copy lives in data/contact.js. */
export default function Faq({ className = '' }) {
  const uid = useId();

  return (
    <section className={`faq ${className}`.trim()} data-qa="faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHeading
          id="faq-title"
          eyebrow={FAQ.eyebrow}
          title={FAQ.title}
          subtitle={FAQ.subtitle}
          align="center"
          className="faq__heading"
        />
        <div className="faq__columns">
          {FAQ.columns.map((column, c) => (
            <ul key={column[0].question} className="faq__list">
              {column.map((item, i) => (
                <FaqItem key={item.question} item={item} id={`${uid}-${c}-${i}`} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
