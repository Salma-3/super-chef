/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            hostname: 'via.placeholder.com'
        },
        {
            hostname: 'example.com'
        }
    ]
    }
};

export default nextConfig;
