// Server-only Stripe client. Never import this from a client component —
// STRIPE_SECRET_KEY must not reach the browser bundle.

import Stripe from 'stripe'

let client = null

/**
 * Lazily construct the Stripe client so a missing key fails at request
 * time with a clear error instead of at module load during `next build`.
 * @returns {Stripe}
 */
export function getStripe() {
  if (client) return client
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  client = new Stripe(key)
  return client
}

/**
 * Resolve the public origin for redirect URLs — the configured site URL in
 * production, otherwise whatever origin the request came from (dev).
 * @param {Request} request
 * @returns {string}
 */
export function getSiteOrigin(request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured
  return request.headers.get('origin') ?? new URL(request.url).origin
}
