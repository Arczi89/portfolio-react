/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
      webpack: (config) => {
        config.experiments = {
            topLevelAwait: true,
            layers: true
        };
        return config;
    },
};


export default nextConfig;
