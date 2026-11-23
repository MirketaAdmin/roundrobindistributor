/*
  Google reCAPTCHA v2 loader for the Salesforce Web-to-Lead form.
  The script is injected once, in explicit-render mode, because forms mount after route changes
  (the snippet's auto-render only finds widgets present at page load).
*/
const SRC = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=__rrdRecaptchaReady';
let loading = null;

export function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      window.__rrdRecaptchaReady = () => resolve(window.grecaptcha);
      const script = document.createElement('script');
      script.src = SRC;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        loading = null;
        reject(new Error('reCAPTCHA failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}
