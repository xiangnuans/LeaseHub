/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/LeaseHub',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
