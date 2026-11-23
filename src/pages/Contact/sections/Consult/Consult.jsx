import Button from '../../../../components/Button/Button.jsx';
import InquiryForm from '../../../../components/ContactSection/InquiryForm.jsx';
import { EXTERNAL_LINKS } from '../../../../config/links.js';
import { CONSULT } from '../../../../data/contact.js';
import shield from '../../../../assets/contact/icon-shield.png';
import externalLink from '../../../../assets/contact/icon-external-link.png';
import './Consult.css';

export default function Consult() {
  const { enterprise, sandbox } = CONSULT;

  return (
    <section className="consult" data-qa="consult" aria-labelledby="consult-title">
      <div className="container consult__inner">
        <div className="consult__copy">
          <h2 id="consult-title" className="consult__title">
            {CONSULT.title}
          </h2>
          <p className="consult__body">{CONSULT.body}</p>

          <div className="consult__enterprise">
            <div className="consult__enterprise-head">
              <span className="consult__shield">
                <img src={shield} alt="" width="36" height="36" />
              </span>
              <span>
                <span className="consult__enterprise-title">{enterprise.title}</span>
                <span className="consult__enterprise-subtitle">{enterprise.subtitle}</span>
              </span>
            </div>
            <dl className="consult__stats">
              {enterprise.stats.map((stat) => (
                <div key={stat.label} className="consult__stat">
                  <dt className="consult__stat-label">{stat.label}</dt>
                  <dd className={`consult__stat-value consult__stat-value--${stat.tone}`}>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <p className="consult__note">{enterprise.note}</p>
          </div>

          <div className="consult__sandbox">
            <h3 className="consult__sandbox-title">{sandbox.title}</h3>
            <p className="consult__sandbox-body">{sandbox.body}</p>
            {/* AppExchange URL pending from client — renders disabled until supplied */}
            <Button
              href={EXTERNAL_LINKS.appExchange}
              variant="white"
              className="consult__sandbox-cta"
              iconEnd={<img src={externalLink} alt="" width="20" height="20" />}
            >
              {sandbox.cta}
            </Button>
          </div>
        </div>

        <div id="contact" className="consult__form-card">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
