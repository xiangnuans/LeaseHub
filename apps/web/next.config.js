/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/LeaseHub',
  assetPrefix: '/LeaseHub',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
