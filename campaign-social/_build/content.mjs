// Content plan for the Northwest Oregon PAC social library.
// EVERY user-facing string is copied verbatim from the client's
// PDF calendar ("NW - SM Calendar"). Do not paraphrase — the PDF is
// the single source of truth.

import { pac } from '../../src/data/pac.js'

export const DOMAIN = 'northwestoregon.com'
export const FILING = `Committee #${pac.pacId} · Est. ${pac.foundedYear}`
export const PAID_FOR = pac.disclaimers.paidFor.replace(/\.$/, '')

// Icon shorthand for the five PAC priorities, still used by the
// existing site iconography.
export const PRIORITY_META = {
  '01': { icon: 'skyline', short: 'Economic Prosperity & Small Business' },
  '02': { icon: 'balance', short: 'Government Accountability & Fiscal Responsibility' },
  '03': { icon: 'shield', short: 'Public Safety & Quality of Life' },
  '04': { icon: 'certificate', short: 'Education & Workforce Development' },
  '05': { icon: 'energy', short: 'Affordable, Reliable Energy' },
}

export const CANDIDATE_PHOTOS = {
  'mark-norman': 'mark-norman.jpg',
  'brian-schimmel': 'brian-schimmel.jpg',
  'barbara-kahl': 'barbara-kahl.jpg',
  'ciatta-thompson': 'ciatta-thompson.jpg',
  'randall-fryer': 'randall-fryer.jpg',
}

// Shared photography we already have on disk. Each post reuses one of
// these in a way that fits the specific message — cinematic drone,
// downtown/community, farm/forest, or working-hands documentary — and
// the templates layer editorial gradients/depth over them.
const IMG = {
  region: 'banner.jpg', // wide regional / drone
  community: 'hero.jpg', // people-first community
  working: 'who-we-are.jpg', // volunteers / doorstep
}

/* -------------------------------------------------------------------
   FEED — 60 posts, 1080×1080
   Content matches the PDF's STATIC POSTS #1–60 verbatim.
------------------------------------------------------------------- */
export const feed = [
  // #1 — A Stronger Voice for Northwest Oregon
  {
    id: 'feed-01-hero',
    tag: 'Introduction',
    title: 'A Stronger Voice for Northwest Oregon',
    template: 'cover',
    caption:
      "Northwest Oregon deserves leaders who listen, communities that thrive, and policies that put people first.\n\nNorthwest Oregon PAC exists to support candidates, strengthen local campaigns, and build lasting political infrastructure across our region.\n\nThis is not about one election. It's about creating a stronger future for Northwest Oregon.\n\nFollow along as we introduce the candidates, issues, and ideas shaping our communities.\n\n#NorthwestOregon #NorthwestOregonPAC #OregonPolitics #CommunityLeadership #Prosperity #Accountability #Opportunity #Leadership",
    data: {
      photo: IMG.region,
      eyebrow: 'Northwest Oregon PAC',
      heading: 'A Stronger Voice for Northwest Oregon.',
      sub: 'Prosperity · Accountability · Opportunity',
    },
  },
  // #2 — Our Region. Our Voice.
  {
    id: 'feed-02-region-voice',
    tag: 'Introduction',
    title: 'Our Region. Our Voice.',
    template: 'headline',
    surface: 's-forest',
    caption:
      "For too long, many Northwest Oregon communities have felt overlooked during election season.\n\nWe believe every community deserves competitive candidates, meaningful conversations, and leaders who understand local priorities.\n\nThat's why we're building something that lasts beyond Election Day.\n\nWhere do you call home? Tell us in the comments.\n\n#NorthwestOregon #CommunityFirst #Oregon #VoteLocal #StrongerTogether",
    data: {
      eyebrow: 'Our region',
      heading: 'Our Region.',
      headingLine2: 'Our Voice.',
      sub: 'Hillsboro · Forest Grove · Astoria · Tillamook · Columbia County',
    },
  },
  // #3 — Prosperity Starts Here.
  {
    id: 'feed-03-prosperity',
    tag: 'Issues',
    title: 'Prosperity Starts Here.',
    template: 'headline',
    caption:
      'Strong communities begin with strong local economies.\n\nWhen small businesses succeed, families benefit.\n\nWhen entrepreneurs grow, communities grow.\n\nNorthwest Oregon PAC supports policies that encourage opportunity, investment, and economic growth across our region.\n\nTag your favorite local Northwest Oregon business.\n\n#SmallBusiness #NorthwestOregon #EconomicGrowth #SupportLocal',
    data: {
      eyebrow: 'Prosperity',
      heading: 'Prosperity',
      headingLine2: 'Starts Here.',
    },
  },
  // #4 — Accountability Matters.
  {
    id: 'feed-04-accountability',
    tag: 'Issues',
    title: 'Accountability Matters.',
    template: 'cover',
    caption:
      'We believe transparency, responsible spending, and measurable results help build public trust.\n\nGood government isn\'t about bigger government. It\'s about better government.\n\nWhat does accountability mean to you?\n\n#Accountability #Transparency #NorthwestOregon',
    data: {
      photo: IMG.community,
      eyebrow: 'Public trust',
      heading: 'Accountability Matters.',
      sub: 'Transparency · Responsibility · Results',
    },
  },
  // #5 — Meet Northwest Oregon.
  {
    id: 'feed-05-meet-nw-oregon',
    tag: 'Introduction',
    title: 'Meet Northwest Oregon.',
    template: 'headline',
    surface: 's-sand',
    caption:
      "Our region is more than a place on the map.\n\nIt's working families. Small businesses. Farmers. Teachers. Veterans. Students. Volunteers. Communities like ours deserve to be heard.\n\nShare this if you're proud to call Northwest Oregon home.\n\n#NorthwestOregon #Community #LocalVoices #Oregon",
    data: {
      eyebrow: 'Our region',
      heading: 'Meet',
      headingLine2: 'Northwest Oregon.',
    },
  },
  // #6 — We Exist For NorthWest Oregon
  {
    id: 'feed-06-we-exist',
    tag: 'Introduction',
    title: 'We Exist For NorthWest Oregon',
    template: 'longform',
    surface: 's-forest',
    caption:
      'We believe every voter deserves a meaningful choice.\n\nThat\'s why Northwest Oregon PAC works to strengthen campaigns, recruit leaders, organize volunteers, and support candidates prepared to serve.\n\nBuilding a stronger region starts long before Election Day.\n\nLearn more at our website. Click the link in bio and learn more about us.\n\n#Leadership #NorthwestOregonPAC #CommunityLeadership',
    data: {
      eyebrow: 'Northwest Oregon PAC',
      heading: 'We Exist For NorthWest Oregon',
      paragraphs: [
        'We believe every voter deserves a meaningful choice.',
        'That\'s why Northwest Oregon PAC works to strengthen campaigns, recruit leaders, organize volunteers, and support candidates prepared to serve.',
        'Building a stronger region starts long before Election Day.',
      ],
    },
  },
  // #7 — Small Actions. Big Impact.
  {
    id: 'feed-07-small-actions',
    tag: 'Get involved',
    title: 'Small Actions. Big Impact.',
    template: 'headline',
    caption:
      "Every conversation. Every volunteer. Every donation. Every supporter.\n\nTogether, these small actions create stronger campaigns and stronger communities.\n\nThank you for helping shape Northwest Oregon's future.\n\nTag someone who always shows up for their community.\n\n#Volunteer #Community #NorthwestOregon",
    data: {
      eyebrow: 'Together we build',
      heading: 'Small Actions.',
      headingLine2: 'Big Impact.',
    },
  },
  // #8 — Building Tomorrow. Starting Today.
  {
    id: 'feed-08-building-tomorrow',
    tag: 'Introduction',
    title: 'Building Tomorrow. Starting Today.',
    template: 'headline',
    surface: 's-forest',
    caption:
      "Strong political organizations aren't built overnight.\n\nThey grow through relationships, trust, community involvement, and people willing to step forward.\n\nThat's exactly what we're building across Northwest Oregon.\n\nFollow our journey.\n\n#NorthwestOregon #Leadership #CommunityFirst #Future",
    data: {
      eyebrow: 'A movement in progress',
      heading: 'Building Tomorrow.',
      headingLine2: 'Starting Today.',
    },
  },
  // #9 — NorthWest Oregon. What Matters Most?
  {
    id: 'feed-09-what-matters',
    tag: 'Values',
    title: 'What Matters Most?',
    template: 'checklist',
    caption:
      'Every community has different priorities.\n\nWe want to hear yours.\n\nWhich issue matters most?\n\n✔ Public Safety\n✔ Small Business\n✔ Education\n✔ Affordable Energy\n✔ Government Accountability\n\nVote below in the comments.\n\n#CommunityVoice #NorthwestOregon #YourVoiceMatters',
    data: {
      eyebrow: 'NorthWest Oregon',
      heading: 'What Matters Most?',
      items: [
        'Public Safety',
        'Small Business',
        'Education',
        'Affordable Energy',
        'Government Accountability',
      ],
    },
  },
  // #10 — Economic opportunity isn't created by government...
  {
    id: 'feed-10-economic-opportunity',
    tag: 'Beliefs',
    title: "Economic opportunity isn't created by government",
    template: 'longform',
    caption:
      'A thriving economy starts with people who are willing to build, invest, and create opportunity.\n\nNorthwest Oregon PAC believes families and small businesses deserve an environment where hard work is rewarded, entrepreneurship is encouraged, and local communities can prosper.\n\nWhen businesses succeed, communities grow stronger.\n\nWhat local business inspires you? Tag them below.\n\n#NorthwestOregon #EconomicProsperity #SupportLocal #SmallBusiness #Opportunity #CommunityLeadership',
    data: {
      eyebrow: 'Economic Prosperity',
      paragraphs: [
        "Economic opportunity isn't created by government, it is created by the people willing to work hard, take risks, and build something meaningful.",
        'Our job is to remove barriers so they can succeed.',
      ],
    },
  },
  // #11 — Responsible government starts with responsible stewardship.
  {
    id: 'feed-11-responsible-government',
    tag: 'Beliefs',
    title: 'Responsible government starts with responsible stewardship.',
    template: 'longform',
    surface: 's-sand',
    caption:
      'Public trust grows when government is transparent, accountable, and focused on delivering results.\n\nNorthwest Oregon PAC believes every public dollar should be managed responsibly, with clear priorities and measurable outcomes.\n\nGood government earns trust through accountability.\n\nWhat does government accountability mean to you?\n\n#Accountability #FiscalResponsibility #NorthwestOregon #Leadership #Transparency',
    data: {
      eyebrow: 'Government Accountability',
      paragraphs: [
        'Responsible government starts with responsible stewardship.',
        'Every taxpayer deserves transparency, measurable results, and confidence that public dollars are being spent wisely.',
      ],
    },
  },
  // #12 — The Future Belongs to Those Who Show Up.
  {
    id: 'feed-12-future-belongs',
    tag: 'Get involved',
    title: 'The Future Belongs to Those Who Show Up.',
    template: 'headline',
    surface: 's-forest',
    caption:
      "Communities become stronger when people participate.\n\nWhether it's volunteering, supporting a candidate, attending an event, or simply staying informed, every action makes a difference.\n\nNorthwest Oregon's future will be built by the people who choose to be involved.\n\nAre you ready to get involved?\n\nVisit our website to volunteer or learn more.\n\n#GetInvolved #NorthwestOregonPAC #Volunteer #CommunityLeadership #OregonPolitics",
    data: {
      eyebrow: 'Show up',
      heading: 'The Future Belongs',
      headingLine2: 'to Those Who Show Up.',
    },
  },
  // #13 — Economic Prosperity & Small Business
  {
    id: 'feed-13-prosperity-policy',
    tag: 'Issues',
    title: 'Economic Prosperity & Small Business',
    template: 'longform',
    caption:
      'Strong communities are built by local business owners, skilled workers, entrepreneurs, farmers, and families who invest in their communities every day.\n\nOur goal is to help create the conditions where those efforts can succeed.\n\n#EconomicGrowth #NorthwestOregon #SmallBusiness #Entrepreneurship #Prosperity',
    data: {
      eyebrow: 'Economic Prosperity & Small Business',
      paragraphs: [
        'We support policies that encourage entrepreneurship, strengthen local businesses, reduce unnecessary barriers, and create an environment where innovation and hard work can thrive across Northwest Oregon.',
      ],
    },
  },
  // #14 — Safe neighborhoods give children room to dream...
  {
    id: 'feed-14-safe-neighborhoods',
    tag: 'Issues',
    title: 'Safe neighborhoods give children room to dream.',
    template: 'longform',
    surface: 's-forest',
    caption:
      'People should feel safe where they live, work, and raise their families.\n\nWe believe public safety isn\'t just about responding to crime, it\'s about creating neighborhoods where businesses can invest, parks stay active, and communities flourish.\n\nBecause when people feel safe, opportunity follows.\n\n#NorthwestOregon #PublicSafety #QualityOfLife #CommunityFirst',
    data: {
      eyebrow: 'Public Safety',
      paragraphs: [
        'Safe neighborhoods give children room to dream, families peace of mind, and local businesses the confidence to grow.',
        'Public safety is where opportunity begins.',
      ],
    },
  },
  // #15 — Be Part of Something Bigger for Oregon
  {
    id: 'feed-15-something-bigger',
    tag: 'Get involved',
    title: 'Be Part of Something Bigger for Oregon',
    template: 'headline',
    surface: 's-sand',
    caption:
      "Northwest Oregon's future belongs to the people who choose to participate.\n\nVolunteer. Support a candidate. Attend an event. Start a conversation.\n\nEvery action helps strengthen our communities and expand opportunities for future generations.\n\nLet's build that future, together.\n\nVisit our website to learn how you can get involved today.\n\n#NorthwestOregonPAC #Volunteer #CommunityLeadership #GetInvolved #OregonPolitics",
    data: {
      eyebrow: 'Get involved',
      heading: 'Be Part of Something',
      headingLine2: 'Bigger for Oregon.',
    },
  },
  // #16 — We support practical solutions... (Public Safety)
  {
    id: 'feed-16-practical-solutions',
    tag: 'Issues',
    title: 'Practical solutions for public safety',
    template: 'longform',
    caption:
      "Every family deserves to feel confident walking through their neighborhood.\n\nEvery business deserves customers who feel comfortable visiting.\n\nEvery child deserves safe parks, schools, and public spaces.\n\nNorthwest Oregon PAC supports policies that strengthen community partnerships, improve public safety, and preserve the quality of life that makes our region a great place to call home.\n\nSafe communities benefit everyone. Share this post if you agree.\n\n#NorthwestOregon #CommunitySafety #PublicSafety #StrongerCommunities #Leadership #Oregon",
    data: {
      eyebrow: 'Public Safety',
      paragraphs: [
        'We support practical solutions that help law enforcement, first responders, and local communities work together to reduce crime, improve public spaces, and keep Northwest Oregon a place where families and businesses can grow.',
      ],
    },
  },
  // #17 — Education & Workforce Development
  {
    id: 'feed-17-education-workforce',
    tag: 'Issues',
    title: 'Education & Workforce Development',
    template: 'headline',
    surface: 's-forest',
    caption:
      "Northwest Oregon's students need classrooms that inspire learning, career pathways that reflect today's economy, and the skills to succeed wherever their ambitions lead.\n\nBy connecting education with real-world opportunities, we can build a stronger workforce and a stronger region.\n\nWhat skill do you think every student should graduate with?\n\n#Education #NorthwestOregon #FutureReady #CareerPathways #WorkforceDevelopment",
    data: {
      eyebrow: 'Priority · 04',
      heading: 'Education & Workforce',
      headingLine2: 'Development',
      sub: "Preparing today's students for tomorrow's opportunities.",
    },
  },
  // #18 — Northwest Oregon is worth fighting for.
  {
    id: 'feed-18-worth-fighting-for',
    tag: 'Beliefs',
    title: 'Northwest Oregon is worth fighting for.',
    template: 'longform',
    caption:
      "For years, Northwest Oregon has been treated like an afterthought.\n\nWhen races are considered \"unwinnable,\" investment disappears. Volunteers disappear. Candidates stop running.\n\nCommunities deserve better than that.\n\nNorthwest Oregon PAC exists because we believe every district deserves competition, every voter deserves a choice, and every community deserves someone willing to fight for it.\n\nWe're not waiting for someone else to invest in our region.\n\nWe're building it ourselves.",
    data: {
      eyebrow: 'Our commitment',
      paragraphs: ['Northwest Oregon is worth fighting for.'],
    },
  },
  // #19 — Every dollar raised here...
  {
    id: 'feed-19-every-dollar-here',
    tag: 'Support',
    title: 'Every dollar raised here...',
    template: 'stack',
    surface: 's-forest',
    caption:
      "This PAC wasn't created to send resources somewhere else.\n\nIt was created to keep them here.\n\nEvery contribution, volunteer hour, endorsement, and conversation helps strengthen Northwest Oregon, not just one candidate.\n\nThat's how lasting political infrastructure is built.",
    data: {
      eyebrow: 'Raised here. Invested here.',
      rows: [
        { k: 'Every dollar raised here…', v: 'helps build campaigns here.' },
        { k: 'Every volunteer recruited here…', v: 'helps strengthen communities here.' },
        { k: 'Every conversation started here…', v: 'helps Northwest Oregon move forward.' },
      ],
    },
  },
  // #20 — Northwest Oregon deserves more than campaign promises.
  {
    id: 'feed-20-more-than-promises',
    tag: 'Beliefs',
    title: 'Northwest Oregon deserves more than campaign promises.',
    template: 'longform',
    surface: 's-sand',
    caption:
      "Election cycles come and go. Communities remain.\n\nThat's why our work isn't measured only by wins on Election Night.\n\nIt's measured by stronger local organizations...\n\nmore qualified candidates...\n\nmore engaged citizens...\n\nand communities that finally have a voice again.\n\nThat's the future we're building.",
    data: {
      eyebrow: 'Beyond Election Day',
      paragraphs: [
        'Northwest Oregon deserves more than campaign promises.',
        'It deserves people willing to stay after Election Day.',
      ],
    },
  },
  // #21 — Affordable energy isn't just an economic issue.
  {
    id: 'feed-21-affordable-energy',
    tag: 'Issues',
    title: "Affordable energy isn't just an economic issue.",
    template: 'longform',
    caption:
      "Energy touches nearly every part of our daily lives, from heating our homes to keeping small businesses open.\n\nNorthwest Oregon PAC believes families shouldn't have to choose between managing monthly expenses and keeping the lights on. We support practical energy policies that prioritize affordability, reliability, and long-term resilience for our communities.",
    data: {
      eyebrow: 'Affordable Energy',
      paragraphs: [
        "Affordable energy isn't just an economic issue. It's a family issue.",
        'When utility bills rise, every household feels it.',
        'Oregon can protect both affordability and reliability.',
      ],
    },
  },
  // #22 — Northwest Oregon has always been powered by innovation.
  {
    id: 'feed-22-powered-by-innovation',
    tag: 'Issues',
    title: 'Northwest Oregon has always been powered by innovation.',
    template: 'longform',
    surface: 's-forest',
    caption:
      "Northwest Oregon's strength has always come from its ability to adapt.\n\nOur communities have never relied on a single industry or a single solution. We believe the same approach should guide our energy future—supporting reliable infrastructure, encouraging innovation, and protecting affordability for the people and businesses that call this region home.\n\nA resilient future starts with balanced decisions. Share if you agree.",
    data: {
      eyebrow: 'A resilient future',
      paragraphs: [
        'Northwest Oregon has always been powered by innovation.',
        'From hydropower and forestry to agriculture, manufacturing, and emerging technologies, our region succeeds when we build on the resources that make Oregon unique.',
      ],
    },
  },
  // #23 — Our priorities aren't chosen in Salem.
  {
    id: 'feed-23-priorities-nw',
    tag: 'Issues',
    title: 'Our priorities aren\'t chosen in Salem.',
    template: 'checklist',
    caption:
      'Every priority we champion begins with listening.\n\nThe issues facing Astoria aren\'t always the same as those in Hillsboro or Tillamook—but across Northwest Oregon, we hear common themes: affordability, opportunity, safety, accountability, and a desire for practical leadership.\n\nThat\'s why these five priorities guide everything we do.',
    data: {
      eyebrow: "Our priorities aren't chosen in Salem.",
      heading: "They're shaped by conversations across Northwest Oregon.",
      items: [
        'Supporting local businesses',
        'Responsible public spending',
        'Safe communities',
        'Preparing students for tomorrow',
        'Affordable, dependable energy',
      ],
    },
  },
  // #24 — We're building the foundation for Northwest Oregon's future.
  {
    id: 'feed-24-foundation',
    tag: 'About',
    title: "We're building the foundation for Northwest Oregon's future.",
    template: 'longform',
    caption:
      "Campaigns begin and end. Communities don't.\n\nThat's why Northwest Oregon PAC was created with a long-term vision: to develop leaders, support competitive candidates, invest in grassroots organization, and strengthen civic participation throughout our region.\n\nSuccess isn't measured only by Election Day.\n\nIt's measured by whether Northwest Oregon is stronger four years from now than it is today.\n\nIf you believe our region deserves long-term investment, not just election-season attention, follow along and be part of what's next.",
    data: {
      eyebrow: 'Our long-term vision',
      paragraphs: [
        "We're building the foundation for Northwest Oregon's future.",
        'Northwest Oregon PAC exists to recruit leaders, strengthen local campaigns, organize volunteers, and ensure our communities have a stronger voice for years to come.',
      ],
    },
  },
  // #25 — Candidates standing up for Northwest Oregon.
  {
    id: 'feed-25-candidates-intro',
    tag: 'Candidates',
    title: 'Candidates standing up for Northwest Oregon.',
    template: 'longform',
    surface: 's-forest',
    caption:
      "Leadership is about earning trust, solving problems, and showing up for your community.\n\nOver the coming weeks, we'll introduce the candidates we're proud to support and the reasons we believe they're ready to serve Northwest Oregon.\n\nStay tuned and meet the candidates.\n\n#NorthwestOregonPAC #MeetTheCandidates #Election2026 #NorthwestOregon",
    data: {
      eyebrow: 'Meet the candidates',
      paragraphs: [
        'Candidates standing up for Northwest Oregon.',
        "This election, we're supporting candidates who are prepared to listen, serve, and work for the communities they represent, not just during campaign season, but long after Election Day.",
      ],
    },
  },
  // #26 — Mark Norman
  {
    id: 'feed-26-mark-norman',
    tag: 'Candidates',
    title: 'The candidate. Mark Norman.',
    template: 'candidate',
    caption:
      "We're proud to support Mark Norman because he understands responsibility, leadership, and the importance of putting community first.\n\nGet to know Mark and his vision for District 27.\n\n#MarkNorman #HouseDistrict27 #NorthwestOregonPAC #Leadership #Election2026",
    data: {
      slug: 'mark-norman',
      kicker: 'The candidate',
      name: 'Mark Norman',
      office: 'Oregon House District 27',
      bio: 'From military service to caring for animals and serving his community, Mark Norman has built a career around helping others, and now he\'s ready to bring that same commitment to Salem.',
      cta: 'MarkNormanForOregon.com',
    },
  },
  // #27 — Brian Schimmel
  {
    id: 'feed-27-brian-schimmel',
    tag: 'Candidates',
    title: 'Meet Brian Schimmel',
    template: 'candidate',
    surface: 's-forest',
    caption:
      "Communities deserve leaders who listen first, work hard, and stay connected to the people they represent. Brian Schimmel is committed to bringing that approach to House District 29.\n\nFollow Brian's campaign and learn more.\n\n#BrianSchimmel #HouseDistrict29 #NorthwestOregonPAC #Leadership #Election2026 #Oregon",
    data: {
      slug: 'brian-schimmel',
      kicker: 'Meet the candidate',
      name: 'Brian Schimmel',
      office: 'Candidate for Oregon House District 29',
      bio: 'Focused on practical leadership, local priorities, and serving the people of District 29.',
      cta: 'Follow the campaign',
    },
  },
  // #28 — Barbara Kahl
  {
    id: 'feed-28-barbara-kahl',
    tag: 'Candidates',
    title: 'Meet Dr. Barbara Kahl',
    template: 'candidate',
    caption:
      "Dr. Barbara Kahl is committed to serving Northwest Oregon with practical leadership and a focus on the issues that matter most to local communities. We're proud to support candidates who step forward to serve.\n\nLearn more about Dr. Kahl's campaign.\n\n#BarbaraKahl #CongressionalDistrict1 #NorthwestOregonPAC #Election2026 #Leadership #OregonPolitics",
    data: {
      slug: 'barbara-kahl',
      kicker: 'Meet the candidate',
      name: 'Dr. Barbara Kahl',
      office: "Candidate for U.S. House – Oregon's 1st Congressional District",
      bio: 'Veterinarian. Community advocate. Candidate for Congress.',
      cta: 'Learn about her campaign',
    },
  },
  // #29 — Ciatta Thompson
  {
    id: 'feed-29-ciatta-thompson',
    tag: 'Candidates',
    title: 'Ciatta Thompson',
    template: 'candidate',
    surface: 's-forest',
    caption:
      "We're proud to support Ciatta Thompson for Oregon House District 33 and her commitment to building a stronger future for Northwest Oregon.\n\nLearn more about Ciatta's campaign.\n\n#CiattaThompson #HouseDistrict33 #NorthwestOregonPAC #Election2026 #Leadership #NorthwestOregon",
    data: {
      slug: 'ciatta-thompson',
      kicker: 'Meet the candidate',
      name: 'Ciatta Thompson',
      office: 'Running for Oregon House District 33',
      bio: 'Committed to practical leadership, stronger communities, and putting the people of District 33 first.',
      cta: 'Follow the campaign',
    },
  },
  // #30 — Randall Fryer
  {
    id: 'feed-30-randall-fryer',
    tag: 'Candidates',
    title: 'Randall Fryer',
    template: 'candidate',
    caption:
      'Good leadership starts with integrity, experience, and a willingness to serve.\n\nWe\'re proud to support Randall Fryer as he runs for Oregon House District 28, bringing a steady and practical approach to public service.\n\nFollow Randall\'s campaign.\n\n#RandallFryer #HouseDistrict28 #NorthwestOregonPAC #Election2026 #Leadership #OregonPolitics',
    data: {
      slug: 'randall-fryer',
      kicker: 'Meet the candidate',
      name: 'Randall Fryer',
      office: 'Running for Oregon House District 28',
      bio: 'Bringing decades of professional experience and a commitment to thoughtful, community-focused leadership.',
      cta: 'Follow the campaign',
    },
  },
  // #31 — Northwest Oregon needs good leaders. Run for office.
  {
    id: 'feed-31-run-for-office',
    tag: 'Get involved',
    title: 'Northwest Oregon needs good leaders. Run for office.',
    template: 'longform',
    surface: 's-forest',
    caption:
      "The next great leader doesn't always come from politics.\n\nSometimes they're a teacher, veteran, business owner, healthcare professional, farmer, or volunteer who simply wants to serve.\n\nIf you've ever considered running for office, let's talk.\n\n#RunForOffice #NorthwestOregonPAC #Leadership #ServeYourCommunity #Election2026",
    data: {
      eyebrow: 'Run for office',
      heading: 'Northwest Oregon needs good leaders.',
      subhead: 'Run for office.',
      paragraphs: [
        "If you care about your community, understand its challenges, and want to make a difference, we'd love to start the conversation.",
      ],
    },
  },
  // #32 — Volunteer with Northwest Oregon PAC.
  {
    id: 'feed-32-volunteer',
    tag: 'Get involved',
    title: 'Volunteer with Northwest Oregon PAC.',
    template: 'longform',
    caption:
      "Become a volunteer today. Whether it's volunteering at events, talking with neighbors, or supporting local candidates, every effort helps strengthen Northwest Oregon.\n\nJoin us and be part of the movement.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership #Election2026",
    data: {
      eyebrow: 'Volunteer',
      heading: 'Volunteer with Northwest Oregon PAC.',
      paragraphs: [
        'Your time, skills, and voice can help build lasting change across our region.',
      ],
    },
  },
  // #33 — Every movement needs people willing to step forward. Where do you fit in?
  {
    id: 'feed-33-where-you-fit',
    tag: 'Get involved',
    title: 'Where do you fit in?',
    template: 'checklist',
    surface: 's-sand',
    caption:
      "Whether you have a few hours a month or want to get involved every week, your time can help strengthen campaigns and communities across Northwest Oregon.\n\nJoin our volunteer team.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership #NorthwestOregon",
    data: {
      eyebrow: 'Every movement needs people willing to step forward.',
      heading: 'Where do you fit in?',
      items: [
        'Knock doors',
        'Make calls',
        'Help at events',
        'Support candidates',
        'Share your skills',
      ],
      footer: "There's a place for you.",
      bullet: '•',
    },
  },
  // #34 — Campaigns work when people gather.
  {
    id: 'feed-34-campaigns-gather',
    tag: 'Get involved',
    title: 'Campaigns work when people gather.',
    template: 'headline',
    caption:
      "The best conversations don't happen online, they happen in our communities.\n\nJoin us at upcoming meet-and-greets, volunteer nights, community discussions, and campaign events across Northwest Oregon.\n\nWe'd love to meet you.\n\n#NorthwestOregonPAC #CommunityEvents #MeetTheCandidates #Election2026",
    data: {
      eyebrow: 'Community events',
      heading: 'Campaigns work when people gather.',
      lines: ['Meet candidates.', 'Meet neighbors.', 'Join the conversation.'],
    },
  },
  // #35 — Host a meet-up. Invite your neighbors.
  {
    id: 'feed-35-host-meetup',
    tag: 'Get involved',
    title: 'Host a meet-up.',
    template: 'longform',
    surface: 's-forest',
    caption:
      'One conversation can inspire an entire neighborhood.\n\nWhether it\'s a living room gathering, a local business, or a community space, hosting an event is one of the most meaningful ways to connect people with the issues and candidates that matter.\n\nHost an event with us.\n\n#HostAnEvent #NorthwestOregonPAC #CommunityLeadership',
    data: {
      eyebrow: 'Host an event',
      heading: 'Host a meet-up. Invite your neighbors.',
      paragraphs: [
        'Help connect people with the candidates shaping Northwest Oregon\'s future.',
      ],
    },
  },
  // #36 — Northwest Oregon isn't changing because of one candidate.
  {
    id: 'feed-36-not-one-candidate',
    tag: 'Introduction',
    title: "Northwest Oregon isn't changing because of one candidate.",
    template: 'longform',
    caption:
      'This movement is powered by volunteers, supporters, local businesses, donors, and neighbors who believe Northwest Oregon deserves a stronger future.\n\nThank you for being part of it.\n\n#NorthwestOregonPAC #CommunityFirst #Grassroots #Volunteer #Leadership',
    data: {
      eyebrow: 'A movement of neighbors',
      paragraphs: [
        "Northwest Oregon isn't changing because of one candidate.",
        "It's changing because neighbors are choosing to get involved.",
      ],
    },
  },
  // #37 — Stay informed. Stay involved.
  {
    id: 'feed-37-stay-informed',
    tag: 'Get involved',
    title: 'Stay informed. Stay involved.',
    template: 'headline',
    surface: 's-sand',
    caption:
      "Change starts with staying informed.\n\nFollow Northwest Oregon PAC for campaign updates, community events, candidate announcements, and opportunities to get involved across the region.\n\nTogether, we'll keep Northwest Oregon moving forward.\n\n#NorthwestOregonPAC #StayConnected #CommunityUpdates #Election2026 #NorthwestOregon #Grassroots",
    data: {
      eyebrow: 'Stay connected',
      heading: 'Stay informed.',
      headingLine2: 'Stay involved.',
      sub: 'Follow Northwest Oregon PAC for candidate updates, local events, campaign news, and the issues shaping our communities.',
      lines: ['Facebook · Website · Email Updates'],
    },
  },
  // #38 — Contact card
  {
    id: 'feed-38-contact',
    tag: 'About',
    title: 'Have a question? Reach the PAC directly.',
    template: 'contact',
    caption:
      'Questions about volunteering, supported candidates, events, donations, or running for office?\n\nReach out directly. We want Northwest Oregon residents to know who we are, what we support, and how to participate.\n\n#ContactNorthwestOregonPAC #NorthwestOregon #GetInvolved #OregonPolitics',
    data: {
      eyebrow: 'Contact',
      heading: 'Have a question?',
      subhead: 'Reach the PAC directly.',
      rows: [
        { k: 'General Inquiries', v: 'info@northwestoregon.com' },
        { k: 'Program Director', v: 'Cynthia Sawyer · 503-490-4139' },
        {
          k: 'Mailing Address',
          v: '10700 SW Beaverton-Hillsdale Highway, Suite 212, Beaverton, Oregon 97005',
        },
        { k: 'Region', v: 'Northwest Oregon · Pacific Time' },
      ],
    },
  },
  // #39 — Why We Are Here
  {
    id: 'feed-39-why-we-are-here',
    tag: 'Beliefs',
    title: 'Why We Are Here',
    template: 'longform',
    surface: 's-forest',
    caption:
      'We believe in restoring political competition, support credible candidates, and give practical voters across Northwest Oregon a lasting regional voice.\n\nNo community should be conceded before voters have a real choice.\n\n#NorthwestOregonPAC #WhyWeExist #NorthwestOregon #VoterChoice #CompetitiveElections #Election2026',
    data: {
      eyebrow: 'Why we are here',
      paragraphs: [
        'Northwest Oregon should never lose its voice simply because others decided the region was too difficult to compete for.',
      ],
    },
  },
  // #40 — Invest in Northwest Oregon.
  {
    id: 'feed-40-invest',
    tag: 'Support',
    title: 'Invest in Northwest Oregon.',
    template: 'longform',
    caption:
      'Your contribution helps us support candidates, organize volunteers, communicate with voters, and continue building the long-term infrastructure Northwest Oregon deserves.\n\nEvery gift, no matter the size, helps move the mission forward.\n\nSupport Northwest Oregon PAC today.\n\n#Donate #NorthwestOregonPAC #SupportLocalLeadership #Grassroots #Election2026 #NorthwestOregon',
    data: {
      eyebrow: 'Support',
      heading: 'Invest in Northwest Oregon.',
      paragraphs: [
        'Every contribution helps strengthen local campaigns, recruit future leaders, support grassroots volunteers, and expand our reach across the region.',
        'Help build something that lasts.',
      ],
    },
  },
  // #41 — Every contribution builds a stronger Northwest Oregon. $25/$100/$500/$1000
  {
    id: 'feed-41-donate-ladder',
    tag: 'Support',
    title: 'Every contribution builds a stronger Northwest Oregon.',
    template: 'ladder',
    surface: 's-forest',
    caption:
      "Every dollar stays focused on Northwest Oregon, supporting candidates, organizing volunteers, and reaching voters across our region.\n\nWhether it's $25 or $1,000, your contribution helps build lasting political infrastructure.\n\nChip in today and help strengthen Northwest Oregon.\n\n#Donate #NorthwestOregonPAC #SupportLocalLeadership #Election2026 #Grassroots #NorthwestOregon",
    data: {
      eyebrow: 'Donate',
      heading: 'Every contribution builds a stronger Northwest Oregon.',
      amounts: ['$25', '$100', '$500', '$1,000'],
      footer: 'DONATE TODAY',
    },
  },
  // #42 — What does your support make possible?
  {
    id: 'feed-42-support-makes-possible',
    tag: 'Support',
    title: 'What does your support make possible?',
    template: 'checklist',
    caption:
      "Together, we're building the foundation for stronger campaigns and stronger communities across Northwest Oregon.\n\nBe part of the movement.\n\n#NorthwestOregonPAC #Grassroots #CommunityImpact #SupportLocal #Election2026",
    data: {
      eyebrow: 'Your support',
      heading: 'What does your support make possible?',
      items: [
        'Candidate recruitment',
        'Volunteer organization',
        'Community outreach',
        'Voter engagement',
        'Campaign communications',
      ],
    },
  },
  // #43 — Campaigns aren't built in boardrooms.
  {
    id: 'feed-43-not-boardrooms',
    tag: 'Get involved',
    title: "Campaigns aren't built in boardrooms.",
    template: 'longform',
    surface: 's-sand',
    caption:
      'Volunteers are the heart of every successful campaign.\n\nWhether you have one hour or one weekend, your time helps connect candidates with the communities they hope to serve.\n\nJoin our volunteer network.\n\n#Volunteer #NorthwestOregonPAC',
    data: {
      eyebrow: 'Grassroots is where it happens',
      paragraphs: [
        "Campaigns aren't built in boardrooms.",
        "They're built on doorsteps, at community events, and through conversations between neighbors.",
      ],
    },
  },
  // #44 — We don't measure success by headlines.
  {
    id: 'feed-44-not-headlines',
    tag: 'Beliefs',
    title: "We don't measure success by headlines.",
    template: 'longform',
    caption:
      "One election can make a difference.\n\nA stronger political organization can make a difference for generations.\n\nThat's the commitment we're making to Northwest Oregon.\n\n#NorthwestOregonPAC #CommunityLeadership #NorthwestOregon",
    data: {
      eyebrow: 'How we measure',
      paragraphs: [
        "We don't measure success by headlines. We measure it by stronger communities, better candidates, and more engaged citizens.",
      ],
    },
  },
  // #45 — This is bigger than one election.
  {
    id: 'feed-45-bigger-than-one',
    tag: 'Beliefs',
    title: 'This is bigger than one election.',
    template: 'longform',
    surface: 's-forest',
    caption:
      "Northwest Oregon PAC was created with a long-term vision.\n\nTo recruit leaders. Support campaigns. Grow volunteers. Strengthen communities.\n\nAnd ensure Northwest Oregon is never an afterthought again.\n\nJoin us as we build what's next.\n\n#NorthwestOregonPAC #NorthwestOregon #Election2026",
    data: {
      eyebrow: 'Bigger than one election',
      paragraphs: [
        'This is bigger than one election.',
        "It's about building a Northwest Oregon where every community has a voice, every voter has a choice, and every candidate has the opportunity to compete.",
      ],
    },
  },
  // #46 — Raised here. Invested here.
  {
    id: 'feed-46-raised-invested',
    tag: 'Support',
    title: 'Raised here. Invested here.',
    template: 'longform',
    caption:
      'Northwest Oregon should not have to wait for outside organizations to decide our races matter. Local support gives credible candidates the tools to build stronger campaigns.\n\nHelp strengthen the region.\n\n#NorthwestOregonPAC #SupportLocalCandidates #OregonPolitics',
    data: {
      eyebrow: 'Raised here. Invested here.',
      paragraphs: [
        'Local contributions help Northwest Oregon candidates organize, communicate, and compete.',
      ],
    },
  },
  // #47 — Every voter deserves a real choice
  {
    id: 'feed-47-real-choice',
    tag: 'Beliefs',
    title: 'Every voter deserves a real choice.',
    template: 'longform',
    surface: 's-sand',
    caption:
      "Political competition encourages candidates to listen, explain their positions, and earn voters' trust.\n\nNo Northwest Oregon district should be written off in advance.\n\n#VoterChoice #NorthwestOregon #CompetitiveElections #OregonPolitics",
    data: {
      eyebrow: 'Competitive elections',
      paragraphs: [
        'Every voter deserves a real choice, not a race decided before the first ballot is cast.',
      ],
    },
  },
  // #48 — A credible candidate should never have to build alone.
  {
    id: 'feed-48-not-alone',
    tag: 'About',
    title: 'A credible candidate should never have to build alone.',
    template: 'longform',
    caption:
      'Running a serious campaign takes more than determination. It takes organization, resources, and people willing to help.\n\nThat is the infrastructure Northwest Oregon PAC is building.\n\n#CandidateSupport #Northwestoregon',
    data: {
      eyebrow: 'Candidate support',
      paragraphs: [
        'A credible candidate should never have to build alone.',
        'We help candidates strengthen fundraising, messaging, outreach, and volunteer support.',
      ],
    },
  },
  // #49 — Our Priorities · Let builders build.
  {
    id: 'feed-49-let-builders-build',
    tag: 'Issues',
    title: 'Let builders build.',
    template: 'priorityBadge',
    surface: 's-forest',
    caption:
      'Local employers create jobs, support families, and keep communities moving.\n\nPublic policy should make it easier, not harder, or responsible businesses to succeed.\n\n#SmallBusiness #EconomicOpportunity #NorthwestOregonPAC #SupportLocal',
    data: {
      section: 'Our Priorities',
      heading: 'Let builders build.',
      body: 'Northwest Oregon succeeds when entrepreneurs can start, hire, invest, and grow without unnecessary barriers.',
    },
  },
  // #50 — Leadership · Someone should do something
  {
    id: 'feed-50-someone-should',
    tag: 'Get involved',
    title: '"Someone should do something" might be the person who should run.',
    template: 'priorityBadge',
    caption:
      'Northwest Oregon needs capable residents who understand their communities and are ready to serve.\n\nExploring a campaign begins with a conversation, not a commitment.\n\n#RunForOffice #NorthwestOregonPAC #FutureCandidates #PublicService #Election2026',
    data: {
      section: 'Leadership',
      heading: 'The person saying,',
      quote: '"Someone should do something" might be the person who should run.',
      body: 'START THE CONVERSATION',
    },
  },
  // #51 — Northwest Oregon · attention every four years
  {
    id: 'feed-51-every-four-years',
    tag: 'Beliefs',
    title: 'Our communities deserve more than attention every four years.',
    template: 'priorityBadge',
    surface: 's-sand',
    caption:
      'Campaigns come and go, but communities remain. Northwest Oregon deserves leaders who stay engaged long after the votes are counted.\n\n#NorthwestOregon #Leadership #CommunityFirst #NorthwestOregonPAC #Election2026',
    data: {
      section: 'Northwest Oregon',
      heading: 'Our communities deserve more than attention every four years.',
      body: 'They deserve consistent leadership, local investment, and representatives who never stop showing up.',
    },
  },
  // #52 — Local Economy · Every "Open" sign represents someone's dream.
  {
    id: 'feed-52-open-sign',
    tag: 'Issues',
    title: 'Every "Open" sign represents someone\'s dream.',
    template: 'priorityBadge',
    surface: 's-forest',
    caption:
      'When local businesses succeed, they create jobs, strengthen neighborhoods, and invest back into the communities they call home.\n\nSupporting local business is supporting Northwest Oregon.\n\n#SupportLocal #SmallBusiness #NorthwestOregonPAC #EconomicGrowth #NorthwestOregon',
    data: {
      section: 'Local Economy',
      heading: 'Every "Open" sign represents someone\'s dream.',
      body: 'Strong communities are built by entrepreneurs, family businesses, and people willing to take a chance on Northwest Oregon.',
    },
  },
  // #53 — We are building · checklist FOR OREGON
  {
    id: 'feed-53-we-are-building',
    tag: 'About',
    title: 'We are building',
    template: 'checklist',
    caption:
      "Success is measured by what Northwest Oregon looks like five years from now.\n\nThat's the work we're committed to.\n\n#NorthwestOregonPAC #Grassroots #Future #Leadership #Election2026",
    data: {
      eyebrow: 'We are building',
      items: [
        'Stronger candidates',
        'Better organization',
        'More volunteers',
        'Local momentum',
        'A lasting regional voice',
      ],
      footer: 'FOR OREGON',
    },
  },
  // #54 — Northwest Oregon deserves to compete.
  {
    id: 'feed-54-deserves-to-compete',
    tag: 'Beliefs',
    title: 'Northwest Oregon deserves to compete.',
    template: 'stack',
    surface: 's-sand',
    caption:
      "We're working to ensure Northwest Oregon communities always have candidates, conversations, and real choices.\n\nJoin us in this movement.\n\n#NorthwestOregonPAC #Election2026 #CompetitiveElections #NorthwestOregon",
    data: {
      eyebrow: 'Compete',
      heading: 'Northwest Oregon deserves to compete.',
      rows: [
        { k: '·', v: 'Every district.' },
        { k: '·', v: 'Every voter.' },
        { k: '·', v: 'Every election.' },
      ],
    },
  },
  // #55 — Your community needs more than your vote.
  {
    id: 'feed-55-more-than-vote',
    tag: 'Get involved',
    title: 'Your community needs more than your vote.',
    template: 'longform',
    caption:
      'Whether you volunteer once a month or once a week, your involvement helps strengthen campaigns and connect communities.\n\nEveryone has something valuable to contribute.\n\nVolunteer today.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership',
    data: {
      eyebrow: 'Volunteer',
      paragraphs: ['Your community needs more than your vote.'],
    },
  },
  // #56 — We are building beyond Election Day.
  {
    id: 'feed-56-beyond-election-day',
    tag: 'About',
    title: 'We are building beyond Election Day.',
    template: 'longform',
    surface: 's-forest',
    caption:
      'One election cannot build everything Northwest Oregon needs.\n\nOur goal is long-term: develop candidates, organize supporters, strengthen outreach, and ensure this region is never treated as an afterthought again.\n\n#NorthwestOregonPAC #BeyondElectionDay #BuildTheBench',
    data: {
      eyebrow: 'Beyond Election Day',
      paragraphs: [
        'We are building beyond Election Day.',
        'More candidates. More volunteers. Stronger campaigns. A lasting regional voice.',
      ],
    },
  },
  // #57 — Here's what your support makes possible.
  {
    id: 'feed-57-support-list',
    tag: 'Support',
    title: "Here's what your support makes possible.",
    template: 'checklist',
    caption:
      'Every contribution directly supports the work happening across Northwest Oregon, not somewhere else.\n\nThank you for helping build stronger campaigns and stronger communities.\n\nSupport the mission.\n\n#Donatefororegon #NorthwestOregonPAC #SupportLocal #Grassroots #Election2026',
    data: {
      eyebrow: 'Where your support goes',
      heading: "Here's what your support makes possible.",
      items: [
        'Campaign literature.',
        'Community events.',
        'Volunteer training.',
        'Voter outreach.',
        'Candidate support.',
      ],
    },
  },
  // #58 — This is our promise.
  {
    id: 'feed-58-our-promise',
    tag: 'About',
    title: 'This is our promise.',
    template: 'stack',
    surface: 's-forest',
    caption:
      'Northwest Oregon PAC was founded with a long-term commitment, to strengthen our region, support principled candidates, and ensure our communities are never overlooked.\n\nThis is only the beginning.\n\nFollow the journey. Get involved. Help build what\'s next.\n\n#NorthwestOregonPAC #NorthwestOregon #Leadership #Grassroots #Election2026 #CommunityFirst',
    data: {
      eyebrow: 'Our promise',
      heading: 'This is our promise.',
      rows: [
        { k: '·', v: "We'll keep recruiting." },
        { k: '·', v: "We'll keep organizing." },
        { k: '·', v: "We'll keep supporting." },
        { k: '·', v: "We'll keep showing up." },
      ],
      footer: 'For Northwest Oregon.',
    },
  },
  // #59 — Northwest Oregon comes first.
  {
    id: 'feed-59-comes-first',
    tag: 'Beliefs',
    title: 'Northwest Oregon comes first.',
    template: 'longform',
    caption:
      "Our focus has never been on headlines or politics for politics' sake. It's about strengthening Northwest Oregon through practical leadership, competitive candidates, and long-term investment in our communities.\n\n#NorthwestOregonPAC #NorthwestOregon #CommunityFirst #Leadership #Election2026 #StrongerTogether",
    data: {
      eyebrow: 'One question guides every decision',
      paragraphs: [
        'Northwest Oregon comes first.',
        'Every decision we make is guided by one question:',
        'Will this make our communities stronger?',
        "If the answer is yes, we'll fight for it.",
      ],
    },
  },
  // #60 — The decisions we make today shape the opportunities...
  {
    id: 'feed-60-decisions-today',
    tag: 'Beliefs',
    title: 'The decisions we make today shape the opportunities our children inherit tomorrow.',
    template: 'cover',
    surface: 's-forest',
    caption:
      "Every policy, every campaign, and every volunteer effort should leave the next generation with more opportunity than the last.\n\nThat's the future we're working toward.\n\nShare if you believe the next generation deserves our best.\n\n#FutureGenerations #NorthwestOregonPAC",
    data: {
      photo: IMG.community,
      eyebrow: 'For future generations',
      heading: "Let's build a Northwest Oregon they'll be proud to call home.",
      sub: 'The decisions we make today shape the opportunities our children inherit tomorrow.',
    },
  },
]

/* -------------------------------------------------------------------
   STORIES — 30 posts, 1080×1920
   Content matches the PDF's INSTAGRAM STORIES section verbatim.
------------------------------------------------------------------- */
export const stories = [
  {
    id: 'story-01-attention',
    tag: 'Introduction',
    title: 'Attention every four years.',
    template: 'storyCard',
    surface: 's-forest',
    data: {
      lines: [
        'Northwest Oregon deserves more than attention every four years.',
        "We're building something that lasts.",
      ],
      cta: 'Learn More →',
    },
  },
  {
    id: 'story-02-your-future',
    tag: 'Get involved',
    title: 'Your future.',
    template: 'storyCard',
    data: {
      lines: ['Your community.', 'Your voice.', 'Your future.', "Let's build it together."],
      cta: 'Join Us',
    },
  },
  {
    id: 'story-03-voted-poll',
    tag: 'Get involved',
    title: 'Have you voted in a local election recently?',
    template: 'storyPoll',
    surface: 's-sand',
    data: {
      question: 'Have you voted in a local election recently?',
      options: ['Yes', 'Not Yet'],
      note: 'NOTE: Will add instagram ask/poll Sticker',
    },
  },
  {
    id: 'story-04-strong-communities',
    tag: 'Get involved',
    template: 'storyCard',
    surface: 's-forest',
    title: "Strong communities don't happen by chance.",
    data: {
      lines: ["Strong communities don't happen by chance.", 'They happen because people get involved.'],
      cta: 'Volunteer Today',
    },
  },
  {
    id: 'story-05-every-dollar',
    tag: 'Support',
    template: 'storyCard',
    title: 'Every dollar raised.',
    data: {
      lines: ['Every dollar raised stays focused on strengthening Northwest Oregon.'],
      cta: 'Support the Mission',
    },
  },
  {
    id: 'story-06-recruiting',
    tag: 'Candidates',
    template: 'storyCard',
    surface: 's-forest',
    title: "We're recruiting tomorrow's community leaders today.",
    data: {
      lines: [
        "We're recruiting tomorrow's community leaders today.",
        'Could it be you?',
      ],
      cta: "Let's Talk",
    },
  },
  {
    id: 'story-07-hope-support-heard',
    tag: 'Values',
    template: 'storyCard',
    surface: 's-sand',
    title: 'Hope. Support. Heard.',
    data: {
      lines: ['Hope.', 'Support.', 'Heard.', "That's the movement we're building."],
    },
  },
  {
    id: 'story-08-every-volunteer',
    tag: 'Get involved',
    template: 'storyCard',
    title: 'Every volunteer makes a difference.',
    data: {
      lines: [
        'Every volunteer makes a difference.',
        'No experience required.',
        'Just a willingness to serve.',
      ],
    },
  },
  {
    id: 'story-09-issue-poll',
    tag: 'Values',
    template: 'storyPoll',
    surface: 's-forest',
    title: "What's most important for Northwest Oregon?",
    data: {
      question: "What's most important for Northwest Oregon?",
      options: ['Economic Growth', 'Community Safety'],
      note: 'NOTE: Will add instagram poll Sticker',
    },
  },
  {
    id: 'story-10-campaigns-remain',
    tag: 'Beliefs',
    template: 'storyCard',
    surface: 's-sand',
    title: 'Campaigns come and go. Strong communities remain.',
    data: {
      lines: [
        'Campaigns come and go.',
        'Strong communities remain.',
        "That's why we're investing for the long term.",
      ],
    },
  },
  {
    id: 'story-11-one-conversation',
    tag: 'Get involved',
    template: 'storyCard',
    surface: 's-forest',
    title: 'One conversation can change a campaign.',
    data: {
      lines: [
        'One conversation can change a campaign.',
        'One volunteer can inspire a community.',
      ],
    },
  },
  {
    id: 'story-12-leadership-listening',
    tag: 'Values',
    template: 'storyCard',
    title: 'Leadership starts with listening.',
    data: {
      lines: ['Leadership starts with listening.', 'Then it grows through action.'],
    },
  },
  {
    id: 'story-13-future-belongs',
    tag: 'Introduction',
    template: 'storyCard',
    surface: 's-forest',
    title: 'The future of Northwest Oregon belongs to those willing to build it.',
    data: {
      lines: ['The future of Northwest Oregon belongs to those willing to build it.'],
    },
  },
  {
    id: 'story-14-every-town',
    tag: 'Beliefs',
    template: 'storyCard',
    title: 'We believe every town deserves a voice.',
    data: {
      lines: ['We believe every town deserves a voice.', 'Not just the biggest ones.'],
    },
  },
  {
    id: 'story-15-issue-question',
    tag: 'Values',
    template: 'storyPoll',
    surface: 's-sand',
    title: 'What issue matters most in your community?',
    data: {
      question: 'What issue matters most in your community?',
      options: ['Tell us below'],
      note: 'NOTE: Will add instagram ask Sticker',
    },
  },
  {
    id: 'story-16-supporting-local',
    tag: 'Introduction',
    template: 'storyCard',
    surface: 's-forest',
    title: 'Supporting local candidates.',
    data: {
      lines: [
        'Supporting local candidates.',
        'Building stronger campaigns.',
        'Growing stronger communities.',
      ],
    },
  },
  {
    id: 'story-17-dont-need-office',
    tag: 'Get involved',
    template: 'storyCard',
    title: "You don't have to run for office to make a difference.",
    data: {
      lines: [
        "You don't have to run for office to make a difference.",
        'You simply have to get involved.',
      ],
    },
  },
  {
    id: 'story-18-neighbors-thrive',
    tag: 'Introduction',
    template: 'storyCard',
    surface: 's-forest',
    title: 'Communities thrive when neighbors work together.',
    data: {
      lines: [
        'Communities thrive when neighbors work together.',
        "That's how lasting change begins.",
      ],
    },
  },
  {
    id: 'story-19-volunteer-poll',
    tag: 'Get involved',
    template: 'storyPoll',
    title: 'Would you volunteer for a local campaign?',
    data: {
      question: 'Would you volunteer for a local campaign?',
      options: ['Absolutely', 'I would Like More Info'],
      note: 'NOTE: Will add instagram poll Sticker',
    },
  },
  {
    id: 'story-20-every-donation',
    tag: 'Support',
    template: 'storyCard',
    surface: 's-sand',
    title: 'Every donation helps build long-term political infrastructure across Northwest Oregon.',
    data: {
      lines: [
        'Every donation helps build long-term political infrastructure across Northwest Oregon.',
      ],
    },
  },
  {
    id: 'story-21-leadership-not-titles',
    tag: 'Values',
    template: 'storyCard',
    surface: 's-forest',
    title: "Leadership isn't about titles.",
    data: {
      lines: ["Leadership isn't about titles.", "It's about serving your community."],
    },
  },
  {
    id: 'story-22-worth-investing',
    tag: 'Support',
    template: 'storyCard',
    title: 'Northwest Oregon is worth investing in.',
    data: {
      lines: ['Northwest Oregon is worth investing in.', 'Today.', 'Tomorrow.', 'Every year.'],
    },
  },
  {
    id: 'story-23-small-businesses',
    tag: 'Issues',
    template: 'storyCard',
    surface: 's-forest',
    title: 'Small businesses. Strong families. Thriving communities.',
    data: {
      lines: [
        'Small businesses.',
        'Strong families.',
        'Thriving communities.',
        "That's worth protecting.",
      ],
    },
  },
  {
    id: 'story-24-brian-schimmel',
    tag: 'Candidates',
    template: 'storyCandidate',
    surface: 's-sand',
    title: 'Meet Brian Schimmel.',
    data: {
      slug: 'brian-schimmel',
      heading: 'Meet Brian Schimmel.',
      subhead: 'Candidate for Oregon House District 29',
      lines: [
        'Committed to service.',
        'Committed to the community.',
        'Committed to Northwest Oregon.',
      ],
    },
  },
  {
    id: 'story-25-randall-fryer',
    tag: 'Candidates',
    template: 'storyCandidate',
    surface: 's-forest',
    title: 'Randall Fryer',
    data: {
      slug: 'randall-fryer',
      heading: '"Randall Fryer"',
      subhead: 'Backed BY',
      brand: 'NORTHWEST OREGON PAC',
      lines: ['Working to strengthen Northwest Oregon.'],
    },
  },
  {
    id: 'story-26-run-question',
    tag: 'Candidates',
    template: 'storyPoll',
    title: 'Would you ever consider running for local office?',
    data: {
      question: 'Would you ever consider running for local office?',
      options: ['Tell us why or why not.'],
      note: 'NOTE: Will add instagram ask Sticker',
    },
  },
  {
    id: 'story-27-mark-norman',
    tag: 'Candidates',
    template: 'storyCandidate',
    surface: 's-forest',
    title: 'Northwest Oregon PAC proudly supports Mark Norman.',
    data: {
      slug: 'mark-norman',
      heading: 'Mark Norman',
      subhead: 'Northwest Oregon PAC proudly supports',
      lines: ['Because stronger communities deserve dedicated representation.'],
    },
  },
  {
    id: 'story-28-barbara-kahl',
    tag: 'Candidates',
    template: 'storyPoll',
    surface: 's-sand',
    title: 'Have you met Barbara Kahl?',
    data: {
      question: 'Have you met',
      subquestion: 'Barbara Kahl?',
      options: ['Yes', 'I would Like To'],
      note: 'NOTE: Will add instagram poll Sticker',
    },
  },
  {
    id: 'story-29-ciatta-thompson',
    tag: 'Candidates',
    template: 'storyCandidate',
    title: 'Every volunteer strengthens a campaign.',
    data: {
      slug: 'ciatta-thompson',
      heading: 'Every volunteer strengthens a campaign.',
      subhead: 'Help support Ciatta Thompson today.',
      lines: ['Move Northwest Oregon forward.'],
    },
  },
  {
    id: 'story-30-hope-support-heard',
    tag: 'Values',
    template: 'storyCard',
    surface: 's-forest',
    title: 'Hope · Support · Heard',
    data: {
      lines: ["Together, we're building a stronger Northwest Oregon."],
      pill: 'Hope • Support • Heard',
      cta: 'Follow • Volunteer • Donate',
    },
  },
]

/* -------------------------------------------------------------------
   CAROUSELS — 10 sets, exact PDF slide text
------------------------------------------------------------------- */
export const carousels = [
  {
    id: 'carousel-01-meet-the-pac',
    tag: 'Introduction',
    title: 'For Northwest Oregon',
    caption:
      'Northwest Oregon PAC was created because too many communities across our region have been overlooked and underinvested in. We believe every voter deserves real choices, every community deserves to be heard, and every credible candidate deserves the opportunity to compete.\n\nWe\'re building a stronger future for Northwest Oregon.\n\n#NorthwestOregonPAC #NorthwestOregon #GrassrootsLeadership #Election2026',
    slides: [
      {
        template: 'cover',
        surface: 's-forest',
        data: {
          photo: 'banner.jpg',
          eyebrow: 'Slide 1',
          heading: 'FOR NORTHWEST OREGON',
          sub: 'Learn why our work matters.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          heading: 'Northwest Oregon has too often been overlooked.',
          paragraphs: [
            'Communities across our region have been treated as "uncompetitive," leaving voters with fewer resources, less engagement, and fewer opportunities to build lasting political momentum.',
          ],
        },
      },
      {
        template: 'headline',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'We believe every community',
          headingLine2: 'deserves investment.',
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: "Elections don't become competitive by accident.",
          subhead: 'It takes:',
          items: [
            'Candidate recruitment',
            'Volunteer networks',
            'Community partnerships',
            'Local fundraising',
            'Long-term commitment',
          ],
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 5',
          paragraphs: [
            'We help build the foundation that allows strong candidates and dedicated volunteers to succeed, not just for one election, but for years to come.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'We want a Northwest Oregon where:',
          items: [
            'Communities are heard',
            'Candidates are supported',
            'Elections are competitive',
            'Local voices matter',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 7',
          heading: 'Join the movement.',
          items: ['Volunteer.', 'Support.', 'DONATE'],
        },
      },
    ],
  },
  {
    id: 'carousel-02-competitive-elections',
    tag: 'Issues',
    title: 'Competitive Elections Build Better Communities',
    caption:
      'Healthy democracy depends on competitive elections. When candidates earn support instead of expecting it, communities benefit through stronger ideas, greater accountability, and more engaged voters.\n\nNorthwest Oregon deserves elections where every community has a voice and every voter has a meaningful choice.\n\n#CompetitiveElections #NorthwestOregonPAC #NorthwestOregon #Election2026',
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Competitive Elections',
          headingLine2: 'Build Better Communities',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2 · When elections are competitive',
          paragraphs: [
            'Candidates spend more time listening to voters instead of taking support for granted.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'Competitive races encourage',
          items: [
            'Better conversations',
            'Better ideas',
            'Greater accountability',
            'Higher voter participation',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          paragraphs: [
            'Communities benefit when every candidate has the opportunity to earn support, not when races are decided before campaigns begin.',
          ],
        },
      },
      {
        template: 'headline',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Northwest Oregon deserves real choices.',
          lines: ['Not predetermined outcomes.', 'Not forgotten communities.'],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6 · That requires people willing to',
          items: [
            'Volunteer',
            'Donate',
            'Organize',
            'Vote',
            'Encourage others to participate',
          ],
          bullet: '•',
        },
      },
      {
        template: 'cta',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 7',
          heading: 'Strong elections begin with strong communities.',
          sub: 'Help us strengthen Northwest Oregon.',
          items: ['northwestoregon.com'],
        },
      },
    ],
  },
  {
    id: 'carousel-03-where-donation-goes',
    tag: 'Support',
    title: 'Where Does Your Donation Go?',
    caption:
      'Every contribution to Northwest Oregon PAC helps strengthen the foundation for long-term success. From recruiting candidates and organizing volunteers to supporting voter outreach and campaign communications, your investment stays focused on Northwest Oregon.\n\nTogether, we\'re building lasting political infrastructure that serves our communities, not just during election season, but every year.\n\nMake your contribution today and help strengthen Northwest Oregon.\n\n#DonateLocal #NorthwestOregonPAC #GrassrootsSupport #NorthwestOregon #Election2026 #SupportLocalLeadership',
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Where Does Your Donation Go?',
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 2 · Recruiting Leaders',
          paragraphs: [
            'Finding and encouraging qualified candidates who care deeply about Northwest Oregon and are ready to serve.',
          ],
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 3',
          heading: 'Building Campaigns',
          paragraphs: [
            'Supporting campaign communications, voter outreach, and grassroots organization that help candidates connect with their communities.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'Growing Volunteer Networks',
          paragraphs: [
            'Providing the tools and coordination needed to bring volunteers together for meaningful local action.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Investing in Long-Term Success',
          paragraphs: [
            "We're building political infrastructure that continues long after one election cycle ends.",
          ],
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Every contribution matters.',
          paragraphs: [
            "Whether you give $25 or $1,000, you're helping build stronger campaigns and stronger communities throughout Northwest Oregon.",
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Support',
          heading: 'Support Northwest Oregon PAC',
        },
      },
    ],
  },
  {
    id: 'carousel-04-next-community-leader',
    tag: 'Candidates',
    title: 'Could You Be the Next Community Leader?',
    caption:
      "If you've ever thought, \"Someone should step up,\" maybe it's time to have a conversation. Running for office starts with listening, not with paperwork.\n\nKnow someone who would make a great local leader? Tag them below.\n\n#NorthwestOregonPAC #RunForOffice #Leadership #CommunityLeadership #NorthwestOregon #Election2026 #ServeYourCommunity #FutureLeaders",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Could You Be the Next Community Leader?',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            'Many great candidates never planned to run for office.',
            'They simply cared enough about their community to step forward.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: "You don't need to have all the answers.",
          subhead: 'You need:',
          items: ['Integrity', 'A willingness to listen', 'A desire to serve', 'The commitment to learn'],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'Northwest Oregon needs leaders from every community.',
          items: [
            'Teachers.',
            'Small business owners.',
            'Veterans.',
            'Parents.',
            'Farmers.',
            'Community volunteers.',
          ],
          footer: 'Leadership comes from every walk of life.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 5',
          heading: "You won't do it alone.",
          paragraphs: [
            'Northwest Oregon PAC works to connect prospective candidates with guidance, resources, and a network of people who believe our communities deserve strong representation.',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Ready to explore?',
          sub: "Let's talk.",
        },
      },
    ],
  },
  {
    id: 'carousel-05-every-volunteer',
    tag: 'Get involved',
    title: 'Every Volunteer Makes a Difference',
    caption:
      "Whether you can help for one afternoon or one season, there's a place for you.\n\nSend us a message to learn how you can get involved.\n\n#Volunteer #NorthwestOregonPAC #Grassroots #CommunityLeadership #Election2026",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Every Volunteer Makes a Difference',
        },
      },
      {
        template: 'checklist',
        data: {
          eyebrow: 'Slide 2 · There are countless ways to help.',
          items: [
            'Community events',
            'Voter outreach',
            'Phone banking',
            'Door knocking',
            'Photography',
            'Social media',
            'Administrative support',
          ],
          bullet: '•',
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          paragraphs: [
            'Even a few hours each month can make a real difference.',
            'Small contributions of time create lasting momentum.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          paragraphs: [
            'Every campaign is powered by neighbors helping neighbors.',
            "Not because they're paid.",
            'Because they care.',
          ],
        },
      },
      {
        template: 'cta',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Northwest Oregon needs people willing to show up.',
          sub: 'Join our volunteer network.',
          items: ['Help strengthen your community.'],
        },
      },
    ],
  },
  {
    id: 'carousel-06-what-we-believe',
    tag: 'Beliefs',
    title: 'WHAT WE BELIEVE',
    caption:
      "Everything Northwest Oregon PAC does is rooted in one goal: strengthening our region through principled leadership, community involvement, and long-term investment in competitive local elections.\n\nOur mission isn't just about winning campaigns—it's about building stronger communities for years to come.\n\nWhich of these principles resonates with you the most? Tell us in the comments.\n\n#NorthwestOregonPAC #NorthwestOregon",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'WHAT WE BELIEVE',
          sub: 'The principles that guide Northwest Oregon PAC.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          heading: 'We believe every community deserves a voice.',
          paragraphs: [
            "No town should be overlooked because someone decided it wasn't competitive enough.",
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: 'We believe local leadership matters.',
          paragraphs: [
            'The people who know a community best are the people who live there, work there, and raise their families there.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'We believe strong campaigns require strong foundations.',
          items: [
            'Candidates need volunteers.',
            'Volunteers need organization.',
            'Communities need long-term investment.',
          ],
          bullet: '·',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 5',
          paragraphs: [
            "We believe political engagement shouldn't end after Election Day.",
            'Building stronger communities is year-round work.',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 6',
          heading: 'Hope. Support. Heard.',
          sub: "Together, we're building a stronger Northwest Oregon.",
        },
      },
    ],
  },
  {
    id: 'carousel-07-why-local',
    tag: 'Beliefs',
    title: 'Why Local Elections Matter',
    caption:
      "The elections that shape our daily lives often receive the least attention. We're working to change that by building stronger local campaigns, supporting principled candidates, and encouraging more people to get involved across Northwest Oregon.\n\nShare this with someone who believes local leadership matters.\n\n#NorthwestOregonPAC #LocalLeadership #CommunityFirst #Election2026",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Why Local Elections Matter',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          heading: 'Local decisions shape everyday life.',
          paragraphs: [
            'From roads and public safety to schools and community growth, local leaders make decisions that directly affect Northwest Oregon families.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          heading: "Strong local leadership doesn't happen overnight.",
          paragraphs: [
            'It takes prepared candidates, informed voters, engaged volunteers, and organizations committed to building long-term success.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: "That's why Northwest Oregon PAC exists.",
          paragraphs: [
            'To recruit leaders, strengthen campaigns, organize volunteers, and help communities become more engaged in the political process.',
          ],
        },
      },
      {
        template: 'cta',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Better communities begin with local leadership.',
          sub: 'Join Northwest Oregon PAC and help build a stronger future.',
          items: ['northwestoregon.com'],
        },
      },
    ],
  },
  {
    id: 'carousel-08-meet-the-pac',
    tag: 'About',
    title: 'Meet Northwest Oregon PAC',
    caption:
      "Northwest Oregon PAC is focused on one mission: helping our region build stronger candidates, stronger campaigns, and stronger communities. Everything we do is centered on creating lasting opportunities for Northwest Oregon, not just during election season, but every day.\n\n#NorthwestOregonPAC #NorthwestOregon #CommunityLeadership",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Meet Northwest Oregon PAC',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2 · We invest in people.',
          paragraphs: [
            'We identify and support candidates who are committed to serving Northwest Oregon with integrity, accountability, and practical leadership.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3 · We invest in communities.',
          paragraphs: [
            'Our work includes volunteer recruitment, voter outreach, campaign support, and long-term regional organization.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4 · We invest in the future.',
          paragraphs: [
            "Our mission extends beyond one election. We're building lasting political infrastructure that benefits Northwest Oregon for years to come.",
          ],
        },
      },
      {
        template: 'cta',
        data: {
          eyebrow: 'Slide 5',
          heading: 'Hope. Support. Heard.',
          sub: 'Join the movement and help strengthen Northwest Oregon.',
        },
      },
    ],
  },
  {
    id: 'carousel-09-small-business',
    tag: 'Issues',
    title: 'Small Business Drives Northwest Oregon',
    caption:
      "Our communities are stronger when entrepreneurs, family-owned businesses, and local employers have the opportunity to succeed. Supporting economic opportunity means supporting Northwest Oregon's future.\n\n#SupportLocal #NorthwestOregonPAC #SmallBusiness #EconomicOpportunity #NorthwestOregon #CommunityGrowth #ShopLocal",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'Small Business Drives Northwest Oregon',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            'Behind every local business is someone willing to invest in Northwest Oregon, creating jobs, serving neighbors, and strengthening our local economy.',
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          paragraphs: [
            'Public policy should encourage entrepreneurship, reduce unnecessary barriers, and create an environment where local businesses can grow with confidence.',
          ],
        },
      },
      {
        template: 'cta',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'When local businesses thrive, Northwest Oregon thrives.',
          sub: "Let's build an environment where opportunity can grow.",
        },
      },
    ],
  },
  {
    id: 'carousel-10-this-movement',
    tag: 'Introduction',
    title: 'THIS MOVEMENT BELONGS TO NORTHWEST OREGON.',
    caption:
      "Northwest Oregon PAC isn't built by one person or one campaign. It's built by people who believe our communities deserve a stronger voice, competitive elections, and leaders who are invested in the region's future.\n\nEvery action matters, and there's a place for everyone in this movement.\n\nFollow us, get involved, and help build what's next.\n\n#NorthwestOregonPAC #NorthwestOregon #GetInvolved #Grassroots #Leadership #Election2026 #CommunityFirst #PoliticalAction",
    slides: [
      {
        template: 'headline',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 1',
          heading: 'THIS MOVEMENT BELONGS TO NORTHWEST OREGON.',
        },
      },
      {
        template: 'longform',
        data: {
          eyebrow: 'Slide 2',
          paragraphs: [
            "Whether you volunteer, donate, attend events, or simply share our message, you're helping strengthen communities across our region.",
          ],
        },
      },
      {
        template: 'longform',
        surface: 's-sand',
        data: {
          eyebrow: 'Slide 3',
          paragraphs: [
            'Real change happens when neighbors work together with a shared purpose and a long-term commitment to their communities.',
          ],
        },
      },
      {
        template: 'checklist',
        surface: 's-forest',
        data: {
          eyebrow: 'Slide 4',
          heading: 'Help write the next chapter for Northwest Oregon.',
          items: ['Volunteer', 'Donate', 'Stay Connected', 'Get Involved'],
          footer: 'northwestoregon.com',
        },
      },
    ],
  },
]

// App-card captions come from the PDF "Caption" column directly on each
// post above — the generator reads them off `post.caption`.
export const feedCaptions = Object.fromEntries(
  feed.filter((p) => p.caption).map((p) => [p.id, p.caption]),
)
