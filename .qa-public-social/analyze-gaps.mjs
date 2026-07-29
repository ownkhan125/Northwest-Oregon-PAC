import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.qa-public-social/pdf-raw.json','utf8'));

// For feed 1, print caption items with their y values so we can see line gaps
const CAPTION_X_MIN = 260, CAPTION_X_MAX = 425;
// Find anchor for post 1
const items = [];
const page1 = raw[0];
// anchor '1' at x~77 y~504
const anchorY = 504.05785910749995;
for (const it of page1.items) {
  if (it.x >= CAPTION_X_MIN && it.x < CAPTION_X_MAX && it.text.trim()) {
    items.push(it);
  }
}
items.sort((a,b) => b.y - a.y);
let prevY = null;
for (const it of items) {
  const gap = prevY !== null ? (prevY - it.y).toFixed(2) : '-';
  console.log(`y=${it.y.toFixed(2)} gap=${gap} x=${it.x.toFixed(1)} ${JSON.stringify(it.text)}`);
  prevY = it.y;
}
