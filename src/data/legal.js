/* Privacy Policy & Terms and Conditions page copy, transcribed verbatim from the legal Figma frame (1280px).
   "\n" marks every line break as drawn, so the desktop layout breaks exactly like the design with Manrope;
   below 1200px the text reflows normally. Inline runs: a plain string or { bold }. */

export const LEGAL_HERO = {
  breadcrumb: 'Privacy Policy and T&C',
  title: 'Legal Agreements & Compliance Center',
  subtitle:
    'Comprehensive privacy standards, zero-egress architecture guarantees, software licensing rules, and enterprise SLA commitments\ngoverning Round Robin Distributor for Salesforce.',
  meta: [
    { icon: 'calendar', label: 'Effective Date:', value: 'January 1, 2026' },
    { icon: 'verified', label: 'Engine Release:', value: 'v4.1 Production GA' },
    { icon: 'history', label: 'Last Updated:', value: 'March 2026' },
  ],
  trust: [
    { icon: 'native', title: '100% Native', subtitle: 'Zero Egress Guarantee' },
    { icon: 'soc2', title: 'SOC 2 Type II', subtitle: 'Security & Availability' },
    { icon: 'gdpr', title: 'GDPR & CCPA', subtitle: 'Sovereign Data Storage' },
    { icon: 'appexchange', title: 'AppExchange Validated', subtitle: 'Security Review Cleared' },
  ],
};

/* Document index. `target` is the id of a section drawn on the page; entries whose section is not in
   the design yet have no target and render disabled until the client supplies their text. */
export const DOCUMENT_INDEX = {
  title: 'Document Index',
  count: '24 Articles',
  searchPlaceholder: 'Search terms, GDPR, SLA...',
  emptyText: 'No matching articles.',
  group: 'Privacy & Zero-Egress Stance',
  items: [
    { label: '01. Architectural Scope & Native Runtime', target: 'privacy-1' },
    { label: '02. The Absolute Zero-Egress Guarantee', target: 'privacy-2' },
    { label: '03. Data Categorization & Access Matrix', target: null },
    { label: '04. Local Execution of Business Logic', target: 'privacy-4' },
    { label: '05. Salesforce Shield & Cryptography', target: null },
    { label: '06. International Data Transfers (GDPR)', target: null },
    { label: '07. Data Retention, Tenancy & Ownership', target: null },
    { label: '08. Statutory Data Subject Rights\n(CCPA/CPRA)', target: null },
    { label: '09. Subprocessors & Cloud Infrastructure', target: null },
    { label: '10. Auditing, Telemetry & LMA Licensing', target: null },
    { label: '11. Material Revisions to Privacy Policy', target: null },
    { label: '12. Data Protection Officer (DPO) Contact', target: null },
  ],
};

export const LEGAL_PARTS = [
  {
    id: 'privacy-policy',
    pill: 'Part I',
    tone: 'light',
    label: 'Data Protection & Architecture',
    title: 'Round Robin Distributor Privacy\nPolicy',
    body: 'This Privacy Policy details the data protection mechanisms, zero-egress architectural\nprotocols, and privacy guarantees instituted by Mirketa Inc. ("Mirketa", "we", "us", or "our")\nregarding the installation, runtime execution, and utilization of the Round Robin Distributor\n("RRD", "Product", or "Package") on the Salesforce Platform.',
    sections: [
      {
        id: 'privacy-1',
        title: '01. Architectural Scope & Native Runtime',
        code: 'SEC. 1.0',
        body: [
          'Round Robin Distributor is architected exclusively as a ',
          { bold: '100% Salesforce AppExchange\nNative 1-Managed Package' },
          '. The entire logical instruction set—including automated\ndistribution queues, round-robin load distribution algorithms, capability-based scoring\nengines, and relationship-lookup routines—executes in its entirety inside your designated\nSalesforce Tenant Environment (Org).',
        ],
        callout: {
          title: 'Zero External Runtime Dependency:',
          body: 'Unlike hybrid assignment apps or external middleware iPaaS engines, RRD requires zero remote\nruntime servers, zero external proxies, and zero intermediary microservices.',
        },
      },
      {
        id: 'privacy-2',
        title: '02. The Absolute Zero-Egress Guarantee',
        code: 'SEC. 2.0',
        body: ['Mirketa makes an unconditional, immutable engineering and legal guarantee regarding data\ntransmission:'],
        guarantees: [
          {
            icon: 'no-interception',
            title: 'No Interception',
            body: 'Your Salesforce records\n(Leads, Contacts, Accounts,\nCases, Opportunities, or\nCustom Objects) are never\ntransferred, intercepted, or\nreplicated outside your Org.',
          },
          {
            icon: 'zero-webhooks',
            title: 'Zero Webhooks',
            body: 'The package contains no\nremote endpoints, hidden\nwebhooks, or third-party\ntracking scripts that route\nrecord fields to cloud sinks.',
          },
          {
            icon: 'tenant-boundary',
            title: 'Tenant Boundary',
            body: 'All database write events,\nowner assignments, and\naudit log histories stay\nnatively sealed inside your\nSalesforce database\ninstance.',
          },
        ],
        footnote:
          'At no juncture in the operational lifecycle of RRD does Mirketa Inc., its engineers, or any external system\nhold custody, control, or secondary copies of your corporate or customer Personally Identifiable\nInformation (PII).',
      },
      {
        id: 'privacy-4',
        title: '04. Local Execution of Business Logic',
        code: 'SEC. 4.0',
        body: [
          'All algorithm computations—including Tier-Based Round Robin, Ratio Distribution, Workload\nCap Balancing, Territory Geofencing, and Skill Matching—execute as native compiled Apex\nclasses, Triggers, and Platform Invocable Actions directly inside the customer’s assigned\nSalesforce worker virtual machine. No telemetry or payload computation is offloaded to\nremote serverless workers or Mirketa hardware.',
        ],
      },
    ],
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
        body: [
          'By clicking "Install", executing an Order Form, deploying the package from the Salesforce\nAppExchange, or initiating production utilization of Round Robin Distributor, Customer\nexpressly agrees to be bound by all stipulations outlined in this Agreement. If accepting on\nbehalf of an enterprise or public entity, the individual warrants full statutory authority to\nobligate said entity.',
        ],
      },
      {
        id: 'terms-2',
        title: '02. Software License Grant & Seat Allocation',
        code: 'SEC. T-2.0',
        body: [
          "Subject to prompt payment of licensing fees, Licensor grants Customer a non-exclusive,\nnon-transferable, revocable right to install and execute RRD within Customer's authorized\nSalesforce production and associated sandbox environments.",
        ],
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
        body: [
          'Customer acknowledges that RRD requires an active, paid Salesforce environment\n(Enterprise, Unlimited, Performance, or Developer Edition). The package is engineered to\noperate strictly within standard Salesforce multi-tenant Governor Limits. Customer remains\nresponsible for overall Org health, ensuring cumulative third-party triggers or SOQL\nconsumption do not prevent RRD completion.',
        ],
      },
      {
        id: 'terms-4',
        title: '04. Subscription Editions, Billing & Invoicing',
        code: 'SEC. T-4.0',
        body: [
          'Subscriptions are billed annually in advance, either via Salesforce AppExchange Direct\nCheckout or Mirketa Corporate Net-30 Invoicing. Unless otherwise noted in an executed\nOrder Form, subscriptions automatically renew for successive twelve (12) month terms\nunless written notice of non-renewal is provided at least thirty (30) days prior to the\nexpiration of the active term.',
        ],
      },
    ],
  },
];
