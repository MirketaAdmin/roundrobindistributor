/* Privacy Policy & Terms and Conditions page copy.
   Hero and Terms & Conditions: transcribed verbatim from the legal Figma frame (1280px); "\n" marks every
   line break as drawn, so the desktop layout breaks like the design with Manrope (normal reflow below 1200px).
   Privacy Policy: client-supplied text (see PRIVACY_SECTIONS). */
import { ROUTES } from '../config/links.js';

export const LEGAL_HERO = {
  breadcrumb: 'Privacy Policy and T&C',
  title: 'Legal Agreements & Compliance Center',
  subtitle:
    'Comprehensive privacy standards, zero-egress architecture guarantees, software licensing rules, and enterprise SLA commitments\ngoverning Round Robin Distributor for Salesforce.',
  meta: [
    { icon: 'calendar', label: 'Effective Date:', value: 'January 1, 2026' },
    { icon: 'verified', label: 'Engine Release:', value: 'v4.1 Production GA' },
    // Kept as drawn; the supplied policy says "Last updated: [insert date]" — real date pending from client.
    { icon: 'history', label: 'Last Updated:', value: 'March 2026' },
  ],
  trust: [
    { icon: 'native', title: '100% Native', subtitle: 'Zero Egress Guarantee' },
    { icon: 'soc2', title: 'SOC 2 Type II', subtitle: 'Security & Availability' },
    { icon: 'gdpr', title: 'GDPR & CCPA', subtitle: 'Sovereign Data Storage' },
    { icon: 'appexchange', title: 'AppExchange Validated', subtitle: 'Security Review Cleared' },
  ],
};

/* Privacy Policy text supplied by the client on 2026-11-25 (replaces the privacy copy drawn in the frame;
   client decision). Laid out in the frame's section cards; it wraps naturally (no drawn line breaks).
   Paragraphs: arrays of inline runs (a string, { bold } or { link, to }). */
const PRIVACY_SECTIONS = [
  {
    title: 'Information We Collect',
    paragraphs: [
      [
        'We may collect information you voluntarily provide through forms on this website, such as your name, company, email address, and phone number, when you request a demo or consultation, or contact us. We may also collect standard technical information (such as IP address, browser type, and pages visited) through normal website operation. We do not ask for sensitive information, and this website does not use a live chat.',
      ],
    ],
  },
  {
    title: 'The Site Versus the App',
    paragraphs: [
      [
        'This policy covers this website only — the marketing website where you can learn about RRD, ask for a demo, or contact us.',
      ],
      [
        'The RRD app itself is installed from the Salesforce AppExchange and runs inside your own Salesforce org. Mirketa does not receive or store the Salesforce records the app assigns, such as your leads, cases, and opportunities. Your Salesforce data stays in your org and is governed by your agreements with Salesforce and your own privacy notices. Salesforce’s own privacy statement applies to your use of AppExchange and Salesforce.',
      ],
    ],
  },
  {
    title: 'How We Use Information',
    paragraphs: [
      [
        'Information submitted through this website is used to respond to your inquiry, provide the demos or resources you requested, and improve the content and performance of this website. We do not sell personal information to third parties.',
      ],
    ],
  },
  {
    // AWAITING CLIENT: the cookie banner, consent-gated Google Analytics and the footer "Cookie settings"
    // link described here do not exist on the site yet (client chose: publish the text, flag the gap).
    title: 'Cookies and Similar Technologies',
    paragraphs: [
      [
        'This website uses cookies or similar technologies to support core functionality and, only if you accept them, to understand how visitors use the site (for example, through Google Analytics). When you first visit, a cookie banner lets you accept or deny non-essential cookies, and you can change your choice at any time through the “Cookie settings” link in the footer.',
      ],
    ],
  },
  {
    title: 'Sharing of Information',
    paragraphs: [
      [
        'We do not share personal information with third parties except where necessary to operate this website and deliver requested services (for example, with trusted service providers who help us host the site or process form submissions), or where required by law.',
      ],
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      [
        'We take reasonable measures to protect the information submitted through this website. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    ],
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      [
        'Mirketa may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last updated” date.',
      ],
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: [
      [
        'If you have questions about this Privacy Policy or how your information is handled, please reach out through our ',
        { link: 'Contact page', to: ROUTES.contact },
        '.',
      ],
    ],
  },
].map((section, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { ...section, id: `privacy-${i + 1}`, title: `${n}. ${section.title}`, code: `SEC. ${i + 1}.0` };
});

/* Document index: the Privacy Policy sections, each jumping to its card. */
export const DOCUMENT_INDEX = {
  title: 'Document Index',
  searchPlaceholder: 'Search terms, GDPR, SLA...',
  emptyText: 'No matching articles.',
  // Design label kept as drawn (client decision pending on whether it should change with the new text).
  group: 'Privacy & Zero-Egress Stance',
  items: PRIVACY_SECTIONS.map((section) => ({ label: section.title, target: section.id })),
};

export const LEGAL_PARTS = [
  {
    id: 'privacy-policy',
    pill: 'Part I',
    tone: 'light',
    label: 'Data Protection & Architecture',
    title: 'Round Robin Distributor Privacy\nPolicy',
    // Supplied intro paragraph (heading line: "Round Robin Distributor (a product of Mirketa Inc.) — Privacy Policy").
    body: 'This Privacy Policy explains how Mirketa handles information submitted through this website, the marketing site for Round Robin Distributor (RRD), a Salesforce AppExchange product of Mirketa Inc.',
    flow: true, // supplied text: natural wrapping, no drawn line breaks
    sections: PRIVACY_SECTIONS,
  },
  {
    id: 'terms-and-conditions',
    pill: 'Part II',
    tone: 'strong',
    label: 'Commercial & Master Licensing Terms',
    title: 'Round Robin Distributor Terms &\nConditions',
    body: 'These Terms and Conditions ("Agreement") constitute an enforceable master software\nlicensing agreement between Mirketa Inc. ("Licensor") and the entity or individual\nsubscribing to or installing the software ("Customer", "Licensee", or "You").',
    sections: [
      {
        id: 'terms-1',
        title: '01. Acceptance & Binding Service Agreement',
        code: 'SEC. T-1.0',
        paragraphs: [[
          'By clicking "Install", executing an Order Form, deploying the package from the Salesforce\nAppExchange, or initiating production utilization of Round Robin Distributor, Customer\nexpressly agrees to be bound by all stipulations outlined in this Agreement. If accepting on\nbehalf of an enterprise or public entity, the individual warrants full statutory authority to\nobligate said entity.',
        ]],
      },
      {
        id: 'terms-2',
        title: '02. Software License Grant & Seat Allocation',
        code: 'SEC. T-2.0',
        paragraphs: [[
          "Subject to prompt payment of licensing fees, Licensor grants Customer a non-exclusive,\nnon-transferable, revocable right to install and execute RRD within Customer's authorized\nSalesforce production and associated sandbox environments.",
        ]],
        licenses: [
          {
            title: 'Named User Licenses',
            body: 'Licensing is quantified by active users who are\ndesignated as Assignees, Team Members, or\nManagers within RRD distribution groups.',
          },
          {
            title: 'Sandbox Testing Environments',
            body: 'All standard subscriptions include unlimited\nnon-production sandbox execution (Full,\nPartial, Developer Pro) for regression testing.',
          },
        ],
      },
      {
        id: 'terms-3',
        title: '03. Salesforce Prerequisites & Governor Limits',
        code: 'SEC. T-3.0',
        paragraphs: [[
          'Customer acknowledges that RRD requires an active, paid Salesforce environment\n(Enterprise, Unlimited, Performance, or Developer Edition). The package is engineered to\noperate strictly within standard Salesforce multi-tenant Governor Limits. Customer remains\nresponsible for overall Org health, ensuring cumulative third-party triggers or SOQL\nconsumption do not prevent RRD completion.',
        ]],
      },
      {
        id: 'terms-4',
        title: '04. Subscription Editions, Billing & Invoicing',
        code: 'SEC. T-4.0',
        paragraphs: [[
          'Subscriptions are billed annually in advance, either via Salesforce AppExchange Direct\nCheckout or Mirketa Corporate Net-30 Invoicing. Unless otherwise noted in an executed\nOrder Form, subscriptions automatically renew for successive twelve (12) month terms\nunless written notice of non-renewal is provided at least thirty (30) days prior to the\nexpiration of the active term.',
        ]],
      },
    ],
  },
];
