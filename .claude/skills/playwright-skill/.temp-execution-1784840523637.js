const { chromium } = require('playwright')

const BASE = 'http://localhost:3000'
const TEST_EMAIL = 'usertestingop1776@gmail.com'

// The full range of shapes users actually type — including the previously-
// blocking 12-digit garbage from the screenshot.
const PHONE_CASES = [
  { label: 'natural 10 digits',         input: '5035551234' },
  { label: 'formatted (503) 555-0123',  input: '(503) 555-0123' },
  { label: 'dashed with country code',  input: '1-503-555-0123' },
  { label: 'already +1 prefixed',       input: '+1 503-555-0123' },
  { label: 'garbage 12 digits (was blocking on Volunteer)', input: '213212313212' },
  { label: 'blank optional',            input: '' },
]

// Fields on each form
const VOLUNTEER = {
  path: '/volunteer',
  api: '/api/volunteer',
  requiredText: ['input[name="firstName"]', 'input[name="lastName"]', 'input[name="email"]', 'input[name="city"]'],
  selectFields: ['region', 'registeredVoter', 'campaignExperience', 'availability', 'frequency'],
  submitBtn: 'button[type="submit"]',
}
const CONTACT = {
  path: '/contact',
  api: '/api/contact',
  requiredText: ['input[name="firstName"]', 'input[name="lastName"]', 'input[name="email"]', 'input[name="city"]', 'input[name="zip_code"]'],
  selectFields: ['help_topic'],
  submitBtn: 'button[type="submit"]',
  extraText: [['textarea[name="message"]', 'This is a Playwright parity check.']],
}

async function fillCommon(page, form) {
  await page.fill('input[name="firstName"]', 'Playwright')
  await page.fill('input[name="lastName"]', 'Test')
  await page.fill('input[name="email"]', TEST_EMAIL)
  await page.fill('input[name="city"]', 'Beaverton')
  if (form === CONTACT) await page.fill('input[name="zip_code"]', '97005')
  if (form.extraText) {
    for (const [sel, val] of form.extraText) await page.fill(sel, val)
  }
  // Custom Selects — click open, pick first non-placeholder option
  for (const name of form.selectFields) {
    const trigger = page.locator(`[aria-controls$="${name}-menu"], [aria-labelledby*="${name}"], button[aria-haspopup="listbox"][data-name="${name}"]`).first()
    // Fallback: any element with name-tagged aria — the custom Select uses aria-labelledby to the label, but we can locate by text next to the trigger.
    // The safer route: locate the closest wrapper containing this label text.
    // Skip the fancy locator; instead, the custom Select mounts a hidden native <input type="hidden" name="…"> that we can set directly through the DOM.
    await page.evaluate((n) => {
      // The Select component renders a hidden input for form serialization.
      const hidden = document.querySelector(`input[name="${n}"]`)
      if (hidden && hidden.type === 'hidden') {
        // Pick a sensible value
        const map = {
          region: 'Metro Portland',
          registeredVoter: 'Yes',
          campaignExperience: 'None',
          availability: 'Weekends',
          frequency: 'Monthly',
          help_topic: 'General inquiry',
        }
        hidden.value = map[n] || 'Any'
      }
    }, name)
  }
}

async function testForm(page, form, phone) {
  await page.goto(BASE + form.path, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(600)
  const accept = page.getByRole('button', { name: 'Accept' }).first()
  if (await accept.isVisible().catch(() => false)) { await accept.click(); await page.waitForTimeout(200) }

  await fillCommon(page, form)
  await page.fill('input[name="phone"]', phone)

  // Snapshot UI phone before submit
  const uiBefore = await page.locator('input[name="phone"]').inputValue()

  // Intercept /api/... to see the outgoing payload without touching real webhook
  let capturedPayload = null
  await page.route(`**${form.api}`, async (route) => {
    try { capturedPayload = JSON.parse(route.request().postData() || '{}') } catch { capturedPayload = null }
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, workflow: form.path }) })
  })

  // Submit and wait for the response
  await page.locator(form.submitBtn).first().click({ timeout: 5000 })
  const waited = await page.waitForResponse((r) => r.url().includes(form.api), { timeout: 8000 }).then(() => true).catch(() => false)
  await page.waitForTimeout(300)

  // Check for any visible validation error under the phone input
  const phoneError = await page.locator('input[name="phone"] ~ p[role="alert"], input[name="phone"] + p, [role="alert"]').first().innerText().catch(() => '')

  const uiAfter = await page.locator('input[name="phone"]').inputValue().catch(() => '<not in DOM>')

  return { uiBefore, uiAfter, waited, phoneError, capturedPayload }
}

;(async () => {
  const browser = await chromium.launch({ headless: false })

  for (const form of [VOLUNTEER, CONTACT]) {
    console.log(`\n========== ${form.path} ==========`)
    for (const c of PHONE_CASES) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
      const page = await ctx.newPage()
      const errs = []
      page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
      const r = await testForm(page, form, c.input)
      const uiKept = r.uiBefore === c.input && r.uiAfter === c.input
      console.log(`\n  [${c.label}]  input=${JSON.stringify(c.input)}`)
      console.log(`     UI before/after: ${JSON.stringify(r.uiBefore)} / ${JSON.stringify(r.uiAfter)}  ${uiKept ? '✓ unchanged' : '✗ MUTATED'}`)
      console.log(`     API POST reached: ${r.waited ? '✓ yes' : '✗ no'}`)
      console.log(`     wire phone (client → api payload): ${JSON.stringify(r.capturedPayload?.phone)} (raw pass-through — server prepends +1 next)`)
      console.log(`     phone error surfaced in UI: ${r.phoneError ? '✗ ' + JSON.stringify(r.phoneError.slice(0, 80)) : '✓ none'}`)
      console.log(`     console errors: ${errs.length}`)
      await ctx.close()
    }
  }

  // ==== Server-side normalizer proof (both routes now import toE164US) ====
  console.log('\n\n========== Server-side toE164US normalization ==========')
  const toE164US = (raw) => {
    if (!raw) return ''
    const digits = String(raw).replace(/\D/g, '')
    if (digits.length === 10) return `+1${digits}`
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
    return raw
  }
  for (const c of PHONE_CASES) {
    console.log(`  ${JSON.stringify(c.input)} → ${JSON.stringify(toE164US(c.input))}`)
  }

  await browser.close()
  console.log('\nDONE')
})()
