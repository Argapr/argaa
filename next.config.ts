import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.notion.so",
            },
            {
                protocol: "https",
                hostname: "s3.us-west-2.amazonaws.com", // Penyimpanan CDN Notion
            },
            {
                protocol: "https",
                hostname: "prod-files-secure.s3.us-west-2.amazonaws.com", // Bisa digunakan Notion juga
            },
        ],
    },
};

export default nextConfig;
