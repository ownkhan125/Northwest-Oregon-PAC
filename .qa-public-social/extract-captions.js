// Extract every post + caption from src/data/social-posts.js into a JSON dump for comparison.
const fs = require('fs')
const path = require('path')

const src = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/social-posts.js'), 'utf8')

// Parse ES module by extracting arrays literally.
// Approach: strip export const, then use eval in a sandboxed function to get the arrays.
const cleaned = src
  .replace(/export const /g, 'const ')
  .replace(/\/\/[^\n]*\n/g, '\n')

const wrapper = `${cleaned}\nreturn { feedPosts, storyPosts, carouselPosts };`
const data = new Function(wrapper)()

const summary = {
  feed: data.feedPosts.map((p) => ({ id: p.id, n: p.n, tag: p.tag, title: p.title, caption: p.caption })),
  stories: data.storyPosts.map((p) => ({ id: p.id, n: p.n, tag: p.tag, title: p.title, caption: p.caption })),
  carousels: data.carouselPosts.map((p) => ({ id: p.id, n: p.n, tag: p.tag, title: p.title, caption: p.caption, slideCount: p.slideCount })),
}

fs.writeFileSync(path.join(__dirname, 'current-captions.json'), JSON.stringify(summary, null, 2))
console.log(`Feed: ${summary.feed.length}, Stories: ${summary.stories.length}, Carousels: ${summary.carousels.length}`)
console.log('Written to .qa-public-social/current-captions.json')
