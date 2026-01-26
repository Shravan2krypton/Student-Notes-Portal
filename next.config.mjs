/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: {
      exclude: ['../../packages/console'],
    },
  },
};

export default nextConfig;
