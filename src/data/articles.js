/* Insight articles — copy transcribed from the Figma frames (Home Insights, Insights page).
   Article URLs live in config/links.js (ARTICLE_LINKS) and stay null until supplied. */

export const ARTICLES = [
  {
    id: 'omni-channel-alternative',
    readTime: '7 min read',
    category: 'RevOps Architecture',
    title: 'Round Robin Distribution: Better Alternative to Omni-Channel',
    excerpt:
      'Round Robin Distributor (RRD) overcomes the limitations of Salesforce Omni-Channel and optimizes and simplifies complex routing',
    author: { name: 'Rahul Pasricha', role: 'Lead Technologist', initials: 'RP', tone: 'primary' },
  },
  {
    id: 'lead-distribution',
    readTime: '5 min read',
    category: 'Workload Balance',
    title: 'Salesforce Lead Distribution – Efficient Assignment Through Round Robin Distributor',
    excerpt:
      'Lead distribution is the process of assigning incoming leads to skilled and qualified sales representatives. Businesses use this process',
    author: { name: 'Anchal Gupta', role: 'Product Owner', initials: 'AG', tone: 'slate' },
  },
  {
    id: 'round-robin-best-practices',
    readTime: '6 min read',
    category: 'Best Practice Guide',
    title: 'Salesforce Round Robin Lead Assignment: Best Practices with RRD',
    excerpt:
      'If you are a Salesforce Admin or Sales Manager, you need a way to route inbound leads to the most suitable sales...',
    author: { name: 'Rajeev Kumar', role: 'CEO & Strategist', initials: 'RK', tone: 'navy' },
  },
];
