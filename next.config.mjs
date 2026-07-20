/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first — Chrome/Firefox/Edge and Safari 16.4+ negotiate down to
    // WebP automatically if they don't accept AVIF. Typical savings vs
    // WebP: 20–30%, with no perceptible quality loss at web sizes.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
}

export default nextConfig
