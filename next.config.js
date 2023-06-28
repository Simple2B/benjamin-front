/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '10mb',
  },
  // api: {
  //   bodyParser: {
  //     sizeLimit: '20mb', // Set desired value here
  //   },
  // },

  // api: {
  //   externalResolver: true,
  // },
  // rewrites: () => {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3003/api/:path*', // Proxy to Backend
  //     },
  //   ];
  // },

  //   images: {
  //     domains: [
  //       'find-my-coach-eu.s3.amazonaws.com',
  //       'find-my-coach-eu.s3.eu-west-2.amazonaws.com',
  //     ],
  //     formats: ['image/avif', 'image/webp'],
  //   },
};

module.exports = nextConfig;
