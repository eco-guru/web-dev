/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'https',
          hostname: 'www.runtah.id',
          pathname: '/operate/storage/photoProfile/**',
        }
      ]
    },
  };
  
  export default nextConfig;  
