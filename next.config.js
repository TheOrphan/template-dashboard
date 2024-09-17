const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverActions: {
      bodySizeLimit: '1gb',
    },
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
});

module.exports = nextConfig;
