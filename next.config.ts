import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚀 باعث میشه ESLint توی مرحله build روی Vercel خطا نگیره
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
