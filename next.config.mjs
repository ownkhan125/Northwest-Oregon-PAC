/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // AVIF first — Chrome/Firefox/Edge and Safari 16.4+ negotiate down to
    // WebP automatically if they don't accept AVIF. Typical savings vs
    // WebP: 20–30%, with no perceptible quality loss at web sizes.
    formats: ['image/avif', 'image/webp'],
    // Match the two qualities used across the app — silences the runtime
    // "quality X not in images.qualities" warning and pre-generates only
    // what we actually serve.
    qualities: [75, 85],
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
