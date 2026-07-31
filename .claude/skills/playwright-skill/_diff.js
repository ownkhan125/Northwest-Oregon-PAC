const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');

const BEFORE = 'C:\\Users\\General\\AppData\\Local\\Temp\\perf-before';
const AFTER = 'C:\\Users\\General\\AppData\\Local\\Temp\\perf-after2';
const DIFF_DIR = 'C:\\Users\\General\\AppData\\Local\\Temp\\perf-diff';
if (!fs.existsSync(DIFF_DIR)) fs.mkdirSync(DIFF_DIR, { recursive: true });

const files = fs.readdirSync(BEFORE).filter((f) => f.endsWith('.png'));
const rows = [];

for (const f of files) {
  const a = PNG.sync.read(fs.readFileSync(path.join(BEFORE, f)));
  const b = PNG.sync.read(fs.readFileSync(path.join(AFTER, f)));
  if (a.width !== b.width || a.height !== b.height) {
    rows.push({ file: f, sizeMismatch: `${a.width}x${a.height} vs ${b.width}x${b.height}` });
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0.1,
    alpha: 0.3,
    diffColor: [255, 0, 0],
  });
  const totalPixels = a.width * a.height;
  const pctDiff = ((mismatched / totalPixels) * 100).toFixed(4);
  rows.push({ file: f, dims: `${a.width}x${a.height}`, mismatched, pctDiff: pctDiff + '%' });
  if (mismatched > 0) {
    fs.writeFileSync(path.join(DIFF_DIR, f), PNG.sync.write(diff));
  }
}

// Sort by mismatched desc
rows.sort((x, y) => (y.mismatched || 0) - (x.mismatched || 0));
console.log(JSON.stringify(rows, null, 2));

const clean = rows.filter((r) => (r.mismatched || 0) === 0).length;
const total = rows.length;
console.log(`\n=== SUMMARY ===`);
console.log(`Identical: ${clean}/${total}`);
const changed = rows.filter((r) => (r.mismatched || 0) > 0);
if (changed.length) {
  const max = Math.max(...changed.map((r) => parseFloat(r.pctDiff)));
  console.log(`Max pixel diff: ${max}% (any diff below ~0.5% is typically animation timing jitter)`);
}
