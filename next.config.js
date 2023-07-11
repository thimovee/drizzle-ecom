/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.clerk.com', 'uploadthing.com']
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
