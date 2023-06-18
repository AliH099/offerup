/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_IMAGES_HOST?.split(','),
},
}

module.exports = nextConfig
