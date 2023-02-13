/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  swcMinify: true,
  
}

module.exports = nextConfig
