import { useEffect, useId, useRef, useState } from 'react';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import { ROUTES, WEB_TO_LEAD } from '../../config/links.js';
import { CONTACT } from '../../data/home.js';
import { loadRecaptcha } from '../../utils/recaptcha.js';
import { validateFields } from '../../utils/validation.js';
import './InquiryForm.css';

const emptyValues = (fields) => Object.fromEntries([...fields, CONTACT.message].map((f) => [f.name, '']));
const CAPTCHA_MESSAGE = 'Please confirm you are not a robot.';
/* Salesforce redirects here after a successful post (trailing slash as in the supplied snippet). */
const returnUrl = () => (typeof window === 'undefined' ? WEB_TO_LEAD.retURL : `${window.location.origin}${ROUTES.thankYou}/`);

/**
 * Inquiry form (Home, About, Contact Us, Legal, Support, article sidebar), styled as in the Figma frames.
 * It is a plain HTML form that POSTs straight to Salesforce Web-to-Lead (WEB_TO_LEAD in config/links.js);
 * script only adds inline validation, the reCAPTCHA widget and the captcha timestamp Salesforce expects.
 * `fields` overrides the six drawn input fields; a field with `submit: false` has no Web-to-Lead mapping.
 */
export default function InquiryForm({ fields = CONTACT.fields, className = '' }) {
  const uid = useId();
  const captchaSettingsRef = useRef(null);
  const captchaRef = useRef(null);
  const widgetRef = useRef(null);
  const [values, setValues] = useState(() => emptyValues(fields));
  const [errors, setErrors] = useState({});
  const [captchaError, setCaptchaError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Back/forward cache: if the user returns from Salesforce, make the form usable again.
  useEffect(() => {
    const onShow = (event) => event.persisted && setSubmitting(false);
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const fieldId = (name) => `${uid}-${name}`;
  const captchaResponse = () =>
    widgetRef.current !== null && window.grecaptcha ? window.grecaptcha.getResponse(widgetRef.current) : null;

  // Render this form's reCAPTCHA widget (explicit mode: forms mount after route changes).
  useEffect(() => {
    let cancelled = false;
    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !captchaRef.current || captchaRef.current.childElementCount) return;
        widgetRef.current = grecaptcha.render(captchaRef.current, {
          sitekey: WEB_TO_LEAD.recaptchaSiteKey,
          callback: () => setCaptchaError(''),
        });
      })
      .catch(() => {
        // Script blocked or offline: the org's captcha_settings use fallback, so the form still posts.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Salesforce's snippet: keep `ts` in captcha_settings fresh until the captcha is answered.
  // The value is written here, not through React props: React re-applies `defaultValue` on every
  // render, which for a hidden input would wipe the timestamp.
  useEffect(() => {
    const stamp = () => {
      const input = captchaSettingsRef.current;
      if (!input || captchaResponse()) return;
      input.value = JSON.stringify({ ...WEB_TO_LEAD.captchaSettings, ts: JSON.stringify(Date.now()) });
    };
    stamp();
    const timer = setInterval(stamp, 500);
    return () => clearInterval(timer);
  }, []);

  const onChange = (event) => {
    const { field } = event.target.dataset;
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Valid → let the browser submit the HTML form to Salesforce; invalid → stay and show errors.
  const onSubmit = (event) => {
    if (submitting) {
      event.preventDefault(); // already posting — avoid a duplicate lead
      return;
    }
    const nextErrors = validateFields(fields, values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    const response = captchaResponse();
    const captchaMissing = response !== null && !response;
    setCaptchaError(captchaMissing ? CAPTCHA_MESSAGE : '');
    if (firstInvalid || captchaMissing) {
      event.preventDefault();
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    setSubmitting(true); // valid: the browser now posts to Salesforce, which redirects to the Thank You page
  };

  return (
    <form
      className={`inquiry ${className}`.trim()}
      action={WEB_TO_LEAD.action}
      method="POST"
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${uid}-notice`}
    >
      <input ref={captchaSettingsRef} type="hidden" name="captcha_settings" />
      <input type="hidden" name="oid" value={WEB_TO_LEAD.oid} />
      <input type="hidden" name="retURL" value={returnUrl()} />
      <input type="hidden" name="lead_source" value={WEB_TO_LEAD.leadSource} />

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
          const id = fieldId(field.name);
          const error = errors[field.name];
          return (
            <div key={field.name} className={`inquiry__field${error ? ' has-error' : ''}`}>
              <label htmlFor={id} className="inquiry__label">
                {field.label}
                {field.required && <span aria-hidden="true">*</span>}
              </label>
              <input
                id={id}
                name={field.submit === false ? undefined : field.name}
                data-field={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
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
          <label htmlFor={fieldId(CONTACT.message.name)} className="inquiry__label">
            {CONTACT.message.label}
          </label>
          <textarea
            id={fieldId(CONTACT.message.name)}
            name={CONTACT.message.name}
            data-field={CONTACT.message.name}
            placeholder={CONTACT.message.placeholder}
            value={values[CONTACT.message.name]}
            onChange={onChange}
            className="inquiry__input inquiry__textarea"
          />
        </div>
      </div>

      <div className="inquiry__captcha">
        <div ref={captchaRef} />
        {captchaError && (
          <p className="inquiry__error" role="alert">
            {captchaError}
          </p>
        )}
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
          aria-disabled={submitting ? 'true' : undefined}
          aria-busy={submitting || undefined}
          iconEnd={<Icon name="SendHorizontal" className="inquiry__submit-icon" />}
        >
          {CONTACT.submit}
        </Button>
      </div>
    </form>
  );
}
