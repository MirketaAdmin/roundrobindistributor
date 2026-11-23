import { useId, useState } from 'react';
import { SUPPORT_CATEGORIES } from '../../../../data/support.js';
import { HEADING_ICONS } from '../../supportIcons.js';
import chevronUp from '../../../../assets/support/chevron-up.png';
import chevronDown from '../../../../assets/support/chevron-down.png';
import './SupportTopics.css';

function SupportQuestion({ item, id }) {
  const hasAnswer = Boolean(item.answer);
  const [open, setOpen] = useState(Boolean(item.open && hasAnswer));
  const panelId = `${id}-panel`;

  return (
    <li className={`support-q${open ? ' is-open' : ''}`}>
      <h3 className="support-q__heading">
        <button
          type="button"
          className="support-q__trigger"
          aria-expanded={open}
          aria-controls={hasAnswer ? panelId : undefined}
          aria-disabled={hasAnswer ? undefined : 'true'}
          title={hasAnswer ? undefined : 'Answer not supplied yet'}
          onClick={() => hasAnswer && setOpen((value) => !value)}
        >
          <span>{item.question}</span>
          <img src={open ? chevronUp : chevronDown} alt="" width="20" height="20" className="support-q__chevron" />
        </button>
      </h3>
      {hasAnswer && (
        <div id={panelId} className="support-q__answer" hidden={!open}>
          <p>{item.answer}</p>
        </div>
      )}
    </li>
  );
}

export default function SupportTopics() {
  const uid = useId();

  return (
    <section className="support-topics" data-qa="support-topics" aria-label="Support topics">
      <div className="container">
        {SUPPORT_CATEGORIES.map((category, c) => (
          <section
            key={category.id}
            id={category.id}
            className={`support-topic support-topic--${category.icon}`}
            aria-labelledby={`${category.id}-title`}
          >
            <header className="support-topic__head">
              <img src={HEADING_ICONS[category.icon]} alt="" className="support-topic__icon" />
              <div>
                <h2 id={`${category.id}-title`} className="support-topic__title">
                  {category.title}
                </h2>
                <p className="support-topic__subtitle">{category.subtitle}</p>
              </div>
            </header>
            <ul className="support-topic__list">
              {category.questions.map((item, i) => (
                <SupportQuestion key={item.question} item={item} id={`${uid}-${c}-${i}`} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
