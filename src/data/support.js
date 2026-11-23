/* Support page copy, transcribed verbatim from the Support Figma frame (1280px). "\n" marks a drawn line break.
   Only one answer is shown in the design; the other questions have `answer: null` and render
   disabled until the client supplies their text (same pattern as the Contact FAQ). */

export const SUPPORT_HERO = {
  breadcrumb: 'Support',
  // Figma text has a hard line break after "You"
  title: 'We’re Here to Help You\nGet More from RRD.',
  // Figma text has a hard line break after "your"
  subtitle: 'Find answers, troubleshoot assignment issues, and learn how to manage your\nRound Robin Distributor configuration with enterprise precision.',
};

export const SUPPORT_CATEGORIES = [
  {
    id: 'support-managing',
    icon: 'managing',
    tag: { label: 'Guide', tone: 'blue' },
    cardTitle: 'RRD Managing & Monitoring',
    cardBody: 'Learn how to manage assignment criteria, record updates, enrichment, and distribution configurations.',
    cta: 'Browse Configuration Guides',
    title: 'RRD Managing & Monitoring',
    subtitle: 'Core setup, dynamic criteria definitions, and background enrichment queues.',
    questions: [
      {
        question: 'Adding multiple values in a criteria field?',
        answer:
          'Multiple values for a single field can be added by separating each by semicolon (;). Additionally, for team criteria, there is an option to pick multiple\nvalues directly from the configured Salesforce picklist.',
        open: true,
      },
      { question: 'How to manage record update and enrichment with Round Robin Distributor?', answer: null },
    ],
  },
  {
    id: 'support-troubleshooting',
    icon: 'troubleshooting',
    tag: { label: 'Diagnostics', tone: 'red' },
    cardTitle: 'RRD Troubleshooting',
    cardBody: 'Find solutions to common assignment issues, user availability problems, queue behavior, and processing errors.',
    cta: 'Resolve Routing Issues',
    title: 'RRD Troubleshooting',
    subtitle: 'Find solutions to common assignment and configuration issues across your org.',
    questions: [
      { question: 'When does a lead / case / account get assigned to the RRD Queue?', answer: null },
      { question: 'Why are assignments going to the wrong user?', answer: null },
      { question: 'Error message during bulk insert of records which is hitting CPU limit?', answer: null },
      { question: 'How to resolve the issue: A specific user in the team is not getting a case/lead?', answer: null },
      { question: 'Running user error in the org?', answer: null },
    ],
  },
  {
    id: 'support-faqs',
    icon: 'faqs',
    tag: { label: 'Knowledge', tone: 'blue' },
    cardTitle: 'RRD Support FAQs',
    cardBody: 'Get answers to frequently asked questions about assignment priorities, distribution cycles, manual assignments, and caps.',
    cta: 'Read Answers & Recipes',
    title: 'Frequently Asked Questions',
    subtitle: 'Behavioral logic, manual overrides, and multi-tier queue balancing.',
    questions: [
      { question: 'Handle multiple object teams/users’ assignment with same set of criteria?', answer: null },
      { question: 'When does ‘Do Not Apply Round Robin’ Checkbox work?', answer: null },
      { question: 'What is the difference between record distribution and assignment cycle?', answer: null },
      { question: 'Can I exclude certain team members from assignment at a time?', answer: null },
      { question: 'How to enforce cap for manually assigned cases?', answer: null },
    ],
  },
];
