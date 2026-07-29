import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.qa-public-social/pdf-raw.json','utf8'));

// Column boundaries observed:
// Number column: ~77 (post number)
// Image text: ~111.75 to ~268
// Caption: ~268.5 to ~428
// Visual idea: ~428.25 onwards
const CAPTION_X_MIN = 265;
const CAPTION_X_MAX = 425;
const NUM_X_MIN = 75;
const NUM_X_MAX = 110;

// For each page, group items by y-coordinate, filter caption column
// But captions can span multiple lines. Let me first log all pages summary
const pages = data;

// Print a summary of each page: what section, first item, number of items
let output = [];
for (const page of pages) {
  const items = page.items.filter(it => it.text.trim() !== '');
  const firstText = items.slice(0, 5).map(it => it.text).join(' | ');
  output.push(`Page ${page.page}: (${items.length} items) ${firstText}`);
}
fs.writeFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.qa-public-social/pdf-pages-summary.txt', output.join('\n'));
console.log('Wrote summary');
