/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
    // Allow local images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'images.unsplash.com',
//       'plus.unsplash.com',
//       'source.unsplash.com',
//       'images.pexels.com'
//     ],
//   },
//   output: 'export',  // Add this for static export
//   trailingSlash: true,
//   skipTrailingSlashRedirect: true,
// }

// module.exports = nextConfig

module.exports = nextConfig
