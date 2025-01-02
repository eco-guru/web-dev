/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // domains: ['img.youtube.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        }
      ]
    },
  };
  
  export default nextConfig;  