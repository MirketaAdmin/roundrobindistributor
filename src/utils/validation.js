export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

/**
 * Validates form values against field definitions ({ name, label, type, required }).
 * Returns { [name]: message } for every invalid field, in field order.
 */
export function validateFields(fields, values) {
  const errors = {};
  for (const field of fields) {
    const value = (values[field.name] ?? '').trim();
    if (field.required && !value) errors[field.name] = `Enter your ${field.label.toLowerCase()}.`;
    else if (value && field.type === 'email' && !EMAIL_PATTERN.test(value)) errors[field.name] = 'Enter a valid work email.';
    else if (value && field.type === 'tel' && !PHONE_PATTERN.test(value)) errors[field.name] = 'Enter a valid phone number.';
  }
  return errors;
}
