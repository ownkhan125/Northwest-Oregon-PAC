const fs = require('fs');
const path = require('path');

const PROJECT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC';
const SRC_DIR = path.join(PROJECT, 'public');
const OUT_DIR = path.join(PROJECT, 'public', 'icons');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const MAP = {
  '01': 'gavel',
  '02': 'billboard',
  '03': 'skyline',
  '04': 'tax-sign',
  '05': 'balance',
  '06': 'laptop-lock',
  '07': 'shield',
  '08': 'capitol',
  '09': 'target',
  '10': 'ballot-box',
  '11': 'podium',
  '12': 'money-bag',
  '13': 'certificate',
  '14': 'document',
  '15': 'envelope',
};

for (const [num, name] of Object.entries(MAP)) {
  const srcPath = path.join(SRC_DIR, `Untitled-3-${num}.svg`);
  const outPath = path.join(OUT_DIR, `${name}.svg`);
  let svg = fs.readFileSync(srcPath, 'utf8');

  // Add fill="currentColor" to the root <svg> element so consumers can
  // tint via CSS `color`. Also strip the trailing "?" so both viewers work.
  svg = svg.replace(/<svg\b([^>]*)>/, (m, attrs) => {
    if (/fill\s*=/.test(attrs)) return `<svg${attrs}>`;
    return `<svg${attrs} fill="currentColor">`;
  });

  fs.writeFileSync(outPath, svg);
  console.log(`wrote ${outPath}`);
}
console.log('done');
