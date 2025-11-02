/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    turbopack: {
      root: process.cwd()
    }
  }
}

module.exports = nextConfig
