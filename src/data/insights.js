/* Insights page copy and listing, transcribed from the Insights Figma frame (1280px). */
import speedGlyph from '../assets/insights/chip-speed.png';
import workloadGlyph from '../assets/insights/chip-workload.png';
import securityGlyph from '../assets/insights/chip-security.png';
import implementationGlyph from '../assets/insights/chip-implementation.png';

export const INSIGHTS_HERO = {
  breadcrumb: 'Insights',
  titleLead: 'Insights for Better',
  titleAccent: 'Salesforce Assignment.',
  subtitle:
    'Explore practical insights, expert tips, and proven strategies to simplify Salesforce assignment and balance team workloads.',
  searchPlaceholder: 'Search routing strategies, weighted logic, Apex-free assignment...',
  sortLabel: 'Sort:',
  // Only "Recent" appears in the design.
  sortOptions: [{ value: 'recent', label: 'Recent' }],
};

export const CATEGORIES = [
  { id: 'all', label: 'All Insights' },
  { id: 'speed', label: 'Speed-to-Lead & SLA', glyph: speedGlyph, glyphWidth: 19 },
  { id: 'workload', label: 'Workload & Rep Balancing', glyph: workloadGlyph, glyphWidth: 27 },
  { id: 'security', label: 'Security & Native Architecture', glyph: securityGlyph, glyphWidth: 20 },
  { id: 'implementation', label: 'Implementation Guides', glyph: implementationGlyph, glyphWidth: 20 },
];

/*
  ASSUMPTION (pending client confirmation): which chip each article belongs to.
  The design shows each article's category label but does not link labels to chips.
*/
export const ARTICLE_TOPICS = {
  'omni-channel-alternative': [],
  'lead-distribution': ['workload'],
  'round-robin-best-practices': ['implementation'],
};

/*
  PLACEHOLDER LISTING — exactly as drawn: the three known articles shown twice, an "All Insights 18"
  count and pagination 1 2 3 … 12. Replace with the real article list when supplied; the count and
  page numbers then come from the data (see LISTING.pageSize).
*/
export const LISTING = {
  placeholder: true,
  cards: [
    'omni-channel-alternative',
    'lead-distribution',
    'round-robin-best-practices',
    'omni-channel-alternative',
    'lead-distribution',
    'round-robin-best-practices',
  ],
  designTotalCount: 18,
  designTotalPages: 12,
  pageSize: 6,
};

export const EMPTY_RESULTS = 'No insights match your search.';
