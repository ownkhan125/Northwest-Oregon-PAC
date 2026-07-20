// Content plan for the Northwest Oregon PAC social library.
// Every user-facing string is sourced verbatim from src/data/pac.js —
// this file only selects and arranges existing campaign messaging.

import {
  pac,
  home,
  foundingStory,
  mission,
  priorities,
  antiSocialismStatement,
  volunteerActivities,
  donationAmounts,
  aboutPage,
} from '../../src/data/pac.js'

export const DOMAIN = 'northwestoregon.com'
export const FILING = `Committee #${pac.pacId} · Est. ${pac.foundedYear}`
export const PAID_FOR = pac.disclaimers.paidFor.replace(/\.$/, '')

// Sentence pulled verbatim from the anti-socialism statement's close.
const ECON_FREEDOM = antiSocialismStatement.slice(antiSocialismStatement.indexOf('We reject'))

// Priority icon + shorthand pairing (icons from public/icons, same set the site uses)
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

const P = Object.fromEntries(priorities.map((p) => [p.id, p]))
const eventsBody = home.events.body.split('\n')
const candidates = home.endorsements.candidates

/* -------------------------------------------------------------------
   FEED — 60 posts, 1080×1080
------------------------------------------------------------------- */
export const feed = [
  // — Introduction / brand
  { id: 'feed-01-hero', tag: 'Introduction', title: 'A stronger voice', template: 'cover', data: { photo: 'banner.jpg', eyebrow: home.hero.eyebrow, heading: home.hero.heading, sub: pac.tagline } },
  { id: 'feed-02-mission', tag: 'Introduction', title: 'Our mission', template: 'manifesto', data: { eyebrow: 'Our mission', text: mission } },
  { id: 'feed-03-values', tag: 'Values', title: 'Hope · Support · Heard', template: 'values3', data: { eyebrow: 'What guides us', heading: home.vision.valuesLine, values: home.hero.values } },
  { id: 'feed-04-promise', tag: 'Values', title: 'Our promise', template: 'promise', data: { eyebrow: home.vision.promiseEyebrow, text: home.vision.promise, sign: home.vision.valuesLine } },
  { id: 'feed-05-brand', tag: 'Introduction', title: 'The wordmark', template: 'masthead', data: { tagline: pac.tagline, values: home.vision.valuesLine } },
  { id: 'feed-06-region', tag: 'Introduction', title: 'Never an afterthought', template: 'cover', data: { photo: 'hero.jpg', blur: true, eyebrow: `${pac.region} · ${pac.type}`, heading: home.about.heading, sub: home.about.paragraphs[0] } },
  { id: 'feed-07-ticker', tag: 'Introduction', title: 'What we stand for', template: 'ticker', data: { eyebrow: 'What we stand for', words: home.vision.ticker } },

  // — Five priorities: pillar / quote / detail per priority
  { id: 'feed-08-priority-01', tag: 'Issues', title: 'Priority 01 · Prosperity', template: 'pillar', surface: 's-forest', data: { p: P['01'] } },
  { id: 'feed-09-priority-01-quote', tag: 'Issues', title: 'Built by enterprise', template: 'quote', data: { eyebrow: `Priority 01 · ${PRIORITY_META['01'].short}`, text: P['01'].supporting[4], attr: pac.name } },
  { id: 'feed-10-priority-01-detail', tag: 'Issues', title: 'Something of their own', template: 'detail', data: { icon: 'skyline', kicker: `Priority 01`, name: PRIORITY_META['01'].short, text: P['01'].supporting[1] } },
  { id: 'feed-11-priority-02', tag: 'Issues', title: 'Priority 02 · Accountability', template: 'pillar', data: { p: P['02'] } },
  { id: 'feed-12-priority-02-quote', tag: 'Issues', title: 'Every dollar', template: 'quote', surface: 's-sand', data: { eyebrow: `Priority 02 · ${PRIORITY_META['02'].short}`, text: P['02'].position, attr: pac.name } },
  { id: 'feed-13-priority-02-detail', tag: 'Issues', title: 'Consequences', template: 'detail', surface: 's-forest', data: { icon: 'balance', kicker: `Priority 02`, name: PRIORITY_META['02'].short, text: P['02'].supporting[3] } },
  { id: 'feed-14-priority-03', tag: 'Issues', title: 'Priority 03 · Public safety', template: 'pillar', surface: 's-forest', data: { p: P['03'] } },
  { id: 'feed-15-priority-03-quote', tag: 'Issues', title: 'Safe streets', template: 'quote', data: { eyebrow: `Priority 03 · ${PRIORITY_META['03'].short}`, text: P['03'].position, attr: pac.name } },
  { id: 'feed-16-priority-03-detail', tag: 'Issues', title: 'Behind the badge', template: 'detail', data: { icon: 'shield', kicker: `Priority 03`, name: PRIORITY_META['03'].short, text: P['03'].supporting[4] } },
  { id: 'feed-17-priority-04', tag: 'Issues', title: 'Priority 04 · Education', template: 'pillar', data: { p: P['04'] } },
  { id: 'feed-18-priority-04-quote', tag: 'Issues', title: 'The real world', template: 'quote', surface: 's-forest', data: { eyebrow: `Priority 04 · ${PRIORITY_META['04'].short}`, text: P['04'].position, attr: pac.name } },
  { id: 'feed-19-priority-04-detail', tag: 'Issues', title: 'Skills that pay', template: 'detail', surface: 's-sand', data: { icon: 'certificate', kicker: `Priority 04`, name: PRIORITY_META['04'].short, text: P['04'].supporting[2] } },
  { id: 'feed-20-priority-05', tag: 'Issues', title: 'Priority 05 · Energy', template: 'pillar', surface: 's-forest', data: { p: P['05'] } },
  { id: 'feed-21-priority-05-quote', tag: 'Issues', title: 'Affordable bills', template: 'quote', data: { eyebrow: `Priority 05 · ${PRIORITY_META['05'].short}`, text: P['05'].position, attr: pac.name } },
  { id: 'feed-22-priority-05-detail', tag: 'Issues', title: "Oregon's advantage", template: 'detail', data: { icon: 'energy', kicker: `Priority 05`, name: PRIORITY_META['05'].short, text: P['05'].supporting[2] } },

  // — Priorities overview + vision
  { id: 'feed-23-priorities-index', tag: 'Issues', title: 'Five priorities', template: 'list5', data: { eyebrow: 'Our agenda', heading: home.priorities.heading, items: home.priorities.list } },
  { id: 'feed-24-vision', tag: 'Introduction', title: 'The vision', template: 'manifesto', surface: 's-forest', data: { eyebrow: 'Our vision', heading: home.vision.heading, text: home.vision.paragraphs[0] } },

  // — Candidates 2026
  { id: 'feed-25-candidates', tag: 'Candidates', title: 'Standing up in 2026', template: 'manifesto', surface: 's-forest', data: { eyebrow: home.endorsements.eyebrow, heading: home.endorsements.heading, text: home.endorsements.intro } },
  { id: 'feed-26-mark-norman', tag: 'Candidates', title: 'Mark Norman', template: 'candidate', data: { c: candidates[0] } },
  { id: 'feed-27-brian-schimmel', tag: 'Candidates', title: 'Brian Schimmel', template: 'candidate', surface: 's-forest', data: { c: candidates[1] } },
  { id: 'feed-28-barbara-kahl', tag: 'Candidates', title: 'Dr. Barbara Kahl', template: 'candidate', data: { c: candidates[2] } },
  { id: 'feed-29-ciatta-thompson', tag: 'Candidates', title: 'Ciatta Thompson', template: 'candidate', surface: 's-forest', data: { c: candidates[3] } },
  { id: 'feed-30-randall-fryer', tag: 'Candidates', title: 'Randall Fryer', template: 'candidate', data: { c: candidates[4] } },
  { id: 'feed-31-run-for-office', tag: 'Candidates', title: 'Run for office', template: 'cta', surface: 's-forest', data: { eyebrow: home.endorsements.runForOffice.eyebrow, heading: home.endorsements.runForOffice.heading, text: home.endorsements.runForOffice.description, buttons: [home.endorsements.runForOffice.cta] } },

  // — Get involved
  { id: 'feed-32-volunteer', tag: 'Get involved', title: 'Show up. Speak up.', template: 'cover', data: { photo: 'who-we-are.jpg', eyebrow: 'Volunteer', heading: home.volunteerCta.heading, sub: home.volunteerCta.paragraphs[0] } },
  { id: 'feed-33-volunteer-ways', tag: 'Get involved', title: 'Ways to help', template: 'chips', data: { eyebrow: 'Volunteer', heading: 'There is a place for you in this effort.', chips: volunteerActivities, note: home.volunteerCta.paragraphs[1] } },
  { id: 'feed-34-events', tag: 'Get involved', title: 'Come meet us', template: 'manifesto', surface: 's-sand', data: { eyebrow: home.events.label, heading: home.events.heading, text: eventsBody[0] } },
  { id: 'feed-35-host-event', tag: 'Get involved', title: 'Host an event', template: 'cta', data: { eyebrow: home.events.label, heading: home.events.ctas.secondary, text: eventsBody[1], buttons: [home.events.ctas.primary, home.events.ctas.secondary] } },
  { id: 'feed-36-movement', tag: 'Get involved', title: 'People like you', template: 'quote', surface: 's-forest', data: { eyebrow: 'The movement', text: 'This movement works because of people like you.', attr: `The ${pac.name} Team` } },
  { id: 'feed-37-follow', tag: 'Get involved', title: 'Follow along', template: 'cta', surface: 's-sand', data: { eyebrow: 'Stay connected', heading: 'Follow along and share the work.', text: 'Straight talk about the issues that affect your community, your safety, and your wallet.', buttons: ['Facebook', DOMAIN] } },
  { id: 'feed-38-contact', tag: 'Get involved', title: 'Contact card', template: 'facts', data: { eyebrow: 'Contact', heading: 'Talk with a real person.', rows: [ { k: 'General inquiries', v: pac.contact.generalEmail }, { k: pac.contact.role, v: `${pac.contact.name} · ${pac.contact.phone}` }, { k: 'Mailing address', v: pac.contact.mailingAddressLines.join(', ') }, { k: 'Region', v: `${pac.region} · ${pac.timeZone}` } ] } },
  { id: 'feed-39-someone-in-your-corner', tag: 'Get involved', title: 'In your corner', template: 'quote', data: { eyebrow: 'Why we are here', text: 'We’re here because the people of Northwest Oregon deserve representation, investment, and someone in their corner.', attr: 'Our founding story' } },

  // — Donate
  { id: 'feed-40-donate', tag: 'Support', title: 'Fund the fight', template: 'cta', surface: 's-forest', data: { eyebrow: home.donate.eyebrow, heading: home.donate.heading, text: home.donate.body, buttons: [home.donate.cta] } },
  { id: 'feed-41-donate-ladder', tag: 'Support', title: 'Choose an amount', template: 'chips', surface: 's-forest', data: { eyebrow: home.donate.eyebrow, heading: 'Every contribution stays focused on Northwest Oregon.', chips: donationAmounts.map((n) => `$${n.toLocaleString('en-US')}`), note: home.donate.notice } },
  { id: 'feed-42-donate-impact', tag: 'Support', title: 'Where it goes', template: 'detail', data: { icon: 'money-bag', kicker: home.donate.eyebrow, name: 'Fund the fight for our region.', text: home.donate.body } },
  { id: 'feed-43-fuel-the-work', tag: 'Support', title: 'Fuel the work', template: 'manifesto', surface: 's-sand', data: { eyebrow: 'Support', heading: 'Fuel the work.', text: 'Every contribution helps strengthen candidate support, voter outreach, fundraising, volunteer organization, and public messaging across Northwest Oregon.' } },
  { id: 'feed-44-infrastructure', tag: 'Support', title: 'Lasting infrastructure', template: 'detail', surface: 's-forest', data: { icon: 'capitol', kicker: 'Long-term infrastructure', name: home.about.highlights[2].label, text: home.about.highlights[2].detail } },

  // — What we believe
  { id: 'feed-45-freedom', tag: 'Beliefs', title: 'Free to build', template: 'manifesto', data: { eyebrow: 'Economic freedom', heading: home.freedom.heading, text: home.freedom.paragraphs[0] } },
  { id: 'feed-46-core-principle', tag: 'Beliefs', title: 'Our core principle', template: 'quote', surface: 's-forest', data: { eyebrow: home.freedom.sideCard.eyebrow, text: home.freedom.sideCard.body, attr: pac.name } },
  { id: 'feed-47-economic-freedom', tag: 'Beliefs', title: 'The proven engine', template: 'manifesto', surface: 's-ink', data: { eyebrow: 'Where we stand', text: ECON_FREEDOM } },
  { id: 'feed-48-why-we-exist', tag: 'Beliefs', title: 'Why we exist', template: 'block', data: { n: '01', block: aboutPage.story.blocks[0] } },
  { id: 'feed-49-who-we-serve', tag: 'Beliefs', title: 'Who we serve', template: 'block', surface: 's-forest', data: { n: '02', block: aboutPage.story.blocks[1] } },
  { id: 'feed-50-how-we-work', tag: 'Beliefs', title: 'How we work', template: 'block', surface: 's-sand', data: { n: '03', block: aboutPage.story.blocks[2] } },
  { id: 'feed-51-what-we-believe', tag: 'Beliefs', title: 'What we believe', template: 'block', surface: 's-forest', data: { n: '04', block: aboutPage.story.blocks[3] } },
  { id: 'feed-52-different', tag: 'Beliefs', title: 'Where the issues are', template: 'quote', data: { eyebrow: 'What makes us different', text: 'Our focus is where the issues actually are — losing businesses, unsafe streets, and communities too often overlooked by partisan politics.', attr: pac.name } },

  // — About: values, team, facts, story
  { id: 'feed-53-value-prosperity', tag: 'Values', title: 'Value · Prosperity', template: 'value', data: { n: '01', of: '03', v: aboutPage.values.list[0] } },
  { id: 'feed-54-value-accountability', tag: 'Values', title: 'Value · Accountability', template: 'value', surface: 's-forest', data: { n: '02', of: '03', v: aboutPage.values.list[1] } },
  { id: 'feed-55-value-common-sense', tag: 'Values', title: 'Value · Common sense', template: 'value', surface: 's-sand', data: { n: '03', of: '03', v: aboutPage.values.list[2] } },
  { id: 'feed-56-team', tag: 'About', title: 'Local leadership', template: 'team', surface: 's-forest', data: { eyebrow: aboutPage.teamSection.eyebrow, heading: aboutPage.teamSection.heading, members: aboutPage.teamSection.members } },
  { id: 'feed-57-facts', tag: 'About', title: 'The filing', template: 'stats', data: { eyebrow: 'On the record', heading: 'Built to operate responsibly.', stats: [ { n: pac.foundedYear, l: 'Established' }, { n: `#${pac.pacId}`, l: 'Oregon committee' }, { n: '05', l: 'Priorities' }, { n: '03', l: 'Values' } ] } },
  { id: 'feed-58-highlights', tag: 'About', title: 'How we operate', template: 'values3', surface: 's-forest', data: { eyebrow: 'How we operate', heading: 'Region first.', values: home.about.highlights.map((h) => ({ label: h.label, description: h.detail })) } },
  { id: 'feed-59-never-written-off', tag: 'About', title: 'Never written off', template: 'manifesto', surface: 's-sand', data: { eyebrow: 'Our story', heading: aboutPage.story.heading, text: aboutPage.story.paragraphs[4] } },
  { id: 'feed-60-closing', tag: 'About', title: 'Not by accident', template: 'cta', surface: 's-forest', data: { eyebrow: 'Join the work', heading: aboutPage.cta.heading, text: aboutPage.cta.body, buttons: [aboutPage.cta.primary.label, aboutPage.cta.secondary.label] } },
]

/* -------------------------------------------------------------------
   STORIES — 30 posts, 1080×1920
------------------------------------------------------------------- */
export const stories = [
  { id: 'story-01-hero', tag: 'Introduction', title: 'A stronger voice', template: 'cover', data: { photo: 'banner.jpg', eyebrow: home.hero.eyebrow, heading: home.hero.heading, sub: pac.tagline } },
  { id: 'story-02-values', tag: 'Values', title: 'Hope · Support · Heard', template: 'values3', data: { eyebrow: 'What guides us', heading: home.vision.valuesLine, values: home.hero.values } },
  { id: 'story-03-mission', tag: 'Introduction', title: 'Our mission', template: 'manifesto', surface: 's-forest', data: { eyebrow: 'Our mission', text: mission } },
  { id: 'story-04-promise', tag: 'Values', title: 'Our promise', template: 'promise', data: { eyebrow: home.vision.promiseEyebrow, text: home.vision.promise, sign: home.vision.valuesLine } },
  { id: 'story-05-priority-01', tag: 'Issues', title: 'Priority 01 · Prosperity', template: 'pillar', surface: 's-forest', data: { p: P['01'] } },
  { id: 'story-06-priority-02', tag: 'Issues', title: 'Priority 02 · Accountability', template: 'pillar', data: { p: P['02'] } },
  { id: 'story-07-priority-03', tag: 'Issues', title: 'Priority 03 · Public safety', template: 'pillar', surface: 's-forest', data: { p: P['03'] } },
  { id: 'story-08-priority-04', tag: 'Issues', title: 'Priority 04 · Education', template: 'pillar', surface: 's-sand', data: { p: P['04'] } },
  { id: 'story-09-priority-05', tag: 'Issues', title: 'Priority 05 · Energy', template: 'pillar', surface: 's-forest', data: { p: P['05'] } },
  { id: 'story-10-priorities-index', tag: 'Issues', title: 'Five priorities', template: 'list5', data: { eyebrow: 'Our agenda', heading: home.priorities.heading, items: home.priorities.list, intro: home.priorities.intro } },
  { id: 'story-11-mark-norman', tag: 'Candidates', title: 'Mark Norman', template: 'candidate', data: { c: candidates[0] } },
  { id: 'story-12-brian-schimmel', tag: 'Candidates', title: 'Brian Schimmel', template: 'candidate', surface: 's-forest', data: { c: candidates[1] } },
  { id: 'story-13-barbara-kahl', tag: 'Candidates', title: 'Dr. Barbara Kahl', template: 'candidate', data: { c: candidates[2] } },
  { id: 'story-14-ciatta-thompson', tag: 'Candidates', title: 'Ciatta Thompson', template: 'candidate', surface: 's-forest', data: { c: candidates[3] } },
  { id: 'story-15-randall-fryer', tag: 'Candidates', title: 'Randall Fryer', template: 'candidate', data: { c: candidates[4] } },
  { id: 'story-16-run-for-office', tag: 'Candidates', title: 'Run for office', template: 'cta', surface: 's-forest', data: { eyebrow: home.endorsements.runForOffice.eyebrow, heading: home.endorsements.runForOffice.heading, text: home.endorsements.runForOffice.description, buttons: [home.endorsements.runForOffice.cta] } },
  { id: 'story-17-volunteer', tag: 'Get involved', title: 'Show up. Speak up.', template: 'cover', data: { photo: 'who-we-are.jpg', eyebrow: 'Volunteer', heading: home.volunteerCta.heading, sub: home.volunteerCta.paragraphs[0] } },
  { id: 'story-18-volunteer-ways', tag: 'Get involved', title: 'Ways to help', template: 'chips', data: { eyebrow: 'Volunteer', heading: 'There is a place for you in this effort.', chips: volunteerActivities, note: home.volunteerCta.paragraphs[1] } },
  { id: 'story-19-events', tag: 'Get involved', title: 'Come meet us', template: 'manifesto', surface: 's-sand', data: { eyebrow: home.events.label, heading: home.events.heading, text: eventsBody[0] } },
  { id: 'story-20-host-event', tag: 'Get involved', title: 'Host an event', template: 'cta', data: { eyebrow: home.events.label, heading: home.events.ctas.secondary, text: eventsBody[1], buttons: [home.events.ctas.primary, home.events.ctas.secondary] } },
  { id: 'story-21-donate', tag: 'Support', title: 'Fund the fight', template: 'cta', surface: 's-forest', data: { eyebrow: home.donate.eyebrow, heading: home.donate.heading, text: home.donate.body, buttons: [home.donate.cta] } },
  { id: 'story-22-donate-ladder', tag: 'Support', title: 'Choose an amount', template: 'chips', surface: 's-forest', data: { eyebrow: home.donate.eyebrow, heading: 'Every contribution stays focused on Northwest Oregon.', chips: donationAmounts.map((n) => `$${n.toLocaleString('en-US')}`), note: home.donate.notice } },
  { id: 'story-23-freedom', tag: 'Beliefs', title: 'Free to build', template: 'manifesto', data: { eyebrow: 'Economic freedom', heading: home.freedom.heading, text: home.freedom.paragraphs[0] } },
  { id: 'story-24-economic-freedom', tag: 'Beliefs', title: 'The proven engine', template: 'manifesto', surface: 's-ink', data: { eyebrow: 'Where we stand', text: ECON_FREEDOM } },
  { id: 'story-25-region', tag: 'About', title: 'Never an afterthought', template: 'cover', data: { photo: 'hero.jpg', blur: true, eyebrow: `${pac.region} · ${pac.type}`, heading: home.about.heading, sub: home.about.paragraphs[0] } },
  { id: 'story-26-vision', tag: 'Introduction', title: 'The vision', template: 'manifesto', surface: 's-forest', data: { eyebrow: 'Our vision', heading: home.vision.heading, text: home.vision.paragraphs[0] } },
  { id: 'story-27-movement', tag: 'Get involved', title: 'People like you', template: 'quote', surface: 's-forest', data: { eyebrow: 'The movement', text: 'This movement works because of people like you.', attr: `The ${pac.name} Team` } },
  { id: 'story-28-team', tag: 'About', title: 'Local leadership', template: 'team', surface: 's-forest', data: { eyebrow: aboutPage.teamSection.eyebrow, heading: aboutPage.teamSection.heading, members: aboutPage.teamSection.members } },
  { id: 'story-29-follow', tag: 'Get involved', title: 'Follow along', template: 'cta', surface: 's-sand', data: { eyebrow: 'Stay connected', heading: 'Follow along and share the work.', text: 'Straight talk about the issues that affect your community, your safety, and your wallet.', buttons: ['Facebook', DOMAIN] } },
  { id: 'story-30-closing', tag: 'About', title: 'Not by accident', template: 'cta', surface: 's-forest', data: { eyebrow: 'Join the work', heading: aboutPage.cta.heading, text: aboutPage.cta.body, buttons: [aboutPage.cta.primary.label, aboutPage.cta.secondary.label] } },
]

/* -------------------------------------------------------------------
   CAROUSELS — 10 sets, 5–7 slides each, 1080×1080
------------------------------------------------------------------- */
function prioritySlides(id) {
  const p = P[id]
  return [
    { template: 'pillar', surface: 's-forest', data: { p } },
    ...p.supporting.map((text, i) => ({
      template: 'detail',
      surface: i % 2 ? 's-light' : 's-sand',
      data: { icon: PRIORITY_META[id].icon, kicker: `Priority ${id} · ${i + 1}/${p.supporting.length}`, name: PRIORITY_META[id].short, text },
    })),
    { template: 'cta', surface: 's-forest', data: { eyebrow: 'Join the work', heading: home.priorities.heading, text: home.priorities.intro, buttons: ['Donate', 'Volunteer'] } },
  ]
}

export const carousels = [
  {
    id: 'carousel-01-meet-the-pac',
    tag: 'Introduction',
    title: 'Meet Northwest Oregon PAC',
    caption: 'Who we are, what we stand for, and why this region deserves better.',
    slides: [
      { template: 'cover', data: { photo: 'banner.jpg', eyebrow: home.hero.eyebrow, heading: home.hero.heading, sub: pac.tagline } },
      { template: 'manifesto', data: { eyebrow: 'Who we are', text: home.hero.paragraphs[0] } },
      { template: 'manifesto', surface: 's-forest', data: { eyebrow: 'What we do', text: home.hero.paragraphs[1] } },
      { template: 'values3', data: { eyebrow: 'What guides us', heading: home.vision.valuesLine, values: home.hero.values } },
      { template: 'stats', surface: 's-sand', data: { eyebrow: 'On the record', heading: 'Built to operate responsibly.', stats: [ { n: pac.foundedYear, l: 'Established' }, { n: `#${pac.pacId}`, l: 'Oregon committee' }, { n: '05', l: 'Priorities' }, { n: '03', l: 'Values' } ] } },
      { template: 'promise', data: { eyebrow: home.vision.promiseEyebrow, text: home.vision.promise, sign: home.vision.valuesLine } },
      { template: 'cta', surface: 's-forest', data: { eyebrow: 'Join the work', heading: 'A stronger voice starts with you.', text: home.volunteerCta.paragraphs[1], buttons: ['Donate', 'Volunteer'] } },
    ],
  },
  {
    id: 'carousel-02-five-priorities',
    tag: 'Issues',
    title: 'Five priorities. One stronger region.',
    caption: 'The agenda that guides every dollar and every door we knock.',
    slides: [
      { template: 'manifesto', surface: 's-forest', data: { eyebrow: 'Our agenda', heading: home.priorities.heading, text: home.priorities.intro } },
      ...priorities.map((p) => ({ template: 'pillar', surface: p.id === '02' || p.id === '04' ? 's-light' : 's-forest', data: { p } })),
      { template: 'cta', data: { eyebrow: 'Read the agenda', heading: 'Build a Northwest Oregon where people can thrive.', text: home.vision.paragraphs[1], buttons: ['Explore Our Priorities'] } },
    ],
  },
  {
    id: 'carousel-03-prosperity',
    tag: 'Issues',
    title: 'Economic Prosperity & Small Business',
    caption: 'Prosperity is built by private enterprise, not government programs.',
    slides: prioritySlides('01'),
  },
  {
    id: 'carousel-04-accountability',
    tag: 'Issues',
    title: 'Government Accountability',
    caption: 'Taxpayers deserve to know where every dollar goes.',
    slides: prioritySlides('02'),
  },
  {
    id: 'carousel-05-public-safety',
    tag: 'Issues',
    title: 'Public Safety & Quality of Life',
    caption: 'Safe streets are the foundation of a free and prosperous community.',
    slides: prioritySlides('03'),
  },
  {
    id: 'carousel-06-education',
    tag: 'Issues',
    title: 'Education & Workforce Development',
    caption: 'Schools should prepare students for the real world.',
    slides: prioritySlides('04'),
  },
  {
    id: 'carousel-07-energy',
    tag: 'Issues',
    title: 'Affordable, Reliable Energy',
    caption: 'Oregonians deserve affordable utility bills.',
    slides: prioritySlides('05'),
  },
  {
    id: 'carousel-08-candidates',
    tag: 'Candidates',
    title: 'Candidates we support in 2026',
    caption: 'Backing the people willing to step forward across Northwest Oregon.',
    slides: [
      { template: 'manifesto', surface: 's-forest', data: { eyebrow: home.endorsements.eyebrow, heading: home.endorsements.heading, text: home.endorsements.intro } },
      ...candidates.map((c, i) => ({ template: 'candidate', surface: i % 2 ? 's-forest' : 's-light', data: { c } })),
      { template: 'cta', data: { eyebrow: home.endorsements.runForOffice.eyebrow, heading: home.endorsements.runForOffice.heading, text: home.endorsements.runForOffice.description, buttons: [home.endorsements.runForOffice.cta] } },
    ],
  },
  {
    id: 'carousel-09-get-involved',
    tag: 'Get involved',
    title: 'Show up. Speak up. Strengthen the region.',
    caption: 'Volunteer, host, contribute — there is a place for you in this effort.',
    slides: [
      { template: 'cover', data: { photo: 'who-we-are.jpg', eyebrow: 'Get involved', heading: home.volunteerCta.heading, sub: home.volunteerCta.paragraphs[0] } },
      { template: 'chips', data: { eyebrow: 'Volunteer', heading: 'There is a place for you in this effort.', chips: volunteerActivities, note: home.volunteerCta.paragraphs[1] } },
      { template: 'manifesto', surface: 's-sand', data: { eyebrow: home.events.label, heading: home.events.heading, text: eventsBody[0] } },
      { template: 'chips', surface: 's-forest', data: { eyebrow: home.donate.eyebrow, heading: 'Every contribution stays focused on Northwest Oregon.', chips: donationAmounts.map((n) => `$${n.toLocaleString('en-US')}`), note: home.donate.notice } },
      { template: 'cta', surface: 's-forest', data: { eyebrow: 'Join the work', heading: aboutPage.cta.heading, text: aboutPage.cta.body, buttons: [aboutPage.cta.primary.label, aboutPage.cta.secondary.label] } },
    ],
  },
  {
    id: 'carousel-10-our-story',
    tag: 'About',
    title: 'Our region should never be written off.',
    caption: 'Why Northwest Oregon PAC exists — and what we are building.',
    slides: [
      { template: 'cover', data: { photo: 'hero.jpg', blur: true, eyebrow: 'Our story', heading: aboutPage.story.heading, sub: aboutPage.story.paragraphs[0] } },
      { template: 'block', data: { n: '01', block: aboutPage.story.blocks[0] } },
      { template: 'block', surface: 's-forest', data: { n: '02', block: aboutPage.story.blocks[1] } },
      { template: 'block', surface: 's-sand', data: { n: '03', block: aboutPage.story.blocks[2] } },
      { template: 'block', surface: 's-forest', data: { n: '04', block: aboutPage.story.blocks[3] } },
      { template: 'cta', data: { eyebrow: 'Join the work', heading: aboutPage.cta.heading, text: aboutPage.cta.body, buttons: [aboutPage.cta.primary.label, aboutPage.cta.secondary.label, aboutPage.cta.textLink.label] } },
    ],
  },
]

// Feed captions for the app gallery (short, sourced from data where available)
export const feedCaptions = {
  'feed-01-hero': pac.tagline,
  'feed-02-mission': 'The mission statement, in full.',
  'feed-03-values': home.hero.values.map((v) => v.label).join(' · '),
  'feed-04-promise': home.vision.promise,
  'feed-06-region': home.about.heading,
  'feed-23-priorities-index': home.priorities.intro,
}
