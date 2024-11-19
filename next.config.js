/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ssl.pstatic.net", "t1.kakaocdn.net", "k.kakaocdn.net"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "plus.kipris.or.kr",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "branvip-dev-images.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "branvip-images.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "branvip-banner.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "t1.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
