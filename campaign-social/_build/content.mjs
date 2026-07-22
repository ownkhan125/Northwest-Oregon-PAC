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
      "Become a volunteer today. Whether it's volunteering at events, talking with neighbours, or supporting local candidates, every effort helps strengthen Northwest Oregon.\n\nJoin us and be part of the movement.\n\n#Volunteer #NorthwestOregonPAC #GetInvolved #Grassroots #CommunityLeadership #Election2026",
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
      lines: ['Meet candidates.', 'Meet neighbours.', 'Join the conversation.'],
    },
  },
  // #35 — Host a meet-up. Invite your neighbours.
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
      heading: 'Host a meet-up. Invite your neighbours.',
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
      'This movement is powered by volunteers, supporters, local businesses, donors, and neighbours who believe Northwest Oregon deserves a stronger future.\n\nThank you for being part of it.\n\n#NorthwestOregonPAC #CommunityFirst #Grassroots #Volunteer #Leadership',
    data: {
      eyebrow: 'A movement of neighbours',
      paragraphs: [
        "Northwest Oregon isn't changing because of one candidate.",
        "It's changing because neighbours are choosing to get involved.",
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
        "They're built on doorsteps, at community events, and through conversations between neighbours.",
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
      blur: true,
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
  /* ------------------------------------------------------------
     STORY 01 — "Attention every four years"
     Creative direction: editorial split — cinematic Oregon landscape
     on top half, hand-torn deckle edge, cream page below with a big
     serif manifesto. Feels like a magazine cover, not a template.
  ------------------------------------------------------------ */
  {
    id: 'story-01-attention',
    tag: 'Introduction',
    title: 'Attention every four years.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s01 { position:absolute; inset:0; z-index:10; display:flex; flex-direction:column; background:#f6f2e8; }
        .s01-photo { position:relative; height:56%; overflow:hidden; background:#0f1a13; }
        .s01-photo img { width:100%; height:100%; object-fit:cover; filter:saturate(0.72) contrast(1.18) brightness(0.86); }
        .s01-photo::after {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(110% 90% at 30% 15%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 100%),
            linear-gradient(180deg, rgba(15,26,19,.1) 0%, rgba(15,26,19,.35) 60%, rgba(15,26,19,.9) 100%);
        }
        .s01-mast { position:absolute; top:64px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; color:#e0d6bc; font-family:var(--font-mono); font-size:20px; letter-spacing:.32em; text-transform:uppercase; text-shadow:0 2px 20px rgba(0,0,0,.5); }
        .s01-mast img { height:76px; width:auto; filter:drop-shadow(0 2px 22px rgba(0,0,0,.5)); }
        .s01-photo-label { position:absolute; left:80px; bottom:60px; z-index:5; display:flex; flex-direction:column; gap:14px; color:#e0d6bc; text-shadow:0 2px 20px rgba(0,0,0,.55); }
        .s01-photo-label .kick { font-family:var(--font-mono); font-size:22px; letter-spacing:.42em; text-transform:uppercase; opacity:.9; }
        .s01-photo-label .place { font-family:var(--font-display); font-style:italic; font-size:38px; letter-spacing:-.01em; }
        /* Torn paper edge — pronounced hand-torn deckle */
        .s01-tear {
          position:absolute; left:0; right:0; height:72px; z-index:4;
          top: calc(56% - 40px);
          background:#f6f2e8;
          -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 72' preserveAspectRatio='none'><path d='M0 72 L0 46 C 30 18 70 60 118 32 C 168 8 210 54 262 26 C 310 4 358 46 410 22 C 462 2 508 40 560 20 C 616 4 660 42 712 24 C 766 8 810 40 860 22 C 912 6 962 42 1010 26 C 1042 16 1064 34 1080 24 L1080 72 Z' fill='black'/></svg>");
          mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 72' preserveAspectRatio='none'><path d='M0 72 L0 46 C 30 18 70 60 118 32 C 168 8 210 54 262 26 C 310 4 358 46 410 22 C 462 2 508 40 560 20 C 616 4 660 42 712 24 C 766 8 810 40 860 22 C 912 6 962 42 1010 26 C 1042 16 1064 34 1080 24 L1080 72 Z' fill='black'/></svg>");
          -webkit-mask-size:100% 100%; mask-size:100% 100%;
          filter: drop-shadow(0 -3px 10px rgba(0,0,0,.2));
        }
        /* Fine paper fibre texture at the tear */
        .s01-tear::after {
          content:''; position:absolute; inset:0;
          background:
            repeating-linear-gradient(90deg, rgba(140,120,80,0) 0 2px, rgba(140,120,80,.06) 2px 3px),
            linear-gradient(180deg, rgba(180,160,110,.18) 0%, rgba(180,160,110,0) 60%);
          mix-blend-mode:multiply;
        }
        .s01-page { position:relative; flex:1; padding:80px 90px 140px; display:flex; flex-direction:column; gap:38px; background:#f6f2e8; }
        .s01-page::before {
          content:''; position:absolute; top:0; bottom:120px; left:60px; width:2px;
          background:linear-gradient(180deg, rgba(46,69,56,.5) 0%, rgba(46,69,56,0) 92%);
        }
        .s01-issue { display:flex; align-items:baseline; gap:20px; font-family:var(--font-mono); font-size:20px; letter-spacing:.4em; text-transform:uppercase; color:#4b6252; }
        .s01-issue .no { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:44px; letter-spacing:-.02em; color:#2e4538; text-transform:none; }
        .s01-issue .rule { display:inline-block; width:44px; height:1px; background:#4b6252; opacity:.6; }
        .s01-lede { font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; max-width:900px; }
        .s01-lede em { font-style:italic; color:#5a7060; font-weight:500; }
        .s01-sub { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; line-height:1.22; color:#4b6252; max-width:820px; margin-top:4px; }
        .s01-foot { position:absolute; left:90px; right:90px; bottom:70px; display:flex; align-items:flex-end; justify-content:space-between; gap:32px; padding-top:24px; border-top:1px solid rgba(46,69,56,.2); }
        .s01-foot .cta { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:42px; color:#2e4538; letter-spacing:-.01em; display:inline-flex; align-items:center; gap:20px; }
        .s01-foot .cta .arrow { display:inline-flex; align-items:center; justify-content:center; width:68px; height:68px; border-radius:999px; background:#2e4538; color:#f6f2e8; font-family:var(--font-sans); font-size:30px; box-shadow:0 12px 30px -14px rgba(46,69,56,.55); }
        .s01-foot .meta { font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,69,56,.5); text-align:right; line-height:1.9; max-width:280px; }
      `,
      body: (ctx) => `
        <div class="s01">
          <div class="s01-photo">
            <img src="${ctx.prefix}img/banner.jpg" alt="Northwest Oregon landscape" />
            <div class="s01-mast">
              <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
              <span>Vol. 01 · The Region</span>
            </div>
            <div class="s01-photo-label">
              <span class="kick">— Field notes</span>
              <span class="place">Northwest Oregon, at dusk.</span>
            </div>
          </div>
          <div class="s01-tear" aria-hidden="true"></div>
          <div class="s01-page">
            <div class="s01-issue">
              <span class="no">No. 01</span>
              <span class="rule"></span>
              <span>Manifesto</span>
            </div>
            <p class="s01-lede">Northwest Oregon deserves more than <em>attention every four years.</em></p>
            <p class="s01-sub">We're building something that lasts.</p>
            <div class="s01-foot">
              <span class="cta">Learn more <span class="arrow">→</span></span>
              <span class="meta">Paid for by Northwest Oregon PAC #25045<br />northwestoregon.com</span>
            </div>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 02 — "Your community. Your voice. Your future."
     Creative direction: typographic-only poster. Four lines that
     grow as you read. Cinema-style vertical rule on the left. The
     CTA is a floating pill, not a text link.
  ------------------------------------------------------------ */
  {
    id: 'story-02-your-future',
    tag: 'Get involved',
    title: 'Your future.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s02 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 80% at 12% 8%, rgba(90,112,96,.6) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.95) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f6f2e8;
        }
        .s02::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(2px 2px at 20% 15%, rgba(224,214,188,.35), transparent 60%),
            radial-gradient(2px 2px at 78% 8%, rgba(224,214,188,.25), transparent 60%),
            radial-gradient(1.5px 1.5px at 62% 88%, rgba(224,214,188,.3), transparent 60%),
            radial-gradient(2px 2px at 8% 74%, rgba(224,214,188,.2), transparent 60%);
          opacity:.7;
          pointer-events:none;
        }
        .s02-mast { position:absolute; top:78px; left:96px; right:96px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; color:#e0d6bc; font-family:var(--font-mono); font-size:16px; letter-spacing:.36em; text-transform:uppercase; }
        .s02-mast img { height:66px; width:auto; }
        .s02-mast .filing { color:rgba(224,214,188,.6); }
        /* Numbered corner mark */
        .s02-number {
          position:absolute; left:96px; top:220px; z-index:5;
          font-family:var(--font-display); font-style:italic; font-weight:400;
          font-size:32px; letter-spacing:-.02em; color:#e0d6bc;
          display:flex; align-items:baseline; gap:20px;
        }
        .s02-number .n { font-size:88px; font-style:italic; }
        .s02-number .label { font-family:var(--font-mono); font-style:normal; font-size:18px; letter-spacing:.42em; text-transform:uppercase; color:rgba(224,214,188,.7); }
        /* Long vertical rule anchoring the left column */
        .s02-rule {
          position:absolute; left:120px; top:400px; bottom:340px; width:2px; z-index:4;
          background:linear-gradient(180deg, rgba(224,214,188,.6), rgba(224,214,188,0) 96%);
        }
        /* Stanza — the four ascending lines */
        .s02-stanza { position:absolute; left:180px; right:96px; top:440px; z-index:5; display:flex; flex-direction:column; gap:22px; font-family:var(--font-display); font-weight:500; letter-spacing:-.024em; line-height:.98; }
        .s02-stanza .l1 { font-size:104px; color:#e0d6bc; }
        .s02-stanza .l2 { font-size:118px; color:#e0d6bc; }
        .s02-stanza .l3 { font-size:132px; color:#f6f2e8; font-style:italic; }
        .s02-stanza .l4 { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:46px; color:rgba(224,214,188,.82); letter-spacing:-.015em; line-height:1.24; margin-top:26px; max-width:820px; }
        /* CTA pill */
        .s02-cta {
          position:absolute; left:96px; bottom:130px; z-index:6; display:inline-flex; align-items:center; gap:24px;
          padding:24px 36px 24px 44px; border-radius:999px;
          background:#f6f2e8; color:#2e4538;
          font-family:var(--font-mono); font-size:20px; letter-spacing:.36em; text-transform:uppercase; font-weight:500;
          box-shadow:0 26px 60px -22px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.6);
        }
        .s02-cta .dot { display:inline-block; width:12px; height:12px; border-radius:999px; background:#2e4538; }
        .s02-cta .arrow-box { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:999px; background:#2e4538; color:#f6f2e8; font-family:var(--font-sans); font-size:22px; letter-spacing:0; }
        /* Footer rail */
        .s02-foot {
          position:absolute; left:96px; right:96px; bottom:70px; z-index:6;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(224,214,188,.55);
        }
        .s02-foot .rule { flex:1; height:1px; background:linear-gradient(90deg, rgba(224,214,188,.35), rgba(224,214,188,0)); margin:0 24px; }
      `,
      body: (ctx) => `
        <div class="s02">
          <div class="s02-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span class="filing">Committee #25045 · Est. 2026</span>
          </div>
          <div class="s02-number">
            <span class="n">02</span>
            <span class="label">Rally</span>
          </div>
          <div class="s02-rule" aria-hidden="true"></div>
          <div class="s02-stanza">
            <span class="l1">Your community.</span>
            <span class="l2">Your voice.</span>
            <span class="l3">Your future.</span>
            <span class="l4">Let's build it together.</span>
          </div>
          <span class="s02-cta">
            <span class="dot"></span>
            Join Us
            <span class="arrow-box">→</span>
          </span>
          <div class="s02-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span class="rule"></span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 03 — Poll: "Have you voted in a local election recently?"
     Creative direction: composed as an Oregon vote-by-mail ballot
     object. Perforated top, mono ballot header, editorial question,
     two options rendered as real ballot ovals. Taped-on margin
     note calls out the IG poll sticker placement.
  ------------------------------------------------------------ */
  {
    id: 'story-03-voted-poll',
    tag: 'Get involved',
    title: 'Have you voted in a local election recently?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s03 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(224,214,188,.4) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e8dfc4 100%);
        }
        /* Ballot card — a floating document */
        .s03-card {
          position:absolute; top:170px; bottom:220px; left:80px; right:80px; z-index:5;
          background:#f6f2e8;
          box-shadow:
            0 40px 90px -40px rgba(46,42,20,.35),
            0 8px 24px -12px rgba(46,42,20,.2);
          border-radius:6px;
          transform:rotate(-1.4deg);
          transform-origin:center;
        }
        /* Perforated top edge on the ballot */
        .s03-perf {
          position:absolute; top:-1px; left:0; right:0; height:22px;
          background-image: radial-gradient(circle at 12px 11px, #e8dfc4 5px, transparent 5.4px);
          background-size:24px 22px; background-position:6px 0;
        }
        .s03-perf-line { position:absolute; top:22px; left:20px; right:20px; height:1px; background:repeating-linear-gradient(90deg, rgba(46,42,20,.35) 0 8px, transparent 8px 14px); }
        .s03-header { position:absolute; top:80px; left:64px; right:64px; display:flex; align-items:flex-start; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:15px; letter-spacing:.32em; text-transform:uppercase; color:#4b6252; }
        .s03-header .title { font-weight:500; max-width:340px; line-height:1.6; }
        .s03-header .meta { text-align:right; color:rgba(46,42,20,.55); line-height:1.7; }
        .s03-header .meta .id { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; display:block; margin-bottom:6px; }
        .s03-rule { position:absolute; top:200px; left:64px; right:64px; height:2px; background:#2e4538; }
        .s03-issue { position:absolute; top:232px; left:64px; right:64px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.55); display:flex; justify-content:space-between; }
        /* Editorial question */
        .s03-q { position:absolute; top:320px; left:64px; right:64px; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.02em; color:#2e4538; }
        .s03-q em { font-style:italic; font-weight:500; color:#5a7060; }
        .s03-q .qmark { display:block; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); margin-bottom:22px; }
        /* Ballot options */
        .s03-opts { position:absolute; left:64px; right:64px; top:720px; display:flex; flex-direction:column; gap:34px; }
        .s03-opt { display:flex; align-items:center; gap:36px; padding:32px 40px 32px 32px; border:1.5px solid rgba(46,42,20,.35); border-radius:2px; background:rgba(253,250,241,1); }
        .s03-opt .oval {
          flex:none; width:56px; height:80px; border:3px solid #2e4538; border-radius:999px;
          display:flex; align-items:center; justify-content:center;
        }
        .s03-opt.filled .oval { background:#2e4538; }
        .s03-opt .mark { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:56px; color:#f6f2e8; line-height:1; padding-bottom:4px; }
        .s03-opt .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:56px; letter-spacing:-.015em; color:#2e4538; }
        .s03-opt .sub { font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.5); }
        /* Rubber-stamp SAMPLE watermark */
        .s03-stamp {
          position:absolute; top:340px; right:96px; z-index:6;
          font-family:var(--font-mono); font-weight:500; font-size:44px; letter-spacing:.32em;
          color:#6b5a42; opacity:.85;
          border:6px solid #6b5a42;
          padding:12px 24px;
          transform:rotate(8deg);
          border-radius:6px;
          box-shadow:inset 0 0 0 2px rgba(107,90,66,.2);
          text-transform:uppercase;
        }
        /* Taped-on margin note */
        .s03-note {
          position:absolute; z-index:8;
          bottom:76px; right:52px;
          transform:rotate(3deg);
          background:#faf4d8;
          color:#4b3a20;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.28em; text-transform:uppercase;
          padding:12px 20px 14px;
          box-shadow:0 12px 28px -14px rgba(0,0,0,.35);
          max-width:280px;
        }
        .s03-note::before, .s03-note::after {
          content:''; position:absolute; top:-8px; width:60px; height:16px;
          background:rgba(200,180,120,.5); transform:rotate(-4deg);
        }
        .s03-note::before { left:16px; }
        .s03-note::after { right:16px; transform:rotate(6deg); }
        /* Instructions row above options */
        .s03-instr { position:absolute; left:64px; right:64px; top:640px; font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.55); display:flex; align-items:center; gap:20px; }
        .s03-instr .rule { flex:1; height:1px; background:rgba(46,42,20,.25); }
        /* Mast + footer outside the card */
        .s03-mast { position:absolute; top:74px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:#4b6252; }
        .s03-mast img { height:60px; width:auto; }
        .s03-foot { position:absolute; left:80px; right:80px; bottom:74px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.5); }
      `,
      body: (ctx) => `
        <div class="s03">
          <div class="s03-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Committee #25045 · Est. 2026</span>
          </div>

          <div class="s03-card">
            <div class="s03-perf"></div>
            <div class="s03-perf-line"></div>
            <div class="s03-header">
              <span class="title">Official ballot · Northwest Oregon</span>
              <span class="meta"><span class="id">Precinct №27</span>Vote by mail — retain for records</span>
            </div>
            <div class="s03-rule"></div>
            <div class="s03-issue">
              <span>Question · 01 of 01</span>
              <span>Community poll</span>
            </div>
            <div class="s03-q">
              <span class="qmark">— The question at hand</span>
              Have you voted in a local election <em>recently?</em>
            </div>
            <div class="s03-instr"><span>Mark one oval</span><span class="rule"></span><span>Fill completely</span></div>
            <div class="s03-opts">
              <div class="s03-opt filled">
                <span class="oval"><span class="mark">✓</span></span>
                <span class="lbl">Yes</span>
                <span class="sub">A</span>
              </div>
              <div class="s03-opt">
                <span class="oval"></span>
                <span class="lbl">Not Yet</span>
                <span class="sub">B</span>
              </div>
            </div>
          </div>

          <div class="s03-stamp">Sample</div>

          <div class="s03-note">
            Overlay Instagram<br />poll sticker here
          </div>

          <div class="s03-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 04 — "Strong communities don't happen by chance"
     Creative direction: architectural blueprint. Cross-hatched
     grid, drafting call-out with typed labels, the manifesto as
     technical spec, "VOLUNTEER TODAY" stamped as a drafting
     approval.
  ------------------------------------------------------------ */
  {
    id: 'story-04-strong-communities',
    tag: 'Get involved',
    title: "Strong communities don't happen by chance.",
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s04 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(90,112,96,.4) 0%, transparent 55%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 100%);
          color:#f6f2e8;
        }
        /* Blueprint grid — fine + heavy */
        .s04::before {
          content:''; position:absolute; inset:0;
          background:
            linear-gradient(rgba(224,214,188,.08) 1px, transparent 1px) 0 0/40px 40px,
            linear-gradient(90deg, rgba(224,214,188,.08) 1px, transparent 1px) 0 0/40px 40px,
            linear-gradient(rgba(224,214,188,.15) 1px, transparent 1px) 0 0/200px 200px,
            linear-gradient(90deg, rgba(224,214,188,.15) 1px, transparent 1px) 0 0/200px 200px;
          pointer-events:none;
        }
        .s04::after {
          content:''; position:absolute; inset:0;
          background:radial-gradient(90% 70% at 50% 40%, rgba(8,24,42,0) 0%, rgba(8,24,42,.55) 100%);
          pointer-events:none;
        }
        .s04-mast { position:absolute; top:80px; left:96px; right:96px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#e0d6bc; font-family:var(--font-mono); font-size:15px; letter-spacing:.36em; text-transform:uppercase; }
        .s04-mast img { height:60px; width:auto; filter:brightness(1.05) drop-shadow(0 2px 12px rgba(0,0,0,.4)); }
        /* Drafting title block */
        .s04-titleblock {
          position:absolute; top:200px; left:96px; right:96px; z-index:5;
          padding:20px 24px; border:1.5px solid rgba(224,214,188,.4);
          display:grid; grid-template-columns:1fr 1fr 1fr; gap:0;
          font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(224,214,188,.8);
        }
        .s04-titleblock > div { padding:4px 12px; border-right:1px solid rgba(224,214,188,.28); }
        .s04-titleblock > div:last-child { border-right:none; }
        .s04-titleblock .k { color:rgba(224,214,188,.5); display:block; margin-bottom:6px; font-size:11px; letter-spacing:.28em; }
        .s04-titleblock .v { color:#f6f2e8; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; text-transform:none; }
        /* Section marker column on the left */
        .s04-section {
          position:absolute; left:96px; top:340px; z-index:5;
          display:flex; align-items:baseline; gap:22px;
          font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase;
          color:#5a7060;
        }
        .s04-section .n { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:56px; letter-spacing:-.02em; color:#f6f2e8; }
        /* Big spec headline */
        .s04-head {
          position:absolute; left:96px; right:96px; top:440px; z-index:5;
          font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8;
          max-width:920px;
        }
        .s04-head em { font-style:italic; color:#5a7060; font-weight:500; }
        /* Callout lines pointing to a spec */
        .s04-callout {
          position:absolute; left:96px; right:96px; top:900px; z-index:5;
          display:flex; align-items:flex-start; gap:40px;
        }
        .s04-callout .line {
          flex:none; margin-top:26px;
          display:flex; align-items:center;
        }
        .s04-callout .dot { width:14px; height:14px; border-radius:999px; border:2px solid #5a7060; background:#2e4538; }
        .s04-callout .stroke { width:60px; height:1.5px; background:#5a7060; }
        .s04-callout .body {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; line-height:1.22; letter-spacing:-.012em; color:#e0d6bc;
          max-width:720px;
        }
        /* Spec ledger — a compact key/value block */
        .s04-ledger {
          position:absolute; left:96px; right:96px; top:1100px; z-index:5;
          border-top:1px solid rgba(224,214,188,.4);
          border-bottom:1px solid rgba(224,214,188,.4);
          padding:26px 0;
          display:flex; flex-direction:column; gap:16px;
        }
        .s04-ledger .row {
          display:flex; align-items:baseline; justify-content:space-between; gap:24px;
          font-family:var(--font-mono); font-size:15px; letter-spacing:.32em; text-transform:uppercase; color:rgba(224,214,188,.75);
        }
        .s04-ledger .row .v { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; text-transform:none; color:#f6f2e8; }
        /* Approved stamp */
        .s04-stamp {
          position:absolute; right:110px; bottom:280px; z-index:8;
          border:5px solid #e0d6bc; padding:14px 28px 16px; border-radius:8px;
          transform:rotate(-4deg);
          font-family:var(--font-mono); font-weight:500; font-size:34px; letter-spacing:.32em; text-transform:uppercase;
          color:#e0d6bc;
          box-shadow:inset 0 0 0 2px rgba(224,214,188,.2);
        }
        .s04-stamp small { display:block; font-family:var(--font-mono); font-size:11px; letter-spacing:.36em; color:rgba(224,214,188,.85); margin-top:6px; }
        /* CTA plate */
        .s04-cta {
          position:absolute; left:96px; bottom:140px; z-index:6;
          display:inline-flex; align-items:center; gap:22px;
          padding:24px 34px;
          background:#e0d6bc; color:#2e4538;
          font-family:var(--font-mono); font-weight:600; font-size:20px; letter-spacing:.36em; text-transform:uppercase;
          box-shadow:0 30px 60px -22px rgba(224,214,188,.45);
        }
        .s04-cta .arrow { display:inline-block; width:26px; height:2px; background:#2e4538; position:relative; }
        .s04-cta .arrow::after { content:''; position:absolute; right:-2px; top:-5px; width:0; height:0; border-left:8px solid #2e4538; border-top:6px solid transparent; border-bottom:6px solid transparent; }
        /* Footer rail */
        .s04-foot {
          position:absolute; left:96px; right:96px; bottom:70px; z-index:6;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:13px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(224,214,188,.6);
        }
      `,
      body: (ctx) => `
        <div class="s04">
          <div class="s04-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Sheet 04 / 30 · Blueprint</span>
          </div>

          <div class="s04-titleblock">
            <div><span class="k">Project</span><span class="v">Northwest Oregon</span></div>
            <div><span class="k">Sheet</span><span class="v">SC-04</span></div>
            <div><span class="k">Scale</span><span class="v">1 : Community</span></div>
          </div>

          <div class="s04-section"><span class="n">04</span><span>Community as construction</span></div>

          <h1 class="s04-head">Strong communities don't happen by <em>chance.</em></h1>

          <div class="s04-callout">
            <span class="line"><span class="dot"></span><span class="stroke"></span></span>
            <p class="s04-body body">They happen because people <em>get involved.</em></p>
          </div>

          <div class="s04-ledger">
            <div class="row"><span>Material</span><span class="v">Neighbours, showing up.</span></div>
            <div class="row"><span>Method</span><span class="v">One conversation at a time.</span></div>
            <div class="row"><span>Load-bearing</span><span class="v">Trust.</span></div>
          </div>

          <div class="s04-stamp">Approved<small>By the people</small></div>

          <span class="s04-cta">Volunteer Today <span class="arrow"></span></span>

          <div class="s04-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 05 — "Every dollar raised"
     Creative direction: an editorial banknote / bill of exchange.
     Engraved-style border, italic monogram, giant "$" watermark,
     "Northwest Oregon" as the issuing authority, CTA as the
     authorized-signature line.
  ------------------------------------------------------------ */
  {
    id: 'story-05-every-dollar',
    tag: 'Support',
    title: 'Every dollar raised.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s05 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(210,192,150,.4) 0%, transparent 55%),
            linear-gradient(180deg, #f0e6cf 0%, #d9c99e 100%);
          color:#2a2a1f;
        }
        /* Guilloché pattern layer (engraved currency lines) */
        .s05::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:.16;
          background:
            repeating-linear-gradient(38deg, rgba(46,42,20,.5) 0 1px, transparent 1px 5px),
            repeating-linear-gradient(-42deg, rgba(46,42,20,.35) 0 1px, transparent 1px 7px);
        }
        /* Big "$" watermark */
        .s05-dollar {
          position:absolute; top:270px; left:50%; transform:translateX(-50%); z-index:1;
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:1400px; line-height:.8; letter-spacing:-.08em;
          color:rgba(74,58,20,.09);
          pointer-events:none; user-select:none;
        }
        /* Currency frame */
        .s05-frame {
          position:absolute; top:150px; bottom:140px; left:64px; right:64px; z-index:3;
          border:4px double #2e4538;
          padding:52px 60px;
          background:
            radial-gradient(120% 90% at 30% 20%, rgba(255,250,235,.65) 0%, transparent 55%),
            linear-gradient(180deg, rgba(240,230,207,.9) 0%, rgba(230,215,178,.95) 100%);
        }
        .s05-frame::before {
          content:''; position:absolute; inset:16px; border:1px solid rgba(46,69,56,.5); pointer-events:none;
        }
        /* Corner ornaments */
        .s05-corner { position:absolute; z-index:5; font-family:var(--font-display); font-style:italic; font-size:56px; color:#2e4538; letter-spacing:-.02em; }
        .s05-corner.tl { top:12px; left:12px; }
        .s05-corner.tr { top:12px; right:12px; }
        .s05-corner.bl { bottom:20px; left:12px; }
        .s05-corner.br { bottom:20px; right:12px; }
        /* Header row inside frame */
        .s05-authority {
          display:flex; align-items:baseline; justify-content:space-between; gap:24px;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.4em; text-transform:uppercase;
          color:#4b3a20;
        }
        .s05-authority .issuer { color:#2e4538; }
        .s05-issue-title {
          margin-top:22px;
          font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.7);
          display:flex; align-items:center; gap:22px;
        }
        .s05-issue-title .rule { flex:1; height:1px; background:rgba(46,42,20,.35); }
        /* The declared value */
        .s05-lede {
          margin-top:34px;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55);
        }
        .s05-figure {
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:200px; line-height:.9; letter-spacing:-.03em; color:#2e4538;
          margin:2px 0 2px;
        }
        .s05-figure .cents { font-size:52px; vertical-align:top; margin-left:6px; color:#4b6252; letter-spacing:0; }
        .s05-inwords {
          margin-top:14px;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.65);
        }
        .s05-inwords .amt {
          display:block; margin-top:8px;
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:46px; letter-spacing:-.015em; text-transform:none; color:#2e4538; line-height:1.16;
          max-width:820px;
        }
        /* Middle engraved emblem — a compass rose vignette */
        .s05-emblem {
          margin:36px auto 0; display:flex; flex-direction:column; align-items:center; gap:14px;
          width:100%;
        }
        .s05-emblem .disc {
          width:190px; height:190px; border-radius:999px;
          border:2px double #2e4538;
          display:flex; align-items:center; justify-content:center;
          position:relative;
          background:
            radial-gradient(60% 60% at 50% 50%, rgba(255,250,235,.8) 0%, rgba(240,230,207,.6) 100%);
        }
        .s05-emblem .disc::before,
        .s05-emblem .disc::after {
          content:''; position:absolute; inset:14px; border-radius:999px; border:1px solid rgba(46,69,56,.4);
          pointer-events:none;
        }
        .s05-emblem .disc::after {
          inset:26px; border-style:dashed;
        }
        .s05-emblem .disc svg { position:relative; z-index:2; width:120px; height:120px; color:#2e4538; }
        .s05-emblem .cap { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        /* Signature block */
        .s05-sig { position:absolute; left:60px; right:60px; bottom:60px; display:flex; align-items:flex-end; justify-content:space-between; gap:40px; }
        .s05-sig .col { display:flex; flex-direction:column; gap:8px; }
        .s05-sig .line { width:340px; height:1.5px; background:#2e4538; }
        .s05-sig .role { font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s05-sig .name { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:38px; letter-spacing:-.015em; color:#2e4538; line-height:1; padding-bottom:6px; }
        .s05-seal {
          width:110px; height:110px; border-radius:999px; border:3px double #2e4538;
          display:flex; align-items:center; justify-content:center;
          font-family:var(--font-display); font-style:italic; font-size:44px; color:#2e4538;
          background:rgba(255,250,235,.3);
        }
        /* Mast (above the frame) */
        .s05-mast { position:absolute; top:70px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#4b3a20; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; }
        .s05-mast img { height:54px; width:auto; }
        /* Bottom rail */
        .s05-foot { position:absolute; left:80px; right:80px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.55); }
      `,
      body: (ctx) => `
        <div class="s05">
          <div class="s05-dollar">$</div>
          <div class="s05-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>No. 05 · Bill of Exchange</span>
          </div>

          <div class="s05-frame">
            <span class="s05-corner tl">§</span>
            <span class="s05-corner tr">§</span>
            <span class="s05-corner bl">§</span>
            <span class="s05-corner br">§</span>

            <div class="s05-authority">
              <span>Issuing authority</span>
              <span class="issuer">Northwest Oregon PAC · 25045</span>
            </div>
            <div class="s05-issue-title">
              <span>The Northwest Oregon Dollar</span>
              <span class="rule"></span>
              <span>Series 2026</span>
            </div>

            <div class="s05-lede">Declared value</div>
            <div class="s05-figure">$1<span class="cents">.00</span></div>

            <div class="s05-inwords">
              Every dollar promises —
              <span class="amt">Every dollar raised stays focused on strengthening Northwest Oregon.</span>
            </div>

            <div class="s05-emblem">
              <div class="disc">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M50 8 L54 46 L92 50 L54 54 L50 92 L46 54 L8 50 L46 46 Z" fill="currentColor" fill-opacity=".08"/>
                  <path d="M50 8 L54 46 L92 50 L54 54 L50 92 L46 54 L8 50 L46 46 Z"/>
                  <circle cx="50" cy="50" r="4" fill="currentColor"/>
                </svg>
              </div>
              <span class="cap">— Legal tender for the region —</span>
            </div>

            <div class="s05-sig">
              <div class="col">
                <span class="name">Support the Mission</span>
                <span class="line"></span>
                <span class="role">Authorized signature · The People</span>
              </div>
              <div class="s05-seal">☘</div>
            </div>
          </div>

          <div class="s05-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 06 — "We're recruiting tomorrow's community leaders today"
     Creative direction: an elevated newspaper classified ad.
     Broadsheet masthead, column rules, "POSITION AVAILABLE" kicker,
     italic call to arms, and a coupon-style tear-off marking the
     CTA at the bottom.
  ------------------------------------------------------------ */
  {
    id: 'story-06-recruiting',
    tag: 'Candidates',
    title: "We're recruiting tomorrow's community leaders today.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s06 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(244,238,220,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e9ddbf 100%);
          color:#221e14;
        }
        /* Very subtle newsprint tint */
        .s06::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:.06; mix-blend-mode:multiply;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        /* Broadsheet masthead */
        .s06-masthead {
          position:absolute; top:80px; left:70px; right:70px; z-index:5;
          padding-bottom:14px; border-bottom:3px double #221e14;
        }
        .s06-masthead .title { font-family:var(--font-display); font-weight:500; font-style:italic; font-size:66px; letter-spacing:-.02em; color:#221e14; line-height:1; }
        .s06-masthead .meta { margin-top:14px; display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(34,30,20,.6); }
        /* Dateline row */
        .s06-dateline {
          position:absolute; top:224px; left:70px; right:70px; z-index:5;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase;
          color:rgba(34,30,20,.55);
        }
        /* Section kicker */
        .s06-section {
          position:absolute; top:280px; left:70px; z-index:5;
          font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:.5em; text-transform:uppercase;
          color:#6b5a42;
          display:inline-flex; align-items:center; gap:14px;
          padding:8px 14px; border:1.5px solid #6b5a42; background:rgba(255,255,255,.4);
        }
        .s06-section .diamond { display:inline-block; width:8px; height:8px; background:#6b5a42; transform:rotate(45deg); }
        /* Two-column body: giant headline left, kicker + intro right */
        .s06-body {
          position:absolute; top:360px; left:70px; right:70px; bottom:340px; z-index:4;
          display:grid; grid-template-columns:2fr 1px 1fr; gap:34px;
        }
        .s06-body .col-rule { background:linear-gradient(180deg, rgba(34,30,20,.35) 0%, rgba(34,30,20,0) 100%); }
        .s06-headline {
          font-family:var(--font-display); font-weight:500; font-size:120px; line-height:.96; letter-spacing:-.028em; color:#221e14;
        }
        .s06-headline em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s06-side {
          display:flex; flex-direction:column; gap:22px;
          font-family:var(--font-display); font-weight:500;
        }
        .s06-side .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(34,30,20,.55); }
        .s06-side .call { font-size:44px; line-height:1.05; letter-spacing:-.018em; color:#221e14; font-style:italic; }
        .s06-side .call em { font-style:normal; }
        .s06-side .rule { width:60px; height:1px; background:#221e14; opacity:.55; }
        .s06-side .desc { font-family:var(--font-sans); font-weight:400; font-size:24px; line-height:1.44; color:rgba(34,30,20,.75); }
        /* Coupon at bottom — tear-off dashed line + apply block */
        .s06-coupon {
          position:absolute; left:70px; right:70px; bottom:130px; z-index:5;
          padding:26px 32px 30px;
          border:2px dashed #221e14; background:rgba(255,255,255,.35);
          display:flex; align-items:center; justify-content:space-between; gap:24px;
        }
        .s06-coupon::before {
          content:'scissors ✂'; position:absolute; top:-14px; left:26px;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:rgba(34,30,20,.55);
          background:#f6f2e8; padding:0 8px;
        }
        .s06-coupon .col { display:flex; flex-direction:column; gap:8px; }
        .s06-coupon .col .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(34,30,20,.55); }
        .s06-coupon .col .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; letter-spacing:-.015em; color:#221e14; line-height:1; }
        .s06-coupon .cta {
          display:inline-flex; align-items:center; gap:16px;
          padding:18px 28px;
          background:#221e14; color:#f6f2e8;
          font-family:var(--font-mono); font-size:18px; letter-spacing:.36em; text-transform:uppercase; font-weight:600;
        }
        .s06-coupon .cta::after { content:'→'; }
        /* Bottom bar (rail) */
        .s06-foot { position:absolute; left:70px; right:70px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(34,30,20,.55); }
        /* Mast tag in the corner */
        .s06-corner-tag { position:absolute; top:74px; right:70px; z-index:6; display:inline-flex; align-items:center; gap:12px; padding:8px 14px; border:1px solid rgba(34,30,20,.55); font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(34,30,20,.7); background:rgba(255,255,255,.4); }
      `,
      body: (ctx) => `
        <div class="s06">
          <div class="s06-masthead">
            <div class="title">The Northwest Classified</div>
            <div class="meta">
              <span>Vol. 26 · No. 06</span>
              <span>Community Section · A1</span>
              <span>Est. 2026</span>
            </div>
          </div>

          <div class="s06-corner-tag"><img src="${ctx.prefix}nwop-logo-dark.png" alt="" style="height:20px;filter:contrast(1.1)" /></div>

          <div class="s06-dateline">
            <span>Beaverton · Hillsboro · Astoria · Tillamook</span>
            <span>Filed by the People</span>
          </div>

          <span class="s06-section"><span class="diamond"></span>Position Available</span>

          <div class="s06-body">
            <h1 class="s06-headline">Could it <em>be you?</em></h1>
            <div class="col-rule"></div>
            <div class="s06-side">
              <span class="kick">— Notice to residents</span>
              <p class="call">We're recruiting <em>tomorrow's</em> community leaders <em>today.</em></p>
              <span class="rule"></span>
              <p class="desc">Open to teachers, veterans, small-business owners, farmers, parents, neighbours — anyone who cares enough to step forward.</p>
            </div>
          </div>

          <div class="s06-coupon">
            <div class="col">
              <span class="k">Applications open</span>
              <span class="v">Let's Talk</span>
            </div>
            <span class="cta">Reply Today</span>
          </div>

          <div class="s06-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 07 — "Hope. Support. Heard."
     Creative direction: neon storefront marquee. Three values
     glow individually on a night-forest ground with soft radial
     halos; the manifesto is set as an engraved plaque below.
  ------------------------------------------------------------ */
  {
    id: 'story-07-hope-support-heard',
    tag: 'Values',
    title: 'Hope. Support. Heard.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s07 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 30%, rgba(90,140,110,.28) 0%, transparent 55%),
            radial-gradient(120% 90% at 50% 100%, rgba(0,0,0,.9) 0%, transparent 65%),
            linear-gradient(178deg, #0b1a12 0%, #050c07 100%);
          color:#f0efe3;
        }
        /* Subtle bokeh dots — city window lights in the distance */
        .s07::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(3px 3px at 14% 82%, rgba(255,230,150,.6), transparent 60%),
            radial-gradient(2px 2px at 30% 88%, rgba(255,230,150,.35), transparent 60%),
            radial-gradient(2px 2px at 62% 84%, rgba(255,230,150,.45), transparent 60%),
            radial-gradient(3px 3px at 82% 86%, rgba(255,230,150,.55), transparent 60%),
            radial-gradient(2px 2px at 92% 78%, rgba(255,230,150,.35), transparent 60%);
          filter:blur(1.2px);
        }
        .s07-mast { position:absolute; top:80px; left:96px; right:96px; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:20px; color:rgba(240,239,227,.6); font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; }
        .s07-mast img { height:56px; width:auto; opacity:.9; filter:drop-shadow(0 2px 12px rgba(0,0,0,.6)); }
        .s07-tag {
          position:absolute; top:220px; left:50%; transform:translateX(-50%); z-index:5;
          font-family:var(--font-mono); font-size:15px; letter-spacing:.5em; text-transform:uppercase;
          color:rgba(240,239,227,.5);
          display:inline-flex; align-items:center; gap:22px;
        }
        .s07-tag .bar { display:inline-block; width:60px; height:1px; background:rgba(240,239,227,.4); }
        /* Neon words — three staggered stacked lines */
        .s07-neon { position:absolute; top:320px; left:0; right:0; z-index:5; display:flex; flex-direction:column; align-items:center; gap:36px; }
        .s07-word {
          font-family:var(--font-display); font-style:italic; font-weight:400;
          font-size:160px; line-height:1; letter-spacing:-.03em;
          position:relative;
        }
        .s07-word.hope    { color:#e0d6bc; text-shadow:0 0 12px rgba(224,214,188,.95), 0 0 30px rgba(224,214,188,.6), 0 0 60px rgba(224,214,188,.4), 0 0 120px rgba(224,214,188,.22); }
        .s07-word.support { color:#f0e5c9; text-shadow:0 0 12px rgba(140,168,146,.95), 0 0 30px rgba(140,168,146,.6), 0 0 60px rgba(90,112,96,.45), 0 0 120px rgba(90,112,96,.25); }
        .s07-word.heard   { color:#f6f2e8; text-shadow:0 0 12px rgba(246,242,232,.95), 0 0 30px rgba(246,242,232,.55), 0 0 60px rgba(246,242,232,.35), 0 0 120px rgba(246,242,232,.2); }
        .s07-word::after {
          content:''; position:absolute; left:50%; bottom:-14px; transform:translateX(-50%);
          width:60%; height:2px; background:currentColor; opacity:.4;
          box-shadow:0 0 12px currentColor;
        }
        /* Engraved plaque */
        .s07-plaque {
          position:absolute; left:96px; right:96px; bottom:200px; z-index:5;
          padding:26px 30px;
          background:linear-gradient(180deg, rgba(240,239,227,.06) 0%, rgba(240,239,227,.02) 100%);
          border:1px solid rgba(240,239,227,.35);
          backdrop-filter: blur(4px);
        }
        .s07-plaque .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        .s07-plaque .v { margin-top:12px; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; line-height:1.18; letter-spacing:-.015em; color:#f0efe3; }
        .s07-plaque .v em { font-style:normal; color:#e0d6bc; }
        /* Bottom rail */
        .s07-foot {
          position:absolute; left:96px; right:96px; bottom:74px; z-index:5;
          display:flex; align-items:center; justify-content:space-between;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase;
          color:rgba(240,239,227,.5);
        }
      `,
      body: (ctx) => `
        <div class="s07">
          <div class="s07-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Sign 07 · After hours</span>
          </div>

          <span class="s07-tag"><span class="bar"></span>The Northwest Sign<span class="bar"></span></span>

          <div class="s07-neon">
            <span class="s07-word hope">Hope.</span>
            <span class="s07-word support">Support.</span>
            <span class="s07-word heard">Heard.</span>
          </div>

          <div class="s07-plaque">
            <span class="k">— Reads the marquee</span>
            <div class="v">That's the movement <em>we're building.</em></div>
          </div>

          <div class="s07-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 08 — "Every volunteer makes a difference"
     Creative direction: personnel dossier / manila file folder.
     Folder tab up top with a stamped case number, typewriter mono
     field labels, and the manifesto set as the file's statement.
  ------------------------------------------------------------ */
  {
    id: 'story-08-every-volunteer',
    tag: 'Get involved',
    title: 'Every volunteer makes a difference.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s08 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 20% 20%, rgba(0,0,0,.14) 0%, transparent 55%),
            linear-gradient(180deg, #a48a52 0%, #8a7040 100%);
        }
        .s08::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.24  0 0 0 0 0.14  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
          pointer-events:none;
        }
        /* Folder tab */
        .s08-tab {
          position:absolute; top:110px; left:120px; z-index:5;
          padding:14px 34px 12px;
          background:#c8a866;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase;
          color:#3d2f14;
          clip-path:polygon(0 0, 100% 0, 92% 100%, 8% 100%);
          box-shadow:inset 0 -2px 0 rgba(90,70,20,.4);
        }
        /* Manila card sheet */
        .s08-sheet {
          position:absolute; top:150px; bottom:130px; left:60px; right:60px; z-index:4;
          background:
            radial-gradient(90% 70% at 20% 10%, rgba(255,251,235,.9) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #ebd9a5 100%);
          border:1px solid rgba(90,70,20,.3);
          box-shadow:0 40px 90px -40px rgba(60,45,20,.5), inset 0 1px 0 rgba(255,255,255,.5);
        }
        /* Case header inside sheet */
        .s08-caseheader { position:absolute; top:60px; left:64px; right:64px; display:flex; align-items:baseline; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s08-caseheader .case { color:#2e4538; font-weight:600; }
        .s08-rule { position:absolute; top:100px; left:64px; right:64px; height:1px; background:repeating-linear-gradient(90deg, rgba(46,42,20,.5) 0 8px, transparent 8px 14px); }
        /* Big red "APPROVED" stamp on the sheet */
        .s08-approved {
          position:absolute; top:140px; right:80px; z-index:6;
          border:5px solid #6b5a42; padding:14px 26px 16px; border-radius:6px;
          transform:rotate(-6deg);
          font-family:var(--font-mono); font-weight:700; font-size:34px; letter-spacing:.34em; text-transform:uppercase;
          color:#6b5a42;
          box-shadow:inset 0 0 0 2px rgba(107,90,66,.2);
        }
        .s08-approved small { display:block; margin-top:4px; font-size:11px; letter-spacing:.36em; color:rgba(107,90,66,.9); }
        /* Field grid */
        .s08-fields {
          position:absolute; top:250px; left:64px; right:64px; display:grid; grid-template-columns:1fr 1fr; row-gap:26px; column-gap:34px;
        }
        .s08-fields .row { display:flex; flex-direction:column; gap:6px; padding-bottom:14px; border-bottom:1px solid rgba(46,42,20,.35); }
        .s08-fields .row .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s08-fields .row .v { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:32px; letter-spacing:-.015em; color:#2e4538; line-height:1.05; }
        /* Statement */
        .s08-statement {
          position:absolute; left:64px; right:64px; bottom:140px;
          padding-top:26px; border-top:2px solid rgba(46,42,20,.55);
        }
        .s08-statement .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s08-statement .v {
          margin-top:14px;
          font-family:var(--font-display); font-weight:500; font-size:64px; line-height:1.02; letter-spacing:-.02em; color:#2e4538;
        }
        .s08-statement .v em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s08-statement .lines { margin-top:20px; display:flex; flex-direction:column; gap:6px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:34px; color:rgba(46,42,20,.75); line-height:1.24; }
        /* Signature line */
        .s08-signline { position:absolute; left:64px; right:64px; bottom:70px; display:flex; align-items:baseline; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s08-signline .sig { flex:1; height:1px; background:rgba(46,42,20,.5); margin:0 14px; }
        /* Corner paperclip */
        .s08-clip { position:absolute; top:80px; right:180px; z-index:6; }
        /* Bottom rail (outside folder) */
        .s08-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(255,240,210,.8); }
        .s08-mast-mini { position:absolute; top:76px; right:70px; z-index:6; display:flex; align-items:center; gap:14px; padding:8px 16px; background:rgba(0,0,0,.28); font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:#f6f2e8; }
        .s08-mast-mini img { height:24px; width:auto; filter:brightness(1.1); }
      `,
      body: (ctx) => `
        <div class="s08">
          <span class="s08-tab">Personnel · Case 08</span>
          <div class="s08-mast-mini"><img src="${ctx.prefix}nwop-logo-light.png" alt="" />Northwest Oregon PAC</div>

          <div class="s08-sheet">
            <div class="s08-caseheader">
              <span class="case">FILE №26-VOL-08</span>
              <span>The Volunteer Dossier · Classified for the People</span>
            </div>
            <div class="s08-rule"></div>

            <svg class="s08-clip" width="46" height="120" viewBox="0 0 46 120" fill="none" stroke="#6b5a42" stroke-width="4">
              <path d="M12 10 v70 a11 11 0 0 0 22 0 v-45 a7 7 0 0 0 -14 0 v40" />
            </svg>

            <span class="s08-approved">Approved<small>No experience required</small></span>

            <div class="s08-fields">
              <div class="row"><span class="k">Applicant</span><span class="v">You</span></div>
              <div class="row"><span class="k">Position</span><span class="v">Volunteer</span></div>
              <div class="row"><span class="k">District</span><span class="v">Northwest Oregon</span></div>
              <div class="row"><span class="k">Commitment</span><span class="v">Any hours available</span></div>
            </div>

            <div class="s08-statement">
              <span class="k">— Statement of finding</span>
              <div class="v">Every volunteer makes a <em>difference.</em></div>
              <div class="lines">
                <span>No experience required.</span>
                <span>Just a willingness to serve.</span>
              </div>
            </div>

            <div class="s08-signline">
              <span>Signed</span>
              <span class="sig"></span>
              <span>Date · 2026</span>
            </div>
          </div>

          <div class="s08-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 09 — Poll: "What's most important for Northwest Oregon?"
     Creative direction: photographic diptych. Two vertically-halved
     photographic scenes representing the two options. Mono "OR"
     divider centered on a hairline rule; italic labels beneath.
  ------------------------------------------------------------ */
  {
    id: 'story-09-issue-poll',
    tag: 'Values',
    title: "What's most important for Northwest Oregon?",
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true, onPhoto: true },
    data: {
      css: `
        .s09 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#0a0f0b; color:#f0efe3; }
        /* Header band carrying the question */
        .s09-header {
          position:absolute; top:0; left:0; right:0; height:340px; z-index:7;
          background:linear-gradient(180deg, #0a0f0b 0%, #0a0f0b 78%, rgba(10,15,11,0) 100%);
          padding:80px 70px 20px;
          display:flex; flex-direction:column; gap:30px;
        }
        .s09-header .top-row { display:flex; align-items:center; justify-content:space-between; gap:20px; font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.75); }
        .s09-header .top-row img { height:52px; width:auto; filter:brightness(1.05); }
        .s09-header .qkick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); display:inline-flex; align-items:center; gap:16px; }
        .s09-header .qkick::before { content:''; display:inline-block; width:44px; height:1px; background:rgba(240,239,227,.5); }
        .s09-header .q {
          font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.02em; color:#f6f2e8; max-width:940px;
        }
        .s09-header .q em { font-style:italic; color:#e0d6bc; }
        .s09-pane { position:absolute; left:0; right:0; overflow:hidden; }
        .s09-pane.top { top:340px; height:calc(50% - 300px + 100px); }
        .s09-pane.bot { bottom:0; height:calc(50% - 40px); }
        .s09-pane img { width:100%; height:100%; object-fit:cover; filter:saturate(0.7) contrast(1.15) brightness(0.75); }
        .s09-pane.top img { filter:saturate(0.75) contrast(1.2) brightness(0.7) hue-rotate(-8deg); }
        .s09-pane.bot img { filter:saturate(0.6) contrast(1.22) brightness(0.68) sepia(0.35); }
        .s09-pane .wash { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 40%, rgba(0,0,0,.6) 100%); }
        .s09-pane.top .wash { background:linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.1) 40%, rgba(0,0,0,.8) 100%); }
        .s09-pane.bot .wash { background:linear-gradient(180deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.5) 100%); }
        /* Center divider strip */
        .s09-divider {
          position:absolute; top:calc(50% + 60px); left:0; right:0; height:100px; z-index:6;
          background:#0a0f0b;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
        }
        .s09-divider .or {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:88px; line-height:1; color:#f0efe3; letter-spacing:-.02em;
          text-shadow:0 4px 26px rgba(0,0,0,.6);
        }
        .s09-divider .hair { position:absolute; left:80px; right:80px; height:1px; background:linear-gradient(90deg, transparent, rgba(240,239,227,.6) 20%, rgba(240,239,227,.6) 80%, transparent); }
        .s09-divider .hair.top { top:22px; }
        .s09-divider .hair.bot { bottom:22px; }
        /* Labels on each pane */
        .s09-label { position:absolute; z-index:6; display:flex; flex-direction:column; gap:12px; padding:26px 30px; max-width:520px; }
        .s09-label .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.75); }
        .s09-label .badge {
          align-self:flex-start; display:inline-flex; align-items:center; gap:12px;
          padding:10px 18px; border-radius:999px; border:1.5px solid rgba(240,239,227,.6); background:rgba(0,0,0,.35);
          font-family:var(--font-mono); font-size:14px; letter-spacing:.36em; text-transform:uppercase; color:#f0efe3;
        }
        .s09-label .badge .n { font-family:var(--font-display); font-style:italic; font-size:18px; letter-spacing:-.01em; text-transform:none; color:#e0d6bc; }
        .s09-label .value { font-family:var(--font-display); font-weight:500; font-size:80px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8; text-shadow:0 3px 22px rgba(0,0,0,.65); }
        .s09-label .value em { font-style:italic; color:#e0d6bc; }
        .s09-label.top { bottom:auto; top:400px; left:70px; }
        .s09-label.bot { bottom:150px; left:70px; }
        /* Poll-sticker margin note */
        .s09-note { position:absolute; right:24px; top:calc(50% + 100px); z-index:8; transform:rotate(3deg); background:#faf4d8; color:#4b3a20; font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase; padding:10px 16px; box-shadow:0 8px 22px -12px rgba(0,0,0,.6); max-width:240px; }
        /* Footer */
        .s09-foot { position:absolute; left:70px; right:70px; bottom:60px; z-index:8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s09">
          <div class="s09-header">
            <div class="top-row">
              <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
              <span>Poll · 09 / 30</span>
            </div>
            <span class="qkick">The Question</span>
            <div class="q">What's most important for <em>Northwest Oregon?</em></div>
          </div>

          <div class="s09-pane top">
            <img src="${ctx.prefix}img/banner.jpg" alt="Growth" />
            <div class="wash"></div>
          </div>
          <div class="s09-pane bot">
            <img src="${ctx.prefix}img/who-we-are.jpg" alt="Safety" />
            <div class="wash"></div>
          </div>

          <div class="s09-label top">
            <span class="badge"><span class="n">A</span>Option one</span>
            <span class="value">Economic <em>Growth.</em></span>
          </div>

          <div class="s09-divider">
            <span class="hair top"></span>
            <span class="or">or</span>
            <span class="hair bot"></span>
          </div>

          <div class="s09-label bot">
            <span class="badge"><span class="n">B</span>Option two</span>
            <span class="value">Community <em>Safety.</em></span>
          </div>

          <div class="s09-note">Overlay IG poll<br />sticker here</div>

          <div class="s09-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 10 — "Campaigns come and go. Strong communities remain."
     Creative direction: a documentary filmstrip. Three photographic
     frames sit as a horizontal strip crossing the middle; sprocket
     holes above/below; editorial commentary framing the strip.
  ------------------------------------------------------------ */
  {
    id: 'story-10-campaigns-remain',
    tag: 'Beliefs',
    title: 'Campaigns come and go. Strong communities remain.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s10 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(244,239,224,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e6d9b7 100%);
        }
        .s10-mast { position:absolute; top:76px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.6); }
        .s10-mast img { height:56px; width:auto; }
        /* Top editorial caption */
        .s10-lede {
          position:absolute; top:220px; left:80px; right:80px; z-index:5;
        }
        .s10-lede .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,42,20,.55); display:inline-flex; align-items:center; gap:16px; }
        .s10-lede .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s10-lede .head { margin-top:20px; font-family:var(--font-display); font-weight:500; font-size:88px; line-height:1.02; letter-spacing:-.022em; color:#2e4538; }
        .s10-lede .head em { font-style:italic; color:#6b5a42; }
        /* Filmstrip */
        .s10-strip {
          position:absolute; top:640px; left:-30px; right:-30px; height:520px; z-index:4;
          background:#111008;
          padding:56px 20px;
          transform:rotate(-1.2deg);
          box-shadow:0 40px 90px -40px rgba(0,0,0,.6);
        }
        .s10-strip::before, .s10-strip::after {
          content:''; position:absolute; left:20px; right:20px; height:26px;
          background-image: radial-gradient(circle at 20px 13px, #f6f2e8 8px, transparent 8.5px);
          background-size:52px 26px;
        }
        .s10-strip::before { top:12px; }
        .s10-strip::after { bottom:12px; }
        .s10-strip .frames {
          display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; height:100%;
        }
        .s10-strip .frame { position:relative; overflow:hidden; background:#000; }
        .s10-strip .frame img { width:100%; height:100%; object-fit:cover; filter:saturate(.7) contrast(1.2) brightness(.85); }
        .s10-strip .frame .wash { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%); }
        .s10-strip .frame .lbl { position:absolute; left:14px; bottom:14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.4em; text-transform:uppercase; color:#e0d6bc; }
        .s10-strip .frame .yr { position:absolute; right:14px; top:14px; font-family:var(--font-display); font-style:italic; font-size:24px; color:#f0efe3; letter-spacing:-.01em; }
        /* Below-strip commentary */
        .s10-below {
          position:absolute; left:80px; right:80px; bottom:190px; z-index:5;
          padding-top:20px; border-top:1.5px solid rgba(46,42,20,.35);
          display:flex; align-items:flex-end; justify-content:space-between; gap:24px;
        }
        .s10-below .k { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s10-below .v {
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; line-height:1.16; letter-spacing:-.015em; color:#2e4538;
          max-width:640px;
        }
        .s10-below .cornerbadge { font-family:var(--font-display); font-style:italic; font-size:80px; color:rgba(46,69,56,.28); letter-spacing:-.02em; }
        .s10-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.55); }
      `,
      body: (ctx) => `
        <div class="s10">
          <div class="s10-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Reel 10 · Field Documentary</span>
          </div>

          <div class="s10-lede">
            <span class="kick">Frame by frame</span>
            <h1 class="head">Campaigns <em>come and go.</em></h1>
          </div>

          <div class="s10-strip">
            <div class="frames">
              <div class="frame">
                <img src="${ctx.prefix}img/banner.jpg" alt="Then" />
                <div class="wash"></div>
                <span class="yr">'22</span>
                <span class="lbl">— Then</span>
              </div>
              <div class="frame">
                <img src="${ctx.prefix}img/who-we-are.jpg" alt="Now" />
                <div class="wash"></div>
                <span class="yr">'26</span>
                <span class="lbl">— Now</span>
              </div>
              <div class="frame">
                <img src="${ctx.prefix}img/hero.jpg" alt="Next" />
                <div class="wash"></div>
                <span class="yr">'30</span>
                <span class="lbl">— Next</span>
              </div>
            </div>
          </div>

          <div class="s10-below">
            <div>
              <span class="k">— Strong communities remain</span>
              <p class="v">That's why we're investing for the long term.</p>
            </div>
            <span class="cornerbadge">10.</span>
          </div>

          <div class="s10-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 11 — "One conversation can change a campaign"
     Creative direction: two large tilted speech-bubbles as if
     torn from an editorial illustration. Each bubble carries one
     line; handwritten-mono attributions underneath. Reads as an
     art-directed conversation record.
  ------------------------------------------------------------ */
  {
    id: 'story-11-one-conversation',
    tag: 'Get involved',
    title: 'One conversation can change a campaign.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s11 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(100% 70% at 30% 15%, rgba(210,222,206,.55) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(180,200,180,.5) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #c8b98a 100%);
        }
        .s11::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
          pointer-events:none;
        }
        .s11-mast { position:absolute; top:80px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,46,26,.6); }
        .s11-mast img { height:58px; width:auto; }
        .s11-kicker { position:absolute; top:200px; left:76px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,46,26,.55); display:inline-flex; align-items:center; gap:16px; }
        .s11-kicker::before { content:''; display:inline-block; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Speech bubble A — top-left leaning left */
        .s11-bubble {
          position:absolute; padding:36px 44px 42px; z-index:5;
          font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.06; letter-spacing:-.018em; color:#2e4538;
          box-shadow:0 30px 60px -30px rgba(46,46,26,.45), inset 0 1px 0 rgba(255,255,255,.6);
          border:1.5px solid rgba(46,46,26,.35);
        }
        .s11-bubble em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s11-bubble .tail { position:absolute; width:44px; height:44px; background:inherit; border:1.5px solid rgba(46,46,26,.35); clip-path:polygon(0 0, 100% 0, 40% 100%); }
        .s11-bubble .attr { display:block; margin-top:22px; font-family:var(--font-mono); font-size:13px; letter-spacing:.38em; text-transform:uppercase; color:rgba(46,46,26,.55); font-weight:400; }
        .s11-bubble.a {
          top:270px; left:56px; max-width:640px;
          background:#f6f2e8;
          border-radius:32px 32px 32px 6px;
          transform:rotate(-2.5deg);
        }
        .s11-bubble.a .tail { bottom:-24px; left:60px; transform:rotate(4deg); border-top:none; border-right:none; background:#f6f2e8; border-radius:0 0 6px 6px; }
        /* Speech bubble B — bottom-right leaning right */
        .s11-bubble.b {
          bottom:340px; right:56px; max-width:640px;
          background:#e0d6bc;
          border-radius:32px 32px 6px 32px;
          transform:rotate(2.4deg);
        }
        .s11-bubble.b .tail { top:-24px; right:70px; transform:rotate(184deg); background:#e0d6bc; border-radius:0 0 6px 6px; }
        /* Connector — an editorial arrow drawn between bubbles */
        .s11-arrow { position:absolute; left:180px; right:180px; top:calc(50% - 40px); z-index:3; opacity:.5; }
        .s11-num { position:absolute; top:calc(50% - 40px); left:50%; transform:translateX(-50%); z-index:4; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:120px; letter-spacing:-.02em; color:rgba(46,46,26,.15); }
        /* Bottom label */
        .s11-tag { position:absolute; left:76px; right:76px; bottom:150px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,46,26,.55); text-align:center; }
        .s11-tag .dot { display:inline-block; width:8px; height:8px; border-radius:999px; background:#6b5a42; margin:0 12px; vertical-align:middle; }
        /* Footer */
        .s11-foot { position:absolute; left:76px; right:76px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,46,26,.55); }
      `,
      body: (ctx) => `
        <div class="s11">
          <div class="s11-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Session 11 · On the Doorstep</span>
          </div>
          <span class="s11-kicker">A short conversation, overheard</span>

          <div class="s11-bubble a">
            One conversation can <em>change</em> a campaign.
            <span class="attr">— Said the volunteer</span>
            <span class="tail"></span>
          </div>

          <span class="s11-num">&</span>

          <div class="s11-bubble b">
            One volunteer can <em>inspire</em> a community.
            <span class="attr">— Said the neighbor</span>
            <span class="tail"></span>
          </div>

          <div class="s11-tag">Northwest Oregon <span class="dot"></span> Every voice compounds</div>

          <div class="s11-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 12 — "Leadership starts with listening"
     Creative direction: sequential two-chapter poster.
     Chapter 01 = LISTENING with a large ear-diagram icon.
     Chapter 02 = ACTION with a walking-figures diagram.
     Numbered chapters with editorial rules between.
  ------------------------------------------------------------ */
  {
    id: 'story-12-leadership-listening',
    tag: 'Values',
    title: 'Leadership starts with listening.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s12 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 10%, rgba(90,112,96,.5) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.95) 0%, transparent 60%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f0efe3;
        }
        .s12-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.65); }
        .s12-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Section 1 — LISTENING */
        .s12-chapter { position:absolute; left:80px; right:80px; z-index:5; }
        .s12-chapter.one { top:220px; }
        .s12-chapter.two { bottom:220px; }
        .s12-chapter .no { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:32px; letter-spacing:-.02em; color:rgba(240,239,227,.5); display:inline-flex; align-items:baseline; gap:14px; }
        .s12-chapter .no .n { font-size:62px; color:#e0d6bc; font-weight:500; }
        .s12-chapter .no small { font-family:var(--font-mono); font-style:normal; font-size:14px; letter-spacing:.4em; text-transform:uppercase; color:rgba(240,239,227,.6); }
        .s12-chapter .body {
          margin-top:20px; display:grid; grid-template-columns:auto 1fr; gap:36px; align-items:center;
        }
        .s12-chapter .body svg { width:170px; height:170px; color:#e0d6bc; opacity:.95; }
        .s12-chapter .msg { display:flex; flex-direction:column; gap:12px; }
        .s12-chapter .msg .head { font-family:var(--font-display); font-weight:500; font-size:70px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; }
        .s12-chapter .msg .head em { font-style:italic; color:#e0d6bc; }
        .s12-chapter .msg .sub { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        /* Middle rule with rotating arrow */
        .s12-middle { position:absolute; top:50%; left:80px; right:80px; z-index:4; display:flex; align-items:center; gap:24px; transform:translateY(-50%); }
        .s12-middle .line { flex:1; height:1px; background:linear-gradient(90deg, rgba(240,239,227,.55), rgba(240,239,227,.55)); opacity:.5; }
        .s12-middle .arrow { display:inline-flex; align-items:center; justify-content:center; width:80px; height:80px; border-radius:999px; border:1.5px solid rgba(240,239,227,.55); color:#e0d6bc; font-family:var(--font-display); font-style:italic; font-size:44px; letter-spacing:-.02em; background:rgba(14,22,17,.6); }
        .s12-middle .arrow svg { width:32px; height:32px; }
        .s12-middle .stamp { font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        .s12-foot { position:absolute; left:80px; right:80px; bottom:74px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s12">
          <div class="s12-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Field Manual 12 · Two-Part Practice</span>
          </div>

          <div class="s12-chapter one">
            <span class="no"><span class="n">01</span> — <small>The first act</small></span>
            <div class="body">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M32 42 C32 22 68 22 68 42 C68 62 60 68 60 78 C60 88 46 92 40 82 C36 75 34 68 34 62"/>
                <path d="M42 50 C46 44 54 44 58 50"/>
                <path d="M40 58 C45 52 55 52 60 58"/>
                <circle cx="52" cy="66" r="3" fill="currentColor"/>
              </svg>
              <div class="msg">
                <span class="sub">Chapter 01 · Listen</span>
                <p class="head">Leadership starts with <em>listening.</em></p>
              </div>
            </div>
          </div>

          <div class="s12-middle">
            <span class="line"></span>
            <span class="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M6 14l6 6 6-6"/></svg>
            </span>
            <span class="line"></span>
            <span class="stamp">then</span>
            <span class="line"></span>
          </div>

          <div class="s12-chapter two">
            <div class="body">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="34" cy="22" r="8"/>
                <path d="M34 30 L34 60 L26 84 M34 60 L44 84"/>
                <path d="M34 40 L22 52 L18 62 M34 40 L48 50 L54 44"/>
                <circle cx="68" cy="30" r="7" opacity=".8"/>
                <path d="M68 37 L68 62 L62 82 M68 62 L76 82" opacity=".8"/>
              </svg>
              <div class="msg">
                <span class="sub">Chapter 02 · Act</span>
                <p class="head">Then it <em>grows</em> through action.</p>
              </div>
            </div>
          </div>

          <div class="s12-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 13 — "The future of Northwest Oregon belongs to those
     willing to build it."
     Creative direction: an under-construction billboard rising
     off a foundation. Striped construction barrier at the base,
     yellow "UNDER CONSTRUCTION" tag, hard-hat mono metadata.
  ------------------------------------------------------------ */
  {
    id: 'story-13-future-belongs',
    tag: 'Introduction',
    title: 'The future of Northwest Oregon belongs to those willing to build it.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s13 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 5%, rgba(224,214,188,.18) 0%, transparent 55%),
            linear-gradient(180deg, #2a2a26 0%, #1a1a17 100%);
          color:#e0d6bc;
        }
        /* Sky grain */
        .s13::before { content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); mix-blend-mode:screen; }
        /* Construction stripes at bottom */
        .s13-barrier { position:absolute; left:0; right:0; bottom:64px; height:70px; z-index:6;
          background:repeating-linear-gradient(-45deg, #e0d6bc 0 40px, #1a1a17 40px 80px);
          box-shadow:0 -6px 24px -6px rgba(0,0,0,.6);
        }
        .s13-barrier::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:#e0d6bc; box-shadow:0 -2px 0 #1a1a17; }
        /* Billboard sign */
        .s13-sign { position:absolute; left:64px; right:64px; top:220px; bottom:200px; z-index:5;
          background:
            radial-gradient(120% 90% at 20% 15%, rgba(240,232,206,.98) 0%, rgba(220,208,180,.95) 100%);
          border:4px solid #1a1a17;
          box-shadow:0 40px 90px -40px rgba(0,0,0,.7);
          padding:36px 44px;
          display:flex; flex-direction:column; justify-content:space-between;
        }
        .s13-sign::before, .s13-sign::after {
          content:''; position:absolute; width:22px; height:22px; border-radius:999px; background:#1a1a17;
          border:3px solid #e0d6bc;
        }
        .s13-sign::before { top:14px; left:14px; }
        .s13-sign::after { top:14px; right:14px; }
        .s13-sign .brc { position:absolute; width:22px; height:22px; border-radius:999px; background:#1a1a17; border:3px solid #e0d6bc; }
        .s13-sign .brc.bl { bottom:14px; left:14px; }
        .s13-sign .brc.br { bottom:14px; right:14px; }
        /* Support struts anchoring the sign to the barrier */
        .s13-strut { position:absolute; bottom:70px; width:20px; height:180px; background:linear-gradient(180deg, rgba(0,0,0,.7), rgba(0,0,0,.9)); z-index:5; }
        .s13-strut.l { left:150px; }
        .s13-strut.r { right:150px; }
        .s13-strut::before, .s13-strut::after { content:''; position:absolute; left:-6px; right:-6px; height:8px; background:rgba(0,0,0,.85); }
        .s13-strut::before { top:0; }
        .s13-strut::after { bottom:0; }
        /* Sign contents */
        .s13-tag { align-self:flex-start; display:inline-flex; align-items:center; gap:14px;
          padding:12px 20px; background:#e0d6bc; color:#1a1a17;
          font-family:var(--font-mono); font-weight:700; font-size:16px; letter-spacing:.42em; text-transform:uppercase;
          box-shadow:0 6px 0 rgba(0,0,0,.75);
        }
        .s13-tag .diamond { display:inline-block; width:12px; height:12px; background:#1a1a17; transform:rotate(45deg); }
        .s13-body { margin-top:16px; display:flex; flex-direction:column; gap:22px; }
        .s13-body .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(26,26,23,.6); }
        .s13-body .head { font-family:var(--font-display); font-weight:500; font-size:74px; line-height:1.02; letter-spacing:-.022em; color:#1a1a17; }
        .s13-body .head em { font-style:italic; color:#6b5a42; }
        .s13-meta {
          margin-top:auto; padding-top:20px; border-top:2px solid rgba(26,26,23,.35);
          display:grid; grid-template-columns:1fr 1fr; gap:14px 30px;
          font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(26,26,23,.7);
        }
        .s13-meta .k { display:block; color:rgba(26,26,23,.5); font-size:11px; letter-spacing:.4em; margin-bottom:4px; }
        .s13-meta .v { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; text-transform:none; color:#1a1a17; }
        /* Top mast */
        .s13-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(234,228,208,.75); }
        .s13-mast img { height:52px; width:auto; filter:brightness(1.05); }
        /* Footer bar */
        .s13-footbar { position:absolute; left:0; right:0; bottom:0; height:64px; z-index:7; background:#1a1a17; display:flex; align-items:center; justify-content:space-between; padding:0 80px; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(234,228,208,.6); }
      `,
      body: (ctx) => `
        <div class="s13">
          <div class="s13-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Site 13 · Now Being Built</span>
          </div>
          <div class="s13-sign">
            <span class="brc bl"></span><span class="brc br"></span>
            <span class="s13-tag"><span class="diamond"></span>Under Construction</span>
            <div class="s13-body">
              <span class="kick">— The future, in progress</span>
              <p class="head">The future of Northwest Oregon belongs to those <em>willing to build it.</em></p>
            </div>
            <div class="s13-meta">
              <div><span class="k">Contractor</span><span class="v">You & your neighbours</span></div>
              <div><span class="k">Completion</span><span class="v">A generation from now</span></div>
              <div><span class="k">Permit</span><span class="v">#25045-NWOR</span></div>
              <div><span class="k">Inspection</span><span class="v">Every election</span></div>
            </div>
          </div>
          <span class="s13-strut l"></span>
          <span class="s13-strut r"></span>
          <div class="s13-barrier"></div>
          <div class="s13-footbar">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 14 — "We believe every town deserves a voice."
     Creative direction: broadcast sonar. Concentric ripple rings
     radiate from a small town marker on a stylized Northwest
     Oregon coast; town labels sit at the tips of the ripples;
     the manifesto set as ham-radio frequency call-out.
  ------------------------------------------------------------ */
  {
    id: 'story-14-every-town',
    tag: 'Beliefs',
    title: 'We believe every town deserves a voice.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s14 {
          position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 40%, rgba(90,140,110,.24) 0%, transparent 55%),
            radial-gradient(120% 100% at 50% 100%, rgba(0,0,0,.9) 0%, transparent 65%),
            linear-gradient(178deg, #0b1b1a 0%, #071010 100%);
          color:#e0e5db;
        }
        .s14::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(1.5px 1.5px at 14% 22%, rgba(200,240,220,.3), transparent 60%),
            radial-gradient(1.5px 1.5px at 82% 12%, rgba(200,240,220,.35), transparent 60%),
            radial-gradient(2px 2px at 62% 74%, rgba(200,240,220,.3), transparent 60%),
            radial-gradient(1.5px 1.5px at 24% 62%, rgba(200,240,220,.25), transparent 60%);
          pointer-events:none;
        }
        .s14-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; gap:24px; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(224,229,219,.7); }
        .s14-mast img { height:56px; width:auto; filter:brightness(1.05); }
        /* Sonar disk */
        .s14-radar {
          position:absolute; top:340px; left:50%; width:880px; height:880px;
          transform:translateX(-50%);
          z-index:4;
        }
        .s14-radar .ring { position:absolute; inset:0; border-radius:999px; border:1px solid rgba(200,240,220,.35); }
        .s14-radar .ring.r1 { inset:0; }
        .s14-radar .ring.r2 { inset:80px; opacity:.55; }
        .s14-radar .ring.r3 { inset:160px; opacity:.4; }
        .s14-radar .ring.r4 { inset:240px; opacity:.32; }
        .s14-radar .ring.r5 { inset:320px; opacity:.24; }
        .s14-radar .crosshair-h { position:absolute; left:0; right:0; top:50%; height:1px; background:rgba(200,240,220,.28); }
        .s14-radar .crosshair-v { position:absolute; top:0; bottom:0; left:50%; width:1px; background:rgba(200,240,220,.28); }
        .s14-radar .dot { position:absolute; width:20px; height:20px; border-radius:999px; background:#e0d6bc; box-shadow:0 0 30px rgba(200,240,220,.7); }
        .s14-radar .dot.origin { left:calc(50% - 10px); top:calc(50% - 10px); background:#e0d6bc; box-shadow:0 0 40px rgba(244,215,143,.9); }
        .s14-radar .town { position:absolute; display:flex; align-items:center; gap:12px; font-family:var(--font-mono); font-size:14px; letter-spacing:.32em; text-transform:uppercase; color:#e0e5db; white-space:nowrap; }
        .s14-radar .town .marker { display:inline-block; width:14px; height:14px; border:2px solid #e0d6bc; border-radius:999px; }
        .s14-radar .town.a { top:40px; left:calc(50% + 90px); }
        .s14-radar .town.b { top:280px; right:calc(50% + 260px); flex-direction:row-reverse; }
        .s14-radar .town.c { bottom:220px; left:calc(50% + 220px); }
        .s14-radar .town.d { bottom:40px; right:calc(50% + 60px); flex-direction:row-reverse; }
        .s14-radar .town.e { top:calc(50% + 40px); left:calc(50% - 240px); }
        /* Left-side call-out */
        .s14-callout {
          position:absolute; top:220px; left:80px; z-index:6;
          font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase;
          color:rgba(224,229,219,.6);
        }
        .s14-callout::after { content:''; display:block; margin-top:12px; width:100px; height:1px; background:currentColor; opacity:.5; }
        /* Bottom message */
        .s14-message { position:absolute; left:80px; right:80px; bottom:170px; z-index:5; }
        .s14-message .head { font-family:var(--font-display); font-weight:500; font-size:80px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; }
        .s14-message .head em { font-style:italic; color:#e0d6bc; }
        .s14-message .sub { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:38px; letter-spacing:-.015em; color:rgba(224,229,219,.75); }
        /* Frequency meta */
        .s14-freq { position:absolute; left:80px; right:80px; bottom:110px; z-index:5; display:flex; align-items:center; gap:22px; font-family:var(--font-mono); font-size:12px; letter-spacing:.38em; text-transform:uppercase; color:rgba(224,229,219,.55); }
        .s14-freq .rule { flex:1; height:1px; background:rgba(224,229,219,.35); }
        .s14-foot { position:absolute; left:80px; right:80px; bottom:60px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(224,229,219,.45); }
      `,
      body: (ctx) => `
        <div class="s14">
          <div class="s14-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Frequency 14 · Every Town</span>
          </div>
          <div class="s14-callout">— Broadcast log · Northwest Oregon</div>
          <div class="s14-radar">
            <div class="ring r1"></div>
            <div class="ring r2"></div>
            <div class="ring r3"></div>
            <div class="ring r4"></div>
            <div class="ring r5"></div>
            <div class="crosshair-h"></div>
            <div class="crosshair-v"></div>
            <div class="dot origin"></div>
            <span class="town a"><span class="marker"></span>Astoria</span>
            <span class="town b">Hillsboro<span class="marker"></span></span>
            <span class="town c"><span class="marker"></span>Tillamook</span>
            <span class="town d">Forest Grove<span class="marker"></span></span>
            <span class="town e"><span class="marker"></span>Columbia County</span>
          </div>
          <div class="s14-message">
            <div class="head">We believe every town deserves a <em>voice.</em></div>
            <div class="sub">Not just the biggest ones.</div>
          </div>
          <div class="s14-freq">
            <span>Signal · 25.045 MHz</span>
            <span class="rule"></span>
            <span>Range · The entire region</span>
          </div>
          <div class="s14-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 15 — Question: "What issue matters most in your community?"
     Creative direction: vintage voting-booth curtain. Deep crimson
     heavy velvet with visible pleats + gold rope tie; the question
     is lit by a spotlight center-stage. Yellow taped margin note
     for the IG ask sticker.
  ------------------------------------------------------------ */
  {
    id: 'story-15-issue-question',
    tag: 'Values',
    title: 'What issue matters most in your community?',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s15 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(90% 60% at 50% 30%, rgba(224,214,188,.24) 0%, transparent 55%),
            radial-gradient(120% 100% at 50% 100%, rgba(14,22,17,.95) 0%, transparent 65%),
            linear-gradient(178deg, #2e4538 0%, #101815 100%);
          color:#f6f2e8;
        }
        /* Velvet pleats — forest stripe pattern */
        .s15::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:
            repeating-linear-gradient(90deg, rgba(28,43,35,.6) 0 40px, rgba(90,112,96,.2) 40px 80px, rgba(28,43,35,.6) 80px 120px);
          mix-blend-mode:multiply; opacity:.55;
        }
        .s15::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(60% 45% at 50% 42%, rgba(224,214,188,.22) 0%, rgba(224,214,188,0) 55%);
        }
        /* Left + right pleated curtain frame — forest velvet */
        .s15-curtain {
          position:absolute; top:0; bottom:0; width:26%; z-index:3;
          background:
            repeating-linear-gradient(90deg, rgba(14,22,17,.9) 0 30px, rgba(28,43,35,.7) 30px 60px);
          box-shadow:inset 0 0 60px rgba(14,22,17,.75);
        }
        .s15-curtain.l { left:0; border-right:2px solid rgba(224,214,188,.18); }
        .s15-curtain.r { right:0; border-left:2px solid rgba(224,214,188,.18); }
        /* Gold rope tie-back */
        .s15-rope { position:absolute; z-index:5; }
        .s15-rope.l { top:calc(50% - 40px); left:26%; }
        .s15-rope.r { top:calc(50% - 40px); right:26%; transform:scaleX(-1); }
        /* Spotlight pool */
        .s15-spot {
          position:absolute; top:280px; left:50%; transform:translateX(-50%);
          width:660px; height:660px; z-index:4; pointer-events:none;
          background:radial-gradient(50% 50% at 50% 50%, rgba(255,240,190,.22) 0%, rgba(255,240,190,0) 55%);
          filter:blur(6px);
        }
        /* Mast */
        .s15-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(246,236,201,.75); }
        .s15-mast img { height:54px; width:auto; filter:brightness(1.1); }
        /* Program card */
        .s15-card {
          position:absolute; top:280px; left:26%; right:26%; z-index:5;
          padding:44px 44px 40px;
          background:#f6f2e8;
          color:#2a2a26;
          box-shadow:0 40px 90px -30px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.6);
          transform:rotate(-1.2deg);
        }
        .s15-card::before { content:''; position:absolute; top:14px; left:14px; right:14px; bottom:14px; border:1px double #2a2a26; pointer-events:none; }
        .s15-card .header { display:flex; align-items:baseline; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,26,18,.65); }
        .s15-card .header .no { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2a2a26; text-transform:none; }
        .s15-card .rule { margin:18px 0 26px; height:2px; background:#2a2a26; }
        .s15-card .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(58,26,18,.65); }
        .s15-card .q { margin-top:12px; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#2a2a26; }
        .s15-card .q em { font-style:italic; color:#6b5a42; }
        .s15-card .sub { margin-top:22px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; color:#2a2a26; letter-spacing:-.012em; }
        /* Yellow tape note */
        .s15-note {
          position:absolute; right:52px; bottom:260px; z-index:8;
          transform:rotate(4deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:12px 20px 14px; box-shadow:0 10px 24px -12px rgba(0,0,0,.55); max-width:280px;
        }
        .s15-note::before, .s15-note::after { content:''; position:absolute; top:-10px; width:70px; height:18px; background:rgba(200,180,120,.5); }
        .s15-note::before { left:18px; transform:rotate(-4deg); }
        .s15-note::after  { right:18px; transform:rotate(6deg); }
        /* Footer */
        .s15-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,236,201,.55); }
      `,
      body: (ctx) => `
        <div class="s15">
          <div class="s15-curtain l"></div>
          <div class="s15-curtain r"></div>
          <div class="s15-spot"></div>
          <div class="s15-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Program 15 · The Floor is Yours</span>
          </div>
          <div class="s15-card">
            <div class="header"><span>The Northwest Program</span><span class="no">Act 15</span></div>
            <div class="rule"></div>
            <span class="kick">— The question to the audience</span>
            <div class="q">What issue matters most in your <em>community?</em></div>
            <div class="sub">Tell us below.</div>
          </div>
          <div class="s15-note">Overlay Instagram<br />ask sticker here</div>
          <div class="s15-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 16 — "Supporting local candidates. Building stronger…"
     Creative direction: three matte-print posters stacked at
     slight angles, as if pinned to a wall. Each poster carries
     one of the three lines, with its own color story and
     specimen type-block.
  ------------------------------------------------------------ */
  {
    id: 'story-16-supporting-local',
    tag: 'Introduction',
    title: 'Supporting local candidates.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s16 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 5%, rgba(90,80,60,.28) 0%, transparent 55%),
            linear-gradient(180deg, #2a2a26 0%, #1a1815 100%);
          color:#f0efe3;
        }
        .s16::before {
          content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.22  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:screen;
        }
        .s16-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.65); }
        .s16-mast img { height:52px; width:auto; filter:brightness(1.05); }
        .s16-kicker { position:absolute; top:200px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); display:inline-flex; align-items:center; gap:16px; }
        .s16-kicker::before { content:''; display:inline-block; width:44px; height:1px; background:currentColor; opacity:.55; }
        /* Poster stack */
        .s16-stack { position:absolute; top:260px; bottom:200px; left:60px; right:60px; z-index:5; }
        .s16-poster {
          position:absolute; padding:38px 38px 34px;
          box-shadow:0 30px 60px -24px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.05);
          display:flex; flex-direction:column; gap:24px;
        }
        .s16-poster .pin { position:absolute; top:-8px; left:32px; width:22px; height:22px; border-radius:999px;
          background:radial-gradient(circle at 30% 30%, #e0d6bc 0%, #6b5a42 70%);
          box-shadow:0 4px 10px rgba(0,0,0,.5); }
        .s16-poster .no { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:36px; letter-spacing:-.02em; }
        .s16-poster .kick { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; }
        .s16-poster .head { font-family:var(--font-display); font-weight:500; font-size:62px; line-height:1.02; letter-spacing:-.022em; }
        .s16-poster .head em { font-style:italic; }
        .s16-poster .rule { width:60px; height:2px; }
        .s16-poster .meta { font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; opacity:.7; margin-top:auto; padding-top:16px; border-top:1px solid rgba(0,0,0,.15); }
        /* Poster 1 - top-left */
        .s16-poster.p1 { top:0; left:0; width:520px; height:340px; background:#e0d6bc; color:#2e4538; transform:rotate(-3.5deg); }
        .s16-poster.p1 .rule { background:#6b5a42; }
        .s16-poster.p1 .head em { color:#6b5a42; }
        /* Poster 2 - middle-right */
        .s16-poster.p2 { top:220px; right:0; width:520px; height:340px; background:#2e4538; color:#f0efe3; transform:rotate(2.4deg); }
        .s16-poster.p2 .rule { background:#e0d6bc; }
        .s16-poster.p2 .head em { color:#e0d6bc; }
        /* Poster 3 - bottom-left */
        .s16-poster.p3 { bottom:0; left:20px; width:540px; height:340px; background:#e0d6bc; color:#3d2f14; transform:rotate(-1.8deg); }
        .s16-poster.p3 .rule { background:#3d2f14; }
        .s16-poster.p3 .head em { color:#6b5a42; font-style:italic; }
        .s16-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.5); }
      `,
      body: (ctx) => `
        <div class="s16">
          <div class="s16-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Wall 16 · Poster Series</span>
          </div>
          <span class="s16-kicker">Three prints, pulled from the wall</span>

          <div class="s16-stack">
            <div class="s16-poster p1">
              <span class="pin"></span>
              <span class="no">i.</span>
              <span class="kick">Print № 01 · The endorsement</span>
              <p class="head">Supporting <em>local</em> candidates.</p>
              <span class="rule"></span>
              <span class="meta">Northwest Oregon PAC · Series 2026</span>
            </div>
            <div class="s16-poster p2">
              <span class="pin"></span>
              <span class="no">ii.</span>
              <span class="kick">Print № 02 · The workshop</span>
              <p class="head">Building <em>stronger</em> campaigns.</p>
              <span class="rule"></span>
              <span class="meta">Volunteer bench · Precinct-tested</span>
            </div>
            <div class="s16-poster p3">
              <span class="pin"></span>
              <span class="no">iii.</span>
              <span class="kick">Print № 03 · The neighborhood</span>
              <p class="head">Growing <em>stronger</em> communities.</p>
              <span class="rule"></span>
              <span class="meta">Long-run edition · Continues forever</span>
            </div>
          </div>

          <div class="s16-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 17 — "You don't have to run for office to make a
     difference. You simply have to get involved."
     Creative direction: editorial two-column magazine spread with
     an oversized drop-cap "Y" on the left column and a big italic
     gold pull-quote on the right.
  ------------------------------------------------------------ */
  {
    id: 'story-17-dont-need-office',
    tag: 'Get involved',
    title: "You don't have to run for office to make a difference.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s17 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
        }
        .s17::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.14  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply; pointer-events:none;
        }
        .s17-mast { position:absolute; top:80px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s17-mast img { height:52px; width:auto; }
        .s17-runhead { position:absolute; top:170px; left:76px; right:76px; z-index:6; display:flex; align-items:center; justify-content:space-between; padding-bottom:14px; border-bottom:1.5px solid #2e4538; font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,42,20,.65); }
        .s17-runhead .title { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Body — two columns; left column widened so wrap breathes */
        .s17-body { position:absolute; top:250px; bottom:200px; left:76px; right:76px; z-index:5; display:grid; grid-template-columns:1.4fr 1px 1fr; gap:36px; }
        .s17-body .col-rule { background:linear-gradient(180deg, rgba(46,42,20,.35) 0%, rgba(46,42,20,0) 100%); }
        /* Left column — drop cap sits inline, paragraph reads normally */
        .s17-left { position:relative; display:flex; flex-direction:column; justify-content:center; gap:20px; }
        .s17-left .dropcap {
          font-family:var(--font-display); font-weight:500; font-style:italic;
          font-size:220px; line-height:.85; letter-spacing:-.05em; color:#2e4538;
          float:left; margin:8px 24px 0 0; padding:0;
          shape-outside:margin-box;
        }
        .s17-left p { font-family:var(--font-display); font-weight:500; font-size:44px; line-height:1.14; letter-spacing:-.018em; color:#2e4538; }
        .s17-left p em { font-style:italic; color:#6b5a42; font-weight:500; }
        .s17-left .attribution { margin-top:28px; padding-top:14px; border-top:1px solid rgba(46,42,20,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); clear:both; }
        /* Right column - pull quote */
        .s17-right { display:flex; flex-direction:column; justify-content:center; gap:20px; }
        .s17-right .qmark { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:160px; line-height:.55; color:rgba(107,90,66,.9); letter-spacing:-.06em; }
        .s17-right .pull { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:48px; line-height:1.1; letter-spacing:-.02em; color:#2e4538; }
        .s17-right .pull em { font-style:normal; color:#6b5a42; }
        .s17-right .sig { margin-top:20px; display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,42,20,.55); }
        .s17-right .sig::before { content:''; width:40px; height:1px; background:currentColor; opacity:.55; }
        /* Folio (page number) */
        .s17-folio { position:absolute; bottom:130px; left:50%; transform:translateX(-50%); z-index:6; font-family:var(--font-display); font-style:italic; font-size:24px; color:rgba(46,42,20,.55); letter-spacing:-.01em; }
        .s17-foot { position:absolute; left:76px; right:76px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,42,20,.5); }
      `,
      body: (ctx) => `
        <div class="s17">
          <div class="s17-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Spread 17 · Two Columns</span>
          </div>
          <div class="s17-runhead">
            <span>The Northwest Reader</span>
            <span class="title">A note on participation</span>
            <span>P. 17</span>
          </div>
          <div class="s17-body">
            <div class="s17-left">
              <span class="dropcap">Y</span>
              <p>ou don't have to <em>run</em> for office to make a <em>difference.</em></p>
              <span class="attribution">— A note to the reader</span>
            </div>
            <div class="col-rule"></div>
            <div class="s17-right">
              <span class="qmark">"</span>
              <p class="pull">You simply have to <em>get involved.</em></p>
              <span class="sig">The invitation stands</span>
            </div>
          </div>
          <span class="s17-folio">— 17 —</span>
          <div class="s17-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 18 — "Communities thrive when neighbours work together"
     Creative direction: hand-loom textile diagram. Interlocking
     warp and weft rules visualize the neighbours-woven metaphor.
     Warm ecru palette, edge finishing, editorial swatch labels.
  ------------------------------------------------------------ */
  {
    id: 'story-18-neighbours-thrive',
    tag: 'Introduction',
    title: 'Communities thrive when neighbours work together.',
    template: 'custom',
    meta: { forceSurface: 's-sand', hideChrome: true },
    data: {
      css: `
        .s18 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(240,224,180,.6) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #d7c592 100%);
          color:#3a2c14;
        }
        .s18::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.32 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply; pointer-events:none;
        }
        .s18-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(58,44,20,.7); }
        .s18-mast img { height:52px; width:auto; }
        .s18-kicker { position:absolute; top:200px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,44,20,.55); display:inline-flex; align-items:center; gap:16px; }
        .s18-kicker::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s18-head { position:absolute; top:250px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:82px; line-height:1.02; letter-spacing:-.022em; color:#3a2c14; max-width:940px; }
        .s18-head em { font-style:italic; color:#6b5a42; }
        /* Loom diagram — a woven grid */
        .s18-loom { position:absolute; left:80px; right:80px; top:580px; height:640px; z-index:4;
          background:#f6f2e8;
          border:1px solid rgba(58,44,20,.35);
          padding:20px;
          box-shadow:0 30px 60px -30px rgba(58,44,20,.5);
        }
        /* Warp (vertical) threads */
        .s18-loom::before {
          content:''; position:absolute; inset:20px;
          background: repeating-linear-gradient(90deg,
            #6b5a42 0 4px, transparent 4px 26px,
            #2e4538 26px 30px, transparent 30px 52px);
        }
        /* Weft (horizontal) threads — offset color band pattern */
        .s18-loom::after {
          content:''; position:absolute; inset:20px;
          background: repeating-linear-gradient(0deg,
            #d7c592 0 6px, #e0d6bc 6px 12px,
            #c8ac70 12px 20px, #e0d6bc 20px 30px);
          mix-blend-mode:multiply; opacity:.85;
        }
        /* Selvage labels around the loom */
        .s18-loom .selvage { position:absolute; font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(58,44,20,.6); }
        .s18-loom .selvage.top    { top:-24px; left:20px; right:20px; display:flex; justify-content:space-between; }
        .s18-loom .selvage.bottom { bottom:-24px; left:20px; right:20px; display:flex; justify-content:space-between; }
        .s18-loom .selvage.left   { left:-40px; top:20px; bottom:20px; writing-mode:vertical-rl; transform:rotate(180deg); display:flex; align-items:center; justify-content:center; letter-spacing:.36em; }
        .s18-loom .selvage.right  { right:-40px; top:20px; bottom:20px; writing-mode:vertical-rl; display:flex; align-items:center; justify-content:center; letter-spacing:.36em; }
        /* Overlaid caption card on the loom */
        .s18-caption {
          position:absolute; left:120px; right:120px; top:calc(580px + 260px); z-index:6;
          background:#f6f2e8; border:1.5px solid #3a2c14; padding:28px 30px;
          box-shadow:0 26px 60px -30px rgba(58,44,20,.55);
          transform:rotate(-1deg);
        }
        .s18-caption .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(58,44,20,.6); }
        .s18-caption .v { margin-top:10px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; line-height:1.16; letter-spacing:-.015em; color:#3a2c14; }
        .s18-swatch { position:absolute; bottom:170px; left:80px; z-index:6; display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(58,44,20,.6); }
        .s18-swatch .chip { display:inline-block; width:22px; height:22px; border:1px solid rgba(58,44,20,.5); }
        .s18-swatch .chip.a { background:#6b5a42; }
        .s18-swatch .chip.b { background:#2e4538; }
        .s18-swatch .chip.c { background:#c8ac70; }
        .s18-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(58,44,20,.55); }
      `,
      body: (ctx) => `
        <div class="s18">
          <div class="s18-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Weave 18 · Field Textile</span>
          </div>
          <span class="s18-kicker">— A study in the warp &amp; weft</span>
          <h1 class="s18-head">Communities thrive when neighbours work <em>together.</em></h1>
          <div class="s18-loom">
            <span class="selvage top"><span>Warp · Values</span><span>Selvage</span></span>
            <span class="selvage bottom"><span>Weft · Actions</span><span>Loom · Northwest</span></span>
            <span class="selvage left">Prosperity · Safety · Voice</span>
            <span class="selvage right">Volunteer · Vote · Show up</span>
          </div>
          <div class="s18-caption">
            <span class="k">— Fig. 18 · Finished cloth</span>
            <div class="v">That's how lasting change begins.</div>
          </div>
          <div class="s18-swatch">
            <span class="chip a"></span><span>Crimson</span>
            <span class="chip b"></span><span>Forest</span>
            <span class="chip c"></span><span>Ochre</span>
          </div>
          <div class="s18-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 19 — Poll: "Would you volunteer for a local campaign?"
     Creative direction: enlistment recruitment poster. Bold
     serif "I need you" style with halftone Oregon stripe and
     two ballot-oval styled options.
  ------------------------------------------------------------ */
  {
    id: 'story-19-volunteer-poll',
    tag: 'Get involved',
    title: 'Would you volunteer for a local campaign?',
    template: 'custom',
    meta: { forceSurface: 's-sand', hideChrome: true },
    data: {
      css: `
        .s19 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,224,180,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #ddc890 100%);
          color:#2e1a0a;
        }
        .s19::before {
          content:''; position:absolute; inset:0; opacity:.45;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.16  0 0 0 0 0.08  0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply; pointer-events:none;
        }
        /* Halftone dot pattern above the fold */
        .s19-halftone {
          position:absolute; top:-40px; left:-40px; right:-40px; height:340px; z-index:3; pointer-events:none;
          background-image: radial-gradient(circle at 8px 8px, rgba(107,90,66,.85) 3px, transparent 3.5px);
          background-size:22px 22px;
          -webkit-mask-image:linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 100%);
          mask-image:linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 100%);
          opacity:.55;
        }
        /* Diagonal ribbon behind title */
        .s19-ribbon {
          position:absolute; top:340px; left:-40px; right:-40px; height:120px; z-index:3;
          background:#6b5a42;
          transform:rotate(-3deg);
          box-shadow:0 20px 40px -22px rgba(0,0,0,.4);
        }
        .s19-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,26,10,.7); }
        .s19-mast img { height:56px; width:auto; }
        .s19-tag { position:absolute; top:220px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,26,10,.65); display:inline-flex; align-items:center; gap:16px; }
        .s19-tag::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s19-title {
          position:absolute; top:360px; left:80px; right:80px; z-index:5;
          transform:rotate(-3deg);
          padding:14px 24px;
          font-family:var(--font-display); font-weight:500; font-style:italic; font-size:64px; line-height:1.02; letter-spacing:-.022em;
          color:#f6f2e8;
          text-shadow:0 3px 20px rgba(0,0,0,.4);
        }
        .s19-title strong { font-weight:500; font-style:normal; color:#e0d6bc; letter-spacing:-.02em; }
        /* Enlistment paper */
        .s19-paper {
          position:absolute; left:80px; right:80px; top:600px; bottom:220px; z-index:5;
          padding:38px 40px 32px;
          background:#f6f2e8;
          border:2px solid #2e1a0a;
          box-shadow:0 30px 60px -30px rgba(46,26,10,.5), inset 0 1px 0 rgba(255,255,255,.6);
        }
        .s19-paper::before { content:''; position:absolute; top:8px; left:8px; right:8px; bottom:8px; border:1px dashed rgba(46,26,10,.4); pointer-events:none; }
        .s19-paper .kick { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(46,26,10,.6); }
        .s19-paper .stamp {
          position:absolute; top:24px; right:34px;
          font-family:var(--font-mono); font-weight:700; font-size:16px; letter-spacing:.4em; text-transform:uppercase; color:#6b5a42;
          border:3px solid #6b5a42; padding:8px 14px; transform:rotate(4deg);
        }
        .s19-paper .prompt { margin-top:12px; font-family:var(--font-display); font-weight:500; font-size:34px; line-height:1.12; letter-spacing:-.015em; color:#2e1a0a; max-width:600px; }
        .s19-paper .prompt em { font-style:italic; color:#6b5a42; }
        .s19-paper .opts { margin-top:22px; display:flex; flex-direction:column; gap:14px; }
        .s19-paper .opt { display:flex; align-items:center; gap:22px; padding:16px 20px; border:1.5px solid rgba(46,26,10,.55); background:rgba(255,250,232,.6); }
        .s19-paper .opt .oval { flex:none; width:38px; height:56px; border:2.5px solid #2e1a0a; border-radius:999px; display:flex; align-items:center; justify-content:center; }
        .s19-paper .opt.filled .oval { background:#2e1a0a; }
        .s19-paper .opt .mark { color:#f6f2e8; font-family:var(--font-display); font-weight:500; font-size:28px; line-height:1; font-style:italic; }
        .s19-paper .opt .lbl { flex:1; font-family:var(--font-display); font-weight:500; font-size:34px; letter-spacing:-.015em; color:#2e1a0a; }
        .s19-paper .opt .abc { font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; color:rgba(46,26,10,.6); text-transform:uppercase; }
        .s19-note {
          position:absolute; right:36px; bottom:120px; z-index:8;
          transform:rotate(3deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:10px 16px 12px; box-shadow:0 10px 24px -12px rgba(0,0,0,.5); max-width:270px;
        }
        .s19-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(46,26,10,.55); }
      `,
      body: (ctx) => `
        <div class="s19">
          <div class="s19-halftone"></div>
          <div class="s19-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Enlistment 19 · Volunteer Call</span>
          </div>
          <span class="s19-tag">— A recruitment notice, printed in earnest</span>
          <div class="s19-ribbon"></div>
          <div class="s19-title"><strong>Northwest Oregon</strong> needs you.</div>

          <div class="s19-paper">
            <span class="stamp">Ballot · Poll</span>
            <span class="kick">The Question · Enlistment 19 of 30</span>
            <p class="prompt">Would you <em>volunteer</em> for a local campaign?</p>
            <div class="opts">
              <div class="opt filled">
                <span class="oval"><span class="mark">✓</span></span>
                <span class="lbl">Absolutely</span>
                <span class="abc">A</span>
              </div>
              <div class="opt">
                <span class="oval"></span>
                <span class="lbl">I would Like More Info</span>
                <span class="abc">B</span>
              </div>
            </div>
          </div>

          <div class="s19-note">Overlay Instagram<br />poll sticker here</div>

          <div class="s19-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 20 — "Every donation helps build long-term political
     infrastructure across Northwest Oregon."
     Creative direction: an architectural cross-section. A tower
     rising from a stack of coins; editorial call-outs point to
     each floor (candidates, volunteers, outreach, comms); the
     manifesto crowns the tower.
  ------------------------------------------------------------ */
  {
    id: 'story-20-every-donation',
    tag: 'Support',
    title: 'Every donation helps build long-term political infrastructure across Northwest Oregon.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s20 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 15%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #d9c99e 100%);
          color:#2a2213;
        }
        .s20-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.7); }
        .s20-mast img { height:52px; width:auto; }
        .s20-kicker { position:absolute; top:210px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,34,19,.6); display:inline-flex; align-items:center; gap:16px; }
        .s20-kicker::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s20-head { position:absolute; top:250px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:62px; line-height:1.04; letter-spacing:-.022em; color:#2e4538; max-width:940px; }
        .s20-head em { font-style:italic; color:#6b5a42; }
        /* Elevation diagram — the tower */
        .s20-elevation { position:absolute; left:80px; right:80px; top:520px; bottom:230px; z-index:4; display:grid; grid-template-columns:100px 1fr 260px; gap:24px; }
        .s20-elevation .scale { position:relative; }
        .s20-elevation .scale::after {
          content:''; position:absolute; left:22px; top:0; bottom:0; width:1px; background:linear-gradient(180deg, rgba(42,34,19,.5) 0%, rgba(42,34,19,.2) 100%);
        }
        .s20-elevation .scale .tick {
          position:absolute; left:12px; width:24px; height:1px; background:rgba(42,34,19,.55);
          font-family:var(--font-mono); font-size:10px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.6);
        }
        .s20-elevation .scale .tick::after { content:attr(data-h); position:absolute; left:34px; top:-6px; white-space:nowrap; }
        .s20-elevation .tower { position:relative; display:flex; flex-direction:column; }
        .s20-elevation .tower .floor {
          flex:1; border:2px solid #2a2213; border-bottom:none;
          background:linear-gradient(180deg, rgba(240,232,206,.6) 0%, rgba(180,160,100,.35) 100%);
          padding:14px 22px;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
        }
        .s20-elevation .tower .floor:last-of-type { border-bottom:2px solid #2a2213; }
        .s20-elevation .tower .floor .no { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:30px; color:#2e4538; letter-spacing:-.01em; }
        .s20-elevation .tower .floor .name { font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:#2a2213; }
        .s20-elevation .tower .foundation {
          margin-top:6px; padding:8px 22px; background:#2a2213; color:#f6f2e8;
          font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase;
          display:flex; align-items:center; justify-content:space-between;
        }
        .s20-elevation .tower .foundation .coins { display:flex; align-items:center; gap:6px; }
        .s20-elevation .tower .foundation .coin { display:inline-block; width:22px; height:22px; border-radius:999px; background:radial-gradient(circle at 30% 30%, #e0d6bc 0%, #6b5a42 90%); border:1px solid #3d2f14; }
        /* Callouts on the right */
        .s20-elevation .callouts { display:flex; flex-direction:column; justify-content:space-between; padding:6px 0; }
        .s20-elevation .callouts .co { display:flex; align-items:center; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.75); }
        .s20-elevation .callouts .co .stroke { flex:none; width:36px; height:1px; background:#2e4538; }
        .s20-elevation .callouts .co .val { font-family:var(--font-display); font-style:italic; font-size:20px; letter-spacing:-.01em; color:#2e4538; text-transform:none; }
        /* Bottom banner */
        .s20-band { position:absolute; left:80px; right:80px; bottom:140px; z-index:6; padding:14px 22px; background:#2e4538; color:#f6f2e8; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; }
        .s20-band .em { font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .s20-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.55); }
      `,
      body: (ctx) => `
        <div class="s20">
          <div class="s20-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Elevation 20 · Long-term Build</span>
          </div>
          <span class="s20-kicker">Section drawing · Investment infrastructure</span>
          <h1 class="s20-head">Every donation helps build long-term political <em>infrastructure</em> across Northwest Oregon.</h1>

          <div class="s20-elevation">
            <div class="scale">
              <span class="tick" style="top:0" data-h="Comms"></span>
              <span class="tick" style="top:25%" data-h="Outreach"></span>
              <span class="tick" style="top:50%" data-h="Volunteers"></span>
              <span class="tick" style="top:75%" data-h="Candidates"></span>
              <span class="tick" style="top:100%" data-h="Base"></span>
            </div>
            <div class="tower">
              <div class="floor"><span class="no">04</span><span class="name">Communications</span></div>
              <div class="floor"><span class="no">03</span><span class="name">Outreach</span></div>
              <div class="floor"><span class="no">02</span><span class="name">Volunteers</span></div>
              <div class="floor"><span class="no">01</span><span class="name">Candidates</span></div>
              <div class="foundation">
                <span>Foundation · Every dollar</span>
                <span class="coins"><span class="coin"></span><span class="coin"></span><span class="coin"></span><span class="coin"></span></span>
              </div>
            </div>
            <div class="callouts">
              <div class="co"><span class="stroke"></span><span class="val">Message the region</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Meet every voter</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Show up together</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Field capable people</span></div>
              <div class="co"><span class="stroke"></span><span class="val">Rests on you</span></div>
            </div>
          </div>

          <div class="s20-band">
            <span>Long-term infrastructure</span>
            <span class="em">Built to last across the region.</span>
          </div>

          <div class="s20-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 21 — "Leadership isn't about titles. It's about serving
     your community."
     Creative direction: a manuscript being copy-edited. The word
     "titles" is struck through with a heavy black bar; "serving"
     is highlighted with a soft yellow marker. Editor's margin
     marks in mono.
  ------------------------------------------------------------ */
  {
    id: 'story-21-leadership-not-titles',
    tag: 'Values',
    title: "Leadership isn't about titles.",
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s21 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(250,244,220,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #e0d6bc 100%);
          color:#2a2213;
        }
        .s21::before {
          content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        /* Faint horizontal ruled lines like typing paper */
        .s21-page {
          position:absolute; top:200px; bottom:200px; left:70px; right:70px; z-index:4;
          background:
            repeating-linear-gradient(180deg, rgba(42,34,19,0) 0 65px, rgba(42,34,19,.12) 65px 66px);
          padding:40px 46px;
        }
        /* Left margin red rule (like manuscript paper) */
        .s21-page::before {
          content:''; position:absolute; left:130px; top:20px; bottom:20px; width:1.5px; background:#6b5a42; opacity:.55;
        }
        .s21-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.7); }
        .s21-mast img { height:52px; width:auto; }
        .s21-editor { position:absolute; top:190px; right:60px; z-index:6; padding:8px 14px; background:#6b5a42; color:#f6f2e8; font-family:var(--font-mono); font-size:11px; letter-spacing:.42em; text-transform:uppercase; transform:rotate(3deg); box-shadow:0 6px 14px -6px rgba(0,0,0,.4); }
        /* Numbered draft header inside page */
        .s21-header { display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding-bottom:14px; border-bottom:1.5px solid rgba(42,34,19,.35); font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(42,34,19,.6); margin-left:80px; }
        .s21-header .draft { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2a2213; text-transform:none; }
        /* The two "sentences" being copy-edited */
        .s21-para { margin:36px 0 0 80px; font-family:var(--font-display); font-weight:500; font-size:68px; line-height:1.06; letter-spacing:-.02em; color:#2a2213; }
        .s21-para .strike {
          position:relative; color:rgba(42,34,19,.6);
        }
        .s21-para .strike::before {
          content:''; position:absolute; left:-6px; right:-6px; top:calc(50% + 4px); height:12px; background:#2a2213; transform:rotate(-1.2deg);
        }
        .s21-para .highlight {
          background:linear-gradient(180deg, rgba(90,112,96,0) 20%, rgba(90,112,96,.55) 20%, rgba(90,112,96,.55) 90%, rgba(90,112,96,0) 90%);
          padding:0 6px; box-decoration-break:clone; -webkit-box-decoration-break:clone;
          color:#2a2a26;
        }
        .s21-para em { font-style:italic; }
        /* Editor's margin marks */
        .s21-marginmark { position:absolute; font-family:var(--font-display); font-style:italic; color:#6b5a42; }
        .s21-marginmark.m1 { top:230px; left:80px; font-size:36px; transform:rotate(-8deg); }
        .s21-marginmark.m2 { top:400px; left:80px; font-size:28px; letter-spacing:.02em; font-style:italic; }
        .s21-note {
          position:absolute; right:74px; bottom:280px; z-index:6;
          padding:12px 16px; background:#faf4d8;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:#4b3a20;
          transform:rotate(2.5deg); box-shadow:0 10px 24px -12px rgba(0,0,0,.4); max-width:250px;
        }
        .s21-note::before {
          content:'M'; position:absolute; top:-18px; left:6px;
          font-family:var(--font-display); font-style:italic; font-size:28px; color:#6b5a42;
        }
        .s21-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.55); }
      `,
      body: (ctx) => `
        <div class="s21">
          <div class="s21-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Draft 21 · Copy Edit</span>
          </div>
          <span class="s21-editor">Editor's Proof</span>

          <div class="s21-page">
            <div class="s21-header">
              <span>The Northwest Editorial</span>
              <span class="draft">A definition of leadership</span>
              <span>Rev. 21</span>
            </div>

            <span class="s21-marginmark m1">✎</span>
            <p class="s21-para">Leadership <em>isn't</em> about <span class="strike">titles.</span></p>

            <span class="s21-marginmark m2">stet.</span>
            <p class="s21-para">It's about <span class="highlight">serving</span> your community.</p>
          </div>

          <div class="s21-note">
            Copy-edit approved by<br />the People. Signed 2026.
          </div>

          <div class="s21-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 22 — "Northwest Oregon is worth investing in.
     Today. Tomorrow. Every year."
     Creative direction: wall calendar. Three tear-off pages
     stacked with slight offsets and paperclip binding rings at
     the top. Each page shows one of the three time-markers.
  ------------------------------------------------------------ */
  {
    id: 'story-22-worth-investing',
    tag: 'Support',
    title: 'Northwest Oregon is worth investing in.',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s22 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 10%, rgba(90,112,96,.5) 0%, transparent 55%),
            linear-gradient(178deg, #253e30 0%, #101c15 100%);
          color:#f0efe3;
        }
        .s22-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.7); }
        .s22-mast img { height:52px; width:auto; filter:brightness(1.05); }
        .s22-lede { position:absolute; top:210px; left:80px; right:80px; z-index:6; }
        .s22-lede .kick { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); display:inline-flex; align-items:center; gap:16px; }
        .s22-lede .kick::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s22-lede .head { margin-top:14px; font-family:var(--font-display); font-weight:500; font-size:68px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; max-width:920px; }
        .s22-lede .head em { font-style:italic; color:#e0d6bc; }
        /* Wall pin / binding rings */
        .s22-binding { position:absolute; left:0; right:0; top:520px; height:44px; z-index:5; display:flex; justify-content:center; gap:340px; }
        .s22-binding .ring { width:44px; height:44px; border-radius:999px; border:5px solid #c4b078; background:transparent; box-shadow:0 4px 12px rgba(0,0,0,.5); }
        /* Calendar stack */
        .s22-cal { position:absolute; left:100px; right:100px; top:560px; bottom:200px; z-index:4; }
        .s22-page {
          position:absolute; left:0; right:0; padding:24px 30px;
          background:#f6f2e8; color:#2e2013;
          box-shadow:0 30px 60px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.5);
        }
        .s22-page::before {
          content:''; position:absolute; top:0; left:0; right:0; height:8px;
          background:repeating-linear-gradient(90deg, transparent 0 12px, rgba(46,32,19,.3) 12px 14px);
        }
        .s22-page .row1 { display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(46,32,19,.6); }
        .s22-page .date { font-family:var(--font-display); font-weight:500; font-size:78px; line-height:1; letter-spacing:-.022em; color:#2e4538; margin-top:6px; }
        .s22-page .date em { font-style:italic; color:#6b5a42; }
        .s22-page .row2 { display:flex; align-items:center; justify-content:space-between; gap:20px; padding-top:14px; border-top:1.5px solid rgba(46,32,19,.35); margin-top:14px; font-family:var(--font-mono); font-size:11px; letter-spacing:.36em; text-transform:uppercase; color:rgba(46,32,19,.55); }
        .s22-page.p1 { top:0; transform:rotate(-1.6deg); }
        .s22-page.p2 { top:230px; transform:rotate(1.2deg); background:#dfd5aa; }
        .s22-page.p3 { top:460px; transform:rotate(-0.6deg); background:#c9bd8f; }
        /* Bottom manifesto */
        .s22-tail { position:absolute; left:80px; right:80px; bottom:140px; z-index:6; padding:16px 22px; background:rgba(0,0,0,.35); font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.75); display:flex; align-items:center; justify-content:space-between; }
        .s22-tail .em { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        .s22-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s22">
          <div class="s22-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Calendar 22 · Long horizon</span>
          </div>
          <div class="s22-lede">
            <span class="kick">On the wall this year, and every year</span>
            <h1 class="head">Northwest Oregon is worth <em>investing</em> in.</h1>
          </div>
          <div class="s22-binding"><span class="ring"></span><span class="ring"></span></div>
          <div class="s22-cal">
            <div class="s22-page p1">
              <div class="row1"><span>Page 01</span><span>The moment</span></div>
              <div class="date"><em>Today.</em></div>
              <div class="row2"><span>2026 · Right now</span><span>Volunteer · Donate · Show up</span></div>
            </div>
            <div class="s22-page p2">
              <div class="row1"><span>Page 02</span><span>The next chapter</span></div>
              <div class="date"><em>Tomorrow.</em></div>
              <div class="row2"><span>The election ahead</span><span>Keep building</span></div>
            </div>
            <div class="s22-page p3">
              <div class="row1"><span>Page 03</span><span>Long horizon</span></div>
              <div class="date"><em>Every year.</em></div>
              <div class="row2"><span>The commitment</span><span>Never an afterthought</span></div>
            </div>
          </div>
          <div class="s22-tail"><span>The calendar reads</span><span class="em">— Worth every page turn.</span></div>
          <div class="s22-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 23 — "Small businesses. Strong families. Thriving
     communities. That's worth protecting."
     Creative direction: printer's type-specimen book. Three tiles,
     each with an ornate frame, small serif emblem, and italic
     specimen title; conclusion set as a bookend imprimatur.
  ------------------------------------------------------------ */
  {
    id: 'story-23-small-businesses',
    tag: 'Issues',
    title: 'Small businesses. Strong families. Thriving communities.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s23 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,206,.55) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #d9c88f 100%);
          color:#2a2213;
        }
        .s23::before {
          content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s23-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,34,19,.7); }
        .s23-mast img { height:52px; width:auto; }
        /* Header row */
        .s23-headplate { position:absolute; top:190px; left:80px; right:80px; z-index:6; padding-bottom:20px; border-bottom:2px double #2a2213; display:flex; align-items:baseline; justify-content:space-between; gap:24px; }
        .s23-headplate .title { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:44px; letter-spacing:-.015em; color:#2a2213; }
        .s23-headplate .no { font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,34,19,.6); }
        /* Three tiles */
        .s23-tiles { position:absolute; top:340px; bottom:340px; left:80px; right:80px; z-index:5; display:flex; flex-direction:column; gap:22px; }
        .s23-tile { position:relative; flex:1; padding:22px 30px; background:#f6f2e8; border:2px solid #2a2213; display:grid; grid-template-columns:100px 1fr auto; gap:26px; align-items:center; box-shadow:0 20px 40px -24px rgba(42,34,19,.4); }
        .s23-tile::before, .s23-tile::after { content:''; position:absolute; left:8px; right:8px; height:2px; background:#2a2213; }
        .s23-tile::before { top:8px; opacity:.6; }
        .s23-tile::after { bottom:8px; opacity:.6; }
        .s23-tile .glyph { width:88px; height:88px; border:1.5px solid #2a2213; border-radius:999px; display:flex; align-items:center; justify-content:center; color:#2a2213; }
        .s23-tile .glyph svg { width:52px; height:52px; }
        .s23-tile .txt { display:flex; flex-direction:column; gap:8px; }
        .s23-tile .txt .kick { font-family:var(--font-mono); font-size:11px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,34,19,.6); }
        .s23-tile .txt .title { font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1; letter-spacing:-.022em; color:#2a2213; }
        .s23-tile .txt .title em { font-style:italic; color:#6b5a42; }
        .s23-tile .no { font-family:var(--font-display); font-style:italic; font-size:60px; color:rgba(42,34,19,.25); letter-spacing:-.02em; }
        /* Bookend imprimatur */
        .s23-imprimatur { position:absolute; left:80px; right:80px; bottom:150px; z-index:6; padding-top:16px; border-top:2px double #2a2213; display:flex; align-items:baseline; justify-content:space-between; gap:14px; }
        .s23-imprimatur .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,34,19,.55); }
        .s23-imprimatur .em { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:44px; line-height:1.1; letter-spacing:-.018em; color:#2a2213; }
        .s23-imprimatur .em em { font-style:normal; color:#6b5a42; }
        .s23-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,34,19,.55); }
      `,
      body: (ctx) => `
        <div class="s23">
          <div class="s23-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Specimen 23 · Three Tiles</span>
          </div>

          <div class="s23-headplate">
            <span class="title">Type specimen book · The Northwest Set</span>
            <span class="no">Fascicle · 23 / 30</span>
          </div>

          <div class="s23-tiles">
            <div class="s23-tile">
              <span class="glyph">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 42 L14 82 L86 82 L86 42"/>
                  <path d="M14 42 L26 20 L74 20 L86 42"/>
                  <path d="M40 82 L40 58 L60 58 L60 82"/>
                  <path d="M14 42 L86 42"/>
                </svg>
              </span>
              <div class="txt">
                <span class="kick">Specimen · I</span>
                <span class="title">Small <em>businesses.</em></span>
              </div>
              <span class="no">01</span>
            </div>
            <div class="s23-tile">
              <span class="glyph">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="50" cy="30" r="10"/>
                  <path d="M30 78 C 30 62 40 55 50 55 C 60 55 70 62 70 78"/>
                  <circle cx="26" cy="42" r="7"/>
                  <path d="M14 78 C 14 68 20 62 26 62 C 32 62 38 68 38 78"/>
                  <circle cx="74" cy="42" r="7"/>
                  <path d="M62 78 C 62 68 68 62 74 62 C 80 62 86 68 86 78"/>
                </svg>
              </span>
              <div class="txt">
                <span class="kick">Specimen · II</span>
                <span class="title">Strong <em>families.</em></span>
              </div>
              <span class="no">02</span>
            </div>
            <div class="s23-tile">
              <span class="glyph">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 82 L14 46 L28 32 L42 46 L42 82"/>
                  <path d="M42 82 L42 40 L58 26 L74 40 L74 82"/>
                  <path d="M74 82 L74 52 L86 46"/>
                  <path d="M14 82 L86 82"/>
                </svg>
              </span>
              <div class="txt">
                <span class="kick">Specimen · III</span>
                <span class="title">Thriving <em>communities.</em></span>
              </div>
              <span class="no">03</span>
            </div>
          </div>

          <div class="s23-imprimatur">
            <span class="kick">Imprimatur</span>
            <span class="em">That's <em>worth protecting.</em></span>
          </div>

          <div class="s23-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 24 — "Meet Brian Schimmel. Candidate for Oregon House
     District 29. Committed to service / community / Northwest Oregon."
     Creative direction: portrait-first campaign broadsheet. Full-
     bleed portrait, editorial masthead across the top, "Committed
     to..." rendered as three inscription rules stacked at the base.
  ------------------------------------------------------------ */
  {
    id: 'story-24-brian-schimmel',
    tag: 'Candidates',
    title: 'Meet Brian Schimmel.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true, onPhoto: true },
    data: {
      css: `
        .s24 { position:absolute; inset:0; z-index:10; overflow:hidden; background:#0a100c; color:#f0efe3; }
        .s24 .bg { position:absolute; inset:0; z-index:1; }
        .s24 .bg img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.72) contrast(1.24) brightness(.7); }
        .s24 .bg::after {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(120% 90% at 30% 10%, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.9) 100%),
            linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,.95) 100%);
        }
        .s24-mast { position:absolute; top:80px; left:80px; right:80px; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:24px; padding-bottom:22px; border-bottom:1px solid rgba(240,239,227,.35); font-family:var(--font-mono); font-size:13px; letter-spacing:.4em; text-transform:uppercase; color:rgba(240,239,227,.85); text-shadow:0 2px 12px rgba(0,0,0,.5); }
        .s24-mast img { height:52px; width:auto; filter:brightness(1.1) drop-shadow(0 2px 12px rgba(0,0,0,.6)); }
        .s24-mast .headtitle { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#f6f2e8; text-transform:none; }
        /* Section: name + district */
        .s24-section { position:absolute; top:220px; left:80px; right:80px; z-index:5; display:flex; align-items:baseline; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(240,239,227,.75); }
        /* Title lockup — lifted higher with real breathing room. */
        .s24-lockup { position:absolute; left:80px; right:80px; bottom:560px; z-index:5; display:flex; flex-direction:column; gap:26px; }
        .s24-lockup .kick { font-family:var(--font-mono); font-size:15px; letter-spacing:.44em; text-transform:uppercase; color:#e0d6bc; }
        .s24-lockup .name { font-family:var(--font-display); font-weight:500; font-size:126px; line-height:1; letter-spacing:-.028em; color:#f6f2e8; text-shadow:0 4px 30px rgba(0,0,0,.6); }
        .s24-lockup .name em { font-style:italic; color:#e0d6bc; }
        /* District band — its own row, well spaced from lockup and inscriptions */
        .s24-district {
          position:absolute; left:80px; right:80px; bottom:440px; z-index:5;
          padding-top:24px; border-top:1px solid rgba(240,239,227,.4);
          display:flex; align-items:center; justify-content:space-between; gap:22px;
          font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.8);
        }
        .s24-district .cred { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#e0d6bc; text-transform:none; }
        /* Three inscription rules — generous spacing, larger italic */
        .s24-inscriptions { position:absolute; left:80px; right:80px; bottom:140px; z-index:5; display:flex; flex-direction:column; gap:26px; }
        .s24-inscriptions .row { display:flex; align-items:center; gap:30px; padding-bottom:22px; border-bottom:1px solid rgba(240,239,227,.3); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; letter-spacing:-.015em; color:rgba(240,239,227,.95); line-height:1.1; }
        .s24-inscriptions .row .n { font-family:var(--font-mono); font-size:13px; letter-spacing:.44em; text-transform:uppercase; color:rgba(240,239,227,.55); font-style:normal; min-width:52px; }
        .s24-inscriptions .row .v { flex:1; }
        .s24-inscriptions .row .v em { font-style:normal; color:#e0d6bc; }
        .s24-foot { position:absolute; left:80px; right:80px; bottom:64px; z-index:5; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
      `,
      body: (ctx) => `
        <div class="s24">
          <div class="bg"><img src="${ctx.prefix}img/brian-schimmel.jpg" alt="Brian Schimmel" /></div>
          <div class="s24-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span class="headtitle">The Candidate Broadsheet · No. 24</span>
            <span>Est. 2026</span>
          </div>
          <div class="s24-section"><span>Meet the Candidate</span><span>Endorsement 24 / 30</span></div>
          <div class="s24-lockup">
            <span class="kick">— Endorsed by Northwest Oregon PAC</span>
            <h1 class="name">Meet <em>Brian Schimmel.</em></h1>
          </div>
          <div class="s24-district"><span>Candidate for Oregon House District 29</span><span class="cred">Practical leadership</span></div>
          <div class="s24-inscriptions">
            <div class="row"><span class="n">01</span><span class="v">Committed to <em>service.</em></span></div>
            <div class="row"><span class="n">02</span><span class="v">Committed to <em>the community.</em></span></div>
            <div class="row"><span class="n">03</span><span class="v">Committed to <em>Northwest Oregon.</em></span></div>
          </div>
          <div class="s24-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 25 — "Randall Fryer / Backed BY Northwest Oregon PAC"
     Creative direction: championship boxing-card poster. Heavy
     display type, cracked-paper newsprint bed, "BACKED BY" as
     the promotional headline, portrait plate framed by heavy
     rules.
  ------------------------------------------------------------ */
  {
    id: 'story-25-randall-fryer',
    tag: 'Candidates',
    title: 'Randall Fryer',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s25 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,220,180,.32) 0%, transparent 55%),
            linear-gradient(178deg, #2a3a30 0%, #101815 100%);
          color:#f6f2e8;
        }
        .s25::before {
          content:''; position:absolute; inset:0; opacity:.5;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.14  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        /* Radial rays behind portrait */
        .s25-rays { position:absolute; top:280px; left:50%; width:920px; height:920px; z-index:2; transform:translateX(-50%); pointer-events:none; opacity:.35;
          background:
            repeating-conic-gradient(from 0deg at 50% 50%, rgba(246,236,201,.8) 0deg, rgba(246,236,201,.8) 6deg, transparent 6deg, transparent 20deg);
          mask-image:radial-gradient(circle at center, transparent 26%, black 27%, black 60%, transparent 62%);
          -webkit-mask-image:radial-gradient(circle at center, transparent 26%, black 27%, black 60%, transparent 62%);
        }
        .s25-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(246,236,201,.75); }
        .s25-mast img { height:52px; width:auto; filter:brightness(1.1); }
        .s25-tag { position:absolute; top:200px; left:0; right:0; text-align:center; z-index:6; font-family:var(--font-mono); font-weight:700; font-size:22px; letter-spacing:.54em; text-transform:uppercase; color:#e0d6bc; }
        .s25-tag::before, .s25-tag::after { content:'—'; margin:0 24px; opacity:.7; }
        .s25-brand { position:absolute; top:250px; left:0; right:0; text-align:center; z-index:6; font-family:var(--font-display); font-weight:500; font-style:italic; font-size:44px; letter-spacing:-.02em; color:#f6f2e8; }
        /* Portrait frame */
        .s25-portrait {
          position:absolute; top:340px; left:50%; transform:translateX(-50%); z-index:5;
          width:520px; height:520px; border-radius:999px; overflow:hidden;
          border:6px solid #f6f2e8;
          box-shadow:0 30px 60px -22px rgba(0,0,0,.7), 0 0 0 14px rgba(107,90,66,.55);
        }
        .s25-portrait img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.85) contrast(1.15) brightness(.95); }
        .s25-name {
          position:absolute; left:0; right:0; top:900px; z-index:6; text-align:center;
          font-family:var(--font-display); font-weight:500; font-size:150px; line-height:.92; letter-spacing:-.028em; color:#f6f2e8;
          text-shadow:0 4px 24px rgba(0,0,0,.55);
        }
        .s25-name em { font-style:italic; color:#e0d6bc; }
        .s25-underline { position:absolute; left:50%; top:1080px; transform:translateX(-50%); z-index:6; width:340px; height:3px; background:#e0d6bc; box-shadow:0 0 24px rgba(244,215,143,.4); }
        .s25-cta { position:absolute; left:80px; right:80px; bottom:210px; z-index:6; padding:18px 28px; background:#f6f2e8; color:#2a3a30; display:flex; align-items:center; justify-content:space-between; gap:16px; font-family:var(--font-mono); font-size:14px; letter-spacing:.42em; text-transform:uppercase; }
        .s25-cta .em { font-family:var(--font-display); font-style:italic; font-size:26px; letter-spacing:-.01em; color:#2a3a30; text-transform:none; }
        .s25-fine { position:absolute; left:0; right:0; bottom:150px; z-index:6; text-align:center; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(246,236,201,.65); }
        .s25-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(246,236,201,.55); }
      `,
      body: (ctx) => `
        <div class="s25">
          <div class="s25-rays"></div>
          <div class="s25-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Card 25 · Endorsement Poster</span>
          </div>
          <div class="s25-tag">Backed by</div>
          <div class="s25-brand">Northwest Oregon PAC</div>
          <div class="s25-portrait">
            <img src="${ctx.prefix}img/randall-fryer.jpg" alt="Randall Fryer" />
          </div>
          <div class="s25-name">"Randall <em>Fryer"</em></div>
          <div class="s25-underline"></div>
          <div class="s25-cta"><span>Working to strengthen</span><span class="em">— Northwest Oregon</span></div>
          <div class="s25-fine">— Steady · Practical · Community-focused —</div>
          <div class="s25-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 26 — Question: "Would you ever consider running for
     local office?"
     Creative direction: blank filing form. Editorial "declaration
     of candidacy" form with an empty write-in line for the reader's
     name, and the prompt set as the form's headline instruction.
  ------------------------------------------------------------ */
  {
    id: 'story-26-run-question',
    tag: 'Candidates',
    title: 'Would you ever consider running for local office?',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s26 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(232,222,196,.6) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #d4c085 100%);
          color:#2a2013;
        }
        .s26::before {
          content:''; position:absolute; inset:0; opacity:.5; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.32 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s26-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,32,19,.7); }
        .s26-mast img { height:52px; width:auto; }
        /* Form card */
        .s26-form { position:absolute; top:200px; bottom:200px; left:70px; right:70px; z-index:5;
          background:#f6f2e8; border:2px solid #2a2013;
          padding:44px 46px 36px;
          box-shadow:0 30px 60px -30px rgba(42,32,19,.5), inset 0 1px 0 rgba(255,255,255,.5);
        }
        .s26-form::before { content:''; position:absolute; inset:10px; border:1px double #2a2013; pointer-events:none; }
        /* Header of the form */
        .s26-form .header { display:flex; align-items:baseline; justify-content:space-between; gap:24px; padding-bottom:16px; border-bottom:2px solid #2a2013; font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,32,19,.65); }
        .s26-form .header .title { font-family:var(--font-display); font-style:italic; font-size:28px; letter-spacing:-.01em; color:#2a2013; text-transform:none; }
        .s26-form .instruction { margin-top:26px; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,32,19,.55); }
        .s26-form .prompt { margin-top:16px; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#2a2013; }
        .s26-form .prompt em { font-style:italic; color:#6b5a42; }
        .s26-form .sub { margin-top:16px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:34px; letter-spacing:-.015em; color:#2a2013; }
        /* Write-in name line */
        .s26-form .writeIn { margin-top:44px; }
        .s26-form .writeIn .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,32,19,.55); }
        .s26-form .writeIn .line {
          margin-top:14px; height:56px; border-bottom:2px solid #2a2013;
          display:flex; align-items:flex-end; padding:0 18px 8px;
          font-family:var(--font-display); font-style:italic; font-size:34px; color:rgba(42,32,19,.35); letter-spacing:-.01em;
        }
        .s26-form .writeIn .hint { font-family:var(--font-mono); font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,32,19,.4); margin-top:8px; }
        /* Two checkboxes at the bottom */
        .s26-form .boxes { margin-top:28px; display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .s26-form .boxes .box { display:flex; align-items:center; gap:16px; padding:14px 18px; border:1.5px solid rgba(42,32,19,.55); }
        .s26-form .boxes .box .sq { flex:none; width:32px; height:32px; border:2px solid #2a2013; }
        .s26-form .boxes .box .lbl { font-family:var(--font-display); font-weight:500; font-size:26px; letter-spacing:-.01em; color:#2a2013; }
        /* Signature line */
        .s26-form .sig { position:absolute; left:46px; right:46px; bottom:34px; display:flex; align-items:baseline; gap:14px; font-family:var(--font-mono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:rgba(42,32,19,.6); }
        .s26-form .sig .line { flex:1; height:1px; background:rgba(42,32,19,.55); margin:0 12px; }
        /* Sticker note */
        .s26-note {
          position:absolute; right:34px; bottom:180px; z-index:8;
          transform:rotate(3deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:10px 16px 12px; box-shadow:0 10px 24px -12px rgba(0,0,0,.5); max-width:260px;
        }
        .s26-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,32,19,.55); }
      `,
      body: (ctx) => `
        <div class="s26">
          <div class="s26-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Form 26 · Declaration of Candidacy</span>
          </div>
          <div class="s26-form">
            <div class="header"><span>The Northwest Filing</span><span class="title">A question, on the record</span><span>Rev. 26</span></div>
            <div class="instruction">— Section A · Please respond</div>
            <p class="prompt">Would you ever consider <em>running</em> for local office?</p>
            <p class="sub">Tell us why or why not.</p>
            <div class="writeIn">
              <span class="k">Section B · Your name (write-in)</span>
              <div class="line">Print here</div>
              <span class="hint">Every candidate started as someone who just wrote their name.</span>
            </div>
            <div class="boxes">
              <div class="box"><span class="sq"></span><span class="lbl">I've thought about it</span></div>
              <div class="box"><span class="sq"></span><span class="lbl">Not yet — but tell me more</span></div>
            </div>
            <div class="sig"><span>Signed</span><span class="line"></span><span>Date · 2026</span></div>
          </div>
          <div class="s26-note">Overlay Instagram<br />ask sticker here</div>
          <div class="s26-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 27 — "Northwest Oregon PAC proudly supports Mark Norman.
     Because stronger communities deserve dedicated representation."
     Creative direction: formal endorsement letter on letterhead.
     Embossed seal, "PROUDLY SUPPORTS" as a declaration, candidate
     portrait as an inline photograph plate, letterhead signature.
  ------------------------------------------------------------ */
  {
    id: 'story-27-mark-norman',
    tag: 'Candidates',
    title: 'Northwest Oregon PAC proudly supports Mark Norman.',
    template: 'custom',
    meta: { forceSurface: 's-light', hideChrome: true },
    data: {
      css: `
        .s27 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,208,.6) 0%, transparent 55%),
            linear-gradient(180deg, #f6f2e8 0%, #d6c493 100%);
          color:#2a1f10;
        }
        .s27::before {
          content:''; position:absolute; inset:0; opacity:.44; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s27-letter { position:absolute; top:130px; bottom:130px; left:64px; right:64px; z-index:5;
          background:#f6f2e8; border:1px solid rgba(42,31,16,.35);
          box-shadow:0 30px 60px -30px rgba(42,31,16,.55), inset 0 1px 0 rgba(255,255,255,.6);
          padding:60px 60px 44px;
        }
        /* Letterhead */
        .s27-letter .letterhead { display:flex; align-items:center; justify-content:space-between; padding-bottom:20px; border-bottom:2px solid #2a1f10; }
        .s27-letter .letterhead img { height:70px; width:auto; }
        .s27-letter .letterhead .meta { text-align:right; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,31,16,.65); line-height:1.8; }
        .s27-letter .letterhead .meta .title { font-family:var(--font-display); font-style:italic; font-size:24px; letter-spacing:-.01em; color:#2a1f10; text-transform:none; display:block; margin-bottom:4px; }
        /* Recipient */
        .s27-letter .to { margin-top:24px; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,31,16,.55); }
        /* Body */
        .s27-letter .body { margin-top:22px; display:grid; grid-template-columns:240px 1fr; gap:34px; align-items:start; }
        .s27-letter .plate { width:240px; height:290px; overflow:hidden; border:2px solid #2a1f10; background:#333; box-shadow:0 20px 40px -22px rgba(42,31,16,.5); }
        .s27-letter .plate img { width:100%; height:100%; object-fit:cover; object-position:center 20%; filter:saturate(.82) contrast(1.14); }
        .s27-letter .prose { display:flex; flex-direction:column; gap:16px; }
        .s27-letter .prose .kick { font-family:var(--font-mono); font-size:13px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,31,16,.55); }
        .s27-letter .prose .head { font-family:var(--font-display); font-weight:500; font-size:52px; line-height:1.02; letter-spacing:-.022em; color:#2a1f10; }
        .s27-letter .prose .head em { font-style:italic; color:#6b5a42; }
        .s27-letter .prose .name { font-family:var(--font-display); font-weight:500; font-size:66px; line-height:.98; letter-spacing:-.022em; color:#2a1f10; }
        .s27-letter .prose .name em { font-style:italic; color:#6b5a42; }
        .s27-letter .prose .quote { margin-top:8px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:30px; line-height:1.24; letter-spacing:-.012em; color:#2a1f10; }
        /* Bottom signature block */
        .s27-letter .close { position:absolute; left:60px; right:60px; bottom:44px; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; padding-top:22px; border-top:1.5px solid rgba(42,31,16,.4); }
        .s27-letter .close .sig { flex:1; display:flex; flex-direction:column; gap:4px; }
        .s27-letter .close .sig .signature { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; letter-spacing:-.012em; color:#2a1f10; }
        .s27-letter .close .sig .role { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(42,31,16,.6); }
        /* Embossed seal */
        .s27-letter .seal {
          width:140px; height:140px; border-radius:999px; border:3px double #6b5a42;
          display:flex; align-items:center; justify-content:center; flex-direction:column; gap:2px;
          font-family:var(--font-mono); font-size:10px; letter-spacing:.36em; text-transform:uppercase; color:#6b5a42;
          transform:rotate(-6deg);
          box-shadow:inset 0 0 0 1px rgba(107,90,66,.35);
        }
        .s27-letter .seal .star { font-family:var(--font-display); font-style:italic; font-size:30px; color:#6b5a42; }
        .s27-letter .seal .lbl { text-align:center; line-height:1.4; }
        .s27-foot { position:absolute; left:64px; right:64px; bottom:64px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,31,16,.55); }
      `,
      body: (ctx) => `
        <div class="s27">
          <div class="s27-letter">
            <div class="letterhead">
              <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
              <div class="meta">
                <span class="title">Formal Endorsement</span>
                Letter No. 27 · Series 2026<br />Issued at Beaverton, Oregon
              </div>
            </div>
            <div class="to">— To the residents of Northwest Oregon:</div>
            <div class="body">
              <div class="plate"><img src="${ctx.prefix}img/mark-norman.jpg" alt="Mark Norman" /></div>
              <div class="prose">
                <span class="kick">Be it known that</span>
                <div class="head">Northwest Oregon PAC <em>proudly supports</em></div>
                <div class="name">Mark <em>Norman.</em></div>
                <p class="quote">— Because stronger communities deserve dedicated representation.</p>
              </div>
            </div>
            <div class="close">
              <div class="sig">
                <span class="signature">The Board & Members</span>
                <span class="role">On behalf of Northwest Oregon PAC · Committee #25045</span>
              </div>
              <div class="seal"><span class="star">★</span><span class="lbl">Northwest<br/>Oregon<br/>Endorsed</span></div>
            </div>
          </div>
          <div class="s27-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 28 — Poll: "Have you met Barbara Kahl? Yes / I would Like To"
     Creative direction: meet-and-greet business-card. Portrait as
     an inline photograph plate on the left, poll options rendered
     as engraved calling-card entries on the right.
  ------------------------------------------------------------ */
  {
    id: 'story-28-barbara-kahl',
    tag: 'Candidates',
    title: 'Have you met Barbara Kahl?',
    template: 'custom',
    meta: { forceSurface: 's-sand', hideChrome: true },
    data: {
      css: `
        .s28 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(240,232,208,.6) 0%, transparent 55%),
            linear-gradient(180deg, #e0d6bc 0%, #cfb87a 100%);
          color:#2a1f10;
        }
        .s28::before {
          content:''; position:absolute; inset:0; opacity:.4; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:multiply;
        }
        .s28-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(42,31,16,.7); }
        .s28-mast img { height:52px; width:auto; }
        .s28-kicker { position:absolute; top:200px; left:80px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,31,16,.55); display:inline-flex; align-items:center; gap:16px; }
        .s28-kicker::before { content:''; width:44px; height:1px; background:currentColor; opacity:.55; }
        .s28-question { position:absolute; top:250px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:66px; line-height:1.02; letter-spacing:-.022em; color:#2a1f10; }
        .s28-question em { font-style:italic; color:#6b5a42; }
        /* Meet-and-greet card */
        .s28-card { position:absolute; top:500px; left:64px; right:64px; z-index:5;
          background:#f6f2e8; border:2px solid #2a1f10;
          box-shadow:0 30px 60px -30px rgba(42,31,16,.55), inset 0 1px 0 rgba(255,255,255,.5);
          display:grid; grid-template-columns:1fr 1fr; gap:0;
          transform:rotate(-1.2deg);
        }
        .s28-card::before { content:''; position:absolute; inset:10px; border:1px double #2a1f10; pointer-events:none; }
        .s28-card .plate { position:relative; overflow:hidden; }
        .s28-card .plate img { width:100%; height:100%; object-fit:cover; object-position:center 22%; filter:saturate(.85) contrast(1.14); display:block; }
        .s28-card .plate::after { content:''; position:absolute; top:0; right:0; bottom:0; width:1px; background:#2a1f10; }
        .s28-card .content { padding:34px 34px 26px; display:flex; flex-direction:column; gap:14px; }
        .s28-card .content .kick { font-family:var(--font-mono); font-size:12px; letter-spacing:.44em; text-transform:uppercase; color:rgba(42,31,16,.55); }
        .s28-card .content .name { font-family:var(--font-display); font-weight:500; font-size:56px; line-height:1; letter-spacing:-.022em; color:#2a1f10; }
        .s28-card .content .name em { font-style:italic; color:#6b5a42; }
        .s28-card .content .role { font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,31,16,.6); }
        .s28-card .content .rule { width:60px; height:2px; background:#6b5a42; margin:8px 0; }
        .s28-card .content .rsvp { margin-top:8px; display:flex; flex-direction:column; gap:12px; }
        .s28-card .content .rsvp .opt { display:flex; align-items:center; gap:14px; padding:12px 14px; border:1.5px solid #2a1f10; }
        .s28-card .content .rsvp .opt .sq { flex:none; width:24px; height:24px; border:2px solid #2a1f10; }
        .s28-card .content .rsvp .opt.filled .sq { background:#2a1f10; position:relative; }
        .s28-card .content .rsvp .opt.filled .sq::after { content:'✓'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#f6f2e8; font-family:var(--font-display); font-size:16px; font-style:italic; }
        .s28-card .content .rsvp .opt .lbl { font-family:var(--font-display); font-weight:500; font-size:26px; letter-spacing:-.01em; color:#2a1f10; }
        .s28-note {
          position:absolute; right:34px; bottom:180px; z-index:8; transform:rotate(4deg);
          background:#faf4d8; color:#4b3a20;
          font-family:var(--font-mono); font-size:11px; letter-spacing:.28em; text-transform:uppercase;
          padding:10px 16px 12px; box-shadow:0 10px 24px -12px rgba(0,0,0,.5); max-width:250px;
        }
        .s28-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(42,31,16,.55); }
      `,
      body: (ctx) => `
        <div class="s28">
          <div class="s28-mast">
            <img src="${ctx.prefix}nwop-logo-dark.png" alt="Northwest Oregon PAC" />
            <span>Card 28 · Meet-and-Greet</span>
          </div>
          <span class="s28-kicker">— A calling card, extended</span>
          <h1 class="s28-question">Have you met <em>Barbara Kahl?</em></h1>
          <div class="s28-card">
            <div class="plate"><img src="${ctx.prefix}img/barbara-kahl.jpg" alt="Barbara Kahl" /></div>
            <div class="content">
              <span class="kick">— The candidate</span>
              <div class="name">Dr. Barbara <em>Kahl</em></div>
              <span class="role">U.S. House · Oregon's 1st Congressional District</span>
              <span class="rule"></span>
              <div class="rsvp">
                <div class="opt filled"><span class="sq"></span><span class="lbl">Yes</span></div>
                <div class="opt"><span class="sq"></span><span class="lbl">I would Like To</span></div>
              </div>
            </div>
          </div>
          <div class="s28-note">Overlay Instagram<br />poll sticker here</div>
          <div class="s28-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 29 — "Every volunteer strengthens a campaign. Help support
     Ciatta Thompson today. Move Northwest Oregon forward."
     Creative direction: torch relay. A diagonal red-orange path
     crosses the frame from bottom-left to top-right; candidate
     portrait sits at a node on the path; italic overlay carries
     the message.
  ------------------------------------------------------------ */
  {
    id: 'story-29-ciatta-thompson',
    tag: 'Candidates',
    title: 'Every volunteer strengthens a campaign.',
    template: 'custom',
    meta: { forceSurface: 's-ink', hideChrome: true },
    data: {
      css: `
        .s29 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 20% 90%, rgba(90,112,96,.32) 0%, transparent 55%),
            radial-gradient(100% 90% at 80% 10%, rgba(224,214,188,.12) 0%, transparent 55%),
            linear-gradient(178deg, #0e1a13 0%, #050a07 100%);
          color:#f6f2e8;
        }
        /* Diagonal torch path — glowing line (sand + sage) */
        .s29-path {
          position:absolute; top:180px; left:-40px; right:-40px; bottom:180px; z-index:3; pointer-events:none;
          background:
            linear-gradient(38deg, transparent 0%, transparent 44%, rgba(140,168,146,.9) 46%, rgba(224,214,188,1) 50%, rgba(140,168,146,.9) 54%, transparent 56%, transparent 100%);
          filter:blur(1px);
        }
        .s29-path::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(38deg, transparent 0%, transparent 42%, rgba(224,214,188,.5) 45%, rgba(246,242,232,1) 50%, rgba(224,214,188,.5) 55%, transparent 58%, transparent 100%);
          filter:blur(14px); mix-blend-mode:screen;
        }
        /* Sparks — sand toned */
        .s29-sparks { position:absolute; inset:0; z-index:4; pointer-events:none;
          background:
            radial-gradient(3px 3px at 20% 78%, rgba(224,214,188,.9), transparent 60%),
            radial-gradient(2px 2px at 32% 70%, rgba(246,242,232,.7), transparent 60%),
            radial-gradient(2px 2px at 46% 60%, rgba(224,214,188,.9), transparent 60%),
            radial-gradient(3px 3px at 62% 46%, rgba(224,214,188,.85), transparent 60%),
            radial-gradient(2px 2px at 76% 34%, rgba(246,242,232,.7), transparent 60%),
            radial-gradient(3px 3px at 88% 24%, rgba(224,214,188,.9), transparent 60%);
        }
        .s29-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(244,236,208,.75); }
        .s29-mast img { height:52px; width:auto; filter:brightness(1.05); }
        /* Portrait node */
        .s29-node {
          position:absolute; top:640px; left:calc(50% - 130px); z-index:5;
          width:260px; height:260px; border-radius:999px; overflow:hidden;
          border:5px solid #f6f2e8;
          box-shadow:0 0 60px rgba(224,214,188,.6), 0 20px 40px -18px rgba(0,0,0,.55);
        }
        .s29-node img { width:100%; height:100%; object-fit:cover; object-position:center 24%; filter:saturate(.85) contrast(1.15); }
        .s29-nodetag { position:absolute; top:640px; right:60px; z-index:6; padding:8px 14px; background:#f6f2e8; color:#2a1f10; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; }
        /* Top message */
        .s29-topmsg { position:absolute; top:210px; left:80px; right:80px; z-index:6; font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.022em; color:#f6f2e8; text-shadow:0 3px 22px rgba(0,0,0,.55); max-width:820px; }
        .s29-topmsg em { font-style:italic; color:#e0d6bc; }
        /* Bottom name + CTA */
        .s29-bot { position:absolute; left:80px; right:80px; bottom:230px; z-index:6; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; padding-top:22px; border-top:1px solid rgba(244,236,208,.35); }
        .s29-bot .name { font-family:var(--font-display); font-weight:500; font-size:64px; line-height:.98; letter-spacing:-.022em; color:#f6f2e8; }
        .s29-bot .name em { font-style:italic; color:#e0d6bc; }
        .s29-bot .cred { text-align:right; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:28px; letter-spacing:-.012em; color:#f6f2e8; max-width:360px; line-height:1.2; }
        .s29-bot .cred small { display:block; font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(244,236,208,.65); margin-top:8px; font-style:normal; }
        .s29-tail { position:absolute; left:80px; right:80px; bottom:150px; z-index:6; font-family:var(--font-mono); font-size:14px; letter-spacing:.44em; text-transform:uppercase; color:#e0d6bc; text-align:center; }
        .s29-tail::before, .s29-tail::after { content:'▸'; margin:0 16px; }
        .s29-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(244,236,208,.55); }
      `,
      body: (ctx) => `
        <div class="s29">
          <div class="s29-path"></div>
          <div class="s29-sparks"></div>
          <div class="s29-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Relay 29 · Pass the Torch</span>
          </div>
          <h1 class="s29-topmsg">Every volunteer <em>strengthens</em> a campaign.</h1>
          <div class="s29-node"><img src="${ctx.prefix}img/ciatta-thompson.jpg" alt="Ciatta Thompson" /></div>
          <span class="s29-nodetag">Runner · 29</span>
          <div class="s29-bot">
            <div class="name">Ciatta <em>Thompson</em></div>
            <div class="cred">Help support her today.<small>Oregon House District 33</small></div>
          </div>
          <div class="s29-tail">Move Northwest Oregon forward</div>
          <div class="s29-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
    },
  },
  /* ------------------------------------------------------------
     STORY 30 — Closing: "Together, we're building a stronger
     Northwest Oregon. Hope • Support • Heard / Follow • Volunteer
     • Donate"
     Creative direction: colophon — the final page of a beautifully
     printed book. Decorative typographic ornaments, three-column
     values grid, signed closing note, italic finis at the base.
  ------------------------------------------------------------ */
  {
    id: 'story-30-hope-support-heard',
    tag: 'Values',
    title: 'Hope · Support · Heard',
    template: 'custom',
    meta: { forceSurface: 's-forest', hideChrome: true },
    data: {
      css: `
        .s30 { position:absolute; inset:0; z-index:10; overflow:hidden;
          background:
            radial-gradient(120% 90% at 30% 12%, rgba(90,112,96,.55) 0%, transparent 55%),
            radial-gradient(90% 80% at 100% 100%, rgba(14,22,17,.95) 0%, transparent 60%),
            linear-gradient(178deg, #2e4538 0%, #1c2b23 60%, #10170f 100%);
          color:#f0efe3;
        }
        .s30::before {
          content:''; position:absolute; inset:0; opacity:.14; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode:screen;
        }
        .s30-mast { position:absolute; top:80px; left:80px; right:80px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:13px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.7); }
        .s30-mast img { height:52px; width:auto; filter:brightness(1.05); }
        /* Ornament separator (top) */
        .s30-orn { position:absolute; left:0; right:0; text-align:center; z-index:5; color:#e0d6bc; }
        .s30-orn.top { top:200px; }
        .s30-orn.bot { bottom:260px; }
        .s30-orn svg { width:200px; height:32px; }
        /* Colophon heading */
        .s30-heading { position:absolute; top:260px; left:0; right:0; text-align:center; z-index:6; font-family:var(--font-display); font-style:italic; font-weight:400; font-size:30px; letter-spacing:.06em; color:rgba(240,239,227,.6); }
        .s30-title { position:absolute; top:320px; left:80px; right:80px; text-align:center; z-index:6; font-family:var(--font-display); font-weight:500; font-size:76px; line-height:1.02; letter-spacing:-.022em; color:#f0efe3; }
        .s30-title em { font-style:italic; color:#e0d6bc; }
        /* Three-column value grid */
        .s30-grid { position:absolute; top:640px; left:80px; right:80px; z-index:6; display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
        .s30-grid .cell { position:relative; padding:24px 20px; text-align:center; }
        .s30-grid .cell + .cell { border-left:1px solid rgba(240,239,227,.35); }
        .s30-grid .cell .no { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:38px; color:rgba(240,239,227,.5); letter-spacing:-.02em; }
        .s30-grid .cell .word { font-family:var(--font-display); font-weight:500; font-size:60px; line-height:1; letter-spacing:-.022em; color:#f6f2e8; margin-top:10px; }
        .s30-grid .cell .word.italic { font-style:italic; color:#c3d0c6; }
        .s30-grid .cell .word.gold { color:#e0d6bc; font-style:italic; }
        .s30-grid .cell .sub { margin-top:12px; font-family:var(--font-mono); font-size:12px; letter-spacing:.36em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        /* Second three-column grid (Follow/Volunteer/Donate) */
        .s30-grid2 { position:absolute; top:900px; left:80px; right:80px; z-index:6; display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .s30-grid2 .cell { padding:14px 12px; text-align:center; border:1.5px solid rgba(240,239,227,.5); font-family:var(--font-mono); font-size:16px; letter-spacing:.42em; text-transform:uppercase; color:#f0efe3; }
        .s30-grid2 .cell .em { display:block; margin-top:2px; font-family:var(--font-display); font-style:italic; font-size:22px; letter-spacing:-.01em; text-transform:none; color:#e0d6bc; }
        /* Closing note */
        .s30-close { position:absolute; left:80px; right:80px; top:1100px; z-index:6; padding-top:22px; border-top:1px double rgba(240,239,227,.4); text-align:center; }
        .s30-close .k { font-family:var(--font-mono); font-size:12px; letter-spacing:.42em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        .s30-close .v { margin-top:14px; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:36px; line-height:1.14; letter-spacing:-.015em; color:#f0efe3; }
        .s30-close .v em { font-style:normal; color:#e0d6bc; }
        /* Finis */
        .s30-finis { position:absolute; left:0; right:0; bottom:150px; z-index:6; text-align:center; font-family:var(--font-display); font-style:italic; font-size:34px; letter-spacing:-.01em; color:rgba(240,239,227,.65); }
        .s30-foot { position:absolute; left:80px; right:80px; bottom:70px; z-index:6; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(240,239,227,.55); }
        /* Ornament SVG shared style */
        .s30 .orn-svg path, .s30 .orn-svg circle { fill:currentColor; }
      `,
      body: (ctx) => `
        <div class="s30">
          <div class="s30-mast">
            <img src="${ctx.prefix}nwop-logo-light.png" alt="Northwest Oregon PAC" />
            <span>Colophon 30 · Closing Page</span>
          </div>
          <div class="s30-orn top">
            <svg class="orn-svg" viewBox="0 0 200 32" fill="none">
              <path d="M0 16 L60 16" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="72" cy="16" r="2" fill="currentColor"/>
              <path d="M84 12 Q100 24 116 12" stroke="currentColor" stroke-width="1.4" fill="none"/>
              <circle cx="128" cy="16" r="2" fill="currentColor"/>
              <path d="M140 16 L200 16" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </div>
          <div class="s30-heading">— Colophon · The closing note —</div>
          <h1 class="s30-title">Together, we're building a stronger <em>Northwest Oregon.</em></h1>

          <div class="s30-grid">
            <div class="cell"><span class="no">i.</span><div class="word">Hope.</div><span class="sub">The starting condition</span></div>
            <div class="cell"><span class="no">ii.</span><div class="word italic">Support.</div><span class="sub">The daily practice</span></div>
            <div class="cell"><span class="no">iii.</span><div class="word gold">Heard.</div><span class="sub">The outcome</span></div>
          </div>

          <div class="s30-grid2">
            <div class="cell">Follow<span class="em">— stay close</span></div>
            <div class="cell">Volunteer<span class="em">— show up</span></div>
            <div class="cell">Donate<span class="em">— chip in</span></div>
          </div>

          <div class="s30-close">
            <span class="k">Signed on behalf of the region</span>
            <div class="v">— The end of the beginning. <em>Turn the page with us.</em></div>
          </div>

          <div class="s30-finis">— fin —</div>

          <div class="s30-foot">
            <span>Paid for by Northwest Oregon PAC · #25045</span>
            <span>northwestoregon.com</span>
          </div>
        </div>
      `,
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
            'Every campaign is powered by neighbours helping neighbours.',
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
            'Behind every local business is someone willing to invest in Northwest Oregon, creating jobs, serving neighbours, and strengthening our local economy.',
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
            'Real change happens when neighbours work together with a shared purpose and a long-term commitment to their communities.',
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
