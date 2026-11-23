/* About Us page copy, transcribed verbatim from the About Figma frame (1280px). */

export const ABOUT_HERO = {
  breadcrumb: 'About Us',
  titleLead: 'Assignment Should Be Fair.',
  titleAccent: 'Workloads Should Be Balanced.',
  body: 'Round Robin Distributor helps Salesforce teams distribute leads, cases, opportunities, and other records to the right people using clear, configurable assignment rules. We help businesses create more balanced workloads, improve accountability, and keep work moving.',
  primaryCta: 'Explore Our Solution',
  secondaryCta: 'Contact Our Team',
  note: 'Rules-driven execution. AI where it pays.',
};

export const WHO_WE_ARE = {
  eyebrow: 'Who We Are',
  title: 'Built Around a Simple Idea: The Right Work, to the Right Person.',
  paragraphs: [
    'Round Robin Distributor was built to solve a practical challenge inside Salesforce: ensuring that work reaches the right person without relying on manual assignment or inconsistent processes.',
    'Over the years, RRD has evolved beyond simple lead distribution to support assignment across cases, opportunities, accounts, and custom Salesforce objects. Its configurable routing capabilities help organizations adapt assignment processes to their teams, business rules, and operational needs.',
  ],
};

export const ECOSYSTEM = {
  eyebrow: 'Deep Ecosystem Heritage',
  title: 'Experience That Understands How Salesforce Teams Work.',
  subtitle:
    'With approximately 14–15 years of product experience, Round Robin Distributor has evolved alongside the needs of Salesforce teams, from straightforward lead assignment to more sophisticated distribution and workload management scenarios.',
  cards: [
    {
      icon: 'cloud',
      title: 'Built for Salesforce',
      body: 'Designed around Salesforce assignment workflows and business processes with 100% native on-core architecture. Your data never leaves your private cloud instance.',
    },
    {
      icon: 'hub',
      title: 'Evolved With Our Customers',
      body: 'Expanded to support diverse objects, global teams, and strict operational requirements across 13+ global industries from healthcare to financial technology.',
    },
    {
      icon: 'tune',
      title: 'Flexible by Design',
      body: 'Configurable rules, allocation logic, and workload-based approaches built for different organizations from fast-growing startups to enterprise multi-org architectures.',
    },
  ],
  stats: [
    { value: '14+', label: 'Years on AppExchange' },
    { value: '22,000+', label: 'Records Routed Daily' },
    { value: '5.0', star: true, label: 'AppExchange Rating' },
    { value: '100%', label: 'Native Zero Data Egress' },
  ],
};

export const SOLUTIONS = {
  eyebrow: 'Tailored Solutions',
  title: 'From Growing Teams to Enterprise Operations.',
  body: 'Different organizations have different assignment challenges. RRD supports teams that need reliable Salesforce distribution as their operations grow and become more complex.',
  cards: [
    {
      image: 'startups',
      title: 'Startups & Growing Teams',
      body: 'Simplify lead distribution and reduce manual assignment as teams grow.',
    },
    {
      image: 'nonprofit',
      title: 'Nonprofit Organizations',
      body: 'Support mission-driven Salesforce teams with practical assignment workflows.',
    },
    {
      image: 'enterprise',
      title: 'Enterprise Organizations',
      body: 'Manage complex routing requirements, multiple teams, and high-volume assignment.',
    },
  ],
};

export const TEAM = {
  eyebrow: 'Our Team',
  title: 'The People Behind the Product.',
  body: 'Behind Round Robin Distributor is a team focused on building practical Salesforce solutions and helping organizations make their workflows work better.',
  // The role pills ("CEO & Founder", "Finance & Scale") are part of the portrait images in the design.
  people: [
    { photo: 'rajeev', name: 'Rajeev Kumar', role: 'Chief Executive Officer', badge: 'CEO & Founder' },
    { photo: 'maureen', name: 'Maureen Kumar', role: 'Chief Financial Officer', badge: 'Finance & Scale' },
  ],
  connection: {
    eyebrow: 'Our Connection with Mirketa',
    title: 'Part of the Mirketa Salesforce Ecosystem.',
    body: 'Round Robin Distributor is part of the broader Mirketa ecosystem, bringing together Salesforce expertise, technology experience, and a commitment to solving practical business challenges.',
    mirketa: { name: 'Mirketa Inc.', description: 'Global Delivery & Salesforce Cloud Advisory' },
    rrd: { name: 'Round Robin Distributor', description: '100% Native Salesforce Routing Innovation' },
    points: ['Dedicated Enterprise SLAs', 'Direct Architecture Support'],
    link: 'Explore Mirketa',
  },
};
