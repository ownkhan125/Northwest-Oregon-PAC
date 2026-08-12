/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // AVIF first — Chrome/Firefox/Edge and Safari 16.4+ negotiate down to
    // WebP automatically if they don't accept AVIF. Typical savings vs
    // WebP: 20–30%, with no perceptible quality loss at web sizes.
    formats: ['image/avif', 'image/webp'],
    // Match the qualities used across the app — silences the runtime
    // "quality X not in images.qualities" warning and pre-generates only
    // what we actually serve. 65 is for flat two-color art (logo); 70 for
    // small landscape photos; 75/85 for hero and mid-quality photos.
    qualities: [65, 70, 75, 85],
    // Adds 400 and 500 to Next.js's default deviceSizes so mobile viewports
    // (~360–428 CSS px) can pick a 400/500w variant instead of jumping to
    // 640w. Meaningful savings for both hero mobile and small landscape
    // photos where PSI reports the served image is wider than displayed.
    deviceSizes: [400, 500, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optimized images are content-addressed via a fingerprint — safe to
    // cache aggressively at the CDN.
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  // Pre-tree-shake motion barrels — Next.js rewrites `motion/react`
  // imports to direct paths so unused motion features stay out of the
  // client bundle.
  experimental: {
    optimizePackageImports: ['motion', 'motion/react'],
  },
}

export default nextConfig
