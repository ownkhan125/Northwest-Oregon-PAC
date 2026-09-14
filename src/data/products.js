// Northwest Oregon PAC — shop catalog.
// Placeholder products until the real merch line and checkout are wired up.
// Prices are in USD. `icon` points at a civic glyph in /public/icons and is
// rendered as the product artwork via CivicIcon.
//
// Detail-page fields:
//   details  — longer paragraph shown under "About this item"
//   features — short bullet list (materials, sizing, care)
//   options  — optional { label, values } picker (size, color, pack)

export const PRODUCT_CATEGORIES = [
  'All',
  'Apparel',
  'Yard & Signage',
  'Stickers & Pins',
  'Home & Office',
]

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL']

export const products = [
  {
    id: 'nwop-classic-tee',
    name: 'Northwest Oregon PAC Classic Tee',
    category: 'Apparel',
    price: 28,
    description: 'Heavyweight cotton tee with the forest-green wordmark across the chest.',
    details:
      'Our everyday tee. A relaxed, unisex cut in 6.5 oz ring-spun cotton that holds its shape through a season of canvassing and a lot of laundry. The wordmark is water-based screen print, so it sits soft on the fabric instead of cracking.',
    features: [
      '100% ring-spun cotton, 6.5 oz',
      'Unisex fit, side-seamed',
      'Water-based screen print in forest green',
      'Printed in Portland, OR',
    ],
    options: { label: 'Size', values: APPAREL_SIZES },
    icon: '/icons/shield.svg',
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: 'hope-support-heard-hoodie',
    name: 'HOPE · SUPPORT · HEARD Hoodie',
    category: 'Apparel',
    price: 54,
    description: 'Mid-weight fleece hoodie printed with the three words that guide our work.',
    details:
      'The three words on the back are the ones we hold ourselves to: give people hope, give them support, and make sure they are heard. Mid-weight cotton-poly fleece with a lined hood and a kangaroo pocket — warm enough for an October phone bank on the porch.',
    features: [
      '80/20 cotton-poly fleece, 8.5 oz',
      'Lined hood with flat drawcord',
      'Front wordmark, three-word back print',
      'Unisex fit — size up for an oversized look',
    ],
    options: { label: 'Size', values: APPAREL_SIZES },
    icon: '/icons/podium.svg',
    inStock: true,
  },
  {
    id: 'field-cap',
    name: 'Field Cap',
    category: 'Apparel',
    price: 24,
    description: 'Unstructured six-panel cap with an embroidered sand-tone logo. One size.',
    details:
      'A low-profile, unstructured cap that breaks in fast and looks better the more it gets rained on. The logo is embroidered in sand thread on a forest-green crown with a matching brass buckle strap.',
    features: [
      'Washed cotton twill, unstructured crown',
      'Sand-thread embroidery',
      'Adjustable brass buckle strap',
      'One size fits most',
    ],
    options: { label: 'Color', values: ['Forest', 'Sand', 'Ink'] },
    icon: '/icons/target.svg',
    inStock: true,
  },
  {
    id: 'canvass-tote',
    name: 'Canvass Tote',
    category: 'Apparel',
    price: 18,
    description: 'Roomy canvas tote for door-knocking packets, lit drops, and farmers-market runs.',
    details:
      'Sized to hold a clipboard flat, with a long enough handle to sling over a shoulder while you knock. Heavy 12 oz canvas with a reinforced bottom and an interior pocket for your phone and keys.',
    features: [
      '12 oz natural cotton canvas',
      '15" × 16" with a 4" gusset',
      'Interior slip pocket',
      'One-color forest-green print',
    ],
    icon: '/icons/envelope.svg',
    inStock: true,
  },
  {
    id: 'yard-sign',
    name: 'Yard Sign (18" × 24")',
    category: 'Yard & Signage',
    price: 12,
    description: 'Two-sided corrugated yard sign with H-stake. Built for Oregon rain.',
    details:
      'The standard 18 × 24 yard sign, printed both sides on 4 mm corrugated plastic with UV-resistant ink so it will not fade by November. Ships flat with a galvanized H-stake. Please check local rules on placement timing before you put it up.',
    features: [
      '4 mm corrugated plastic, two-sided',
      'UV-resistant ink',
      'Galvanized 10" × 30" H-stake included',
      'Ships flat within 3–5 business days',
    ],
    icon: '/icons/billboard.svg',
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: 'yard-sign-5-pack',
    name: 'Yard Sign 5-Pack',
    category: 'Yard & Signage',
    price: 50,
    description: 'Five signs and five stakes for your block, your church, or your co-op.',
    details:
      'Same sign, better price per unit. Five two-sided 18 × 24 signs and five H-stakes in one box — enough for a street, a congregation, or a co-op board that has already made up its mind. Need more than five? Ask about bulk pricing below.',
    features: [
      'Five 18" × 24" two-sided signs',
      'Five galvanized H-stakes',
      'Saves $10 vs. buying singles',
      'Ships in one flat box',
    ],
    icon: '/icons/billboard.svg',
    inStock: true,
  },
  {
    id: 'window-cling',
    name: 'Storefront Window Cling',
    category: 'Yard & Signage',
    price: 8,
    description: 'Static-cling decal for shop windows and front doors. Leaves no residue.',
    details:
      'For the businesses that want to show support without drilling a sign into the wall. A 9 × 12 static-cling decal that goes on in seconds, peels off clean, and can be reapplied. Reads correctly from the sidewalk when applied to the inside of the glass.',
    features: [
      '9" × 12" static cling, no adhesive',
      'Reverse-printed for inside-glass mounting',
      'Reusable and residue-free',
      'Sold individually',
    ],
    icon: '/icons/skyline.svg',
    inStock: true,
  },
  {
    id: 'rally-banner',
    name: "Rally Banner (3' × 6')",
    category: 'Yard & Signage',
    price: 65,
    description: 'Vinyl banner with grommets for town halls, parades, and meet-and-greets.',
    details:
      'A 3 × 6 foot heavyweight vinyl banner with hemmed edges and brass grommets every two feet. Big enough to read from the back of a gym, tough enough to survive a wet parade. Currently sold out — the next print run is on order.',
    features: [
      '13 oz scrim vinyl, hemmed edges',
      'Brass grommets every 24"',
      'Single-sided, indoor/outdoor',
      'Rolls up for transport',
    ],
    icon: '/icons/capitol.svg',
    inStock: false,
  },
  {
    id: 'bumper-sticker',
    name: 'Bumper Sticker',
    category: 'Stickers & Pins',
    price: 4,
    description: 'Weatherproof vinyl bumper sticker in forest and cream.',
    details:
      'A classic 3 × 10 bumper sticker in forest green and cream. Printed on weatherproof vinyl with a UV laminate so it survives car washes, coastal salt air, and the Columbia Gorge.',
    features: [
      '3" × 10" weatherproof vinyl',
      'UV laminate, removable adhesive',
      'Forest green on cream',
      'Sold individually',
    ],
    icon: '/icons/ballot-box.svg',
    inStock: true,
  },
  {
    id: 'sticker-sheet',
    name: 'Civic Sticker Sheet',
    category: 'Stickers & Pins',
    price: 6,
    description: 'Twelve die-cut stickers of our civic glyph set for laptops and water bottles.',
    details:
      'The full set of civic glyphs from our site — ballot box, capitol, podium, gavel, and the rest — as twelve kiss-cut vinyl stickers on one 4 × 6 sheet. Good for laptops, water bottles, and handing out at tabling events.',
    features: [
      'Twelve kiss-cut vinyl stickers',
      '4" × 6" sheet',
      'Matte finish, waterproof',
      'Stickers range from 1" to 1.75"',
    ],
    icon: '/icons/certificate.svg',
    badge: 'New',
    inStock: true,
  },
  {
    id: 'lapel-pin',
    name: 'Enamel Lapel Pin',
    category: 'Stickers & Pins',
    price: 10,
    description: 'Hard-enamel pin with a butterfly clutch. Wear it to the next council meeting.',
    details:
      'A one-inch hard-enamel pin in forest green and sand with a brushed-brass edge. Comes on a backing card with a butterfly clutch. The kind of thing you notice on a jacket across the room at a county commission hearing.',
    features: [
      '1" hard enamel, brushed-brass plating',
      'Butterfly clutch backing',
      'Ships on a printed backing card',
      'Forest green and sand fill',
    ],
    icon: '/icons/balance.svg',
    inStock: true,
  },
  {
    id: 'campaign-mug',
    name: 'Campaign Mug',
    category: 'Home & Office',
    price: 16,
    description: '11 oz ceramic mug for the early-morning phone bank. Dishwasher safe.',
    details:
      'An 11 oz ceramic mug with the wordmark on one side and the tagline on the other. Glazed cream with a forest-green interior and handle. Dishwasher and microwave safe, and it survives being left on a desk over a long weekend.',
    features: [
      '11 oz ceramic, C-handle',
      'Cream glaze, forest interior',
      'Dishwasher and microwave safe',
      'Two-sided print',
    ],
    icon: '/icons/money-bag.svg',
    inStock: true,
  },
  {
    id: 'field-notebook',
    name: 'Field Notes Notebook',
    category: 'Home & Office',
    price: 14,
    description: 'Pocket-size dot-grid notebook for precinct walks and meeting notes.',
    details:
      'A 3.5 × 5.5 pocket notebook with 48 dot-grid pages and a sand-colored kraft cover. The inside cover has a precinct-walk checklist and space for the date, the turf, and the volunteer count. Sold as a pack of three.',
    features: [
      '3.5" × 5.5", 48 pages, dot grid',
      'Kraft cover with forest-green print',
      'Precinct-walk checklist inside cover',
      'Pack of three',
    ],
    icon: '/icons/document.svg',
    inStock: true,
  },
  {
    id: 'water-bottle',
    name: 'Insulated Water Bottle',
    category: 'Home & Office',
    price: 32,
    description:
      '20 oz stainless bottle, laser-etched logo. Keeps cold through a full canvass shift.',
    details:
      'A 20 oz double-wall stainless bottle with the logo laser-etched rather than printed, so it never wears off. Keeps water cold for 24 hours and coffee hot for 12. Fits a standard car cup holder and a standard bike cage.',
    features: [
      '20 oz double-wall stainless steel',
      'Laser-etched logo',
      '24 hr cold / 12 hr hot',
      'Leak-proof screw lid',
    ],
    options: { label: 'Color', values: ['Forest', 'Sand'] },
    icon: '/icons/gavel.svg',
    badge: 'New',
    inStock: true,
  },
]

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
