import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_COMMIT: process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_BUILD_BRANCH: process.env.VERCEL_GIT_COMMIT_REF,
    NEXT_PUBLIC_BUILD_REPO: process.env.VERCEL_GIT_REPO_SLUG,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
