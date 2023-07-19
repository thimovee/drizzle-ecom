/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.clerk.com', 'uploadthing.com', "i.imgur.com", "images.unsplash.com"]
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
