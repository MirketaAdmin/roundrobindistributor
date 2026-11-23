import { INQUIRY_ENDPOINT } from '../config/links.js';

/**
 * Single seam for submitting the homepage inquiry form.
 *
 * The destination (Mirketa Azure Function, Salesforce Web-to-Lead, HubSpot, …) is pending
 * client confirmation, so no transport is implemented yet. When it is chosen, implement it
 * here; the form component does not need to change.
 *
 * @returns {Promise<{ status: 'sent' | 'not-configured' }>}
 */
export async function submitInquiry(/* values */) {
  if (!INQUIRY_ENDPOINT) return { status: 'not-configured' };
  throw new Error('Inquiry transport not implemented — integration pending client confirmation.');
}
