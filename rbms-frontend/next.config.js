/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com`,
      `${process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com`,
      `${process.env.NEXT_PUBLIC_AWS_S3_REVIEWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com`,
    ],
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
