// Northwest Oregon PAC — social post gallery content.
// Every tile currently points at a placeholder graphic; swap `image`
// for the final export (1080×1080 feed / 1080×1920 story) when ready.

const FEED_PLACEHOLDER = '/placeholder-social-feed.svg'
const STORY_PLACEHOLDER = '/placeholder-social-story.svg'

export const feedPosts = [
  {
    id: 'feed-meet-the-pac',
    tag: 'Introduction',
    title: 'A stronger voice for Northwest Oregon.',
    caption: 'Who we are, what we stand for, and why this region deserves better.',
  },
  {
    id: 'feed-values',
    tag: 'Values',
    title: 'Hope. Support. Heard.',
    caption: 'Three words that guide every dollar and every door we knock.',
  },
  {
    id: 'feed-prosperity',
    tag: 'Issues',
    title: 'Grow private-sector prosperity.',
    caption: 'Policies that let local businesses hire, build, and stay.',
  },
  {
    id: 'feed-accountability',
    tag: 'Issues',
    title: 'Hold government accountable.',
    caption: 'Your tax dollars, tracked and answered for.',
  },
  {
    id: 'feed-safety',
    tag: 'Issues',
    title: 'Keep our communities safe.',
    caption: 'Safe streets and supported first responders in every county.',
  },
  {
    id: 'feed-workforce',
    tag: 'Issues',
    title: 'Prepare the next generation for real careers.',
    caption: 'Trades, apprenticeships, and skills that pay in Northwest Oregon.',
  },
  {
    id: 'feed-energy',
    tag: 'Issues',
    title: 'Affordable, reliable energy.',
    caption: 'Power that families and employers can actually count on.',
  },
  {
    id: 'feed-volunteer',
    tag: 'Get involved',
    title: 'Lend a hand where you live.',
    caption: 'An hour of your week moves the whole region forward.',
  },
  {
    id: 'feed-events',
    tag: 'Get involved',
    title: 'Show up. Be heard.',
    caption: 'Town halls, meetups, and canvasses near you.',
  },
  {
    id: 'feed-donate',
    tag: 'Support',
    title: 'Fuel the work.',
    caption: 'Every contribution stays focused on Northwest Oregon.',
  },
].map((post) => ({
  ...post,
  format: 'feed',
  size: '1080 × 1080',
  image: FEED_PLACEHOLDER,
  alt: `Placeholder tile for the “${post.title}” feed post`,
}))

export const storyPosts = [
  {
    id: 'story-meet-the-pac',
    tag: 'Introduction',
    title: 'Meet Northwest Oregon PAC.',
  },
  {
    id: 'story-values',
    tag: 'Values',
    title: 'Hope. Support. Heard.',
  },
  {
    id: 'story-prosperity',
    tag: 'Issues',
    title: 'Prosperity, close to home.',
  },
  {
    id: 'story-accountability',
    tag: 'Issues',
    title: 'Accountability, every session.',
  },
  {
    id: 'story-safety',
    tag: 'Issues',
    title: 'Safety on every street.',
  },
  {
    id: 'story-workforce',
    tag: 'Issues',
    title: 'Real skills, real careers.',
  },
  {
    id: 'story-energy',
    tag: 'Issues',
    title: 'Energy you can count on.',
  },
  {
    id: 'story-volunteer',
    tag: 'Get involved',
    title: 'Volunteer this weekend.',
  },
  {
    id: 'story-events',
    tag: 'Get involved',
    title: 'See you at the next event.',
  },
  {
    id: 'story-donate',
    tag: 'Support',
    title: 'Chip in before midnight.',
  },
].map((post) => ({
  ...post,
  format: 'story',
  size: '1080 × 1920',
  image: STORY_PLACEHOLDER,
  alt: `Placeholder tile for the “${post.title}” story post`,
}))
