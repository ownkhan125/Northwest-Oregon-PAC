const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const shots = 'C:/Users/General/AppData/Local/Temp/nwop-qa/randall-hover';
try { fs.rmSync(shots, { recursive: true, force: true }); } catch {}
fs.mkdirSync(shots, { recursive: true });

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext();
  const p = await ctx.newPage();

  async function scenario(vp, name) {
    await p.setViewportSize(vp);
    await p.goto('http://localhost:3001/', { waitUntil: 'load' });
    await p.waitForTimeout(1200);
    await p.evaluate(() => document.getElementById('candidates')?.scrollIntoView({behavior:'instant', block:'start'}));
    await p.waitForTimeout(800);
    await p.screenshot({ path: path.join(shots, name + '-rest.png'), fullPage: false });

    // Randall
    const randall = p.locator('h3', { hasText: 'Randall Fryer' }).first();
    if (await randall.count()) {
      await randall.scrollIntoViewIfNeeded();
      await p.waitForTimeout(300);
      await randall.hover();
      await p.waitForTimeout(700);
      await p.screenshot({ path: path.join(shots, name + '-hover-randall.png'), fullPage: false });
      const info = await p.evaluate(() => {
        const h = [...document.querySelectorAll('h3')].find(el => el.textContent.trim() === 'Randall Fryer');
        if (!h) return null;
        let el = h;
        while (el && !el.className?.includes?.('group')) el = el.parentElement;
        const parentA = el?.closest('a');
        return {
          cursor: el ? getComputedStyle(el).cursor : null,
          isLink: !!parentA,
          bgAtHover: (function(){
            const card = h.closest('[data-card]');
            return card ? getComputedStyle(card).backgroundColor : null;
          })(),
        };
      });
      console.log(name, 'randall:', JSON.stringify(info));
    }

    // Mark
    const mark = p.locator('h3', { hasText: 'Mark Norman' }).first();
    if (await mark.count()) {
      await mark.hover();
      await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(shots, name + '-hover-mark.png'), fullPage: false });
      const info = await p.evaluate(() => {
        const h = [...document.querySelectorAll('h3')].find(el => el.textContent.trim() === 'Mark Norman');
        if (!h) return null;
        let el = h;
        while (el && !el.className?.includes?.('group')) el = el.parentElement;
        const parentA = el?.closest('a');
        return {
          cursor: el ? getComputedStyle(el).cursor : null,
          isLink: !!parentA,
          bgAtHover: (function(){
            const card = h.closest('[data-card]');
            return card ? getComputedStyle(card).backgroundColor : null;
          })(),
        };
      });
      console.log(name, 'mark:', JSON.stringify(info));
    }
  }

  await scenario({width:1440, height:900}, 'desktop');
  await scenario({width:820, height:1180}, 'tablet');
  await scenario({width:390, height:844}, 'mobile');

  await b.close();
  console.log('done');
})();
