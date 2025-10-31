import { NextResponse } from 'next/server';
import { BUILD_COMMIT, BUILD_BRANCH, BUILD_REPO, BUILD_TIME } from '@/lib/buildInfo';

export async function GET() {
  return NextResponse.json({
    commit: BUILD_COMMIT,
    branch: BUILD_BRANCH,
    repo: BUILD_REPO,
    time: BUILD_TIME,
    env: {
      vercelCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null,
      vercelBranch: process.env.VERCEL_GIT_COMMIT_REF || null,
      vercelRepo: process.env.VERCEL_GIT_REPO_SLUG || null,
    },
  });
}
