const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });

  for (const path of [
    '/social/feed/feed-25-candidates-intro.html',
    '/social/feed/feed-35-host-meetup.html',
  ]) {
    await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle' });
    const result = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const bk = imgs.find((img) => /barbara-kahl/i.test(img.getAttribute('src') || ''));
      if (!bk) return { present: false };
      // Walk up through ancestors and record display state of every ancestor
      const chain = [];
      let el = bk;
      while (el && el.tagName !== 'BODY') {
        const cs = window.getComputedStyle(el);
        chain.push({
          tag: el.tagName,
          cls: el.className || '',
          inline: el.getAttribute('style') || '',
          display: cs.display,
          visibility: cs.visibility,
          rect: el.getBoundingClientRect().width + 'x' + el.getBoundingClientRect().height,
        });
        el = el.parentElement;
      }
      const rect = bk.getBoundingClientRect();
      return {
        present: true,
        imgRect: `${rect.width}x${rect.height}`,
        imgVisible: rect.width > 0 && rect.height > 0,
        chain,
      };
    });
    console.log(`\n=== ${path} ===`);
    console.log(JSON.stringify(result, null, 2));
    const shot = path.split('/').pop().replace('.html', '.png');
    await page.screenshot({ path: `/tmp/${shot}`, fullPage: true });
    console.log(`screenshot: /tmp/${shot}`);
  }

  await browser.close();
})();
