/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /*webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'source-map'; // No eval in dev
    }
    return config;
  },*/
}

export default nextConfig