// Northwest Oregon PAC — single source of truth for brand content.
// Sourced verbatim from the Northwest Oregon PAC messaging document.

export const pac = {
  name: 'Northwest Oregon PAC',
  shortName: 'NW Oregon PAC',
  legalName: 'Northwest Oregon PAC',
  filingNumber: '25045',
  pacId: '25045',
  ein: '42-2643251',
  type: 'State PAC',
  scope: 'Statewide',
  primaryActivity: 'Both (Hybrid)',
  foundedYear: '2026',
  regulator: 'Oregon Secretary of State',
  region: 'Northwest Oregon',
  timeZone: 'Pacific (PT)',
  domain: 'northwestoregon.com',
  tagline: 'Championing prosperity, accountability, and opportunity for Northwest Oregon.',
  values: ['HOPE', 'SUPPORT', 'HEARD'],
  shortPromise: 'We are here to help — and we are not from the government.',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61591821754335',
  },
  contact: {
    // General inquiries — routed to the primary contact.
    generalEmail: 'csawyer007@gmail.com',
    // Program Director / primary contact
    name: 'Cynthia Sawyer',
    role: 'Program Director',
    email: 'csawyer007@gmail.com',
    phone: '1-503-490-4139',
    // After-hours contact
    afterHoursName: 'Christina Buehler',
    afterHoursPhone: '1-503-330-7496',
    mailingAddress: '10700 SW Beaverton-Hillsdale Hwy, Suite 212, Beaverton, OR 97005',
    mailingAddressLines: [
      '10700 SW Beaverton-Hillsdale Hwy',
      'Suite 212',
      'Beaverton, OR 97005',
    ],
    preferredAreaCodes: ['503', '971'],
  },
  disclaimers: {
    paidFor:
      'Paid for by Northwest Oregon PAC #25045. Some images, audio, video, or written content may be created or enhanced using artificial intelligence (AI) tools.',
    notAuthorized: 'Not authorized by any candidate committee.',
    foreignNationals: 'Contributions from foreign nationals are prohibited.',
    donorRequirement:
      'Federal and state law requires us to collect the name, employer, and employer city and state of individual contributors.',
  },
  successMessage: 'Thank you. We will be in contact soon.',
}

// The founding story (long-form, verbatim)
export const foundingStory = {
  short:
    'Northwest Oregon PAC was founded to serve the Republicans, moderates, and common-sense voters of our region who have too often been overlooked — by their own party and by a political establishment that writes off areas with strong Democratic majorities. We pool our resources to give these communities real support, competitive candidates, and a voice that stands up to the vocal minority pushing an increasingly hard-left agenda. We’re here because the people of Northwest Oregon deserve representation, investment, and someone in their corner.',
  long: 'Northwest Oregon PAC exists to support the residents, candidates, and values that have been left behind in a region too easily conceded by both state and national party leadership. Across our Democratic-leaning communities, moderates and Republicans have watched an increasingly socialist, hard-left minority grow louder while their own voices — and their own party’s investment — faded away. We founded this PAC to change that: to pool local resources, build lasting infrastructure, and give center-right voters the organization, candidates, and support they deserve. We believe no community should be written off, and that prosperity, accountability, and common sense still have a home here in Northwest Oregon.',
}

// Mission (verbatim)
export const mission =
  'Northwest Oregon PAC exists to advance policies that grow private-sector prosperity, hold government accountable to taxpayers, keep our communities safe and clean, prepare the next generation for real careers, and deliver affordable, reliable energy — so that families and businesses across Northwest Oregon can thrive.'

// Priority pillars (verbatim from the document, with position and supporting details)
export const priorities = [
  {
    id: '01',
    name: 'Economic Prosperity & Small Business',
    position: 'Prosperity is built by private enterprise, not government programs.',
    supporting: [
      'We believe prosperity is built by private enterprise, not government programs. When small businesses thrive, communities thrive — through jobs, local investment, and opportunity that no bureaucracy can replicate.',
      'Every Oregonian deserves the chance to build something of their own. We support cutting the regulatory and tax barriers that make it harder to start, run, and grow a small business in our state.',
      'Affordability comes from economic expansion, not redistribution. Lower taxes leave more money in the hands of families and entrepreneurs who know best how to spend, save, and invest it.',
      'Private-sector job growth is the most reliable path out of hardship. We prioritize policies that reward hiring, investment, and productivity over those that expand government payrolls.',
      'A growing economy is the best social program ever devised. We measure success not by how many people government supports, but by how many no longer need that support.',
    ],
    rationale:
      'Oregon is losing more businesses than are opening. Our focus encompasses rural and urban businesses alike.',
  },
  {
    id: '02',
    name: 'Government Accountability & Fiscal Responsibility',
    position: 'Taxpayers deserve to know where every dollar goes.',
    supporting: [
      'Taxpayers deserve to know where every dollar goes. We support full transparency and measurable performance standards for community-based organizations and government contractors receiving public funds.',
      'Cost-plus contracts reward overspending and punish efficiency. We support fixed-price, competitively bid contracts for government projects so taxpayers aren’t writing blank checks.',
      'Government should be lean, focused, and effective. We oppose the bureaucratic bloat that drives up costs while delivering less to the people it’s meant to serve.',
      'Accountability means consequences. Organizations and agencies that misuse public money or fail to deliver results should lose that funding — not have it automatically renewed.',
      'Every program should justify its existence. We support regular, independent audits to ensure public dollars produce real outcomes, not just expanding budgets.',
    ],
    rationale:
      'The legislature is trying to sell that we need more taxes. Reality is we need money to be spent more strategically and with more transparency.',
  },
  {
    id: '03',
    name: 'Public Safety & Quality of Life',
    position: 'Safe streets are the foundation of a free and prosperous community.',
    supporting: [
      'Safe streets are the foundation of a free and prosperous community. We support policies and resources that protect citizens, businesses, and neighborhoods from crime and disorder.',
      'Clean, well-maintained public spaces reflect respect for the people who live and work in them. We support practical efforts to restore order and cleanliness to our streets and downtowns.',
      'Law-abiding citizens deserve to feel secure in their homes, businesses, and communities. Public safety is not optional — it is a core duty of government.',
      'Real compassion includes addressing the root causes of street disorder while maintaining standards that keep communities livable for everyone.',
      'We support the men and women who keep our communities safe and believe they deserve the resources, respect, and backing to do their jobs effectively.',
    ],
    rationale:
      'Businesses are leaving because employees feel unsafe and customers are unsafe and will not support them.',
  },
  {
    id: '04',
    name: 'Education & Workforce Development',
    position: 'Schools should prepare students for the real world.',
    supporting: [
      'Schools should prepare students for the real world. We support an education system focused on skills, critical thinking, and readiness for tomorrow’s workforce — not political indoctrination.',
      'Merit should drive advancement. We believe students, workers, and professionals should rise based on ability, effort, and results.',
      'Oregon’s future depends on a skilled workforce. We support vocational training, apprenticeships, and STEM education that connect students directly to good-paying careers.',
      'Parents are partners in education, not bystanders. We support transparency and parental involvement in what and how children are taught.',
      'A strong economy needs a capable workforce. We support aligning education with the actual needs of employers so graduates find opportunity, not debt.',
    ],
    rationale:
      'Elite universities have started requiring more testing to enter — specifically because states like Oregon are allowing students to graduate reading at a third-grade level. We need good employees for businesses to thrive.',
  },
  {
    id: '05',
    name: 'Affordable, Reliable Energy',
    position: 'Oregonians deserve affordable utility bills.',
    supporting: [
      'Oregonians deserve affordable utility bills. We support expanding reliable, clean energy from hydropower and nuclear to keep costs down and the lights on.',
      'Environmental responsibility and economic sense are not opposites. We support clean energy strategies that protect the environment without punishing working families with higher costs.',
      'Hydropower is Oregon’s natural advantage. We support preserving and expanding this clean, reliable, homegrown energy source.',
      'Modern nuclear power is safe, clean, and scalable. We support including it in Oregon’s energy future as a path to lower costs and a stronger grid.',
      'Energy policy should serve people, not ideology. We support an all-of-the-above approach to clean energy that prioritizes reliability and affordability.',
    ],
    rationale:
      'With data centers being the future, we need a realistic plan to move this country forward and continue to compete in the world economy. We are for responsible and reliable use of resources — and taxpayers should not be paying for data-center energy.',
  },
]

// Anti-socialism statement (verbatim)
export const antiSocialismStatement =
  'History offers a clear verdict: every large-scale experiment in socialism — from the Soviet Union to Venezuela — has produced the same results: shortages, stagnation, lost freedom, and broken promises. Socialism fails because it severs the link between effort and reward, removes the price signals that allocate resources efficiently, and concentrates power in the hands of central planners who cannot possibly manage the countless decisions a free market makes every day. It promises equality and delivers shared scarcity; it promises security and delivers dependence. Prosperity has never come from government controlling production — it comes from free people, private enterprise, and the dignity of earning one’s own success. We reject the false promise of socialism and stand for the proven engine of human flourishing: economic freedom.'

// Endorsed / supported candidates for 2026 cycle (verbatim from doc)
export const candidates = [
  {
    slug: 'mark-norman',
    name: 'Mark Norman',
    office: 'House District 27',
    state: 'Oregon',
    year: '2026',
    link: 'https://www.markfororegon.com/',
  },
  {
    slug: 'brian-schimmel',
    name: 'Brian Schimmel',
    office: 'Oregon State Legislature',
    state: 'Oregon',
    year: '2026',
    link: 'https://brianschimmel.org/',
  },
  {
    slug: 'barbara-kahl',
    name: 'Barbara Kahl',
    office: 'Congressional District 1',
    state: 'Oregon',
    year: '2026',
    link: 'https://www.drkahlforcongress.com/',
  },
  {
    slug: 'ciatta-thompson',
    name: 'Ciatta Thompson',
    office: 'House District 33',
    state: 'Oregon',
    year: '2026',
    link: 'https://www.ciattathompson.com/',
  },
  {
    slug: 'randall-fryer',
    name: 'Randall Fryer',
    office: 'House District 28',
    state: 'Oregon',
    year: '2026',
    link: '',
  },
  {
    slug: 'tammy-for-oregon',
    name: 'Tammy',
    office: 'Oregon',
    state: 'Oregon',
    year: '2026',
    link: 'https://tammyfororegon.com/',
  },
]

// Leadership team (verbatim from doc)
export const team = [
  {
    name: 'Cindy Sawyer',
    roles: [
      'Washington County Treasurer',
      'President, Downtown Republican Women',
    ],
  },
  {
    name: 'Christina Buehler',
    roles: [
      'Parliamentarian, Oregon State Republican Party',
      'Parliamentarian, Washington County',
      'Tech Chair, Washington County',
    ],
  },
  {
    name: 'Helen Heller',
    roles: [
      'Vice Chair, Washington County',
      'Vice Chair, Congressional District 6',
      '2nd President, Beaverton–Hillsboro Republican Women',
    ],
  },
]

// Volunteer activities offered (from doc)
export const volunteerActivities = [
  'Run for office',
  'Canvass',
  'Phone banking',
  'Event planning',
]

// Donation ladder (from doc)
export const donationAmounts = [25, 100, 500, 1000]

// Primary CTAs
export const primaryCTAs = ['Donate', 'Volunteer', 'Run for Office']

// Audiences we speak to
export const audiences = ['donors', 'volunteers', 'candidates', 'press']

// Region description (used for hero/meta)
export const regionKeywords = [
  'Northwest Oregon',
  'the Oregon coast',
  'Portland metro',
  'Congressional District 1',
]

// Welcome email — used verbatim in signup confirmation flows
export const welcomeEmail = `Hi [First Name],

Welcome — and thank you for joining us.

By signing up, you’ve become part of a growing community of Northwest Oregon residents who believe our region deserves better than to be written off. For too long, the Republicans, moderates, and common-sense voters in our area have been overlooked — by their own party and by a political establishment that concedes districts like ours without a fight.

We started Northwest Oregon PAC to change that. We’re pooling our resources to give this region something it hasn’t had: real support, competitive candidates, and a voice that stands up for the people who actually live and work here.

Here’s what you can expect from us:
• Updates on the candidates and races we’re working to support
• Ways to get involved, from volunteering to spreading the word
• Straight talk about the issues that affect your community, your safety, and your wallet

This movement works because of people like you. Whether you can give your time, your voice, or your support, there’s a place for you here.

Want to do more right now? Reply to this email or visit our website to learn how you can volunteer or contribute — every bit strengthens the effort.

We’re glad to have you with us.

Onward,
The Northwest Oregon PAC Team`

// Focus areas listed on public materials
export const focusAreas = [
  'Fundraising',
  'Candidate Support',
  'Messaging',
]

// What makes NW Oregon PAC different (verbatim)
export const differentiator =
  'No other PAC represents the Northwest Oregon region or works in a nonpartisan, bridge-building frame of mind. Our focus is where the issues actually are — losing businesses, unsafe streets, and communities written off by both parties.'
