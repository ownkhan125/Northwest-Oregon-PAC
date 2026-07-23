// Northwest Oregon PAC — single source of truth for brand content.
// Sourced verbatim from the Northwest Oregon PAC messaging document.

export const pac = {
  name: 'Northwest Oregon PAC',
  shortName: 'NW Oregon PAC',
  legalName: 'Northwest Oregon PAC',
  filingNumber: '25045',
  pacId: '25045',
  type: 'Oregon State PAC',
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
    generalEmail: 'info@northwestoregon.com',
    // Program Director / primary contact
    name: 'Cynthia Sawyer',
    role: 'Program Director',
    email: 'info@northwestoregon.com',
    phone: '503-490-4139',
    // After-hours contact
    afterHoursName: 'Christina Buehler',
    afterHoursPhone: '1-503-330-7496',
    mailingAddress: '10700 SW Beaverton-Hillsdale Highway, Suite 212, Beaverton, Oregon 97005',
    mailingAddressLines: [
      '10700 SW Beaverton-Hillsdale Highway',
      'Suite 212',
      'Beaverton, Oregon 97005',
    ],
    preferredAreaCodes: ['503', '971'],
  },
  disclaimers: {
    paidFor: 'Paid for by Northwest Oregon PAC #25045.',
    aiNotice:
      'Some images, audio, video, or written content may be created or enhanced using artificial intelligence tools.',
    notAuthorized: 'Not authorized by any candidate committee.',
    foreignNationals: 'Contributions from foreign nationals are prohibited.',
    donorRequirement:
      'Federal and state law requires us to collect the name, employer, and employer city and state of individual contributors.',
  },
  successMessage: 'Thank you. We will be in contact soon.',
}

// Home-page content — sourced verbatim from the Home Page content document.
// Consumed by src/sections/hero, about, priorities, vision, endorsements, news,
// events, donate. Do NOT paraphrase or edit without an updated content doc.
export const home = {
  hero: {
    eyebrow: 'OREGON STATE PAC · COMMITTEE #25045 · 2026',
    heading: 'A stronger voice for Northwest Oregon.',
    paragraphs: [
      'Northwest Oregon PAC brings together neighbors, moderates, independents, and common-sense voters who believe our region deserves serious candidates, practical solutions, and sustained local support.',
      'We invest in the people, organization, and messaging needed to advance prosperity, accountability, public safety, workforce readiness, and reliable energy across Northwest Oregon.',
    ],
    ctas: {
      primary: 'Donate',
      secondary: 'Volunteer',
      textLink: 'Meet the PAC',
    },
    values: [
      { label: 'HOPE', description: 'For communities too often written off.' },
      { label: 'SUPPORT', description: 'For candidates ready to lead.' },
      { label: 'HEARD', description: 'For voters who deserve a voice.' },
    ],
  },
  about: {
    heading: 'Northwest Oregon should never be an afterthought.',
    paragraphs: [
      'Northwest Oregon PAC was created to support the residents, candidates, and values that have too often been overlooked in a region frequently treated as politically uncompetitive.',
      'We are building the local infrastructure our communities need: stronger candidates, dependable fundraising, effective messaging, and an organized network of volunteers.',
      'Our purpose is not simply to participate in one election. It is to build a lasting regional voice for people who believe in private-sector opportunity, responsible government, safe communities, strong schools, and practical leadership.',
    ],
    highlights: [
      {
        label: 'REGION FIRST',
        detail:
          'We concentrate our work on the communities, districts, and issues that shape Northwest Oregon.',
      },
      {
        label: 'PRACTICAL LEADERSHIP',
        detail:
          'We support candidates who listen, communicate clearly, show up for their communities, and work effectively with grassroots volunteers.',
      },
      {
        label: 'LONG-TERM INFRASTRUCTURE',
        detail:
          'We pool resources to strengthen candidate recruitment, fundraising, volunteer organization, voter outreach, and public messaging throughout the region.',
      },
    ],
    ctas: {
      primary: 'Read Our Story',
      secondary: 'Explore Our Priorities',
    },
  },
  priorities: {
    heading: 'Five priorities. One stronger region.',
    intro:
      'Our agenda focuses on the issues that directly affect the ability of Northwest Oregon families, workers, entrepreneurs, and communities to succeed.',
    list: [
      {
        id: '01',
        name: 'ECONOMIC PROSPERITY AND SMALL BUSINESS',
        paragraphs: [
          'Prosperity is created when people are free to start businesses, hire employees, invest locally, and build something of their own.',
          'We support a competitive tax and regulatory environment that helps small businesses open, expand, and create dependable private-sector jobs in both urban and rural communities.',
        ],
      },
      {
        id: '02',
        name: 'GOVERNMENT ACCOUNTABILITY AND FISCAL RESPONSIBILITY',
        paragraphs: [
          'Taxpayers deserve to know where their money goes, how it is used, and whether publicly funded programs are delivering what they promised.',
          'We support transparent spending, competitive contracting, independent audits, measurable performance standards, and real consequences when agencies or contractors fail to deliver.',
        ],
      },
      {
        id: '03',
        name: 'PUBLIC SAFETY AND QUALITY OF LIFE',
        paragraphs: [
          'People should feel secure in their homes, at work, in local businesses, and in public spaces.',
          'We support effective law enforcement, clean and well-maintained communities, practical responses to street disorder, and policies that combine compassion with clear standards of public safety and accountability.',
        ],
      },
      {
        id: '04',
        name: 'EDUCATION AND WORKFORCE DEVELOPMENT',
        paragraphs: [
          'Oregon’s schools should equip students with strong academic foundations, critical-thinking skills, and clear pathways into productive careers.',
          'We support career and technical education, apprenticeships, STEM programs, employer partnerships, parental involvement, and advancement based on ability, effort, and achievement.',
        ],
      },
      {
        id: '05',
        name: 'AFFORDABLE, RELIABLE ENERGY',
        paragraphs: [
          'Northwest Oregon families and employers need an energy system that keeps the lights on without placing unnecessary costs on ratepayers.',
          'We support a practical, all-of-the-above approach that recognizes Oregon’s hydropower advantage, evaluates modern nuclear technology, protects reliability, and requires major energy users to pay their fair share of infrastructure costs.',
        ],
      },
    ],
  },
  vision: {
    heading: 'Build a Northwest Oregon where people can thrive.',
    paragraphs: [
      'Northwest Oregon PAC exists to advance policies that grow private-sector prosperity, hold government accountable to taxpayers, keep communities safe and livable, prepare students for real careers, and provide affordable, reliable energy.',
      'We support candidates who understand that government should be focused, transparent, effective, and accountable to the people it serves.',
    ],
    promiseEyebrow: 'OUR PROMISE TO THE REGION',
    promise: 'We are here to help, and we are not from the government.',
    valuesLine: 'HOPE · SUPPORT · HEARD',
    ticker: [
      'Prosperity',
      'Accountability',
      'Public Safety',
      'Education',
      'Reliable Energy',
      'Small Business',
      'Economic Freedom',
      'Common Sense',
      'Community',
      'Opportunity',
    ],
  },
  endorsements: {
    eyebrow: 'CANDIDATES WE SUPPORT',
    heading: 'Candidates standing up for Northwest Oregon in 2026.',
    intro:
      'We support candidates who are ready to compete, work alongside grassroots volunteers, and advance practical solutions for the communities they seek to represent.',
    candidates: [
      {
        slug: 'mark-norman',
        name: 'Mark Norman',
        office: 'Oregon House District 27',
        bio: 'Navy veteran, veterinarian, small-business owner, and candidate for the Oregon House of Representatives.',
        cta: 'Visit Mark’s Campaign',
        link: 'https://www.markfororegon.com/',
      },
      {
        slug: 'brian-schimmel',
        name: 'Brian Schimmel',
        office: 'Oregon House District 29',
        bio: 'Independent candidate focused on practical representation and the needs of his local community.',
        cta: 'Visit Brian’s Campaign',
        link: 'https://brianschimmel.org/',
      },
      {
        slug: 'barbara-kahl',
        name: 'Dr. Barbara Kahl',
        office: 'U.S. House · Oregon’s 1st Congressional District',
        bio: 'Veterinarian, community leader, and candidate for Congress representing communities across Northwest Oregon.',
        cta: 'Visit Dr. Kahl’s Campaign',
        link: 'https://www.drkahlforcongress.com/',
      },
      {
        slug: 'ciatta-thompson',
        name: 'Ciatta Thompson',
        office: 'Oregon House District 33',
        bio: 'Community advocate and candidate working to bring common sense, accountability, and responsive leadership to District 33.',
        cta: 'Visit Ciatta’s Campaign',
        link: 'https://www.ciattathompson.com/',
      },
      {
        slug: 'randall-fryer',
        name: 'Randall Fryer',
        office: 'Oregon House District 28',
        bio: 'Physician and candidate for the Oregon House of Representatives.',
        cta: 'Campaign Information Coming Soon',
        link: '',
      },
    ],
    runForOffice: {
      eyebrow: 'Want to serve your community?',
      heading: 'Run for office.',
      description:
        'We interview prospective candidates to understand their values, commitment, experience, and readiness to do the work required to run an effective campaign.',
      cta: 'Start the Conversation',
    },
  },
  freedom: {
    heading: 'Opportunity grows when people are free to build.',
    paragraphs: [
      'We believe broad and lasting prosperity comes from people starting businesses, developing skills, earning success, and investing in their communities.',
      'Government has an important role: protect individual rights, maintain public safety, provide essential services, establish fair rules, and remain accountable to taxpayers. It should not replace private initiative or concentrate decisions that are better made by families, workers, employers, and communities.',
      'We support economic freedom because it connects effort with opportunity, encourages innovation, expands consumer choice, and gives more people the ability to shape their own futures.',
    ],
    sideCard: {
      eyebrow: 'Our core principle',
      body: 'Government should create fair conditions for people to succeed, not stand in the way of the people and businesses creating opportunity.',
    },
  },
  volunteerCta: {
    heading: 'Show up. Speak up. Strengthen the region.',
    paragraphs: [
      'A lasting political organization is built by people willing to contribute their time, experience, voice, and local knowledge.',
      'Whether you can volunteer for a few hours, host a neighborhood event, help a candidate, or consider running for office, there is a place for you in this effort.',
    ],
    ctas: {
      primary: 'Become a Volunteer',
    },
  },
  events: {
    label: 'EVENTS',
    heading: 'Come meet us in your community.',
    body: 'Candidate meet-and-greets, volunteer nights, neighborhood conversations, and regional gatherings — Northwest Oregon PAC brings people together across the region.\nSubscribe for updates to hear about the next event near you, or bring one to your community.',
    ctas: {
      primary: 'Get Event Updates',
      secondary: 'Host an Event',
    },
  },
  donate: {
    eyebrow: 'CONTRIBUTE',
    heading: 'Fund the fight for our region.',
    body: 'Every contribution helps strengthen candidate support, voter outreach, fundraising, volunteer organization, and public messaging across Northwest Oregon.',
    cta: 'Donate to Northwest Oregon PAC',
    notice:
      'The contribution form collects the contributor information required for campaign-finance reporting. Contributions from foreign nationals are prohibited.',
  },
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
    roles: ['Washington County Treasurer', 'President, Downtown Republican Women'],
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
export const volunteerActivities = ['Run for office', 'Canvass', 'Phone banking', 'Event planning']

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
export const focusAreas = ['Fundraising', 'Candidate Support', 'Messaging']

// What makes NW Oregon PAC different
export const differentiator =
  'No other PAC represents the Northwest Oregon region or works in a nonpartisan, bridge-building frame of mind. Our focus is where the issues actually are — losing businesses, unsafe streets, and communities too often overlooked by partisan politics.'

// Events page content — sourced verbatim from the Events Page content document.
// Consumed by src/sections/pages/events-page.jsx. Do NOT paraphrase or edit
// without an updated content doc.
export const eventsPage = {
  hero: {
    heading: 'Connect with people working for Northwest Oregon.',
    paragraphs: [
      'Attend a volunteer activity, community conversation, candidate gathering, or regional event.',
      'Events provide an opportunity to learn, participate, meet candidates, and connect with others who care about the future of Northwest Oregon.',
    ],
  },
  calendar: {
    eyebrow: 'EVENTS',
    heading: 'Come meet us in your community.',
    paragraphs: [
      'Candidate meet-and-greets, volunteer nights, neighborhood conversations, and regional gatherings — Northwest Oregon PAC brings people together across the region.',
      'Subscribe for updates to hear about the next event near you, or bring one to your community.',
    ],
    primary: { label: 'Get Event Updates', href: '/volunteer' },
    secondary: { label: 'Host an Event', href: '/contact' },
  },
}

// About page content — sourced verbatim from the About Page content document.
// Consumed by src/sections/pages/about-page.jsx. Do NOT paraphrase or edit
// without an updated content doc.
export const aboutPage = {
  hero: {
    eyebrow: 'ABOUT NORTHWEST OREGON PAC',
    heading: 'Building a lasting voice for Northwest Oregon.',
    paragraphs: [
      'Northwest Oregon PAC is a state political action committee established in 2026 to support capable candidates, strengthen regional campaigns, and advance policies that help families, businesses, and communities thrive.',
      'We bring local supporters, volunteers, and candidates together around a shared commitment to prosperity, accountability, opportunity, and practical leadership.',
    ],
  },
  story: {
    heading: 'Our region should never be written off.',
    paragraphs: [
      'Northwest Oregon PAC was founded because too many communities in our region have been treated as politically settled territory.',
      'When districts are considered uncompetitive, candidates receive less support, voters hear fewer alternatives, and local concerns struggle to receive the attention they deserve.',
      'We came together to change that.',
      'By pooling local resources, supporting credible candidates, developing effective messaging, and organizing volunteers, we are building the infrastructure needed to compete and remain engaged over the long term.',
      'Our work is grounded in a simple belief: every community deserves representation, investment, and leaders who are prepared to listen.',
    ],
    blocks: [
      {
        title: 'Why we exist',
        body: 'Northwest Oregon residents deserve candidates who will engage seriously with affordability, business growth, public safety, education, energy costs, and the performance of government.',
      },
      {
        title: 'Who we serve',
        body: 'People who work, build businesses, raise families, serve their communities, and expect government to deliver results. We welcome neighbors, moderates, independents, and other practical voters who believe our region needs a stronger voice.',
      },
      {
        title: 'How we work',
        body: 'We convert local participation into lasting political capacity. That means raising funds, evaluating candidates, strengthening campaigns, organizing volunteers, communicating regional priorities, and helping credible candidates reach more voters.',
      },
      {
        title: 'What we believe',
        body: 'No district should be considered unworthy of effort. No voter should be denied a meaningful choice because political organizations decided a race was too difficult. And no public institution should be excused from delivering measurable results.',
      },
    ],
  },
  teamSection: {
    eyebrow: 'Our Team',
    heading: 'Local leadership. Built to organize.',
    paragraphs: [
      'Northwest Oregon PAC is led by volunteers with experience in financial stewardship, organizational governance, technology, grassroots engagement, and local political leadership.',
      'Together, they are helping build an organization designed to operate responsibly, support candidates effectively, and remain active beyond a single election cycle.',
    ],
    members: [
      {
        name: 'Cindy Sawyer',
        roles: [
          'Treasurer, Washington County Republican Party',
          'President, Downtown Republican Women',
        ],
        bio: 'Cindy brings experience in financial oversight, grassroots development, and community-based political organization.',
      },
      {
        name: 'Helen Heller',
        roles: [
          'Vice Chair, Washington County Republican Party',
          'Vice Chair, Congressional District 6',
          'Second Vice President, Beaverton–Hillsboro Republican Women',
        ],
        bio: 'Helen contributes extensive experience in local leadership, volunteer engagement, and coordination across political organizations.',
      },
      {
        name: 'Christina Buehler',
        roles: [
          'Parliamentarian, Oregon Republican Party',
          'Parliamentarian, Washington County Republican Party',
          'Technology Committee, Washington County Republican Party',
        ],
        bio: 'Christina supports the PAC through organizational governance, parliamentary procedure, digital systems, and campaign operations.',
      },
    ],
  },
  candidatesSection: {
    eyebrow: 'Candidates',
    heading: 'Backing the people willing to step forward.',
    paragraphs: [
      'A stronger political future begins with capable candidates who are prepared to compete.',
      'We support candidates who understand their communities, communicate clearly, work alongside grassroots volunteers, and remain focused on practical results.',
    ],
    cta: 'Visit Campaign',
    list: [
      {
        slug: 'mark-norman',
        name: 'Mark Norman',
        office: 'Oregon House District 27',
        link: 'https://www.markfororegon.com/',
      },
      {
        slug: 'brian-schimmel',
        name: 'Brian Schimmel',
        office: 'Oregon House District 29',
        link: 'https://brianschimmel.org/',
      },
      {
        slug: 'barbara-kahl',
        name: 'Dr. Barbara Kahl',
        office: 'U.S. House · Oregon’s 1st Congressional District',
        link: 'https://www.drkahlforcongress.com/',
      },
      {
        slug: 'ciatta-thompson',
        name: 'Ciatta Thompson',
        office: 'Oregon House District 33',
        link: 'https://www.ciattathompson.com/',
      },
      {
        slug: 'randall-fryer',
        name: 'Randall Fryer',
        office: 'Oregon House District 28',
        link: '',
      },
    ],
  },
  values: {
    heading: 'Three values. One standard: results.',
    list: [
      {
        title: 'Prosperity',
        body: 'A healthy region depends on people who take risks, create jobs, develop skills, and invest in their communities. We support an economy where small businesses can grow, workers can advance, and families can build secure futures without unnecessary barriers.',
      },
      {
        title: 'Accountability',
        body: 'Government should clearly explain what it is doing, what it costs, and whether it is working. We support transparent decisions, measurable outcomes, responsible spending, and consequences when public programs repeatedly fail to deliver.',
      },
      {
        title: 'Common sense',
        body: 'Public policy should solve the problem in front of us, not satisfy an ideological test. We support leadership that listens, examines the evidence, makes practical decisions, and changes direction when the results demand it.',
      },
    ],
  },
  cta: {
    heading: 'Northwest Oregon will not become more competitive by accident.',
    body: 'It will take candidates willing to run, volunteers willing to participate, and local residents willing to invest in the work. Help us build the organization our region needs.',
    primary: { label: 'Volunteer', href: '/volunteer' },
    secondary: { label: 'Donate', href: '/donate' },
    textLink: { label: 'Run for Office', href: '/ask' },
  },
}
