import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import { EXTERNAL_LINKS, SECTION_IDS } from '../../config/links.js';
import { CONTACT } from '../../data/home.js';
import InquiryForm from './InquiryForm.jsx';
import './ContactSection.css';

export default function ContactSection() {
  // "Book a Demo" sits beside the form it would scroll to; it uses the scheduling URL once supplied.
  const demoProps = EXTERNAL_LINKS.bookDemo ? { href: EXTERNAL_LINKS.bookDemo } : { to: `#${SECTION_IDS.contact}-form` };

  return (
    <section id={SECTION_IDS.contact} className="contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div className="contact__copy">
          <SectionHeading
            id="contact-title"
            eyebrow={CONTACT.eyebrow}
            eyebrowStyle="pill-glass"
            eyebrowIcon={<Icon name="Rocket" className="contact__eyebrow-icon" />}
            title={CONTACT.title}
            subtitle={CONTACT.body}
            theme="dark"
            className="contact__heading"
          />
          <div className="contact__actions">
            <Button
              {...demoProps}
              size="lg"
              variant="white"
              className="contact__demo"
              iconEnd={<Icon name="ArrowRight" className="contact__btn-icon" />}
            >
              Book a Demo
            </Button>
            <Button
              href={EXTERNAL_LINKS.appExchange}
              size="lg"
              variant="outline-light"
              className="contact__appexchange"
              iconStart={<Icon name="Cloud" className="contact__btn-icon contact__btn-icon--cloud" />}
            >
              View on AppExchange
            </Button>
          </div>
          <ul className="contact__points">
            {CONTACT.points.map((point) => (
              <li key={point} className="contact__point">
                <Icon name="Check" className="contact__point-icon" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div id={`${SECTION_IDS.contact}-form`} className="contact__card">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
