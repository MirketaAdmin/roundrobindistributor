import { useId, useRef, useState } from 'react';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import { CONTACT } from '../../data/home.js';
import { submitInquiry } from '../../services/inquiryService.js';
import { validateFields } from '../../utils/validation.js';
import './InquiryForm.css';

const emptyValues = (fields) => Object.fromEntries([...fields, CONTACT.message].map((f) => [f.name, '']));

/** Inquiry form UI (Home, Contact Us, article sidebar). `fields` overrides the six drawn input fields. */
export default function InquiryForm({ fields = CONTACT.fields, className = '' }) {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState(() => emptyValues(fields));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateFields(fields, values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus('');
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }
    const result = await submitInquiry(values);
    if (result.status === 'not-configured') {
      setStatus('Your details are valid. Online submission is not connected yet.');
    }
  };

  return (
    <form ref={formRef} className={`inquiry ${className}`.trim()} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-notice`}>
      <div className="inquiry__notice" id={`${uid}-notice`}>
        <span className="inquiry__notice-icon">
          <Icon name="Zap" className="inquiry__notice-glyph" />
        </span>
        <span>
          <span className="inquiry__notice-title">{CONTACT.notice.title}</span>
          <span className="inquiry__notice-body">{CONTACT.notice.body}</span>
        </span>
      </div>

      <div className="inquiry__grid">
        {fields.map((field) => {
          const id = `${uid}-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name} className={`inquiry__field${error ? ' has-error' : ''}`}>
              <label htmlFor={id} className="inquiry__label">
                {field.label}
                {field.required && <span aria-hidden="true">*</span>}
              </label>
              <input
                id={id}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                value={values[field.name]}
                onChange={onChange}
                className="inquiry__input"
              />
              {error && (
                <p id={`${id}-error`} className="inquiry__error">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <div className="inquiry__field inquiry__field--full">
          <label htmlFor={`${uid}-${CONTACT.message.name}`} className="inquiry__label">
            {CONTACT.message.label}
          </label>
          <textarea
            id={`${uid}-${CONTACT.message.name}`}
            name={CONTACT.message.name}
            placeholder={CONTACT.message.placeholder}
            value={values[CONTACT.message.name]}
            onChange={onChange}
            className="inquiry__input inquiry__textarea"
          />
        </div>
      </div>

      <div className="inquiry__footer">
        <p className="inquiry__privacy">
          <Icon name="LockKeyhole" className="inquiry__privacy-icon" />
          {CONTACT.privacy}
        </p>
        <Button
          type="submit"
          size="lg"
          className="inquiry__submit"
          iconEnd={<Icon name="SendHorizontal" className="inquiry__submit-icon" />}
        >
          {CONTACT.submit}
        </Button>
      </div>

      <p className="inquiry__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
