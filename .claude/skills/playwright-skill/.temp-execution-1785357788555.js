// Detects unauthorized chrome text in social post HTMLs.
// Loads each post, extracts visible text, normalizes it, and compares against
// the PDF Image Text spec (with a whitespace-loose match).
// Anything on the graphic that isn't in the spec is flagged as unauthorized.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3001';
const SPEC_PATH = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/image-text-spec.json';
const OUT_DIR = 'C:/Users/General/AppData/Local/Temp/nwop-qa';

try { fs.mkdirSync(OUT_DIR, { recursive: true }); } catch {}
const spec = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8'));

const norm = (s) =>
  (s || '')
    .replace(/[·•]/g, ' ')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[.,;:!?"'()\[\]—–\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

// Word-level tokenizer to catch stray words
const tokens = (s) => norm(s).split(' ').filter(Boolean);

// Common chrome text words that shouldn't appear (unless in spec)
const KNOWN_CHROME_WORDS = new Set([
  'mmxxvi', 'mmxxv', 'volume', 'vol', 'issue',
  'edition', 'plate', 'sheet', 'card', 'session',
  'chapter', 'chapters', 'ch',
  'paid', 'nwop', 'nwop.com',
  'northwestoregon.com', // allowed for some posts per spec
]);

async function checkOne(page, id, url, imageText, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.goto(url, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(500);
  const bodyText = await page.evaluate(() => document.body ? document.body.innerText : '');

  const specText = imageText.join(' ');
  const specNorm = norm(specText);
  const specTokens = new Set(tokens(specText));

  const observedTokens = tokens(bodyText);

  // Find tokens in observed but not in spec
  const extras = [];
  for (const tok of observedTokens) {
    if (specTokens.has(tok)) continue;
    if (/^\d+$/.test(tok)) continue; // skip pure numbers (chip amounts, etc.)
    // skip common connector words if they might be part of legit inline UI
    extras.push(tok);
  }

  // Deduplicate but preserve order
  const uniqExtras = Array.from(new Set(extras));

  // Also spot literal unauthorized phrases (whole-phrase check)
  const observedLower = norm(bodyText);
  const bannedPhrases = [
    'northwest oregon pac',   // brand name (unless in spec)
    'mmxxvi',
    'story xvii', 'story xviii', 'story xix', 'story xx', 'story xxi',
    'no 55', 'no 59', 'no 33', 'no 34', 'no 35',
    'the misconception', 'the reality', 'not required',
    'the manifesto', 'the region',
    'paid for by',
    'vol 01', 'vol 02', 'vol 03',
    'nwop support',
    'nwop  support', 'nwop2026',
    'series 2026',
    'authorized signature',
    'legal tender',
    'est 2026',
  ];
  const phrasesFound = bannedPhrases.filter((p) => {
    if (specNorm.includes(p)) return false;
    return observedLower.includes(p);
  });

  const pass = phrasesFound.length === 0 && uniqExtras.length === 0;
  return { id, pass, extras: uniqExtras.slice(0, 20), phrasesFound };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results = [];
  console.log('Checking feed...');
  for (const [id, entry] of Object.entries(spec.feed)) {
    const r = await checkOne(page, id, `${TARGET_URL}/social/feed/${id}.html`, entry.imageText, 1080, 1080);
    results.push({ ...r, section: 'feed' });
    process.stdout.write(r.pass ? '.' : 'F');
  }
  process.stdout.write('\n');

  console.log('Checking stories...');
  for (const [id, entry] of Object.entries(spec.story)) {
    const r = await checkOne(page, id, `${TARGET_URL}/social/stories/${id}.html`, entry.imageText, 1080, 1920);
    results.push({ ...r, section: 'story' });
    process.stdout.write(r.pass ? '.' : 'F');
  }
  process.stdout.write('\n');

  console.log('Checking carousels...');
  for (const [cid, cEntry] of Object.entries(spec.carousel)) {
    for (let i = 0; i < cEntry.slides.length; i++) {
      const slideId = `${cid}/slide-${i + 1}`;
      const r = await checkOne(page, slideId, `${TARGET_URL}/social/carousels/${cid}/slide-${i + 1}.html`, cEntry.slides[i], 1080, 1080);
      results.push({ ...r, section: 'carousel' });
      process.stdout.write(r.pass ? '.' : 'F');
    }
  }
  process.stdout.write('\n');

  const failures = results.filter((r) => !r.pass);
  const totals = {
    feed: { total: 60, pass: results.filter((r) => r.section === 'feed' && r.pass).length },
    story: { total: 30, pass: results.filter((r) => r.section === 'story' && r.pass).length },
    carousel: { total: results.filter((r) => r.section === 'carousel').length, pass: results.filter((r) => r.section === 'carousel' && r.pass).length },
  };

  fs.writeFileSync(path.join(OUT_DIR, 'unauthorized-text-report.json'), JSON.stringify({ totals, failures }, null, 2), 'utf8');

  console.log('\n===== SUMMARY =====');
  console.log(`Feed:     ${totals.feed.pass}/${totals.feed.total}`);
  console.log(`Story:    ${totals.story.pass}/${totals.story.total}`);
  console.log(`Carousel: ${totals.carousel.pass}/${totals.carousel.total}`);
  console.log(`\nFailures: ${failures.length}`);
  for (const f of failures.slice(0, 80)) {
    const bits = [];
    if (f.phrasesFound.length) bits.push(`banned phrases: ${f.phrasesFound.join(' | ')}`);
    if (f.extras.length) bits.push(`extras: ${f.extras.slice(0, 12).join(' ')}`);
    console.log(`FAIL ${f.id} — ${bits.join(' || ')}`);
  }
  if (failures.length > 80) console.log(`... and ${failures.length - 80} more`);

  await browser.close();
})();
