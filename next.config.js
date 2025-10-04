/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out',
    basePath: '/psyodrz',
    assetPrefix: '/psyodrz/',
  }),
  images: {
    unoptimized: true,
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
