// Northwest Oregon PAC — shop catalog.
// Product photos are the mockups in src/assets/images/shop. Copy, prices,
// and options are placeholders until the real merch line and checkout are
// wired up.
//
// Fields:
//   image    — static import, rendered with next/image
//   imageAlt — descriptive alt text for the photo
//   details  — longer paragraph shown under "About this item"
//   features — short bullet list (materials, sizing, care)
//   options  — optional { label, values } picker (size, color, pack)

import capImage from '@/assets/images/shop/cap-mockup.png'
import mugImage from '@/assets/images/shop/mug-mockup.png'
import teeImage from '@/assets/images/shop/tee-mockup.png'

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL']

export const products = [
  {
    id: 'logo-tee',
    name: 'Northwest Oregon Logo Tee',
    category: 'Apparel',
    price: 28,
    description: 'Sage-green tee with a cream ringer collar and the wordmark on the left chest.',
    details:
      'Our everyday tee. A relaxed, unisex cut in 6.5 oz ring-spun cotton that holds its shape through a season of canvassing and a lot of laundry. The bridge-and-hills wordmark is a water-based screen print on the left chest, so it sits soft on the fabric instead of cracking, and the cream ringer trim on the collar and cuffs picks up the brand palette.',
    features: [
      '100% ring-spun cotton, 6.5 oz',
      'Unisex relaxed fit, side-seamed',
      'Cream ringer collar and cuffs',
      'Water-based left-chest print',
    ],
    options: { label: 'Size', values: APPAREL_SIZES },
    image: teeImage,
    imageAlt: 'Sage-green Northwest Oregon tee with a cream collar and left-chest logo',
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: 'field-cap',
    name: 'Field Cap',
    category: 'Apparel',
    price: 24,
    description: 'Six-panel sage cap with the bridge emblem embroidered in cream. One size.',
    details:
      'A low-profile, structured six-panel cap that breaks in fast and looks better the more it gets rained on. The round bridge-and-hills emblem is embroidered in cream thread on the front panel, with a curved brim and an adjustable strap in the back.',
    features: [
      'Cotton twill, structured six-panel crown',
      'Cream-thread embroidered emblem',
      'Curved brim, adjustable back strap',
      'One size fits most',
    ],
    image: capImage,
    imageAlt:
      'Sage-green six-panel cap with the Northwest Oregon bridge emblem embroidered in cream',
    inStock: true,
  },
  {
    id: 'logo-mug',
    name: 'Logo Mug',
    category: 'Drinkware',
    price: 16,
    description: '11 oz sage ceramic mug with a cream handle and the bridge emblem on the front.',
    details:
      'An 11 oz ceramic mug for the early-morning phone bank. Glazed sage green with a contrasting cream handle and the round bridge-and-hills emblem printed on the front. Dishwasher and microwave safe, and it survives being left on a desk over a long weekend.',
    features: [
      '11 oz ceramic, C-handle',
      'Sage glaze with cream handle',
      'Dishwasher and microwave safe',
      'Front emblem print',
    ],
    image: mugImage,
    imageAlt: 'Sage-green ceramic mug with a cream handle and the Northwest Oregon bridge emblem',
    badge: 'New',
    inStock: true,
  },
]

export const PRODUCT_CATEGORIES = ['All', ...new Set(products.map((p) => p.category))]

/**
 * Format a product price as US dollars (e.g. 28 → "$28.00").
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

/**
 * Look up a product by its URL id.
 * @param {string} id
 * @returns {object | undefined}
 */
export function getProductById(id) {
  return products.find((p) => p.id === id)
}

/**
 * Products to show alongside a given one — same category first, then the rest.
 * @param {string} id
 * @param {number} [limit=3]
 * @returns {object[]}
 */
export function getRelatedProducts(id, limit = 3) {
  const current = getProductById(id)
  if (!current) return []
  const others = products.filter((p) => p.id !== id)
  const sameCategory = others.filter((p) => p.category === current.category)
  const rest = others.filter((p) => p.category !== current.category)
  return [...sameCategory, ...rest].slice(0, limit)
}
