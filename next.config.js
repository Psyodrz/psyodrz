/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/psyodrz' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/psyodrz/' : '',
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-right'
  },
  experimental: {
    esmExternals: 'loose',
  },
  trailingSlash: true,
};

module.exports = nextConfig;
