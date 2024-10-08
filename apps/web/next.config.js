/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/LeaseHub',
  assetPrefix: '/LeaseHub',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
