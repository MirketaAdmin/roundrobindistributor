/*
  Homepage copy, transcribed verbatim from the 1280px homepage Figma frame.
  Icon fields name a lucide-react export, or `img:<name>` for Figma icons with no approved
  Lucide equivalent — those are raster icons recovered from the PNG reference (src/assets/icons).
*/
import { ROUTES, sectionHref } from '../config/links.js';
import { ARTICLES } from './articles.js';

export const TRUST_STATS = [
  { text: '14+ Years on Salesforce AppExchange', icon: 'History' },
  { text: 'One of the First Assignment Apps on AppExchange', icon: 'img:icon-military-tech' },
  { text: '5★ AppExchange Rating', icon: 'Star', stars: true },
  { text: '22,000+ Records Routed Every Day', icon: 'img:icon-stacked-windows' },
  { text: '100% Native. Your Data Never Leaves Salesforce', icon: 'LockKeyhole' },
];

export const INDUSTRIES = [
  'Healthcare',
  'Financial Services',
  'Higher Education',
  'Software',
  'Manufacturing',
  'Real Estate',
  'Retail',
  'Logistics',
];

export const PROBLEMS = {
  eyebrow: 'Revenue & SLA Risk',
  title: 'Assignment Problems Cost You Revenue, Reps, and SLAs',
  subtitle:
    'When records aren’t assigned fairly and fast, the cost shows up everywhere: leads go cold, your best people burn out, and reps start asking whether the system is fair to their paycheck.',
  items: [
    {
      title: 'Your Top Rep Gets Most of the Leads',
      body: 'When reps cherry-pick or managers assign by gut feel, distribution drifts. Reps paid on conversions notice, and lead share becomes a comp dispute and an attrition risk.',
      icon: 'img:icon-person-off',
      tone: 'blue',
    },
    {
      title: 'Leads Go Cold in the Queue',
      body: 'Buyer interest peaks in the first few minutes. A lead waiting on an unresponsive rep is pipeline you’ve already paid to generate.',
      icon: 'TimerOff',
      tone: 'red',
    },
    {
      title: 'Reps on PTO Fall Behind',
      body: 'Plain round robin assumes a fixed team. When someone takes a day off, they lose their share and come back to a thinner pipeline.',
      icon: 'CalendarX',
      tone: 'amber',
    },
    {
      title: 'Agents Get Cases After Their Shift Ends',
      body: 'Cases assigned to people who are offline sit untouched while the SLA clock keeps running.',
      icon: 'Moon',
      tone: 'purple',
    },
    {
      title: 'Every Morning Starts with a Backlog',
      body: 'Overnight cases pile up unassigned, and someone spends the first hours of the day routing them by hand.',
      icon: 'img:icon-screen-settings',
      tone: 'indigo',
    },
    {
      title: 'Overloaded Case Queues',
      body: 'Assigning new cases to agents already carrying heavy open workloads slows resolution and burns out your strongest people.',
      icon: 'ShoppingBag',
      tone: 'orange',
    },
  ],
};

export const PILLARS = {
  title: 'Fairness, Speed, and Control, Built Into Every Assignment',
  subtitle: 'Configure distribution around your business rules, team capacity, and comp plans.',
  columns: [
    {
      label: 'Pillar A',
      title: 'Fairness: Every Rep Gets a Fair Shot',
      tone: 'blue',
      items: [
        { title: 'Round Robin Without Cherry-Picking', body: 'Distribute records evenly across active team members.' },
        { title: 'Weighted Allocation', body: 'Give senior reps or top closers a larger share, on purpose, and on record.' },
        { title: 'Caps by Hour, Day, or 30 Days', body: 'Prevent overload and spread opportunity so more reps can hit quota.' },
        { title: 'PTO Catch-Up', body: 'Compensate reps for days off so they don’t lose their share of the pipeline.' },
        { title: 'Open-Record Limits', body: 'Pause new assignments when a rep already has too many open leads or cases.' },
      ],
    },
    {
      label: 'Pillar B',
      title: 'Speed: Nothing Sits Waiting',
      tone: 'green',
      items: [
        {
          title: 'Speed-to-Lead Reassignment',
          body: 'If a rep doesn’t respond within your window, five minutes, for example, the record moves to the next rep in line, and the non-responder is skipped.',
        },
        {
          title: 'Automated Distribution from Queues',
          body: 'Clear overnight backlogs and unassigned records automatically, without manual routing.',
        },
        { title: 'Priority Case Routing', body: 'Send urgent cases to the best-suited available agents first.' },
        { title: 'Every Inbound Channel', body: 'Distribute leads and cases arriving from chat, web, and phone.' },
      ],
    },
    {
      label: 'Pillar C',
      title: 'Control: Rules You Set, Results You Can Explain',
      tone: 'slate',
      items: [
        {
          title: 'Criteria & Relationship Routing',
          body: 'Route by region, company type, product, past account relationships, or any field.',
        },
        {
          title: 'Schedules, Time Zones & Holidays',
          body: 'Team- and person-level schedules, including part-time and half-day, so records only go to people who are working.',
        },
        { title: 'Full Audit Trail', body: 'When a rep asks, “Why did she get that lead?” you have the answer.' },
        {
          title: 'One-Click Team Management',
          body: 'Activate or deactivate teams, and when a rep leaves, move their entire book to another team in one click.',
        },
        { title: 'Any Salesforce Object', body: 'Leads, cases, opportunities, accounts, and custom objects.' },
        { title: 'Works With What You Have', body: 'Runs alongside your existing Salesforce lead and case assignment rules.' },
      ],
    },
  ],
};

export const COMPARISON = {
  eyebrow: 'Architecture Comparison',
  title: 'Why Not Just Use Salesforce’s Built-In Assignment?',
  subtitle:
    'Native assignment rules and Flow are a fine starting point. Teams outgrow them when assignment has to account for fairness, capacity, and real people’s schedules.',
  headers: ['What you need', 'Native assignment rules / Flow', 'Round Robin Distributor'],
  rows: [
    ['1. True round robin, weighted shares, and caps', 'Custom Flow or Apex to build and maintain', 'Configured in RRD'],
    ['2. PTO catch-up and person-level schedules', 'Custom build', 'Built in'],
    ['3. Reassign if no response within X minutes', 'Custom build', 'Built in'],
    ['4. Distribution on any object', 'Assignment rules cover leads and cases only', 'Any standard or custom object'],
    ['5. Why each record was assigned', 'Limited visibility', 'Full assignment history'],
    ['6. Ongoing admin effort', 'Admins maintain custom logic', 'Point-and-click configuration'],
  ],
  link: 'Read: Round Robin Distributor vs. Omni-Channel',
};

export const GOVERNANCE = {
  eyebrow: 'Governance & Predictability',
  title: 'Assignment is all about rules. We Keep It That Way.',
  body: 'In a world of AI, we still value deterministic rules, unapologetically. AI is probabilistic, which is useful for many things, but not for deciding who gets a lead that affects someone’s commission, or a case that affects your SLA. RRD executes every assignment with deterministic rules, and lets you use AI where it actually pays.',
  cards: [
    { title: 'Deterministic', body: 'Same input, same owner, every time.', icon: 'img:icon-precision-manufacturing' },
    {
      title: 'Explainable',
      body: 'Every assignment traces back to a rule, for comp conversations, audits, and compliance.',
      icon: 'Eye',
    },
    { title: 'Cost-Predictable', body: 'No per-record AI inference or token charges.', icon: 'img:icon-payments' },
    {
      title: 'AI Where It Pays',
      // Figma text has a hard line break after "rules"
      body: 'Connect your AI assistant, Claude, GPT, to configure rules\nand pull distribution reports in plain English.',
      icon: 'img:icon-psychology',
    },
  ],
  band: 'Rules-driven execution. Explainable decisions. AI where it pays.',
  bandCta: 'See How RRD Works',
};

export const HERITAGE = {
  title: '14+ Years of Getting the Right Records to the Right People',
  lead: 'In Salesforce, record ownership drives everything downstream, workflows, views, dashboards, and who gets paid. Round Robin Distributor was built to get that ownership right.',
  body: 'What began with lead and case distribution has expanded to opportunities, accounts, and custom objects, shaped by more than 14 years of use cases from startups, nonprofits, and enterprise teams distributing thousands of leads and cases every day.',
  points: [
    'Backed by Mirketa Inc.',
    'One of the first assignment apps on AppExchange',
    '14+ years of product experience',
    'Standard and custom Salesforce objects',
    'Used by Salesforce consulting partners as an open-platform solution',
  ],
  card: {
    title: 'Salesforce Partner Ecosystem',
    body: 'Deployable directly within Sales Cloud, Service Cloud, Financial Services Cloud, and Health Cloud.',
  },
};

export const STEPS = {
  eyebrow: 'Rapid Time-to-Value',
  title: 'Live in Days, Not Quarters',
  items: [
    {
      title: 'Configure',
      body: 'Define distribution rules, criteria, and assignment preferences, point- and-click, or ask your AI assistant to set them up.',
    },
    { title: 'Route', body: 'Choose records, teams, schedules, and routing conditions.' },
    { title: 'Balance', body: 'Apply round robin, weighted allocation, caps, and workload limits.' },
    { title: 'Track', body: 'Review every assignment, see why it happened, and refine rules as your team evolves.' },
  ],
};

export const RATINGS = {
  title: 'Rated 5★ on Salesforce AppExchange',
  stats: [
    { stars: true, value: '5★ AppExchange', caption: 'Overall Satisfaction Rating' },
    { value: '22,000+', label: 'Records Routed', caption: 'Every Single Day' },
    { value: '14+ Years', label: 'Continuous Dev', caption: 'Battle-Tested Engine' },
    { value: '13+', label: 'Global Industries', caption: 'From Startups to Org Scale' },
  ],
  testimonial: {
    quote:
      '“This has been a great tool for us to download. The feature to assign all unassigned cases at once has saved our company hours of assigning cases to agents in the morning.”',
    author: 'Trent Linton',
    role: '(Verified AppExchange Reviewer)',
  },
  videosTitle: 'Video Demos & Walkthroughs',
  videos: [
    {
      id: 'customer-testimonial',
      title: 'Customer Testimonial',
      body: 'Watch how top teams resolve morning backlogs with RRD.',
    },
    {
      id: 'product-walkthrough',
      title: 'RRD Product Walkthrough & Setup',
      body: 'Complete interface tour: configuring weighted round robin rules.',
    },
    {
      id: 'queue-routing-demo',
      title: 'Advanced Salesforce Queue & Lead Routing Demo',
      body: 'High-volume distribution, SLA timers, and custom objects.',
    },
  ],
};

export const PRICING = {
  eyebrow: 'Transparent Value',
  title: 'One Flat Price for Your Whole Org. No Per-User Fees.',
  subtitle:
    'Pricing starts at $2,000 per Salesforce org, per year. Add reps, teams, and objects without your bill growing with headcount.',
  plans: [
    {
      eyebrow: 'Early Stage',
      title: 'Startups',
      body: 'Special pricing for companies with fewer than 30 people.',
      footer: 'Custom growth tier',
    },
    {
      eyebrow: 'Standard Org',
      title: 'Flagship Org License',
      price: '$2,000',
      period: '/ org / year',
      highlight: 'Flat rate for entire organization. No per-user penalties.',
      cta: 'Get Started',
      featured: true,
    },
    {
      eyebrow: 'Mission First',
      title: 'Nonprofits',
      body: 'Special pricing for nonprofit organizations.',
      footer: 'Discounted org rates',
    },
    {
      eyebrow: 'High Capacity',
      title: 'Enterprise',
      body: 'Distributing thousands of leads and cases a day? Talk to us about high-volume requirements.',
      footer: 'SLA & Custom architect support',
    },
  ],
  primaryCta: 'See Pricing',
  secondaryCta: 'Talk to Our Team',
};

export const INSIGHTS = {
  eyebrow: 'Insights',
  title: 'Insights for Salesforce Sales and Service Leaders',
  seeAll: 'See all insights',
  articles: ARTICLES,
};

export const CONTACT = {
  eyebrow: 'Get started today',
  title: 'See Round Robin Distributor in Action',
  body: 'See how RRD would route your leads and cases, using your rules, your teams, and your schedules.',
  points: [
    'Live org environment walkthrough',
    'Review custom objects and distribution rules',
    'Verify security and native Salesforce architecture',
  ],
  notice: {
    title: 'We’ll respond within one business day.',
    body: 'Direct technical evaluation with a Salesforce solutions engineer.',
  },
  // `name` is the Salesforce Web-to-Lead field name; `maxLength` comes from the Web-to-Lead form.
  // AWAITING CONFIRMATION: Figma shows "Company*" twice. The second field is rendered as drawn but has no
  // Web-to-Lead field, so it is not submitted (`submit: false`).
  fields: [
    { name: 'first_name', label: 'First Name', placeholder: 'Jane', type: 'text', autoComplete: 'given-name', maxLength: 40, required: true },
    { name: 'last_name', label: 'Last Name', placeholder: 'Doe', type: 'text', autoComplete: 'family-name', maxLength: 80, required: true },
    { name: 'email', label: 'Work Email', placeholder: 'jane.doe@company.com', type: 'email', autoComplete: 'email', maxLength: 80, required: true },
    { name: 'mobile', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel', autoComplete: 'tel', maxLength: 40, required: true },
    { name: 'company', label: 'Company', placeholder: 'Acme Corporation', type: 'text', autoComplete: 'organization', maxLength: 40, required: true },
    { name: 'company_secondary', label: 'Company', placeholder: 'Acme Corporation', type: 'text', autoComplete: 'off', required: true, submit: false },
  ],
  message: {
    name: 'description',
    label: 'Anything that will help us prepare',
    placeholder: 'Tell us about your team size, current assignment rules, or any routing challenges...',
  },
  privacy: '100% Confidential. Zero spam policy.',
  submit: 'Submit Inquiry',
};

export const FOOTER = {
  subtitle: 'A Mirketa Product · Native Salesforce App',
  description:
    'Automate intelligent Salesforce lead, case, and opportunity routing with zero code. Maximize response times and sales velocity with native AppExchange architecture.',
  badges: ['100% Salesforce Native', 'AppExchange Certified'],
  columns: [
    {
      title: 'Product & Architecture',
      links: [
        { label: 'Features', to: sectionHref('features') },
        { label: 'How It Works', to: sectionHref('howItWorks') },
        { label: 'RRD vs. Native Tools', to: sectionHref('comparison') },
        { label: 'Pricing', to: sectionHref('pricing') },
      ],
    },
    {
      title: 'Solutions & Verticals',
      // AWAITING CONFIRMATION: no solution pages exist yet; these point at the closest homepage sections.
      links: [
        { label: 'Lead Distribution', to: sectionHref('features') },
        { label: 'Case Distribution', to: sectionHref('features') },
        { label: 'Opportunity Distribution', to: sectionHref('features') },
        { label: 'Custom Object Distribution', to: sectionHref('features') },
        { label: 'Startup Solutions', to: sectionHref('pricing') },
        { label: 'Nonprofit Solutions', to: sectionHref('pricing') },
        { label: 'Enterprise Solutions', to: sectionHref('pricing') },
      ],
    },
    {
      title: 'Company & Trust',
      links: [
        { label: 'About RRD', to: ROUTES.about },
        { label: 'Insights', to: ROUTES.insights },
        { label: 'Contact', to: ROUTES.contact },
        { label: 'Support', to: sectionHref('contact') },
        { label: 'Privacy Policy and T&C', to: ROUTES.legal },
      ],
    },
  ],
  copyright: '© 2025 Mirketa Inc. Round Robin Distributor is a registered product of Mirketa.',
  tagline: 'Rules-driven Salesforce assignment. Fair, fast, and explainable.',
};
