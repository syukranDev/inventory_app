/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
            // pathname: '/account123/**',
          },
        ],
      },
      headers: () => [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store',
            },
          ],
        },
      ],
};

export default nextConfig;
