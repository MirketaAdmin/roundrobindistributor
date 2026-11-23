/* Contact Us page copy, transcribed verbatim from the Contact Figma frame (1280px). */

export const CONTACT_HERO = {
  breadcrumb: 'Contact Us',
  titleLead: 'Get in Touch with the',
  titleAccent: 'Round Robin',
  titleTail: 'Team',
  body: 'Whether you are exploring intelligent Salesforce routing for the first time, need custom enterprise architecture consultation, or require dedicated partner support, our team is here to assist.',
  channels: [
    {
      icon: 'trending-up',
      title: 'Sales & Custom Quotes',
      body: 'Org-level tiering, volume custom quotes, and feature matrix briefings.',
      email: 'sales@roundrobindistributor.com',
    },
    {
      icon: 'terminal',
      title: 'Technical & Architecture Desk',
      body: 'Certified Salesforce Engineers specializing in high-volume queues & custom objects.',
      email: 'support@mirketa.com',
    },
    {
      icon: 'hub',
      title: 'Partner & AppExchange Inquiries',
      body: 'Implementation SI alliances, reseller margins, and AppExchange co-marketing.',
      email: 'partners@roundrobindistributor.com',
    },
  ],
};

export const CONSULT = {
  title: 'See Round Robin Distributor in Action',
  body: 'See how RRD would route your leads and cases, using your rules, your teams, and your schedules.',
  enterprise: {
    title: 'Enterprise Native Architecture',
    subtitle: 'Zero Egress • 100% Salesforce Cloud',
    stats: [
      { value: '0', label: 'External API calls required', tone: 'blue' },
      { value: '5.0 / 5.0', label: 'AppExchange Rating', tone: 'green' },
    ],
    note: 'Customer data never leaves your Salesforce tenant. Fully compliant with SOC 2 Type II, GDPR, and HIPAA governance guidelines.',
  },
  sandbox: {
    title: 'Prefer to test in your own Sandbox?',
    // Figma text has a hard line break before "access."
    body: 'Install RRD in under 5 minutes directly from Salesforce AppExchange. No credit card required, instant trial sandbox\naccess.',
    cta: 'Explore AppExchange Listing',
  },
};

export const FAQ = {
  eyebrow: 'Direct Answers',
  title: 'Frequently Asked Consultation Questions',
  subtitle: 'Everything you need to know before initiating a proof-of-concept or architectural consultation.',
  // Two independent columns, as in the design. Answers are only shown in the design for the two
  // expanded items; the others are `null` until the client supplies them.
  columns: [
    [
      {
        // Figma text has a hard line break after "Lightning"
        question: 'Activate/ Deactivate Component on Lightning\nHome Page?',
        answer:
          'The Activate/Deactivate button toggles the availability of a user for assignment of records. Admin can’t toggle that for other users as users will have to do for themselves. It is designed to give users control on their availability when they are taking a break or a PTO etc.',
        open: true,
      },
      { question: 'How to disable Round Robin Distribution Engine from the Configurations?', answer: null },
      { question: 'What does ‘Assigned records in a current cycle’ field do?', answer: null },
    ],
    [
      {
        question: 'How multi-select pick list work with OR and AND operator in Assignment Groups’ criteria?',
        answer:
          'In the Criteria Logic field below the Criteria Fields Section, the ‘Add Criteria Logic’ field can be used to define the logic between different criteria numbers.',
        open: true,
      },
      { question: 'How to add and remove User Activation Component in Salesforce Lightning?', answer: null },
      { question: 'What is the best practice to identify each mail from Email-to-Case?', answer: null },
    ],
  ],
};
