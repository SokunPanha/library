/** @type {import('next').NextConfig} */
const nextConfig = {
          images: {
                    remotePatterns: [
                      {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com'
                      },
                      {
                        protocol: 'https',
                        hostname: "www.simplilearn.com"
                      },
                      {
                        protocol:"https",
                        hostname:"m.media-amazon.com"
                      }
                    ],
                  },
}

module.exports = nextConfig
