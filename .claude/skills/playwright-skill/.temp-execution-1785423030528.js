// Generates a PDF listing every social post's direct URL.
// - Loads posts from src/data/social-posts.js
// - Verifies each URL responds 200 on the local dev server
// - Renders an HTML table and prints it to PDF via Playwright

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { chromium } = require('playwright');

const PROJECT_ROOT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC';
const DEV_ORIGIN = 'http://localhost:3001';   // sanity check that the file exists locally
const PUBLIC_ORIGIN = 'https://northwest-oregon-pac.vercel.app'; // canonical URL used in the PDF
const OUT_HTML = 'C:/Users/General/AppData/Local/Temp/social-posts-links.html';
const OUT_PDF = 'C:/Users/General/Downloads/Northwest-Oregon-PAC-Social-Post-Links.pdf';

const { feedPosts, storyPosts, carouselPosts } = require(path.join(PROJECT_ROOT, 'src/data/social-posts.js'));

// Strip cache-busting ?v= query so PDF URLs stay evergreen.
function cleanPath(p) { return p.replace(/\?.*$/, ''); }

// Build a flat list of { name, url, verifyPath }
function buildEntries() {
  const rows = [];
  feedPosts.forEach(p => {
    rows.push({
      section: 'Feed',
      name: `Feed-${String(p.n).padStart(2, '0')}`,
      title: p.title,
      path: cleanPath(p.html),
    });
  });
  storyPosts.forEach(p => {
    rows.push({
      section: 'Stories',
      name: `Story-${String(p.n).padStart(2, '0')}`,
      title: p.title,
      path: cleanPath(p.html),
    });
  });
  carouselPosts.forEach(c => {
    c.slides.forEach((slidePath, i) => {
      rows.push({
        section: 'Carousels',
        name: `Carousel-${String(c.n).padStart(2, '0')} · Slide ${i + 1}/${c.slideCount}`,
        title: c.title,
        path: cleanPath(slidePath),
      });
    });
  });
  return rows;
}

function head(fullUrl) {
  const client = fullUrl.startsWith('https:') ? https : http;
  return new Promise((resolve) => {
    const req = client.request(fullUrl, { method: 'HEAD', timeout: 12000 }, (res) => {
      // Follow one redirect (Vercel sometimes 308s trailing-slash variants)
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location) {
        const next = new URL(res.headers.location, fullUrl).href;
        head(next).then(resolve);
      } else {
        resolve(res.statusCode);
      }
    });
    req.on('error', () => resolve(0));
    req.on('timeout', () => { req.destroy(); resolve(0); });
    req.end();
  });
}

async function verify(rows) {
  const localSeen = new Map();
  const liveSeen = new Map();
  const results = [];
  for (const row of rows) {
    let localStatus = localSeen.get(row.path);
    if (localStatus === undefined) {
      localStatus = await head(`${DEV_ORIGIN}${row.path}`);
      localSeen.set(row.path, localStatus);
    }
    let liveStatus = liveSeen.get(row.path);
    if (liveStatus === undefined) {
      liveStatus = await head(`${PUBLIC_ORIGIN}${row.path}`);
      liveSeen.set(row.path, liveStatus);
    }
    results.push({ ...row, status: liveStatus, localStatus });
  }
  return results;
}

function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderHTML(rows) {
  const bySection = { Feed: [], Stories: [], Carousels: [] };
  rows.forEach(r => bySection[r.section].push(r));

  const total = rows.length;
  const broken = rows.filter(r => r.status !== 200);
  const uniquePaths = new Set(rows.map(r => r.path));
  const duplicates = rows.length - uniquePaths.size;

  const now = new Date().toISOString().slice(0, 10);

  const sectionHTML = (title, entries) => `
    <h2>${escape(title)} <span class="muted">(${entries.length})</span></h2>
    <table>
      <colgroup>
        <col style="width:34%">
        <col style="width:66%">
      </colgroup>
      <thead>
        <tr><th>Post Name</th><th>Direct URL</th></tr>
      </thead>
      <tbody>
        ${entries.map(r => `
          <tr>
            <td>
              <div class="name">${escape(r.name)}</div>
              <div class="title">${escape(r.title)}</div>
            </td>
            <td>
              <a href="${escape(PUBLIC_ORIGIN + r.path)}">${escape(PUBLIC_ORIGIN + r.path)}</a>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  return `<!doctype html>
<html><head><meta charset="utf-8">
<title>Northwest Oregon PAC — Social Post Links</title>
<style>
  @page { size: A4; margin: 22mm 16mm; }
  :root { --ink:#2a2a26; --primary:#2e4538; --muted:#6b7268; --border:#dedbcf; --accent:#5a7060; }
  * { box-sizing:border-box; }
  html, body { margin:0; padding:0; color:var(--ink); font:12px/1.5 "Source Sans 3", "Segoe UI", Arial, sans-serif; }
  header { border-bottom:2px solid var(--primary); padding-bottom:14px; margin-bottom:18px; }
  h1 { font:600 22px/1.2 "Lora", "Georgia", serif; color:var(--primary); margin:0 0 6px; letter-spacing:-.01em; }
  .sub { color:var(--muted); font-size:11px; letter-spacing:.14em; text-transform:uppercase; }
  .meta { margin-top:10px; font-size:11px; color:var(--muted); }
  .meta span { margin-right:16px; }
  h2 { font:500 15px/1.3 "Lora", "Georgia", serif; color:var(--primary); margin:26px 0 8px; letter-spacing:-.01em; border-bottom:1px solid var(--border); padding-bottom:5px; page-break-after:avoid; }
  .muted { color:var(--muted); font-weight:400; }
  table { width:100%; border-collapse:collapse; }
  thead tr { background:#f0ede4; }
  th { text-align:left; font:600 10px/1 "Source Sans 3", Arial, sans-serif; text-transform:uppercase; letter-spacing:.14em; color:var(--primary); padding:8px 10px; border-bottom:1px solid var(--border); }
  td { vertical-align:top; padding:7px 10px; border-bottom:1px solid #efece2; font-size:11px; }
  tr { page-break-inside:avoid; }
  .name { font-weight:600; color:var(--ink); }
  .title { color:var(--muted); font-size:10px; margin-top:2px; }
  a { color:var(--accent); text-decoration:none; word-break:break-all; }
  a:hover { text-decoration:underline; }
  footer { margin-top:22px; padding-top:10px; border-top:1px solid var(--border); font-size:10px; color:var(--muted); }
</style>
</head><body>
  <header>
    <h1>Northwest Oregon PAC — Social Post Links</h1>
    <div class="sub">Generated ${now}</div>
    <div class="meta">
      <span><strong>${total}</strong> total links</span>
      <span><strong>${bySection.Feed.length}</strong> feed</span>
      <span><strong>${bySection.Stories.length}</strong> stories</span>
      <span><strong>${bySection.Carousels.length}</strong> carousel slides</span>
      <span><strong>${broken.length}</strong> broken · <strong>${duplicates}</strong> duplicates</span>
    </div>
  </header>

  ${sectionHTML('Feed', bySection.Feed)}
  ${sectionHTML('Stories', bySection.Stories)}
  ${sectionHTML('Carousels', bySection.Carousels)}

  <footer>
    Base URL: ${escape(PUBLIC_ORIGIN)} · Each URL points to the standalone social post HTML file served from the site's public directory.
  </footer>
</body></html>`;
}

(async () => {
  const rows = buildEntries();
  console.log(`Collected ${rows.length} URLs`);

  console.log('Verifying against dev server + live Vercel deployment...');
  const verified = await verify(rows);
  const brokenLive = verified.filter(r => r.status !== 200);
  const brokenLocal = verified.filter(r => r.localStatus !== 200);
  console.log(`  Live (${PUBLIC_ORIGIN}):  200 OK ${verified.length - brokenLive.length}/${verified.length}`);
  console.log(`  Local (${DEV_ORIGIN}):    200 OK ${verified.length - brokenLocal.length}/${verified.length}`);
  if (brokenLive.length) brokenLive.slice(0, 10).forEach(r => console.log(`    [live ${r.status}] ${r.path}`));
  if (brokenLocal.length) brokenLocal.slice(0, 10).forEach(r => console.log(`    [local ${r.localStatus}] ${r.path}`));

  const uniq = new Set(verified.map(r => r.path));
  console.log(`  duplicate URL rows: ${verified.length - uniq.size}`);

  const html = renderHTML(verified);
  fs.writeFileSync(OUT_HTML, html, 'utf8');
  console.log(`Wrote HTML: ${OUT_HTML}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + OUT_HTML.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    margin: { top: '18mm', bottom: '18mm', left: '14mm', right: '14mm' },
    printBackground: true,
  });
  await browser.close();
  console.log(`Wrote PDF: ${OUT_PDF}`);
})();
