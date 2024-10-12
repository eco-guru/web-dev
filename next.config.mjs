/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
      // Wild
    ];
  },
};

export default nextConfig;
