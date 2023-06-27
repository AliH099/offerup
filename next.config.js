/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: process.env.NEXT_IMAGES_HOST?.split(','),
},
}

module.exports = nextConfig
