
(async () => {
  try {
    const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');

const BASE = '/tmp/perf-baseline';
const AFTER = '/tmp/perf-after';
const DIFF = '/tmp/perf-diff';
fs.mkdirSync(DIFF, { recursive: true });

const files = fs.readdirSync(BASE).filter((f) => f.endsWith('.png'));
let totalPct = 0;
const results = [];
for (const f of files) {
  const a = PNG.sync.read(fs.readFileSync(path.join(BASE, f)));
  const b = PNG.sync.read(fs.readFileSync(path.join(AFTER, f)));
  if (a.width !== b.width || a.height !== b.height) {
    console.log(`DIMENSION MISMATCH: ${f} baseline=${a.width}x${a.height} after=${b.width}x${b.height}`);
    results.push({ file: f, mismatch: 'dimension' });
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const numDiff = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0.15,
    includeAA: false,
  });
  const totalPixels = a.width * a.height;
  const pct = (numDiff / totalPixels) * 100;
  totalPct += pct;
  results.push({ file: f, diffPixels: numDiff, totalPixels, pct: pct.toFixed(3) });
  fs.writeFileSync(path.join(DIFF, f), PNG.sync.write(diff));
}

results.sort((r1, r2) => (parseFloat(r2.pct) || 0) - (parseFloat(r1.pct) || 0));
console.log('Pixel diff report (threshold 0.15, ignore anti-aliasing)');
console.log('='.repeat(60));
for (const r of results) {
  console.log(`${r.file}: ${r.pct}% diff (${r.diffPixels}/${r.totalPixels} px)`);
}
console.log('='.repeat(60));
console.log(`Average diff: ${(totalPct / results.length).toFixed(3)}%`);

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
