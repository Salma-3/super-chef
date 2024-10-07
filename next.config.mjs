/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            hostname: 'via.placeholder.com'
        },
        {
            hostname: 'example.com'
        }, 
        {
            hostname: 's.gravatar.com'
        },
        {
            hostname: 'res.cloudinary.com'
        }
    ]
    }
};

export default nextConfig;
