/* Article detail page copy, transcribed verbatim from the article Figma frame (1280px).
   "\n" marks every line break as drawn (including the frame's orphaned words), so the desktop layout
   breaks exactly like the design with Manrope; below 1200px the text reflows normally.
   Inline runs: a plain string, { bold } or { italic }. */
import { ROUTES } from '../config/links.js';

export const ARTICLE = {
  // Route slug derived from the drawn title (no URL was supplied) — awaiting client confirmation.
  slug: 'lead-assignment-rules-vs-round-robin-distributor',
  seoDescription:
    'Why native Salesforce Lead Assignment Rules stall growing teams — workload blindness, out-of-office gaps, custom object limits and missing SLA rerouting — and how Round Robin Distributor closes them.',
  tags: [
    { label: 'Comparative Architecture', tone: 'blue' },
    { label: 'Salesforce Native Evaluation', tone: 'green' },
  ],
  readTime: '7 min read',
  title: { lead: 'Lead Assignment Rules vs. Round Robin Distributor: ', accent: '7 Critical Gaps', tail: ' in Native Salesforce Setup' },
  heroAlt: 'Salesforce operations team monitoring live lead routing dashboards in an operations centre',
  author: {
    name: 'Anchal Gupta',
    role: 'Product Owner & Salesforce Solutions Architect',
    updated: 'Updated Nov 2024',
  },
  intro:
    "Standard Lead Assignment Rules (LAR) were architected when sales teams handled\nbatch forms over 24-hour cycles. In today's high-velocity RevOps landscape, static\ncriteria trigger rep burnout, out-of-office black holes, and lost pipeline. Here is how\nmodern intelligent routing closes the architectural gap.",
  sectionTitle: 'The 2004 Routing Trap: Why Native Salesforce Assignment\nStalls\nGrowing Teams',
  sectionBody: [
    [
      'If your Salesforce org relies strictly on out-of-the-box Lead Assignment Rules (LAR), you\nare\nusing architecture originally built over 18 years ago. At that time, inbound leads were simple\nweb\nforms triaged manually in daily batches. Modern enterprise RevOps demands sub-5-minute\nSLAs, enrichment signals from ZoomInfo/Clearbit, product-led qualification, and shift-aware\nassignment across global hubs.',
    ],
  ],
  gaps: [
    {
      title: 'Workload Blindness: Starving Rookies While Overwhelming Top\nClosers',
      body: [
        [
          'Standard Salesforce Assignment Rules operate on strict ',
          { bold: 'FIFO or alphabetical user queues' },
          '.\nNative LAR cannot assess how many open, uncontacted records a rep currently owns.\nWhen\nSarah has 42 hot demo leads requiring immediate follow-up, native Salesforce will happily\nassign her the next five enterprise inbound submissions anyway.',
        ],
        [
          'Meanwhile, David—a freshly ramped rep with only 2 active accounts—sits waiting idly for\nhis\nturn in the queue. Without dynamic capacity balancing, response times stretch from\nminutes to\ndays.',
        ],
      ],
    },
    {
      title: 'The "Hawaii Trap": Zero Real-Time Out-of-Office Detection',
      body: [
        [
          'Native Salesforce queues have no active synchronization with Outlook, Google Calendar, or\nPTO\nmanagement tools. When rep Marcus logs off on Friday for a 10-day trip to Maui, standard\nLAR\ncontinues systematically piling inbound leads into his queue.',
        ],
        [
          'By the time Marcus returns, those prospects have signed with a competitor. RRD eliminates\nthis\nthrough automated calendar syncing, shift scheduling, and real-time out-of-office toggles\nthat\ninstantly reroute inbounds to active teammates.',
        ],
      ],
      figure: {
        alt: 'Round Robin Lead Assignment & Workload Overview dashboard open on a laptop',
        caption: 'Figure 1: RRD Automated Calendar & Active Rep Availability Matrix',
        label: 'Live Salesforce Component',
      },
    },
    {
      title: 'Custom Object Inability: Native LAR Only Routes Leads & Cases',
      body: [
        [
          'Modern high-growth operations route far more than initial Leads. Opportunities must\ntransition\ncleanly from SDRs to Account Executives; custom Partner Application objects require\nbalanced\ndistribution; CS handoffs require automated project assignment. Native LAR cannot touch\ncustom objects without brittle Apex triggers.',
        ],
      ],
      dividerAfter: true,
    },
    {
      title: 'Zero SLA Heartbeats: No Automated Rerouting When Records Stall',
      body: [
        [
          'What happens when a high-priority enterprise lead is routed to an SDR who does not open\nor\naction it within 10 minutes? Under native Salesforce: ',
          { italic: 'nothing happens' },
          '. RRD introduces\nconfigurable SLA heartbeats—if contact is not initiated within a designated threshold, the\nrecord\nis immediately unassigned and pushed to the next available rep.',
        ],
      ],
    },
  ],
  feedback: {
    question: 'Was this architecture guide helpful?',
    yes: 'Yes',
    no: 'No',
  },
  hashtags: ['#SalesforceArchitecture', '#LeadRouting', '#RevOps'],
};

export const LATEST_BLOGS = {
  title: 'Latest Blogs',
  viewAll: { label: 'View all', to: ROUTES.insights },
  // The featured card is the "Round Robin Distribution: Better Alternative to Omni-Channel" article.
  featuredId: 'omni-channel-alternative',
  // Titles are clipped in the design; only the visible words are reproduced (full titles pending).
  // Items 4–5 have empty thumbnails in the design (images pending).
  items: [
    { id: 'weighted-vs-skill-based', title: 'Weighted vs Skill-Based\nFinding Balance', readTime: '4 min read', date: 'Nov 18, 2024', thumb: 1 },
    { id: 'eliminate-sla-breaches', title: 'How to Eliminate SLA Bre\nCloud', readTime: '5 min read', date: 'Nov 12, 2024', thumb: 2 },
    { id: 'multi-timezone', title: 'Managing Multi-Timezon\nof-Office Logic', readTime: '6 min read', date: 'Nov 05, 2024', thumb: 3 },
    { id: 'custom-object-automation', title: 'Automating Custom Obje\nSalesforce', readTime: '4 min read', date: 'Oct 29, 2024', thumb: null },
    { id: 'zero-egress-security', title: 'Zero-Egress Security & I\nCompliance for RevOps', readTime: '3 min read', date: 'Oct 21, 2024', thumb: null },
  ],
};

export const SIDEBAR_INQUIRY = {
  title: 'Have Questions About Salesforce Lead Distribution?',
  subtitle: 'Speak directly with a certified Salesforce Solutions Architect.',
  // Same form as Contact, but the sixth field is drawn as "Salesforce Edition" (optional).
  editionField: {
    // No Web-to-Lead field exists for this yet, so it is not submitted.
    name: 'salesforce_edition',
    submit: false,
    label: 'Salesforce Edition',
    placeholder: 'Enterprise / Unlimited',
    type: 'text',
    autoComplete: 'off',
    required: false,
  },
};
