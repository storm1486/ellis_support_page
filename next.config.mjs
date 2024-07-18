/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_RECEIVER: process.env.EMAIL_RECEIVER,
  },
};

export default nextConfig;
