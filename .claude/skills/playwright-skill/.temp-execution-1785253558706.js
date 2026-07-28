const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET = 'http://localhost:3000';
const results = { pass: [], fail: [] };
const ok = (m) => results.pass.push('OK   ' + m);
const fail = (m) => results.fail.push('FAIL ' + m);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await ctx.newPage();

  try {
    // 1. Fetch the PDF directly and verify magic bytes
    const resp = await page.request.get(TARGET + '/downloads/northwest-oregon-guide.pdf');
    const status = resp.status();
    const bytes = await resp.body();
    ok('/downloads/northwest-oregon-guide.pdf HTTP ' + status);
    if (status !== 200) fail('non-200 status');
    if (bytes.slice(0, 5).toString('utf8') !== '%PDF-') {
      fail('response is not a PDF (magic bytes: ' + bytes.slice(0, 8).toString('utf8') + ')');
    } else {
      ok('response begins with %PDF- magic bytes (' + bytes.length + ' bytes)');
    }

    // 2. Load the guide-to-action page, fill the form, submit
    await page.goto(TARGET + '/guide-to-action', { waitUntil: 'networkidle', timeout: 45000 });
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test.qa+' + Date.now() + '@example.com');
    await page.fill('input[name="zip"]', '97005');

    // Intercept the /api/lead call so we don't rely on the real GHL webhook.
    await page.route('**/api/lead', (route) => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    await Promise.all([
      page.waitForURL('**/thank-you', { timeout: 15000 }),
      page.click('[data-testid="funnel-submit"]'),
    ]);
    ok('Form submit navigated to /thank-you');

    // 3. On thank-you page, download the guide via the visible download button
    const downloadBtn = page.locator('[data-testid="download-guide"]');
    const btnCount = await downloadBtn.count();
    if (btnCount === 0) {
      fail('download button not found on /thank-you');
    } else {
      const href = await downloadBtn.getAttribute('href');
      const dl = await downloadBtn.getAttribute('download');
      ok('Download button present, href=' + href + ', download=' + dl);

      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 15000 }),
        downloadBtn.click(),
      ]);
      const suggested = download.suggestedFilename();
      const savePath = path.join('C:/Users/General/AppData/Local/Temp', 'qa-download-' + Date.now() + '.pdf');
      await download.saveAs(savePath);
      const stat = fs.statSync(savePath);
      const head = fs.readFileSync(savePath).slice(0, 5).toString('utf8');
      ok('Downloaded ' + suggested + ' -> ' + savePath + ' (' + stat.size + ' bytes, magic=' + head + ')');

      // Verify against the served file
      const compare = await page.request.get(TARGET + '/downloads/northwest-oregon-guide.pdf');
      const served = await compare.body();
      if (served.length === stat.size) ok('Downloaded file size matches served PDF');
      else fail('Size mismatch: downloaded=' + stat.size + ' served=' + served.length);
    }
  } catch (e) {
    fail('Unhandled: ' + e.message);
    if (e.stack) console.error(e.stack);
  }
  await browser.close();

  console.log('\n===== PASSING =====');
  results.pass.forEach((l) => console.log(l));
  console.log('\n===== FAILING (' + results.fail.length + ') =====');
  results.fail.forEach((l) => console.log(l));
  process.exit(results.fail.length ? 1 : 0);
})();
